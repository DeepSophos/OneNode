<script lang="ts">
    import {getContext, onMount} from 'svelte';
    import {getUsers} from '$lib/apis/users';
    import {getKnowledgeScopesAll} from '$lib/apis/rag';
    import {goto} from '$app/navigation';
    import {user, scopes, userDefaultPath} from "$lib/stores";
    import OrganizationForm from './OrganizationForm.svelte';
    import Tooltip from '$lib/components/common/Tooltip.svelte';
    import SelectUserScope from './SelectUserScope.svelte';
    import ConfirmDialog from '$lib/components/ConfirmDialog.svelte';
    import UserSelector from '$lib/components/common/UserSelector.svelte';
    import KnowledgeSelector from '$lib/components/common/KnowledgeSelector.svelte';

    import {
        AddUnit,
        AddUserToUnit,
        AddScopeToUnit,
        DelUnit,
        ListUnits,
        RenameUnit
    } from "$lib/apis/unit"
    import {toast} from "svelte-sonner";

    const i18n = getContext('i18n');

    // 组织机构数据
    let orgData = [];
    let showClearConfirm = false;
    let delNode = null;

    // 当前显示的节点列表
    let currentNodes = orgData;
    // 面包屑导航路径 - 修改为对象数组，包含路径信息
    let breadcrumbs = [{label: "根节点", path: ""}];
    // 当前路径
    let currentPath = "";
    //当前选中的组织的完整路径
    let selectOrgFullPath = "";
    // 选中的组织
    let selectedOrg = null;
    // 表单弹窗相关
    let showOrgForm = false;
    let editingOrg = null;
    // 添加点击延迟变量来处理双击和单击事件冲突
    let clickTimer = null;
    let clickDelay = 300; // 延迟时间（毫秒）
    //所有用户
    let allUser = [];
    //所有知识集
    let allScopes = [];
    //当前组织机构的用户
    let unitUsers = [];
    //当前组织机构的知识集
    let unitScopes = [];

    // 更新面包屑导航
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

    // 构建选中组织的完整路径
    function getSelectedOrgFullPath(node) {
        return currentPath ? `${currentPath}/${node.label}` : node.label;
    }

    // 点击组织节点 - 单击选中（延迟执行以避免与双击冲突）
    function handleNodeClick(node, event) {
        if (event.target.closest('.action-buttons')) return;
        if (node === selectedOrg) return;

        // 清除之前的定时器
        if (clickTimer) {
            clearTimeout(clickTimer);
        }
        // 设置延迟执行单击逻辑
        clickTimer = setTimeout(async () => {
            // 选中节点
            selectedOrg = node;
            // 获取选中组织的完整路径
            selectOrgFullPath = getSelectedOrgFullPath(node);
            // 更新面包屑显示当前选中的组织路径
            updateBreadcrumbs(selectOrgFullPath);

            clickTimer = null;
        }, clickDelay);
    }

    // 双击组织节点 - 进入子节点
    async function handleNodeDBClick(node, event) {
        if (event.target.closest('.action-buttons')) {
            return;
        }
        // 清除单击的定时器，防止单击事件执行
        if (clickTimer) {
            clearTimeout(clickTimer);
            clickTimer = null;
        }

        // 构建新的路径
        const newPath = currentPath ? `${currentPath}/${node.label}` : node.label;
        currentPath = newPath;
        // 更新面包屑
        updateBreadcrumbs(currentPath);
        // 获取子级单位列表
        await GetListUnits(newPath);
        // 加载当前目录下的用户或知识集信息
        // await GetDataByType(newPath);
        // 取消选中状态（进入子级目录时不应该有选中的组织）
        selectedOrg = null;
        selectOrgFullPath = newPath;
    }

    // 面包屑导航点击
    async function handleBreadcrumbClick(index) {
        selectedOrg = null;
        if (index === 0) {
            // 点击根节点，回到根目录
            console.log('点击根节点，回到根目录')
            currentPath = "";
            selectOrgFullPath = "";
            breadcrumbs = [{label: "根节点", path: ""}];
            await GetListUnits("");
        } else {
            // 点击中间的面包屑，跳转到对应层级
            const targetBreadcrumb = breadcrumbs[index];
            currentPath = targetBreadcrumb.path;
            selectOrgFullPath = targetBreadcrumb.path;
            // 截取面包屑到点击位置
            breadcrumbs = breadcrumbs.slice(0, index + 1);
            // 获取对应层级的数据
            await GetListUnits(currentPath);
            // 加载当前层级的用户或知识集信息
            // await GetDataByType(currentPath);
        }
    }

    // 上一级按钮点击
    async function handleGoBack() {
        if (breadcrumbs.length > 1) {
            selectedOrg = null;
            // 回到上一级
            breadcrumbs = breadcrumbs.slice(0, -1);
            const parentBreadcrumb = breadcrumbs[breadcrumbs.length - 1];
            currentPath = parentBreadcrumb.path;
            selectOrgFullPath = parentBreadcrumb.path;
            await GetListUnits(currentPath);
            // 加载上一级的用户或知识集信息
            // await GetDataByType(currentPath);
        }
    }

    // 添加组织机构
    async function handleAddOrg(node = null, type = 'add') {
        let parentPath = currentPath; // 使用当前路径作为父路径
        let oldPath = ""; // 用于编辑时的旧路径
        if (node && type === 'add') {
            // 如果是为特定节点添加子级，构建完整路径
            parentPath = currentPath ? `${currentPath}/${node.label}` : node.label;
        } else if (node && type === 'edit') {
            parentPath = currentPath;
            oldPath = currentPath ? `${currentPath}/${node.label}` : node.label;
        }

        const newOrg = {
            item_name: type === 'add' ? '' : node?.label,
            item_desc: '',
            unit_path: parentPath,
            old_path: oldPath,
            type: type
        };

        editingOrg = newOrg;
        showOrgForm = true;
    }

    // 保存添加/编辑组织机构
    async function handleFormSubmit(event) {
        const formData = event.detail;
        try {
            if (editingOrg?.type === 'edit') {
                let params = {
                    old_path: editingOrg.old_path,
                    new_path: formData.unit_path != "" ? formData.unit_path + '/' + formData.item_name : formData.item_name
                }
                // 调用更新API
                await RenameUnit(localStorage.token, params).then((res) => {
                    const data = JSON.parse(res);
                    if (data.status === "success") {
                        toast.success("重命名成功");
                    } else {
                        toast.error(data.message);
                    }
                })
            } else {
                await AddUnit(localStorage.token, formData).then((res) => {
                    toast.success("添加成功");
                });
            }
            showOrgForm = false;
            editingOrg = null;

            // 刷新当前层级的数据
            await GetListUnits(currentPath);
        } catch (error) {
            console.error('保存组织机构失败:', error);
        }
    }

    // 获取单位列表
    async function GetListUnits(path = '') {
        try {
            const res = await ListUnits(localStorage.token, path);
            const units = res.units;
            orgData = units.map((item, index) => ({
                id: index + 1,
                label: item,
                children: []
            }));
            currentNodes = orgData;
        } catch (error) {
            console.error('获取单位列表失败:', error);
        }
    }

    // 删除组织机构
    function handleDeleteOrg(node) {
        showClearConfirm = true;
        delNode = node;
    }

    // 删除组织机构
    function handleClearConfirm() {
        if (!delNode) return;
        const unit_path = currentPath ? `${currentPath}/${delNode.label}` : delNode.label;
        DelUnit(localStorage.token, unit_path).then((res) => {
            toast.success("删除成功");
            GetListUnits(currentPath);
        });
    }

    //用户选择器-显示状态
    let showUserSelector = false;
    let userSelData = [];

    //用户选择器-显示状态
    function showUserSelectorDialog() {
        showUserSelector = true;
        //排除组织机构中已存在的用户
        userSelData = allUser.filter(user => {
            return !unitUsers.some(unitUser => unitUser.id === user.id);
        })
    }

    //用户选择器-添加用户
    async function handleUserConfirm(event) {
        const {selUsers: selected} = event.detail;
        if (selected.length === 0) return;
        for (const user of selected) {
            const params = {item_name: user.id, item_desc: null, unit_path: selectOrgFullPath};
            await AddUserToUnit(localStorage.token, params);
        }
        unitUsers = [...unitUsers, ...selected]
    }

    //知识集选择器-显示状态
    let showKnowledgeSelector = false;
    let knowledgeData = [];

    function openKnowledgeSelector() {
        showKnowledgeSelector = true;
        //排除组织机构中已存在的知识集
        knowledgeData = $scopes.filter(scope => {
            return !unitScopes.some(unitScope => unitScope.id === scope.id);
        })
    }

    async function handleKnowledgeConfirm(event) {
        const {selKnowledge: selected} = event.detail
        if (selected.length === 0) return;
        for (const scope of selected) {
            const params = {item_name: String(scope.id), item_desc: null, unit_path: selectOrgFullPath};
            await AddScopeToUnit(localStorage.token, params);
        }
        unitScopes = [...unitScopes, ...selected]
    }

    let privateScopes = [];
    // 组件挂载后执行
    onMount(async () => {
        allUser = await getUsers(localStorage.token);
        allScopes = JSON.parse(await getKnowledgeScopesAll(localStorage.token));
        breadcrumbs = [{label: "根节点", path: ""}];
        currentPath = "";
        await GetListUnits();
    });
