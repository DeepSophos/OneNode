<script lang="ts">
    import {createEventDispatcher, onMount} from 'svelte';
    import Tooltip from '../common/Tooltip.svelte';
    import FilePreview from "$lib/components/common/FilePreview.svelte";
    import {toast} from "svelte-sonner";
    import {
        deleteFile,
        getFiles,
        uploadFile,
        getFileStream
    } from "$lib/apis/application";
    import {formatFileSize, formatTimestamp, getRelativeTime} from "$lib/utils";
    import ConfirmDialog from "$lib/components/ConfirmDialog.svelte";

    const dispatch = createEventDispatcher();

    export let app_id: string;
    export let allowedTypes: string[] = ['.docx']; // 允许文件类型
    export let maxSize: number = 100 * 1024 * 1024; // 允许文件大小

    let files = [];
    let isDragging = false;
    let fileInput: HTMLInputElement;
    let showDelConfirm = false;
    let delFileInfo = null;
    let showPreview = false;
    let previewFile = null;

    function handleClose() {
        dispatch('close');
    }

    function handleFileSelect(event: Event) {
        const target = event.target as HTMLInputElement;
        if (target.files) {
            addFiles(Array.from(target.files));
        }
        target.value = ''; // 重置input，允许重复上传同一文件
    }

    async function addFiles(fileList: File[]) {
        for (const file of fileList) {
            if (!isFileTypeAllowed(file.name)) {
                toast.warning(`文件 "${file.name}" 类型不支持。只允许上传: ${allowedTypes.join(', ')}`);
                continue;
            }
            if (file.size > maxSize) {
                toast.warning(`文件 "${file.name}" 超过最大限制 ${formatFileSize(maxSize)}`);
                continue;
            }
            try {
                await uploadFile(
                    {app_id, agent_id: "0"},
                    {upload_dir: "const"},
                    file,
                    localStorage.token
                );
                await getFileList();
                toast.success(`文件 "${file.name}" 上传成功`);
            } catch (error) {
                toast.error(`文件 "${file.name}" 上传失败`);
            }
        }
    }

    async function getFileList() {
        await getFiles(app_id, localStorage.token)
            .then(data => {
                files = data ?? [];
            })
            .catch(error => {
                toast.error('获取文件列表失败');
            });
    }

    function showDelete(event: Event, file: object) {
        event.stopPropagation(); // 阻止事件冒泡到文件名点击
        delFileInfo = file;
        showDelConfirm = true;
    }

    async function handleDelConfirm() {
        if (delFileInfo) {
            await deleteFile(app_id, delFileInfo.name, localStorage.token, "const")
                .then(async () => {
                    await getFileList();
                    toast.success(`文件 "${delFileInfo.name}" 删除成功`);
                })
            delFileInfo = null;
        }
    }

    async function handleDownload(event: Event, file) {
        event.stopPropagation(); // 阻止事件冒泡到文件名点击
        const blob = await getFileStream(app_id, file.name, localStorage.token);
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = file.name;
        document.body.appendChild(a);
        a.click();
        //清理临时资源（避免内存泄漏）
        setTimeout(() => {
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }, 100);
    }

    async function handlePreview(file) {
        try {
            await getFileStream(app_id, file.name, localStorage.token)
                .then((blob) => {
                    console.log(blob)
                    previewFile = {
                        id: `preview-${Date.now()}`,
                        name: file.name,
                        blob: blob,
                        type: file.name.toLowerCase().endsWith('.docx') ? 'docx' : undefined
                    };
                    showPreview = true;
                })
        } catch (error) {
            console.log('预览失败')
        }
    }


    function triggerFileInput() {
        fileInput?.click();
    }

    function handleDragOver(event: DragEvent) {
        event.preventDefault();
        isDragging = true;
    }

    function handleDragLeave(event: DragEvent) {
        event.preventDefault();
        isDragging = false;
    }

    function handleDrop(event: DragEvent) {
        event.preventDefault();
        isDragging = false;

        if (event.dataTransfer?.files) {
            addFiles(Array.from(event.dataTransfer.files));
        }
    }

    function isFileTypeAllowed(fileName: string): boolean {
        const extension = '.' + fileName.split('.').pop()?.toLowerCase();
        return allowedTypes.includes(extension);
    }

    onMount(() => {
        getFileList();
    });
</script>

