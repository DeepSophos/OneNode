<script>
    import {getContext, onMount} from 'svelte';
    import {goto} from '$app/navigation';
    import {toast} from "svelte-sonner";
    import {formatTimestamp, getRelativeTime} from "$lib/utils/index"
    import AppForm from './AppForm.svelte';
    import ConfirmDialog from '$lib/components/ConfirmDialog.svelte';
    import {GetAppList, createApp, updateApp, deleteApp} from "$lib/apis/application"
    import {user} from '$lib/stores';

    const i18n = getContext('i18n');

    const categories = [
        {value: '', label: '请选择分类'},
        {value: 'management', label: '企业管理'},
        {value: 'tools', label: '个人工具'},
        {value: 'data', label: '数据工具'},
        {value: 'collab', label: '协作工具'}
    ]

    // AppList.svelte
    /** @type {Array<{
     *   id: string,
     *   name: string,
     *   description: string,
     *   icon: string,
     *   isPublic: boolean,
     *   owner_id: string,
     *   owner_name: string,
     *   createdAt: number,
     *   updatedAt: number,
     *   status: number,
     *   category?: string,
     *   otherAttr?: any
     * }>} */
    export let apps = [];

    let searchQuery = '';
    let delApp = {
        show: false,
        info: null
    };

    async function getApplicationList() {
        apps = await GetAppList(localStorage.getItem("token"))
    }

    // 过滤应用
    $: filteredApps = apps.filter(app => {
        const searchTerm = searchQuery.toLowerCase();
        return app.name.toLowerCase().includes(searchTerm);
    }).sort((a, b) => b.createdAt - a.createdAt);

    let showForm = false;
    let editingApp = null;


    // 打开添加应用表单
    function handleAddApp() {
        editingApp = {id: ''};
        showForm = true;
    }

    // 打开编辑应用表单
    function handleEdit(app) {
        editingApp = {...app};
        showForm = true;
    }

    // 处理表单提交
    function handleFormSubmit(event) {
        const submittedApp = event.detail;
        if (submittedApp.node_id) {
            updateApp({
                    app_id: submittedApp.node_id,
                    config: submittedApp
                },
                localStorage.getItem("token")
            ).then((res) => {
                if (res?.status == "successfully") {
                    toast.success("应用保存成功")
                    apps = apps.map(app => app.node_id === submittedApp.node_id ? submittedApp : app);
                } else {
                    toast.error("应用保存失败")
                }
            }).catch((err) => {
                toast.error("应用保存失败")
            });
        } else {
            let newApp = {
                name: submittedApp.name,
                options: {
                    ...submittedApp,
                    owner_id: $user.id,
                    owner_name: $user.name,
                    createdAt: Date.now(),
                    updatedAt: Date.now()
                }
            };
            createApp(
                newApp,
                localStorage.getItem("token")
            ).then((res) => {
                if (res?.status == "successfully") {
                    toast.success("应用创建成功")
                    newApp.options.node_id = res.node_id;
                    apps = [...apps, newApp.options];
                } else {
                    toast.error("应用创建失败")
                }
            }).catch((err) => {
                toast.error("应用创建失败")
            });
        }
        showForm = false;
    }

    function handleFormCancel() {
        showForm = false;
    }

    // // 发布应用
    // function handlePublish(app) {
    //     if (app.status === 1) {
    //         toast(`撤销应用："${app.name}"发布`);
    //         return;
    //     } else {
    //         toast(`发布应用："${app.name}"`);
    //         return;
    //     }
    //
    // }

    function handleDesign(app) {
        goto(`/designapp/${app.node_id}`)
    }


    async function handleDelAppConfirm() {
        let result = await deleteApp(delApp.info.node_id, localStorage.getItem("token"));
        if (result.status == "successfully") {
            apps = apps.filter(app => app.node_id !== delApp.info.node_id);
            toast.success(`应用删除成功`);
        } else {
            toast.error(`应用删除失败，请重试!`);
        }

    }

    onMount(() => {
        getApplicationList();
    })
</script>

