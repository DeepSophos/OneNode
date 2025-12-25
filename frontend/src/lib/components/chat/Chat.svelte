<script lang="ts">
    import {v4 as uuidv4} from 'uuid';
    import {toast} from 'svelte-sonner';

    import {onMount, tick, getContext} from 'svelte';
    import {goto} from '$app/navigation';
    import {page} from '$app/stores';

    import {
        models,
        modelfiles,
        user,
        settings,
        chats,
        chatId,
        config,
        ONENODE_NAME,
        inner_prompt,
        tags as _tags,
        rightpanel_params,
        rightpanel_auto
    } from '$lib/stores';
    import {copyToClipboard, splitStream} from '$lib/utils';

    import {generateChatCompletion, cancelOllamaRequest} from '$lib/apis/ollama';
    import {
        addTagById,
        createNewChat,
        deleteTagById,
        getAllChatTags,
        getChatById,
        getChatList,
        getTagsById,
        updateChatById
    } from '$lib/apis/chats';
    import {addCitation, updatePrompt, queryMultiAgent, generateTitle, recordKbUsageCount} from '$lib/apis/rag';

    import MessageInput from '$lib/components/chat/MessageInput.svelte';
    import Messages from '$lib/components/chat/Messages.svelte';
    import Navbar from '$lib/components/layout/Navbar.svelte';
    import FirstPage from '$lib/components/chat/FirstPage.svelte';
    import {ONENODE_BASE_URL} from '$lib/constants';
    import Loading from "$lib/components/common/Loading.svelte";

    const i18n = getContext('i18n');

    let loaded = false;

    let stopResponseFlag = false;
    let autoScroll = true;
    let processing = '';
    let messagesContainerElement: HTMLDivElement;
    let currentRequestId = null;

    let selectedScopes = [''];

    export let newPage;

    let chat = null;
    let tags = [];

    let title = '';
    let prompt = '';
    let files = [];
    let messages = [];
    let history = {
        messages: {},
        currentId: null
    };
    let isLoading = false;

    $: if (history.currentId !== null) {
        let _messages = [];
        let currentMessage = history.messages[history.currentId];
        while (currentMessage !== null) {
            _messages.unshift({...currentMessage});
            currentMessage =
                currentMessage.parentId !== null ? history.messages[currentMessage.parentId] : null;
        }
        messages = _messages;
    } else {
        messages = [];
    }

    $: if ($page.params.id) {
        (async () => {
            if (await loadChat()) {
                await tick();
                loaded = true;

                window.setTimeout(() => scrollToBottom(), 0);
                const chatInput = document.getElementById('chat-textarea');
                chatInput?.focus();
            } else {
                await goto('/');
            }
        })();
    }

    onMount(async () => {
        if (newPage) {
            await initNewChat();
            loaded = true;
        } else
            await loadChat();
    });

    //////////////////////////
    // Web functions
    //////////////////////////
    const actionClick = async () => {
        if (newPage) {
            await initNewChat();
        } else {
            if (currentRequestId !== null) {
                await cancelOllamaRequest(localStorage.token, currentRequestId);
                currentRequestId = null;
            }
            goto('/');
        }
    }


    const initNewChat = async () => {
        if (currentRequestId !== null) {
            await cancelOllamaRequest(localStorage.token, currentRequestId);
            currentRequestId = null;
        }
        window.history.replaceState(history.state, '', `/`);
        await chatId.set('');

        autoScroll = true;

        inner_prompt.set('');

        title = '';
        messages = [];
        history = {
            messages: {},
            currentId: null
        };

        selectedScopes = $settings?.scopes ?? [''];

        let _settings = JSON.parse(localStorage.getItem('settings') ?? '{}');
        settings.set({
            ..._settings
        });

        const chatInput = document.getElementById('chat-textarea');
        setTimeout(() => chatInput?.focus(), 0);

        window.setTimeout(() => {
            rightpanel_params.set([]);
        }, 500);
    };

    const loadChat = async () => {
        isLoading = true;
        messages = [];
        await chatId.set($page.params.id);
        chat = await getChatById(localStorage.token, $chatId).catch(async (error) => {
            await goto('/');
            return null;
        });
        if (chat) {
            tags = await getTags();
            const chatContent = chat.chat;
            if (chatContent) {
                history =
                    (chatContent?.history ?? undefined) !== undefined
                        ? chatContent.history
                        : convertMessagesToHistory(chatContent.messages);
                title = chatContent.title;

                let _settings = JSON.parse(localStorage.getItem('settings') ?? '{}');
                await settings.set({
                    ..._settings,
                    system: chatContent.system ?? _settings.system,
                    options: chatContent.options ?? _settings.options
                });

                selectedScopes = chatContent.scopes ?? $settings?.scopes ?? [''];

                autoScroll = true;
                await tick();

                if (messages.length > 0) {
                    history.messages[messages.at(-1).id].done = true;
                }
                await tick();
                setTimeout(() => {
                    isLoading = false;
                }, 500)
                return true;
            } else {
                return null;
            }
        }
    };

    const scrollToBottom = () => {
        if (messagesContainerElement) {
            messagesContainerElement.scrollTop = messagesContainerElement.scrollHeight;
        }
    };

    //////////////////////////
    // Ollama functions
    //////////////////////////

    const submitPrompt = async (userPrompt, _user = null) => {
        prompt = '';
        let userFiles = files;
        files = [];
        if (userPrompt === '') {
            return;
        }
        //清除selectedScopes未选择的知识集
        let selScopes = selectedScopes.filter(item => {
            return item && Object.keys(item).length > 0;
        });
        selectedScopes = selScopes.length > 0 ? selScopes : [''];
        if (selectedScopes.includes('')) {
            toast.error($i18n.t('Knowledge scope is not selected'));
        } else if (messages.length != 0 && messages.at(-1).done != true) {
            // Response not done
            toast.warning('请等待上一个回答');
        } else if (
            userFiles.length > 0 &&
            userFiles.filter((file) => file.upload_status === false).length > 0
        ) {
            // Upload not done
            toast.error(
                $i18n.t(
                    `Oops! Hold tight! Your files are still in the processing oven. We're cooking them up to perfection. Please be patient and we'll let you know once they're ready.`
                )
            );
        } else {
            // Reset chat message textarea height
            const chatTextarea = document.getElementById('chat-textarea');
            if (chatTextarea) {
                chatTextarea.style.height = '';
            }

            // Create user message
            let userMessageId = uuidv4();
            let userMessage = {
                id: userMessageId,
                parentId: messages.length !== 0 ? messages.at(-1).id : null,
                childrenIds: [],
                role: 'user',
                user: _user ?? undefined,
                content: userPrompt,
                scopes: selectedScopes,
                files: userFiles.length > 0 ? userFiles : undefined,
                timestamp: Math.floor(Date.now() / 1000) // Unix epoch
            };

            // Add message to history and Set currentId to messageId
            history.messages[userMessageId] = userMessage;
            history.currentId = userMessageId;

            // Append messageId to childrenIds of parent message
            if (messages.length !== 0) {
                history.messages[messages.at(-1).id].childrenIds.push(userMessageId);
            }

            // Wait until history/message have been updated
            await tick();

            // Create new chat if only one message in messages
            if (messages.length == 1) {
                if ($settings.saveChatHistory ?? true) {
                    chat = await createNewChat(localStorage.token, {
                        id: $chatId,
                        title: $i18n.t('New Chat'),
                        scopes: selectedScopes,
                        system: $settings.system ?? undefined,
                        options: {
                            ...($settings.options ?? {})
                        },
                        messages: messages,
                        history: history,
                        tags: [],
                        timestamp: Date.now()
                    });
                    await chats.set(await getChatList(localStorage.token));
                    await chatId.set(chat.id);
                } else {
                    await chatId.set('local');
                }
                await tick();
            }

            // Send prompt
            await sendPrompt(userPrompt, userMessageId);

            //Record the number of times the knowledge set is used
            await recordKbUsageCount(selectedScopes, localStorage.token);
        }
    };

    const sendPrompt = async (prompt, parentId) => {
        let responseMessageId = uuidv4();
        let responseMessage = {
            parentId: parentId,
            id: responseMessageId,
            childrenIds: [],
            role: 'assistant',
            content: '',
            origin_content: undefined,
            cn_content: '',
            jp_content: '',
            cot: '',
            lang: 'en',
            timestamp: Math.floor(Date.now() / 1000) // Unix epoch
        };
        const _chatId = JSON.parse(JSON.stringify($chatId));

        rightpanel_auto.set(true);

        // Add message to history and Set currentId to messageId
        history.messages[responseMessageId] = responseMessage;
        history.currentId = responseMessageId;

        // Append messageId to childrenIds of parent message
        if (parentId !== null) {
            history.messages[parentId].childrenIds = [
                ...history.messages[parentId].childrenIds,
                responseMessageId
            ];
        }

        await sendPromptMultiAgent(prompt, responseMessageId, _chatId);
        await chats.set(await getChatList(localStorage.token));
    };

    const handleProgressProtocol = async (content, anchors, data) => {
        let re_content = JSON.parse(content);
        if (data.command == 'append') {
            if (re_content.length > 0) {
                re_content[re_content.length - 1].content += data.data;
            } else {
                re_content.push({
                    title: '准备过程',
                    content: data.data
                })
            }
        } else if (data.command == 'new_step') {
            anchors.push(content.length);
            re_content.push({
                title: data.data,
                content: ''
            })
        }
        content = JSON.stringify(re_content);
        return [
            content,
            anchors
        ]
    }

    const handleResponseProtocol = async (content, anchors, data) => {
        if (data.command == 'append') {
            content += data.data;
        }
        if (data.command == 'rewind') {
            if (anchors.length > 0) {
                const index = anchors.pop();
                content = content.slice(0, index);
            } else {
                content = "";
            }
        }
        if (data.command == 'anchor_start') {
            anchors.push(content.length);
        }
        return [
            content,
            anchors
        ]
    }

    const merge_content_for_threads = async (threads, joiner = "") => {
        let content = '';
        threads['thread_sequence'].forEach((task_name) => {
            content += threads[task_name].content + joiner
        });
        return content;
    }

    const readContent = async (responseMessage, value, progress_threads, response_threads) => {
        let lines = value.split('\n');
        for (const line of lines) {
            if (line !== '') {
                // console.log(line);
                let data = JSON.parse(line);

                if (data.channel == 'progress') {
                    if (!(data.thread in progress_threads)) {
                        progress_threads['thread_sequence'].push(data.thread);
                        progress_threads[data.thread] = {
                            content: '[]',
                            anchors: []
                        }
                    }
                    let content_obj = progress_threads[data.thread];
                    [content_obj.content, content_obj.anchors] = await handleProgressProtocol(content_obj.content, content_obj.anchors, data);
                    responseMessage.cot = await merge_content_for_threads(progress_threads, ",");
                    responseMessage.cot = "[" + responseMessage.cot.slice(0, -1) + "]";
                }

                if (data.channel == 'response') {
                    if (!(data.thread in response_threads)) {
                        response_threads['thread_sequence'].push(data.thread);
                        response_threads[data.thread] = {
                            content: '',
                            anchors: []
                        }
                    }
                    let content_obj = response_threads[data.thread];
                    [content_obj.content, content_obj.anchors] = await handleResponseProtocol(content_obj.content, content_obj.anchors, data);
                    if (responseMessage.lang == 'en')
                        responseMessage.content = await merge_content_for_threads(response_threads);
                    else if (responseMessage.lang == 'cn')
                        responseMessage.cn_content = await merge_content_for_threads(response_threads);
                    else if (responseMessage.lang == 'jp')
                        responseMessage.jp_content = await merge_content_for_threads(response_threads);
                }

                if (data.channel == 'status') {
                    if (data.command == 'end') {
                        responseMessage.done = true;
                    } else if (data.command == 'state') {
                        if (data.data == '')
                            data.data = '{}';
                        responseMessage.state = JSON.parse(data.data);
                    }
                }

                messages = messages;
            }
        }
    };

    export const sendPromptMultiAgent = async (userPrompt, responseMessageId, _chatId) => {
        const responseMessage = history.messages[responseMessageId];
        const userMessage = history.messages[responseMessage.parentId];
        let progress_threads = {
            thread_sequence: []
        };
        let response_threads = {
            thread_sequence: []
        };

        // Wait until history/message have been updated
        await tick();

        // Scroll down
        scrollToBottom();

        stopResponseFlag = false;
        const [res, controller,code] = await queryMultiAgent(localStorage.token, {
            state: {
               query: userPrompt,
               chatId: _chatId,
               scopes: userMessage.scopes,
               files: userMessage.files
            }
        });

        if (res && res.ok) {

            const reader = res.body
                .pipeThrough(new TextDecoderStream())
                .pipeThrough(splitStream('\n'))
                .getReader();

            while (true) {
                const {value, done} = await reader.read();
                if (done || stopResponseFlag || _chatId !== $chatId) {
                    responseMessage.done = true;
                    messages = messages;

                    if (stopResponseFlag) {
                        controller.abort('User: Stop Response');
                        await cancelRequestMultiAgent(localStorage.token, currentRequestId);
                    }

                    currentRequestId = null;
                    break;
                }

                try {
                    await readContent(responseMessage, value, progress_threads, response_threads);
                } catch (error) {
                    console.log('error',error);
                    if ('detail' in error) {
                        toast.error(error.detail);
                    }
                    break;
                }

                if (autoScroll) {
                    scrollToBottom();
                }
            }

            if ($chatId == _chatId) {
                if ($settings.saveChatHistory ?? true) {
                    chat = await updateChatById(localStorage.token, _chatId, {
                        messages: messages,
                        history: history
                    });
                    await chats.set(await getChatList(localStorage.token));
                }
            }
        } else {
            if (res !== null) {
                const error = await res.json();
                if ('detail' in error) {
                    toast.error(error.detail);
                    responseMessage.content = error.detail;
                } else {
                    toast.error(error.error);
                    responseMessage.content = error.error;
                }
            } else {
							if(code==205){
								toast.error('当日问答次数已使用完,升级套餐获得更多次数。');
                                responseMessage.content = '当日问答次数已使用完,升级套餐获得更多次数。'
							}else{
								 toast.error(
                    $i18n.t(`Uh-oh! There was an issue connecting to {{provider}}.`, {provider: 'Ollama'})
                );
                responseMessage.content = $i18n.t(`Uh-oh! There was an issue connecting to {{provider}}.`, {
                    provider: 'Ollama'
                });
							}

            }
            responseMessage.error = true;
            // responseMessage.content = $i18n.t(`Uh-oh! There was an issue connecting to {{provider}}.`, {
            //     provider: 'Ollama'
            // });
            responseMessage.done = true;
            messages = messages;
        }

        stopResponseFlag = false;
        await tick();

        if (autoScroll) {
            scrollToBottom();
        }

        if (messages.length == 2 && messages.at(1).content !== '') {
            window.history.replaceState(history.state, '', `/c/${_chatId}`);
            const _title = await generateChatTitle(userPrompt);
            await setChatTitle(_chatId, _title);
        }
    };

    const stopResponse = () => {
        stopResponseFlag = true;
    };

    const regenerateResponse = async () => {
        if (messages.length != 0 && messages.at(-1).done == true) {
            messages.splice(messages.length - 1, 1);
            messages = messages;

            let userMessage = messages.at(-1);
            let userPrompt = userMessage.content;

            await sendPrompt(userPrompt, userMessage.id);
        }
    };

    const continueGeneration = async () => {
    };


    const generateChatTitle = async (userPrompt) => {
        if ($settings?.title?.auto ?? false) {
            const resp = await generateTitle(
                localStorage.token,
                userPrompt
            );
            return resp.title;
        } else {
            return `${userPrompt}`.substring(0, 50);
        }
    };

    const setChatTitle = async (_chatId, _title) => {
        if (_chatId === $chatId) {
            title = _title;
        }

        if ($settings.saveChatHistory ?? true) {
            chat = await updateChatById(localStorage.token, _chatId, {title: _title});
            await chats.set(await getChatList(localStorage.token));
        }
    };

    const getTags = async () => {
        return await getTagsById(localStorage.token, $chatId).catch(async (error) => {
            return [];
        });
    };

    const addTag = async (tagName) => {
        const res = await addTagById(localStorage.token, $chatId, tagName);
        tags = await getTags();

        chat = await updateChatById(localStorage.token, $chatId, {
            tags: tags
        });

        _tags.set(await getAllChatTags(localStorage.token));
    };

    const deleteTag = async (tagName) => {
        const res = await deleteTagById(localStorage.token, $chatId, tagName);
        tags = await getTags();

        chat = await updateChatById(localStorage.token, $chatId, {
            tags: tags
        });

        _tags.set(await getAllChatTags(localStorage.token));
    };

    $: prompt = (() => {
        if ($inner_prompt !== '') {
            window.setTimeout(() => submitPrompt($inner_prompt, null), 0);
            return $inner_prompt;
        }
        return '';
    })()

    let uploadProgress = 0; // 新增上传进度状态

