<script lang="ts">
    import {onMount, getContext, createEventDispatcher} from 'svelte';
    import {fade, fly} from 'svelte/transition';
    import {reviewFeedback} from "$lib/apis/chats"
    import {toast} from "svelte-sonner";
    import ConfirmDialog from "$lib/components/ConfirmDialog.svelte";
    import {cleanMessageContent, restoreImageReferences} from '$lib/utils/messageUtils';

    const i18n = getContext('i18n');
    const dispatch = createEventDispatcher();

    export let visible = false;
    export let scopeName: string;
    export let feedbacks = [];
    export let isAuthor = false;
    export let getFeedbackList = null;

    let selectedFeedback = null;
    let diffLines = [];
    let originalScrollRef: HTMLElement;
    let correctedScrollRef: HTMLElement;
    let isScrolling = false;
    let isEditing = false;
    let editingContent = '';

    // 状态过滤相关 - 使用响应式变量存储过滤后的列表
    let selectedStatus = 'pending'; // 默认为待处理
    let filteredFeedbacks = []; // 存储过滤后的反馈列表，确保响应式更新
    const statusOptions = [
        {value: 'pending', label: '待处理'},
        {value: 'pass', label: '已通过'},
        {value: 'reject', label: '已拒绝'}
    ];

    // 状态颜色映射
    const statusConfig = {
        pending: {bg: 'bg-amber-100 text-amber-800', text: 'text-amber-800', label: '待处理'},
        pass: {bg: 'bg-green-100 text-green-800', text: 'text-green-800', label: '已通过'},
        reject: {bg: 'bg-red-100 text-red-800', text: 'text-red-800', label: '已拒绝'}
    };

    // 根据选中的状态过滤反馈列表
    function updateFilteredFeedbacks() {
        filteredFeedbacks = feedbacks.filter(feedback => feedback.status === selectedStatus);
        filteredFeedbacks = [...filteredFeedbacks];
    }

    // 优化的 LCS (最长公共子序列) Diff 算法
    function calculateDiff(original, corrected) {
        if (!original && !corrected) return [];

        const originalLines = (original || '').split('\n');
        const correctedLines = (corrected || '').split('\n');

        // 使用 LCS 算法找到最长公共子序列
        const lcs = getLCS(originalLines, correctedLines);

        // 基于 LCS 结果生成 diff
        return generateDiffFromLCS(originalLines, correctedLines, lcs);
    }

    // 计算最长公共子序列
    function getLCS(arr1, arr2) {
        const m = arr1.length;
        const n = arr2.length;
        const dp = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));

        // 构建 DP 表
        for (let i = 1; i <= m; i++) {
            for (let j = 1; j <= n; j++) {
                if (arr1[i - 1] === arr2[j - 1]) {
                    dp[i][j] = dp[i - 1][j - 1] + 1;
                } else {
                    dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
                }
            }
        }

        // 回溯找到 LCS
        const lcs = [];
        let i = m, j = n;
        while (i > 0 && j > 0) {
            if (arr1[i - 1] === arr2[j - 1]) {
                lcs.unshift({i: i - 1, j: j - 1, line: arr1[i - 1]});
                i--;
                j--;
            } else if (dp[i - 1][j] > dp[i][j - 1]) {
                i--;
            } else {
                j--;
            }
        }

        return lcs;
    }

    // 基于 LCS 生成 diff 结果
    function generateDiffFromLCS(originalLines, correctedLines, lcs) {
        const result = [];
        let originalIndex = 0;
        let correctedIndex = 0;
        let lcsIndex = 0;
        let lineNumber = 1;

        while (originalIndex < originalLines.length || correctedIndex < correctedLines.length) {
            const currentLCS = lcs[lcsIndex];

            // 如果当前位置在 LCS 中
            if (currentLCS && originalIndex === currentLCS.i && correctedIndex === currentLCS.j) {
                result.push({
                    type: 'equal',
                    original: originalLines[originalIndex],
                    corrected: correctedLines[correctedIndex],
                    originalLineNumber: originalIndex + 1,
                    correctedLineNumber: correctedIndex + 1,
                    displayLineNumber: lineNumber++
                });
                originalIndex++;
                correctedIndex++;
                lcsIndex++;
            } else {
                // 处理删除的行
                if (originalIndex < originalLines.length &&
                    (!currentLCS || originalIndex < currentLCS.i)) {
                    result.push({
                        type: 'removed',
                        original: originalLines[originalIndex],
                        corrected: '',
                        originalLineNumber: originalIndex + 1,
                        correctedLineNumber: null,
                        displayLineNumber: lineNumber++
                    });
                    originalIndex++;
                }

                // 处理添加的行
                if (correctedIndex < correctedLines.length &&
                    (!currentLCS || correctedIndex < currentLCS.j)) {
                    result.push({
                        type: 'added',
                        original: '',
                        corrected: correctedLines[correctedIndex],
                        originalLineNumber: null,
                        correctedLineNumber: correctedIndex + 1,
                        displayLineNumber: lineNumber++
                    });
                    correctedIndex++;
                }
            }
        }

        return result;
    }

    // 同步滚动处理
    function handleScroll(event, isOriginal = true) {
        if (isScrolling) return;

        isScrolling = true;
        const sourceElement = event.target;
        const targetElement = isOriginal ? correctedScrollRef : originalScrollRef;

        if (targetElement) {
            targetElement.scrollTop = sourceElement.scrollTop;
        }

        requestAnimationFrame(() => {
            isScrolling = false;
        });
    }

    // 选择问题
    function selectQuestionChange(item) {
        selectedFeedback = item;
        // 重置滚动位置和编辑状态
        if (originalScrollRef) originalScrollRef.scrollTop = 0;
        if (correctedScrollRef) correctedScrollRef.scrollTop = 0;
        isEditing = false;
        editingContent = '';
        if (selectedFeedback) {
            let originalLines = cleanMessageContent(selectedFeedback.original_answer);
            let correctedLines = cleanMessageContent(selectedFeedback.corrected_answer);
            diffLines = calculateDiff(
                originalLines,
                correctedLines
            );
        }
    }

    // 切换状态过滤时重置选中项并强制刷新列表
    function handleStatusChange(status) {
        // 强制状态更新
        selectedStatus = status;
        // 更新过滤列表
        updateFilteredFeedbacks();

        selectedFeedback = null
        diffLines = []; // 清空差异显示
    }

    // 获取状态显示文本
    function getStatusText(status) {
        return statusConfig[status]?.label || status;
    }

    // 获取状态样式
    function getStatusClass(status) {
        return statusConfig[status] || {bg: 'bg-gray-100 text-gray-800', text: 'text-gray-800', label: '未知'};
    }

    // 采纳反馈
    async function acceptFeedback() {
        if (!selectedFeedback) return;
        const param = {
            message_id: selectedFeedback.message_id,
            original_answer: selectedFeedback.original_answer,
            corrected_answer: selectedFeedback.corrected_answer,
            status: 'pass',
            scopes: selectedFeedback.scopes,
            feedback: selectedFeedback.feedback
        }
        await reviewFeedback(localStorage.token, param).then((res) => {
            if (res) {
                toast.success('操作成功')
                feedbacks.forEach(item => {
                    if (item.message_id === selectedFeedback.message_id) {
                        item.status = 'pass';
                    }
                })
                feedbacks = [...feedbacks];
                handleStatusChange(selectedStatus);
            } else {
                toast.error('操作失败')
            }
        })
    }



    // 拒绝反馈
    async function rejectFeedback() {
        if (!selectedFeedback) return;
        const param = {
            message_id: selectedFeedback.message_id,
            original_answer: selectedFeedback.original_answer,
            corrected_answer: selectedFeedback.corrected_answer,
            status: 'reject',
            scopes: selectedFeedback.scopes,
            feedback: selectedFeedback.feedback
        }
        await reviewFeedback(localStorage.token, param).then((res) => {
            if (res) {
                toast.success('操作成功')
                feedbacks.forEach(item => {
                    if (item.message_id === selectedFeedback.message_id) {
                        item.status = 'reject';
                    }
                })
                feedbacks = [...feedbacks];
                handleStatusChange(selectedStatus);
            } else {
                toast.error('操作失败')
            }
        })
    }


    async function deleteFeedback() {
        if (!selectedFeedback) return;
        const param = {
            message_id: selectedFeedback.message_id,
            original_answer: selectedFeedback.original_answer,
            corrected_answer: selectedFeedback.corrected_answer,
            status: `${selectedFeedback.status}-delete`,
            scopes: selectedFeedback.scopes,
            feedback: selectedFeedback.feedback
        }
        await reviewFeedback(localStorage.token, param).then(async (res) => {
            if (res) {
                toast.success('操作成功')
                feedbacks = await getFeedbackList();
                handleStatusChange(selectedStatus);
            } else {
                toast.error('操作失败')
            }
        })
    }


    // 开始编辑
    function startEditing() {
        if (!selectedFeedback) return;
        isEditing = true;
        editingContent = cleanMessageContent(selectedFeedback.corrected_answer) || '';
    }

    // 取消编辑
    function cancelEditing() {
        isEditing = false;
        editingContent = '';
    }

    // 保存编辑
    async function saveEditing() {
        if (!selectedFeedback) return;

        const param = {
            message_id: selectedFeedback.message_id,
            original_answer: selectedFeedback.original_answer,
            corrected_answer: restoreImageReferences(editingContent),
            status: selectedFeedback.status,
            scopes: selectedFeedback.scopes,
            feedback: selectedFeedback.feedback
        }

        await reviewFeedback(localStorage.token, param).then((res) => {
            if (res) {
                selectedFeedback.corrected_answer = restoreImageReferences(editingContent);
                isEditing = false;
                // 重新计算差异显示
                let originalLines = cleanMessageContent(selectedFeedback.original_answer);
                let correctedLines = cleanMessageContent(selectedFeedback.corrected_answer);
                diffLines = calculateDiff(
                    originalLines,
                    correctedLines
                );
                feedbacks.forEach(item => {
                    if (item.message_id === selectedFeedback.message_id) {
                        item.corrected_answer = restoreImageReferences(editingContent);
                    }
                })
                feedbacks = [...feedbacks];
                toast.success('保存成功')
            } else {
                toast.error('操作失败')
            }
        })

    }

    function cancelSelection() {
        dispatch('cancel');
        closeModal();
    }

    function closeModal() {
        visible = false;
        isEditing = false;
        editingContent = '';
        selectedFeedback = null;
        diffLines = [];
        selectedStatus = 'pending'; // 重置为默认状态
        updateFilteredFeedbacks(); // 重置过滤列表
    }

    let showFeedbackConfirm = false;
    let feedbackOperationType = '';

    function openFeedbackConfirm(type) {
        feedbackOperationType = type;
        showFeedbackConfirm = true;
    }

    const operationStyles: Record<string, string> = {
        pass:   "<span class='bg-red-100 text-red-800'>【通过】</span>",
        reject: "<span class='bg-green-100 text-green-800'>【拒绝】</span>",
        delete: "<span class='bg-yellow-100 text-yellow-800'>【删除】</span>"
    };

    function handleOperationConfirm() {
        if (feedbackOperationType === 'pass') {
            acceptFeedback();
        } else if (feedbackOperationType === 'reject') {
            rejectFeedback();
        }
        else if (feedbackOperationType === "delete") {
            deleteFeedback();
        }
        showFeedbackConfirm = false;
    }

    function handleDelete(chat_id) {
        const fds = feedbacks.filter(feedback => feedback.message_id === chat_id);
        selectedFeedback = fds[0];
        feedbackOperationType = "delete";
        showFeedbackConfirm = true;
    }

    onMount(() => {
        // 初始化时加载默认状态的问题列表
        updateFilteredFeedbacks();
        handleStatusChange(selectedStatus);
    });

    // 监听feedbacks变化，自动更新过滤列表
    $: if (feedbacks) {
        updateFilteredFeedbacks();
    }
