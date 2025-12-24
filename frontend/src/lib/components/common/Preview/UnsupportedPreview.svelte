<!-- src/components/preview/UnsupportedPreview.svelte -->
<script lang="ts">
    import {createEventDispatcher} from 'svelte';

    const dispatch = createEventDispatcher();
    export let file;

    function handleClose() {
        dispatch('close');
    }

    function handleOverlayClick(event: MouseEvent) {
        if (event.target === event.currentTarget) {
            handleClose();
        }
    }

    // 下载文件
    function handleDownload() {
        const url = URL.createObjectURL(file.blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = file.name;
        a.click();
        URL.revokeObjectURL(url);
    }
</script>

<div
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        on:click={handleOverlayClick}
>
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6 text-center">
        <svg class="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" stroke-linecap="round" stroke-linejoin="round"
                  stroke-width="2"/>
        </svg>
        <h3 class="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">不支持的文件类型</h3>
        <p class="text-gray-600 dark:text-gray-400 mb-6">
            无法预览「{file.name}」，请下载后查看
        </p>
        <div class="flex gap-3 justify-center">
            <button
                    class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    on:click={handleDownload}
            >
                下载文件
            </button>
            <button
                    class="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                    on:click={handleClose}
            >
                关闭
            </button>
        </div>
    </div>
</div>