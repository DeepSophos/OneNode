<script>
    import {createEventDispatcher, onMount} from 'svelte';
    import ToolSelectModal from './ToolSelectModal.svelte';
    import DataSourceSelectModal from './DataSourceSelectModal.svelte';
    import Tooltip from '../common/Tooltip.svelte';
    import {getAgentAvailableInputs, getAgentAvailableTools, runAgent, parseStream,delTools,delInput} from "$lib/apis/application";
    import {toast} from "svelte-sonner";
    import RelationChart from './RelationChart.svelte';
    import RunAppPanel from './RunAppPanel.svelte';

    const dispatch = createEventDispatcher();

    export let app_id;
    export let node;
    export let nodes;
    export let toolMap = new Map();
    export let need_update;
    let agent_id = node?.id;
    $: agent_id = node?.id;
    let availableTools = [];
    let availableDataSources = [];

    // 初始化表单数据
    let formData = {
        name: node?.data.name || '',
        task: node?.data.task || '',
        tools: node?.data.tools || [],
        inputData: node?.data.inputData || '',
        outputData: node?.data.outputData || '',
        config: JSON.stringify(node?.data.config || {}, null, 2)
    };

    let configError = false;
    let showToolsModal = false;
    let showDataSourcesModal = false;
    let activeTab = 'settings'; // 激活的选项卡（settings/run）
    let runStatus = 'idle'; // 运行状态（idle/running/success/error）
    let runStartTime = 0;
    let runTime = '0s';
    let inputContent = '';
    let outputContent = '';
    let lastNodeId = node?.id; // 记录上一个节点ID用于对比
    let taskRef;

    $: if (taskRef || formData.task)
        setTimeout(()=>{
            adjustHeight(formData.task);
        },100)

    function adjustHeight(value) {
        if(taskRef)
        {
            // 1. 先把高度设为 auto，让 scrollHeight 能算出真实内容高度
            taskRef.style.height = 'auto';
            // 2. 再把高度设为 scrollHeight（内容高度），加上一点 padding 防止光标被遮
            taskRef.style.height = `${Math.max(100, Math.min(document.body.clientHeight * 0.55, taskRef.scrollHeight + 10))}px`;
        }
    }

    // 节点ID改变时重置面板信息
    $: {
        if (node && node.id !== lastNodeId) {
            lastNodeId = node.id;
            formData = {
                name: node.data.name || '',
                task: node.data.task || '',
                tools: node.data.tools || [],
                inputData: node.data.inputData || '',
                outputData: node.data.outputData || '',
                config: JSON.stringify(node.data.config || {}, null, 2)
            };
            activeTab = 'settings';
            runStatus = 'idle';
            inputContent = '';
            outputContent = '';
        }
    }

    $: {
        if ($need_update) initData();
    }

    function initData() {
        if (availableDataSources.length == 0 || $need_update) {
            need_update.set(false);
            getAgentAvailableInputs({
                app_id: app_id,
                agent_id: node?.data.id || ''
            }, localStorage.getItem("token")).then(res => {
                if (res) {
                    availableDataSources = res.data.map(item => ({
                        id: item,
                        name: $nodes.find(n => n.id === item)?.data.name || item,
                        icon: '📦'
                    }));
                }
            }).catch((err) => {
                toast.error("获取输入数据失败，请重试！")
            });
        }
        if (availableTools.length == 0) {
            getAgentAvailableTools(
                app_id,
                localStorage.getItem("token")
            ).then(res => {
                availableTools = res.map((item) => ({
                    id: item.node_id,
                    icon: item.icon || '🛠',
                    ...item,
                    name: item.description.replace(/\*\*([^]+)\*\*.*/s, '$1'),
                    description:item.description.replace(/\*\*.*?\*\*/g, '').trim(),
                }));
            }).catch((err) => {
                toast.error("获取可用工具失败，请重试！")
            });
        }
    }

    // 更新数据
    function updateData() {
        try {
            configError = false;
            dispatch('update', {
                id: node.id,
                name: formData.name,
                task: formData.task
            });
        } catch (e) {
            configError = true;
        }
    }

    // 更新附属数据
    function updateAttr() {
        try {
            configError = false;
            dispatch('update', {
                id: node.id,
                tools: formData.tools,
                inputData: formData.inputData,
                outputData: formData.outputData,
            });
        } catch (e) {
            configError = true;
        }
    }

    // 移除单个工具
    function removeTool(toolId) {
        delTools({
            app_id: app_id,
            agent_id: agent_id,
            tool_id: toolId
        },localStorage.getItem("token")).then(res => {
            formData.tools = formData.tools.filter(tool => tool.node_id !== toolId);
            updateAttr();
        }).catch(() => {
            toast.error("移除工具失败，请重试！");
        });
    }

    // 移除单个数据源
    function removeDataSource(sourceId) {
        delInput({
            app_id: app_id,
            agent_id: agent_id,
            input_agent_id: sourceId
        },localStorage.getItem("token")).then(res => {
            formData.inputData = formData.inputData.filter(input => input.id !== sourceId);
            updateAttr();
        }).catch(() => {
            toast.error("移除数据源失败，请重试！");
        });
    }
    // 关闭面板
    function handleClose() {
        dispatch('close');
    }

    let showModal = false;
    let modalData = '';
    function openModal(data) {
        modalData = data.detail;
        showModal = true;
    }

    onMount(() => {
        initData();
    })
