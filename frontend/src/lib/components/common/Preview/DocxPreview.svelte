<script lang="ts">
    import {createEventDispatcher, onMount, tick} from 'svelte';
    import {fade} from 'svelte/transition';

    const dispatch = createEventDispatcher();
    export let file: {
        id: string;
        name: string;
        blob: Blob;
        type: 'docx';
    };

    let loading = true;
    let error = '';
    let previewContainer: HTMLDivElement;
    let docxPreview: typeof import('docx-preview');

    let downloadUrl = '';

    function formatFileSize(bytes: number): string {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    function handleClose() {
        dispatch('close');
    }

    async function loadDocxModule() {
        if (docxPreview) return true;
        try {
            docxPreview = await import('docx-preview');
            return true;
        } catch (err) {
            console.error('加载 docx-preview 失败:', err);
            error = '预览依赖加载失败,请刷新重试。';
            loading = false;
            return false;
        }
    }

    async function renderDocx() {
        loading = true;
        error = '';
        await tick();

        if (!previewContainer) {
            error = '预览容器初始化异常,请刷新页面。';
            loading = false;
            return;
        }

        try {
            if (!file?.blob || file.blob.size === 0) throw new Error('文件为空或已损坏,无法预览。');
            if (!file.name.toLowerCase().endsWith('.docx')) throw new Error('仅支持 .docx 格式的文件。');

            previewContainer.innerHTML = '';
            await docxPreview.renderAsync(file.blob, previewContainer, undefined, {
                className: 'docx-preview-wrapper',
                inWrapper: true,
                breakPages: true,
                ignoreFonts: false,
                ignoreWidth: false,
                ignoreHeight: false,
                renderHeaders: true,
                renderFooters: true,
                renderFootnotes: true,
                renderEndnotes: true,
                useBase64URL: true,
                useMathMLPolyfill: true,
                experimental: true
            });
        } catch (err) {
            console.error('Docx 预览失败:', err);
            const message = err instanceof Error ? err.message : '文件解析失败,可能已损坏或格式不支持。';
            error = message;
        } finally {
            loading = false;
        }
    }

    async function init() {
        if (await loadDocxModule()) {
            await renderDocx();
        }
    }

    onMount(() => {
        if (file?.blob) {
            downloadUrl = URL.createObjectURL(file.blob);
        }

        init();

        return () => {
            if (previewContainer) previewContainer.innerHTML = '';
            if (downloadUrl) {
                URL.revokeObjectURL(downloadUrl);
            }
        };
    });
</script>

<div
        class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm"
        transition:fade={{ duration: 200 }}
>
    <div class="flex h-full w-full max-w-4xl md:h-[90vh] flex-col rounded-xl bg-white shadow-2xl dark:bg-gray-800">
        <header class="flex flex-shrink-0 items-center justify-between border-b border-gray-200 p-2 dark:border-gray-700">
            <div class="flex min-w-0 items-center">
                <svg class="mr-3 h-6 w-6 flex-shrink-0 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                    <path clip-rule="evenodd"
                          d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                          fill-rule="evenodd"/>
                </svg>
                <div class="min-w-0">
                    <h2 class="truncate text-lg font-bold text-gray-800 dark:text-gray-100" title={file.name}>
                        {file.name}
                    </h2>
                    <p class="text-xs text-gray-500 dark:text-gray-400">
                        {formatFileSize(file.blob.size)}
                    </p>
                </div>
            </div>
            <div class="flex items-center gap-2">
                <a
                        class="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200"
                        download={file.name}
                        href={downloadUrl}
                        on:click|stopPropagation
                        title="下载文件"
                >
                    <svg class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                        <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" stroke-linecap="round"
                              stroke-linejoin="round"/>
                    </svg>
                </a>
                <!-- 关闭按钮 -->
                <button
                        class="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200"
                        on:click={handleClose}
                        title="关闭"
                >
                    <svg class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                        <path d="M6 18L18 6M6 6l12 12" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
            </div>
        </header>

        <main class="flex-1 overflow-auto rounded-b-lg bg-gray-100 dark:bg-gray-900">
            <div bind:this={previewContainer} class="h-full">
                {#if loading}
                    <div class="flex h-full min-h-[400px] items-center justify-center">
                        <!-- Loading UI ... -->
                    </div>
                {:else if error}
                    <div class="flex h-full min-h-[400px] items-center justify-center p-4">
                        <!-- Error UI ... -->
                    </div>
                {/if}
            </div>
        </main>
    </div>
</div>

<style>
    :global(.docx-preview-wrapper) {
        background: white;
        color: #111827;
        box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
        border-radius: 4px;
        margin: 0 auto;
        padding: 20px;
        max-width: 100%;
    }

    :global(.dark .docx-preview-wrapper) {
        background: #1f2937;
        color: #f9fafb;
        box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
    }

    :global(.docx-wrapper) {
        padding: 40px;
        max-width: 100%;
    }

    :global(.dark .docx-wrapper) {
        background: #1f2937;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    }

    /* 表格样式优化 */
    :global(.docx-preview-wrapper table) {
        border-collapse: collapse;
        width: 100%;
        margin: 16px 0;
        table-layout: auto;
        word-break: break-word;
    }

    :global(.docx-preview-wrapper td, .docx-preview-wrapper th) {
        border: 1px solid #d1d5db;
        padding: 8px 12px;
        vertical-align: top;
        min-width: 50px;
    }

    :global(.dark .docx-preview-wrapper td, .dark .docx-preview-wrapper th) {
        border-color: #4b5563;
    }

    :global(.docx-preview-wrapper th) {
        background-color: #f3f4f6;
        font-weight: 600;
    }

    :global(.dark .docx-preview-wrapper th) {
        background-color: #374151;
    }

    /* 段落样式 */
    :global(.docx-preview-wrapper p) {
        margin: 0 0 12px 0;
        line-height: 1.8;
        font-size: 14px;
        word-wrap: break-word;
    }

    /* 图片样式优化 */
    :global(.docx-preview-wrapper img) {
        max-width: 100%;
        height: auto;
        display: block;
        margin: 16px auto;
        border-radius: 4px;
    }

    /* 图片容器 */
    :global(.docx-preview-wrapper .pic) {
        text-align: center;
        margin: 16px 0;
    }

    /* 列表样式 */
    :global(.docx-preview-wrapper ul, .docx-preview-wrapper ol) {
        margin: 12px 0;
        padding-left: 30px;
    }

    :global(.docx-preview-wrapper li) {
        margin: 6px 0;
        line-height: 1.6;
    }

    /* 响应式优化 */
    @media (max-width: 768px) {
        :global(.docx-wrapper) {
            padding: 20px 15px;
        }

        :global(.docx-preview-wrapper) {
            padding: 15px;
        }

        :global(.docx-preview-wrapper table) {
            font-size: 12px;
        }

        :global(.docx-preview-wrapper td, .docx-preview-wrapper th) {
            padding: 6px 8px;
        }
    }

    /* 确保表格在容器内正确显示 */
    :global(.docx-preview-wrapper table-wrapper) {
        overflow-x: auto;
        margin: 16px 0;
    }
</style>