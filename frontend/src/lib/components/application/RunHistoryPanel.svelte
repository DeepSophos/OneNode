<script>
    import {createEventDispatcher, onDestroy, onMount} from 'svelte';
    import Tooltip from "$lib/components/common/Tooltip.svelte";
    import {
        get_appctx_list, select_appctx, delete_appctx
    } from "$lib/apis/application"
    import {toast} from "svelte-sonner";
    import ConfirmDialog from "$lib/components/ConfirmDialog.svelte";

    const dispatch = createEventDispatcher();

    export let app_id;
    export let app_ctx_id = '';
    export let runHistory = [];
    let refreshing = false;
    let clearing = false;
    let showClearConfirm=false;
    function handleClose() {
        dispatch('close');
    }

    async function handleRefresh(){
        if (refreshing) return;
        try{
            refreshing = true;
            await initHistory();
            toast.success("已刷新运行历史");
        }catch(e){
            // 错误在 initHistory 内部已 toast
        }finally{
            refreshing = false;
        }
    }

    async function handleClear(){
        if (clearing || runHistory.length === 0) return;
        try{
            clearing = true;
            const token = localStorage.getItem("token");
            // 批量删除
            await Promise.all(runHistory.map(ctx=>{
                return delete_appctx({
                    app_id,
                    app_ctx_id: ctx.node_id
                }, token).catch(()=>null);
            }));
            // 清空本地并重置当前上下文
            runHistory = [];
            app_ctx_id = '';
            toast.success("已清空运行历史");
        }catch(e){
            toast.error("清空运行历史失败");
        }finally{
            clearing = false;
        }
    }

    async function handleSelect(ctx_id){
        try{
            await select_appctx({
                app_id,
                app_ctx_id: ctx_id
            }, localStorage.getItem("token"));
            toast.success("已切换运行上下文");
            app_ctx_id = ctx_id;
        }catch (e){
            toast.error("切换运行上下文失败");
        }
    }

    async function handleDelete(ctx_id){
        try{
            await delete_appctx({
                app_id,
                app_ctx_id: ctx_id
            }, localStorage.getItem("token"));
            runHistory = runHistory.filter(v=>v.node_id !== ctx_id);
        }catch (e){
            toast.error("删除运行记录失败");
        }
    }

    function initHistory(){
        get_appctx_list(
            app_id,
            localStorage.getItem("token")
        ).then(res=>{
            app_ctx_id = res.app_ctx_id;
            runHistory = res.app_ctx_list;
            runHistory.reverse();
       }).catch((err)=>{
          toast.error("获取运行历史失败!")
       });
    }
    onMount(()=>{
        initHistory();
    })
    onDestroy(() => {});
</script>


<div class="w-[24vw] bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-700 flex flex-col h-[calc(100vh-73px)] shadow-sm">
    <div class="p-2 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between bg-gray-50 dark:bg-gray-900">
        <div class="flex items-center gap-2">
            <Tooltip content="刷新">
                <button
                        class="p-2 rounded text-gray-700 dark:text-gray-300 transition-colors disabled:opacity-50"
                        on:click={handleRefresh}
                        disabled={refreshing}
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" >
                        <path d="M2 10C2 10 4.00498 7.26822 5.63384 5.63824C7.26269 4.00827 9.5136 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.89691 21 4.43511 18.2543 3.35177 14.5M2 10V4M2 10H8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                    </svg>
                </button>
            </Tooltip>
            <Tooltip content="清空运行历史">
                <button
                        class="p-2 rounded text-red-600 dark:text-red-400 transition-colors disabled:opacity-50"
                        on:click={()=>{showClearConfirm=true;}}
                        disabled={clearing || runHistory.length === 0}
                >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M4 7h16M9 7V5a2 2 0 012-2h2a2 2 0 012 2v2"/>
                    </svg>
                </button>
            </Tooltip>
        </div>
        <button
                class="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors"
                on:click={handleClose}
        >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M6 18L18 6M6 6l12 12" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
            </svg>
        </button>
    </div>

    <!-- 版本时间轴列表 -->
    <div class="flex-1 overflow-y-auto">

        {#if runHistory.length === 0}
            <div class="h-full w-full flex  justify-center">
                <div class="text-center mt-10 text-gray-400 dark:text-gray-500">
                    <div class="text-sm">暂无运行历史</div>
                </div>
            </div>
        {:else}
        {#each runHistory as ctx}
            <div class="relative px-3 last:pb-0">
                <div class="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700  p-2 transition-all duration-200">

                    <!-- 标题 + 操作按钮 -->
                    <div class="flex items-center justify-between mb-2">
                        <div class="flex items-center gap-2">
                            <span class={`inline-block w-2.5 h-2.5 -ml-3 rounded-full ${ctx.node_id === app_ctx_id ? 'bg-green-500' : ''}`}></span>
                            <div class="text-sm font-medium text-gray-700 dark:text-gray-300">
                                在 {(new Date(ctx.timestamp * 1000)).toLocaleTimeString()} 的运行
                            </div>
                        </div>
                        <div class="flex items-center gap-1">
                            {#if ctx.node_id !== app_ctx_id}
                                <Tooltip content="选择此运行上下文">
                                    <button
                                        class="p-1.5 rounded hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 transition-colors"
                                        on:click={()=>handleSelect(ctx.node_id)}
                                        aria-label="选择"
                                    >
                                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                                        </svg>
                                    </button>
                                </Tooltip>
                            {/if}
                            <Tooltip content="删除此运行历史记录">
                                <button
                                    class="p-1.5 rounded hover:text-red-600 dark:hover:text-red-600 transition-colors"
                                    on:click={()=>handleDelete(ctx.node_id)}
                                    aria-label="删除"
                                >
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M9 7h6m-7 0V5a2 2 0 012-2h2a2 2 0 012 2v2"/>
                                    </svg>
                                </button>
                            </Tooltip>
                        </div>
                    </div>

                    <!-- 版本时间 -->
                    <div class="text-xs ml-1 text-gray-500 dark:text-gray-500">
                        {(new Date(ctx.timestamp * 1000)).toLocaleDateString()}
                    </div>
                </div>
            </div>
        {/each}
        {/if}

    </div>

    <ConfirmDialog
        bind:show={showClearConfirm}
        icon="danger"
        message="确定清空运行历史吗？"
        on:cancel={() => {showClearConfirm = false;}}
        on:confirm={handleClear}
        size="sm"
        title=""
/>
</div>

<style>
    /* 滚动条美化 */
    .overflow-y-auto::-webkit-scrollbar {
        width: 6px;
    }

    .overflow-y-auto::-webkit-scrollbar-track {
        background: transparent;
    }

    .overflow-y-auto::-webkit-scrollbar-thumb {
        background-color: rgba(156, 163, 175, 0.4);
        border-radius: 3px;
    }

    .overflow-y-auto::-webkit-scrollbar-thumb:hover {
        background-color: rgba(156, 163, 175, 0.6);
    }
</style>