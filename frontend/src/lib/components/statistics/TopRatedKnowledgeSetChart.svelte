<script lang="ts">
    import { onMount, onDestroy } from 'svelte';
    import * as echarts from 'echarts';
    import Loading from "$lib/components/common/Loading.svelte";
    export let isModal = false;
    export let chartsData;
    export let days: string[] = [];
    export let selectedDay: string = '';
    export let onDayChange: (day: string) => void = () => {};

    let isLoading = true;
    let chart: echarts.ECharts | undefined;
    let chartContainer: HTMLDivElement | null = null; // 绑定图表容器
    const darkTextColor = '#e2e8f0';
    const darkAxisLineColor = 'rgba(255, 255, 255, 0.2)';

    // 初始化图表
    function initChart() {
        if (!chartContainer) return;

        // 如果图表已存在，先销毁
        if (chart) {
            chart.dispose();
        }

        // 使用绑定的容器元素初始化图表
        chart = echarts.init(chartContainer);
        updateChart();
        isLoading = false;
    }

    function updateChart() {
        if (!chart || !chartsData || !selectedDay) return;

        let chartData = chartsData[selectedDay as keyof typeof chartsData];
        if (!chartData || chartData.length === 0)
                chartData = [{"name": "知识集", "rating": 0.0}];

        const sortedData = [...chartData].sort((a, b) => b.rating - a.rating);
        const textColor = isDarkMode() ? darkTextColor : '#1e293b';
        const axisLineColor = isDarkMode() ? darkAxisLineColor : 'rgba(0, 0, 0, 0.2)';

        const option = {
            backgroundColor: 'transparent',
            tooltip: {
                trigger: 'axis',
                axisPointer: {type: 'shadow'},
                formatter: function (params: any) {
                    const data = params[0];
                    return `${data.name}<br/>评分: ${sortedData[data.dataIndex].rating}<br/>`;
                }
            },
            grid: {
                left: '3%',
                right: '15%',
                bottom: '3%',
                top: '3%',
                containLabel: true
            },
            yAxis: [
                {
                    type: 'category',
                    data: sortedData.map((item) => item.name),
                    axisTick: {alignWithLabel: true},
                    axisLabel: {
                        color: textColor,
                        fontWeight: 'bold'
                    }
                }
            ],
            xAxis: [
                {
                    type: 'value',
                    max: 5,
                    axisLabel: {
                        formatter: '{value} 分',
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
                }
            ],
            series: [
                {
                    name: '评分',
                    type: 'bar',
                    barWidth: '60%',
                    data: sortedData.map((item) => item.rating),
                    itemStyle: {
                        color: function (params: any) {
                            const rating = sortedData[params.dataIndex].rating;
                            if (rating >= 4.8) return '#f59e0b';
                            if (rating >= 4.5) return '#fbbf24';
                            return '#fcd34d';
                        },
                        borderRadius: [0, 4, 4, 0]
                    },
                    label: {
                        show: true,
                        position: 'right',
                        formatter: function (params: any) {
                             return params.value+'分'; //+ ' (' + sortedData[params.dataIndex].count + '人评价)';
                        },
                        fontWeight: 'bold',
                        color: textColor
                    }
                }
            ]
        };

        chart.setOption(option);
    }

    function handleResize() {
        chart?.resize();
    }

    function handleThemeChange() {
        updateChart();
    }

    function isDarkMode() {
        return document.documentElement.classList.contains('dark');
    }

    // 响应数据变化
    $: {
        if (chartsData) {
            days = Object.keys(chartsData);
            if (!days.includes(selectedDay)) {
                selectedDay = days[0] || '';
            }
            initChart();
        }
    }

    // 响应日期变化
    $: if (selectedDay && chartsData) {
        updateChart();
    }

    onMount(() => {
        // 初始渲染图表
        if (chartsData) {
            initChart();
        }

        // 监听主题变化
        const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        darkModeMediaQuery.addEventListener('change', handleThemeChange);

        const observer = new MutationObserver(handleThemeChange);
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['class']
        });

        // 监听窗口大小变化
        window.addEventListener('resize', handleResize);

        return () => {
            darkModeMediaQuery.removeEventListener('change', handleThemeChange);
            observer.disconnect();
            window.removeEventListener('resize', handleResize);
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
                class="h-5 w-5 mr-2 text-yellow-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
        >
            <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
            />
        </svg>
        知识集问答好评榜单
    </h2>
    <div class="flex space-x-2">
        {#if !isLoading}
            {#each days as day}
                <button
                        class="px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 {selectedDay === day
            ? 'bg-yellow-500 text-white shadow-md'
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