</script>

<div class="w-full px-8 py-5 text-sm">
    <!-- 头部导航区域 -->
    <div class="flex items-center justify-between p-4 rounded-lg shadow border border-gray-300 dark:border-gray-700 mb-6">
        <div class="flex items-center space-x-4">
            <button class="text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors duration-200"
                    on:click={() => { goto('/') }}
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                     stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round"
                          d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"/>
                </svg>
            </button>
            <h1 class="text-lg font-semibold text-gray-900 dark:text-white">{$i18n.t("Organization Manage")}</h1>
        </div>
    </div>

    <div class=" rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div class="px-3 py-1 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-600 border-b border-gray-200 dark:border-gray-600">
            <div class="flex items-center justify-between space-x-3">
                <div class="flex items-center space-x-3">
                    <Tooltip content="上一级" placement="top">
                        <button
                                class="flex items-center justify-center w-10 h-10 text-sm hover:bg-blue-200 hover:text-blue-600 dark:text-white  text-gray-900 rounded-lg transition-all duration-200 {breadcrumbs.length <= 1 ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-md'}"
                                on:click={handleGoBack}
                                disabled={breadcrumbs.length <= 1}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                 stroke="currentColor" class="size-5">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                      d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18"/>
                            </svg>
                        </button>
                    </Tooltip>
                </div>
                <div class="flex-1 min-w-0">
                    <div class="flex items-center space-x-0.5 text-sm whitespace-no-wrap">
                        {#each breadcrumbs as breadcrumb, index}
                            <button
                                    class="cursor-pointer hover:text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900/20 px-2 py-1 rounded-md transition-all duration-200 font-medium
                                   {index === breadcrumbs.length - 1 ? 'text-blue-700 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30' : 'text-gray-600 dark:text-gray-300'}"
                                    on:click={() => handleBreadcrumbClick(index)}
                            >
                                {breadcrumb.label}
                            </button>
                            {#if index < breadcrumbs.length - 1}
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                                     stroke="currentColor" class="w-3 h-3 text-gray-400">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5"/>
                                </svg>
                            {/if}
                        {/each}
                    </div>
                </div>

            </div>
        </div>
        <div class="flex h-[calc(100vh-180px)]">
            <!-- 左侧组织机构树 -->
            <div class="w-[20%] border-r border-gray-200 dark:border-gray-600">
                <div class="flex justify-between items-center h-14 p-2 border-b border-gray-200 dark:border-gray-600">
                    <h1>组织机构</h1>
                    {#if $user.role === 'admin'}
                        <div class="flex justify-end">
                            <Tooltip content="添加组织机构" placement="top">
                                <button
                                        class="p-1.5 text-blue-500 hover:text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900/20 rounded-md transition-colors duration-200"
                                        on:click={() => handleAddOrg()}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                         stroke-width="1.5"
                                         stroke="currentColor" class="w-5 h-5">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                              d="M12 10.5v6m3-3H9m4.06-7.19l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"/>
                                    </svg>
                                </button>
                            </Tooltip>
                            <Tooltip content="添加用户" placement="top">
                                <button
                                        class="p-1.5 text-blue-500 hover:text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900/20 rounded-md transition-colors duration-200
                                        {!selectOrgFullPath? 'opacity-50 cursor-not-allowed' : ''}"
                                        on:click={() =>showUserSelectorDialog()}
                                        disabled={!selectOrgFullPath}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5"
                                         fill="none"
                                         viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                                    </svg>
                                </button>
                            </Tooltip>
                            <Tooltip content="添加知识集" placement="top">
                                <button
                                        class="p-1.5 text-blue-500 hover:text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900/20 rounded-md transition-colors duration-200
                                        {!selectOrgFullPath? 'opacity-50 cursor-not-allowed' : ''}"
                                        on:click={() => openKnowledgeSelector()}
                                        disabled={!selectOrgFullPath}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                         stroke-width="2" stroke="currentColor" class="w-5 h-5">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                              d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"/>
                                    </svg>
                                </button>
                            </Tooltip>
                        </div>
                    {/if}
                </div>
                <!-- 树形结构 -->
                <div class="overflow-y-auto h-[100%] p-2">
                    {#each currentNodes as node}
                        <div
                                class="flex items-center justify-between p-2 mb-0.5 rounded-lg transition-all duration-200 select-none cursor-pointer group border
                            {selectedOrg?.id === node.id ?
                                'bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-700 text-blue-900 dark:text-blue-100 shadow-sm' :
                                'hover:bg-gray-50 dark:hover:bg-gray-700/50 border-transparent hover:border-gray-200 dark:hover:border-gray-600'}"
                                on:click={(event) => handleNodeClick(node, event)}
                                on:dblclick={(event) => handleNodeDBClick(node, event)}
                        >
                            <div class="flex items-center min-w-0 flex-1">
                                <span class="mr-3 flex-shrink-0">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                         stroke-width="1.5" stroke="currentColor"
                                         class="w-5 h-5 {selectedOrg?.id === node.id ? 'text-blue-500' : 'text-amber-500'}">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                              d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"/>
                                    </svg>
                                </span>
                                <span class="font-medium truncate min-w-0" title={node.label}>
                                    {node.label}
                                </span>
                            </div>
                            <!-- 操作按钮区域 -->
                            {#if node.label !== $userDefaultPath && $user.role === 'admin'}
                                <div class="action-buttons flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex-shrink-0">
                                    <!-- 添加子集 -->
                                    <Tooltip content="添加子机构" placement="top">
                                        <button
                                                class="p-1.5 text-blue-500 hover:text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900/20 rounded-md transition-colors duration-200"
                                                on:click|stopPropagation={() => handleAddOrg(node)}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                 stroke-width="1.5" stroke="currentColor" class="size-4">
                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                      d="M12 4.5v15m7.5-7.5h-15"/>
                                            </svg>
                                        </button>
                                    </Tooltip>
                                    <!-- 重命名 -->
                                    <Tooltip content="重命名" placement="top">
                                        <button
                                                class="p-1.5 text-blue-500 hover:text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900/20 rounded-md transition-colors duration-200"
                                                on:click|stopPropagation={() => handleAddOrg(node,'edit')}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                 stroke-width="1.5" stroke="currentColor" class="size-4">
                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"/>
                                            </svg>

                                        </button>
                                    </Tooltip>
                                    <!-- 删除 -->
                                    <Tooltip content="删除组织机构" placement="top">
                                        <button
                                                class="p-1.5 text-red-500 hover:text-red-600 hover:bg-red-100 dark:hover:bg-red-900/20 rounded-md transition-colors duration-200"
                                                on:click|stopPropagation={() => handleDeleteOrg(node)}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                 stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"/>
                                            </svg>
                                        </button>
                                    </Tooltip>
                                </div>
                            {/if}
                        </div>
                    {/each}
                </div>
            </div>

            <!-- 右侧用户/知识集内容区域 -->
            <div class="w-[80%] flex-1 flex flex-col ">
                <!-- 内容区域 -->
                <div class="flex-1 overflow-hidden">
                    <SelectUserScope
                            allUser={allUser}
                            allScopes={allScopes}
                            bind:users={unitUsers}
                            bind:scopes={unitScopes}
                            {selectOrgFullPath}/>
                </div>
            </div>
        </div>
    </div>
    <!-- 组织机构表单弹窗 -->
    {#if showOrgForm}
        <OrganizationForm
                {editingOrg}
                on:submit={handleFormSubmit}
                on:close={()=> {
                showOrgForm = false;
                editingOrg = null;
            }}
        />
    {/if}

    <!-- 用户选择器组件 -->
    <UserSelector
            bind:visible={showUserSelector}
            users={userSelData}
            title="组织机构-添加用户"
            on:confirm={handleUserConfirm}
            on:cancel={()=>{showUserSelector = false;}}
    />

    <!-- 知识集选择器组件 -->
    <KnowledgeSelector
            bind:visible={showKnowledgeSelector}
            knowledgeBases={knowledgeData}
            title="组织机构-添加知识集"
            on:confirm={handleKnowledgeConfirm}
            on:cancel={()=>{showKnowledgeSelector = false;}}
    />

    <ConfirmDialog
            bind:show={showClearConfirm}
            title="删除组织机构"
            message="确定要删除组织机构吗？<br><span class='text-red-600 dark:text-red-400 font-medium'>此操作无法撤销</span>"
            icon="danger"
            size="sm"
            on:confirm={handleClearConfirm}
            on:cancel={()=>{showClearConfirm = false;delNode = null;}}
    />
</div>