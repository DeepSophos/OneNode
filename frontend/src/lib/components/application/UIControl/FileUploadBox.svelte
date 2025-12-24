<script>

    import {uploadFile} from "$lib/apis/application";

    export let options = {};
    export let isReady = false;

    let files = [];
    let isDragging = false;
    let fileInput;
    let uploadStatus = {};
    let isFirstUpload = true;

    async function handleFiles(newFiles) {
        if (newFiles.length === 0) return;
        // 添加新文件到列表（初始状态为待上传）
        newFiles.forEach(file => {
            const fileKey = getFileKey(file);
            if (!files.some(f => getFileKey(f) === fileKey)) {
                files = [...files, file];
                uploadStatus[fileKey] = 'pending'; // 待上传状态
            }
        });

        // 逐个上传文件
        for (const file of newFiles) {
            const fileKey = getFileKey(file);
            uploadStatus[fileKey] = 'uploading';  // 标记为上传中

            try {
                const result = await simulateUpload(file);

                uploadStatus[fileKey] = result.success ? 'success' : 'failed';
            } catch (error) {
                console.error('上传失败:', error);
                uploadStatus[fileKey] = 'failed';
            }
        }
        isReady = true;
    }

    function simulateUpload(file) {
        if(isFirstUpload)
        {
            options["clear"] = true;
            isFirstUpload = false;
        }
        else
        {
            delete options["clear"];
        }
        return new Promise(resolve => {
            uploadFile({
                    app_id:options.app_id,
                    agent_id:options.agent_id,
                },
                options,
                file,
                localStorage.getItem("token")
            ).then((response) => {
                options.callbackData = {description: (options.callbackData?.description ?? "上传文件：\n") + "\r" + response.filename + "\n"};
                resolve({success: response.status == 'successfully'});
            }).catch((error) => {
                resolve({success: false});
            });

        });
    }

    // 处理文件选择
    function handleFileChange(event) {
        const selectedFiles = Array.from(event.target.files);
        handleFiles(selectedFiles);
        // 清空输入框允许重复选择
        fileInput.value = '';
    }

    // 拖拽相关处理
    function handleDragOver(event) {
        event.preventDefault();
        isDragging = true;
    }

    function handleDragLeave() {
        isDragging = false;
    }

    function handleDrop(event) {
        event.preventDefault();
        isDragging = false;
        const droppedFiles = Array.from(event.dataTransfer.files);
        handleFiles(droppedFiles);
    }

    // 移除文件
    function removeFile(index) {
        const file = files[index];
        files = files.filter((_, i) => i !== index);
        delete uploadStatus[getFileKey(file)];
    }

    // 重试上传失败的文件
    function retryUpload(index) {
        const file = files[index];
        handleFiles([file]);
    }

    // 工具函数：生成文件唯一标识
    function getFileKey(file) {
        return `${file.name}-${file.size}-${file.lastModified}`;
    }

    // 格式化文件大小
    function formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return `${(bytes / Math.pow(k, i)).toFixed(2)} ${sizes[i]}`;
    }

    // 触发文件选择
    function triggerFileInput() {
        fileInput.click();
    }
</script>

