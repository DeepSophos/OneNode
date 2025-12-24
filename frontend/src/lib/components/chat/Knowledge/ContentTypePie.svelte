<script>
	import { onDestroy, onMount } from 'svelte';
	import * as echarts from 'echarts';

	export let totals;
	export let current;

	let chart;
	let chartContainer;
	let chartInstance;
	let resizeObserver;
	let chartC;
	$: if (chart && totals) {
		updateChart();
	}

	function updateChart() {
		const totalData = [
			{ value: totals.contentTypes.document, name: '文档' },
			{ value: totals.contentTypes.image, name: '图片' },
			{ value: totals.contentTypes.table, name: '表格' }
		];

		const currentData = current ? [
			{ value: current.contentTypes.document, name: '文档' },
			{ value: current.contentTypes.image, name: '图片' },
			{ value: current.contentTypes.table, name: '表格' }
		] : null;

		const option = {
			title: {
				text: current ? `${current.name}内容分布` : '全部内容类型分布',
				left: 'center'
			},
			tooltip: {
				trigger: 'item',
				formatter: '{a} <br/>{b}: {c} ({d}%)'
			},
			legend: {
				orient: 'vertical',
				right: 10,
				top: 'center'
			},
			series: [
				{
					name: '全部内容',
					type: 'pie',
					radius: ['50%', '70%'],
					avoidLabelOverlap: false,
					itemStyle: {
						borderRadius: 10,
						borderColor: '#fff',
						borderWidth: 2
					},
					label: { show: false },
					emphasis: {
						label: { show: true }
					},
					data: totalData,
					color: ['#3498db', '#2ecc71', '#9b59b6']
				},
				current && {
					name: '当前范围',
					type: 'pie',
					radius: ['30%', '45%'],
					itemStyle: {
						borderRadius: 10,
						borderColor: '#fff',
						borderWidth: 2
					},
					label: { show: false },
					data: currentData,
					color: ['#2980b9', '#27ae60', '#8e44ad']
				}
			].filter(Boolean)
		};
		chartInstance.setOption(option);
	}

	onMount(() => {
		chartInstance = echarts.init(chartContainer);
		updateChart();
		resizeObserver = new ResizeObserver(entries => {
			for (let entry of entries) {
				if (entry.target === chartC && chartInstance) {
					chartInstance.resize();
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
		if (chartInstance && !chartInstance.isDisposed()) {
			chartInstance.dispose();
		}
	});
</script>

<div bind:this={chartC} class="chart-container">
	<div bind:this={chartContainer} style="width: 100%; height: 345px;"></div>
</div>
<style>
    .chart-container {
        padding: 16px;
        background: white;
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }
</style>
