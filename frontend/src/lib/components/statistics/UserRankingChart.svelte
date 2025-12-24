<script lang="ts">
    import {onMount, onDestroy} from 'svelte';
    import * as echarts from 'echarts';
    import Loading from "$lib/components/common/Loading.svelte";

    export let isModal = false;
    export let chartsData;
    export let days = [];
    export let selectedDay = '';
    export let onDayChange: (day: string) => void = () => {
    };

    let isLoading = true;
    let chart: echarts.ECharts | undefined;
    let chartContainer: HTMLDivElement | null = null;
    let isMounted = false;

    const darkTextColor = '#e2e8f0';
    const darkAxisLineColor = 'rgba(255, 255, 255, 0.2)';

    // 初始化图表（仅在DOM挂载后调用）
    function initChart() {
        if (!isMounted || !chartsData || !days || !selectedDay || !chartContainer) return;

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
        if (!chart) return;

        let chartData = chartsData[selectedDay as keyof typeof chartsData];
         if (!chartData || chartData.length === 0)
                 chartData = [{"name": "用户", "count": 0}];
        //降序
        const sortedData = [...chartData].sort((a, b) => a.count - b.count);
        const textColor = isDarkMode() ? darkTextColor : '#1e293b';
        const axisLineColor = isDarkMode() ? darkAxisLineColor : 'rgba(0, 0, 0, 0.2)';

        const option = {
            color: ['#188df0'],
            backgroundColor: 'transparent',
            tooltip: {
                trigger: 'axis',
                axisPointer: {type: 'shadow'}
            },
            grid: {
                left: '3%',
                right: '4%',
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
                    minInterval: 1,
                    axisLine: {
                        lineStyle: {
                            color: textColor
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
                    name: '使用次数',
                    type: 'bar',
                    barWidth: '60%',
                    data: sortedData.map((item) => item.count),
                    itemStyle: {
                        color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [
                            {offset: 0, color: '#83bff6'},
                            {offset: 0.5, color: '#188df0'},
                            {offset: 1, color: '#1864ab'}
                        ]),
                        borderRadius: [0, 4, 4, 0]
                    },
                    label: {
                        show: true,
                        position: 'right',
                        formatter: '{c}',
                        fontWeight: 'bold',
                        color: textColor
                    }
                }
            ]
        };

        chart.setOption(option);
    }

    function isDarkMode() {
        return document.documentElement.classList.contains('dark');
    }

    function handleThemeChange() {
        updateChart();
    }

    function handleResize() {
        chart?.resize();
    }

    // 响应数据变化
    $: {
        if (chartsData) {
            days = Object.keys(chartsData);
            if (!days.includes(selectedDay)) {
                selectedDay = days[0] || '';
            }

            // 确保在组件挂载后才初始化图表
            if (isMounted) {
                initChart();
            }
        }
    }

    // 响应日期变化
    $: if (chart && selectedDay && chartsData) {
        updateChart();
    }

    onMount(() => {
        isMounted = true;

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
        isMounted = false;
    });
</script>

<div class="flex justify-between items-center mb-4">
    <h2 class="text-xl font-semibold text-gray-800 dark:text-gray-200 flex items-center">
        <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 mr-2 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
        >
            <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
        </svg>
        用户使用次数排名
    </h2>
    <div class="flex space-x-2">
        {#if !isLoading}
            {#each days as day}
                <button
                        class="px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 {selectedDay === day
            ? 'bg-blue-600 text-white shadow-md'
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