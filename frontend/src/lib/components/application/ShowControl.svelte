<script>
    import {createEventDispatcher, onMount} from "svelte";
    import FileUploadBox from "./UIControl/FileUploadBox.svelte";
    import QueryBox from "./UIControl/QueryBox.svelte";
    import {feedback} from "$lib/apis/application"
    import {toast} from "svelte-sonner";

    export let app_id = "";
    export let modalData = {};

    const dispatch = createEventDispatcher();

    let show = false;
    let isReady = false;

    let currentControl = null;

    onMount(() => {
        show = true;
    });

    function close() {
        show = false;
        modalData.callbackData= {description: "取消操作"};
        sendFeedback("cancel");
        dispatch("close");
    }

    function confirm() {
        show = false;
        sendFeedback("accept");
        dispatch("close");
    }
    function sendFeedback(status) {
        feedback({
                app_id: app_id,
                payload: JSON.stringify({
                    "app_id": app_id,
                    "agent_id": modalData.agent_id,
                    "status": status,
                    "data": modalData.callbackData
                })
            },
            localStorage.getItem("token")
        ).then(() => {
        }).catch((err) => {
            console.log(err);
            toast.error("发生异常，请重新运行应用！")
        });
    }

</script>
{#if show}
    <div
        class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 dark:bg-black dark:bg-opacity-60"
        on:click|self={close}
    >
        <div
            class="bg-white dark:bg-gray-900 w-[50vw] h-[65vh] rounded-xl shadow-xl flex flex-col border border-gray-200 dark:border-gray-700"
            on:click|stopPropagation
            style="min-width: 480px;"
        >
            <!-- 头部 -->
            <header
                class="py-3 px-5 rounded-t-xl border-b border-gray-200 dark:border-gray-700 flex justify-between items-center bg-white dark:bg-gray-900"
            >
                <h2 class=" font-semibold text-gray-800 dark:text-gray-100">{modalData.title}</h2>
                <button
                    on:click={close}
                    aria-label="关闭模态窗"
                    class="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 text-3xl font-thin transition-colors"
                    title="关闭"
                >
                    &times;
                </button>
            </header>

            <!-- 内容区 -->
            <section class="p-4 overflow-auto flex-grow bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100">
                {#if modalData.type === "file_upload_box"}
                    <FileUploadBox
                        bind:isReady={isReady}
                        bind:this={currentControl}
                        options={modalData}
                    />
                {:else if modalData.type === "user_query_box"}
                    <QueryBox
                        bind:isReady={isReady}
                        bind:this={currentControl}
                        options={modalData}/>
                {:else}
                    <p class="text-gray-500 dark:text-gray-400 text-center py-10">未知的类型: {modalData.type}</p>
                {/if}
            </section>

            <!-- 底部按钮区 -->
            <footer
                class="py-3 px-5 border-t border-gray-200 dark:border-gray-700 flex justify-end space-x-4 bg-gray-50 dark:bg-gray-900 rounded-b-xl"
            >
                <!-- 取消按钮 -->
                <button
                    class="px-4 py-1 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    on:click={close}
                    type="button"
                >
                    取消
                </button>
                <!-- 确认按钮 -->
                <button
                    class="px-4 py-1 rounded transition-colors duration-200 cursor-pointer
                        {isReady
                            ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm hover:shadow dark:shadow-blue-900/20 dark:hover:shadow-blue-900/30'
                            : 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                        }"
                    disabled={!isReady}
                    on:click={confirm}
                >
                    确认
                </button>
            </footer>
        </div>
    </div>
{/if}