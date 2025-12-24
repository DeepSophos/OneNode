<script>
	import { onDestroy, onMount } from 'svelte';
	import * as echarts from 'echarts';

	export let data;
	export let type;

	let chartDom;
	let myChart;
	let resizeObserver;
	let chartC;
	onMount(() => {
		// 初始化图表
		chartDom = type === 'time' ? document.getElementById('echarts-container') : document.getElementById('echarts-container1');
		if (!chartDom) return;

		myChart = echarts.init(chartDom);
		updateChart();

		resizeObserver = new ResizeObserver(entries => {
			for (let entry of entries) {
				if (entry.target === chartC && myChart) {
					myChart.resize();
				}
			}
		});
		resizeObserver.observe(chartC);
	});

	onDestroy(() => {
		if (resizeObserver) {
			resizeObserver.unobserve(chartC);
			resizeObserver.disconnect();
		}

	});

	function updateChart() {
		if (!myChart || !data) return;

		const isTimeChart = type === 'time';

		const option = {
			tooltip: {
				trigger: 'axis',
				axisPointer: {
					type: 'shadow'
				}
			},
			grid: {
				left: '3%',
				right: '4%',
				bottom: '3%',
				containLabel: true
			},
			xAxis: {
				type: 'value',
				axisLabel: {
					formatter: isTimeChart ? '{value}次' : '{value}'
				}
			},
			yAxis: {
				type: 'category',
				data: Object.keys(data),
				axisLabel: {
					interval: 0,
					rotate: isTimeChart ? 0 : 0 // 如果需要可以旋转标签
				}
			},
			series: [
				{
					name: isTimeChart ? '问题数量' : '主题数量',
					type: 'bar',
					data: Object.values(data),
					itemStyle: {
						color: isTimeChart ? '#5470C6' : '#91CC75'
					},
					label: {
						show: true,
						position: 'right',
						formatter: '{c}'
					},
					emphasis: {
						itemStyle: {
							color: isTimeChart ? '#2541B2' : '#5D9E3F'
						}
					}
				}
			],
			animationDuration: 1000
		};

		myChart.setOption(option);
		myChart.resize(); // 确保图表正确适应容器
	}

	$: if (data) {
		updateChart();
	}
</script>
<div bind:this={chartC} class="chart-container">
	{#if type === 'time'}
		<div id="echarts-container" class="echarts-container"></div>
	{:else}
		<div id="echarts-container1" class="echarts-container"></div>
	{/if}
</div>
<style>
    .echarts-container {
        width: 100%;
        height: 300px;
    }

    @media (max-width: 768px) {
        .echarts-container {
            height: 300px;
        }
    }
</style>
