<script lang="ts">
    import {createEventDispatcher, onMount} from 'svelte';
    import {fade} from 'svelte/transition';

    const dispatch = createEventDispatcher();
    export let file: {
        id: string;
        name: string;
        blob: Blob;
        type: 'image';
    };

    let loading = true;
    let error = '';
    let imageUrl = '';
    let scale = 1;
    let rotation = 0;
    let downloadUrl = '';

    const MIN_SCALE = 0.1;
    const MAX_SCALE = 5;
    const SCALE_STEP = 0.2;

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

    function zoomIn() {
        scale = Math.min(scale + SCALE_STEP, MAX_SCALE);
    }

    function zoomOut() {
        scale = Math.max(scale - SCALE_STEP, MIN_SCALE);
    }

    function resetZoom() {
        scale = 1;
        rotation = 0;
    }

    function rotateLeft() {
        rotation = (rotation - 90) % 360;
    }

    function rotateRight() {
        rotation = (rotation + 90) % 360;
    }

    function handleImageLoad() {
        loading = false;
    }

    function handleImageError() {
        loading = false;
        error = '图片加载失败，文件可能已损坏。';
    }

    onMount(() => {
        if (file?.blob) {
            imageUrl = URL.createObjectURL(file.blob);
            downloadUrl = imageUrl;
        }

        return () => {
            if (imageUrl) {
                URL.revokeObjectURL(imageUrl);
            }
        };
    });
</script>

<div
        class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm"
        transition:fade={{ duration: 200 }}
>
    <div class="flex h-full w-full max-w-6xl md:h-[90vh] flex-col rounded-xl bg-white shadow-2xl dark:bg-gray-800">
        <!-- Header -->
        <header class="flex flex-shrink-0 items-center justify-between border-b border-gray-200 p-2 dark:border-gray-700">
            <div class="flex min-w-0 items-center">
                <svg class="mr-3 h-6 w-6 flex-shrink-0 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path clip-rule="evenodd"
                          d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                          fill-rule="evenodd"/>
                </svg>
                <div class="min-w-0">
                    <h2 class="truncate text-lg font-bold text-gray-800 dark:text-gray-100" title={file.name}>
                        {file.name}
                    </h2>
                    <p class="text-xs text-gray-500 dark:text-gray-400">
                        {formatFileSize(file.blob.size)} · {Math.round(scale * 100)}%
                    </p>
                </div>
            </div>
            <div class="flex items-center gap-2">
                <!-- 工具栏 -->
                <div class="flex items-center gap-1 border-r border-gray-300 pr-2 dark:border-gray-600">
                    <button
                            class="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200"
                            disabled={scale <= MIN_SCALE}
                            on:click={zoomOut}
                            title="缩小"
                    >
                        <svg class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7" stroke-linecap="round"
                                  stroke-linejoin="round"/>
                        </svg>
                    </button>
                    <button
                            class="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200"
                            on:click={resetZoom}
                            title="重置"
                    >
                        <svg class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                            <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                                  stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
                    <button
                            class="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200"
                            disabled={scale >= MAX_SCALE}
                            on:click={zoomIn}
                            title="放大"
                    >
                        <svg class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                                  stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
                    <button
                            class="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200"
                            on:click={rotateLeft}
                            title="向左旋转"
                    >
                        <svg class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                            <path d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" stroke-linecap="round"
                                  stroke-linejoin="round"/>
                        </svg>
                    </button>
                    <button
                            class="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200"
                            on:click={rotateRight}
                            title="向右旋转"
                    >
                        <svg class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                            <path d="M21 10H11a8 8 0 00-8 8v2m18-10l-6 6m6-6l-6-6" stroke-linecap="round"
                                  stroke-linejoin="round"/>
                        </svg>
                    </button>
                </div>

                <!-- 下载按钮 -->
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

        <!-- Main Content -->
        <main class="flex-1 overflow-hidden rounded-b-lg bg-gray-100 dark:bg-gray-900">
            <div class="flex h-full items-center justify-center overflow-auto p-4">
                {#if loading}
                    <div class="flex flex-col items-center">
                        <svg class="h-12 w-12 animate-spin text-blue-500" fill="none" viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                            <path class="opacity-75"
                                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                  fill="currentColor"/>
                        </svg>
                        <p class="mt-4 text-sm text-gray-500 dark:text-gray-400">正在加载图片...</p>
                    </div>
                {:else if error}
                    <div class="flex flex-col items-center text-center">
                        <svg class="h-16 w-16 text-red-500" fill="none" stroke="currentColor" stroke-width="2"
                             viewBox="0 0 24 24">
                            <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                  stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        <p class="mt-4 text-sm font-medium text-gray-800 dark:text-gray-200">{error}</p>
                        <p class="mt-2 text-xs text-gray-500 dark:text-gray-400">请尝试重新打开文件</p>
                    </div>
                {:else}
                    <img
                            src={imageUrl}
                            alt={file.name}
                            class="image-preview max-h-full max-w-full object-contain transition-transform duration-200"
                            style="transform: scale({scale}) rotate({rotation}deg);"
                            on:load={handleImageLoad}
                            on:error={handleImageError}
                    />
                {/if}
            </div>
        </main>
    </div>
</div>

<style>
    .image-preview {
        user-select: none;
        -webkit-user-drag: none;
    }

    button:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }

    button:disabled:hover {
        background-color: transparent !important;
    }
</style>