<script lang="ts">
    import {addScopeFolder} from '$lib/apis/rag';
    import {createEventDispatcher} from "svelte";

    const dispatch = createEventDispatcher();
    import {toast} from 'svelte-sonner';

    export let visible = false;
    export let scopeName: string;
    export let parentFolderName: string;
    let defaultName = "新建目录";
    let title = "添加目录";
    let folderName = defaultName;
    let errorTip = ""; // 错误提示

    // 输入校验
    function validateInput() {
        const trimmed = folderName.trim();
        if (!trimmed) {
            errorTip = "目录名称不能为空";
            return false;
        }
        if (trimmed.length > 50) {
            errorTip = "目录名称不能超过50个字符";
            return false;
        }
        const invalidChars = /[\\/:*?"<>|]/;
        if (invalidChars.test(trimmed)) {
            errorTip = "不能包含 \\ / : * ? \" < > | 特殊字符";
            return false;
        }
        errorTip = "";
        return true;
    }

    // 确认按钮逻辑
    async function handleConfirm() {
        if (validateInput()) {
            let params = {
                scope_name: scopeName,
                folder_name: parentFolderName ? parentFolderName + '/' + folderName.trim() : folderName.trim()
            }
            await addScopeFolder(localStorage.token, params).then(response => {
                if (response?.status === 'success') {
                    folderName = defaultName; // 重置输入框
                    visible = false;
                    dispatch('confirm');
                } else {
                    toast.error(response?.detail || `目录创建失败`);
                }
            }).catch((err) => {
                toast.error(`目录创建失败:知识集不存在，请刷新后重试。`);
            })
        }
    }

    // 取消按钮逻辑
    function handleCancel() {
        folderName = defaultName; // 重置输入框
        errorTip = "";
        visible = false;
    }

</script>

{#if visible}
    <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div
                class="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-80 p-5"
                on:click|stopPropagation
        >
            <!-- 自定义标题 -->
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">{title}</h3>

            <!-- 输入框 -->
            <input
                    type="text"
                    bind:value={folderName}
                    class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white outline-none"
                    placeholder="请输入目录名称"
                    on:input={validateInput}
                    autofocus
            />

            <!-- 错误提示 -->
            {#if errorTip}
                <p class="text-red-500 text-xs mt-1">{errorTip}</p>
            {/if}

            <!-- 按钮组 -->
            <div class="flex justify-end gap-3 mt-4">
                <button
                        class="px-4 py-1.5 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        on:click={handleCancel}
                >
                    取消
                </button>
                <button
                        class="px-4 py-1.5 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                        on:click={handleConfirm}
                >
                    确认创建
                </button>
            </div>
        </div>
    </div>
{/if}