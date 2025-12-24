<script lang="ts">
    import RunAppPanel from "$lib/components/application/RunAppPanel.svelte";
    import {page} from "$app/stores";
    import {
        getAgentGraph
    } from "$lib/apis/application"
    import {createEventDispatcher} from "svelte";
    import {goto} from "$app/navigation";


    const dispatch = createEventDispatcher();
    let toolMap = new Map();

    function handleClose() {
        goto('/application')
    }

    let appId = '';
    let appName = '';
    let runable = false;
    $: {
        appId = $page.url.searchParams.get('id') || '';
        appName = $page.url.searchParams.get('name') ? decodeURIComponent($page.url.searchParams.get('name')) : '';
        if (appId !== '') {
            getAgentGraph(appId, localStorage.token).then(res => {
                res.nodes.forEach(node => {
                    if (!Array.isArray(node.tools)) return;
                    node.tools.forEach(tool => {
                        let tool_name = tool.description.replace(/\*\*([^]+)\*\*.*/s, '$1');
                        toolMap.set(tool.name, tool_name);
                    });
                });
                runable = res.nodes.every(n => n.task !== '')
            })
        }
    }

</script>
<div class="w-full h-screen flex flex-col">
    <div class="border-b border-gray-200 dark:border-gray-700 p-4">
        <div class="relative flex items-center justify-center text-xs">
            <div class="absolute left-0">
                <button
                        class="px-3 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg transition-colors flex items-center gap-1"
                        on:click={handleClose}
                >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path d="M10 19l-7-7m0 0l7-7m-7 7h18" stroke-linecap="round" stroke-linejoin="round"
                              stroke-width="2"/>
                    </svg>
                    <span class="font-medium">返回</span>
                </button>
            </div>
            <h1 class="text-base font-semibold text-gray-800 dark:text-gray-200">{appName}</h1>
        </div>
    </div>
    <div class="flex justify-center w-full items-center bg-gray-100 dark:bg-gray-800 p-4 flex-1 overflow-hidden">
        <div class="w-[50vw] h-full bg-white shadow-xl">
            {#if appId != ''}
                <RunAppPanel
                        app_id={appId}
                        closeBtn={false}
                        on:close={handleClose}
                        runable={runable}
                        {toolMap}
                />
            {/if}
        </div>

    </div>
</div>
