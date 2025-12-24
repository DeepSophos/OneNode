<script lang="ts">
    import {v4 as uuidv4} from 'uuid';
    import {onMount, onDestroy, tick, getContext} from 'svelte';
    import {user} from '$lib/stores';
    import {toast} from 'svelte-sonner';
    import VirtualList from './Messages/VirtualList.svelte';
    import {updateChatById, feedbackChatById} from '$lib/apis/chats';
    import UserMessage from './Messages/UserMessage.svelte';
    import ResponseMessage from './Messages/ResponseMessage.svelte';

    const i18n = getContext('i18n');

    // === 必要的 Props ===
    export let chatId = '';
    export let messages = [];
    export let history = {};
    export let selectedScopes = [''];
    export let autoScroll = true;
    export let bottomPadding = true;

    // === 函数 Props ===
    export let sendPrompt: Function;
    export let continueGeneration: Function;
    export let regenerateResponse: Function;
    export let sendPromptMultiAgent: Function;

    export let processing = ''

    // === 虚拟化相关变量 ===
    let virtualList;
    let virtualListContainer; // 新增：绑定虚拟列表容器

    // === 滚动控制变量 ===
    let shouldAutoScroll = true;
    let lastMessageCount = 0;
    let scrollTimeout = null;
    let scrollContainer = null; // 缓存滚动容器

    // 获取虚拟列表的滚动容器
    const getScrollContainer = () => {
        if (scrollContainer) {
            return scrollContainer;
        }
        if (virtualListContainer !== null) {
            scrollContainer = virtualListContainer.querySelector('.virtual-list-wrapper') ||
                virtualListContainer.querySelector('svelte-virtual-list-wrapper') ||
                virtualListContainer.firstElementChild;
            return scrollContainer;
        }
        return null;
    };

    // 强制滚动到底部（无动画）- 改进版
    const forceScrollToBottom = async () => {
        await tick();
        let attempts = 0;
        const maxAttempts = 10; // 增加尝试次数
        const tryForceScroll = () => {
            scrollContainer = null;
            const container = getScrollContainer();
            if (container && container.scrollHeight > container.clientHeight) {
                const maxScroll = container.scrollHeight - container.clientHeight;
                container.scrollTop = maxScroll;
                return true;
            } else if (attempts < maxAttempts) {
                attempts++;
                setTimeout(tryForceScroll, 200); // 增加间隔时间
                return false;
            } else {
                console.warn('Failed to force scroll after', maxAttempts, 'attempts');
                return false;
            }
        };
        tryForceScroll();
    };

    // 处理消息变化
    const handleMessageChange = (newMessages) => {
        const hasNewMessages = newMessages.length > lastMessageCount;
        setTimeout(forceScrollToBottom, 10);
        lastMessageCount = newMessages.length;
    };

    // 合并剪贴板复制函数
    const copyToClipboard = async (content: string | HTMLElement) => {
        try {
            if (typeof content === 'string') {
                await navigator.clipboard.writeText(content);
            } else {
                const html = content.innerHTML;
                const text = content.innerText;
                const blob = new Blob([html], {type: 'text/html'});
                await navigator.clipboard.write([
                    new ClipboardItem({
                        'text/html': blob,
                        'text/plain': new Blob([text], {type: 'text/plain'})
                    })
                ]);
            }
            toast.success($i18n.t('Copying to clipboard was successful!'));
        } catch (err) {
            const textArea = document.createElement('textarea');
            const textContent = typeof content === 'string'
                ? content
                : content.innerText;
            textArea.value = textContent;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            toast.success($i18n.t('Copying to clipboard was successful!'));
        }
    };

    // 编辑消息确认
    const confirmEditMessage = async (messageId, content) => {
        const userMessageId = uuidv4();
        const originalMessage = history.messages[messageId];

        const userMessage = {
            id: userMessageId,
            parentId: originalMessage.parentId,
            childrenIds: [],
            role: 'user',
            content,
            scopes: selectedScopes,
            ...(originalMessage.files && {files: originalMessage.files})
        };

        const messageParentId = originalMessage.parentId;
        if (messageParentId !== null) {
            history.messages[messageParentId].childrenIds = [
                ...history.messages[messageParentId].childrenIds,
                userMessageId
            ];
        }

        history.messages[userMessageId] = userMessage;
        history.currentId = userMessageId;

        await tick();
        await sendPrompt(content, userMessageId, chatId);
    };

    // 编辑回复消息确认
    const confirmEditResponseMessage = async (messageId, content,originalContent) => {
        const message = history.messages[messageId];
        if(!message.originalContent){
            message.originalContent = originalContent;
        }
        message.content = content;
        try {
            await updateChatById(localStorage.token, chatId, {messages, history});
            toast.success($i18n.t('Save your answer successfully!'));
            await submitFeedback(messageId, message);
        } catch (err) {
            toast.error($i18n.t('Failed to save your answer!'));
        }
    };

    // 异步反馈提交
    const submitFeedback = async (messageId, message) => {
        const messageParentId = message.parentId;
        if (!messageParentId) return;

        try {
            await feedbackChatById(localStorage.token, chatId, {
                question: history.messages[messageParentId].content,
                original_answer: message.originalContent,
                corrected_answer: message.content,
                feedback: 'positive',
                scopes: history.messages[messageParentId].scopes,
                message_id: messageId
            });
        } catch (err) {
            console.warn('Feedback submission failed:', err);
        }
    };

    // 消息评分
    const rateMessage = async (messageId, rating) => {
        history.messages[messageId].rating = rating;

        try {
            await updateChatById(localStorage.token, chatId, {messages, history});
        } catch (err) {
            console.warn('Rating update failed:', err);
        }
    };


    // 翻译功能
    const translateTo = async (messageId, lang) => {
        const message = history.messages[messageId];
        message.lang = lang;

        if (!message.state) {
            message[`${lang}_content`] = lang === 'cn'
                ? "因数据缺失无法执行语言切换！"
                : "Cannot switch language due to missing data!";
            return;
        }

        const content = message.lang === 'en' ? message.content :
            message.lang === 'cn' ? message.cn_content : message.jp_content;
        const enContent = message.content;

        if (!content && enContent) {
            message.state.agent = 'TranslateAgent';
            message.state.lang = lang;
            await sendPromptMultiAgent(enContent, messageId, chatId);
        }

        await tick();
    };

    // 消息导航
    const navigateMessage = (message, direction) => {
        const siblings = message.parentId !== null
            ? history.messages[message.parentId]?.childrenIds ?? []
            : Object.values(history.messages)
                .filter(m => m.parentId === null)
                .map(m => m.id);

        const currentIndex = siblings.indexOf(message.id);
        if (currentIndex === -1) return;

        const targetIndex = direction === 'next'
            ? Math.min(currentIndex + 1, siblings.length - 1)
            : Math.max(currentIndex - 1, 0);

        const targetMessageId = siblings[targetIndex];
        if (!targetMessageId || targetMessageId === message.id) return;

        // 找到最深的子消息
        let currentId = targetMessageId;
        while (history.messages[currentId]?.childrenIds?.length) {
            currentId = history.messages[currentId].childrenIds.at(-1);
        }
        history.currentId = currentId;
        forceScrollToBottom();
    };

    // 删除消息
    const messageDeleteHandler = async (messageId) => {
        const messageToDelete = history.messages[messageId];
        if (!messageToDelete.parentId) return;

        // 从父节点移除引用
        const parent = history.messages[messageToDelete.parentId];
        parent.childrenIds = parent.childrenIds.filter(id => id !== messageId);

        // 重新挂载子节点
        messageToDelete.childrenIds?.forEach(childId => {
            if (history.messages[childId]) {
                history.messages[childId].parentId = messageToDelete.parentId;
                parent.childrenIds.push(childId);
            }
        });

        delete history.messages[messageId];

        try {
            await updateChatById(localStorage.token, chatId, {messages, history});
        } catch (err) {
            console.warn('Message deletion failed:', err);
        }
    };
    // 监听消息变化
    $: if (messages) {
        handleMessageChange(messages);
    }
    // 监听processing变化，处理流式输出时的自动滚动
    $: if (processing && autoScroll && shouldAutoScroll) {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(forceScrollToBottom, 200);
    }
    onMount(async () => {
        await tick();
        await forceScrollToBottom();
    });
    onDestroy(() => {
        clearTimeout(scrollTimeout);
    });