</script>

<svelte:head>
    <title>首页</title>
</svelte:head>

{#if loaded}

    <Loading isLoading={isLoading} loadType="page"></Loading>

    <div class="flex  h-screen max-h-[100dvh] w-full flex flex-col">
        <Navbar
                {title}
                bind:selectedScopes
                shareEnabled={messages.length > 0}
                initNewChat={actionClick}
                {tags}
                {addTag}
                {deleteTag}
        />
        <div class="flex flex-col flex-auto">
            {#if messages.length == 0}
                <FirstPage
                        bind:selectedScopes
                        bind:files
                />
            {:else}
                <div
                        class="flex flex-col justify-between w-full flex-auto overflow-hidden h-0"
                        id="messages-container"
                        bind:this={messagesContainerElement}
                        on:scroll={(e) => {
				autoScroll =
					messagesContainerElement.scrollHeight - messagesContainerElement.scrollTop <=
					messagesContainerElement.clientHeight + 5;
			}}
                >
                    <div class=" h-full w-full flex flex-col pb-2">
                        <Messages
                                chatId={$chatId}
                                {processing}
                                bind:history
                                bind:messages
                                bind:autoScroll
                                bottomPadding={files.length > 0}
                                {sendPrompt}
                                {continueGeneration}
                                {regenerateResponse}
                                {sendPromptMultiAgent}
                        />
                    </div>
                </div>

                <MessageInput
                        bind:files
                        bind:prompt
                        bind:autoScroll
                        suggestionPrompts={$config.default_prompt_suggestions}
                        {messages}
                        {submitPrompt}
                        {stopResponse}
                />
            {/if}
        </div>
    </div>
{/if}

