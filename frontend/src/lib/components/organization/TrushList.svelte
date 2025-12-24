<!-- DeletedItemsList.svelte -->
<script lang="ts">
    import {getContext, onMount} from 'svelte';
    import {createEventDispatcher} from 'svelte';
    import ConfirmDialog from "$lib/components/ConfirmDialog.svelte";
    import {CleanTrush, GetTrushList, RestoreTrush} from "$lib/apis/unit"
    import {toast} from "svelte-sonner";

    const i18n = getContext('i18n');
    const dispatch = createEventDispatcher();

    // Props
    let deletedUsers = [];
    let deletedKnowledge = [];
    export let show = false; // 控制显示/隐藏
    export let allUser = false;
    export let allScopes = false;

    // 状态管理
    let activeTab = 'users'; // 'users' | 'scope'
    let selectedUserIds = [];
    let selectedKnowledgeIds = [];

    // 计算属性
    $: currentItems = activeTab === 'users' ? deletedUsers : deletedKnowledge;
    $: currentSelectedIds = activeTab === 'users' ? selectedUserIds : selectedKnowledgeIds;
    $: hasSelectedItems = currentSelectedIds.length > 0;
    $: isAllSelected = currentItems.length > 0 && currentSelectedIds.length === currentItems.length;

    // 关闭模态框
    function closeModal() {
        dispatch('close');
    }

    // 切换标签页
    function switchTab(tab) {
        activeTab = tab;
        selectedUserIds = [];
        selectedKnowledgeIds = [];
        getTrushList();
    }

    // 全选/取消全选
    function toggleSelectAll() {
        if (activeTab === 'users') {
            if (isAllSelected) {
                selectedUserIds = [];
            } else {
                selectedUserIds = deletedUsers.map(user => user.key);
            }
        } else {
            if (isAllSelected) {
                selectedKnowledgeIds = [];
            } else {
                selectedKnowledgeIds = deletedKnowledge.map(knowledge => knowledge.key);
            }
        }
    }

    // 切换单个项的选中状态
    function toggleItemSelection(key) {
        if (activeTab === 'users') {
            const index = selectedUserIds.indexOf(key);
            if (index > -1) {
                selectedUserIds = selectedUserIds.filter(uid => uid !== key);
            } else {
                selectedUserIds = [...selectedUserIds, key];
            }
        } else {
            const index = selectedKnowledgeIds.indexOf(key);
            if (index > -1) {
                selectedKnowledgeIds = selectedKnowledgeIds.filter(kid => kid !== key);
            } else {
                selectedKnowledgeIds = [...selectedKnowledgeIds, key];
            }
        }
    }

    // 批量还原
    function batchRestore() {
        if (!hasSelectedItems) return;
        const itemsToRestore = activeTab === 'users'
            ? deletedUsers.filter(user => selectedUserIds.includes(user.key))
            : deletedKnowledge.filter(knowledge => selectedKnowledgeIds.includes(knowledge.key));
        RestoreInfo(itemsToRestore)
        selectedUserIds = [];
        selectedKnowledgeIds = [];
    }

    let showClearConfirm = false;

    async function handleClearConfirm() {
        await CleanTrush(localStorage.token).then(res => {
            deletedUsers = [];
            deletedKnowledge = [];
            selectedUserIds = [];
            selectedKnowledgeIds = [];
            toast.success("操作成功");
        });
    }

    async function getTrushList() {
        try {
            // 临时变量存储新数据
            const newDeletedUsers = [];
            const newDeletedKnowledge = [];
            await GetTrushList(localStorage.token).then(data => {
                if (data.unit_paths.length === 0) return;
                data.unit_paths.forEach((item, index) => {
                    const entitys = item.split("_");
                    const id = entitys[1];
                    if (entitys[0].includes('/user')) {
                        const u = allUser.find((u) => u.id === id);
                        if (u) {
                            newDeletedUsers.push({
                                key: 'user-' + index,
                                id: u.id,
                                name: u.name,
                                email: u.email,
                                path: entitys[0].replace('/user', '')
                            });
                        }
                    } else if (entitys[0].includes('/scope')) {
                        const scope = allScopes.find((s) => String(s.id) === id);
                        if (scope) {
                            newDeletedKnowledge.push({
                                key: 'scope-' + index,
                                id: scope.id,
                                name: scope.name,
                                description: scope.description,
                                path: entitys[0].replace('/scope', '')
                            });
                        }
                    }
                });
            });
            // 重新赋值以触发响应式更新
            deletedUsers = newDeletedUsers;
            deletedKnowledge = newDeletedKnowledge;

        } catch (error) {
            console.error('获取删除列表失败:', error);
            deletedUsers = [];
            deletedKnowledge = [];
        }
    }

    async function RestoreInfo(items) {
        try {
            let success = 0
            for (const item of items) {
                const path = activeTab === 'users' ? `${item.path}/user_${item.id}` : `${item.path}/scope_${item.id}`;
                const ret = await RestoreTrush(localStorage.token, path);
                if (ret.status != "successfully") {
                    toast.error('当前用户没有操作权限！');
                } else {
                    success += 1;
                }
            }
            // 还原完成后重新获取最新的删除列表
            await getTrushList();
            if (success > 0)
                toast.success(`成功还原 ${success} 个${activeTab === 'users' ? '用户' : '知识集'}`);
        } catch (error) {
            console.error('还原操作失败:', error);
            toast.error('还原操作失败，请重试');
        }
    }

    $:if (show) {
        getTrushList();
    }

