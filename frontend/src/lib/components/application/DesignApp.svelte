<script>
    import {onDestroy, onMount} from "svelte";
    import {writable,get} from 'svelte/store';
    import {SvelteFlow,useSvelteFlow, Controls, Background, MiniMap, MarkerType} from '@xyflow/svelte';
    import '@xyflow/svelte/dist/style.css';
    import CustomNode from './CustomNode.svelte';
    import NodePanel from './NodePanel.svelte';
    import {v4 as uuidv4} from 'uuid';
    import {goto} from '$app/navigation';
    import {
        importAppGraph,
        exportAppGraph,
        getAgentGraph,
        addAgent,
        updateAgent,
        deleteAgent,
        addEdge,
        deleteEdge
    } from "$lib/apis/application"
    import {AGENT_API_BASE_URL} from '$lib/constants';
    import {toast} from "svelte-sonner";
    import { page } from '$app/stores';
    import { theme} from '$lib/stores';
    import RunAppPanel from './RunAppPanel.svelte';
    import RunHistoryPanel from './RunHistoryPanel.svelte'
    import FileManagerPanel from './FileManagerPanel.svelte'

    $: app_id = $page.params.id;

    const nodes = writable([]);
    const edges = writable([]);
    const edgeStyle = {
        type: 'default',  // 使用支持箭头的默认边类型
        animated: true,
        style: {stroke: '#60a5fa', strokeWidth: 2},  // 亮蓝色，深色背景好辨认
        markerEnd: {
            type: MarkerType.ArrowClosed,
            color: '#60a5fa',  // 箭头颜色和边一致
            width: 15,
            height: 15
        }
    };

    let toolMap = new Map();
    let selectedNode = null;
    let selectedEdge = null;
    let showNodePanel = false;
    let showRunAppPanel = false;
    let showRunHistoryPanel = false;
    let showFilePanel = false;
    let colorMode = '';
    let need_update_panel = writable(false);
    let node_max_x = 0;
    let node_max_y = 0;
    const nodeTypes = {
        customNode: CustomNode
    };
    const fitViewOptions = {
        maxZoom: 1,
    };
    function initGraph() {
        getAgentGraph(app_id,localStorage.getItem("token")).then(res=>{
            const loadedNodes = res.nodes.map(node=>({
                id:node.node_id,
                type: node.type || '',
                position: node.position || {x:0,y:0},
                data: {
                    name: node.name || '缺省智能代理',
                    task: node.task || '',
                    tools: node.tools.map(tool => {
                        let tool_name = tool.description.replace(/\*\*([^]+)\*\*.*/s, '$1');
                        toolMap.set(tool.name, tool_name);
                        return {
                            node_id: tool.node_id,
                            name: tool_name
                        }
                    }),
                    inputData: (node.inputs || []).map(inputId => {
                        const inputNode = res.nodes.find(n => n.node_id === inputId);
                        return {
                            id: inputId,
                            name: inputNode ? (inputNode.name || '未知') : '未找到'
                        };
                    })
                }
            }));
            const loadedEdges = res.edges.map(([source, target]) => ({
                id: uuidv4(),
                ...edgeStyle,
                source,
                target
            }));
            if(loadedNodes.length>0)
            {
                node_max_x=Math.max(...loadedNodes.map(n=>n.position.x));
                node_max_y=Math.max(...loadedNodes.map(n=>n.position.y));
            }
            nodes.set(loadedNodes);
            edges.set(loadedEdges);
            toolMap = toolMap
        }).catch((err)=>{
            toast.error("加载失败")
        });
    }

    function addNode() {
        const newNode = {
            type: 'customNode',
            position: {x: node_max_x + 150, y: node_max_y-50},
            name: `智能代理 ${$nodes.length + 1}`,
            task: ''
        };

        addAgent({
          app_id:app_id,
          config: newNode
        },localStorage.getItem("token")).then(res=>{
            need_update_panel.set(true);
            newNode.id= res.node_id;
            newNode.data={
                name: res.name || '缺省智能代理',
                tools: res.tools || [],
                inputData: res.inputData || [],
                outputData: res.outputData || []
            };
            nodes.update(n => [...n, newNode]);
        }).catch((err)=>{
            toast.error("节点添加失败")
        });
    }

    function deleteSelectedElement() {
        onDelete({
            nodes: selectedNode ? [selectedNode] : [],
            edges: selectedEdge ? [selectedEdge] : []
        })
    }

    const onDelete = (e) => {
        let errorOccurred = false;
        e.nodes.forEach((del_node) => {
            deleteAgent({
                app_id: app_id,
                agent_id: del_node.id
            }, localStorage.getItem("token")).then(res => {
                need_update_panel.set(true);
                nodes.update(n => n.filter(node => node.id !== del_node.id));
                edges.update(e => e.filter(edge => edge.source !== del_node.id && edge.target !== del_node.id));
                if (selectedNode?.id === del_node.id) {
                    selectedNode = null;
                    showNodePanel = false;
                }
            }).catch((err) => {
                errorOccurred = true;
            });
        })
        e.edges.forEach((del_edge) => {
            deleteEdge({
                app_id: app_id,
                src_id: del_edge.source,
	            dest_id: del_edge.target
            }, localStorage.getItem("token")).then(res => {
                edges.update(e => e.filter(edge => edge.source !== del_edge.id && edge.target !== del_edge.id));
                if (selectedEdge?.id === del_edge.id) {
                    selectedEdge = null;
                    showNodePanel = false;
                }
            }).catch((err) => {
                errorOccurred = true;
            });
        })
        if(errorOccurred)
        {
            toast.error("发生错误，请刷新页面重试！")
        }
    };


    function onNodeClick(event) {
        const {node} = event.detail;
        node_max_x = node.position.x;
        node_max_y = node.position.y;
        selectedNode = node;
        selectedEdge = null;
        showNodePanel = true;
    }

    function onEdgeClick(event) {
        const {edge} = event.detail;
        selectedEdge = edge;
        selectedNode = null;
        showNodePanel = false;
    }

    function onPaneClick(e) {
        // node_max_x = e.detail.event.x;
        // node_max_y = e.detail.event.y;
        selectedNode = null;
        selectedEdge = null;
        showNodePanel = false;
    }

    function onConnect(event) {
        addEdge({
            app_id: app_id,
            src_id: event.source,
            dest_id: event.target
        }, localStorage.getItem("token")).then(res => {
            if (res?.status == "successfully") {
                let newEdge = {id: uuidv4(), ...edgeStyle, ...event};
                edges.update(prevEdges => {
                    const filteredEdges = prevEdges.filter(edge => !edge.id.includes('xy-edge'));
                    return [...filteredEdges, newEdge];
                });
            }
        }).catch((err) => {
            toast.error("发生错误,请刷新页面重试！")
        });
    }
    function onNodeDragStop(event){
        //console.log(event.detail.nodes[0].position)
        let errorOccurred = false;
        event.detail.nodes.forEach((node) => {
            updateAgent({
                app_id: app_id,
                agent_id: node.id,
                config:{
                    position: node.position
                }
            }, localStorage.getItem("token")).then(res => {
                node_max_x = node.position.x;
                node_max_y = node.position.y;
            }).catch((err) => {
                errorOccurred = true;
            });
        })
        if (errorOccurred) {
            toast.error("发生错误，请刷新页面重试！")
        }
    }
    function updateNodeData(nodeId, newData) {
        if (newData.name) {
            updateAgent({
                app_id: app_id,
                agent_id: nodeId,
                config: {
                    ...newData
                }
            }, localStorage.getItem("token")).then(res => {
                nodes.update(n => n.map(node =>
                    node.id === nodeId
                        ? {...node, data: {...node.data, ...newData}}
                        : node
                ));
                if (selectedNode?.id === nodeId) {
                    selectedNode = {...selectedNode, data: {...selectedNode.data, ...newData}};
                }
            }).catch((err) => {
                toast.error("更新失败，请重试！")
            });
        }
        else {
            nodes.update(n => n.map(node =>
                node.id === nodeId
                    ? {...node, data: {...node.data, ...newData}}
                    : node
            ));
            if (selectedNode?.id === nodeId) {
                selectedNode = {...selectedNode, data: {...selectedNode.data, ...newData}};
            }
        }

    }

    let fileInput;

    function selectAppFile() {
        if (fileInput) {
            fileInput.click();
        }
    }

    function importApp(event) {
        const file = event.target.files[0];
        if (file) {
            importAppGraph(app_id, file, localStorage.getItem("token")).then(res=>{
                fileInput.value = '';
                toast.success("导入成功! ");
                initGraph();
            }).catch((err)=>{
                fileInput.value = '';
                toast.error("导入失败，请重试！")
            });
        }
    }
    function exportApp(){
        exportAppGraph(app_id,localStorage.getItem("token")).then(res=>{
            const blob = new Blob([res], { type: 'application/x-yaml' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = AGENT_API_BASE_URL + '/' + res.file_path;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);

        }).catch((err)=>{
            toast.error("导出失败，请重试！")
        });
    }


    function clearCanvas() {
        if (confirm('确定要清空所有节点和连接线吗？')) {
            nodes.set([]);
            edges.set([]);
            selectedNode = null;
            selectedEdge = null;
            showNodePanel = false;
        }
    }

    $:if ($theme) colorMode = localStorage.theme && !localStorage.theme.includes('dark') ? 'light' : 'dark';
    onMount(()=>{
        initGraph();
    })
    onDestroy(() => {});

</script>

<div class="w-full h-screen flex flex-col">
    <div class="border-b border-gray-200 dark:border-gray-700 p-4">
        <div class="flex items-center justify-between text-xs">
            <div class="flex items-center space-x-4">
                <button
                        class="px-3 py-2 space-x-1 bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg transition-colors flex items-center"
                        on:click={() => goto('/application')}
                >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path d="M10 19l-7-7m0 0l7-7m-7 7h18" stroke-linecap="round" stroke-linejoin="round"
                              stroke-width="2"/>
                    </svg>
                    <span class="font-medium">返回</span>
                </button>
            </div>
            <div class="flex items-center space-x-4">
                <button
                        class="px-3 py-2 space-x-1 bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg transition-colors flex items-center "
                        on:click={() => {showFilePanel = true}}
                >
                    <svg class="size-4" fill="none" stroke="currentColor" stroke-width="1.5"
                         viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184" stroke-linecap="round"
                              stroke-linejoin="round"/>
                    </svg>
                    <span class="font-medium">文件管理</span>
                </button>
                <button
                        class="px-3 py-2 space-x-1 bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg transition-colors flex items-center "
                        on:click={selectAppFile}
                >
                    <svg class="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path d="M4 12h16m0 0l-6-6m6 6l-6 6" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                    </svg>
                    <input
                      bind:this={fileInput}
                      type="file"
                      accept=".yml"
                      on:change={importApp}
                      style="display: none;"
                     />
                    <span class="font-medium">导入</span>
                </button>
                <button
                        class="px-3 py-2 space-x-1 bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg transition-colors flex items-center "
                        on:click={exportApp}
                >
                    <svg class="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path d="M20 12H4m0 0l6-6m-6 6l6 6" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                    </svg>
                    <span class="font-medium">导出</span>
                </button>
                <button
                        class="px-3 py-2 space-x-1 bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg transition-colors flex items-center "
                        on:click={addNode}
                >
                    <svg class="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path d="M12 6v6m0 0v6m0-6h6m-6 0H6" stroke-linecap="round" stroke-linejoin="round"
                              stroke-width="2"/>
                    </svg>
                    <span class="font-medium">节点</span>
                </button>
                <button
                        class="px-3 py-2 space-x-1 bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg transition-colors flex items-center"
                        on:click={deleteSelectedElement}
                >
                    <svg class="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              stroke-linecap="round" stroke-linejoin="round"
                              stroke-width="2"/>
                    </svg>
                    <span class="font-medium">删除</span>
                </button>

                <button
                        class="px-3 py-2 space-x-1 bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg transition-colors flex items-center "
                        on:click={() => showRunAppPanel = true}
                >
                    <svg class="size-4" fill="none" stroke="currentColor" stroke-width="1.5"
                         viewBox="0 0 24 24"
                         xmlns="http://www.w3.org/2000/svg">
                        <path d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" stroke-linecap="round"
                              stroke-linejoin="round"/>
                    </svg>
                    <span class="font-medium">运行</span>
                </button>
                <button
                        class="px-3 py-2 space-x-1 bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg transition-colors flex items-center "
                        on:click={()=>{showRunHistoryPanel=!showRunHistoryPanel}}
                >
                    <svg class="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                        <path d="M12 7v5l3 3" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                    </svg>
                    <span class="font-medium ml-0.5">运行历史</span>
                </button>
            </div>
        </div>
    </div>

    <div class="flex-1 flex h-[90vh]">
        <div class="flex-1 relative">
            <SvelteFlow
                colorMode={colorMode}
                deleteKey={['Backspace', 'Delete']}
                edgeUpdaterRadius={10}
                {edges}
                initialViewport={{x: 0, y: 0, zoom: 1}}
                {nodeTypes}
                {nodes}
                fitView
                {fitViewOptions}
                minZoom="1"
                snapToGrid={true}
                snapGrid={[15, 15]}
                onconnect={onConnect}
                ondelete={onDelete}
                on:paneclick={onPaneClick}
                on:nodeclick={onNodeClick}
                on:nodedragstop="{onNodeDragStop}"
                on:edgeclick={onEdgeClick}
            >
                <Background  gap={16}/>
                <Controls/>
                <MiniMap
                        nodeColor="#3b82f6"
                        nodeStrokeWidth={3}
                        position="bottom-right"
                />
            </SvelteFlow>
        </div>


        <div class="{showNodePanel && selectedNode?'':'hidden'}">
            <NodePanel
                app_id={app_id}
                node={selectedNode}
                nodes={nodes}
                need_update={need_update_panel}
                {toolMap}
                on:update={(event) => updateNodeData(selectedNode.id, event.detail)}
                on:close={() => showNodePanel = false}
            />
        </div>
        {#if showRunAppPanel}
            <div class="w-[24vw]">
                <RunAppPanel
                        {app_id}
                        closeBtn={true}
                        agent_id=""
                        runable="{$nodes.every(n => n.data.task !== '')}"
                        {toolMap}
                        on:close={() => showRunAppPanel = false}
                />
            </div>
        {/if}
        <div class="{showRunHistoryPanel?'':'hidden'}">
            <RunHistoryPanel
                    {app_id}
                    on:close={() => showRunHistoryPanel = false}
            />
        </div>
        {#if showFilePanel}
            <FileManagerPanel
                    app_id={app_id}
                    on:close={() => showFilePanel = false}
            />
        {/if}
    </div>
</div>