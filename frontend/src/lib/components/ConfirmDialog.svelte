<!-- ConfirmDialog.svelte -->
<script lang="ts">
    import {createEventDispatcher} from 'svelte';
    import {fade, scale} from 'svelte/transition';

    const dispatch = createEventDispatcher();

    // 组件属性
    export let show = false;
    export let title = '确认操作';
    export let message = '确定要执行此操作吗？';
    export let confirmText = '确认';
    export let cancelText = '取消';
    export let confirmButtonClass = 'bg-red-600 hover:bg-red-700 text-white';
    export let cancelButtonClass = 'border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800';
    export let icon = 'warning'; // warning, danger, info, question
    export let size = 'md'; // sm, md, lg

    // 图标映射
    const icons = {
        warning: {
            path: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z",
            bgClass: "bg-yellow-100 dark:bg-yellow-900/30",
            iconClass: "text-yellow-600 dark:text-yellow-400"
        },
        danger: {
            path: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z",
            bgClass: "bg-red-100 dark:bg-red-900/30",
            iconClass: "text-red-600 dark:text-red-400"
        },
        info: {
            path: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
            bgClass: "bg-blue-100 dark:bg-blue-900/30",
            iconClass: "text-blue-600 dark:text-blue-400"
        },
        question: {
            path: "M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
            bgClass: "bg-purple-100 dark:bg-purple-900/30",
            iconClass: "text-purple-600 dark:text-purple-400"
        }
    };

    // 尺寸映射
    const sizes = {
        sm: 'max-w-sm',
        md: 'max-w-md',
        lg: 'max-w-lg'
    };

    $: currentIcon = icons[icon] || icons.warning;
    $: currentSize = sizes[size] || sizes.md;

    // 事件处理函数
    function handleCancel() {
        show = false;
        dispatch('cancel');
    }

    function handleConfirm() {
        show = false;
        dispatch('confirm');
    }

    function handleBackdropClick() {
        handleCancel();
    }

    // 键盘事件处理
    function handleKeydown(event) {
        if (!show) return;

        if (event.key === 'Escape') {
            handleCancel();
        }
    }
</script>

<svelte:window on:keydown={handleKeydown}/>

{#if show}
    <!-- 遮罩层 -->
    <div
            class="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999] flex items-center justify-center p-4"
            on:click={handleBackdropClick}
            transition:fade={{ duration: 200 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="dialog-title"
            aria-describedby="dialog-description"
    >
        <!-- 对话框 -->
        <div
                class="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 p-6 {currentSize} w-full mx-4"
                on:click|stopPropagation
                transition:scale={{ duration: 200, start: 0.95 }}
        >
            <!-- 图标 -->
            <div class="flex justify-center mb-4">
                <div class="w-12 h-12 rounded-full {currentIcon.bgClass} flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 {currentIcon.iconClass}" fill="none"
                         viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={currentIcon.path}/>
                    </svg>
                </div>
            </div>

            <!-- 标题 -->
            <h3 id="dialog-title" class="text-lg font-semibold text-gray-900 dark:text-white text-center mb-2">
                {title}
            </h3>

            <!-- 消息内容 -->
            <div id="dialog-description" class="text-gray-600 dark:text-gray-400 text-center mb-6 leading-relaxed">
                {#if typeof message === 'string'}
                    <p>{@html message}</p>
                {:else}
                    <slot name="message">
                        <p>{message}</p>
                    </slot>
                {/if}
            </div>

            <!-- 自定义内容插槽 -->
            <slot name="content"></slot>

            <!-- 按钮组 -->
            <div class="flex space-x-3">
                <!-- 取消按钮 -->
                <button
                        class="flex-1 px-4 py-2.5 rounded-xl {cancelButtonClass} transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
                        on:click={handleCancel}
                        type="button"
                >
                    {cancelText}
                </button>

                <!-- 确认按钮 -->
                <button
                        class="flex-1 px-4 py-2.5 rounded-xl {confirmButtonClass} transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
                        on:click={handleConfirm}
                        type="button"
                >
                    {confirmText}
                </button>
            </div>

            <!-- 自定义按钮插槽 -->
            <slot name="buttons"></slot>
        </div>
    </div>
{/if}
<!--使用样例
<ConfirmDialog
        bind:show={showClearConfirm}
        title="清除所有历史记录"
        message="确定要清除所有历史对话记录吗？<br><span class='text-red-600 dark:text-red-400 font-medium'>此操作无法撤销</span>"
        confirmText="清除全部"
        cancelText="取消"
        icon="danger"
        size="sm"
        on:confirm={handleClearConfirm}

/>
使用样例 end-->
<style>
    /* 确保对话框在最顶层 */
    :global(body:has(.confirm-dialog-open)) {
        overflow: hidden;
    }
</style>