<script lang="ts">
    import { onMount, onDestroy, tick } from 'svelte';
    import { createEventDispatcher } from 'svelte';
    import * as echarts from 'echarts';
    import 'echarts-gl';
    import KnowledgeSelector from "$lib/components/common/KnowledgeSelector.svelte";
    import Loading from "$lib/components/common/Loading.svelte";
    import { getKnowledgeScopesAll } from "$lib/apis/rag";

    const dispatch = createEventDispatcher();

    export let chartsData: Array<{
        name: string;
        value: [number, number, number];
        symbolSize: number;
        itemStyle?: { color: string };
        text?: string;
    }> = [];
    export let scopeName: string = '';

    let chartContainer: HTMLDivElement;
    let chart: echarts.ECharts | null = null;
    let isLoading = true;
    let knowledgeData: Array<{name: string}> = [];
    let showKnowledgeSelector = false;

    const darkTextColor = '#e2e8f0';
    const defaultSymbolSize = (size: number) => size / 2;

    // 初始化图表
    async function initChart() {
        if (!chartContainer || !chartsData) return;

        await tick();
        if (!chart) {
            chart = echarts.init(chartContainer);
        }
        updateChart();
    }

    // 更新图表
    function updateChart() {
        if (!chart || !chartsData) return;

        const textColor = isDarkMode() ? darkTextColor : '#1e293b';
        const axisLineColor = isDarkMode() ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)';

        chart.setOption({
            backgroundColor: 'transparent',
            tooltip: {
                formatter: (params: any) => {
                    const vals = params.data.text.split('\n').filter(line => line.trim() !== '');
                    const result = vals.length > 0 ? params.name+'<br/>'+vals.join('<br/>') : '';
                    return result;
                }
            },
            xAxis3D: {
                type: 'value',
                name: 'X轴',
                axisLabel: { color: textColor },
                axisLine: { lineStyle: { color: axisLineColor } }
            },
            yAxis3D: {
                type: 'value',
                name: 'Y轴',
                axisLabel: { color: textColor },
                axisLine: { lineStyle: { color: axisLineColor } }
            },
            zAxis3D: {
                type: 'value',
                name: 'Z轴',
                axisLabel: { color: textColor },
                axisLine: { lineStyle: { color: axisLineColor } }
            },
            grid3D: {
                boxWidth: 100,
                boxDepth: 100,
                boxHeight: 100,
                axisLine: { lineStyle: { color: axisLineColor } },
                axisPointer: { lineStyle: { color: textColor } },
                light: {
                    main: { intensity: 1.2, shadow: true },
                    ambient: { intensity: 0.3 }
                },
                viewControl: {
                    autoRotate: true,
                    autoRotateSpeed: 10,
                    rotateSensitivity: 1
                }
            },
            series: [{
                type: 'scatter3D',
                data: chartsData,
                symbolSize: defaultSymbolSize,
                itemStyle: { opacity: 0.8 },
                label: {
                    show: false,
                    position: 'top',
                    formatter: '{b}',
                    color: textColor,
                    fontSize: 12
                },
                emphasis: {
                    itemStyle: { opacity: 1 },
                    label: { show: true }
                }
            }]
        });

        isLoading = false;
    }

    // 暗黑模式检测
    function isDarkMode(): boolean {
        return document.documentElement.classList.contains('dark');
    }

    // 处理知识库选择
    async function handleKnowledgeConfirm(event: CustomEvent) {
        const { selKnowledge: selected } = event.detail;
        if (selected.length === 0 || scopeName === selected[0].name) return;

        scopeName = selected[0].name;
        isLoading = true;
        chart?.clear();
        dispatch('changeScope', { scopeName });
    }

    // 响应式处理
    $: if (chartsData && chartContainer) {
        initChart();
    }

    // 生命周期
    onMount(async () => {
        try {
            knowledgeData = JSON.parse(await getKnowledgeScopesAll(localStorage.token));

            const darkModeMedia = window.matchMedia('(prefers-color-scheme: dark)');
            darkModeMedia.addEventListener('change', updateChart);

            const observer = new MutationObserver(updateChart);
            observer.observe(document.documentElement, {
                attributes: true,
                attributeFilter: ['class']
            });

            window.addEventListener('resize', handleResize);

            return () => {
                darkModeMedia.removeEventListener('change', updateChart);
                observer.disconnect();
                window.removeEventListener('resize', handleResize);
            };
        } catch (error) {
            console.error('Failed to load knowledge data:', error);
        }
    });

    onDestroy(() => {
        if (chart) {
            chart.dispose();
            chart = null;
        }
    });

    function handleResize() {
        chart?.resize();
    }
</script>

<div class="flex flex-col h-full">
    <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-semibold text-gray-800 dark:text-gray-200 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
            {scopeName || '未选择'}知识点
        </h2>
        <button
            class="p-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition-colors"
            on:click={() => showKnowledgeSelector = true}
        >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
                <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
            </svg>
        </button>
    </div>

    <div class="relative flex-1">
        <Loading {isLoading} />
        <div bind:this={chartContainer} class="absolute inset-0 min-h-80"></div>
    </div>
</div>

<KnowledgeSelector
    bind:visible={showKnowledgeSelector}
    multiple={false}
    knowledgeBases={knowledgeData}
    title="选择知识集"
    selectedKnowledgeBases={knowledgeData.filter(k => k.name === scopeName)}
    on:confirm={handleKnowledgeConfirm}
    on:cancel={() => showKnowledgeSelector = false}
/>