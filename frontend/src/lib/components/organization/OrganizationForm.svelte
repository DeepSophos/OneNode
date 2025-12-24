<!-- OrganizationForm.svelte - 修复版本 -->
<script lang="ts">
    import {createEventDispatcher} from 'svelte';

    export let editingOrg = null; // 编辑的组织机构数据，null表示新增

    const dispatch = createEventDispatcher();

    // 表单数据 - 仅保留三个必要字段
    let formData = {
        item_name: '',
        item_desc: '',
        unit_path: ''
    };

    // 表单验证错误
    let errors = {};

    // 用于标记是否已经初始化过，避免重复初始化
    let initialized = false;

    // 修复的响应式逻辑 - 只在组件初始化或editingOrg变化时设置一次
    $: if (editingOrg && !initialized) {
        formData = {
            item_name: editingOrg.item_name.trim() || '',
            item_desc: editingOrg.item_desc.trim() || '',
            unit_path: editingOrg.unit_path.trim() || ''
        };
        initialized = true;
    }

    // 当editingOrg发生变化时重新初始化
    $: if (editingOrg) {
        // 重置初始化状态，允许重新设置表单数据
        if (!initialized) {
            formData = {
                item_name: editingOrg.item_name.trim() || '',
                item_desc: editingOrg.item_desc.trim() || '',
                unit_path: editingOrg.unit_path.trim() || ''
            };
            initialized = true;
        }
    }

    // 验证表单
    function validateForm() {
        errors = {};

        if (!formData.item_name.trim()) {
            errors.item_name = '组织机构名称不能为空';
        }

        return Object.keys(errors).length === 0;
    }

    // 提交表单
    function handleSubmit() {
        if (validateForm()) {
            dispatch('submit', formData);
        }
    }

    // 关闭弹窗
    function handleClose() {
        // 重置初始化状态
        initialized = false;
        dispatch('close');
    }

    // 点击背景关闭弹窗
    function handleBackgroundClick(event) {
        if (event.target === event.currentTarget) {
            handleClose();
        }
    }
</script>
<!-- 弹窗背景 -->
<div
        class="fixed inset-0 bg-black bg-opacity-50  flex items-center justify-center z-50 text-sm"
        on:click={handleBackgroundClick}
>
    <!-- 弹窗内容 -->
    <div class="bg-gray-50 dark:bg-gray-850  rounded-lg shadow-xl w-[35vw] mx-4 max-h-[90vh] overflow-y-auto">
        <!-- 弹窗头部 -->
        <div class="flex items-center justify-between p-3 border-b border-gray-200 dark:border-gray-700">
            <div>
                <h3 class="text-sm font-bold text-gray-900 dark:text-white">
                    {editingOrg?.type === 'edit' ? '重命名组织机构' : '添加组织机构'}
                </h3>
            </div>
            <button
                    class=" p-2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-all duration-200 hover:scale-105"
                    on:click={handleClose}
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                     stroke="currentColor" class="w-6 h-6 group-hover:rotate-90 transition-transform duration-200">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
                </svg>
            </button>
        </div>

        <!-- 表单内容 -->
        <form on:submit|preventDefault={handleSubmit} class="p-6 space-y-4">
            <!-- 父级单位path -->
            <div>
                <label for="unitPath" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    所属单位
                </label>
                <input
                        disabled
                        id="unitPath"
                        type="text"
                        bind:value={formData.unit_path}
                        class="w-full rounded-lg py-2 px-4 text-sm  bg-gray-200 dark:text-gray-300 dark:bg-gray-700 outline-none cursor-not-allowed"
                />
            </div>
            <!-- 组织机构名称 -->
            <div>
                <label for="orgName" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    组织机构名称 <span class="text-red-500">*</span>
                </label>
                <input
                        id="orgName"
                        type="text"
                        bind:value={formData.item_name}
                        class="w-full rounded-lg py-2 px-4 text-sm  dark:bg-gray-900 outline-none"
                        placeholder="请输入组织机构名称"
                />
                {#if errors.item_name}
                    <p class="mt-1 text-sm text-red-600 dark:text-red-400">{errors.item_name}</p>
                {/if}
            </div>

            <!-- 描述 -->
            <div class="hidden">
                <label for="orgDescription" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    描述
                </label>
                <textarea
                        id="orgDescription"
                        bind:value={formData.item_desc}
                        rows="3"
                        class="w-full rounded-lg py-2 px-4 text-sm  dark:bg-gray-900 outline-none"
                        placeholder="请输入组织机构描述"
                ></textarea>
            </div>
        </form>

        <!-- 弹窗底部 -->
        <div class="flex items-center justify-end space-x-3 p-6 border-t border-gray-200 dark:border-gray-700">
            <button
                    type="button"
                    class="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                    on:click={handleClose}
            >
                取消
            </button>
            <button
                    type="button"
                    class="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                    on:click={handleSubmit}
            >
                {editingOrg?.type === 'edit' ? '保存' : '添加'}
            </button>
        </div>
    </div>
</div>

<style>
    /* 暗色模式支持 */
    @media (prefers-color-scheme: dark) {
        .bg-white {
            background-color: #1e1e1e;
        }

        .text-gray-900 {
            color: #fff;
        }

        .text-gray-500 {
            color: #a0aec0;
        }

        .border-gray-200 {
            border-color: #4a5568;
        }
    }
</style>