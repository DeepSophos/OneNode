<script lang="ts">
    import {createEventDispatcher, getContext} from 'svelte';

    import Modal from '../common/Modal.svelte';

    const i18n = getContext('i18n');
    const dispatch = createEventDispatcher();

    export let show = false;
    export let pricingData = [];
    export let fieldConfig = {};
    export let currentPlan = {};

    // 动态生成功能列表
    function getFeatureItems(plan) {
        return Object.entries(fieldConfig).map(([key, config]) => {
            return {
                key,
                label: config.label,
                value: plan[key],
                highlight: config.highlight || false
            };
        });
    }

    // 分离高亮功能和普通功能
    function getHighlightFeatures(plan) {
        return getFeatureItems(plan).filter(item => item.highlight);
    }

    function getNormalFeatures(plan) {
        return getFeatureItems(plan).filter(item => !item.highlight);
    }
</script>

<Modal bind:show size="w80">
    <div class="text-sm">
        <div class=" flex justify-between dark:text-gray-300 px-5 py-4">
            <div class=" font-bold self-center">套餐详情</div>
            <button
                    class="self-center"
                    on:click={() => {
											show = false;
										}}
            >
                <svg
                        class="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                            d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z"
                    />
                </svg>
            </button>
        </div>
        <hr class=" dark:border-gray-800"/>

        <div class="fixed-size-container flex flex-col w-full p-5 md:space-x-2 dark:text-gray-200">
            <div class="bg-gray-50 flex-grow">
                <div class="max-w-6xl mx-auto">
                    <!-- 当前套餐余量显示 -->
                    <div class="mb-4 bg-white rounded-xl shadow-md px-4 py-2 border border-gray-200">
                        <h2 class="text-[16px] font-bold text-gray-900 mb-1">当前套餐余量</h2>
                        <div class="grid grid-cols-2 gap-6">
                            <!-- 文档资料总量 -->
                            <div>
                                <div class="flex justify-between items-center mb-2">
                                    <span class="text-sm font-medium text-gray-700">文档资料总量</span>
                                    <span class="text-sm font-semibold text-gray-900">{currentPlan.docsUsed}
                                        /{currentPlan.docsSize}</span>
                                </div>
                                <div class="w-full bg-gray-200 rounded-full h-3">
                                    <div
                                            class="h-3 rounded-full progress-bar bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full"
                                            style="width: {currentPlan.volume_used_percentage}%"
                                    ></div>
                                </div>
                                <div class="text-right mt-1">
                                    <span class="text-xs text-gray-500">剩余 {100 - currentPlan.volume_used_percentage}
                                        % </span>
                                </div>
                            </div>

                            <!-- 问答次数余量 -->
                            <div>
                                <div class="flex justify-between items-center mb-2">
                                    <span class="text-sm font-medium text-gray-700">今日问答次数</span>
                                    <span class="text-sm font-semibold text-gray-900">{currentPlan.remaining}
                                        /{currentPlan.dailyQueries}</span>
                                </div>
                                <div class="w-full bg-gray-200 rounded-full h-3">
                                    <div
                                            class="h-3 progress-bar bg-gradient-to-r from-green-500 to-emerald-600 h-2 rounded-full"
                                            style="width: {currentPlan.chart_used_percentage}%"
                                    ></div>
                                </div>
                                <div class="text-right mt-1">
									<span
                                            class="text-xs text-gray-500">剩余{currentPlan.dailyQueries - currentPlan.remaining}
                                        次</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- 标题区域 -->
                    <div class="text-center mb-4">
                        <h1 class="text-2xl font-bold text-gray-900 mb-2">
                            企业AI知识问答系统轻量部署版本
                        </h1>
                        <p class="text-sm text-gray-600">
                            2025年价格体系（企业本地电脑部署运行，按电脑部署计算License）
                        </p>
                    </div>
                    <!-- 价格卡片网格 -->
                    {#if pricingData && pricingData.length > 0}
                        <div class="grid grid-cols-4 gap-6">
                            {#each pricingData as plan, index}
                                <div class="relative flex flex-col">

                                    <!-- 当前套餐标识 -->
                                    {#if plan.sub_version === currentPlan.sub_version}
                                        <div class="absolute -top-[12px] left-1/2 transform -translate-x-1/2 z-10">
											<span class="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-md">
												当前套餐
											</span>
                                        </div>
                                    {/if}

                                    <!-- 价格卡片 -->
                                    <div
                                            class="flex-1 bg-white rounded-xl shadow-md border {plan.sub_version === currentPlan.sub_version ? 'border-blue-500  transform scale-[1.02]' : 'border-gray-200'} transition-all duration-300 hover:shadow-lg">
                                        <div class="p-6">
                                            <!-- 版本名称 -->
                                            <h3 class="text-lg font-bold text-gray-900 text-center mb-3 flex justify-center">
                                                {plan.name}
                                                {#if plan.highlighted}
                                                    <svg t="1760692841701" class="icon w-4 -mt-[15px]"
                                                         viewBox="0 0 1024 1024" version="1.1"
                                                         xmlns="http://www.w3.org/2000/svg" p-id="1700"
                                                         xmlns:xlink="http://www.w3.org/1999/xlink" width="32"
                                                         height="32">
                                                        <path d="M325.554 1023.957c-65.703-141.946-30.718-223.436 19.626-300.104 55.038-83.709 69.544-166.948 69.544-166.948s43.177 58.75 26.111 150.522c76.327-89.042 90.876-230.135 79.4-284.575C693.367 548.884 767.22 821.768 667.3 1023.957c530.325-312.477 131.92-780 62.718-832.904 22.996 52.905 27.262 142.074-19.2 185.209C631.888 64.168 436.483 0 436.483 0c22.954 161.103-84.05 336.967-186.915 468.76-3.84-64.04-7.68-108.583-40.105-170.02-7.21 116.603-93.01 211.959-116.006 328.52-31.145 158.542 23.466 274.292 232.097 396.697z"
                                                              p-id="1701" fill="#ef422c"></path>
                                                    </svg>
                                                {/if}
                                            </h3>

                                            <!-- 价格 -->
                                            <div class="text-center mb-6">
                                                {#if plan.priceNum === 0}
                                                    <span class="text-2xl font-bold text-green-500">{plan.priceNum.toLocaleString()}
                                                        元</span>
                                                    <span class="text-sm text-gray-500 ml-1">/年</span>
                                                {:else}
                                                    <span class="text-2xl font-bold text-gray-900">{plan.priceNum.toLocaleString()}
                                                        元</span>
                                                    <span class="text-sm text-gray-500 ml-1">/年</span>
                                                {/if}
                                            </div>

                                            <!-- 高亮功能区域 -->
                                            {#if getHighlightFeatures(plan).length > 0}
                                                <div class="mb-6 p-2 bg-gray-50 rounded-lg">
                                                    <div class="space-y-3">
                                                        {#each getHighlightFeatures(plan) as feature}
                                                            <div class="flex justify-between items-center">
                                                                <span class="text-xs text-gray-600">{feature.label}</span>
                                                                <span class="text-sm font-bold text-gray-900">{feature.value}</span>
                                                            </div>
                                                        {/each}
                                                    </div>
                                                </div>
                                            {/if}

                                            <!-- 普通功能列表 -->
                                            {#if getNormalFeatures(plan).length > 0}
                                                <div class="space-y-3 mb-4">
                                                    {#each getNormalFeatures(plan) as feature}
                                                        <div class="flex justify-between items-center py-1.5 border-b border-gray-100">
                                                            <span class="text-xs text-gray-600">{feature.label}</span>
                                                            <span class="text-sm font-semibold text-gray-900">{feature.value}</span>
                                                        </div>
                                                    {/each}
                                                </div>
                                            {/if}

                                            <!-- 行动按钮 -->
                                            <button class="w-full py-3 px-4 rounded-lg font-semibold text-sm transition-colors duration-200
                {
                 plan.sub_version === currentPlan.sub_version ? 'bg-blue-500 hover:bg-blue-600 text-white' :
                 'bg-gray-100 hover:bg-gray-200 text-gray-900'}">
                                                {#if plan.sub_version === currentPlan.sub_version}
                                                    当前使用中
                                                {:else if plan.priceNum === 0}
                                                    联系我们 029-81163590
                                                {:else}
                                                    联系我们 029-81163590
                                                {/if}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            {/each}
                        </div>
                    {:else}
                        <div class="text-center py-8">
                            <p>加载中...</p>
                        </div>
                    {/if}


                    <!-- 页脚 -->
                    <div class="mt-4 text-center text-gray-500 border-t border-gray-200 pt-4">
                        <p class="text-xs">© 2025 企业AI知识问答系统 - 所有价格均为税前价格</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</Modal>

<style>
    .fixed-size-container {
        zoom: 1;
        -moz-transform: scale(1);
        -moz-transform-origin: 0 0;
        -o-transform: scale(1);
        -o-transform-origin: 0 0;
        -webkit-transform: scale(1);
        -webkit-transform-origin: 0 0;
        transform: scale(1);
        transform-origin: 0 0;
    }

</style>
