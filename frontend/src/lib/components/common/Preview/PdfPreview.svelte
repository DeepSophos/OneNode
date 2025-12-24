<!--<script lang="ts">-->
<!--    import {createEventDispatcher, onMount} from 'svelte';-->
<!--    import {fade} from 'svelte/transition';-->
<!--    import {pdfjs, Document, Page} from 'svelte-pdf';-->

<!--    // 设置 PDF.js worker-->
<!--    pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;-->

<!--    const dispatch = createEventDispatcher();-->
<!--    export let file: {-->
<!--        id: string;-->
<!--        name: string;-->
<!--        blob: Blob;-->
<!--        type: 'pdf';-->
<!--    };-->

<!--    let loading = true;-->
<!--    let error = '';-->
<!--    let pdfUrl = '';-->
<!--    let downloadUrl = '';-->
<!--    let numPages = 0;-->
<!--    let currentPage = 1;-->
<!--    let scale = 1.0;-->

<!--    const MIN_SCALE = 0.5;-->
<!--    const MAX_SCALE = 3.0;-->
<!--    const SCALE_STEP = 0.2;-->

<!--    function formatFileSize(bytes: number): string {-->
<!--        if (bytes === 0) return '0 Bytes';-->
<!--        const k = 1024;-->
<!--        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];-->
<!--        const i = Math.floor(Math.log(bytes) / Math.log(k));-->
<!--        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];-->
<!--    }-->

<!--    function handleClose() {-->
<!--        dispatch('close');-->
<!--    }-->

<!--    function zoomIn() {-->
<!--        scale = Math.min(scale + SCALE_STEP, MAX_SCALE);-->
<!--    }-->

<!--    function zoomOut() {-->
<!--        scale = Math.max(scale - SCALE_STEP, MIN_SCALE);-->
<!--    }-->

<!--    function resetZoom() {-->
<!--        scale = 1.0;-->
<!--    }-->

<!--    function goToPage(page: number) {-->
<!--        if (page >= 1 && page <= numPages) {-->
<!--            currentPage = page;-->
<!--        }-->
<!--    }-->

<!--    function previousPage() {-->
<!--        if (currentPage > 1) {-->
<!--            currentPage&#45;&#45;;-->
<!--        }-->
<!--    }-->

<!--    function nextPage() {-->
<!--        if (currentPage < numPages) {-->
<!--            currentPage++;-->
<!--        }-->
<!--    }-->

<!--    function handleDocumentLoad(e: CustomEvent) {-->
<!--        numPages = e.detail.numPages;-->
<!--        loading = false;-->
<!--    }-->

<!--    function handleDocumentError(e: CustomEvent) {-->
<!--        console.error('PDF 加载失败:', e.detail);-->
<!--        error = 'PDF 文件加载失败，可能已损坏或格式不支持。';-->
<!--        loading = false;-->
<!--    }-->

<!--    onMount(() => {-->
<!--        if (file?.blob) {-->
<!--            pdfUrl = URL.createObjectURL(file.blob);-->
<!--            downloadUrl = pdfUrl;-->
<!--        }-->

<!--        return () => {-->
<!--            if (pdfUrl) {-->
<!--                URL.revokeObjectURL(pdfUrl);-->
<!--            }-->
<!--        };-->
<!--    });-->
<!--</script>-->

