<script>
    import GraphChart from "./ShowToolControl/GraphChart.svelte";
    import TreeChart from "./ShowToolControl/TreeChart.svelte";
    import Markdown from '$lib/components/chat/Messages/Markdown.svelte';
    import {AGENT_API_BASE_URL} from '$lib/constants';
    import {get_data_agent} from "$lib/apis/application";
    import {convertToMultiRootTree} from "$lib/utils/index";
    import {onMount} from "svelte";

    export let app_id = "";
    export let agent_id = "";
    export let type = "";
    export let content = null;

    let showGraph = false;
    let showTree = false;

    //根据类别获取到的数据
    let get_data = null;

    async function openModal(content_sec = undefined) {
        const param = {app_id: app_id, agent_id: agent_id, type: type, content: (content_sec || content)}
        //console.log(param)
        await get_data_agent(param, localStorage.token)
            .then(res => {
                //console.log('get_data_agent', res)
                switch (type) {
                    case "graph":
                        get_data = {nodes: res.data.nodes, links: res.data.edges};
                        if (res.data.nodes && get_data.nodes.length > 0) {
                            get_data.nodes[0] = {...get_data.nodes[0], itemStyle: {color: '#e5684f'}};
                        }
                        break;
                    case "tree":
                        get_data = convertToMultiRootTree(res.data.nodes, res.data.edges);
                        break;
                }
                showGraph = type === "graph";
                showTree = type === "tree";
            })
    }
</script>

<div class="my-2 p-4 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-2xl rounded-bl-none max-w-xl text-sm">
    {#if type === "markdown"}
        <Markdown
                id='11'
                content={content}
        />

    {:else if type === "graph"}
        {@const content_sec = [...new Set(content.split('\n\n'))]}
        输出数据：
        {#each content_sec as sec}
           <br><span class="text-orange-500 cursor-pointer" on:click={() => openModal(sec)}>【{sec}】</span>
        {/each}
        {#if content.indexOf('\n\n') === -1}
            <button
                class="block mt-2 text-blue-600 underline hover:text-blue-800 text-sm"
                on:click={() => openModal()}>
            查看图表
            </button>
        {/if}
    {:else if type === "tree"}
        {@const content_sec = [...new Set(content.split('\n\n'))]}
        输出数据：
        {#each content_sec as sec}
           <br><span class="text-orange-500 cursor-pointer" on:click={() => openModal(sec)}>【{sec}】</span>
        {/each}
        {#if content.indexOf('\n\n') === -1}
            <button
                    class="block mt-2 text-blue-600 underline hover:text-blue-800 text-sm"
                    on:click={() => openModal()}>
                查看树状图
            </button>
        {/if}
    {:else if type === "filelist"}
        {#if Array.isArray(content) && content.length > 0}
            <ul
                    class="divide-y divide-gray-300 border border-gray-300 rounded-md"
            >
                {#each content as file}
                    <li
                            class="p-2 flex justify-between items-center hover:bg-gray-200 cursor-pointer"
                            on:click={() => openModal()}
                    >
                        <span class="truncate max-w-xs">{file.name}</span>
                        <span class="text-gray-500 text-sm">{(file.size / 1024).toFixed(1)} KB</span>
                    </li>
                {/each}
            </ul>
        {:else}
            <div class="text-gray-500 italic">无可用文件</div>
        {/if}

    {:else if type === "docx"}
        <button
                class="flex items-center space-x-2 text-blue-600 hover:text-blue-800"
                on:click={() => window.open(`${AGENT_API_BASE_URL}/${content}`)}
        >
            <svg
                    class="w-6 h-6 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
            >
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/>
            </svg>
            <span>查看 DOCX 文档</span>
        </button>

    {:else if type === "pptx"}
        <button
                class="flex items-center space-x-2 text-red-600 hover:text-red-800"
                on:click={() => openModal()}
        >

            <span>查看 PPTX 演示文稿</span>
        </button>

    {:else}
        <div>未知类型:{content}</div>
    {/if}
</div>
{#if showGraph}
    <GraphChart
            data={get_data}
            on:close={() => showGraph = false}
            show={showGraph}/>
{/if}
{#if showTree}
    <TreeChart
            data={get_data}
            on:close={() => showTree = false}
            show={showTree}/>
{/if}
