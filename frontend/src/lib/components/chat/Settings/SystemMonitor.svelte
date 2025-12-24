<script lang="ts">
    import {createEventDispatcher, onMount, getContext, onDestroy} from 'svelte';
    import {fade} from 'svelte/transition';
    import {queryGPUStatus, setServiceMode} from '$lib/apis/rag';

    const i18n = getContext('i18n');
    const dispatch = createEventDispatcher();

    let gpuGroups = [];
    let importMode = 'disabled';
    let queryMode = 'disabled';
    let queryTimer: number | null = null; // 用于存储定时器ID
    let isDestroyed = false;

    // 清理定时器
    const clearQueryTimer = () => {
        if (queryTimer) {
            clearInterval(queryTimer);
            queryTimer = null;
        }
    };

    async function getGPUStatus() {
        clearQueryTimer();
        if (isDestroyed) return;
        gpuGroups = await queryGPUStatus(localStorage.token);
        const isLoading = gpuGroups.some(group => group.status === 'loading');
        if (isLoading) {
            importMode = 'disabled';
            queryMode = 'disabled';
            queryTimer = window.setInterval(getGPUStatus, 1000);
        } else {
            const data = await setServiceMode(localStorage.token);
            importMode = data.import_mode;
            queryMode = data.query_mode;
        }
    }

    // 获取状态图标
    function getStatusIcon(status: string) {
        switch (status) {
            case 'running':
                return {
                    icon: `<path stroke-linecap="round" stroke-linejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" fill="currentColor"/>
                           <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4" stroke="white" fill="none"/>`,
                    color: 'text-green-500'
                };
            case 'stopped':
                return {
                    icon: `<path stroke-linecap="round" stroke-linejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" fill="currentColor"/>
                           <path stroke-linecap="round" stroke-linejoin="round" d="M9 9h6v6H9z" fill="white"/>`,
                    color: 'text-gray-400'
                };
            case 'loading':
                return {
                    icon: `<path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"/>`,
                    color: 'text-blue-500 animate-spin'
                };
            case 'error':
                return {
                    icon: `<circle cx="12" cy="12" r="9" fill="currentColor"/>
                       <rect x="8" y="8" width="8" height="8" fill="white" rx="1"/>`,
                    color: 'text-red-500'
                };
        }
    }


    function handleImportClick() {
        importMode = 'disabled';
        setServiceMode(localStorage.token, 'import_mode').then((data) => {
            importMode = data.import_mode;
            queryMode = data.query_mode;
            getGPUStatus(); // 触发一次查询
        });
    }

    function handleChatClick() {
        queryMode = 'disabled';
        setServiceMode(localStorage.token, 'query_mode').then((data) => {
            importMode = data.import_mode;
            queryMode = data.query_mode;
            getGPUStatus(); // 触发一次查询
        });
    }

    onMount(async () => {
        await getGPUStatus();
    });

    onDestroy(() => {
        isDestroyed = true;
        clearQueryTimer();
    });
</script>

<div class="flex flex-col h-full justify-between text-sm">
    <div class="pr-1.5 overflow-y-auto h-[50vh] space-y-3">
        <div>
            <div class="mb-3 text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                <svg class="size-5" fill="none" stroke="currentColor" stroke-width="1.5"
                     viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 0 0 2.25-2.25V6.75a2.25 2.25 0 0 0-2.25-2.25H6.75A2.25 2.25 0 0 0 4.5 6.75v10.5a2.25 2.25 0 0 0 2.25 2.25Zm.75-12h9v9h-9v-9Z"
                          stroke-linecap="round"
                          stroke-linejoin="round"/>
                </svg>
                GPU 管理控制台
            </div>
            <div class="mb-4 flex justify-end gap-2">
                <button
                        class="px-4 py-2 rounded-md transition-all duration-300 flex items-center gap-2 text-sm font-medium
                   bg-blue-600 text-white hover:bg-blue-700
                   disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={importMode === 'disabled'}
                        on:click={handleImportClick}
                >
                    <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                         xmlns="http://www.w3.org/2000/svg">
                        <path d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                              stroke-linecap="round" stroke-linejoin="round"
                              stroke-width="2"/>
                    </svg>
                    文档导入模式
                </button>

                <button
                        class="px-4 py-2 rounded-md transition-all duration-300 flex items-center gap-2 text-sm font-medium
                   bg-green-600 text-white hover:bg-green-700
                   disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={queryMode === 'disabled'}
                        on:click={handleChatClick}
                >
                    <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                         xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"
                              stroke-linecap="round" stroke-linejoin="round"
                              stroke-width="2"/>
                    </svg>
                    问答模式
                </button>
            </div>
            <div class="space-y-3">
                {#each gpuGroups as group (group.id)}
                    <div class="bg-white dark:bg-gray-800 rounded-lg p-3 border border-gray-200 dark:border-gray-700 shadow-sm">
                        <!-- 组标题 -->
                        <div class="flex items-center justify-between mb-2">
                            <div class="flex items-center gap-2">
                                <h3 class="text-sm font-medium text-gray-900 dark:text-white">{group.name}</h3>
                            </div>
                        </div>

                        <div class="grid grid-cols-{group.gpus.length} gap-1.5">
                            {#each group.gpus as gpu (gpu.id)}
                                <div
                                        class="flex items-center gap-2 p-2 rounded-md border transition-all duration-300
                                           {group.status === 'running'
                                               ? 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20'
                                               : group.status === 'loading'
                                               ? 'border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-900/20'
                                               : 'border-gray-200 bg-gray-50 dark:border-gray-600 dark:bg-gray-700/50'
                                           }"
                                        in:fade={{ duration: 300, delay: 100 }}
                                >
                                    <div class="flex-shrink-0">
                                        <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke-width="1.5"
                                                stroke="currentColor"
                                                class="size-5 {getStatusIcon(group.status).color}"
                                        >
                                            {@html getStatusIcon(group.status).icon}
                                        </svg>
                                    </div>
                                    <div class="flex-1 min-w-0">
                                        <div class="text-xs font-medium text-gray-900 dark:text-white truncate">
                                            {gpu.name}
                                        </div>
                                        <div class="text-xs text-gray-500 dark:text-gray-400 leading-tight">
                                            {group.status === 'running' ? '运行中' : group.status === 'loading' ? '切换中' : '已停止'}
                                        </div>
                                    </div>
                                </div>
                            {/each}
                        </div>
                    </div>
                {/each}
            </div>
        </div>
    </div>
</div>