<script>
    import {createEventDispatcher, onMount} from 'svelte';
    import {addInput, delInput} from "$lib/apis/application";

    const dispatch = createEventDispatcher();

    export let isOpen = false;
    export let availableDataSources = [];
    export let selectedDataSources = [];
    export let onUpdate = () => {};
    export let onClose = () => {};
    export let app_id = '';
    export let agent_id = '';


    // 全选/取消全选数据源
    function toggleAllDataSources() {
        if (selectedDataSources.length === availableDataSources.length-1) {
           selectedDataSources=[];
        } else {
            selectedDataSources =  availableDataSources.filter(s => s.id !== agent_id);
        }
    }

    // 数据源多选切换
    function toggleDataSource(source) {
        const isSelected = selectedDataSources.some(t => t.id === source.id);
        selectedDataSources = isSelected
            ? selectedDataSources.filter(s => s.id !== source.id)
            : [...selectedDataSources, source];
        console.log("2",selectedDataSources)
    }

    // 阻止弹窗冒泡
    function stopPropagation(event) {
        event.stopPropagation();
    }

    function handleComplete() {
        for (const input of selectedDataSources) {
            addInput({app_id: app_id, agent_id: agent_id, input_agent_id: input.id}, localStorage.token);
        }
        onUpdate(selectedDataSources);
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
                    <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">选择数据源</h3>
                    <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        已选择 {selectedDataSources.length} / {availableDataSources.length-1} 个数据源
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
                {#if availableDataSources.length > 1}
                    <div class="mb-4">
                        <button
                            type="button"
                            on:click={toggleAllDataSources}
                            class="text-sm text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-200 font-medium"
                        >
                            {selectedDataSources.length === availableDataSources.length-1 ? '取消全选' : '全选'}
                        </button>
                    </div>

                    <div class="space-y-2">
                        {#each availableDataSources as source}
                            {#if source.id != agent_id}
                            <label class="flex items-center space-x-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg cursor-pointer transition-colors border border-transparent hover:border-gray-200 dark:hover:border-gray-600">
                                <input
                                    type="checkbox"
                                    checked={selectedDataSources.some(t => t.id === source.id)}
                                    on:change={() => toggleDataSource(source)}
                                    class="w-4 h-4 text-green-600 dark:text-green-400 rounded border-gray-300 dark:border-gray-500 focus:ring-green-500 focus:ring-2"
                                />
                                <div class="flex items-center space-x-2 flex-1">
                                    <span class="text-lg">{source.icon}</span>
                                    <div>
                                        <div class="text-sm font-medium text-gray-900 dark:text-gray-100">{source.name}</div>
                                        {#if source.description}
                                            <div class="text-xs text-gray-500 dark:text-gray-400">{source.description}</div>
                                        {/if}
                                    </div>
                                </div>
                            </label>
                            {/if}
                        {/each}
                    </div>
                {:else}
                    <div class="text-center py-8 text-gray-500 dark:text-gray-400">
                        <svg class="w-12 h-12 mx-auto mb-2 opacity-50" fill="none" stroke="currentColor"
                             viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                  d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4"/>
                        </svg>
                        <p>暂无可用数据源</p>
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