<script>
    import {createEventDispatcher} from "svelte";
    import {performFileOperationList} from '$lib/apis/chats';

    const dispatch = createEventDispatcher();
    export let visible = false;
    export let files = [];
    export let scopeName = '';

    // 处理选择变化 - 点击行时触发
    function handleRowClick(fileIndex, similarFileIndex) {
        // 创建新的数组副本以触发响应式更新
        const updatedFiles = [...files];
        const currentSelection = updatedFiles[fileIndex].selections[similarFileIndex];

        // 重置当前文件组的所有选择状态为false
        updatedFiles[fileIndex].selections = updatedFiles[fileIndex].selections.map(() => false);

        // 当前点击项取反（如果之前未选中则选中，如果已选中则取消）
        updatedFiles[fileIndex].selections[similarFileIndex] = !currentSelection;

        // 更新文件数组
        files = updatedFiles;
    }

    // 处理确认按钮点击
    async function handleConfirm() {
        for (let i = 0; i < files.length; i++) {
            const item = files[i];
            const trueIndex = item.selections.findIndex(sel => sel === true);
            if (trueIndex !== -1) {
                const trueSimilarFile = item.similarFiles[trueIndex];
                try {
                    await updateSelectedFiles(trueSimilarFile, item.name);
                } catch (error) {
                    console.error('更新文件失败:', error);
                }
            }
        }
        dispatch('confirm');
        visible = false;
    }

    const updateSelectedFiles = async (fromName, toName) => {
        let opItems = [{
            "keyname": toName,//to
            "scope": scopeName,
            "status": 'unstaged',
            "operation": 'version_up',
            "data": {'related_file': [fromName]}//from
        }];
        const requestData = {
            "operations": opItems
        };
        await performFileOperationList(localStorage.token, requestData);
    }

    // 处理取消按钮点击
    function handleCancel() {
        visible = false;
    }
</script>

{#if visible}
    <div class="fixed inset-0 bg-black bg-opacity-50 dark:bg-opacity-70 flex items-center justify-center z-50 transition-opacity duration-300">
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-5xl max-h-[80vh] flex flex-col animate-fade-in-up">
            <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                <h3 class="text-xl font-bold text-gray-800 dark:text-white mb-2">
                    选择要更新的文件
                </h3>
                <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    发现知识集中已存在名称相似的文件，如果是更新请选择对应的项。
                </p>
            </div>
            <div class="flex-1 p-6 overflow-y-auto">
                <div class="space-y-2">
                    {#each files as file, fileIndex}
                        <div class="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden transition-all duration-200 hover:shadow-md dark:hover:shadow-gray-700/20">
                            <div class="bg-gray-50 dark:bg-gray-700/50 text-center px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                                <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300">{file.name}</h4>
                            </div>

                            <div class="divide-y divide-gray-200 dark:divide-gray-700">
                                {#each file.similarFiles as similarFile, similarFileIndex}
                                    <div
                                            class="flex items-center justify-between px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors duration-150 cursor-pointer"
                                            on:click={() => handleRowClick(fileIndex, similarFileIndex)}
                                    >
                                        <div class="flex-1 select-none">
                                            <span class="text-sm text-gray-700 dark:text-gray-300">{similarFile}</span>
                                        </div>
                                        <label class="inline-flex items-center">
                                            <input
                                                    type="checkbox"
                                                    name={"file-group-" + fileIndex}
                                                    checked={file.selections?.[similarFileIndex] || false}
                                                    class="h-4 w-4 text-blue-600 dark:text-blue-500 focus:ring-blue-500 dark:focus:ring-blue-600 border-gray-300 dark:border-gray-600 rounded transition-colors duration-200"
                                            />
                                        </label>
                                        <span class="ml-2 text-sm text-gray-600 dark:text-gray-400">强制更新</span>
                                    </div>
                                {/each}
                            </div>
                        </div>
                    {/each}
                </div>
            </div>

            <div class="bg-gray-50 dark:bg-gray-800 px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex justify-end space-x-3">
                <button
                        type="button"
                        on:click={handleCancel}
                        class="px-5 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 outline-none"
                >
                    取消
                </button>
                <button
                        type="button"
                        on:click={handleConfirm}
                        class="px-5 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 outline-none"
                >
                    确认
                </button>
            </div>
        </div>
    </div>
{/if}

<style>
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .animate-fade-in-up {
        animation: fadeInUp 0.3s ease-out forwards;
    }
</style>
