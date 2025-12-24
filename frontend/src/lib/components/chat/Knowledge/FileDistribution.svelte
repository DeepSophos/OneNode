<script>
 import { onDestroy, onMount } from 'svelte';
 import * as echarts from 'echarts';

 export let ranges;
	export let selected;

	let chartContainer;
	let chartInstance;
	let chartC;
	let resizeObserver;
	let chart;
	$: if (chart && ranges) {
		updateChart();
	}

	function updateChart() {
		const displayRanges = selected ? [selected] : ranges;

		const option = {
			title: {
				text: selected ? `${selected.name} - 文件分布` : '全部知识范围文件分布',
				left: 'center'
			},
			tooltip: {
				trigger: 'axis',
				axisPointer: { type: 'shadow' }
			},
			legend: {
				data: ['文件数量', '章节总数', '切片总数'],
				top: 30
			},
			xAxis: {
				type: 'category',
				data: displayRanges.map(r => r.name),
				axisLabel: {
					rotate: selected ? 0 : 30
				}
			},
			yAxis: { type: 'value', name: '数量' },
			series: [
				{
					name: '文件数量',
					type: 'bar',
					data: displayRanges.map(r => r.fileCount),
					itemStyle: { color: '#3498db' }
				},
				{
					name: '章节总数',
					type: 'bar',
					data: displayRanges.map(r => r.chapters),
					itemStyle: { color: '#e67e22' }
				},
				{
					name: '切片总数',
					type: 'bar',
					data: displayRanges.map(r => r.chunks),
					itemStyle: { color: '#2ecc71' }
				}
			]
		};

		chartInstance.setOption(option);
	}

	onMount(() => {
		chartInstance = echarts.init(chartContainer);
		updateChart();
		// 响应窗口大小变化
		// 使用 ResizeObserver 监听容器大小变化
		resizeObserver = new ResizeObserver(entries => {
			for (let entry of entries) {
				if (entry.target === chartC && chartInstance) {
					chartInstance.resize();
				}
			}
		});

		resizeObserver.observe(chartC);
	});

	// 组件销毁时清理
	onDestroy(() => {
		if (resizeObserver) {
			resizeObserver.unobserve(chartC);
			resizeObserver.disconnect();
		}
		if (chartInstance && !chartInstance.isDisposed()) {
			chartInstance.dispose();
		}
	});
</script>

<div bind:this={chartC} class="chart-container">
	<div bind:this={chartContainer} style="width: 100%; height: 400px;"></div>
</div>

<style>
    .chart-container {
        background: white;
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }
</style>
