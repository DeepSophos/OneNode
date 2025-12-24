<script lang="ts">
    import {onMount, getContext, createEventDispatcher} from 'svelte';
    import {fade, fly} from 'svelte/transition';
    import {addQuestion, deleteQuestion, getQuestionList} from '$lib/apis/rag';

    const i18n = getContext('i18n');
    const dispatch = createEventDispatcher();
    export let visible = false;
    export let scopeInfo: string;
    export let isAuthor = false;
    // 添加常用问题列表相关状态
    let commonQuestions: never[] = [];

    // 新问题输入状态
    let isAddingQuestion = false;
    let newQuestion = "";
    let selectedScope = ""; // 选择的知识集状态
    $:if (scopeInfo && visible) {
        selectedScope = scopeInfo.id;
        commonQuestions = [];
        getQuestionListHandler();
    }
    ;
    const getQuestionListHandler = async () => {
        await getQuestionList(localStorage.token, selectedScope).then((data) => {
            commonQuestions = data;
        });
    }

    // 添加新问题
    const addNewQuestion = () => {
        if (newQuestion.trim() && selectedScope) { // 检查是否选择了知识集
            addQuestion(localStorage.token, {question: newQuestion, order: 0, scopeId: selectedScope}).then(() => {
                getQuestionListHandler();
            });
            newQuestion = "";
        }
        isAddingQuestion = false;
    };

    // 删除问题
    const deleteQuestionHandler = (id) => {
        deleteQuestion(localStorage.token, id).then(() => {
            getQuestionListHandler();
        });
    };

    function cancelSelection() {
        dispatch('cancel');
        closeModal();
    }

    // 关闭模态框
    function closeModal() {
        visible = false;
        scopeInfo = null;
    }

</script>
{#if visible}
    <!-- 遮罩层 -->
    <div
            class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            transition:fade={{ duration: 200 }}
    >
        <!-- 模态框 -->
        <div
                class="flex flex-col bg-white dark:bg-gray-900 rounded-xl shadow-2xl w-[45vw] h-[60vh] "
                transition:fly={{ y: 20, duration: 300 }}
                on:click|stopPropagation
        >
            <!-- 头部 -->
            <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                <div class="flex items-center">
                    <h3 class="text-sm font-bold font-semibold text-gray-900 dark:text-white mr-4">
                        设置常问问题——{scopeInfo.name}</h3>

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
            <div class="px-6 py-4">
                <div class="h-[50vh] overflow-y-auto space-y-1">
                    {#each commonQuestions as item, index}
                        <div class="p-3 rounded bg-gray-50 dark:bg-gray-800/20
                                border border-gray-200 dark:border-gray-700">
                            <div class="flex justify-between items-center">
                            <span class="font-medium text-sm">
                                <span class="inline-block w-6 text-gray-500">{index + 1}.</span>
                                {item.question}
                            </span>
                                <div class="space-x-2">
                                    {#if isAuthor}
                                        <button
                                                class="text-xs text-red-600 hover:text-red-700"
                                                on:click={() => deleteQuestionHandler(item.id)}
                                        >
                                            删除
                                        </button>
                                    {/if}
                                </div>
                            </div>
                        </div>
                    {/each}
                    {#if commonQuestions.length === 0 && !isAuthor}
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
                    <!-- 添加问题按钮或输入框 -->
                    {#if isAddingQuestion}
                        <div class="p-3 rounded bg-gray-50 dark:bg-gray-800/20
                                border border-gray-200 dark:border-gray-700">
                            <div class="flex items-center space-x-2">
                                <span class="inline-block w-6 text-gray-500">{commonQuestions.length + 1}.</span>

                                <input
                                        class="flex-1 rounded py-1.5 px-3 text-sm
                                      bg-white dark:bg-gray-800/20
                                      border border-gray-200 dark:border-gray-600
                                      outline-none"
                                        type="text"
                                        placeholder="输入新问题..."
                                        bind:value={newQuestion}
                                        on:keydown={(e) => e.key === 'Enter' && addNewQuestion()}
                                        autofocus
                                />

                                <button
                                        class="px-2 py-1 text-xs rounded bg-emerald-600 text-white
                                      hover:bg-emerald-700 transition duration-200 ease-in-out"
                                        on:click={addNewQuestion}
                                >
                                    保存
                                </button>
                                <button
                                        class="px-2 py-1 text-xs rounded bg-gray-300 text-gray-700
                                      hover:bg-gray-400 transition duration-200 ease-in-out"
                                        on:click={() => isAddingQuestion = false}
                                >
                                    取消
                                </button>
                            </div>
                        </div>
                    {:else}
                        {#if isAuthor}
                            <button
                                    class="w-full p-3 rounded border border-dashed border-gray-300 dark:border-gray-600
                              text-gray-500 hover:text-gray-700 hover:border-gray-400
                              dark:text-gray-400 dark:hover:text-gray-300 dark:hover:border-gray-500
                              transition duration-200 ease-in-out text-center text-sm"
                                    on:click={() => isAddingQuestion = true}
                            >
                                + 添加问题
                            </button>
                        {/if}
                    {/if}
                </div>
            </div>
        </div>
    </div>
{/if}