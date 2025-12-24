<script lang="ts">
    import {onMount} from 'svelte';
    import UserRankingChart from './UserRankingChart.svelte';
    import TrendChart from './TrendChart.svelte';
    import KnowledgeGraphChart from './KnowledgeGraphChart.svelte';
    import WordCloudChart from './WordCloudChart.svelte';
    import KnowledgeSetUsageChart from './KnowledgeSetUsageChart.svelte';
    import ContentStatsChart from './ContentStatsChart.svelte';
    import TopRatedKnowledgeSetChart from './TopRatedKnowledgeSetChart.svelte';
    import {queryStatisticsData} from "$lib/apis/statistics";
    import {splitStream} from '$lib/utils';
    import {fade, fly} from 'svelte/transition';
    import {getUsers} from '$lib/apis/users';

    // 模拟数据 - 实际应用中应从API获取
    let totalQuestions = 0;
    let totalQuestionsRate = 0;
    let knowledgeSets = 0;
    let knowledgeSetsRate = 0;
    let documents = 0;
    let documentsRate = 0;
    let users = 0;

    let contentStats = {
        chunks: 0,
        images: 0,
        tables: 0
    };
    let user_rank_data;
    let wordcloud_data;
    let kb_usage_data;
    let trend_data;
    let kb_rating_data;
    let kb_scatter_data;
    let scopeName;
    let general_info_data;

    // 模态窗体相关状态
    let showModal = false;
    let modalChartType = '';
    let modalChartData = null;

    async function queryData(kb_name) {
        const param = kb_name ? {kb_scatter: kb_name} : {};
        const [res, controller] = await queryStatisticsData(localStorage.token, param);
        if (res && res.ok) {
            const reader = res.body.pipeThrough(new TextDecoderStream()).pipeThrough(splitStream('\n')).getReader();
            while (true) {
                const {value, done} = await reader.read();
                if (done) {
                    break;
                }
                let res = JSON.parse(value);
                if (res.channel === 'user_rank') {
                    //用户使用次数排名
                    user_rank_data = res.data;
                } else if (res.channel === 'kb_usage') {
                    //知识库使用次数
                    kb_usage_data = res.data;
                } else if (res.channel === 'wordcloud') {
                    //热门问答关键字
                    wordcloud_data = res.data;
                } else if (res.channel === 'trend') {
                    //问答次数趋势
                    trend_data = res.data;
                } else if (res.channel === 'kb_rating') {
                    //知识集评分
                    kb_rating_data = res.data;
                } else if (res.channel === 'kb_scatter') {
                    //知识图谱
                    kb_scatter_data = res.data;
                    scopeName = res.scopeName;
                } else if (res.channel === 'general_info') {
                    //知识集内容统计
                    general_info_data = res.data;
                    totalQuestions = general_info_data.totalQuestions.value;
                    totalQuestionsRate = ((totalQuestions - general_info_data.totalQuestions.delta) / general_info_data.totalQuestions.delta).toFixed(2);
                    knowledgeSets = general_info_data.knowledgeSets.value;
                    knowledgeSetsRate = ((knowledgeSets - general_info_data.knowledgeSets.delta) / general_info_data.knowledgeSets.delta).toFixed(2);
                    documents = general_info_data.documents.value;
                    documentsRate = ((documents - general_info_data.documents.delta) / general_info_data.documents.delta).toFixed(2);
                    contentStats = general_info_data.contentStatistics;
                }
            }
        }
    }

    function changeScope(event) {
        scopeName = event.detail.scopeName;
        queryData(scopeName)
    }

    // 打开模态窗体
    function openModal(chartType, chartData) {
        modalChartType = chartType;
        modalChartData = chartData;
        showModal = true;
    }

    // 关闭模态窗体
    function closeModal() {
        showModal = false;
        modalChartType = '';
        modalChartData = null;
    }

    // 处理模态窗体外部点击
    function handleModalClick(event) {
        if (event.target === event.currentTarget) {
            closeModal();
        }
    }

    // 处理ESC键关闭
    function handleKeydown(event) {
        if (event.key === 'Escape') {
            closeModal();
        }
    }

    onMount(async () => {
        users = await getUsers(localStorage.token);
        await queryData();
    });
