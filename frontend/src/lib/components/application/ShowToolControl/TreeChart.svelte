<script>
    import Tree from '$lib/components/common/Tree.svelte';
    import {onMount, createEventDispatcher} from 'svelte';
    import Markdown from '$lib/components/chat/Messages/Markdown.svelte';
    import {writable} from "svelte/store";
    import {getTreeNodeIds} from "$lib/utils/index";
    export let show = false;
    export let data = [];
    const dispatch = createEventDispatcher();

    function closeModal() {
        selectedNode = null;
        show = false;
        dispatch('close');
    }

    let expandedNodes = writable({});
    let selectedNode = null;
    // Markdown滚动容器
    let treeContentRef;
    let markdownContentRef;

    // 切换节点时重置右侧滚动条
    function handleSelect(node) {
        //console.log('选中了节点:', node);
        selectedNode = node;
        // 重置右侧Markdown区域滚动条到顶部
        if (markdownContentRef) {
            markdownContentRef.scrollTop = 0;
        }
    }

    // 拖拽相关逻辑
    let dialog;
    let isDragging = false;
    let offsetX = 0;
    let offsetY = 0;
    let left = 0;
    let top = 0;

    function handleMouseDown(e) {
        const rect = dialog.getBoundingClientRect();
        if (e.clientY - rect.top > 56) return;
        document.body.style.cursor = 'move';
        isDragging = true;
        offsetX = e.clientX - rect.left;
        offsetY = e.clientY - rect.top;
        e.preventDefault();
    }

    function handleMouseMove(e) {
        if (!isDragging) return;
        const newX = e.clientX - offsetX;
        const newY = e.clientY - offsetY;
        const rect = dialog.getBoundingClientRect();
        const maxX = window.innerWidth - rect.width;
        const maxY = window.innerHeight - rect.height;
        left = Math.max(0, Math.min(newX, maxX));
        top = Math.max(0, Math.min(newY, maxY));
    }

    function handleMouseUp() {
        isDragging = false;
        document.body.style.cursor = 'default';
    }

    $: if (isDragging) {
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    } else {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
    }

    $: if (dialog) {
        left = (document.body.clientWidth - (dialog?.clientWidth ?? 600)) / 2;
        top = (document.body.clientHeight - (dialog?.clientHeight ?? 600)) / 2;
    }

    $: if(data){
        expandedNodes = writable(getTreeNodeIds(data));
    }

    onMount(() => {

    });
</script>

{#if show}
    <div
            bind:this={dialog}
            class="fixed z-50 bg-white dark:bg-gray-900 rounded-lg shadow-2xl w-[65vw] h-[70vh] flex flex-col select-none"
            style:left={`${left}px`} style:top={`${top}px`}
            on:mousedown={handleMouseDown}
            role="dialog"
            aria-modal="true">

        <!-- 模态框头部（带关闭按钮） -->
        <div class="border-b dark:border-gray-700 px-6 py-4 flex justify-between items-center">
            <h3 class="text-lg font-semibold dark:text-white">知识点</h3>
            <button
                    class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                    on:click={closeModal}
            >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clip-rule="evenodd"/>
                </svg>
            </button>
        </div>

        <div class="flex-1 overflow-hidden flex justify-start border rounded-b-lg shadow-sm dark:border-gray-700 bg-white dark:bg-gray-900">
            <div class="w-[30%] flex flex-col h-full">
                <div class="flex-1 overflow-auto p-4" bind:this={treeContentRef}>
                    <Tree
                            {expandedNodes}
                            onNodeSelect={handleSelect}
                            treeData={data}
                            class="rounded-md"
                    />
                </div>
            </div>

            <div class="flex-1 overflow-auto p-6 box-border bg-gray-50 dark:bg-gray-800"
                 bind:this={markdownContentRef}>
                {#if selectedNode && selectedNode.desc}
                    <div class="max-w-3xl mx-auto">
                        <h3 class="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100 border-b pb-2 dark:border-gray-700">
                            {selectedNode.label}
                        </h3>
                        <div class="markdown-content prose prose-gray dark:prose-invert prose-sm md:prose-base max-w-none">
                            <Markdown
                                    id={selectedNode.id}
                                    content={selectedNode.desc}
                                    class="space-y-4"
                            />
                        </div>
                    </div>
                {:else}
                    <div class="h-full flex items-center justify-center text-gray-400 dark:text-gray-500 ">
                        <div class="text-center p-6">
                            <svg class="w-12 h-12 mx-auto mb-3 opacity-50" fill="none" stroke="currentColor"
                                 viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                            </svg>
                            <p class="text-sm md:text-base">{selectedNode ? '暂无相关数据详情' : '选中左侧节点查看相关数据详情'}</p>
                        </div>
                    </div>
                {/if}
            </div>
        </div>
    </div>
{/if}
