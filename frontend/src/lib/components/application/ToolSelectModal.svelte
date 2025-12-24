<script>
    import {createEventDispatcher} from 'svelte';
    import {addTools, delTools} from "$lib/apis/application";
    import { onMount} from "svelte";

    const dispatch = createEventDispatcher();

    export let isOpen = false;
    export let availableTools = [];
    export let selectedTools = [];
    export let onUpdate = () => {
    };
    export let onClose = () => {
    };
    export let app_id = '';
    export let agent_id = '';

    // 全选/取消全选工具
    function toggleAllTools() {
        if (selectedTools.length === availableTools.length) {
            selectedTools = [];
        } else {
            selectedTools = availableTools;
        }
    }

    // 工具多选切换
    function toggleTool(tool) {
        const isSelected = selectedTools.some(t => t.node_id === tool.node_id);

        selectedTools = isSelected
            ? selectedTools.filter(t => t.node_id !== tool.node_id)
            : [...selectedTools, tool];
    }

    // 阻止弹窗冒泡
    function stopPropagation(event) {
        event.stopPropagation();
    }

    function handleComplete() {
        for (const tool of selectedTools) {
            addTools({app_id: app_id, agent_id: agent_id, tool_id: tool.node_id}, localStorage.token);
        }
        onUpdate(selectedTools);
    }

    onMount(() => {
    })
</script>

{#if isOpen}
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
         on:click={onClose}>
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md max-h-[80vh] flex flex-col"
             on:click={stopPropagation}>
            <div class="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                <div>
                    <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">选择工具</h3>
                    <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        已选择 {selectedTools.length} / {availableTools.length} 个工具
                    </p>
                </div>
                <button
                        on:click={onClose}
                        class="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                </button>
            </div>

            <div class="flex-1 overflow-y-auto p-6">
                {#if availableTools.length > 0}
                    <div class="mb-4">
                        <button
                                type="button"
                                on:click={toggleAllTools}
                                class="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 font-medium"
                        >
                            {selectedTools.length === availableTools.length ? '取消全选' : '全选'}
                        </button>
                    </div>

                    <div >
                        {#each availableTools as tool}
                            <label class="flex items-start space-x-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg cursor-pointer transition-colors border border-transparent hover:border-gray-200 dark:hover:border-gray-600">
                                <input
                                        type="checkbox"
                                        checked={selectedTools.some(t => t.node_id === tool.node_id)}
                                        on:change={() => toggleTool(tool)}
                                        class="w-4 h-4 mt-1.5 text-blue-600 dark:text-blue-400 rounded border-gray-300 dark:border-gray-500 focus:ring-blue-500 focus:ring-2"
                                />
                                <div class="flex items-start space-x-2 flex-1">
                                    <span class="text-lg">{tool.icon}</span>
                                    <div>
                                        <div class="text-sm font-medium text-gray-900 dark:text-gray-100">{tool.name}</div>
                                        {#if tool.description}
                                            <div class="text-xs text-gray-500 dark:text-gray-400" style="white-space: pre-wrap;">{tool.description}</div>
                                        {/if}
                                    </div>
                                </div>
                            </label>
                        {/each}
                    </div>
                {:else}
                    <div class="text-center py-8 text-gray-500 dark:text-gray-400">
                        <svg class="w-12 h-12 mx-auto mb-2 opacity-50" fill="none" stroke="currentColor"
                             viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                        </svg>
                        <p>暂无可用工具</p>
                    </div>
                {/if}
            </div>

            <div class="p-6 border-t border-gray-200 dark:border-gray-700 flex justify-end space-x-3">
                <button
                        on:click={handleComplete}
                        class="px-4 py-2 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors font-medium"
                >
                    完成
                </button>
            </div>
        </div>
    </div>
{/if}