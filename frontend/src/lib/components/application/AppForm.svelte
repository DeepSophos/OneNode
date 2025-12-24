<script>
    import {createEventDispatcher} from 'svelte';

    export let app = {
        id: '',
        name: '',
        description: '',
        isPublic: false,
        status: 0,
        category: ''
    };

    const dispatcher = createEventDispatcher();
    export let categories = [];


    let formData = {...app};

    let nameError = '';

    function handleSubmit() {
        // 重置错误提示
        nameError = '';
        const nameValue = formData.name ?? '';
        if (!nameValue.trim()) {
            nameError = '应用名称不能为空';
            return;
        }

        dispatcher('submit', formData);
    }

    function handleCancel() {
        dispatcher('cancel');
    }
</script>

<div class="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
    <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-xl w-full max-w-md border border-gray-200 dark:border-gray-700">
        <div class="flex justify-between items-center mb-6">
            <h2 class="text-xl font-semibold">{app.id ? '编辑应用' : '添加应用'}</h2>
            <button
                    aria-label="关闭"
                    class="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                    on:click={handleCancel}
            >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M6 18L18 6M6 6l12 12" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                </svg>
            </button>
        </div>

        <form class="space-y-5" on:submit|preventDefault={handleSubmit}>
            <!-- 应用名称（必输项） -->
            <div class="space-y-1">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    应用名称 <span class="text-red-500">*</span>
                </label>
                <input
                        aria-invalid={!!nameError}
                        bind:value={formData.name}
                        class="w-full rounded-lg py-2 px-4 text-sm dark:text-gray-300 dark:bg-gray-850 outline-none border
                           {nameError ? 'border-red-500 dark:border-red-500 ring-1 ring-red-500 dark:ring-red-500' : 'border-gray-300 dark:border-gray-600'}
                           focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 dark:focus:border-blue-400 transition-all"
                        on:input={() => nameError = ''}
                        placeholder="请输入应用名称"
                        type="text"
                />
                {#if nameError}
                    <p class="text-xs text-red-500 dark:text-red-500 mt-1 flex items-center">
                        {nameError}
                    </p>
                {/if}
            </div>

            <!-- 分类下拉框 -->
            <div class="space-y-2">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">分类</label>
                <select
                        bind:value={formData.category}
                        class="w-full rounded-lg py-2 px-4 text-sm dark:text-gray-300 dark:bg-gray-850 outline-none border border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 dark:focus:border-blue-400 transition-colors"
                >
                    {#each categories as item}
                        <option value={item.value}>{item.label}</option>
                    {/each}
                </select>
            </div>

            <!-- 描述 -->
            <div class="space-y-2">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">描述</label>
                <textarea
                        bind:value={formData.description}
                        class="w-full rounded-lg py-2 px-4 text-sm dark:text-gray-300 dark:bg-gray-850 outline-none border border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 dark:focus:border-blue-400 transition-colors"
                        placeholder="请输入描述（可选）"
                        rows="3"
                ></textarea>
            </div>

            <!-- 公开私有开关 -->
            <div class="flex items-center space-x-2">
                <label class="text-sm font-medium text-gray-700 dark:text-gray-300">公开状态</label>
                <label class="relative inline-flex items-center cursor-pointer">
                    <input
                            bind:checked={formData.isPublic}
                            class="sr-only peer"
                            type="checkbox"
                    />
                    <div class="w-11 h-6 bg-gray-200 dark:bg-gray-700 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600 dark:peer-checked:bg-blue-500"></div>
                </label>
            </div>

            <div class="flex justify-end space-x-3 mt-4">
                <button
                        class="px-4 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-850 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                        on:click={handleCancel}
                        type="button"
                >
                    取消
                </button>
                <button
                        class="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                        type="submit"
                >
                    保存
                </button>
            </div>
        </form>
    </div>
</div>