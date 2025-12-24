<script>
    import {createEventDispatcher} from "svelte";
    import {performFileOperationList} from '$lib/apis/chats';

    const dispatch = createEventDispatcher();
    export let groups = [];
    export let visible = false;
    export let scopeName = '';

    let selectedFiles = {};

    const toggleFile = (id) => {
        const file = groups.flatMap(group => group).find(file => file.id === id);
        if (file) {
            file.checked = !file.checked;
        }
    };

    const handleConfirm = async () => {
        const uncheckedNames = groups.flatMap(group =>
            group.filter(item => item.checked === false).map(item => item.name)
        );
        if (uncheckedNames.length > 0) {
            deleteUnselectedFiles(uncheckedNames).then(()=>{
                dispatch('confirm');
            });
        }
        else {
            dispatch('confirm');
        }
    };

    const deleteUnselectedFiles = async (unselectedFileNames) => {
        let opItems = unselectedFileNames.map((item) => {
            return {
                "keyname": item,
                "scope": scopeName,
                "status": 'unstaged',
                "operation": 'remove_from_staging',
                "data": {}
            }
        });

        const requestData = {
            "operations": opItems
        };

        await performFileOperationList(localStorage.token, requestData);
    }

</script>

{#if visible}
    <div class="fixed inset-0 bg-black bg-opacity-50 dark:bg-opacity-70 flex items-center justify-center z-50 transition-opacity duration-300">
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-5xl max-h-[80vh] flex flex-col animate-fade-in-up">
            <!-- 标题区域 -->
            <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                <h3 class="text-xl font-bold text-gray-800 dark:text-white mb-2">
                    选择需要保留的文件
                </h3>
                <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    为确保知识集的准确性，禁止上传相同内容的文件；请选择要保留的文件，未选择的将被删除。
                </p>
            </div>

            <!-- 文件列表区域 -->
            <div class="flex-1 overflow-y-auto p-4 space-y-6">
                {#each groups as group, groupIndex}
                    <div class="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden transition-all duration-200 hover:shadow-md dark:hover:shadow-gray-700/20">
                        <div class="divide-y divide-gray-100 dark:divide-gray-700">
                            {#each group as file, fileIndex}
                                <div class="flex items-center px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                                    <input
                                            type="checkbox"
                                            id={file.id}
                                            checked={file.checked}
                                            on:change={() => toggleFile(file.id)}
                                            class="h-4 w-4 text-blue-600 dark:text-blue-500 border-gray-300 dark:border-gray-600 rounded focus:ring-blue-500 dark:focus:ring-blue-600 transition duration-150 ease-in-out"
                                    />
                                    <label
                                            for={file.id}
                                            class="ml-3 text-gray-700 dark:text-gray-300 flex-1 cursor-pointer select-none"
                                    >
                                        {file.name}
                                    </label>
                                </div>
                            {/each}
                        </div>
                    </div>
                {/each}
            </div>

            <!-- 操作按钮区域 -->
            <div class="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-end space-x-3">
                <button
                        class="px-5 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 outline-none"
                        on:click={handleConfirm}
                >
                    确认
                </button>
            </div>
        </div>
    </div>
{/if}

<style>
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .animate-fade-in-up {
        animation: fadeInUp 0.3s ease-out forwards;
    }
</style>
