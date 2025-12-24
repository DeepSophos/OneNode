	const Menu = {
		'Open PDF': '打开PDF',
		'Download': '下载',
		'Enter full screen': '全屏',
		'Screenshot': '截图',
		'Print': '打印'
	};
	const Sidebar = {
		'Thumbnails': '缩略图',
		'Outline': '目录',
		'No outline available': '无可用目录',
		'This document doesn\'t contain bookmarks': '该文档未包含书签'
	};
	const ViewSettings = {
		'Page orientation': '页面方向',
		'Rotate clockwise': '顺时针旋转',
		'Rotate counter clockwise': '逆时针旋转',
		'Scroll layout': '滚动布局',
		'Vertical': '垂直',
		'Horizontal': '水平',
		'Page layout': '页面布局',
		'Single page': '单页',
		'Double page': '双页',
		'Cover facing page': '封面相对',
		'Exit full screen': '退出全屏'
	};
	const Zoom = {
		'Zoom Out': '缩小',
		'Zoom out': '缩小',
		'Zoom in': '放大',
		'Zoom In': '放大',
		'Fit to width': '适应宽度',
		'Fit to page': '适应页面',
		'Zoom in area': '区域放大'
	};
	const Multiply = {
		'Screen': '滤镜',
		'Overlay': '叠加',
		'Darken': '变暗',
		'Lighten': '变亮',
		'Color Dodge': '颜色减淡',
		'Color Burn': '颜色加深',
		'Hard Light': '强光',
		'Soft Light': '柔光',
		'Difference': '差值',
		'Exclusion': '排除',
		'Hue': '色相',
		'Saturation': '饱和度',
		'Luminosity': '明度'
	};
	const AnnotateStyle = {
		'defaults': '默认值',
		'Color': '颜色',
		'Opacity': '透明度',
		'Blend mode': '混合模式',
		'Normal': '正常',
		'Multiply': '正片叠底',
		...Multiply,
		'Ink': '线条',
		'Stroke width': '线条宽度',
		'Free text': '文本',
		'Font': '字体',
		'Bold': '粗体',
		'Italic': '斜体',
		'Text alignment': '水平对齐',
		'Align left': '左对齐',
		'Align center': '居中',
		'Align right': '右对齐',   // 如界面存在
		'Align top': '顶端对齐',
		'Align middle': '垂直居中',
		'Align bottom': '底端对齐',
		'Vertical alignment': '垂直对齐',
		'Font colour': '字体颜色',
		'Background colour': '背景颜色',
		'Stamp': '图章',
		'There are no styles for stamps.': '暂无图章样式'
	};
	const Annotate = {
		'Highlight': '高亮',
		'Underline': '下划线',
		'Strikethrough': '删除线',
		'Strike-out': '删除线',
		'Squiggly': '下波浪线',
		'Freehand': '随意画',
		'Free Text': '文字',
		'Photo': '图片',
		...AnnotateStyle

	};
	const Shapes = {
		'Circle': '圆形',
		'Square': '矩形',
		'Polygon': '多边形',
		'Polyline': '折线',
		'Line': '直线',
		'Line Arrow': '箭头直线',
		'Fill color': '填充颜色',
		'Stroke color': '描边颜色',
		'Stroke style': '描边样式',
		'Line start': '起点样式',
		'Line end': '终点样式',
		'Arrow line': '箭头'
	};
	const Redact = {
		'Redact Area': '遮盖区域',
		'Redact Selection': '遮盖所选',
		'Save redaction': '保存编辑',
		'Exit redaction': '结束遮盖'
	};
	const Search = {
		'Case sensitive': '区分大小写',
		'Whole word': '整个单词',
		'results found': '条数据'
	};
	const other = {
		'Previous Page': '上一页',
		'Next Page': '下一页',
		'Style': '样式',
		'Redo': '重做',
		'Undo': '撤销',
		'More': '更多',
		'styles': '样式',
		'Select an annotation to see styles': '选择一个标注以查看样式',
		'Add annotations to be able to comment on them.': '添加注释，以便对其进行评论。',
		'Loading PDF document...': '正在加载 PDF 文档…',
		'Initializing PDF engine...': '正在初始化 PDF 引擎…',
		'Captured PDF area': '已捕获的 PDF 区域'
	};
	const Pointer = {
		'Copy': '复制',
		'Highlight Selection': '所选添加高亮',
		'Underline Selection': '所选添加下划线',
		'Strikethrough Selection': '所选添加删除线',
		'Squiggly Selection': '所选添加下波浪线'
	};
	const Comment = {
		'Add comment': '添加评论',
		'comment': '评论',
		'Edit': '编辑',
		'Delete': '删除'
	};
	export const map = {
		'Menu': '菜单',
		...Menu,
		'Sidebar': '侧边栏',
		...Sidebar,
		'View settings': '视图设置',
		...ViewSettings,
		'Zoom Options': '缩放选项',
		...Zoom,
		'Pan': '平移',
		'Pointer': '选择',
		...Pointer,
		'View': '视图',
		'Annotate': '批注',
		...Annotate,
		'Shapes': '图形',
		...Shapes,
		'Redact': '遮盖',
		...Redact,
		'Search': '搜索',
		...Search,
		'Comment': '评论',
		...Comment,
		...other
	};