<div class="w-[24vw] bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-700 flex flex-col h-[calc(100vh-73px)]">
    <!-- 头部工具栏 -->
    <div class="px-2 py-0 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between bg-gray-50 dark:bg-gray-900 flex-shrink-0">
        <span class="py-3.5 px-2 text-sm font-medium">文件管理</span>
        <button
                class="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors"
                on:click={handleClose}
                title="关闭"
        >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M6 18L18 6M6 6l12 12" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
            </svg>
        </button>
    </div>

    <!-- 文件上传区域 -->
    <div class="p-4 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
        <div
                class="border-2 border-dashed rounded-lg p-6 text-center transition-colors cursor-pointer
                {isDragging ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'}"
                on:click={triggerFileInput}
                on:dragleave={handleDragLeave}
                on:dragover={handleDragOver}
                on:drop={handleDrop}
        >
            <input
                    accept={allowedTypes.join(',')}
                    bind:this={fileInput}
                    class="hidden"
                    multiple
                    on:change={handleFileSelect}
                    type="file"
            />
            <svg class="w-12 h-12 mx-auto mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
            </svg>
            <p class="text-sm text-gray-600 dark:text-gray-400 mb-1">
                {isDragging ? '释放以上传文件' : '点击或拖拽文件到此处上传'}
            </p>
            <p class="text-xs text-gray-500 dark:text-gray-500">
                支持格式: {allowedTypes.join(', ')} (最大 {formatFileSize(maxSize)})
            </p>
        </div>
    </div>

    <!-- 文件列表标题 -->
    <div class="px-4 pt-4 pb-2 flex-shrink-0">
        <h3 class="text-sm font-medium text-gray-700 dark:text-gray-300">
            文件列表 ({files?.length || 0})
        </h3>
    </div>

    <!-- 文件列表 - 可滚动区域 -->
    <div class="flex-1 overflow-y-auto px-4 pb-4">
        {#if files.length === 0}
            <div class="text-center py-8 text-gray-500 dark:text-gray-400 text-sm">
                暂无文件
            </div>
        {:else}
            <div class="space-y-2">
                {#each files as file (file.id)}
                    <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 hover:bg-gray-100 dark:hover:bg-gray-750 transition-colors">
                        <div class="flex items-start justify-between gap-2">
                            <!-- 文件信息区域 - 可点击预览 -->
                            <div
                                    class="flex-1 min-w-0 cursor-pointer"
                                    on:click={() => handlePreview(file)}
                            >
                                <div class="flex items-center mb-1">
                                    <svg class="w-4 h-4 mr-2 text-blue-500 flex-shrink-0" fill="currentColor"
                                         viewBox="0 0 20 20">
                                        <path fill-rule="evenodd"
                                              d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                                              clip-rule="evenodd"/>
                                    </svg>
                                    <p class="text-sm font-medium text-gray-900 dark:text-gray-100 truncate hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                                       title={file.name}>
                                        {file.name}
                                    </p>
                                </div>
                                <p class="text-xs text-gray-500 dark:text-gray-400 ml-6"
                                   title="{formatTimestamp(file.modified_time)}">
                                    {formatFileSize(file.size)} • {getRelativeTime(file.modified_time)}
                                </p>
                            </div>

                            <!-- 操作按钮 - 始终显示 -->
                            <div class="flex items-center gap-1 flex-shrink-0">
                                <!-- 下载按钮 -->
                                <button
                                        class="p-1.5 rounded hover:bg-gray-200 dark:hover:bg-gray-600 text-green-600 dark:text-green-400 transition-colors"
                                        on:click={(e) => handleDownload(e, file)}
                                        title="下载"
                                >
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                                              stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                                    </svg>
                                </button>
                                <!-- 删除按钮 -->
                                <button
                                        class="p-1.5 rounded hover:bg-gray-200 dark:hover:bg-gray-600 text-red-600 dark:text-red-400 transition-colors"
                                        on:click={(e) => showDelete(e, file)}
                                        title="删除"
                                >
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                              stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                {/each}
            </div>
        {/if}
    </div>
</div>

<!-- 文件预览组件（条件渲染） -->
{#if showPreview && previewFile}
    <FilePreview file={previewFile} on:close={() => (showPreview = false)}/>
{/if}

<ConfirmDialog
        bind:show={showDelConfirm}
        icon="danger"
        message="确定要删除文件 <strong>{delFileInfo?.name}</strong> 吗？"
        on:cancel={()=>{showDelConfirm = false;}}
        on:confirm={handleDelConfirm}
        size="sm"
        title="删除文件"
/>