</script>

<svelte:window on:keydown={handleKeydown}/>

<div
        class="w-full max-h-screen overflow-y-auto bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 p-8 transition-colors duration-300"
>
    <!-- 顶部统计卡片 -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <!-- 累计问答次数 -->
        <div
                class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transform transition-all duration-300 hover:scale-105 hover:shadow-xl border-l-4 border-indigo-500"
        >
            <div class="flex justify-between items-start">
                <div>
                    <h2 class="text-lg font-semibold text-gray-700 dark:text-gray-300">累计问答次数</h2>
                    <p class="text-3xl font-bold mt-2 text-indigo-600">
                        {totalQuestions}
                    </p>
                </div>
                <div class="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-full text-indigo-600 dark:text-indigo-400 shadow-inner">
                    <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-7 w-7"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                    >
                        <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                        />
                    </svg>
                </div>
            </div>
        </div>

        <!-- 知识集数量 -->
        <div
                class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transform transition-all duration-300 hover:scale-105 hover:shadow-xl border-l-4 border-blue-500"
        >
            <div class="flex justify-between items-start">
                <div>
                    <h2 class="text-lg font-semibold text-gray-700 dark:text-gray-300">知识集数量</h2>
                    <p class="text-3xl font-bold mt-2 text-blue-600">{knowledgeSets}</p>
                </div>
                <div class="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-600 dark:text-blue-400 shadow-inner">
                    <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-7 w-7"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                    >
                        <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                        />
                    </svg>
                </div>
            </div>
        </div>

        <!-- 文档数量 -->
        <div
                class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transform transition-all duration-300 hover:scale-105 hover:shadow-xl border-l-4 border-green-500"
        >
            <div class="flex justify-between items-start">
                <div>
                    <h2 class="text-lg font-semibold text-gray-700 dark:text-gray-300">文档数量</h2>
                    <p class="text-3xl font-bold mt-2 text-green-600">{documents}</p>
                </div>
                <div class="p-3 bg-green-100 dark:bg-green-900/30 rounded-full text-green-600 dark:text-green-400 shadow-inner">
                    <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-7 w-7"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                    >
                        <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                    </svg>
                </div>
            </div>
        </div>

        <!-- 用户数量 -->
        <div
                class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transform transition-all duration-300 hover:scale-105 hover:shadow-xl border-l-4 border-purple-500"
        >
            <div class="flex justify-between items-start">
                <div>
                    <h2 class="text-lg font-semibold text-gray-700 dark:text-gray-300">用户数量</h2>
                    <p class="text-3xl font-bold mt-2 text-purple-600">
                        {users?.length || 0}
                    </p>
                </div>
                <div class="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-full text-purple-600 dark:text-purple-400 shadow-inner">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                         stroke="currentColor" class="size-7">
                        <path stroke-linecap="round" stroke-linejoin="round"
                              d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"/>
                    </svg>

                </div>
            </div>
        </div>
    </div>

    <!-- 图表区域 -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <!-- 问答次数趋势 -->
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl relative">
            <button
                    class="absolute bottom-4 right-4 z-10 p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200 shadow-lg hover:shadow-xl"
                    on:click={() => openModal('trend', trend_data)}
                    title="放大查看"
            >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-600 dark:text-gray-300" fill="none"
                     viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"/>
                </svg>
            </button>
            <TrendChart chartsData={trend_data}/>
        </div>

        <!-- 用户使用次数排名 -->
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl relative">
            <button
                    class="absolute bottom-4 right-4 z-10 p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200 shadow-lg hover:shadow-xl"
                    on:click={() => openModal('userRanking', user_rank_data)}
                    title="放大查看"
            >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-600 dark:text-gray-300" fill="none"
                     viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"/>
                </svg>
            </button>
            <UserRankingChart chartsData={user_rank_data}/>
        </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <!-- 内容类型统计 -->
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl relative">
            <button
                    class="absolute bottom-4 right-4 z-10 p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200 shadow-lg hover:shadow-xl"
                    on:click={() => openModal('contentStats', contentStats)}
                    title="放大查看"
            >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-600 dark:text-gray-300" fill="none"
                     viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"/>
                </svg>
            </button>
            <ContentStatsChart chartsData={contentStats}/>
        </div>

        <!-- 知识图谱 -->
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl relative">
            <button
                    class="absolute bottom-4 right-4 z-10 p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200 shadow-lg hover:shadow-xl"
                    on:click={() => openModal('knowledgeGraph', {data: kb_scatter_data, scopeName})}
                    title="放大查看"
            >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-600 dark:text-gray-300" fill="none"
                     viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"/>
                </svg>
            </button>
            <KnowledgeGraphChart chartsData={kb_scatter_data} scopeName={scopeName} on:changeScope={changeScope}/>
        </div>

        <!-- 热门问答关键字 -->
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl relative">
            <button
                    class="absolute bottom-4 right-4 z-10 p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200 shadow-lg hover:shadow-xl"
                    on:click={() => openModal('wordCloud', wordcloud_data)}
                    title="放大查看"
            >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-600 dark:text-gray-300" fill="none"
                     viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"/>
                </svg>
            </button>
            <WordCloudChart chartsData={wordcloud_data}/>
        </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <!-- 知识集使用情况 -->
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl relative">
            <button
                    class="absolute bottom-4 right-4 z-10 p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200 shadow-lg hover:shadow-xl"
                    on:click={() => openModal('knowledgeSetUsage', kb_usage_data)}
                    title="放大查看"
            >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-600 dark:text-gray-300" fill="none"
                     viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"/>
                </svg>
            </button>
            <KnowledgeSetUsageChart chartsData={kb_usage_data}/>
        </div>

        <!-- 评分最高的知识集 -->
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl relative">
            <button
                    class="absolute bottom-4 right-4 z-10 p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200 shadow-lg hover:shadow-xl"
                    on:click={() => openModal('topRatedKnowledgeSet', kb_rating_data)}
                    title="放大查看"
            >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-600 dark:text-gray-300" fill="none"
                     viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"/>
                </svg>
            </button>
            <TopRatedKnowledgeSetChart chartsData={kb_rating_data}/>
        </div>
    </div>
