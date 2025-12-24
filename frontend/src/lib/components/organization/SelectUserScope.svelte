<script lang="ts">
    import {getContext, createEventDispatcher, onMount} from 'svelte';
    import {user} from '$lib/stores';
    import {
        ListScopes,
        ListUsers,
        AddUserToUnit,
        AddScopeToUnit,
        DelUserFromUnit,
        AddUserToTrush,
        DelScopeFromUnit,
        AddScopeToTrush
    } from "$lib/apis/unit"
    import {toast} from "svelte-sonner";
    import OrganizationSelector from './SelectTargetOrganization.svelte';
    import ConfirmDialog from "$lib/components/ConfirmDialog.svelte";
    import TrushList from './TrushList.svelte';

    const i18n = getContext('i18n');
    const dispatch = createEventDispatcher();

    // 组件属性
    export let selectOrgFullPath = '';

    // 当前显示的标签
    let activeTab = 'all'; // 'all', 'users', 'scope'

    export let allUser = [];
    export let allScopes = [];
    export let users = [];
    export let scopes = [];

    // 多选状态
    let selectedUsers = new Set();
    let selectedScopes = new Set();

    // 操作状态
    let showMoveModal = false;
    let showDeleteConfirm = false;
    let operationType = ''; // 'move', 'copy', 'delete'

    // 计算属性
    $: hasSelectedUsers = selectedUsers.size > 0;
    $: hasSelectedScopes = selectedScopes.size > 0;
    $: hasSelectedItems = hasSelectedUsers || hasSelectedScopes;
    $: isAllUsersSelected = filteredUsers.length > 0 && filteredUsers.every(user => selectedUsers.has(user.id));
    $: isAllScopesSelected = filteredScopes.length > 0 && filteredScopes.every(user => selectedScopes.has(user.id));

    // 角色样式映射
    const roleStyles = {
        'admin': {
            bg: 'bg-blue-100',
            text: 'text-blue-800',
            darkBg: 'dark:bg-blue-900/30',
            darkText: 'dark:text-blue-300'
        },
        'kbman': {
            bg: 'bg-yellow-100',
            text: 'text-yellow-800',
            darkBg: 'dark:bg-yellow-900/30',
            darkText: 'dark:text-yellow-300'
        },
        'user': {
            bg: 'bg-green-100',
            text: 'text-green-800',
            darkBg: 'dark:bg-green-900/30',
            darkText: 'dark:text-green-300'
        }
    };

    // 获取角色显示名称
    function getRoleDisplayName(role) {
        if (role.toLowerCase() === 'admin') return '管理员';
        if (role.toLowerCase() === 'kbman') return '知识集管理员';
        if (role.toLowerCase() === 'user') return '用户';
        return role; // 如果已经是中文，则直接返回
    }

    // 获取角色样式类
    function getRoleStyleClasses(role) {
        const roleKey = role.toLowerCase();
        const style = roleStyles[roleKey] || roleStyles['user'];
        return `${style.bg} ${style.text} ${style.darkBg} ${style.darkText}`;
    }

    // 切换标签
    function switchTab(tab) {
        activeTab = tab;
    }

    // 切换用户选择
    function toggleUserSelection(id, event) {
        event.stopPropagation();
        if ($user.role === 'kbman') return;
        if (selectedUsers.has(id)) {
            selectedUsers.delete(id);
        } else {
            selectedUsers.add(id);
        }
        selectedUsers = new Set(selectedUsers);
    }

    // 切换知识集选择
    function toggleScopeSelection(scope, event) {
        event.stopPropagation();
        if ($user.role === 'kbman' && scope.owner_id != $user.id) return;
        if (selectedScopes.has(scope.id)) {
            selectedScopes.delete(scope.id);
        } else {
            selectedScopes.add(scope.id);
        }
        selectedScopes = new Set(selectedScopes);
    }

    // 全选/取消全选用户
    function toggleSelectAllUsers() {
        if (isAllUsersSelected) {
            selectedUsers.clear();
        } else {
            filteredUsers.forEach(user => selectedUsers.add(user.id));
        }
        selectedUsers = new Set(selectedUsers);
        console.log(selectedUsers)
    }

    // 全选/取消全选知识集
    function toggleSelectAllScopes() {
        if (isAllScopesSelected) {
            selectedScopes.clear();
        } else {
            filteredScopes.forEach(scope => selectedScopes.add(scope.id));
        }
        selectedScopes = new Set(selectedScopes);
    }

    // 打开操作模态框
    function openOperationModal(type) {
        operationType = type;
        if (type === 'delete') {
            showDeleteConfirm = true;
        } else {
            showMoveModal = true;
        }
    }

    // 确认操作
    async function confirmOperation(event) {
        if (operationType === 'copy') {
            const {selectedPath: targetPath} = event.detail;
            await AddInfoToUnit(targetPath);
        } else {
            await DelInfoToUnit(operationType);
            if (operationType === 'move') {
                const {selectedPath: targetPath} = event.detail
                await AddInfoToUnit(targetPath);
            }
            await loadData();
        }
        selectedUsers = new Set();
        selectedScopes = new Set();
        showMoveModal = false;
        showDeleteConfirm = false;
        toast.success("操作完成");
    }

    async function AddInfoToUnit(targetPath) {
        for (const userId of selectedUsers) {
            const params = {item_name: userId, item_desc: null, unit_path: targetPath};
            await AddUserToUnit(localStorage.token, params);
        }
        for (const scopeId of selectedScopes) {
            const params = {item_name: String(scopeId), item_desc: null, unit_path: targetPath};
            await AddScopeToUnit(localStorage.token, params);
        }
    }

    async function DelInfoToUnit(type) {
        for (const userId of selectedUsers) {
            const params = {obj_id: userId, unit_path: selectOrgFullPath};
            await DelUserFromUnit(localStorage.token, params);
            if (type === 'delete') {
                await AddUserToTrush(localStorage.token, params);
            }
        }
        for (const scopeId of selectedScopes) {
            const params = {obj_id: String(scopeId), unit_path: selectOrgFullPath};
            await DelScopeFromUnit(localStorage.token, params);
            if (type === 'delete') {
                await AddScopeToTrush(localStorage.token, params);
            }
        }
    }

    // 加载数据
    async function loadData() {
        users = [];
        scopes = [];
        if (!selectOrgFullPath) return;
        await ListUsers(localStorage.token, selectOrgFullPath).then((res) => {
            if (res.status == "successfully") {
                const userIds = res.units;
                users = userIds.length > 0 && allUser.length > 0 ? allUser.filter((u) => userIds.includes(u.id)) : [];
            } else {
                toast.success("查询组织机构用户失败");
            }
        });
        await ListScopes(localStorage.token, selectOrgFullPath).then((res) => {
            if (res.status == "successfully") {
                const scopeIds = res.units;
                scopes = scopeIds.length > 0 && allScopes.length > 0 ? allScopes.filter((s) => scopeIds.includes(String(s.id))) : [];
            } else {
                toast.success("查询组织机构知识集失败");
            }
        });
    }

    // 当组织机构路径变化时重新加载数据
    $: {
        selectedUsers = new Set();
        selectedScopes = new Set();
        if (selectOrgFullPath) {
            loadData();
        }
    }

    //回收站状态
    let showTrushList = false;
    $:if (!showTrushList) {
        loadData();
    }
    //检索用户
    let searchQueryUser = '';
    let filteredUsers = [];
    $: {
        if (searchQueryUser.trim() === '') {
            filteredUsers = users;
        } else {
            filteredUsers = users.filter(u =>
                u.name.toLowerCase().includes(searchQueryUser.toLowerCase()) ||
                u.email?.toLowerCase().includes(searchQueryUser.toLowerCase())
            );
        }
    }

    //检索知识集
    let searchQueryScope = '';
    let filteredScopes = [];
    $: {
        if (searchQueryScope.trim() === '') {
            filteredScopes = scopes;
        } else {
            filteredScopes = scopes.filter(u =>
                u.name.toLowerCase().includes(searchQueryScope.toLowerCase())
            );
        }
    }

    onMount(async () => {
        await loadData();
    })