</script>

{#if show}
    <!-- 模态框背景 -->
    <div
            class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 text-sm"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
    >
        <!-- 模态框内容 -->
        <div class=" w-[60vw] h-[80vh] bg-white dark:bg-gray-900 rounded-xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700">
            <!-- 头部：标题和关闭按钮 -->
            <div class="flex items-center justify-between p-3 border-b border-gray-200 dark:border-gray-700 ">
                <h2 id="modal-title"
                    class="font-bold text-gray-900 dark:text-white flex items-center space-x-2">
                    <span>已删除用户、知识集列表</span>
                </h2>
                <!-- 关闭按钮 -->
                <button
                        class=" p-2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-all duration-200 hover:scale-105"
                        on:click={closeModal}
                        aria-label="关闭"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                         stroke="currentColor" class="w-5 h-5 group-hover:rotate-90 transition-transform duration-200">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                </button>
            </div>

            <!-- 内容区域 -->
            <div class="flex flex-col h-full max-h-[calc(90vh-80px)]">
                <!-- 标签切换和批量操作 -->
                <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50">
                    <div class="flex items-center justify-between">
                        <!-- 标签切换开关 -->
                        <div class="relative flex items-center p-1 bg-gray-300 dark:bg-gray-700 rounded-xl shadow-inner">
                            <!-- 滑动背景 -->
                            <div class="absolute transition-all duration-300 ease-out {activeTab === 'users' ? 'left-1 translate-x-0' : 'left-1 translate-x-full'}
                                       w-[calc(50%-4px)] h-[calc(100%-8px)] bg-white dark:bg-gray-600 rounded-lg shadow-md"></div>

                            <button
                                    class="relative z-10 flex items-center space-x-2 px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-300 {activeTab === 'users' ? 'text-blue-600 dark:text-blue-500' : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100'}"
                                    on:click={() => switchTab('users')}
                            >
                                <div class="w-4 h-4 rounded-full bg-gradient-to-br {activeTab === 'users' ? 'from-blue-500 to-purple-600' : 'from-gray-400 to-gray-500'} flex items-center justify-center transition-all duration-300">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                         stroke-width="2" stroke="currentColor" class="w-2.5 h-2.5 text-white">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                              d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"/>
                                    </svg>
                                </div>
                                <span>用户</span>
                            </button>

                            <button
                                    class="relative z-10 flex items-center space-x-2 px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-300 {activeTab === 'scope' ? 'text-blue-600 dark:text-blue-500' : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100'}"
                                    on:click={() => switchTab('scope')}
                            >
                                <div class="w-4 h-4 rounded-full bg-gradient-to-br {activeTab === 'scope' ? 'from-emerald-500 to-teal-600' : 'from-gray-400 to-gray-500'} flex items-center justify-center transition-all duration-300">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                         stroke-width="2" stroke="currentColor" class="w-2.5 h-2.5 text-white">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                              d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"/>
                                    </svg>
                                </div>
                                <span>知识集</span>
                            </button>
                        </div>

                        <!-- 批量操作区域 -->
                        <div class="flex items-center space-x-3">
                            {#if hasSelectedItems}
                                <div class="flex items-center space-x-2 px-3 py-1.5 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                                    <div class="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                                    <span class="text-sm text-blue-700 dark:text-blue-300 font-medium">
                                        已选择 {currentSelectedIds.length} 项
                                    </span>
                                </div>
                            {/if}

                            <!-- 批量还原按钮 -->
                            <button
                                    class="px-4 py-2.5 text-sm font-semibold rounded-xl transition-all duration-200
           {hasSelectedItems ?
              'bg-blue-600 text-white shadow-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2' :
              'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
           }"
                                    disabled={!hasSelectedItems}
                                    on:click={batchRestore}
                            >
                                <div class="flex items-center space-x-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                         stroke-width="2" stroke="currentColor" class="w-4 h-4">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                              d="m15 15-6 6m0 0-6-6m6 6V9a6 6 0 0 1 12 0v3"/>
                                    </svg>
                                    <span>批量还原</span>
                                </div>
                            </button>
                            <button
                                    class="px-4 py-2.5 text-sm font-semibold rounded-xl transition-colors duration-200 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 shadow-md hover:bg-gray-200 dark:hover:bg-gray-600 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                                    on:click={() => { showClearConfirm = true; }}
                            >
                                <div class="flex items-center space-x-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                         stroke-width="2" stroke="currentColor" class="w-4 h-4">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"/>
                                    </svg>
                                    <span>清空记录</span>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>

                <!-- 滚动内容区域 -->
                <div class="flex-1 overflow-y-auto">
                    <!-- 列表头部 -->
                    {#if currentItems.length > 0}
                        <div class="px-6 py-3 bg-gray-50 dark:bg-gray-800/30 border-b border-gray-200 dark:border-gray-600 sticky top-0 backdrop-blur-sm z-20">
                            <div class="flex items-center">
                                <div class="flex items-center space-x-3">
                                    <div class="relative">
                                        <input
                                                type="checkbox"
                                                checked={isAllSelected}
                                                on:change={toggleSelectAll}
                                                class="w-4 h-4 text-blue-600 bg-white dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all duration-200 hover:border-blue-400 dark:hover:border-blue-500"
                                        />
                                        {#if isAllSelected}
                                            <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
                                                <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fill-rule="evenodd"
                                                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                          clip-rule="evenodd"/>
                                                </svg>
                                            </div>
                                        {/if}
                                    </div>
                                </div>

                                <div class="ml-8 grid grid-cols-12 gap-4 flex-1 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    <div class="col-span-4">名称</div>
                                    <div class="col-span-6">路径</div>
                                    <div class="col-span-2 text-right">操作</div>
                                </div>
                            </div>
                        </div>
                    {/if}

                    <!-- 列表内容 -->
                    <div class="divide-y divide-gray-200 dark:divide-gray-600">
                        {#if currentItems.length === 0}
                            <!-- 空状态 -->
                            <div class="px-6 py-16 text-center">
                                <div class="mx-auto w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-2xl flex items-center justify-center mb-6 shadow-inner">
                                    {#if activeTab === 'users'}
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                             stroke-width="1.5" stroke="currentColor"
                                             class="w-10 h-10 text-gray-400 dark:text-gray-500">
                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                  d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"/>
                                        </svg>
                                    {:else}
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                             stroke-width="1.5" stroke="currentColor"
                                             class="w-10 h-10 text-gray-400 dark:text-gray-500">
                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                  d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"/>
                                        </svg>
                                    {/if}
                                </div>
                                <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                                    暂无被删除的{activeTab === 'users' ? '用户' : '知识集'}
                                </h3>
                            </div>
                        {:else}
                            {#each currentItems as item (item.key)}
                                {@const isSelected = currentSelectedIds.includes(item.key)}
                                <div class="px-6 py-3 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all duration-200 group">
                                    <div class="flex items-center">
                                        <!-- 多选框 -->
                                        <div class="flex items-center space-x-3">
                                            <div class="relative">
                                                <input
                                                        type="checkbox"
                                                        checked={isSelected}
                                                        on:change={() => toggleItemSelection(item.key)}
                                                        class="w-4 h-4 text-blue-600 bg-white dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all duration-200 hover:border-blue-400 dark:hover:border-blue-500"
                                                />
                                                {#if isSelected}
                                                    <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
                                                        <svg class="w-3 h-3 text-white" fill="currentColor"
                                                             viewBox="0 0 20 20">
                                                            <path fill-rule="evenodd"
                                                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                                  clip-rule="evenodd"/>
                                                        </svg>
                                                    </div>
                                                {/if}
                                            </div>
                                        </div>

                                        <!-- 内容区域 -->
                                        <div class="ml-8 grid grid-cols-12 gap-4 flex-1 items-center">
                                            <!-- 名称 -->
                                            <div class="col-span-4 flex items-center space-x-3">
                                                {#if activeTab === 'users'}
                                                    <div class="relative w-8 h-8 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm shadow-md group-hover:shadow-lg transition-shadow duration-200">
                                                        {item.name ? item.name.charAt(0).toUpperCase() : 'U'}
                                                        <div class="absolute inset-0 rounded-xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                                                    </div>
                                                    <div class="min-w-0 flex-1">
                                                        <p class="text-sm font-semibold text-gray-900 dark:text-white truncate">
                                                            {item.name}
                                                        </p>
                                                        <p class="text-xs text-gray-500 dark:text-gray-400 truncate">
                                                            {item.email}
                                                        </p>
                                                    </div>
                                                {:else}
                                                    <div class="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow duration-200">
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                             viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
                                                             class="w-4 h-4 text-white">
                                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                                  d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"/>
                                                        </svg>
                                                    </div>
                                                    <div class="min-w-0 flex-1">
                                                        <p class="text-sm font-semibold text-gray-900 dark:text-white truncate">
                                                            {item.name}
                                                        </p>
                                                    </div>
                                                {/if}
                                            </div>

                                            <!-- 路径 -->
                                            <div class="col-span-6">
                                                <div class="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
                                                    <div class="flex items-center space-x-1 px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-md">
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                             viewBox="0 0 24 24" stroke-width="1.5"
                                                             stroke="currentColor" class="w-3 h-3 text-gray-400">
                                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                                  d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"/>
                                                        </svg>
                                                        <span class="text-xs font-mono">./{item.path}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="col-span-2 flex justify-end">
                                                <button
                                                        class="group flex items-center space-x-1 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-200"
                                                        on:click={() => RestoreInfo([item])}
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                         viewBox="0 0 24 24"
                                                         stroke-width="1.5" stroke="currentColor"
                                                         class="w-4 h-4 group-hover:rotate-12 transition-transform duration-200">
                                                        <path stroke-linecap="round" stroke-linejoin="round"
                                                              d="m15 15-6 6m0 0-6-6m6 6V9a6 6 0 0 1 12 0v3"/>
                                                    </svg>
                                                    <span class="font-medium">还原</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            {/each}
                        {/if}
                    </div>
                </div>
            </div>
        </div>

        <ConfirmDialog
                bind:show={showClearConfirm}
                title="清空删除记录?"
                message="<span class='text-red-500' >此操作将会清空所有的用户和知识集的删除记录，且不可恢复。</span>"
                icon="danger"
                size="sm"
                on:confirm={handleClearConfirm}
                on:cancel={()=>{showClearConfirm = false;}}
        />
    </div>
{/if}