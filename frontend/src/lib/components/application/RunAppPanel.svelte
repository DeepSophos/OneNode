<script>
    import { createEventDispatcher, onMount } from 'svelte';
    import {
        runApp,
        parseStream, runAgent
    } from "$lib/apis/application"
    import {toast} from "svelte-sonner";
    import ShowControl from './ShowControl.svelte';
    import ShowToolControl from './ShowToolControl.svelte';

    const dispatch = createEventDispatcher();

    export let app_id = '';
    export let agent_id = '';
    export let runable = false;
    export let messages = [];
    export let toolMap = new Map();
    export let closeBtn = false;

    let messagesEnd; // 滚动锚点元素
    let messagesContainer; // 消息列表容器（用于判断是否有滚动条）
    let isRunning = false;
    let showMessages=new Set();

    $: if (app_id || agent_id || toolMap.size > 0 ) {
        if(messages.length === 0){
            const storedMessages = JSON.parse(localStorage.getItem(`run_data_${app_id}_${agent_id}`)) || [];
            if(storedMessages.length===0 && runable && !isRunning && agent_id === ""){
                runApplication()
            }else {
                 messages = JSON.parse(localStorage.getItem(`run_data_${app_id}_${agent_id}`)) || [];
                 setTimeout(scrollToBottom, 50);
            }
        }else {
            setTimeout(scrollToBottom, 50);
        }
    }

    $: if (messages.length > 0) setTimeout(scrollToBottom, 50);

    // 自动滚动到底部函数
    function scrollToBottom() {
        const hasScrollbar = messagesContainer.scrollHeight > messagesContainer.clientHeight + 1;
        if (hasScrollbar) {
            messagesEnd.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }
    }

    onMount(() => {

    });

    function showMessageDetail(msgId) {
        if (showMessages.has(msgId)) {
            showMessages.delete(msgId);
        } else {
            showMessages.add(msgId);
        }
        showMessages = showMessages; // 触发响应式更新
    }

    // 格式化时间
    function formatTime(time) {
        const date = time instanceof Date ? time : new Date(time);
        return date.toLocaleTimeString([], {hour12: false, hour: '2-digit', minute:'2-digit'});
    }

    // 角色转名称
    function roleToName(role) {
        switch (role) {
            case "agent": return "智能代理";
            case "tool": return "工具";
            case "llm": return "大模型";
            case "user": return "用户";
            default: return "系统";
        }
    }

    // 关闭面板
    function handleClose() {
        dispatch('close');
    }

    function runApplication() {
        isRunning = true;
        messages=[];
        localStorage.setItem(`run_data_${app_id}_${agent_id}`, JSON.stringify(messages)); // 清空存储
        if (agent_id == "") {
            runApp(
                app_id,
                localStorage.getItem("token"),
            ).then(async (res) => {
                parseStream(res.body, handleLine);
            }).catch(() => {
                isRunning = false;
                toast.error("运行失败，请重试！");
            });
        } else {
            runAgent({
                    app_id,
                    agent_id,
                },
                localStorage.getItem("token")
            ).then(async (res) => {
                parseStream(res.body, handleLine);
            }).catch(() => {
                isRunning = false;
                toast.error("运行失败，请重试！");
            });
        }
    }

    function handleLine(line) {
        try {
            const data = JSON.parse(line);
            switch (data.channel) {
                case "prompt":
                    if(data.command=="append")
                    {
                        if (messages.length == 0 || messages[messages.length - 1].role != data.role) {
                            if(messages.length > 0) {
                                messages = messages.with(messages.length - 1, {
                                    ...messages[messages.length - 1],
                                    done: true
                                });
                            }
                            messages = [...messages, {
                                id: Date.now(),
                                role: data.role,
                                agent_id: (data.data.agent_id || ''),
                                type: data.data.type,
                                content: data.data.content,
                                timestamp: new Date(),
                                done: false
                            }];
                        } else {
                            const lastMessage = messages[messages.length - 1];
                            const updatedLast = {
                                ...lastMessage,
                                content: lastMessage.content + '\n\n' + data.data.content
                            };
                            messages = [...messages.slice(0, -1), updatedLast];
                        }
                    }
                    break;
                case "progress":
                    // 处理进度信息
                    break;
                case "response":
                    // 处理响应信息
                    break;
                default:
                    //control commands
                    if (data.command === 'show_ui_control') {
                        data.data = {...data.data, app_id: data.app_id, agent_id: data.agent_id};
                        openModal(data.data);
                    }
                    else if (data.command === 'end') {
                        // 处理结束命令
                        isRunning = false;
                        console.log('Application run ended.');
                        if (messages.length > 0) {
                            messages = messages.with(messages.length - 1, {
                                ...messages[messages.length - 1],
                                done: true
                            });
                        }
                    }
            }
            localStorage.setItem(`run_data_${app_id}_${agent_id}`, JSON.stringify(messages));
        } catch (e) {
            console.warn('Failed to parse line as JSON:', line);
        }
    }

    function  parse_tool_json(content)
    {
        try {
            const tools = JSON.parse(content.replace(/```json\n/, '').replace(/\n```$/, ''))
            return  tools;
        }
        catch(e){
            return null;
        }
    }

    let showModal = false;
    let modalData = '';
    function openModal(data) {
        modalData = data;
        showModal = true;
    }
