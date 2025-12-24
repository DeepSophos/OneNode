<script>
    import {writable} from 'svelte/store';
    import Tooltip from "$lib/components/common/Tooltip.svelte";
    // 接收外部属性
    export let treeData = [];
    export let onNodeSelect = null;
    // 共享状态：展开状态（store）、选中节点ID（store）
    export let expandedNodes = writable({});
    export let selectedNodeId = writable(null);
    export let depth = 0;

    // 切换展开/折叠
    function toggleExpand(node, e) {
        e.stopPropagation(); // 隔离事件，避免触发选中
        expandedNodes.update(state => {
            const currentState = state[node.id] ?? false;
            return {...state, [node.id]: !currentState};
        });
    }

    // 节点选中处理
    function handleSelect(node) {
        selectedNodeId.set(node.id);
        if (onNodeSelect) onNodeSelect(node);
    }
</script>

<style>
    .tree-node {
        transition: background-color 0.2s ease;
    }

    .tree-node:hover {
        background-color: #15a47230;
    }

    /* 浅色模式选中 */
    .tree-node.selected {
        background-color: #15a472;
        color: white;
    }

    /* 选中状态下的箭头颜色同步 */
    .tree-node.selected .arrow-btn {
        color: white;
    }
</style>
<div class="w-full h-[100%] overflow-auto text-sm">
    <ul class="list-none ">
        {#each treeData as node}
            <li style="padding-left: {depth * 6}px">
                <!-- 核心：通过 $selectedNodeId 判断是否选中，动态添加 selected 类 -->
                <div class="flex items-center ">
                    {#if node.children && node.children.length > 0}
                        <button
                                class="arrow-btn w-4 h-4 mr-1 focus:outline-none cursor-pointer"
                                on:click={(e) => toggleExpand(node, e)}
                        >
                            {#if $expandedNodes[node.id] ?? false}
                                <!-- 向下箭头（展开） -->
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     stroke="currentColor" stroke-width="2" class="w-4 h-4">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/>
                                </svg>
                            {:else}
                                <!-- 右箭头（折叠） -->
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     stroke="currentColor" stroke-width="2" class="w-4 h-4">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/>
                                </svg>
                            {/if}
                        </button>
                    {:else}
                        <!-- 无子节点占位符 -->
                        <span class="w-4 h-4 mr-1"></span>
                    {/if}

                    <!-- 点击文本选中节点 -->
                    <span class="flex-1 w-[100%] text-sm cursor-pointer select-none p-1 rounded tree-node { $selectedNodeId === node.id ? 'selected' : '' } text-ellipsis overflow-hidden whitespace-nowrap"
                          title="{node.label}"
                          on:click={() => handleSelect(node)}
                    >
                        {node.label}
                    </span>

                </div>

                <!-- 子节点渲染（展开状态才显示） -->
                {#if node.children && node.children.length > 0 && ($expandedNodes[node.id] ?? false)}
                    <Tree
                            treeData={node.children}
                            onNodeSelect={onNodeSelect}
                            {expandedNodes}
                            {selectedNodeId}
                            depth={depth + 1}
                    />
                {/if}
            </li>
        {/each}
    </ul>
</div>
<script context="module">
    import Tree from './Tree.svelte';

    export {Tree};
</script>