</script>

<div class="w-full h-full flex flex-col   overflow-hidden">
    <!-- 标签切换和操作栏 -->
    <div class=" border-gray-200 dark:border-gray-600">
        <div class=" flex flex-col border-b dark:border-gray-600 h-14 p-2 md:flex-row md:items-center md:justify-between gap-3">
            <!-- 操作按钮 -->
            <div class="flex flex-wrap gap-2">
                <div class="flex items-center bg-gray-100 dark:bg-gray-700 rounded-lg px-3 py-1.5">
                    <span class="text-sm text-gray-600 dark:text-gray-300 mr-2">
                        已选 <span class="font-semibold">{selectedUsers.size + selectedScopes.size}</span> 项
                    </span>
                </div>

                <button class="px-3 py-1.5 text-sm bg-blue-100 hover:bg-blue-200 text-blue-700 dark:bg-blue-900/30 dark:hover:bg-blue-800 dark:text-blue-300 rounded-lg transition-colors duration-200 flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
                        on:click={() => openOperationModal('move')}
                        disabled={!hasSelectedItems}>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24"
                         stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"/>
                    </svg>
                    移动
                </button>

                <button class="px-3 py-1.5 text-sm bg-green-100 hover:bg-green-200 text-green-700 dark:bg-green-900/30 dark:hover:bg-green-800 dark:text-green-300 rounded-lg transition-colors duration-200 flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
                        on:click={() => openOperationModal('copy')}
                        disabled={!hasSelectedItems}>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24"
                         stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                    </svg>
                    复制
                </button>

                <button class="px-3 py-1.5 text-sm bg-red-100 hover:bg-red-200 text-red-700 dark:bg-red-900/30 dark:hover:bg-red-800 dark:text-red-300 rounded-lg transition-colors duration-200 flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
                        on:click={() => openOperationModal('delete')}
                        disabled={!hasSelectedItems}>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24"
                         stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                    </svg>
                    删除
                </button>
            </div>
            <div class="flex justify-end space-x-1">
                <!-- 标签切换 -->
                <div class="relative flex items-center p-1 bg-white dark:bg-gray-700 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600 w-full md:w-auto">
                    <!-- 滑动背景 -->
                    <div class="absolute transition-all duration-300 ease-out
                    {activeTab === 'all' ? 'left-1 translate-x-0 w-[calc(33.333%-8px)]' :
                     activeTab === 'users' ? 'left-1 translate-x-[calc(100%+4px)] w-[calc(33.333%-8px)]' :
                     'left-1 translate-x-[calc(200%+8px)] w-[calc(33.333%-8px)]'}
                    h-[calc(100%-8px)] bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg shadow-md">
                    </div>

                    <button class="relative z-10 px-3.5 py-1.5 text-sm font-medium rounded-lg transition-all duration-300 min-w-[60px] text-center
                    {activeTab === 'all' ? 'text-white' : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100'}"
                            on:click={() => switchTab('all')}>
                        全部
                    </button>
                    <button class="relative z-10 px-3.5 py-1.5 text-sm font-medium rounded-lg transition-all duration-300 min-w-[60px] text-center
                    {activeTab === 'users' ? 'text-white' : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100'}"
                            on:click={() => switchTab('users')}>
                        用户
                    </button>
                    <button class="relative z-10 px-3.5 py-1.5 text-sm font-medium rounded-lg transition-all duration-300 min-w-[60px] text-center
                    {activeTab === 'scope' ? 'text-white' : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100'}"
                            on:click={() => switchTab('scope')}>
                        知识集
                    </button>
                </div>
                {#if $user.role === 'admin'}
                    <button
                            class="flex px-3 py-2  items-center justify-center text-sm hover:bg-red-100 hover:text-red-600 text-gray-500 rounded-lg transition-all duration-200 hover:shadow-md"
                            on:click={()=>{showTrushList=true}}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                             stroke-width="1.5" stroke="currentColor" class="size-5">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                  d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"/>
                        </svg>
                        <span>删除记录</span>
                    </button>
                {/if}
            </div>

        </div>
    </div>

    <!-- 内容区域 -->
    <div class="flex-1 overflow-y-auto p-3">
        <!-- 用户列表 -->
        {#if activeTab === 'all' || activeTab === 'users'}
            <div class="mb-6">
                <div class="flex items-center justify-between mb-3">
                    <div class="flex items-center justify-between space-x-7">
                        <h2 class="text-md font-semibold text-gray-800 dark:text-gray-200 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2 text-emerald-500" fill="none"
                                 viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                            </svg>
                            用户列表
                        </h2>
                        <div class="w-auto relative text-sm">
                            <input
                                    type="text"
                                    bind:value={searchQueryUser}
                                    placeholder="搜索..."
                                    class="w-full pl-10 pr-4 py-1 rounded-lg border border-gray-300 dark:border-gray-600 dark:text-gray-300 dark:bg-gray-800 outline-none focus:border-gray-400"
                            />
                            <div class="absolute left-3 top-2 text-gray-400">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     stroke-width="1.5"
                                     stroke="currentColor" class="w-4 h-4">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                          d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"/>
                                </svg>
                            </div>
                            {#if searchQueryUser.trim() !== ''}
                                <button
                                        on:click={()=>{searchQueryUser = '';}}
                                        class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                                        aria-label="清除搜索"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                         stroke-width="1.5"
                                         stroke="currentColor" class="w-5 h-5">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
                                    </svg>
                                </button>
                            {/if}
                        </div>
                    </div>
                    {#if filteredUsers.length > 0 && $user.role === 'admin'}
                        <button class="text-xs text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                                on:click={toggleSelectAllUsers}>
                            {isAllUsersSelected ? '取消全选' : '全选'}
                        </button>
                    {/if}
                </div>

                {#if filteredUsers.length === 0}
                    <div class="flex flex-col items-center justify-center py-8 text-center bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-gray-400 mb-3" fill="none"
                             viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                        </svg>
                        <p class="text-gray-500 dark:text-gray-400 text-sm">暂无数据</p>
                    </div>
                {:else}
                    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                        {#each filteredUsers as user (user.id)}
                            <div
                                    class="relative bg-white dark:bg-gray-700 rounded-xl border
                                    {selectedUsers.has(user.id)
                                        ? 'border-blue-500 shadow-md'
                                        : 'border-gray-200 dark:border-gray-600'}
                                    transition-all duration-200 hover:shadow-md cursor-pointer p-3 h-auto flex flex-col justify-between group"
                                    on:click={() => toggleUserSelection(user.id, event)}
                            >
                                {#if selectedUsers.has(user.id)}
                                    <div class="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white shadow-lg">
                                        <svg class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                            <path fill-rule="evenodd"
                                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                  clip-rule="evenodd"/>
                                        </svg>
                                    </div>
                                {/if}

                                <div class="flex justify-between items-start">
                                    <div class="flex-1 min-w-0 pr-2">
                                        <div class="flex items-center gap-2">
                                            <h3 class="font-medium text-gray-900 dark:text-white text-sm truncate max-w-[5em]">
                                                {user.name}
                                            </h3>
                                            <span class={`text-[12px] px-2 py-0.5 rounded-full ${getRoleStyleClasses(user.role)} flex items-center w-fit`}>
                                                {getRoleDisplayName(user.role)}
                                            </span>
                                        </div>
                                        <p class="text-xs text-gray-500 dark:text-gray-400 truncate mt-1">{user.email}</p>
                                    </div>
                                </div>
                                <!-- 悬停效果元素 -->
                                <div class="absolute inset-0 bg-gradient-to-t from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl pointer-events-none"></div>
                            </div>
                        {/each}
                    </div>
                {/if}
            </div>
        {/if}

        <!-- 知识集列表 -->
        {#if activeTab === 'all' || activeTab === 'scope'}
            <div class={activeTab === 'all' ? 'mt-5' : ''}>
                <div class="flex items-center justify-between mb-3">
                    <div class="flex items-center justify-between space-x-4">
                        <h2 class="text-md font-semibold text-gray-800 dark:text-gray-200 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                 stroke-width="2" stroke="currentColor" class="h-4 w-4 mr-2 text-emerald-500">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                      d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"/>
                            </svg>
                            知识集列表
                        </h2>
                        <div class="w-auto relative text-sm">
                            <input
                                    type="text"
                                    bind:value={searchQueryScope}
                                    placeholder="搜索..."
                                    class="w-full pl-10 pr-4 py-1 rounded-lg border border-gray-300 dark:border-gray-600 dark:text-gray-300 dark:bg-gray-800 outline-none focus:border-gray-400"
                            />
                            <div class="absolute left-3 top-2 text-gray-400">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     stroke-width="1.5"
                                     stroke="currentColor" class="w-4 h-4">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                          d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"/>
                                </svg>
                            </div>
                            {#if searchQueryScope.trim() !== ''}
                                <button
                                        on:click={()=>{searchQueryScope = '';}}
                                        class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                                        aria-label="清除搜索"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                         stroke-width="1.5"
                                         stroke="currentColor" class="w-5 h-5">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
                                    </svg>
                                </button>
                            {/if}
                        </div>
                    </div>

                    {#if filteredScopes.length > 0}
                        <button class="text-xs text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                                on:click={toggleSelectAllScopes}>
                            {isAllScopesSelected ? '取消全选' : '全选'}
                        </button>
                    {/if}
                </div>

                {#if filteredScopes.length === 0}
                    <div class="flex flex-col items-center justify-center py-8 text-center bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                             stroke-width="2" stroke="currentColor" class="h-12 w-12 text-gray-400 mb-3">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                  d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"/>
                        </svg>
                        <p class="text-gray-500 dark:text-gray-400 text-sm">暂无数据</p>
                    </div>
                {:else}
                    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                        {#each filteredScopes as scope (scope.id)}
                            <div
                                    class="relative bg-white dark:bg-gray-700 rounded-xl border
                                    {selectedScopes.has(scope.id)
                                        ? 'border-blue-500 shadow-md'
                                        : 'border-gray-200 dark:border-gray-600'}
                                    transition-all duration-200 hover:shadow-md cursor-pointer p-3 h-auto flex flex-col justify-between group"
                                    on:click={() => toggleScopeSelection(scope, event)}
                            >
                                {#if selectedScopes.has(scope.id)}
                                    <div class="absolute -top-2 -right-2 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center text-white shadow-lg">
                                        <svg class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                            <path fill-rule="evenodd"
                                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                  clip-rule="evenodd"/>
                                        </svg>
                                    </div>
                                {/if}
                                <div class="h-full flex flex-col">
                                    <div class="flex-1 min-w-0">
                                        <div class="flex items-start mb-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                 stroke-width="2" stroke="currentColor"
                                                 class="h-4 w-4 text-emerald-500 mr-1 mt-0.5 flex-shrink-0">
                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                      d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"/>
                                            </svg>
                                            <h3 class="font-medium text-gray-900 dark:text-white truncate text-sm">{scope.name}</h3>
                                        </div>
                                        <p class="text-xs text-gray-500 dark:text-gray-400 line-clamp-1 mt-1 pl-5 truncate max-w-full">
                                            {scope.description || "暂无描述信息"}
                                        </p>
                                    </div>
                                    <div class="mt-2 pt-2 border-t border-gray-100 dark:border-gray-600">
                                        <div class="flex items-center min-w-0">
                                            {#if scope.private}
                                                <div class="w-5 h-5 bg-gradient-to-br from-amber-400 to-orange-500 dark:from-amber-500 dark:to-orange-600 rounded-full flex items-center justify-center text-white text-xs font-medium mr-2 flex-shrink-0 shadow-sm">
                                                    私
                                                </div>
                                            {/if}
                                            <span class="text-xs text-gray-600 dark:text-gray-400 truncate">{scope.owner_name}  </span>
                                        </div>
                                    </div>
                                </div>
                                <!-- 悬停效果元素 -->
                                <div class="absolute inset-0 bg-gradient-to-t from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl pointer-events-none"></div>
                            </div>
                        {/each}
                    </div>
                {/if}
            </div>
        {/if}
    </div>

    <!-- 移动/复制模态框 -->
    {#if showMoveModal}
        <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div class="w-4/5 h-4/5 max-w-4xl">
                <OrganizationSelector
                        title="{operationType === 'move' ? '移动' : '复制'}{selectedUsers.size > 1 ? `${selectedUsers.size}个用户，` : ''}{selectedScopes.size > 1 ? `${selectedScopes.size}个知识集` : ''}到目标组织机构"
                        on:confirm={confirmOperation}
                        on:cancel={()=>{showMoveModal=false;showDeleteConfirm=false;}}
                />
            </div>
        </div>
    {/if}

    <!-- 删除确认对话框 -->
    <ConfirmDialog
            bind:show={showDeleteConfirm}
            title="批量移除"
            message="确定从当前组织中移除 {selectedUsers.size > 0 ? `${selectedUsers.size}个用户` : ''}{selectedScopes.size > 0 ? '和' : ''}{selectedScopes.size > 0 ? `${selectedScopes.size}个知识集` : ''}吗？"
            icon="danger"
            size="md"
            on:confirm={confirmOperation}
            on:cancel={()=>{showDeleteConfirm=false;}}
    />
    <!--回收站-->
    <TrushList
            bind:show={showTrushList}
            allUser={allUser}
            allScopes={allScopes}
            on:close={()=>{showTrushList=false}}/>

</div>

<style>
    /* 自定义滚动条样式 */
    .overflow-y-auto::-webkit-scrollbar {
        width: 6px;
    }

    .overflow-y-auto::-webkit-scrollbar-track {
        background: #f1f1f1;
        border-radius: 4px;
    }

    .overflow-y-auto::-webkit-scrollbar-thumb {
        background: #c5c5c5;
        border-radius: 4px;
    }

    .dark .overflow-y-auto::-webkit-scrollbar-track {
        background: #2d3748;
    }

    .dark .overflow-y-auto::-webkit-scrollbar-thumb {
        background: #4a5568;
    }

    /* 卡片悬停效果 */
    .cursor-pointer {
        transition: all 0.2s ease;
    }

    .cursor-pointer:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
</style>