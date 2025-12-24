<script>
    import {onMount, createEventDispatcher} from 'svelte';
    import * as echarts from 'echarts';

    export let data = {
        nodes: [
            {id: 'node1', name: '节点1', symbolSize: 20, desc: '这是节点1的详细描述信息', category: '核心节点'},
            {id: 'node2', name: '节点2', symbolSize: 25, desc: '节点2是关键中转节点', category: '中转节点'},
            {id: 'node3', name: '节点3', symbolSize: 20, desc: '节点3主要处理数据输入', category: '功能节点'},
            {id: 'node4', name: '节点4', symbolSize: 18, desc: '节点4负责数据存储', category: '功能节点'},
            {id: 'node5', name: '节点5', symbolSize: 18, desc: '节点5负责数据清洗', category: '功能节点'},
            {id: 'node6', name: '节点6', symbolSize: 18, desc: '节点6负责数据输出', category: '功能节点'},
            {id: 'node7', name: '节点7', symbolSize: 18, desc: '节点7负责日志记录', category: '功能节点'}
        ],
        links: [
            {source: 'node1', target: 'node2'},
            {source: 'node1', target: 'node3'},
            {source: 'node2', target: 'node3'},
            {source: 'node2', target: 'node4'},
            {source: 'node2', target: 'node5'},
            {source: 'node2', target: 'node6'},
            {source: 'node2', target: 'node7'}
        ]
    };

    let chartDiv;
    let chartInstance;
    let selectedNode = null;
    const dispatch = createEventDispatcher();

    function initChart() {
        const theme = (localStorage.theme && localStorage.theme.indexOf('dark') > -1) ? 'dark' : 'light';
        const isDark = theme === 'dark';

        if (chartInstance) {
            chartInstance.dispose();
            chartInstance = null;
        }

        chartInstance = echarts.init(chartDiv);

        const nodeColors = {
            light: {
                normal: '#409eff',
                highlight: '#6aa1ff',
                selected: '#2766b2'
            },
            dark: {
                normal: '#5b8ff9',
                highlight: '#8badff',
                selected: '#3a6dc9'
            }
        };

        // 初始节点样式配置
        const baseNodeStyle = {
            normal: {
                color: nodeColors[theme].normal,
                borderColor: isDark ? '#888' : '#aaa',
                borderWidth: 1.5,
                shadowBlur: 12,
                shadowColor: 'rgba(0, 0, 0, 0.2)'
            },
            emphasis: {
                color: nodeColors[theme].highlight,
                shadowBlur: 15,
                shadowColor: 'rgba(64, 158, 255, 0.5)'
            }
        };

        const option = {
            tooltip: {
                trigger: 'item',
                backgroundColor: isDark ? 'rgba(30, 30, 30, 0.9)' : 'rgba(255, 255, 255, 0.9)',
                borderColor: isDark ? '#444' : '#ddd',
                borderWidth: 1,
                textStyle: {color: isDark ? '#fff' : '#333'},
                formatter: params => params.dataType === 'node'
                    ? `节点: ${params.name}`
                    : `连接: ${params.data.source} → ${params.data.target}`
            },
            animation: false,
            animationDuration: 0,
            animationEasingUpdate: 'quinticInOut',
            series: [{
                type: 'graph',
                layout: 'force',
                roam: true,
                focusNodeAdjacency: true,
                force: {
                    repulsion: 200,
                    edgeLength: 120,
                    layoutAnimation: false
                },
                data: data.nodes.map(node => ({
                    ...node,
                    symbolSize: node.symbolSize || 30,
                    itemStyle: baseNodeStyle.normal
                })),
                links: data.links,
                label: {
                    show: false, // 默认不显示名称
                    position: 'right',
                    formatter: '{b}',
                    color: isDark ? '#eee' : '#333',
                    fontSize: 12
                },
                lineStyle: {
                    color: isDark ? '#666' : '#ccc',
                    width: 1.5,
                    curveness: 0
                },
                itemStyle: baseNodeStyle.normal,
                emphasis: {
                    label: {show: true}, // 悬停显示名称
                    lineStyle: {
                        width: 3,
                        color: isDark ? '#8badff' : '#409eff'
                    },
                    itemStyle: baseNodeStyle.emphasis
                }
            }]
        };

        chartInstance.setOption(option);

        // 处理节点点击事件（不刷新整个图表）
        chartInstance.on('click', params => {
            if (params.componentType === 'series' && params.seriesType === 'graph' && params.dataType === 'node') {
                // 重置上一个选中节点的样式
                if (selectedNode) {
                    chartInstance.dispatchAction({
                        type: 'updateElement',
                        seriesIndex: 0,
                        dataIndex: data.nodes.findIndex(n => n.id === selectedNode.id),
                        itemStyle: baseNodeStyle.normal
                    });
                }

                // 设置当前选中节点的样式
                selectedNode = params.data;
                chartInstance.dispatchAction({
                    type: 'updateElement',
                    seriesIndex: 0,
                    dataIndex: params.dataIndex,
                    itemStyle: {
                        color: nodeColors[theme].selected,
                        borderColor: isDark ? '#888' : '#aaa',
                        borderWidth: 2, // 选中节点边框加粗
                        shadowBlur: 15,
                        shadowColor: 'rgba(64, 158, 255, 0.5)'
                    }
                });

                // 派发事件
                dispatch('pointClick', {
                    data: params.data,
                    dataType: params.dataType,
                    event: params.event
                });
            }
        });
    }

    function resize() {
        chartInstance?.resize();
    }

    onMount(() => {
        initChart();
        const resizeHandler = () => resize();
        window.addEventListener('resize', resizeHandler);
        return () => {
            window.removeEventListener('resize', resizeHandler);
            chartInstance?.dispose();
        };
    });
</script>

<div class="w-full h-full flex flex-col">
    <div class="w-full h-[50%] border-b border-gray-100">
        <div bind:this={chartDiv} class="w-full h-full"></div>
    </div>
    <div class="w-full h-[50%] overflow-auto box-sizing: border-box">
        {#if selectedNode}
            <pre class=" text-sm p-2 leading-relaxed"> {JSON.stringify(selectedNode, null, 2)} </pre>
        {:else}
            <!-- 未选中状态 -->
            <div class="h-full flex flex-col items-center justify-center text-gray-400 dark:text-gray-500">
                <p class="text-sm mt-1">选中节点查看JSON数据</p>
            </div>
        {/if}
    </div>
</div>