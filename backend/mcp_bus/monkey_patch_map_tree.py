from docxtpl import DocxTemplate
from lxml import etree
from jinja2 import Environment, meta

def apply_fast_render_patch():
    def fast_map_tree(self, tree):
        doc = self.docx
        old_body = doc.element.body

        # Find sectPr anywhere in the body
        sectPr = old_body.find('.//w:sectPr', old_body.nsmap)
        if sectPr is not None:
            sectPr_parent = sectPr.getparent()
            if sectPr_parent is not None:
                sectPr_parent.remove(sectPr)  # Remove from its actual parent

        # Clear all direct children of body (except sectPr if it was direct)
        for child in list(old_body):
            if child is not sectPr:  # Don't remove sectPr if it was direct child
                old_body.remove(child)

        # Add new content
        for child in tree:
            if not child.tag.endswith('sectPr'):
                old_body.append(child)

        # Re-append sectPr at the end if it existed
        if sectPr is not None:
            old_body.append(sectPr)

        # Update the part
        doc._part._element = doc.element


    DocxTemplate.map_tree = fast_map_tree
    # print("Fast docx-template patch applied")