<script lang="ts">
    import {createEventDispatcher, onMount} from 'svelte';
    import {fade, fly} from 'svelte/transition';

    const dispatch = createEventDispatcher();

    // Props
    export let visible = false;
    export let title = '选择知识集';
    export let multiple = true; // 是否支持多选
    export let knowledgeBases = []; // 知识集数据列表
    export let selectedKnowledgeBases = []; // 预选知识集（用于编辑模式）
    export let searchable = true; // 是否支持搜索
    export let placeholder = '搜索知识集...';
    export let confirmText = '确定';
    export let cancelText = '取消';

    // 内部状态
    let searchTerm = '';
    let selectedKnowledgeIds = new Set();
    let filteredKnowledgeBases = [];

    // 计算属性
    $: filteredKnowledgeBases = knowledgeBases.filter(kb =>
        kb.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (kb.description && kb.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    $: selectedCount = selectedKnowledgeIds.size;

    // 初始化选中状态
    $: if (visible && selectedKnowledgeBases.length > 0) {
        selectedKnowledgeIds = new Set(selectedKnowledgeBases.map(kb => kb.id));
    }

    // 切换知识集选择
    function toggleKnowledge(kb) {
        if (multiple) {
            if (selectedKnowledgeIds.has(kb.id)) {
                selectedKnowledgeIds.delete(kb.id);
            } else {
                selectedKnowledgeIds.add(kb.id);
            }
            selectedKnowledgeIds = new Set(selectedKnowledgeIds);
        } else {
            // 单选模式
            selectedKnowledgeIds = new Set([kb.id]);
        }
    }

    // 全选/取消全选
    function toggleSelectAll() {
        if (selectedKnowledgeIds.size === filteredKnowledgeBases.length) {
            selectedKnowledgeIds.clear();
        } else {
            selectedKnowledgeIds = new Set(filteredKnowledgeBases.map(kb => kb.id));
        }
        selectedKnowledgeIds = new Set(selectedKnowledgeIds);
    }

    // 确认选择
    function confirmSelection() {
        const selected = knowledgeBases.filter(kb => selectedKnowledgeIds.has(kb.id));
        dispatch('confirm', {
            selKnowledge: selected,
            multiple
        });
        closeModal();
    }

    // 取消选择
    function cancelSelection() {
        dispatch('cancel');
        closeModal();
    }

    // 关闭模态框
    function closeModal() {
        visible = false;
        searchTerm = '';
        selectedKnowledgeIds.clear();
        selectedKnowledgeIds = new Set(selectedKnowledgeIds);
    }

    // 重置选择
    function resetSelection() {
        selectedKnowledgeIds.clear();
        selectedKnowledgeIds = new Set(selectedKnowledgeIds);
    }

    onMount(() => {

    });
</script>

{#if visible}
    <!-- 遮罩层 -->
    <div
            class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 text-sm"
            transition:fade={{ duration: 200 }}
    >
        <!-- 模态框 -->
        <div
                class="flex flex-col bg-white dark:bg-gray-900 rounded-xl shadow-2xl w-[65vw] h-[70vh]"
                transition:fly={{ y: 20, duration: 300 }}
                on:click|stopPropagation
        >
            <!-- 头部 -->
            <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                <div class="flex items-center">
                    <h3 class="font-bold text-gray-900 dark:text-white mr-4">{title}</h3>
                    {#if multiple}
                        <span class="text-sm text-gray-500 dark:text-gray-400">
                            已选择 <span
                                class="font-medium text-emerald-600 dark:text-emerald-400">{selectedCount}</span> 个知识集
                        </span>
                    {/if}
                </div>
                <button
                        class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                        on:click={cancelSelection}
                >
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                </button>
            </div>

            <!-- 搜索和操作栏 -->
            <div class="px-6 py-3 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
                <div class="flex flex-col sm:flex-row sm:items-center gap-3">
                    <!-- 搜索框 -->
                    {#if searchable}
                        <div class="flex-1 relative">
                            <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400"
                                 fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                            </svg>
                            <input
                                    type="text"
                                    bind:value={searchTerm}
                                    placeholder={placeholder}
                                    class="w-full  outline-none pl-10 pr-4 py-2 border border-gray-300  rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 text-sm"
                            />
                        </div>
                    {/if}

                    <!-- 操作按钮 -->
                    <div class="flex gap-2">
                        {#if multiple && filteredKnowledgeBases.length > 0}
                            <button
                                    class="px-3 py-2 text-sm bg-emerald-100 hover:bg-emerald-200 text-emerald-700 dark:bg-emerald-900/30 dark:hover:bg-emerald-800 dark:text-emerald-300 rounded-lg transition-colors"
                                    on:click={toggleSelectAll}
                            >
                                {selectedKnowledgeIds.size === filteredKnowledgeBases.length ? '取消全选' : '全选'}
                            </button>
                        {/if}

                        {#if selectedCount > 0}
                            <button
                                    class="px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-300 rounded-lg transition-colors"
                                    on:click={resetSelection}
                            >
                                清空选择
                            </button>
                        {/if}
                    </div>
                </div>
            </div>

            <!-- 知识集列表 -->
            <div class="flex-1 overflow-y-auto p-4">
                {#if filteredKnowledgeBases.length === 0}
                    <div class="flex flex-col items-center justify-center py-12 text-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                             stroke-width="2" stroke="currentColor"
                             class="h-16 w-16 text-gray-400 mb-4">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                  d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"/>
                        </svg>
                        <p class="text-gray-500 dark:text-gray-400">
                            {searchTerm ? '未找到匹配的知识集' : '暂无知识集数据'}
                        </p>
                    </div>
                {:else}
                    <div class="grid grid-cols-1 md:grid-cols-5 gap-4">
                        {#each filteredKnowledgeBases as kb (kb.id)}
                            <div
                                    class="relative bg-white dark:bg-gray-700 rounded-xl border
                                    {selectedKnowledgeIds.has(kb.id)
                                        ? 'border-blue-500 shadow-md'
                                        : 'border-gray-200 dark:border-gray-600'}
                                    transition-all duration-200 hover:shadow-md cursor-pointer p-3 h-auto flex flex-col justify-between group"
                                    on:click={() => toggleKnowledge(kb, event)}
                            >
                                <!-- 选中标识 -->
                                {#if selectedKnowledgeIds.has(kb.id)}
                                    <div class="absolute -top-2 -right-2 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center text-white shadow-lg">
                                        <svg class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                            <path fill-rule="evenodd"
                                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                  clip-rule="evenodd"/>
                                        </svg>
                                    </div>
                                {/if}
                                <div class="h-full flex flex-col">
                                    <div class="flex-1 min-w-0">
                                        <div class="flex items-start mb-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                 stroke-width="2" stroke="currentColor"
                                                 class="h-4 w-4 text-emerald-500 mr-1 mt-0.5 flex-shrink-0">
                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                      d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"/>
                                            </svg>
                                            <h3 class="font-medium text-gray-900 dark:text-white truncate text-sm">{kb.name}</h3>
                                        </div>
                                        <p class="text-xs text-gray-500 dark:text-gray-400 line-clamp-1 mt-1 pl-5 truncate max-w-full">
                                            {kb.description || "暂无描述信息"}
                                        </p>
                                    </div>
                                    <div class="mt-2 pt-2 border-t border-gray-100 dark:border-gray-600">
                                        <div class="flex items-center min-w-0">
                                            {#if kb.private}
                                                <div class="w-5 h-5 bg-gradient-to-br from-amber-400 to-orange-500 dark:from-amber-500 dark:to-orange-600 rounded-full flex items-center justify-center text-white text-xs font-medium mr-2 flex-shrink-0 shadow-sm">
                                                    私
                                                </div>
                                            {/if}
                                            <span class="text-xs text-gray-600 dark:text-gray-400 truncate">{kb.owner_name}  </span>
                                        </div>
                                    </div>
                                </div>
                                <!-- 悬停效果元素 -->
                                <div class="absolute inset-0 bg-gradient-to-t from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl pointer-events-none"></div>
                            </div>
                        {/each}
                    </div>
                {/if}
            </div>

            <!-- 底部按钮 -->
            <div class="px-6 py-2 rounded-b-xl border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 flex justify-end gap-3">
                <button
                        class="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                        on:click={cancelSelection}
                >
                    {cancelText}
                </button>
                <button
                        class="px-4 py-2 text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={selectedCount === 0}
                        on:click={confirmSelection}
                >
                    {confirmText} {selectedCount > 0 ? `(${selectedCount})` : ''}
                </button>
            </div>
        </div>
    </div>
{/if}

<style>
    /* 自定义滚动条 */
    .overflow-y-auto::-webkit-scrollbar {
        width: 8px;
    }

    .overflow-y-auto::-webkit-scrollbar-track {
        background: #f1f5f9;
        border-radius: 6px;
    }

    .overflow-y-auto::-webkit-scrollbar-thumb {
        background: #cbd5e1;
        border-radius: 6px;
    }

    .overflow-y-auto::-webkit-scrollbar-thumb:hover {
        background: #94a3b8;
    }

    .dark .overflow-y-auto::-webkit-scrollbar-track {
        background: #1e293b;
    }

    .dark .overflow-y-auto::-webkit-scrollbar-thumb {
        background: #475569;
    }

    .dark .overflow-y-auto::-webkit-scrollbar-thumb:hover {
        background: #64748b;
    }

    /* 单行文本截断 */
    .line-clamp-1 {
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
    }
</style>