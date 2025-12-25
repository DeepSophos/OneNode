<script>
    import {ONENODE_API_BASE_URL} from '$lib/constants';
    import {ONENODE_NAME, config, user} from '$lib/stores';
    import {goto} from '$app/navigation';
    import {onMount, getContext} from 'svelte';

    import {toast} from 'svelte-sonner';

    import {updateUserRole, getUsers, deleteUserById} from '$lib/apis/users';
    import {getSignUpEnabledStatus, toggleSignUpEnabledStatus} from '$lib/apis/auths';
    import EditUserModal from '$lib/components/admin/EditUserModal.svelte';
    import SettingsModal from '$lib/components/admin/SettingsModal.svelte';
    import ConfirmDialog from '$lib/components/ConfirmDialog.svelte';
    import Tooltip from "$lib/components/common/Tooltip.svelte";

    const i18n = getContext('i18n');

    let loaded = false;
    let users = [];

    let selectedUser = null;

    let showSettingsModal = false;
    let showEditUserModal = false;
    let searchQuery = '';
    let filteredUsers = [];

    // 角色说明悬浮提示相关状态
    let showRoleTooltip = false;
    let tooltipPosition = {top: 0, left: 0};
    const full_access_icon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="#9ca3af" stroke="none"><circle cx="12" cy="12" r="6"/></svg>`;
    const partial_access_icon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" stroke-width="2"><circle cx="12" cy="12" r="6"/></svg>`;
    const no_access_icon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`;

    const updateRoleHandler = async (id, role) => {
        const res = await updateUserRole(localStorage.token, id, role).catch((error) => {
            toast.error(error);
            return null;
        });
        if (res) {
            users = await getUsers(localStorage.token);
        }
    };

    let showClearConfirm = false;
    let delInfo = null;

    const deleteUserHandler = async (user) => {
        showClearConfirm = true;
        delInfo = user;
    };
    const deleteUserConfirmHandler = async () => {
        deleteUserById(localStorage.token, delInfo.id).then((res) => {
            if (res.detail) {
                toast.error(res.detail);
                return null;
            } else {
                toast.success('操作成功');
                delInfo = null;
                getUsers(localStorage.token).then((res) => {
                    users = res;
                })
            }
        });
    }

    // 添加过滤逻辑
    $: {
        if (searchQuery.trim() === '') {
            filteredUsers = users;
        } else {
            filteredUsers = users.filter(u =>
                u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                u.email?.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }
    }

    onMount(async () => {
        if ($user?.role !== 'admin') {
            await goto('/');
        } else {
            users = await getUsers(localStorage.token);
        }
        loaded = true;
    });


    // 角色说明悬浮提示处理函数
    function showRoleInfo(event) {
        event.stopPropagation();
        const rect = event.currentTarget.getBoundingClientRect();
        tooltipPosition = {
            top: rect.bottom + window.scrollY + 5,
            left: rect.left + window.scrollX
        };
        showRoleTooltip = true;
    }

    function hideRoleInfo() {
        showRoleTooltip = false;
    }
</script>

<svelte:head>
</svelte:head>

{#key selectedUser}
    <EditUserModal
            bind:show={showEditUserModal}
            {selectedUser}
            sessionUser={$user}
            on:save={async () => {
			users = await getUsers(localStorage.token);
		}}
    />
{/key}

<SettingsModal bind:show={showSettingsModal}/>

<div class="w-full min-h-screen bg-gray-50 dark:bg-gray-900">
    <div class="w-full p-5">
        <div class="flex items-center justify-between mb-5  p-4 rounded-lg shadow border border-gray-200 dark:border-gray-700">
            <div class="flex items-center space-x-4">
                <button class="text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors duration-200"
                        on:click={() => { goto('/') }}
                >
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="1.5"
                         viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                              stroke-linecap="round"
                              stroke-linejoin="round"/>
                    </svg>
                </button>
                <h1 class="text-lg font-semibold text-gray-900 dark:text-white">用户管理</h1>
            </div>

            <div class="flex items-center space-x-2">
                <!-- 搜索框 -->
                <div class="w-auto relative text-sm">
                    <input
                            bind:value={searchQuery}
                            class="w-full pl-10 pr-4 py-1 rounded-lg border border-gray-300 dark:border-gray-600 dark:text-gray-300 dark:bg-gray-800 outline-none focus:border-gray-400"
                            placeholder="搜索..."
                            type="text"
                    />
                    <div class="absolute left-3 top-2 text-gray-400">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.5"
                             viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"/>
                        </svg>
                    </div>
                    {#if searchQuery.trim() !== ''}
                        <button
                                on:click={()=>{searchQuery = '';}}
                                class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                                aria-label="清除搜索"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                 stroke="currentColor" class="w-5 h-5">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
                            </svg>
                        </button>
                    {/if}
                </div>
                <div class="flex items-center">
                    <div class="flex items-center bg-blue-50 dark:bg-blue-900/20 px-3 py-1 rounded-full">
                        <span class="text-sm text-gray-600 dark:text-gray-400">共</span>
                        <span class="text-sm font-bold text-blue-600 dark:text-blue-400 mx-1">{filteredUsers.length}</span>
                        <span class="text-sm text-gray-600 dark:text-gray-400">个用户</span>
                    </div>
                </div>
            </div>
        </div>

        {#if loaded}
            <div class="w-full rounded-lg  shadow-sm border border-gray-200  overflow-hidden">
                <div class="w-full p-4 border-b border-gray-200">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center space-x-4">
                            <div class="flex items-center text-sm text-gray-500 dark:text-gray-400 bg-blue-50 dark:bg-blue-900/20 px-3 py-2 rounded-lg">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     stroke-width="1.5" stroke="currentColor" class="w-4 h-4 mr-2 text-blue-500">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                          d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"/>
                                </svg>
                                <div class="flex items-center">
                                    <span>{$i18n.t("Click on the user role button to change a user's role.")}</span>
                                    <button
                                            class="ml-2 text-blue-600 hover:underline flex items-center"
                                            on:mouseenter={showRoleInfo}
                                            on:mouseleave={hideRoleInfo}
                                            on:click={(e) => e.stopPropagation()}
                                    >
                                        <span>{$i18n.t("角色说明")}</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="w-full h-full max-h-[78vh]  overflow-x-auto text-sm">
                    <table class="w-full">
                        <thead>
                        <tr class="sticky bg-white dark:bg-gray-800 top-0 z-10  from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 border-b-2 border-gray-200 dark:border-gray-600">
                            <th scope="col"
                                class="px-6 py-4 text-left text-sm font-semibold text-gray-800 dark:text-gray-200 tracking-wide">
                                {$i18n.t('Role')}
                            </th>
                            <th scope="col"
                                class="px-6 py-4 text-left text-sm font-semibold text-gray-800 dark:text-gray-200 tracking-wide">
                                {$i18n.t('Name')}
                            </th>
                            <th scope="col"
                                class="px-6 py-4 text-left text-sm font-semibold text-gray-800 dark:text-gray-200 tracking-wide">
                                {$i18n.t('Account')}
                            </th>
                            <th scope="col"
                                class="px-6 py-4 text-left text-sm font-semibold text-gray-800 dark:text-gray-200 tracking-wide">
                                {$i18n.t('Action')}
                            </th>
                        </tr>
                        </thead>
                        <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-100 dark:divide-gray-700">
                        {#each filteredUsers as item, index}
                            <tr class="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-150">
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <button
                                            class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 hover:scale-105 {item.role === 'admin' && 'text-blue-700 bg-blue-100 hover:bg-blue-200 dark:text-blue-300 dark:bg-blue-900/30'} {item.role === 'user' && 'text-green-700 bg-green-100 hover:bg-green-200 dark:text-green-300 dark:bg-green-900/30'} {item.role === 'kbman' && 'text-yellow-700 bg-yellow-100 hover:bg-yellow-200 dark:text-yellow-300 dark:bg-yellow-900/30'}"
                                            on:click={() => {
												if (item.role === 'user') {
													updateRoleHandler(item.id, 'kbman');
												} else if (item.role === 'kbman') {
													updateRoleHandler(item.id, 'admin');
												} else {
													updateRoleHandler(item.id, 'user');
												}
											}}
                                    >
                                        <div class="w-2 h-2 rounded-full {item.role === 'admin' && 'bg-blue-500'} {item.role === 'user' && 'bg-green-500'} {item.role === 'kbman' && 'bg-yellow-400'}"></div>
                                        {$i18n.t(item.role)}
                                    </button>
                                </td>

                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="flex items-center">
                                        {#if item.profile_image_url && item.profile_image_url != "/user.png"}
                                            <div class="flex-shrink-0 h-10 w-10">
                                                <img class="h-8 w-8 rounded-full object-cover ring-2 ring-gray-200 dark:ring-gray-700"
                                                     src={item.profile_image_url}
                                                     alt="用户头像"/>
                                            </div>
                                        {:else}
                                            <div class="w-8 h-8 rounded-full bg-gradient-to-r from-violet-600 to-pink-500 flex items-center justify-center text-white font-medium text-sm">
                                                {item.name.charAt(0).toUpperCase()}
                                            </div>
                                        {/if}
                                        <div class="ml-2">
                                            <div class="text-sm font-medium text-gray-900 dark:text-white">{item.name}</div>
                                        </div>
                                    </div>
                                </td>

                                <td class="px-6 py-4">
                                    <div class="text-sm text-gray-900 dark:text-gray-300">{item.email}</div>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="flex items-center space-x-3">
                                        <Tooltip content="{$i18n.t('Edit')}" placement="top">
                                            <button
                                                    class="inline-flex items-center justify-center w-8 h-8 text-gray-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors duration-200"
                                                    on:click={async () => {
													showEditUserModal = !showEditUserModal;
													selectedUser = item;
												}}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                     stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                          d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"/>
                                                </svg>
                                            </button>
                                        </Tooltip>
                                        {#if $user.name != item.name}
                                            <Tooltip content="{$i18n.t('delete')}" placement="top">
                                                <button
                                                        class="inline-flex items-center justify-center w-8 h-8 text-gray-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors duration-200"
                                                        on:click={() => deleteUserHandler(item)}
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                         viewBox="0 0 24 24"
                                                         stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                                                        <path stroke-linecap="round" stroke-linejoin="round"
                                                              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"/>
                                                    </svg>
                                                </button>
                                            </Tooltip>
                                        {/if}
                                    </div>
                                </td>
                            </tr>

                        {/each}
                        </tbody>
                    </table>
                </div>
            </div>
        {:else}
            <div class="w-full flex items-center justify-center h-64 bg-white dark:bg-gray-800 rounded-lg shadow">
                <div class="flex items-center space-x-2">
                    <div class="w-4 h-4 bg-blue-600 rounded-full animate-pulse"></div>
                    <div class="w-4 h-4 bg-blue-600 rounded-full animate-pulse" style="animation-delay: 0.1s"></div>
                    <div class="w-4 h-4 bg-blue-600 rounded-full animate-pulse" style="animation-delay: 0.2s"></div>
                    <span class="ml-2 text-gray-600 dark:text-gray-400">加载中...</span>
                </div>
            </div>
        {/if}
    </div>
</div>
{#if showRoleTooltip}
    <div
            class="fixed bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl z-50 p-4 w-auto transition-all duration-200 transform"
            style="top: {tooltipPosition.top}px; left: {tooltipPosition.left}px; min-width: 600px; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);"
            on:mouseenter={showRoleInfo}
            on:mouseleave={hideRoleInfo}
    >
        <!-- 表格标题 -->
        <div class="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-3 flex items-center border-b border-gray-200 dark:border-gray-700 pb-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                 stroke="currentColor" class="w-5 h-5 mr-2 text-blue-500">
                <path stroke-linecap="round" stroke-linejoin="round"
                      d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"/>
            </svg>
            角色权限说明
        </div>

        <!-- 权限表格 -->
        <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead>
                <tr class="bg-gray-50 dark:bg-gray-700/50">
                    <th class="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        功能模块
                    </th>
                    <th class="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        <div class="flex items-center">
                            <span class="w-2 h-2 rounded-full bg-blue-500 mr-1.5"></span>
                            管理员
                        </div>
                    </th>
                    <th class="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        <div class="flex items-center">
                            <span class="w-2 h-2 rounded-full bg-yellow-400 mr-1.5"></span>
                            知识集管理员
                        </div>
                    </th>
                    <th class="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        <div class="flex items-center">
                            <span class="w-2 h-2 rounded-full bg-green-500 mr-1.5"></span>
                            用户
                        </div>
                    </th>
                </tr>
                </thead>
                <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-100 dark:divide-gray-700">
                <!-- 表格行 -->
                <tr class="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                    <td class="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">新对话</td>
                    <td class="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{@html full_access_icon}  </td>
                    <td class="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{@html full_access_icon}</td>
                    <td class="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{@html full_access_icon}</td>
                </tr>
                <tr class="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                    <td class="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">知识集及资料维护</td>
                    <td class="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{@html full_access_icon}</td>
                    <td class="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{@html partial_access_icon}</td>
                    <td class="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{@html no_access_icon}</td>
                </tr>
                <tr class="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                    <td class="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">AI知识库看板</td>
                    <td class="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{@html full_access_icon}</td>
                    <td class="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{@html full_access_icon}</td>
                    <td class="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{@html full_access_icon}</td>
                </tr>
                <tr class="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                    <td class="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">用户管理</td>
                    <td class="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{@html full_access_icon}</td>
                    <td class="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{@html no_access_icon}</td>
                    <td class="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{@html no_access_icon}</td>
                </tr>
                <tr class="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                    <td class="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">组织机构管理</td>
                    <td class="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{@html full_access_icon}</td>
                    <td class="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{@html partial_access_icon}</td>
                    <td class="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{@html no_access_icon}</td>
                </tr>
                <tr class="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                    <td class="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">系统设置</td>
                    <td class="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{@html full_access_icon}</td>
                    <td class="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{@html partial_access_icon}</td>
                    <td class="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{@html partial_access_icon}</td>
                </tr>
                </tbody>
            </table>
        </div>
        <div class="mt-3 text-xs text-gray-500 dark:text-gray-400 italic pt-2 border-t border-gray-200 dark:border-gray-700">
            <div class="flex items-center gap-x-6 mb-3 text-xs text-gray-500 dark:text-gray-400">
                <div class="flex items-center">
                    {@html full_access_icon}
                    <span class="ml-1">完全拥有</span>
                </div>
                <div class="flex items-center">
                    {@html partial_access_icon}
                    <span class="ml-1">部分拥有，只能操作自己相关的功能数据</span>
                </div>
                <div class="flex items-center">
                    {@html no_access_icon}
                    <span class="ml-1">没有权限</span>
                </div>
            </div>
        </div>
    </div>
{/if}

<ConfirmDialog
        bind:show={showClearConfirm}
        icon="danger"
        message="确定要删除用户 <strong>{delInfo?.name}</strong> 吗？<br>"
        on:cancel={()=>{showClearConfirm = false;}}
        on:confirm={deleteUserConfirmHandler}
        size="sm"
        title="删除用户"
/>