</div>

<!-- 模态窗体 -->
{#if showModal}
    <div
            class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            on:click={handleModalClick}
            transition:fade={{ duration: 200 }}
    >
        <div
                class="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full h-full overflow-auto"
                transition:fly={{ duration: 200, start: 0.9 }}
        >
            <div class="flex justify-end p-4">
                <button
                        class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                        on:click={closeModal}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-500 dark:text-gray-400" fill="none"
                         viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                </button>
            </div>

            <!-- 模态窗体内容 -->
            <div class="px-5 pb-5 h-[88%] w-full">
                {#if modalChartType === 'trend'}
                    <TrendChart chartsData={modalChartData} isModal={true}/>
                {:else if modalChartType === 'userRanking'}
                    <UserRankingChart chartsData={modalChartData} isModal={true}/>
                {:else if modalChartType === 'contentStats'}
                    <ContentStatsChart chartsData={modalChartData} isModal={true}/>
                {:else if modalChartType === 'knowledgeGraph'}
                    <KnowledgeGraphChart chartsData={modalChartData.data} scopeName={modalChartData.scopeName}
                                         on:changeScope={changeScope}/>
                {:else if modalChartType === 'wordCloud'}
                    <WordCloudChart chartsData={modalChartData} isModal={true}/>
                {:else if modalChartType === 'knowledgeSetUsage'}
                    <KnowledgeSetUsageChart chartsData={modalChartData} isModal={true}/>
                {:else if modalChartType === 'topRatedKnowledgeSet'}
                    <TopRatedKnowledgeSetChart chartsData={modalChartData} isModal={true}/>
                {/if}
            </div>
        </div>
    </div>
{/if}