<div class="w-full h-full">
    <div class="flex flex-col lg:flex-row h-full gap-4">
        <!-- 上传区域 -->
        <div
            class="flex-1 bg-white dark:bg-gray-900 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-700 p-6 transition-all duration-300 hover:border-blue-400 dark:hover:border-blue-500 hover:bg-blue-50/50 dark:hover:bg-blue-900/10"

            on:dragleave={handleDragLeave}
            on:dragover={handleDragOver}
            on:drop={handleDrop}
        >
            <div
                class="h-full flex flex-col items-center justify-center text-center cursor-pointer"
                on:click={triggerFileInput}
            >
                <svg class="w-16 h-16 text-gray-400 dark:text-gray-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                          stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                </svg>
                <h3 class="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    {isDragging ? '释放文件以上传' : '选择文件或拖放到此处'}
                </h3>
                <p class="text-gray-500 dark:text-gray-400 text-sm mb-6">
                    支持文件类型: {options.file_format || '所有类型'}
                </p>
                <button
                    class="inline-flex items-center px-6 py-3 bg-blue-600 dark:bg-blue-700 text-white font-medium rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:ring-offset-2 dark:focus:ring-offset-gray-900 transition-all duration-200"
                    type="button"
                >
                    <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path d="M12 6v6m0 0v6m0-6h6m-6 0H6" stroke-linecap="round" stroke-linejoin="round"
                              stroke-width="2"/>
                    </svg>
                    选择文件
                </button>
            </div>

            <input
                accept="{ options?.file_format ? options.file_format.split(',').map(ext => '.' + ext.trim()).join(',') : '' }"
                bind:this={fileInput}
                class="hidden"
                multiple
                on:change={handleFileChange}
                type="file"
            />
        </div>

        <!-- 文件列表区域 -->
        <div class="flex-1 flex flex-col bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            {#if files.length > 0}
                <div class="flex flex-col h-full">
                    <!-- 列表标题 -->
                    <div class="flex items-center justify-between p-3 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
                        <div class="text-sm font-medium text-gray-700 dark:text-gray-300">
                            文件列表 ({files.length})
                        </div>
                    </div>

                    <!-- 列表内容 -->
                    <div class="flex-1 overflow-y-auto p-4">
                        <div class="space-y-3">
                            {#each files as file, index (getFileKey(file))}
                                <div class="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-white dark:hover:bg-gray-750 hover:border-blue-200 dark:hover:border-blue-900/50 transition-all duration-200 group">
                                    <div class="flex items-center space-x-3 flex-1 min-w-0">
                                        <!-- 状态图标 -->
                                        <div class="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center bg-gray-100 dark:bg-gray-900">
                                            {#if uploadStatus[getFileKey(file)] === 'uploading'}
                                                <svg class="w-5 h-5 text-blue-500 animate-spin" fill="none"
                                                     stroke="currentColor" viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                          stroke-width="2"
                                                          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                                                </svg>
                                            {:else if uploadStatus[getFileKey(file)] === 'failed'}
                                                <svg class="w-5 h-5 text-red-500" fill="none" stroke="currentColor"
                                                     viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                          stroke-width="2"
                                                          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                                </svg>
                                            {:else if uploadStatus[getFileKey(file)] === 'pending'}
                                                <svg class="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor"
                                                     viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                          stroke-width="2"
                                                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                                </svg>
                                            {:else}
                                                <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor"
                                                     viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                          stroke-width="2"
                                                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                                </svg>
                                            {/if}
                                        </div>

                                        <!-- 文件信息 -->
                                        <div class="flex-1 min-w-0">
                                            <p class="text-sm font-medium text-gray-900 dark:text-gray-200 truncate">{file.name}</p>
                                            <div class="flex items-center flex-wrap gap-x-2 text-xs mt-1">
                                                <span class="text-gray-500 dark:text-gray-400">{formatFileSize(file.size)}</span>

                                                <!-- 状态文本 -->
                                                {#if uploadStatus[getFileKey(file)] === 'uploading'}
                                                    <span class="text-blue-500 dark:text-blue-400">上传中...</span>
                                                {:else if uploadStatus[getFileKey(file)] === 'failed'}
                                                    <span class="text-red-500 dark:text-red-400">上传失败</span>
                                                {:else if uploadStatus[getFileKey(file)] === 'pending'}
                                                    <span class="text-yellow-500 dark:text-yellow-400">等待上传</span>
                                                {:else}
                                                    <span class="text-green-500 dark:text-green-400">上传成功</span>
                                                {/if}
                                            </div>
                                        </div>
                                    </div>

                                    <!-- 操作按钮 -->
                                    <div class="flex items-center space-x-1">
                                        {#if uploadStatus[getFileKey(file)] === 'failed'}
                                            <button
                                                on:click={() => retryUpload(index)}
                                                class="p-2 text-blue-500 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded transition-colors"
                                                title="重试上传"
                                            >
                                                <svg class="w-4 h-4" fill="none" stroke="currentColor"
                                                     viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                          stroke-width="2"
                                                          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                                                </svg>
                                            </button>
                                        {/if}

                                        <button
                                            on:click={() => removeFile(index)}
                                            class="p-2 text-gray-400 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded transition-colors"
                                            title="移除文件"
                                        >
                                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                      d="M6 18L18 6M6 6l12 12"/>
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            {/each}
                        </div>
                    </div>
                </div>
            {:else}
                <!-- 空状态 -->
                <div class="flex-1 flex flex-col items-center justify-center p-8 text-center text-gray-500 dark:text-gray-400">
                    <svg class="w-16 h-16 text-gray-300 dark:text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
                    </svg>
                    <h4 class="text-lg font-medium text-gray-600 dark:text-gray-300 mb-2">暂无文件</h4>
                    <p class="text-gray-500 dark:text-gray-400 text-sm">选择或拖拽文件后将自动上传并显示在此处</p>
                </div>
            {/if}
        </div>
    </div>
</div>