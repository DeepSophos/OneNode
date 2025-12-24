<script lang="ts">
    import { onMount, onDestroy, tick } from 'svelte';
    import * as echarts from 'echarts';
    import Loading from "$lib/components/common/Loading.svelte";
    export let isModal = false;
    export let chartsData: { [key: string]: Array<{ name: string; count: number }> } = {};
    export let days: string[] = [];
    export let selectedDay: string = '';
    export let onDayChange: (day: string) => void = () => {};

    let isLoading = true;
    let chart: echarts.ECharts | undefined;
    let chartContainer: HTMLDivElement | null = null;
    const darkTextColor = '#e2e8f0';
    const darkAxisLineColor = 'rgba(255, 255, 255, 0.2)';
    let resizeObserver: ResizeObserver | null = null;

    async function initChart() {
        // 确保容器存在并已连接到DOM
        if (!chartContainer || !chartContainer.isConnected) {
            console.warn('Chart container not ready, waiting...');
            await tick();
            if (!chartContainer) {
                console.error('Chart container still not found after wait');
                return;
            }
        }

        // 检查容器尺寸
        if (chartContainer.offsetWidth === 0 || chartContainer.offsetHeight === 0) {
            console.warn('Chart container has zero dimensions, retrying...');
            await tick();
            return initChart();
        }

        try {
            isLoading = true;

            // 销毁现有实例
            if (chart) {
                chart.dispose();
                chart = undefined;
            }

            // 初始化图表
            chart = echarts.init(chartContainer);
            updateChart();
        } catch (error) {
            console.error('Chart initialization failed:', error);
        } finally {
            isLoading = false;
        }
    }

    function updateChart() {
        if (!chart || !selectedDay) return;

        let chartData = chartsData[selectedDay];
        if (!chartData || chartData.length === 0)
                chartData = [{"name": "知识集", "count": 0}];

        const textColor = isDarkMode() ? darkTextColor : '#1e293b';
        const axisLineColor = isDarkMode() ? darkAxisLineColor : 'rgba(0, 0, 0, 0.2)';

        chart.setOption({
            color: ['#06b6d4'],
            backgroundColor: 'transparent',
            tooltip: {
                trigger: 'axis',
                axisPointer: { type: 'shadow' }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [{
                type: 'category',
                data: chartData.map((item) => item.name),
                axisTick: { alignWithLabel: true },
                axisLabel: {
                    rotate: 45,
                    interval: 0,
                    color: textColor
                },
                axisLine: {
                    lineStyle: {
                        color: axisLineColor
                    }
                }
            }],
            yAxis: [{
                type: 'value',
                minInterval: 1,
                axisLabel: { color: textColor },
                axisLine: {
                    lineStyle: {
                        color: axisLineColor
                    }
                },
                splitLine: {
                    lineStyle: {
                        color: isDarkMode() ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)'
                    }
                }
            }],
            series: [{
                name: '使用次数',
                type: 'bar',
                barWidth: '60%',
                data: chartData.map((item) => item.count),
                itemStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: '#67e8f9' },
                        { offset: 1, color: '#06b6d4' }
                    ])
                }
            }]
        });
    }

    function handleThemeChange() {
        updateChart();
    }

    function isDarkMode() {
        return document.documentElement.classList.contains('dark');
    }

    // 响应数据变化
    $: if (chartsData && chartContainer) {
        days = Object.keys(chartsData);
        if (days.length > 0 && !selectedDay) {
            selectedDay = days[0];
        }
        initChart();
    };

    // 响应日期选择变化
    $: if (chart && selectedDay && chartsData?.[selectedDay]) {
        updateChart();
    }

    onMount(async () => {
        await tick(); // 确保DOM完全加载
        await initChart();

        // 设置resize观察器
        resizeObserver = new ResizeObserver(() => {
            chart?.resize();
        });

        if (chartContainer) {
            resizeObserver.observe(chartContainer);
        }

        // 监听暗色模式变化
        const darkModeMedia = window.matchMedia('(prefers-color-scheme: dark)');
        darkModeMedia.addEventListener('change', handleThemeChange);

        return () => {
            if (resizeObserver) {
                resizeObserver.disconnect();
            }
            darkModeMedia.removeEventListener('change', handleThemeChange);
        };
    });

    onDestroy(() => {
        if (chart) {
            chart.dispose();
            chart = undefined;
        }
    });
</script>

<div class="flex justify-between items-center mb-4">
    <h2 class="text-xl font-semibold text-gray-800 dark:text-gray-200 flex items-center">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 mr-2 text-teal-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
        >
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
        </svg>
        知识集使用次数
    </h2>
    <div class="flex space-x-2">
        {#if !isLoading}
            {#each days as day}
                <button
                    class="px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 {selectedDay === day
                        ? 'bg-teal-600 text-white shadow-md'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'}"
                    on:click={() => {
                        selectedDay = day;
                        updateChart();
                        onDayChange(day);
                    }}
                >
                    {day}
                </button>
            {/each}
        {/if}
    </div>
</div>

<div class="relative">
    <Loading {isLoading}/>
    <div bind:this={chartContainer} class="min-h-80  w-full {isModal?'h-[80vh]':'h-[30vh]'}"></div>
</div>