</script>

{#if visible}
    <!-- 遮罩层 -->
    <div
            class="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-0"
            transition:fade={{ duration: 200 }}
    >
        <!-- 模态框 -->
        <div
                class="flex flex-col bg-white dark:bg-gray-900 shadow-2xl w-[100vw] h-[100vh] overflow-hidden"
                transition:fly={{ y: 20, duration: 300 }}
                on:click|stopPropagation
        >
            <!-- 头部 -->
            <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700">
                <div class="flex items-center justify-between">
                    <div class="flex items-center gap-2">
                        <h3 class="text-lg font-bold text-gray-900 dark:text-white">
                            用户对答案的改进 - {scopeName || ''}
                        </h3>
                    </div>

                    <div class="flex items-center gap-3">
                        <button
                                class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                                on:click={cancelSelection}
                        >
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                      d="M6 18L18 6M6 6l12 12"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            <!-- 主要内容区域 -->
            <div class="flex flex-1 overflow-hidden">
                <!-- 左侧问题列表 -->
                <div class="w-80 bg-gray-50 dark:bg-gray-800 flex flex-col">
                    <div class="flex flex-col bg-white dark:bg-gray-700">
                        <div class="flex justify-between items-center p-2">
                            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">问题列表</h3>
                        </div>

                        <!-- 状态过滤选择器 -->
                        <div class="px-0 pb-0 flex gap-0 flex-wrap">
                            {#each statusOptions as option}
                                <button
                                        class={`px-3 py-1.5 text-sm transition-colors ${
                                        selectedStatus === option.value
                                            ? `${statusConfig[option.value].bg} font-medium`
                                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-600 dark:text-gray-300 dark:hover:bg-gray-500'
                                    }`}
                                        on:click={() => handleStatusChange(option.value)}
                                        aria-pressed={selectedStatus === option.value}
                                >
                                    {option.label}
                                </button>
                            {/each}
                        </div>
                    </div>


                    <div class="flex-1 overflow-y-auto">
                        {#each filteredFeedbacks as question, index}
                            <div
                                class="m-3 p-4 rounded-lg cursor-pointer transition-all duration-200 border relative
                                   {selectedFeedback && selectedFeedback?.message_id === question.message_id
                                       ? 'bg-blue-50 border-blue-200 shadow-md ring-1 ring-blue-200 dark:bg-blue-900/20 dark:border-blue-700'
                                       : 'bg-white hover:bg-gray-50 border-gray-200 hover:border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:hover:bg-gray-600'}"
                                on:click={() => selectQuestionChange(question)}
                                role="button"
                                tabindex="0"
                            >
                                <div class="font-medium text-gray-900 dark:text-white mb-3 leading-5">
                                    {question.question}
                                </div>
                                <div class="flex flex-col gap-2">
                                    <span
                                        class="inline-block px-2 py-1 rounded-full text-xs font-medium w-fit
                                           {getStatusClass(question.status).bg} {getStatusClass(question.status).text}"
                                    >
                                        {getStatusText(question.status)}
                                    </span>
                                    <div class="flex items-center justify-between gap-2">
                                        <div class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                                            </svg>
                                            {question.user || '匿名用户'}
                                        </div>
                                        <button
                                            class="p-1.5 text-red-500 hover:text-red-600 hover:bg-red-100 dark:hover:bg-red-900/20 rounded-md transition-colors duration-200"
                                            on:click|stopPropagation={() => handleDelete(question.message_id)}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                 stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"/>
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        {:else}
                            <!-- 无过滤结果时显示 -->
                            <div class="flex flex-col items-center justify-center p-8 text-center text-gray-500">
                                <svg class="w-12 h-12 mb-3 text-gray-300" fill="none" stroke="currentColor"
                                     viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1"
                                          d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                                <p>没有找到{getStatusText(selectedStatus)}的反馈</p>
                            </div>
                        {/each}
                    </div>
                </div>

                <!-- 右侧比对视图 -->
                <div class="flex-1 flex flex-col bg-white dark:bg-gray-900">
                    {#if selectedFeedback}
                        <!-- 问题详情头部 -->
                        <div class="p-2">
                            <!-- 标题行 -->
                            <div class="flex items-center justify-between">
                                <h3 class="text-xl font-bold text-gray-900 dark:text-white">{selectedFeedback.question}</h3>
                                <!-- 操作按钮区域 -->
                                <div class="flex items-center gap-1">
                                    {#if selectedFeedback.status === 'pending' && !isEditing && isAuthor}
                                        <button
                                                class="px-4 py-1 bg-green-100 hover:bg-green-200 text-green-800 font-medium transition-colors flex items-center gap-2"
                                                on:click={() => {openFeedbackConfirm('pass')}}
                                        >
                                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                      d="M5 13l4 4L19 7"></path>
                                            </svg>
                                            通过
                                        </button>
                                        <button
                                                class="px-4 py-1 bg-red-100 hover:bg-red-200 text-red-800 font-medium transition-colors flex items-center gap-2"
                                                on:click={() => {openFeedbackConfirm('reject')}}
                                        >
                                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                      d="M6 18L18 6M6 6l12 12"></path>
                                            </svg>
                                            拒绝
                                        </button>
                                        <button
                                                class="px-3 py-1 bg-blue-100 hover:bg-blue-200 text-blue-800 font-medium transition-colors flex items-center gap-2"
                                                on:click={startEditing}
                                        >
                                            <svg class="w-4 h-4" fill="none" stroke="currentColor"
                                                 viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                      stroke-width="2"
                                                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                                            </svg>
                                            编辑答案
                                        </button>
                                    {/if}
                                    <!--                                    <button-->
                                    <!--                                            class="px-3 py-1 bg-blue-100 hover:bg-blue-200 text-blue-800 font-medium transition-colors flex items-center gap-2"-->
                                    <!--                                            on:click={()=>{}}-->
                                    <!--                                    >-->
                                    <!--                                        <svg class="w-4 h-4" fill="none" stroke="currentColor"-->
                                    <!--                                             viewBox="0 0 24 24">-->
                                    <!--                                            <path stroke-linecap="round" stroke-linejoin="round"-->
                                    <!--                                                  stroke-width="2"-->
                                    <!--                                                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>-->
                                    <!--                                        </svg>-->
                                    <!--                                        预览-->
                                    <!--                                    </button>-->
                                </div>
                            </div>
                        </div>

                        <!-- 编辑模式 -->
                        {#if isEditing}
                            <div class="flex-1 flex flex-col p-2">
                                <div class="flex items-center justify-between mb-4">
                                    <h4 class="text-lg font-semibold text-gray-900 dark:text-white">编辑</h4>
                                    <div class="flex gap-1">
                                        <button
                                                class="px-4 py-1 bg-green-100 hover:bg-green-200 text-green-800 font-medium transition-colors"
                                                on:click={saveEditing}
                                        >
                                            保存
                                        </button>
                                        <button
                                                class="px-4 py-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium transition-colors"
                                                on:click={cancelEditing}
                                        >
                                            取消
                                        </button>
                                    </div>
                                </div>
                                <textarea
                                        bind:value={editingContent}
                                        class="flex-1 p-4 border border-gray-300 rounded-lg font-mono text-sm leading-relaxed resize-none dark:bg-gray-800 dark:border-gray-600 dark:text-white outline-none"
                                        placeholder="请输入修正后的答案..."
                                        on:keydown={(e) => e.stopPropagation()}
                                ></textarea>
                            </div>
                        {:else}
                            <!-- 比对视图 -->
                            <div class="flex-1 flex overflow-hidden">
                                <!-- 原始答案面板 -->
                                <div class="flex-1 flex flex-col ">
                                    <div class="px-2 py-1 border-b border-gray-200 font-semibold text-gray-800 dark:text-white text-sm flex items-center gap-2">
                                        原始答案
                                    </div>
                                    <div
                                            bind:this={originalScrollRef}
                                            class="flex-1 overflow-y-auto text-sm leading-relaxed bg-gray-50 dark:bg-gray-800"
                                            on:scroll={(e) => handleScroll(e, true)}
                                    >
                                        {#each diffLines as line, index}
                                            <div class="flex min-h-7 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors
                                                       {line.type === 'removed' ? 'bg-red-50 dark:bg-red-900/20' : ''}
                                                       {line.type === 'equal' ? 'bg-white dark:bg-gray-800' : ''}
                                                       {line.type === 'added' ? 'bg-gray-100 dark:bg-gray-700' : ''}">
                                                <span class="w-16 px-3 py-1 text-gray-400 bg-gray-100 dark:bg-gray-700 border-r border-gray-200 dark:border-gray-600 text-right select-none flex-shrink-0 text-xs font-mono">
                                                    {line.originalLineNumber || ''}
                                                </span>
                                                <span class="px-4 py-1 flex-1 whitespace-pre-wrap break-words">
                                                    {#if line.type === 'removed'}
                                                        <span class="bg-red-200 dark:bg-red-800/50 px-1 rounded">{line.original}</span>
                                                    {:else if line.type === 'equal'}
                                                        <span class="text-gray-700 dark:text-gray-300">{line.original}</span>
                                                    {:else if line.type === 'added'}
                                                        <span class="text-gray-400 italic text-xs"></span>
                                                    {/if}
                                                </span>
                                            </div>
                                        {/each}
                                    </div>
                                </div>

                                <!-- 修正答案面板 -->
                                <div class="flex-1 flex flex-col">
                                    <div class="px-2 py-1 border-b border-gray-200 font-semibold text-gray-800 dark:text-white text-sm flex items-center gap-2">
                                        修正答案
                                    </div>
                                    <div
                                            bind:this={correctedScrollRef}
                                            class="flex-1 overflow-y-auto text-sm leading-relaxed bg-gray-50 dark:bg-gray-800"
                                            on:scroll={(e) => handleScroll(e, false)}
                                    >
                                        {#each diffLines as line, index}
                                            <div class="flex min-h-7 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors
                                                       {line.type === 'added' ? 'bg-green-50 dark:bg-green-900/20' : ''}
                                                       {line.type === 'equal' ? 'bg-white dark:bg-gray-800' : ''}
                                                       {line.type === 'removed' ? 'bg-gray-100 dark:bg-gray-700' : ''}">
                                                <span class="w-16 px-3 py-1 text-gray-400 bg-gray-100 dark:bg-gray-700 border-r border-gray-200 dark:border-gray-600 text-right select-none flex-shrink-0 text-xs font-mono">
                                                    {line.correctedLineNumber || ''}
                                                </span>
                                                <span class="px-4 py-1 flex-1 whitespace-pre-wrap break-words">
                                                    {#if line.type === 'added'}
                                                        <span class="bg-green-200 dark:bg-green-800/50 px-1 rounded">{line.corrected}</span>
                                                    {:else if line.type === 'equal'}
                                                        <span class="text-gray-700 dark:text-gray-300">{line.corrected}</span>
                                                    {:else if line.type === 'removed'}
                                                        <span class="text-gray-400 italic text-xs"></span>
                                                    {/if}
                                                </span>
                                            </div>
                                        {/each}
                                    </div>
                                </div>
                            </div>
                        {/if}
                    {:else}
                        <!-- 空状态 -->
                        <div class="flex-1 flex flex-col items-center justify-center">
                            <div class="text-center max-w-md flex flex-col items-center">
                                <svg class="w-12 h-12 mb-3 text-gray-300" fill="none" stroke="currentColor"
                                     viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1"
                                          d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                                <p class="text-gray-500 dark:text-gray-400 mb-4">
                                    暂无数据...
                                </p>
                            </div>
                        </div>
                    {/if}
                </div>
            </div>
        </div>
    </div>

{/if}
<ConfirmDialog
        bind:show={showFeedbackConfirm}
        title="确认操作"
        message={`确认 ${operationStyles[feedbackOperationType]} 吗？`}
        icon="danger"
        size="sm"
        on:confirm={handleOperationConfirm}
        on:cancel={()=>{showFeedbackConfirm = false;}}
/>