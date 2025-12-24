<script lang="ts">
    import { onMount, onDestroy, tick } from 'svelte';
    import * as echarts from 'echarts';
    import Loading from "$lib/components/common/Loading.svelte";
    export let isModal = false;
    export let chartsData: { chunks: number; images: number; tables: number };
    let chartContainer: HTMLDivElement; // 使用 bind:this 替代 ID 查找
    let chart: echarts.ECharts | null = null;
    let isLoading = true;

    const darkTextColor = '#e2e8f0';
    const colorMap = {
        chunks: '#10b981',
        images: '#3b82f6',
        tables: '#8b5cf6'
    };

    // 初始化图表
    async function initChart() {
        if (!chartContainer || !chartsData) return;

        await tick(); // 确保DOM已更新
        chart = echarts.init(chartContainer);
        updateChart();
        isLoading = false;
    }

    // 更新图表数据
    function updateChart() {
        if (!chart) return;

        const total = chartsData.chunks + chartsData.images + chartsData.tables;
        const textColor = isDarkMode() ? darkTextColor : '#1e293b';

        const option = {
            backgroundColor: 'transparent',
            tooltip: {
                trigger: 'item',
                formatter: (params: any) => {
                    const percent = Math.round(params.percent);
                    return `${params.name}<br/>${params.value} (${percent}%)`;
                }
            },
            legend: {
                orient: 'vertical',
                left: 10,
                data: ['切片', '图片', '表格'],
                textStyle: { color: textColor }
            },
            series: [{
                name: '内容统计',
                type: 'pie',
                radius: ['40%', '70%'],
                avoidLabelOverlap: false,
                itemStyle: {
                    borderRadius: 10,
                    borderColor: isDarkMode() ? '#1e293b' : '#fff',
                    borderWidth: 2
                },
                label: { show: false, position: 'center' },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: '18',
                        fontWeight: 'bold',
                        color: textColor,
                        formatter: '{b}\n{c} ({d}%)'
                    }
                },
                labelLine: { show: false },
                data: [
                    { value: chartsData.chunks, name: '切片', itemStyle: { color: colorMap.chunks } },
                    { value: chartsData.images, name: '图片', itemStyle: { color: colorMap.images } },
                    { value: chartsData.tables, name: '表格', itemStyle: { color: colorMap.tables } }
                ]
            }]
        };

        chart.setOption(option);
        chart.resize(); // 确保图表适应容器
    }

    // 辅助函数
    function isDarkMode(): boolean {
        return document.documentElement.classList.contains('dark');
    }

    function handleResize() {
        chart?.resize();
    }

    function handleThemeChange() {
        updateChart();
    }

    // 响应式处理
    $: if (chartsData && chart) {
        updateChart();
    }

    // 生命周期
    onMount(() => {
        initChart();

        const darkModeMedia = window.matchMedia('(prefers-color-scheme: dark)');
        darkModeMedia.addEventListener('change', handleThemeChange);

        const observer = new MutationObserver(handleThemeChange);
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['class']
        });

        window.addEventListener('resize', handleResize);

        return () => {
            darkModeMedia.removeEventListener('change', handleThemeChange);
            observer.disconnect();
            window.removeEventListener('resize', handleResize);
        };
    });

    onDestroy(() => {
        if (chart) {
            chart.dispose();
            chart = null;
        }
    });
</script>

<h2 class="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200 flex items-center">
    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
    知识类型统计
</h2>

<div class="relative">
    <Loading {isLoading}/>
    <div bind:this={chartContainer} class="min-h-80  w-full {isModal?'h-[80vh]':'h-[30vh]'}"></div>
</div>
