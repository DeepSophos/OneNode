<script>
    import {onMount, createEventDispatcher} from 'svelte';
    import * as echarts from 'echarts';
    import Markdown from "$lib/components/chat/Messages/Markdown.svelte";

    export let show = false;
    // 新增：关闭模态框的回调
    const dispatch = createEventDispatcher();

    function closeModal() {
        selectedNode = null;
        show = false;
        dispatch('close');
    }

    export let data = null;

    let chartDiv;
    let chartInstance;
    let selectedNode = null;

    function initChart() {
        if (!data || !data.nodes || !data.links) {
            return;
        }
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

            animation: false,
            animationDuration: 0,
            animationEasingUpdate: 'quinticInOut',
            series: [{
                type: 'graph',
                fitView: true,
                fitViewPadding: [30, 30, 30, 30],  // 上下左右留白
                layout: 'force',
                roam: true,
                edgeSymbol: ['circle', 'arrow'],
                edgeSymbolSize: [3, 8],
                focusNodeAdjacency: true,
                force: {
                    repulsion: 200,
                    edgeLength: 120,
                    layoutAnimation: false
                },
                data: data.nodes.map(node => ({
                    ...node,
                    symbolSize: node.symbolSize || 30
                })),
                links: data.links,
                label: {
                    show: false,
                    position: 'top',
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
                    label: {show: true},
                    lineStyle: {
                        width: 3,
                        color: isDark ? '#8badff' : '#409eff'
                    }
                }
            }]
        };

        chartInstance.setOption(option);

        chartInstance.on('click', params => {
            if (params.componentType === 'series' && params.seriesType === 'graph' && params.dataType === 'node') {
                if (selectedNode) {
                    chartInstance.dispatchAction({
                        type: 'updateElement',
                        seriesIndex: 0,
                        dataIndex: data.nodes.findIndex(n => n.id === selectedNode.id),
                        itemStyle: baseNodeStyle.normal
                    });
                }

                selectedNode = params.data;
                chartInstance.dispatchAction({
                    type: 'updateElement',
                    seriesIndex: 0,
                    dataIndex: params.dataIndex,
                    itemStyle: {
                        color: nodeColors[theme].selected,
                        borderColor: isDark ? '#888' : '#aaa',
                        borderWidth: 2,
                        shadowBlur: 15,
                        shadowColor: 'rgba(64, 158, 255, 0.5)'
                    }
                });

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

    // 新增：模态框显示状态变化时重新初始化图表
    $: if (show && data && chartDiv) {
        initChart();
        setTimeout(resize, 0);
    }

    onMount(() => {
        const resizeHandler = () => resize();
        window.addEventListener('resize', resizeHandler);
        return () => {
            window.removeEventListener('resize', resizeHandler);
            if (chartInstance) {
                chartInstance.dispose();
            }
        };
    });


    let dialog;
    // 是否正在拖拽
    let isDragging = false;
    // 鼠标按下时的偏移
    let offsetX = 0;
    let offsetY = 0;
    // 当前 translate 值
    let left = 0;
    let top = 0;


    // 拖拽功能
    function handleMouseDown(e) {
        const rect = dialog.getBoundingClientRect();
        if (e.clientY - rect.top > 56) return;

        document.body.style.cursor = 'move';

        isDragging = true;
        offsetX = e.clientX - rect.left;
        offsetY = e.clientY - rect.top;
        e.preventDefault();
    }

    /** 全局鼠标移动 */
    function handleMouseMove(e) {
        if (!isDragging) return;

        const newX = e.clientX - offsetX;
        const newY = e.clientY - offsetY;

        const rect = dialog.getBoundingClientRect();
        const maxX = window.innerWidth - rect.width;
        const maxY = window.innerHeight - rect.height;

        left = Math.max(0, Math.min(newX, maxX));
        top = Math.max(0, Math.min(newY, maxY));
    }

    /** 全局鼠标松开 */
    function handleMouseUp() {
        isDragging = false;
        document.body.style.cursor = 'default';
    }

    $: if (isDragging) {
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    } else {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
    }
    $: if (dialog) {
        left = (document.body.clientWidth - (dialog?.clientWidth ?? 600)) / 2;
        top = (document.body.clientHeight - (dialog?.clientHeight ?? 600)) / 2;
    }
</script>

<!-- 模态框结构 -->
{#if show}

    <!-- 模态框主体 -->
    <div bind:this={dialog}
         class="fixed  z-50  bg-white dark:bg-gray-900 rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] flex  flex-col select-none"
         style:left={`${left}px` } style:top={`${top}px` }
         on:mousedown={handleMouseDown}
         role="dialog"
         aria-modal="true">

        <!-- 模态框头部（带关闭按钮） -->
        <div class="border-b dark:border-gray-700 px-6 py-4 flex justify-between items-center">
            <h3 class="text-lg font-semibold dark:text-white">知识图谱</h3>
            <button
                    class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                    on:click={closeModal}
            >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clip-rule="evenodd"/>
                </svg>
            </button>
        </div>

        <div class="flex-1 overflow-hidden flex justify-start">
            <div class="w-[40%] h-[50vh] dark:border-gray-700">
                <div bind:this={chartDiv} class="w-full h-full"></div>
            </div>
            <div class="flex-1 overflow-auto p-6 box-border bg-gray-50 dark:bg-gray-800">
                {#if selectedNode}
                    <div class="max-w-3xl mx-auto">
                        <h3 class="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100 border-b pb-2 dark:border-gray-700">
                            {selectedNode.name}
                        </h3>
                        <div class="markdown-content prose prose-gray dark:prose-invert prose-sm md:prose-base max-w-none">
                            <Markdown
                                    id={selectedNode.id}
                                    content={selectedNode.desc}
                                    class="space-y-4"
                            />
                        </div>
                    </div>
                {:else}
                    <div class="h-full flex items-center justify-center text-gray-400 dark:text-gray-500 ">
                        <div class="text-center p-6">
                            <svg class="w-12 h-12 mx-auto mb-3 opacity-50" fill="none" stroke="currentColor"
                                 viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                            </svg>
                            <p class="text-sm md:text-base">{selectedNode ? '暂无相关数据详情' : '选中左侧节点查看相关数据详情'}</p>
                        </div>
                    </div>
                {/if}
            </div>
        </div>
    </div>
{/if}