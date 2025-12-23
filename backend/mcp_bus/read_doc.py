from pathlib import Path
from docx import Document
from docx.oxml.ns import qn
from docx.table import Table
from docx.text.paragraph import Paragraph
from docxtpl import DocxTemplate
import uuid, re

def is_heading(paragraph):
    """Return True if paragraph acts as a heading (style or outline level)."""
    # 1. Check style name
    style_name = paragraph.style.name
    if style_name == 'Title' or style_name.lower() == 'title':
        return True

    if style_name.startswith('Heading') or 'heading' in style_name.lower():
        return True

    # 2. Check outline level via XML (works even if style is 'Normal')
    pPr = paragraph._p.pPr
    if pPr is not None:
        return pPr.find(qn('w:outlineLvl')) is not None
    return False


def get_heading_level(paragraph):
    """Return heading level 1–9, or None if not a heading."""
    style_name = paragraph.style.name

    if style_name == 'Title' or style_name.lower() == 'title':
        return 1

    # Try to extract level from style name: "Heading 3" → 3
    if style_name.startswith('Heading') or style_name.startswith('heading'):
        try:
            return int(style_name.split(' ')[-1])
        except ValueError:
            return 1

    # Fallback: read <w:outlineLvl w:val="..."/> (0 = Level 1)
    pPr = paragraph._p.pPr
    if pPr is not None:
        lvl_elem = pPr.find(qn('w:outlineLvl'))
        if lvl_elem is not None:
            val = lvl_elem.get(qn('w:val'))
            if val is not None:
                return int(val) + 1  # Word: 0=Level1, 1=Level2, ...
    return None

def table_to_markdown(app_id, app_ctx_id, table, assets_dir, image_prefix):
    """把 table 对象转成标准 Markdown 表格，并在单元格中解析图片"""
    image_counter = 0
    if not table.rows:
        return "", image_counter


    markdown = []
    def render_cell(cell):
        nonlocal image_counter
        fragments = []
        for paragraph in cell.paragraphs:
            text = paragraph.text.strip()
            if text:
                fragments.append(text.replace("\n", " ").replace("|", "\\|"))
            image_counter_l, image_entries = extract_images_from_paragraph(
                app_id, app_ctx_id, paragraph, assets_dir, image_prefix
            )
            image_counter += image_counter_l
            for image_entry in image_entries:
                image_path = image_entry["url"]
                fragments.append(f"![image]({image_path})")
        return " ".join(fragments)

    # 表头（假设第一行是表头）
    header_cells = table.rows[0].cells
    header = "|" + "|".join(render_cell(cell) for cell in header_cells) + "|"
    separator = "|" + "|".join("---" for _ in header_cells) + "|"
    markdown.append(header)
    markdown.append(separator)

    # 表体
    for row in table.rows[1:]:
        cells = []
        for cell in row.cells:
            cells.append(render_cell(cell))
        markdown.append("|" + "|".join(cells) + "|")

    return "\n".join(markdown), image_counter


def iter_block_items(doc):
    """按照 docx 原生顺序依次产出段落和表格，保证内容顺序不乱。"""
    body = doc.element.body
    for child in body.iterchildren():
        if child.tag.endswith("}p"):
            yield Paragraph(child, doc)
        elif child.tag.endswith("}tbl"):
            yield Table(child, doc)


def extract_images_from_paragraph(app_id, app_ctx_id, paragraph, assets_dir, image_prefix):
    """提取段落中所有图片，写入 assets 目录，并返回新内容节点。"""
    from local_service import encode_filename_to_urlsafe
    entries = []
    image_counter = 0
    for run in paragraph.runs:
        # 直接通过 local-name() 匹配 blip，避免对 xpath 的额外参数依赖
        blips = run.element.xpath(".//*[local-name()='blip']")
        for blip in blips:
            embed = blip.get(qn("r:embed"))
            if not embed:
                continue
            image_part = paragraph.part.related_parts.get(embed)
            if image_part is None:
                continue
            image_counter += 1
            ext = Path(image_part.filename).suffix or ".png"
            image_name = f"{image_prefix}_img_{uuid.uuid4()}{ext}"
            image_path = assets_dir / image_name
            image_path.write_bytes(image_part.blob)
            entries.append({"type": "image", "url": f"/agents/api/v1/application/assets/{app_id}/{app_ctx_id}/{encode_filename_to_urlsafe(image_name)}"})
    return image_counter, entries

