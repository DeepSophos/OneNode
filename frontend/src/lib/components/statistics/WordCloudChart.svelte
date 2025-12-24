<script lang="ts">
    import { onMount, afterUpdate } from 'svelte';
    import * as echarts from 'echarts';
    import 'echarts-wordcloud';
    import Loading from "$lib/components/common/Loading.svelte";
    export let isModal = false;
    export let chartsData;
    let isLoading = true;
    let chart: echarts.ECharts | undefined;
    let chartContainer: HTMLDivElement;
    let isMounted = false;

    function initChart() {
        if (!isMounted || !chartContainer || !chartsData) return;

        isLoading = true;

        if (!chart) {
            chart = echarts.init(chartContainer);
        }

        const option = {
            backgroundColor: 'transparent',
            series: [
                {
                    type: 'wordCloud',
                    shape: 'circle',
                    left: 'center',
                    top: 'center',
                    width: '100%',
                    height: '100%',
                    right: null,
                    bottom: null,
                    sizeRange: [12, 60],
                    rotationRange: [-90, 90],
                    rotationStep: 45,
                    gridSize: 8,
                    drawOutOfBound: false,
                    layoutAnimation: true,
                    textStyle: {
                        fontFamily: 'sans-serif',
                        fontWeight: 'bold',
                        color: function () {
                            return (
                                'rgb(' +
                                [
                                    Math.round(Math.random() * 160),
                                    Math.round(Math.random() * 160),
                                    Math.round(Math.random() * 160)
                                ].join(',') +
                                ')'
                            );
                        }
                    },
                    emphasis: {
                        focus: 'self',
                        textStyle: {
                            shadowBlur: 10,
                            shadowColor: '#333'
                        }
                    },
                    data: chartsData.length === 0 ? [{"name": "热门关键字", "value": 0}] : chartsData
                }
            ]
        };

        chart.setOption(option);
        isLoading = false;
    }

    function handleResize() {
        chart?.resize();
    }

    onMount(() => {
        isMounted = true;
        initChart();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
            chart?.dispose();
            chart = undefined;
        };
    });

    afterUpdate(() => {
        if (isMounted) {
            initChart();
        }
    });
</script>

<h2 class="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200 flex items-center">
    <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5 mr-2 text-blue-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
    >
        <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
        />
    </svg>
    热门问答关键字
</h2>
<div class="relative">
    <Loading {isLoading}/>
    <div bind:this={chartContainer} class="min-h-80  w-full {isModal?'h-[80vh]':'h-[30vh]'}"></div>
</div>