</script>

<div class="w-[24vw] bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-700 flex flex-col h-[calc(100vh-73px)]">
    <!-- 头部工具栏 -->
    <div class="px-2 py-0 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between bg-gray-50 dark:bg-gray-900">
        <div class="flex">
            <button
                    class="px-4 py-3.5 text-sm font-medium {activeTab === 'settings' ? 'text-gray-900 dark:text-gray-100 border-b-2 -mb-2px border-gray-900 dark:border-gray-100' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'}"
                    on:click={() => activeTab = 'settings'}
            >
                设置
            </button>
            <button
                    class="px-4 py-3.5 text-sm font-medium {activeTab === 'run' ? 'text-gray-900 dark:text-gray-100 border-b-2 -mb-2px border-gray-900 dark:border-gray-100' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'}"
                    on:click={() => activeTab = 'run'}
            >
                运行
            </button>
        </div>
        <button
                class="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors"
                on:click={handleClose}
                title="关闭"
        >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M6 18L18 6M6 6l12 12" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
            </svg>
        </button>
    </div>


    <!-- 表单内容 - 选项卡面板 -->
    <div class="flex-1 overflow-x-hidden overflow-y-auto space-y-6 h-[90vh]">
        {#if activeTab === 'settings'}
            <div class ="p-4 ">
            <!-- 设置选项卡内容 -->
            <div class="space-y-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        节点名称：
                    </label>
                    <input
                            bind:value={formData.name}
                            class="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-all outline-none"
                            on:blur={updateData}
                            placeholder="输入节点名称"
                            type="text"
                    />
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        任务描述：
                    </label>
                    <textarea
                            bind:value={formData.task}
                            bind:this={taskRef}
                            class="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 resize-none transition-all outline-none"
                            on:blur={updateData}
                            placeholder="描述这个节点的具体任务"
                            rows="4"
                    ></textarea>
                </div>
            </div>

            <!-- 工具选择 -->
            <div>
                <div class="flex items-center justify-between mb-2">
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        所需工具：
                    </label>
                    <button
                            class="px-3 py-1.5 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded hover:bg-gray-300 dark:hover:bg-gray-600 text-xs font-medium transition-colors flex items-center space-x-1"
                            on:click={() => {showToolsModal = true;agent_id = node.id;}}
                            type="button"
                    >
                        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path d="M12 6v6m0 0v6m0-6h6m-6 0H6" stroke-linecap="round" stroke-linejoin="round"
                                  stroke-width="2"/>
                        </svg>
                        <span>选择</span>
                    </button>
                </div>

                {#if formData.tools.length > 0}
                    <div class="mt-1 p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                        <div class="text-xs text-gray-700 dark:text-gray-300 font-medium mb-1">已选择的工具：</div>
                        <div class="flex flex-wrap gap-1">
                            {#each formData.tools as tool}
                                <span class="inline-flex items-center px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded">
                                    <span class="mr-1">🛠</span>
                                    {tool.name}
                                    <button
                                            on:click={(e) => {
                                            e.stopPropagation();
                                            removeTool(tool.node_id);
                                        }}
                                            class="ml-1 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                                            aria-label="移除工具"
                                    >
                                        ×
                                    </button>
                                </span>
                            {/each}
                        </div>
                    </div>
                {/if}
            </div>

<!--            &lt;!&ndash; 数据源选择 &ndash;&gt;-->
<!--            <div>-->
<!--                <div class="flex items-center justify-between mb-2">-->
<!--                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">-->
<!--                        数据源：-->
<!--                    </label>-->
<!--                    <button-->
<!--                            class="px-3 py-1.5 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded hover:bg-gray-300 dark:hover:bg-gray-600 text-xs font-medium transition-colors flex items-center space-x-1"-->
<!--                            class:cursor-not-allowed={availableDataSources.length === 0}-->
<!--                            class:opacity-50={availableDataSources.length === 0}-->
<!--                            disabled={availableDataSources.length === 0}-->
<!--                            on:click={() => {showDataSourcesModal = true;agent_id = node.id;}}-->
<!--                            type="button"-->
<!--                    >-->
<!--                        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">-->
<!--                            <path d="M12 6v6m0 0v6m0-6h6m-6 0H6" stroke-linecap="round" stroke-linejoin="round"-->
<!--                                  stroke-width="2"/>-->
<!--                        </svg>-->
<!--                        <span>选择</span>-->
<!--                    </button>-->
<!--                </div>-->

<!--                {#if formData.inputData.length > 0}-->
<!--                    <div class="mt-1 p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg">-->
<!--                        <div class="text-xs text-gray-700 dark:text-gray-300 font-medium mb-1">已选择的数据源：</div>-->
<!--                        <div class="flex flex-wrap gap-1">-->
<!--                            {#each formData.inputData as source}-->
<!--                                <span class="inline-flex items-center px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded">-->
<!--                                    <span class="mr-1">📦</span>-->
<!--                                    {source.name}-->
<!--                                    <button-->
<!--                                            on:click={(e) => {-->
<!--                                            e.stopPropagation();-->
<!--                                            removeDataSource(source.id);-->
<!--                                        }}-->
<!--                                            class="ml-1 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"-->
<!--                                            aria-label="移除数据源"-->
<!--                                    >-->
<!--                                        ×-->
<!--                                    </button>-->
<!--                                </span>-->
<!--                            {/each}-->
<!--                        </div>-->
<!--                    </div>-->
<!--                {/if}-->
<!--            </div>-->
            </div>


        {/if}
        {#key agent_id}
            <div class="{activeTab === 'run'?'':'hidden'} h-full">
                <RunAppPanel
                    {app_id}
                    {agent_id}
                    closeBtn={false}
                    runable="{formData.task!=''}"
                    {toolMap}
                    on:show_control={ (data) => openModal(data) }
                    on:close ={()=>{}}
                />
            </div>
        {/key}
    </div>
</div>

<!-- 工具选择弹窗 -->
<ToolSelectModal
        agent_id={agent_id}
        app_id={app_id}
        availableTools={availableTools}
        isOpen={showToolsModal}
        onClose={() => {
            showToolsModal = false;
        }}
        onUpdate={(data) => {
            showToolsModal = false;
            formData.tools = data;
            updateAttr();
        }}
        selectedTools={formData.tools}
/>

<!-- 数据源选择弹窗 - 修复关闭方法 -->
<DataSourceSelectModal
        agent_id={agent_id}
        app_id={app_id}
        availableDataSources={availableDataSources}
        isOpen={showDataSourcesModal}
        onClose={() => {
            showDataSourcesModal = false
        }}
        onUpdate={(data) => {
            showDataSourcesModal = false
            formData.inputData = data;
            updateAttr();
        }}
        selectedDataSources={formData.inputData}
/>