</script>

<!-- 虚拟化列表容器 -->
{#if messages.length === 0}
    <div class="flex flex-col items-center justify-center h-full text-gray-500">
        <p>{$i18n.t('No messages yet')}</p>
    </div>
{:else}
    <div bind:this={virtualListContainer} class="w-full h-[100%]">
        <VirtualList
                bind:this={virtualList}
                items={messages}
                let:item
                let:index
        >
            <div class="item">
                <div class="message-wrapper w-full">
                    <div class="flex flex-col justify-between px-5 mb-3 max-w-3xl mx-auto rounded-lg group w-full ">
                        {#if item.role === 'user'}
                            <UserMessage
                                    message={item}
                                    user={$user}
                                    isFirstMessage={index === 0}
                                    siblings={item.parentId !== null
                                    ? history.messages[item.parentId]?.childrenIds ?? []
                                    : Object.values(history.messages)
                                        .filter(m => m.parentId === null)
                                        .map(m => m.id)}
                                    {confirmEditMessage}
                                    showPreviousMessage={() => navigateMessage(item, 'prev')}
                                    showNextMessage={() => navigateMessage(item, 'next')}
                                    {copyToClipboard}
                                    on:delete={() => messageDeleteHandler(item.id)}
                            />
                        {:else}
                            <ResponseMessage
                                    message={item}
                                    siblings={history.messages[item.parentId]?.childrenIds ?? []}
                                    isLastMessage={index === messages.length-1}
                                    {confirmEditResponseMessage}
                                    showPreviousMessage={() => navigateMessage(item, 'prev')}
                                    showNextMessage={() => navigateMessage(item, 'next')}
                                    {rateMessage}
                                    copyToClipboard={copyToClipboard}
                                    {continueGeneration}
                                    {regenerateResponse}
                                    {translateTo}
                                    on:save={async (e) => {
                                    const message = e.detail;
                                    history.messages[message.id] = message;
                                    try {
                                        await updateChatById(localStorage.token, chatId, { messages, history });
                                    } catch (err) {
                                        console.warn('Save failed:', err);
                                    }
                                }}
                            />
                        {/if}
                    </div>
                </div>
            </div>
        </VirtualList>
    </div>

    {#if bottomPadding}
        <div class="adwd mb-10"/>
    {/if}
{/if}