</script>

<div class="w-full min-w-[24vw] overflow-hidden dark:bg-gray-900 {agent_id==''?'border-l':''} h-full border-gray-200 dark:border-gray-800 flex flex-col transition-all duration-300">
    <!-- 顶部标题栏 -->
    <div class="p-2 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between bg-gray-50 dark:bg-gray-900">
        <button
                class="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white text-sm shadow"
                on:click={runApplication}
                disabled={!runable || isRunning}
                title="{!runable?'不可运行，请检查设置。':''}"
                aria-label="运行"
        >
            {#if isRunning}
                <svg class="w-4 h-4 spinner" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                    <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
                    <path d="M12 2 A10 10 0 0 1 22 12" stroke-linecap="round"></path>
                </svg>
            {:else}
                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M8 5v14l11-7z"/>
                </svg>
            {/if}
            运行
        </button>
        {#if closeBtn}
            <button
                    class="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    on:click={handleClose}
                    aria-label="关闭运行面板"
            >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M6 18L18 6M6 6l12 12" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                </svg>
            </button>
        {/if}
    </div>
    <!-- 消息列表：绑定容器元素，用于判断滚动条 -->
    <div
        bind:this={messagesContainer}
        class="flex-1 overflow-y-auto p-4 space-y-6 scroll-smooth dark:bg-gray-900/50"
    >
        {#each messages as msg}
            <div
                class={`flex items-start space-x-3
                ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}
            `}
            >
                <!-- 头像 -->
                <div
                    class={`w-10 h-10 flex items-center justify-center rounded-full font-semibold text-sm shadow-md transition-all duration-300 hover:shadow-lg
                    ${msg.role === 'user'
                        ? 'bg-blue-500 text-white hover:bg-blue-600'
                        : msg.role === 'agent'
                            ? 'bg-purple-500 text-white hover:bg-purple-600'
                            : msg.role === 'tool'
                                ? 'bg-green-500 text-white hover:bg-green-600'
                                : 'bg-indigo-500 text-white hover:bg-indigo-600'
                    }
                `}
                    aria-label={roleToName(msg.role)}
                    title={roleToName(msg.role)}
                >
                    {msg.role === "agent" ? "AG" : msg.role === "tool" ? "TL" : msg.role === "llm" ? "LM" : "U"}
                </div>

                <!-- 消息内容 -->
                <div class={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'} max-w-[80%]`}>
                    <!-- 角色名称和流式指示器 -->
                    <div class="flex items-center space-x-2 mb-1 mr-2">
                        <div class="text-xs font-medium text-gray-500 dark:text-gray-400"
                        >
                            {roleToName(msg.role)}
                        </div>

                        {#if (msg.role !== 'user' && !msg.done)}
                            <div class="streaming-dots flex space-x-1" aria-label="正在输出中" role="status">
                                <span class="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></span>
                                <span class="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"
                                    style="animation-delay: 0.2s"></span>
                                <span class="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"
                                    style="animation-delay: 0.4s"></span>
                            </div>
                        {/if}
                    </div>

                    <!-- 消息气泡 -->
                    {#if msg.role=="llm"}
                        <div class={`relative px-4 py-3 rounded-2xl shadow-sm transition-all duration-300 hover:shadow
                            ${msg.role === 'user'
                                ? 'bg-blue-500 text-white rounded-br-none'
                                : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-bl-none'
                            }
                        `}>
                            <div class="whitespace-pre-wrap break-words text-sm">
                                {#if msg.content.trimStart().startsWith('```json') && msg.content.includes(`tool_name`)}
                                    {@const block = msg.content.split('```json').filter(j => j.trim() !== '')}
                                    {#each block as part}
                                        {@const tools = parse_tool_json(part.replace(/\n```$/, ''))}
                                        {#if tools != null}
                                            <span>请求调用工具：</span>
                                            {@const tools_un = tools.filter((item, index, self) =>  index === self.findIndex(t => t.tool_name === item.tool_name))}
                                            {#each tools_un as { tool_name }}
                                                <span class=" cursor-pointer text-orange-500" on:click={()=>{showMessageDetail(msg.id)}}>【{toolMap.get(tool_name) || tool_name}】</span>
                                            {/each}
                                            <div class="bg-gray-200 dark:bg-gray-700 p-2 mt-2 {showMessages.has(msg.id)?'':'hidden'}">{msg.content}</div>
                                            <span class="block cursor-pointer {showMessages.has(msg.id)?'':' mt-2'}  text-blue-600 underline" on:click={()=>{showMessageDetail(msg.id)}}>{showMessages.has(msg.id)?"收起":"查看详细"}</span>
                                        {:else}
                                            <span>{ msg.content }</span>
                                        {/if}
                                    {/each}
                                {:else}
                                    <span>{ msg.content }</span>
                                {/if}
                            </div>
                        </div>
                     {:else}
                        <ShowToolControl
                                {app_id}
                                agent_id="{msg.agent_id || agent_id}"
                                type="{msg.type}"
                                content="{msg.content}"
                        />
                    {/if}
                    <!-- 时间戳 -->
                    <div class="text-xs mt-1 select-none text-gray-400 dark:text-gray-500">
                        {formatTime(msg.timestamp)}
                    </div>
                </div>
            </div>
        {/each}
        <div bind:this={messagesEnd} class="h-1"></div>
    </div>
</div>
{#if showModal}
    <ShowControl
        app_id={app_id}
        modalData={modalData}
        on:close={()=>{ showModal = false; }}
    />
{/if}
<style>
    /* 流式输出动画点点 */
    .streaming-dots span {
        animation: blink 1.4s infinite both;
    }

    @keyframes blink {
        0%, 80%, 100% { opacity: 0.3; }
        40% { opacity: 1; }
    }

    /* 自定义滚动条 */
    ::-webkit-scrollbar {
        width: 6px;
    }

    ::-webkit-scrollbar-track {
        background: transparent;
    }

    ::-webkit-scrollbar-thumb {
        background: #cbd5e1;
        border-radius: 3px;
    }

    ::-webkit-scrollbar-thumb:hover {
        background: #94a3b8;
    }

    .dark ::-webkit-scrollbar-thumb {
        background: #334155;
    }

    .dark ::-webkit-scrollbar-thumb:hover {
        background: #475569;
    }

    /* 旋转动画 */
    .spinner {
        animation: spin 1s linear infinite;
    }

    @keyframes spin {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }
</style>