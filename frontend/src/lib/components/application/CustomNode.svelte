<script>
    import { Handle, Position } from '@xyflow/svelte';

    export let data;
    export let selected = false;

    $$restProps

    $: nodeClass = `
        bg-white dark:bg-gray-800 border-1 rounded-lg shadow-md min-w-[150px] max-w-[180px] transition-all duration-200
        ${selected
            ? 'border-blue-500 shadow-lg scale-103'
            : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
        }
    `;
</script>

<div class={nodeClass}>
    <Handle class="!w-3 !h-3 !bg-blue-500" type="target" position={Position.Left}  />

    <div class="p-2.5">
        <div class="flex items-center space-x-1.5 mb-2">
            <div class="flex-1 min-w-0">
                <h3 class="font-semibold text-gray-900 dark:text-gray-100 truncate text-xs">
                    {data.name || '未命名节点'}
                </h3>
                {#if data.task}
                    <p class="text-[10px] text-gray-500 dark:text-gray-400 truncate">
                        {data.task}
                    </p>
                {/if}
            </div>
        </div>

        {#if data.tools && data.tools.length > 0}
            <div class="flex flex-wrap gap-0.5 mb-2">
                {#each data.tools.slice(0, 2) as tool}
                    <span class="px-1.5 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400 text-[10px] rounded-full">
                        🛠 {tool.name}
                    </span>
                {/each}
                {#if data.tools.length > 2}
                    <span class="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-[10px] rounded-full">
                        +{data.tools.length - 2}
                    </span>
                {/if}
            </div>
        {/if}

        <div class="space-y-0.5 text-[10px]">
            <!--{#if data.inputData && data.inputData.length > 0}-->
            <!--    <div class="flex items-center space-x-1 text-green-600 dark:text-green-400">-->
            <!--        <svg class="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 20 20">-->
            <!--            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.293l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clip-rule="evenodd"/>-->
            <!--        </svg>-->
            <!--        <span class="truncate">输入:-->
            <!--            {#each data.inputData.slice(0, 2) as indate}-->
            <!--                {indate.name}&nbsp;-->
            <!--            {/each}-->
            <!--        </span>-->
            <!--    </div>-->
            <!--{/if}-->

            {#if data.outputData && data.outputData.length > 0}
                <div class="flex items-center space-x-1 text-orange-600 dark:text-orange-400">
                    <svg class="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-10.293l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 7.414V11a1 1 0 102 0V7.414l1.293 1.293a1 1 0 001.414-1.414z" clip-rule="evenodd"/>
                    </svg>
                    <span class="truncate">输出:
                        {#each data.outputData.slice(0, 2) as outdata}
                            {outdata.name}&nbsp;
                        {/each}
                    </span>
                </div>
            {/if}
        </div>
    </div>
    <Handle class="!w-3 !h-3 !bg-orange-500" type="source" position={Position.Right} />
</div>