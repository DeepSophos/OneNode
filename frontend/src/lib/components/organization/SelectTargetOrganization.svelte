<script lang="ts">
    import {createEventDispatcher, onMount} from 'svelte';
    import {ListUnits} from "$lib/apis/unit";

    export let selectedPath = "";
    export let title = "选择组织机构";
    export let showConfirmButton = true;

    const dispatch = createEventDispatcher();
    let orgData = [];
    let currentNodes = orgData;
    let breadcrumbs = [{label: "根节点", path: ""}];
    let currentPath = "";
    let selectedOrg = null;
    let clickTimer = null;
    const clickDelay = 300;

    function updateBreadcrumbs(path) {
        if (!path) {
            breadcrumbs = [{label: "根节点", path: ""}];
            return;
        }

        const pathParts = path.split('/').filter(part => part.trim() !== '');
        breadcrumbs = [{label: "根节点", path: ""}];

        let currentBreadcrumbPath = "";
        pathParts.forEach(part => {
            currentBreadcrumbPath = currentBreadcrumbPath ? `${currentBreadcrumbPath}/${part}` : part;
            breadcrumbs.push({
                label: part,
                path: currentBreadcrumbPath
            });
        });
    }

    function handleNodeClick(node, event) {
        if (clickTimer) clearTimeout(clickTimer);

        clickTimer = setTimeout(() => {
            if (selectedOrg?.id === node.id) {
                selectedOrg = null;
                selectedPath = "";
            } else {
                selectedOrg = node;
                selectedPath = currentPath ? `${currentPath}/${node.label}` : node.label;
            }

            dispatch('selectionChange', {selectedOrg, selectedPath});
            clickTimer = null;
        }, clickDelay);
    }

    async function handleNodeDBClick(node, event) {
        if (clickTimer) {
            clearTimeout(clickTimer);
            clickTimer = null;
        }

        const newPath = currentPath ? `${currentPath}/${node.label}` : node.label;
        currentPath = newPath;
        selectedOrg = node;
        selectedPath = newPath;
        updateBreadcrumbs(currentPath);
        await GetListUnits(newPath);

        dispatch('selectionChange', {selectedOrg, selectedPath});
    }

    async function handleBreadcrumbClick(index) {
        if (index === 0) {
            currentPath = "";
            breadcrumbs = [{label: "根节点", path: ""}];
            await GetListUnits("");
        } else if (index < breadcrumbs.length - 1) {
            const targetBreadcrumb = breadcrumbs[index];
            currentPath = targetBreadcrumb.path;
            breadcrumbs = breadcrumbs.slice(0, index + 1);
            await GetListUnits(currentPath);
        }
    }

    function handleConfirm() {
        dispatch('confirm', {selectedOrg, selectedPath});
    }

    function handleCancel() {
        dispatch('cancel');
    }

    function handleClose() {
        dispatch('cancel');
    }

    async function GetListUnits(path = '') {
        try {
            const res = await ListUnits(localStorage.token, path);
            const units = res.units;

            orgData = units.map(item => ({
                id: `${path ? path + '/' : ''}${item}`,
                label: item,
                children: []
            }));

            currentNodes = orgData;
        } catch (error) {
            console.error('获取单位列表失败:', error);
        }
    }

    onMount(async () => {
        breadcrumbs = [{label: "根节点", path: ""}];
        currentPath = "";
        await GetListUnits();
    });
</script>

<div class="fixed inset-0 flex items-center justify-center z-50">
    <div
            class="w-[40vw]  h-[55vh]  flex flex-col bg-gray-50 dark:bg-gray-850 rounded-lg shadow-lg overflow-hidden p-3"
    >
        <div class="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 ">
                <h2 id="modal-title"
                    class="text-lg font-semibold text-gray-900 dark:text-white flex items-center space-x-2">
                    <span>{title}</span>
                </h2>
                <!-- 关闭按钮 -->
                <button
                        class=" p-2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-all duration-200 hover:scale-105"
                        on:click={handleClose}
                        aria-label="关闭"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                         stroke="currentColor" class="w-5 h-5 group-hover:rotate-90 transition-transform duration-200">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                </button>
            </div>

        <!-- 面包屑导航 -->
        <div class="p-2 border-b border-gray-200 dark:border-gray-700">
            <div class="flex items-center space-x-1 text-sm overflow-x-auto py-1">
                {#each breadcrumbs as breadcrumb, index}
                    <button
                            class="cursor-pointer hover:text-blue-500 hover:underline px-1.5 py-0.5 rounded transition-colors duration-200 whitespace-nowrap
                               {index === breadcrumbs.length - 1 ? 'text-gray-900 dark:text-white font-medium' : 'text-gray-600 dark:text-gray-400'}"
                            on:click={() => handleBreadcrumbClick(index)}
                    >
                        {breadcrumb.label}
                    </button>
                    {#if index < breadcrumbs.length - 1}
                        <span class="text-gray-400 dark:text-gray-500">/</span>
                    {/if}
                {/each}
            </div>
        </div>

        <!-- 树形结构 -->
        <div class="flex-1 overflow-y-auto">
            {#each currentNodes as node}
                <div
                        class="flex items-center p-2 mx-1 my-0.5 rounded transition-colors duration-200 cursor-pointer select-none
                    {selectedOrg?.id === node.id
                        ? 'bg-blue-100 dark:bg-blue-700/20 text-blue-900 dark:text-blue-100'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-700/30'}"
                        on:click={(event) => handleNodeClick(node, event)}
                        on:dblclick={(event) => handleNodeDBClick(node, event)}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                         stroke="currentColor" class="w-4 h-4 text-gray-500 mr-2 flex-shrink-0">
                        <path stroke-linecap="round" stroke-linejoin="round"
                              d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0121.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"/>
                    </svg>
                    <span class="text-sm dark:text-gray-300 truncate">{node.label}</span>
                </div>
            {/each}
        </div>

        <!-- 当前选择路径 -->
        <div class="p-2 border-t border-gray-200 dark:border-gray-700 text-xs text-gray-500 dark:text-gray-400 truncate">
            {#if selectedPath}
                当前选择: {selectedPath}
            {:else}
                未选择
            {/if}
        </div>

        <!-- 底部操作按钮 -->
        {#if showConfirmButton}
            <div class="flex items-center justify-end space-x-2 p-2 border-t border-gray-200 dark:border-gray-700">
                <button
                        type="button"
                        class="px-3 py-1.5 text-xs font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded shadow-sm hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors duration-200"
                        on:click={handleCancel}
                >
                    取消
                </button>
                <button
                        type="button"
                        class="px-3 py-1.5 text-xs font-medium text-white bg-blue-600 border border-transparent rounded shadow-sm hover:bg-blue-700 transition-colors duration-200
                    {!selectedOrg ? 'opacity-50 cursor-not-allowed' : ''}"
                        on:click={handleConfirm}
                        disabled={!selectedOrg}
                >
                    确认选择
                </button>
            </div>
        {/if}
    </div>
</div>