def create_tree_structure(app_id, app_ctx_id, docx_file, assets_dir=None):
    doc = Document(str(docx_file))
    doc_path = Path(docx_file)
    assets_dir = Path(assets_dir) if assets_dir else doc_path.with_name(f"assets")
    assets_dir.mkdir(parents=True, exist_ok=True)
    # 初始化树结构和当前节点栈
    root = {"title": f"{docx_file.name}", "level": 0, "content": [], "children": [], 'type': 'filename', 'company': ''}
    current_stack = [root]

    def get_level(paragraph):
        if is_heading(paragraph):
            level = get_heading_level(paragraph) or 0
            return True, level
        return False, 0

    def get_block_xpath(block):
        element = getattr(block, "_p", None)
        if element is None:
            element = getattr(block, "_tbl", None)
        if element is None:
            element = block._element  # 兜底
        return element.getroottree().getpath(element)

    for block in iter_block_items(doc):

        block_xpath = get_block_xpath(block)

        if isinstance(block, Table):
            markdown, image_counter = table_to_markdown(app_id, app_ctx_id, block, assets_dir, doc_path.stem)
            if markdown and current_stack:
                current_stack[-1]["content"].append({"type": "table_image" if image_counter>0 else "table", "content": markdown, "file_name": f"{docx_file.parent.name}/{docx_file.name}", "xpath": block_xpath})
            continue

        if not isinstance(block, Paragraph):
            continue

        style = block.style.name
        text = block.text.strip()
        match = re.search(r'填报单位[:：](.*)', text)
        if match:
            root["company"] = match.group(1).strip()

        is_title, level = get_level(block)
        if is_title:
            # 创建新节点
            node = {"title": text, "level": level, "style": style, "type": "title", "file_name": f"{docx_file.parent.name}/{docx_file.name}", "xpath": block_xpath, "content": [], "children": []}
            while current_stack and current_stack[-1]["level"] >= level:
                current_stack.pop()

            # 将新节点添加到父节点的children
            if current_stack:
                current_stack[-1]["children"].append(node)

            # 更新当前栈
            current_stack.append(node)

        else:
            # 非标题内容添加到当前节点的content
            if current_stack:
                image_counter, image_entries = extract_images_from_paragraph(
                    app_id, app_ctx_id, block, assets_dir, doc_path.stem
                )
                for image_entry in image_entries:
                    current_stack[-1]["content"].append({"type": "image", "content": f"![image]({image_entry['url']})", "xpath": block_xpath})
                if text:
                    current_stack[-1]["content"].append({"type": "text", "content": text, "xpath": block_xpath})
    return root


class DocReader:
    def __init__(self, app_session, node_name):
        self.app_session = app_session
        self.root_node = self.app_session.add_node(
            {"name": node_name}
        )

    def read_doc(self, docx_file, assets_dir=None):
        tree = create_tree_structure(self.app_session.app_id, self.app_session.appctx_id, docx_file, assets_dir=assets_dir)
        def add_node(parent, node):
            children = node['children']
            del node['children']
            node = self.app_session.add_node(node)
            if parent is not None:
                self.app_session.graph.add_relationship(
                    "Data",
                    parent['node_id'],
                    "SUBHEADING",
                    "Data",
                    node['node_id']
                )
            for i, child in enumerate(children):
                add_node(node, child | {"order": i})
        add_node(self.root_node, tree)


    def read_tmpl(self, tmpl_file):
        tpl = DocxTemplate(tmpl_file)
        variable_names = tpl.get_undeclared_template_variables()
        def add_node(parent, node):
            node = self.app_session.add_node(node)
            self.app_session.graph.add_relationship(
                "Data",
                parent['node_id'],
                "SUBHEADING",
                "Data",
                node['node_id']
            )
        for v_name in variable_names:
            add_node(self.root_node, {"type": "Task", "name": v_name})

# 示例用法
if __name__ == "__main__":
    input_docx = r"/home/woody/seektime/PeritusLLM/sapientia/mcp_bus/2025年8月工程信息月报(红河).docx"  # 替换为你的Word文档路径
