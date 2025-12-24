// 存储图片引用的数组，使用模块级变量保持状态
let imageReferences: Array<{ original: string; replacement: string }> = [];

/**
 * 清理消息内容，提取并替换图片引用，移除不需要的标签
 * @param content - 原始消息内容
 * @returns 清理后的消息内容
 */
export function cleanMessageContent(content?: string): string {
    if (!content) return '';

    // 重置图片引用数组
    imageReferences = [];

    // 处理图片引用，提取并替换为占位符
    let processedContent = content.replace(/!\[\[(\d+)\]\]\(([^)]+)\)/g, (match, id, url) => {
        const replacement = `[图片_${id}]`;
        imageReferences.push({ original: match, replacement });
        return replacement;
    });

    // 移除参考文献部分（details标签及其内容）
    processedContent = processedContent.replace(/<details>.*?<\/details>/gs, '');

    // 移除普通标注部分（[[数字]]()格式）
    processedContent = processedContent.replace(/\[\[(\d+)\]\]\([^)]*\)/g, '');

    return processedContent;
}

/**
 * 将处理后的消息内容中的图片占位符还原为原始图片引用
 * @param content - 处理后的消息内容
 * @returns 还原图片引用后的消息内容
 */
export function restoreImageReferences(content?: string): string {
    if (!content || imageReferences.length === 0) {
        return content || '';
    }

    let restoredContent = content;

    // 替换所有图片占位符为原始引用
    imageReferences.forEach(ref => {
        restoredContent = restoredContent.split(ref.replacement).join(ref.original);
    });

    return restoredContent;
}
