<script>
    import {createEventDispatcher} from 'svelte';
    import Tooltip from "$lib/components/common/Tooltip.svelte";

    const dispatch = createEventDispatcher();

    /** 版本状态类型定义（仅保留当前和历史版本） */
    const VERSION_STATUS = {
        ACTIVE: 'active',    // 当前版本
        HISTORY: 'history'   // 历史版本
    };

    /** 示例版本数据（仅保留必要属性） */
    export let versionHistory = [
        {
            id: 'v1.2.0',
            title: '功能优化与Bug修复',
            description: '1. 优化应用加载速度，提升响应效率\n2. 修复数据导出时的格式错误\n3. 新增批量操作功能\n4. 优化深色模式适配',
            createTime: '2024-05-20 14:30:22',
            status: VERSION_STATUS.ACTIVE
        },
        {
            id: 'v1.1.0',
            title: '核心功能迭代',
            description: '1. 新增数据可视化图表\n2. 优化用户权限管理逻辑\n3. 修复部分浏览器兼容性问题',
            createTime: '2024-04-15 09:18:55',
            status: VERSION_STATUS.HISTORY
        },
        {
            id: 'v1.0.0',
            title: '初始版本发布',
            description: '1. 完成核心功能开发\n2. 支持基础数据管理\n3. 实现用户登录与权限控制',
            createTime: '2024-03-01 16:45:10',
            status: VERSION_STATUS.HISTORY
        }
    ];

    /** 关闭面板 */
    function handleClose() {
        dispatch('close');
    }
</script>


<div class="w-[24vw] bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 flex flex-col h-[calc(100vh-73px)] shadow-sm">
    <div class="p-2 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between bg-gray-50 dark:bg-gray-850">
        <div class="text-sm font-medium text-gray-700 dark:text-gray-300">应用版本变更历史</div>
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
    <div class="flex-1 overflow-y-auto p-4">
        <div class="relative">
            <!-- 时间轴竖线 -->
            <div class="absolute left-3 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700"></div>
            {#each versionHistory as version}
                <div class="relative pl-10 pb-8 last:pb-0">
                    <!-- 时间轴圆点 -->
                    <div class="absolute left-0 top-0 w-6 h-6 rounded-full flex items-center justify-center border-2 border-white dark:border-gray-800 shadow-sm">
                        {#if version.status === VERSION_STATUS.ACTIVE}
                            <!-- 当前版本：绿色对勾 -->
                            <div class="w-full h-full rounded-full bg-green-500 flex items-center justify-center">
                                <svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3"
                                          d="M5 13l4 4L19 7"/>
                                </svg>
                            </div>
                        {:else}
                            <!-- 历史版本：灰色时钟 -->
                            <div class="w-full h-full rounded-full bg-gray-400 flex items-center justify-center">
                                <svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3"
                                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                </svg>
                            </div>
                        {/if}
                    </div>

                    <!-- 版本内容卡片 -->
                    <div class="bg-white dark:bg-gray-850 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm p-4 hover:shadow-md transition-all duration-200">
                        <!-- 版本号 + 状态标签 -->
                        <div class="flex justify-between items-start mb-2">
                            <h3 class="text-base font-medium text-gray-800 dark:text-gray-200">{version.id}</h3>
                            {#if version.status === VERSION_STATUS.ACTIVE}
                                <span class="px-2 py-0.5 rounded-full text-xs font-medium text-green-600 dark:text-green-500 bg-green-50 dark:bg-green-900/20">
                                    当前版本
                                </span>
                            {:else}
                                <span class="px-2 py-0.5 rounded-full text-xs font-medium text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800">
                                    历史版本
                                </span>
                            {/if}
                        </div>

                        <!-- 版本标题 -->
                        <div class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{version.title}</div>

                        <!-- 版本描述 -->
                        <div class="text-xs text-gray-600 dark:text-gray-400 mb-3 whitespace-pre-line">
                            {version.description}
                        </div>

                        <!-- 版本时间 -->
                        <div class="text-xs text-gray-500 dark:text-gray-500">
                            {version.createTime}
                        </div>
                    </div>
                </div>
            {/each}
        </div>
    </div>
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