<script lang="ts">
    import {onMount, tick} from 'svelte';
    import * as echarts from 'echarts';
    import Loading from '$lib/components/common/Loading.svelte';

    export let isModal = false;
    export let isLoading = false;
    export let chartsData;
    export let days: string[] = [];
    export let selectedDay: string = '';
    export let onDayChange: (day: string) => void = () => {
    };

    let chart: echarts.ECharts | undefined;
    let chartContainer: HTMLDivElement;
    let mounted = false;

    const darkTextColor = '#e2e8f0';
    const darkAxisLineColor = 'rgba(255, 255, 255, 0.2)';

    async function initChart() {
        if (!mounted) return;
        await tick();
        if (!chartContainer) {
            console.error('DOM容器不存在');
            return;
        }
        // 每次重新初始化图表以确保更新
        chart?.dispose();
        chart = echarts.init(chartContainer);
        updateChart();
    }

    function updateChart() {
        if (!chart || !chartsData || !selectedDay) return;

        const chartData = chartsData[selectedDay];
        if (!chartData) return;

        const textColor = isDarkMode() ? darkTextColor : '#1e293b';
        const axisLineColor = isDarkMode() ? darkAxisLineColor : 'rgba(0, 0, 0, 0.2)';

        const option = {
            color: ['#3a4de9'],
            backgroundColor: 'transparent',
            tooltip: {
                trigger: 'axis'
            },
            xAxis: {
                type: 'category',
                data: chartData.dates,
                axisLabel: {
                    color: textColor
                },
                axisLine: {
                    lineStyle: {
                        color: axisLineColor
                    }
                }
            },
            yAxis: {
                type: 'value',
                 minInterval: 1,
                axisLabel: {
                    color: textColor
                },
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
            },
            series: [
                {
                    data: chartData.counts,
                    type: 'line',
                    smooth: true,
                    areaStyle: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            {offset: 0, color: 'rgba(58, 77, 233, 0.8)'},
                            {offset: 1, color: 'rgba(58, 77, 233, 0.1)'}
                        ])
                    },
                    itemStyle: {
                        color: '#3a4de9'
                    },
                    lineStyle: {
                        width: 2
                    }
                }
            ]
        };

        chart.setOption(option, true); // 使用true来清除之前的配置
        isLoading = false;
    }

    function handleResize() {
        chart?.resize();
    }

    function isDarkMode() {
        return document?.documentElement?.classList?.contains('dark') || false;
    }

    function handleThemeChange() {
        updateChart();
    }

    // 响应式语句：处理数据变化
    $: if (chartsData && mounted) {
        days = Object.keys(chartsData);
        if (days.length > 0 && !selectedDay) {
            selectedDay = days[0];
        }
        initChart();
    }

    // 响应selectedDay变化
    $: if (selectedDay && chart && mounted) {
        updateChart();
    }

    onMount(() => {
        mounted = true;
        if (chartsData) {
            days = Object.keys(chartsData);
            if (days.length > 0) {
                selectedDay = days[0];
                initChart();
            }
        }

        // 主题变化监听l
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        mediaQuery.addEventListener('change', handleThemeChange);

        const observer = new MutationObserver(handleThemeChange);
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['class']
        });

        window.addEventListener('resize', handleResize);

        return () => {
            mounted = false;
            mediaQuery.removeEventListener('change', handleThemeChange);
            observer.disconnect();
            window.removeEventListener('resize', handleResize);
            chart?.dispose();
        };
    });
</script>

<div class="flex justify-between items-center mb-4">
    <h2 class="text-xl font-semibold text-gray-800 dark:text-gray-200 flex items-center">
        <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 mr-2 text-indigo-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
        >
            <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
            />
        </svg>
        问答次数趋势
    </h2>
    <div class="flex space-x-2">
        {#if !isLoading && days.length > 0}
            {#each days as day}
                <button
                        class="px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 {selectedDay === day
                        ? 'bg-indigo-600 text-white shadow-md'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'}"
                        on:click={() => {
                        selectedDay = day;
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