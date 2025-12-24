<script lang="ts">
    import {createEventDispatcher, onMount} from 'svelte';
    import DocxPreview from './Preview/DocxPreview.svelte';
    import PdfPreview from './Preview/PdfPreview.svelte';
    import ImagePreview from './Preview/ImagePreview.svelte';
    import UnsupportedPreview from './Preview/UnsupportedPreview.svelte';

    const dispatch = createEventDispatcher();

    // 接收外部传入的文件（必须包含blob文件流）
    export let file;

    // 识别文件类型
    let fileType = 'other';

    // 自动识别文件类型（优先级：传入的type > 文件名后缀 > blob类型）
    function detectFileType() {
        if (file.type) {
            console.log(file)
            fileType = file.type;
            return;
        }

        const fileName = file.name.toLowerCase();
        if (fileName.endsWith('.docx')) {
            fileType = 'docx';
        } else if (fileName.endsWith('.pdf')) {
            // fileType = 'pdf';
        } else if (fileName.match(/\.(png|jpg|jpeg|gif|webp|svg)$/)) {
            // fileType = 'image';
        } else {
            fileType = 'other';
        }
    }

    // 关闭预览时的回调（可传递给父组件）
    function handleClose() {
        dispatch('close');
    }

    onMount(() => {
        detectFileType();
    });
</script>
<!-- 根据文件类型渲染对应的子组件 -->
{#if fileType === 'docx'}
    <DocxPreview {file} on:close={handleClose}/>
{:else if fileType === 'pdf'}
    <PdfPreview {file} on:close={handleClose}/>
{:else if fileType === 'image'}
    <ImagePreview {file} on:close={handleClose}/>
{:else}
    <UnsupportedPreview {file} on:close={handleClose}/>
{/if}
