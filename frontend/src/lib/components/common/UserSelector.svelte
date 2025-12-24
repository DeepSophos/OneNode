<!-- UserSelector.svelte -->
<script lang="ts">
    import {createEventDispatcher, onMount} from 'svelte';
    import {fade, fly} from 'svelte/transition';

    const dispatch = createEventDispatcher();

    // Props
    export let visible = false;
    export let title = '选择用户';
    export let multiple = true; // 是否支持多选
    export let users = []; // 用户数据列表
    export let selectedUsers = []; // 预选用户（用于编辑模式）
    export let searchable = true; // 是否支持搜索
    export let placeholder = '搜索用户...';
    export let confirmText = '确定';
    export let cancelText = '取消';

    // 内部状态
    let searchTerm = '';
    let selectedUserIds = new Set();
    let filteredUsers = [];

    // 计算属性
    $: filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    $: selectedCount = selectedUserIds.size;

    // 初始化选中状态
    $: if (visible && selectedUsers.length > 0) {
        selectedUserIds = new Set(selectedUsers.map(user => user.id));
    }

    // 获取角色显示名称和样式
    function getRoleDisplayName(role) {
        const roleMap = {
            'admin': '管理员',
            'kbman': '知识集管理员',
            'user': '用户'
        };
        return roleMap[role.toLowerCase()] || role;
    }

    function getRoleStyleClasses(role) {
        const roleStyles = {
            'admin': 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
            'kbman': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
            'user': 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
        };
        return roleStyles[role.toLowerCase()] || roleStyles['user'];
    }

    // 切换用户选择
    function toggleUser(user) {
        if (multiple) {
            if (selectedUserIds.has(user.id)) {
                selectedUserIds.delete(user.id);
            } else {
                selectedUserIds.add(user.id);
            }
            selectedUserIds = new Set(selectedUserIds);
        } else {
            // 单选模式
            selectedUserIds = new Set([user.id]);
        }
    }

    // 全选/取消全选
    function toggleSelectAll() {
        if (selectedUserIds.size === filteredUsers.length) {
            selectedUserIds.clear();
        } else {
            selectedUserIds = new Set(filteredUsers.map(user => user.id));
        }
        selectedUserIds = new Set(selectedUserIds);
    }

    // 确认选择
    function confirmSelection() {
        const selected = users.filter(user => selectedUserIds.has(user.id));
        dispatch('confirm', {
            selUsers: selected,
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
        selectedUserIds.clear();
        selectedUserIds = new Set(selectedUserIds);
    }

    // 重置选择
    function resetSelection() {
        selectedUserIds.clear();
        selectedUserIds = new Set(selectedUserIds);
    }

    onMount(async () => {

    });
</script>

{#if visible}
    <!-- 遮罩层 -->
    <div
            class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 text-sm "
            transition:fade={{ duration: 200 }}
    >
        <!-- 模态框 -->
        <div
                class="flex flex-col bg-white dark:bg-gray-900 rounded-xl shadow-2xl w-[65vw] h-[70vh] "
                transition:fly={{ y: 20, duration: 300 }}
                on:click|stopPropagation
        >
            <!-- 头部 -->
            <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                <div class="flex items-center">
                    <h3 class="font-bold text-gray-900 dark:text-white mr-4">{title}</h3>
                    {#if multiple}
                        <span class="text-sm text-gray-500 dark:text-gray-400">
                            已选择 <span class="font-medium text-blue-600 dark:text-blue-400">{selectedCount}</span> 个用户
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
                        {#if multiple && filteredUsers.length > 0}
                            <button
                                    class="px-3 py-2 text-sm bg-blue-100 hover:bg-blue-200 text-blue-700 dark:bg-blue-900/30 dark:hover:bg-blue-800 dark:text-blue-300 rounded-lg transition-colors"
                                    on:click={toggleSelectAll}
                            >
                                {selectedUserIds.size === filteredUsers.length ? '取消全选' : '全选'}
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

            <!-- 用户列表 -->
            <div class="flex-1 overflow-y-auto p-4">
                {#if filteredUsers.length === 0}
                    <div class="flex flex-col items-center justify-center py-12 text-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-gray-400 mb-4"
                             fill="none"
                             viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                        </svg>
                        <p class="text-gray-500 dark:text-gray-400">
                            {searchTerm ? '未找到匹配的用户' : '暂无用户数据'}
                        </p>
                    </div>
                {:else}
                    <div class="grid grid-cols-1 sm:grid-cols-5 gap-3">
                        {#each filteredUsers as user (user.id)}
                            <div
                                    class="relative bg-white dark:bg-gray-700 rounded-lg border-2 p-2 cursor-pointer transition-all duration-200 hover:shadow-md group
                                    {selectedUserIds.has(user.id)
                                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 shadow-md'
                                        : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'}"
                                    on:click={() => toggleUser(user)}
                            >
                                <!-- 选中标识 -->
                                {#if selectedUserIds.has(user.id)}
                                    <div class="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white shadow-lg">
                                        <svg class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                            <path fill-rule="evenodd"
                                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                  clip-rule="evenodd"/>
                                        </svg>
                                    </div>
                                {/if}

                                <div class="flex items-center">
                                    <!-- 用户信息 -->
                                    <div class="flex-1 min-w-0">
                                        <div class="flex items-center mb-1">
                                            <h4 class="font-semibold text-gray-900 dark:text-white text-sm truncate mr-2">
                                                {user.name}
                                            </h4>
                                            <span class={`text-xs px-2 py-1 rounded-full ${getRoleStyleClasses(user.role)} flex items-center flex-shrink-0`}>
                                                {getRoleDisplayName(user.role)}
                                            </span>
                                        </div>
                                        <p class="text-xs text-gray-500 dark:text-gray-400 truncate">
                                            {user.email}
                                        </p>
                                    </div>
                                </div>
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
                        class="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
</style>