<!--<div-->
<!--        class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm"-->
<!--        transition:fade={{ duration: 200 }}-->
<!--&gt;-->
<!--    <div class="flex h-full w-full max-w-5xl md:h-[90vh] flex-col rounded-xl bg-white shadow-2xl dark:bg-gray-800">-->
<!--        &lt;!&ndash; Header &ndash;&gt;-->
<!--        <header class="flex flex-shrink-0 items-center justify-between border-b border-gray-200 p-2 dark:border-gray-700">-->
<!--            <div class="flex min-w-0 items-center">-->
<!--                <svg class="mr-3 h-6 w-6 flex-shrink-0 text-red-500" fill="currentColor" viewBox="0 0 20 20">-->
<!--                    <path d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2h-1.528A6 6 0 004 9.528V4z"-->
<!--                          fill-rule="evenodd"/>-->
<!--                    <path d="M8 10a4 4 0 00-3.446 6.032l-1.261 1.26a1 1 0 101.414 1.415l1.261-1.261A4 4 0 108 10zm-2 4a2 2 0 114 0 2 2 0 01-4 0z"/>-->
<!--                </svg>-->
<!--                <div class="min-w-0">-->
<!--                    <h2 class="truncate text-lg font-bold text-gray-800 dark:text-gray-100" title={file.name}>-->
<!--                        {file.name}-->
<!--                    </h2>-->
<!--                    <p class="text-xs text-gray-500 dark:text-gray-400">-->
<!--                        {formatFileSize(file.blob.size)}-->
<!--                        {#if numPages > 0}-->
<!--                            · 共 {numPages} 页 · {Math.round(scale * 100)}%-->
<!--                        {/if}-->
<!--                    </p>-->
<!--                </div>-->
<!--            </div>-->
<!--            <div class="flex items-center gap-2">-->
<!--                &lt;!&ndash; 页码控制 &ndash;&gt;-->
<!--                {#if numPages > 0}-->
<!--                    <div class="flex items-center gap-1 border-r border-gray-300 pr-2 dark:border-gray-600">-->
<!--                        <button-->
<!--                                class="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200"-->
<!--                                on:click={previousPage}-->
<!--                                disabled={currentPage <= 1}-->
<!--                                title="上一页"-->
<!--                        >-->
<!--                            <svg class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">-->
<!--                                <path d="M15 19l-7-7 7-7" stroke-linecap="round" stroke-linejoin="round"/>-->
<!--                            </svg>-->
<!--                        </button>-->
<!--                        <div class="flex items-center gap-1 px-2">-->
<!--                            <input-->
<!--                                    type="number"-->
<!--                                    min="1"-->
<!--                                    max={numPages}-->
<!--                                    bind:value={currentPage}-->
<!--                                    on:change={() => goToPage(currentPage)}-->
<!--                                    class="w-12 rounded border border-gray-300 px-2 py-1 text-center text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"-->
<!--                            />-->
<!--                            <span class="text-sm text-gray-500 dark:text-gray-400">/ {numPages}</span>-->
<!--                        </div>-->
<!--                        <button-->
<!--                                class="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200"-->
<!--                                on:click={nextPage}-->
<!--                                disabled={currentPage >= numPages}-->
<!--                                title="下一页"-->
<!--                        >-->
<!--                            <svg class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">-->
<!--                                <path d="M9 5l7 7-7 7" stroke-linecap="round" stroke-linejoin="round"/>-->
<!--                            </svg>-->
<!--                        </button>-->
<!--                    </div>-->
<!--                {/if}-->

<!--                &lt;!&ndash; 缩放控制 &ndash;&gt;-->
<!--                <div class="flex items-center gap-1 border-r border-gray-300 pr-2 dark:border-gray-600">-->
<!--                    <button-->
<!--                            class="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200"-->
<!--                            disabled={scale <= MIN_SCALE}-->
<!--                            on:click={zoomOut}-->
<!--                            title="缩小"-->
<!--                    >-->
<!--                        <svg class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">-->
<!--                            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7" stroke-linecap="round"-->
<!--                                  stroke-linejoin="round"/>-->
<!--                        </svg>-->
<!--                    </button>-->
<!--                    <button-->
<!--                            class="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200"-->
<!--                            on:click={resetZoom}-->
<!--                            title="重置"-->
<!--                    >-->
<!--                        <svg class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">-->
<!--                            <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"-->
<!--                                  stroke-linecap="round" stroke-linejoin="round"/>-->
<!--                        </svg>-->
<!--                    </button>-->
<!--                    <button-->
<!--                            class="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200"-->
<!--                            disabled={scale >= MAX_SCALE}-->
<!--                            on:click={zoomIn}-->
<!--                            title="放大"-->
<!--                    >-->
<!--                        <svg class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">-->
<!--                            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"-->
<!--                                  stroke-linecap="round" stroke-linejoin="round"/>-->
<!--                        </svg>-->
<!--                    </button>-->
<!--                </div>-->

<!--                &lt;!&ndash; 下载按钮 &ndash;&gt;-->
<!--                <a-->
<!--                        class="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200"-->
<!--                        download={file.name}-->
<!--                        href={downloadUrl}-->
<!--                        on:click|stopPropagation-->
<!--                        title="下载文件"-->
<!--                >-->
<!--                    <svg class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">-->
<!--                        <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" stroke-linecap="round"-->
<!--                              stroke-linejoin="round"/>-->
<!--                    </svg>-->
<!--                </a>-->

<!--                &lt;!&ndash; 关闭按钮 &ndash;&gt;-->
<!--                <button-->
<!--                        class="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200"-->
<!--                        on:click={handleClose}-->
<!--                        title="关闭"-->
<!--                >-->
<!--                    <svg class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">-->
<!--                        <path d="M6 18L18 6M6 6l12 12" stroke-linecap="round" stroke-linejoin="round"/>-->
<!--                    </svg>-->
<!--                </button>-->
<!--            </div>-->
<!--        </header>-->

<!--        &lt;!&ndash; Main Content &ndash;&gt;-->
<!--        <main class="flex-1 overflow-auto rounded-b-lg bg-gray-100 dark:bg-gray-900">-->
<!--            <div class="flex h-full items-start justify-center p-4">-->
<!--                {#if loading}-->
<!--                    <div class="flex flex-col items-center pt-20">-->
<!--                        <svg class="h-12 w-12 animate-spin text-blue-500" fill="none" viewBox="0 0 24 24">-->
<!--                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>-->
<!--                            <path class="opacity-75"-->
<!--                                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"-->
<!--                                  fill="currentColor"/>-->
<!--                        </svg>-->
<!--                        <p class="mt-4 text-sm text-gray-500 dark:text-gray-400">正在加载 PDF...</p>-->
<!--                    </div>-->
<!--                {:else if error}-->
<!--                    <div class="flex flex-col items-center pt-20 text-center">-->
<!--                        <svg class="h-16 w-16 text-red-500" fill="none" stroke="currentColor" stroke-width="2"-->
<!--                             viewBox="0 0 24 24">-->
<!--                            <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"-->
<!--                                  stroke-linecap="round" stroke-linejoin="round"/>-->
<!--                        </svg>-->
<!--                        <p class="mt-4 text-sm font-medium text-gray-800 dark:text-gray-200">{error}</p>-->
<!--                        <p class="mt-2 text-xs text-gray-500 dark:text-gray-400">请尝试重新打开文件</p>-->
<!--                    </div>-->
<!--                {:else}-->
<!--                    <div class="pdf-container">-->
<!--                        <Document-->
<!--                                file={pdfUrl}-->
<!--                                on:load={handleDocumentLoad}-->
<!--                                on:error={handleDocumentError}-->
<!--                        >-->
<!--                            <Page-->
<!--                                    pageNumber={currentPage}-->
<!--                                    scale={scale}-->
<!--                            />-->
<!--                        </Document>-->
<!--                    </div>-->
<!--                {/if}-->
<!--            </div>-->
<!--        </main>-->
<!--    </div>-->
<!--</div>-->

<!--<style>-->
<!--    .pdf-container {-->
<!--        display: flex;-->
<!--        justify-content: center;-->
<!--        width: 100%;-->
<!--    }-->

<!--    .pdf-container :global(.svelte-pdf-page) {-->
<!--        box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);-->
<!--        border-radius: 4px;-->
<!--        background: white;-->
<!--        margin: 0 auto 20px;-->
<!--    }-->

<!--    .pdf-container :global(.svelte-pdf-page canvas) {-->
<!--        display: block;-->
<!--        border-radius: 4px;-->
<!--    }-->

<!--    input[type="number"]::-webkit-inner-spin-button,-->
<!--    input[type="number"]::-webkit-outer-spin-button {-->
<!--        -webkit-appearance: none;-->
<!--        margin: 0;-->
<!--    }-->

<!--    input[type="number"] {-->
<!--        -moz-appearance: textfield;-->
<!--    }-->

<!--    button:disabled {-->
<!--        opacity: 0.5;-->
<!--        cursor: not-allowed;-->
<!--    }-->

<!--    button:disabled:hover {-->
<!--        background-color: transparent !important;-->
<!--    }-->
<!--</style>-->

