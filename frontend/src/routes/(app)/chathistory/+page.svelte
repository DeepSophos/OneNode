<script lang="ts">
    import {onMount, getContext} from 'svelte';
    import {toast} from 'svelte-sonner';
    import {goto} from "$app/navigation";
    import {formatTimestamp} from "$lib/utils/index"
    import {
        deleteChatById,
        getChatList,
        getChatById,
        getChatListByTagName,
        updateChatById,
        getAllChatTags
    } from '$lib/apis/chats';
    import {chatId, chats} from "$lib/stores";
    import ConfirmDialog from "$lib/components/ConfirmDialog.svelte";

    const i18n = getContext('i18n');

    let searchQuery = '';
    let chatList = [];
    let filteredChats = [];
    let isLoading = true;
    let editingChatId = null;
    let editTitle = '';
    let showClearConfirm = false;
    let delInfo = null;

    // 加载对话列表
    const loadChats = async () => {
        try {
            isLoading = true;
            const data = await getChatList(localStorage.token)
            chats.set(data)
            chatList = data || [];
        } catch (error) {
            console.error('加载对话列表失败:', error);
            toast.error('加载对话记录失败，请重试');
        } finally {
            isLoading = false;
        }
    };

    // 过滤逻辑
    $: {
        if (searchQuery.trim() === '') {
            filteredChats = [...chatList];
        } else {
            const query = searchQuery.toLowerCase().trim();
            filteredChats = chatList.filter(chat =>
                chat.title?.toLowerCase().includes(query) ||
                chat.content?.toLowerCase().includes(query)
            );
        }
    }

    // 删除对话
    const handleDelete = async () => {
        if (!delInfo) return;
        const res = await deleteChatById(localStorage.token, delInfo.id).catch((error) => {
            toast.error(error);
            return;
        });
        if (res) {
            await loadChats();
        }
        delInfo = null;
        showClearConfirm = false;
    };

    // 进入对话详情
    const goToChatDetail = (id, e) => {
        if (e && (e.target.closest('.edit-container') || e.target.closest('.action-buttons'))) {
            return;
        }
        goto(`/c/${id}`);
    };

    // 开始编辑标题
    const startEditing = (chat, e) => {
        e.stopPropagation();
        editingChatId = chat.id;
        editTitle = chat.title || '';
        setTimeout(() => {
            const input = document.getElementById(`edit-input-${chat.id}`);
            if (input) input.focus();
        }, 0);
    };

    // 保存标题修改
    const saveTitle = async (id) => {
        if (editingChatId !== id) return;
        try {
            const chatIndex = chatList.findIndex(chat => chat.id === id);
            if (chatIndex !== -1) {
                await updateChatById(localStorage.token, id, {title: editTitle});
                chatList[chatIndex].title = editTitle;
                chats.set(chatList)
            }
        } catch (error) {
            console.error('更新标题失败:', error);
            toast.error('更新标题失败，请重试');
        } finally {
            editingChatId = null;
        }
    };

    // 取消编辑
    const cancelEditing = (id, e) => {
        e?.stopPropagation();
        editingChatId = null;
    };

    // 监听回车键保存
    const handleKeyDown = (id, e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            saveTitle(id);
        } else if (e.key === 'Escape') {
            cancelEditing(id, e);
        }
    };

    // 获取对话预览内容
    const getPreviewContent = (chat) => {
        if (!chat.content || chat.content.trim() === '') return '暂无内容';
        const content = chat.content.replace(/\n+/g, ' ').trim();
        return content.length > 80 ? content.substring(0, 80) + '...' : content;
    };

    // 组件挂载时加载数据
    onMount(() => {
        loadChats();
    });
</script>