<div class="w-full px-8 py-5">
    <div class="mb-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <button
                class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 shadow-sm self-start"
                on:click={handleAddApp}
        >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M12 4v16m8-8H4" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
            </svg>
            <span>添加应用</span>
        </button>

        <div class="flex items-center space-x-4 w-full sm:w-auto">
            <div class="relative max-w-md w-full">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg class="h-5 w-5 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor"
                         viewBox="0 0 24 24">
                        <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"/>
                    </svg>
                </div>
                <input
                        bind:value={searchQuery}
                        class="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none"
                        placeholder="搜索…"
                        type="text"
                />
            </div>
            <div class="text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">
                共 <span class="font-semibold text-blue-600 dark:text-blue-400">{filteredApps.length}</span> 个应用程序
            </div>
        </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {#each filteredApps as app (app.node_id)}
            <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 flex flex-col">
                <div class="p-4 flex-1 overflow-hidden">
                    <div class="flex items-start justify-between mb-2">
                        <div class="flex items-center space-x-2 flex-1 min-w-0">
                            <div class="flex-1 min-w-0">
                                <h3 class="text-base font-semibold text-gray-900 dark:text-gray-100 truncate mb-0.5">{app.name}</h3>
                                <p class="text-xs text-gray-500 dark:text-gray-400">{app.owner_name}</p>
                            </div>
                        </div>
                    </div>
                    <div class="flex items-center space-x-2 mb-2 flex-wrap">
                        <!--                        <span class={`px-2 py-0.5 rounded-full text-xs font-medium ${-->
                        <!--                            app.status === 1-->
                        <!--                            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'-->
                        <!--                            : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'-->
                        <!--                        }`}>-->
                        <!--                            {app.status === 1 ? '已发布' : '未发布'}-->
                        <!--                        </span>-->
                        <span class={`px-2 py-0.5 rounded-full text-xs font-medium ${
                            app.isPublic
                              ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
                              : 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400'
                          }`}>
                            {app.isPublic ? '公开' : '私有'}
                        </span>
                        <div class="text-xs text-gray-500 dark:text-gray-500">
                        <span title={formatTimestamp(app.updatedAt)}>
                            更新时间: {getRelativeTime(app.updatedAt)}
                        </span>
                        </div>
                    </div>
                    <div class="text-gray-600 dark:text-gray-400 text-sm line-clamp-2 mb-2 leading-relaxed">
                        {#if app.description}
                            {app.description}
                        {:else}
                            <span class="text-gray-300 dark:text-gray-600 italic">无描述信息</span>
                        {/if}
                    </div>
                </div>
                <div class="px-4 py-2.5 border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-850 flex items-center justify-end">
                    <div class="flex justify-end space-x-1">
                        <button
                                on:click={() => {
                                    goto(`/runapp?id=${app.node_id}&name=${encodeURIComponent(app.name)}`);
                                }}
                                class="px-2 py-0.75 text-xs text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg flex items-center space-x-1 transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                 stroke="currentColor" class="w-3.5 h-3.5">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                      d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"/>
                            </svg>
                            <span>运行</span>
                        </button>
                        <button
                                on:click={() => handleDesign(app)}
                                class="px-2 py-0.75 text-xs text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg flex items-center space-x-1 transition-colors"
                        >
                            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                            </svg>
                            <span>设计</span>
                        </button>
                        <button
                                on:click={() => handleEdit(app)}
                                class="px-2 py-0.75 text-xs text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg flex items-center space-x-1 transition-colors"
                                title="编辑"
                        >
                            <!-- 编辑图标 -->
                            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                            </svg>
                            <span>编辑</span>
                        </button>

                        <!--                        <button-->
                        <!--                                on:click={() => handlePublish(app)}-->
                        <!--                                class="px-2 py-0.75 text-xs text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg flex items-center space-x-1 transition-colors"-->

                        <!--                                title="发布"-->
                        <!--                        >-->
                        <!--                            {#if app.status === 0}-->
                        <!--                                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">-->
                        <!--                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"-->
                        <!--                                          d="M5 12l5 5L20 7"/>-->
                        <!--                                </svg>-->
                        <!--                            {:else }-->
                        <!--                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"-->
                        <!--                                     stroke-width="1.5" stroke="currentColor" class="size-3.5">-->
                        <!--                                    <path stroke-linecap="round" stroke-linejoin="round"-->
                        <!--                                          d="m15 15 6-6m0 0-6-6m6 6H9a6 6 0 0 0 0 12h3"/>-->
                        <!--                                </svg>-->
                        <!--                            {/if}-->
                        <!--                            <span>{app.status === 0 ? '发布' : '撤销'}</span>-->
                        <!--                        </button>-->
                        <button
                                on:click={() => {
                                    delApp.show = true;
                                    delApp.info = app;
                                }}
                                class="px-2 py-0.75 text-xs text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg flex items-center space-x-1 transition-colors"
                        >
                            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                            </svg>
                            <span>删除</span>
                        </button>
                    </div>
                </div>
            </div>
        {/each}
    </div>
    {#if filteredApps.length === 0}
        <div class="text-center py-16">
            {#if searchQuery}
                <svg class="mx-auto h-24 w-24 text-gray-400 dark:text-gray-500" fill="none"
                     stroke="currentColor"
                     viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                          d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"/>
                </svg>
                <h3 class="mt-4 text-lg font-medium text-gray-900 dark:text-gray-100">
                    未找到匹配的应用</h3>
                <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    尝试调整搜索条件或清空搜索框</p>
                <button
                        on:click={() => searchQuery = ''}
                        class="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                    清空搜索
                </button>
            {:else}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                     stroke-width="1.5"
                     stroke="currentColor"
                     class="mx-auto h-24 w-24 text-gray-400 dark:text-gray-500">
                    <path stroke-linecap="round" stroke-linejoin="round"
                          d="M2.25 13.5h3.86a2.25 2.25 0 0 1 2.012 1.244l.256.512a2.25 2.25 0 0 0 2.013 1.244h3.218a2.25 2.25 0 0 0 2.013-1.244l.256-.512a2.25 2.25 0 0 1 2.013-1.244h3.859m-19.5.338V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 0 0-2.15-1.588H6.911a2.25 2.25 0 0 0-2.15 1.588L2.35 13.177a2.25 2.25 0 0 0-.1.661Z"/>
                </svg>
                <h3 class="mt-4 text-lg font-medium text-gray-900 dark:text-gray-100">
                    暂无应用程序</h3>
                <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    开始创建您的第一个应用程序</p>
            {/if}
        </div>
    {/if}
</div>
<!-- 表单弹窗 -->
{#if showForm}
    <AppForm app={editingApp}
             categories={categories}
             on:submit={handleFormSubmit}
             on:cancel={handleFormCancel}/>
{/if}

<ConfirmDialog
        bind:show={delApp.show}
        icon="danger"
        message="确定要删除应用 <strong>{delApp?.info?.name}</strong> 吗？"
        on:cancel={() => {delApp.show = false; delApp.info = null}}
        on:confirm={handleDelAppConfirm}
        size="sm"
        title="删除应用"
/>

<style>
    .line-clamp-2 {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }
</style>