<script>
    import {createEventDispatcher} from 'svelte';
    import {addTools, delTools} from "$lib/apis/application";
    import { onMount} from "svelte";

    const dispatch = createEventDispatcher();

    export let isOpen = false;
    export let availableNodes = [];
    export let onSelect = () => {};
    export let onClose = () => {};

    let start_node;
    // 阻止弹窗冒泡
    function stopPropagation(event) {
        event.stopPropagation();
    }

    function handleComplete() {
        onSelect(start_node);
    }

    onMount(() => {
    })
</script>

{#if isOpen}
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md max-h-[80vh] flex flex-col"
             on:click={stopPropagation}>
            <div class="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                <div>
                    <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">选择运行起始节点</h3>
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
                {#if availableNodes.length > 0}
                    <div >
                        {#each availableNodes as node}
                            <label class="flex items-start space-x-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg cursor-pointer transition-colors border border-transparent hover:border-gray-200 dark:hover:border-gray-600">
                                <input
                                        type="checkbox"
                                        checked = {start_node?.id === node.id}
                                        on:change={() => start_node = node}
                                        class="w-4 h-4 mt-1.5 text-blue-600 dark:text-blue-400 rounded border-gray-300 dark:border-gray-500 focus:ring-blue-500 focus:ring-2"
                                />
                                <div class="flex items-start space-x-2 flex-1">
                                    <div>
                                        <div class="text-sm font-medium text-gray-900 dark:text-gray-100">{node.data.name}</div>
                                    </div>
                                </div>
                            </label>
                        {/each}
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