<div class="w-full px-8 py-5">
    <div class="flex items-center justify-between mb-6 p-4 rounded-lg shadow border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800">
        <div class="flex items-center space-x-4">
            <button
                    aria-label="返回首页"
                    class="text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors duration-200"
                    on:click={() => { goto('/') }}
            >
                <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="1.5"
                     viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                          stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>
            <h1 class="text-lg font-semibold text-gray-900 dark:text-white">历史对话记录</h1>
        </div>

        <div class="flex items-center space-x-2">
            <div class="w-auto relative text-sm">
                <input
                        bind:value={searchQuery}
                        class="w-full pl-10 pr-4 py-1 rounded-lg border border-gray-300 dark:border-gray-600 dark:text-gray-300 dark:bg-gray-800 outline-none focus:border-gray-400"
                        placeholder="搜索对话..."
                        type="text"
                />
                <div class="absolute left-3 top-2 text-gray-400">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.5"
                         viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                              stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </div>
                {#if searchQuery.trim() !== ''}
                    <button
                            on:click={() => { searchQuery = ''; }}
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

            <div class="flex items-center bg-blue-50 dark:bg-blue-900/20 px-3 py-1 rounded-full">
                <span class="text-sm text-gray-600 dark:text-gray-400">共</span>
                <span class="text-sm font-bold text-blue-600 dark:text-blue-400 mx-1">{filteredChats.length}</span>
                <span class="text-sm text-gray-600 dark:text-gray-400">条记录</span>
            </div>
        </div>
    </div>

    <div class="flex flex-col h-full max-h-[calc(100vh-165px)] overflow-y-auto mb-5 justify-between text-sm">
        {#if isLoading}
            <div class="flex justify-center items-center py-10">
                <div class="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                <span class="ml-2 text-gray-600 dark:text-gray-400">加载对话记录中...</span>
            </div>
        {:else if filteredChats.length === 0}
            <div class="flex flex-col items-center justify-center py-10 text-center">
                <div class="w-16 h-16 mb-4 text-gray-300 dark:text-gray-600">
                    <svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4l4 4 4-4h4c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
                    </svg>
                </div>
                <p class="text-gray-500 dark:text-gray-400 mb-4 text-lg font-medium">
                    未找到匹配的对话记录
                </p>
                <button
                        on:click={() => goto('/')}
                        class="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
                >
                    开始新对话
                </button>
            </div>
        {:else}
            <div class="space-y-2">
                {#each filteredChats as chat (chat.id)}
                    <div class="group relative bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-800 hover:shadow-md transition-all duration-200 overflow-hidden cursor-pointer">
                        <div class="px-4 py-3" on:click={(e) => goToChatDetail(chat.id, e)}>
                            <div class="flex items-center justify-between">
                                <div class="flex items-center flex-1 min-w-0 gap-3">
                                    <div class="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-800/30 rounded-lg flex items-center justify-center">
                                        <svg class="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none"
                                             stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                  d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.96 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"/>
                                        </svg>
                                    </div>

                                    <div class="flex-1 min-w-0">
                                        {#if editingChatId === chat.id}
                                            <div class="edit-container flex items-center gap-2">
                                                <input
                                                        id={`edit-input-${chat.id}`}
                                                        bind:value={editTitle}
                                                        class="flex-1 px-2 py-1 border border-blue-200 dark:border-blue-700 rounded-md focus:outline-none  dark:bg-gray-700 dark:text-white text-sm"
                                                        on:keydown={(e) => handleKeyDown(chat.id, e)}
                                                        on:blur={() => saveTitle(chat.id)}
                                                />
                                                <button
                                                        class="text-green-600 hover:text-green-700 transition-colors p-1"
                                                        on:click={(e) => { e.stopPropagation(); saveTitle(chat.id); }}
                                                        aria-label="保存"
                                                >
                                                    <svg class="w-4 h-4" fill="none" stroke="currentColor"
                                                         stroke-width="1.5" viewBox="0 0 24 24">
                                                        <path d="M4.5 12.75l6 6 9-13.5" stroke-linecap="round"
                                                              stroke-linejoin="round"/>
                                                    </svg>
                                                </button>
                                                <button
                                                        class="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors p-1"
                                                        on:click={(e) => cancelEditing(chat.id, e)}
                                                        aria-label="取消"
                                                >
                                                    <svg class="w-4 h-4" fill="none" stroke="currentColor"
                                                         stroke-width="1.5" viewBox="0 0 24 24">
                                                        <path d="M6 18L18 6M6 6l12 12" stroke-linecap="round"
                                                              stroke-linejoin="round"/>
                                                    </svg>
                                                </button>
                                            </div>
                                        {:else}
                                            <div class="space-y-1">
                                                <div class="flex items-center gap-2 group/title">
                                                    <h3 class="font-medium text-gray-900 dark:text-white text-sm truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors max-w-md"
                                                        title={chat.title || '无标题对话'}>
                                                        {chat.title || '无标题对话'}
                                                    </h3>
                                                    <button
                                                            class="text-gray-400 hover:text-blue-500 transition-colors p-0.5 opacity-0 group-hover/title:opacity-100"
                                                            on:click={(e) => startEditing(chat, e)}
                                                            title="编辑标题"
                                                    >
                                                        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor"
                                                             stroke-width="1.5" viewBox="0 0 24 24">
                                                            <path d="m16.862 4.487 1.687-1.688a1.875 1.875 0 0 1 2.652 0l1.06 1.06a1.875 1.875 0 0 1 0 2.652L10.552 16.017h.008v.008L3.81 22.801a1.875 1.875 0 0 1-2.652 0l-1.06-1.06a1.875 1.875 0 0 1 0-2.652L16.863 4.487Zm0 0L19.5 7.125"
                                                                  stroke-linecap="round" stroke-linejoin="round"/>
                                                        </svg>
                                                    </button>
                                                </div>
                                                <!-- 预览内容 -->
                                                <!--                                                <p class="text-xs text-gray-500 dark:text-gray-400 truncate max-w-md">-->
                                                <!--                                                    {getPreviewContent(chat)}-->
                                                <!--                                                </p>-->
                                            </div>
                                        {/if}
                                    </div>
                                </div>

                                <div class="flex items-center gap-3 flex-shrink-0 ml-4">
                                    <span class="text-xs text-gray-400 dark:text-gray-500 whitespace-nowrap">
                                        {formatTimestamp(chat.timestamp)}
                                    </span>
                                    <div class="action-buttons flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button
                                                on:click={(e) => { e.stopPropagation(); goto(`/c/${chat.id}`); }}
                                                class="text-gray-400 hover:text-blue-500 transition-colors p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                                                aria-label="查看对话"
                                                title="查看对话"
                                        >
                                            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.5"
                                                 viewBox="0 0 24 24">
                                                <path d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                                                      stroke-linecap="round" stroke-linejoin="round"/>
                                                <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" stroke-linecap="round"
                                                      stroke-linejoin="round"/>
                                            </svg>
                                        </button>
                                        <button
                                                on:click={(e) => {
                                                    e.stopPropagation();
                                                    delInfo=chat;
                                                    showClearConfirm = true;
                                                }}
                                                class="text-gray-400 hover:text-red-500 transition-colors p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                                                aria-label="删除对话"
                                                title="删除对话"
                                        >
                                            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.5"
                                                 viewBox="0 0 24 24">
                                                <path d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H6.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                                      stroke-linecap="round" stroke-linejoin="round"/>
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- 悬停指示器 -->
                        <div class="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                {/each}
            </div>
        {/if}
    </div>
</div>

<ConfirmDialog
        bind:show={showClearConfirm}
        icon="danger"
        message="确定要删除对话 <strong>{delInfo?.title}</strong> 吗？"
        on:cancel={()=>{showClearConfirm = false;}}
        on:confirm={handleDelete}
        size="sm"
        title="删除对话"
/>