<script lang="ts">
    import {onMount, getContext, tick} from 'svelte';
    import {user, scopes} from "$lib/stores"
    import 'virtual:uno.css'
    import {KTour} from '@ikun-ui/core';
    import {
        AddScope,
        AddPrivateScope,
        DeleteScope,
        getScopeDetail,
        UpdateScopeInfo,
        getKnowledgeScopes,
        VerifyScopeName,
        scopeUpdatingStatus
    } from "$lib/apis/rag"
    import {formatTimestamp} from "$lib/utils/index"
    import {goto} from '$app/navigation';
    import ConfirmDialog from '$lib/components/ConfirmDialog.svelte';
    import {toast} from "svelte-sonner";
    import Tooltip from "$lib/components/common/Tooltip.svelte";
    import QuestionMode from "./Question.svelte";
    import {getAllFeedbacks} from "$lib/apis/chats"

    const i18n = getContext('i18n');
    let isInitialized = false;
    let refBtn1 = null;
    let refBtn2 = null;
    let steps = [];
    let openTour = false;
    let isAddModalOpen = false;
    let reconfirmModalOpen = false;
    let nameError = '';
    let isNameValid = true;
    let isPrivate = false;
    let showQuestionMode = false;
    let defaultKnowledgeBase = [{
        "id": 1,
        "name": "示例知识集",
        "description": "",
        "file_num": 3,
        "priority": 0.5,
        "version": 21,
        "visible": 1,
        "timestamp": "2025-08-28T11:31:41.801066",
        "owner_id": "65c58dd0-9417-4721-9fab-1a52659877ba",
        "owner_name": "wx",
        "security_level": "0",
        "private": false,
        "cache_ready": true,
        "usage_count": 100,
        "pendingCount": 0,
        "feedbackCount": 0
    }]

    interface KnowledgeBase {
        id?: number,
        name: string;
        description: string;
        owner_name: string;
        owner_id: string;
    }

    // Initialize the default knowledge base object
    const newKnowledgeBase: KnowledgeBase = {
        id: 0,
        name: '',
        description: '',
        owner_name: $user.name,
        owner_id: $user.id,
    };

    $: {
        steps = [
            {
                title: '添加知识集',
                description: '第一步,添加一个知识集。',
                target: refBtn1
            },
            {
                title: '导入文件',
                description: '第二步,点击“详情”进入知识集导入文件。',
                target: refBtn2
            }
        ]
    }

    async function validateKnowledgeName(name: string): Promise<boolean> {
        if (!name.trim()) {
            nameError = '知识集名称不能为空';
            isNameValid = false;
            return false;
        }
        const duplicateName = await VerifyScopeName(localStorage.token, newKnowledgeBase.id, newKnowledgeBase.name);
        if (duplicateName) {
            nameError = '知识集名称已存在';
            isNameValid = false;
            return false;
        }

        nameError = '';
        isNameValid = true;
        return true;
    }

    async function editKnowledgeBase(knowledgeBase: KnowledgeBase = defaultKnowledgeBase) {
        const isValid = await validateKnowledgeName(newKnowledgeBase.name);
        if (!isValid) {
            return;
        }

        if (newKnowledgeBase.id == 0) {
            const newBase: KnowledgeBase = {
                ...newKnowledgeBase,
                timestamp: new Date().toISOString(),
                file_num: 0,
            };
            if (isPrivate) {
                await AddPrivateScope(localStorage.token, newBase);
                isPrivate = false;
            } else {
                await AddScope(localStorage.token, newBase);
            }
            await GetScopes();
        } else {
            reconfirmModalOpen = true
        }
        cleanEdit();
    }

    async function reconfirmEditKnowledgeBase() {
        const isValid = await validateKnowledgeName(newKnowledgeBase.name);
        if (!isValid) {
            return;
        }
        const updateBase: KnowledgeBase = {...newKnowledgeBase}
        await UpdateScopeInfo(localStorage.token, updateBase).then(async (res) => {
            await GetScopes()
        }).catch((err) => {
            toast.error(err?.detail || `知识集更新失败`);
        })
        cancelReconfirm();
    }

    function cleanEdit() {
        isAddModalOpen = false;
        nameError = '';
        isNameValid = true;
    }

    function cancelReconfirm() {
        reconfirmModalOpen = false;
    }

    function showEdit(id) {
        if (id == 0) {
            newKnowledgeBase.id = 0;
            newKnowledgeBase.name = '';
            newKnowledgeBase.description = '';
        } else {
            getScopeDetail(localStorage.token, id).then((res) => {
                let scope = JSON.parse(res);
                newKnowledgeBase.id = scope.id;
                newKnowledgeBase.name = scope.name;
                newKnowledgeBase.description = scope.description;
            })
        }
        isAddModalOpen = true;
    }

    let showClearConfirm = false;
    let delInfo = null;


    async function delScope(scope) {
        showClearConfirm = true;
        delInfo = scope;

    }

    function handleDelConfirm() {
        if (!delInfo) return;
        scopeUpdatingStatus(localStorage.token).then((data) => {
            if (data[delInfo.name] ?? 0 > 0) {
                toast.error('该知识集有文件在更新中，不能删除');
                return;
            } else {
                DeleteScope(localStorage.token, delInfo.id).then(() => {
                    delInfo = null;
                    toast.success('删除成功');
                    GetScopes();
                });
            }
        });
    }

    let searchQuery = '';
    let filteredScopes = [];

    // 添加过滤逻辑
    $: {
        if (isInitialized) {
            if (searchQuery.trim() === '') {
                filteredScopes = $scopes;
            } else {
                filteredScopes = $scopes.filter(scope =>
                    scope.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    scope.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    scope.owner_name?.toLowerCase().includes(searchQuery.toLowerCase())
                );
            }
        }
    }

    async function GetScopes() {
        await setOpeScopes();
        // 查询所有知识集
        const data = JSON.parse(await getKnowledgeScopes(localStorage.token));
        const scopeStatus = await scopeUpdatingStatus(localStorage.token);
        //将可操作的知识集放在前面
        const orderScopes = [...ope_scopes, ...data.filter(item => !ope_scopes.some(scope => scope.name === item.name))]
        const scopeArr = orderScopes.map(item => {
            const updating = scopeStatus[item.name] ?? 0;
            return {...item, updating: updating};
        });
        let tempFiltered = [...scopeArr];
        if (tempFiltered.length > 0) {
            const feedbacks = await getAllFeedbacks(localStorage.token, 'positive') ?? [];
            tempFiltered = tempFiltered.map(scope => {
                const scopeFeedbacks = feedbacks.filter(f => f.scopes[0] === scope.name) ?? [];
                return {
                    ...scope,
                    feedbackCount: scopeFeedbacks.length,
                    pendingCount: scopeFeedbacks.filter(f => f.status === 'pending').length,
                };
            });
        }
        await scopes.set(tempFiltered);
        if (searchQuery.trim() !== '') {
            tempFiltered = tempFiltered.filter(scope =>
                scope.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                scope.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                scope.owner_name?.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }
        filteredScopes = tempFiltered;
    }

    let newUser = false;

    let ope_scopes = [];
    //获取当前用户可操作的知识集列表
    const setOpeScopes = async () => {
        await getKnowledgeScopes(localStorage.token, true)
            .then((res) => {
                ope_scopes = JSON.parse(res);
            })
    }

    onMount(async () => {
        newUser = !$scopes.some(item => item.owner_name === $user.name);
        if (localStorage.TourT3Hide != 'true' && newUser) {
            filteredScopes = defaultKnowledgeBase;
            handleOpen()
        } else {
            isInitialized = true;
            await GetScopes()
        }
    });

    const handleOpen = () => {
        openTour = true;
    };
    const handleTourHide = () => {
        localStorage.setItem('TourT3Hide', true);
        handleClose()
    };
    const handleClose = async () => {
        openTour = false;
        await GetScopes()
        isInitialized = true;
    };
    const handleFinish = async () => {
        openTour = false;
        await GetScopes()
        isInitialized = true;
    };

    function isAuthor(base) {
        if (base === null) return false;
        return ope_scopes.some(item => item.name === base.name)
    }

    let scopeInfo = null;

    function showQuestionModeWin(info) {
        showQuestionMode = true;
        scopeInfo = info;
    }
</script>

<div class="w-full px-8 py-5">
    <div class="flex items-center justify-between mb-2  p-4 rounded-lg shadow border border-gray-300 dark:border-gray-700">
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
            <h1 class="text-lg font-semibold text-gray-900 dark:text-white">知识集</h1>
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
            <!-- 刷新按钮 -->
            <Tooltip content="刷新列表" placement="top">
                <button
                        class="rounded-lg border-0 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-200"
                        on:click={GetScopes}
                >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.5"
                         viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                              stroke-linecap="round"
                              stroke-linejoin="round"/>
                    </svg>
                </button>
            </Tooltip>
            <div class="flex items-center bg-blue-50 dark:bg-blue-900/20 px-3 py-1 rounded-full">
                <span class="text-sm text-gray-600 dark:text-gray-400">共</span>
                <span class="text-sm font-bold text-blue-600 dark:text-blue-400 mx-1">{filteredScopes.length}</span>
                <span class="text-sm text-gray-600 dark:text-gray-400">个知识集</span>
            </div>
        </div>
    </div>
    <div class="flex flex-col h-full max-h-[calc(100vh-135px)] overflow-y-auto mb-5  justify-between text-sm">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {#if $user.role === 'admin' || $user.role === "kbman"}
                <div class="border-2 min-h-[200px] border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-5 flex items-center justify-center cursor-pointer  hover:bg-gray-100 dark:hover:bg-gray-850 transition-colors"
                     on:click={() => showEdit(0)}
                     bind:this={refBtn1}
                >
                    <div class="text-center">
                        <span class="block text-4xl text-blue-500 dark:text-blue-400">+</span>
                        <span class="text-gray-600 dark:text-gray-400">添加知识集</span>
                    </div>
                </div>
            {/if}
            {#each filteredScopes as base}
                <div class="border border-gray-400 dark:border-gray-700 p-3 transition-shadow hover:shadow-md hover:bg-gray-100 dark:hover:bg-gray-850 rounded-lg group flex flex-col min-h-[200px] relative overflow-hidden">
                    {#if base.private }
                        <div class="absolute top-2 right-[-1.5rem] w-20 bg-blue-500 dark:bg-blue-600 text-white text-xs font-medium py-0.5 text-center transform rotate-45">
                            私有
                        </div>
                    {/if}
                    <div class="flex-1">
                        <div class="cursor-pointer flex-1"
                             on:click={() => {goto(`/knowledgedetail/${base.id}`)}}
                        >
                            <h2 class="text-base font-semibold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
                                {#if base.updating > 0}
                                    <Tooltip content="{base.updating}个文件更新中…">
                                        <svg class="w-3 h-3 animate-spin text-blue-500 dark:text-blue-400" fill="none"
                                             stroke="currentColor"
                                             viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                                        </svg>
                                    </Tooltip>
                                {/if}
                                {base.name ?? ''}
                            </h2>
                            <p class="text-gray-600 dark:text-gray-400 my-3 h-4 truncate overflow-hidden text-sm">{base.description ?? ''}</p>
                            <div class="gap-2 text-sm text-gray-600 dark:text-gray-300 mb-3 text-left">
                                <p class="flex justify-between">
                                    <span>文件数量：</span>
                                    <span class="font-medium">{base.file_num}</span>
                                </p>
                                <p class="flex justify-between">
                                    <span>创建者：</span>
                                    <span class="font-medium truncate ml-2">{base.owner_name}</span>
                                </p>
                                <p class="flex justify-between">
                                    <span>待审核/用户反馈：</span>
                                    <span class="font-medium truncate ml-2">{base.pendingCount}
                                        /{base.feedbackCount}</span>
                                </p>
                                <p class="flex justify-between">
                                    <span>修改时间：</span>
                                    <span class="font-medium truncate ml-2">{formatTimestamp(base.timestamp)}</span>
                                </p>
                                <p class="flex justify-between">
                                    <span class="text-gray-700 dark:text-gray-300">使用次数：</span>
                                    <span class="font-medium truncate ml-2 text-gray-800 dark:text-gray-200">{base.usage_count}</span>
                                </p>
                            </div>
                        </div>
                        <div class="flex justify-end gap-2 mt-2">
                            <button
                                    class="px-3 py-1 bg-red-500 hover:bg-red-600 text-white text-xs rounded transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                                    on:click={() => delScope(base)}
                                    disabled={!isAuthor(base)}
                            >
                                删除
                            </button>
                            <button
                                    class="px-3 py-1 bg-green-500 hover:bg-green-600 text-white text-xs rounded transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                                    on:click={() => showEdit(base.id)}
                                    disabled={!isAuthor(base)}
                            >
                                编辑
                            </button>
                            <button
                                    bind:this={refBtn2}
                                    class="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white text-xs rounded transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                                    on:click={() => goto(`/knowledgedetail/${base.id}`)}
                            >
                                详情
                            </button>
                            <button
                                    class="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white text-xs rounded transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                                    on:click={showQuestionModeWin(base)}
                            >
                                常用问题
                            </button>
                        </div>
                    </div>
                </div>
            {/each}


        </div>
    </div>
    {#if isAddModalOpen}
        <div class="fixed inset-0 bg-black bg-opacity-50  flex items-center justify-center z-50">
            <div class=" bg-gray-50 dark:bg-gray-900 p-6 rounded-lg w-full max-w-md">
                <h2 class="text-sm font-bold mb-4 text-gray-800 dark:text-gray-200">
                    {newKnowledgeBase.id == 0 ? '添加知识集' : '编辑知识集'}
                </h2>
                <div class="mb-4">
                    <input
                            class="
                            text-sm
                            outline-none
                            w-full p-2 rounded  dark:text-gray-300 dark:bg-gray-850
        {!isNameValid ? 'border-red-500' : ''}"
                            placeholder="知识集名称"
                            bind:value={newKnowledgeBase.name}
                            autofocus
                    />
                    {#if nameError}
                        <p class="text-red-500 text-sm mt-1">{nameError}</p>
                    {/if}
                </div>
                {#if newKnowledgeBase.id == 0}
                    <div class="flex items-center mb-4">
                        <label class="text-sm relative inline-flex items-center cursor-pointer">
                            <input
                                    type="checkbox"
                                    class="sr-only peer"
                                    bind:checked={isPrivate}
                            >
                            <div class="w-11 h-6 bg-gray-200 rounded-full peer
                            dark:bg-gray-700 peer-checked:after:translate-x-full
                            peer-checked:after:border-white after:content-['']
                            after:absolute after:top-[2px] after:left-[2px]
                            after:bg-white after:border-gray-300 after:border
                            after:rounded-full after:h-5 after:w-5
                            after:transition-all dark:border-gray-600
                            peer-checked:bg-emerald-600">
                            </div>
                        </label>
                        <span class="ml-2 text-sm text-gray-600 dark:text-gray-400">
                        仅作者可见
                    </span>
                    </div>
                {/if}
                <textarea
                        class="w-full mb-4 p-2 text-sm dark:text-gray-300 dark:bg-gray-850 rounded dark:bg-gray-700 text-gray-800 h-24 outline-none"
                        placeholder="知识集描述"
                        bind:value={newKnowledgeBase.description}
                ></textarea>
                <input
                        class="hidden w-full mb-4 p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                        placeholder="维护人"
                        bind:value={newKnowledgeBase.owner_name}
                />
                <div class="flex justify-end">
                    <button
                            class="px-3 py-1 mx-1 rounded bg-gray-200 hover:bg-gray-300 text-gray-700 transition"
                            on:click={cleanEdit}
                    >
                        取消
                    </button>
                    <button
                            class="px-3 py-1 mx-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                            on:click={editKnowledgeBase}
                    >
                        确定
                    </button>
                </div>
            </div>
        </div>
    {/if}
    {#if reconfirmModalOpen}
        <div class="fixed inset-0 bg-black bg-opacity-50  flex items-center justify-center z-50">
            <div class=" bg-gray-50 dark:bg-gray-900 p-6 rounded-lg w-full max-w-lg">
                <h2 class="text-sm font-bold mb-4 text-gray-800 dark:text-gray-200">
                    提示信息
                </h2>
                <div class="mb-4 text-[#f00] text-lg text-center">
                    修改知识集名称会导致无法显示之前对话的引用内容！
                </div>

                <div class="flex justify-end">
                    <button
                            class="px-3 py-1 mx-1 rounded bg-gray-200 hover:bg-gray-300 text-gray-700 transition"
                            on:click={cancelReconfirm}
                    >
                        取消
                    </button>
                    <button
                            class="px-3 py-1 mx-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                            on:click={reconfirmEditKnowledgeBase}
                    >
                        确定
                    </button>
                </div>
            </div>
        </div>
    {/if}
    <ConfirmDialog
            bind:show={showClearConfirm}
            icon="danger"
            message="确定要删除知识集 <strong>{delInfo?.name}</strong> 吗？<br>该知识集已导入{delInfo?.file_num}个文件。"
            on:cancel={()=>{showClearConfirm = false;}}
            on:confirm={handleDelConfirm}
            size="sm"
            title="删除知识集"
    />
    <QuestionMode
            bind:scopeInfo={scopeInfo}
            bind:visible={showQuestionMode}
            isAuthor={isAuthor(scopeInfo)}
            on:cancel={()=>{scopeInfo = null;}}
    />
    <KTour finishBtnText="完成" nextBtnText="下一步" on:close={handleClose} on:finish={handleFinish} open={openTour}
           placement="right" prevBtnText="上一步" steps={steps}>
        <!-- 使用具名slot -->
        <div let:current let:handleNext let:handlePrev slot="footer">
            <footer class="flex justify-end">
                <div>

                    {#if current > 0}
                        <button class="px-2 py-1 text-[10px] border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                on:click={handlePrev} disabled={current === 0}>
                            上一步
                        </button>
                    {:else}
                        <!-- 占位元素，保持布局 -->
                        <button style="visibility: hidden"
                                class="px-2 py-2 text-xs border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                on:click={handlePrev} disabled={current === 0}>
                            上一步
                        </button>
                    {/if}

                    {#if current === 1}
                        <button class="px-2 py-1 text-[10px] bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                on:click={handleTourHide}>
                            不在显示
                        </button>
                    {:else}
                        <button class="px-2 py-1 text-[10px] bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                on:click={handleNext}>
                            下一步
                        </button>
                    {/if}
                </div>
            </footer>
        </div>
    </KTour>
</div>
