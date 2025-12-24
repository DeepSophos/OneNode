<script lang="ts">
    import {goto} from '$app/navigation';
    import {getContext} from "svelte";
    import {user, sdk_access_token_enabled, sdk_access_token_duration} from '$lib/stores';
    import {applySdkToken} from '$lib/apis/users';
    import {onMount} from 'svelte';
    import {toast} from "svelte-sonner";

    const i18n = getContext('i18n');
    let applied = false;
    let sdk_token = "";
    let loading = false;
    let textareaRef;
    let applyStatus = 0;
    const selectAll = () => textareaRef.select();
    // 页面初始化时检查sdk_token
    onMount(async () => {
        try {
            let res = await applySdkToken($user?.id, localStorage.token);
            sdk_token = res?.sdk_token
            applied = !!sdk_token;
        } catch (e) {
            applied = false;
        }
    });

    const applyToken = async () => {
        if (!$sdk_access_token_enabled) {
            return;
        }
        if (applyStatus == 0) {
            applyStatus++;
            return;
        }
        loading = true;
        try {
            let res = await applySdkToken($user?.id, localStorage.token, true);
            sdk_token = res?.sdk_token
            applied = !!sdk_token;
            if (applied) toast.success("申请成功！");
            else toast.error("申请失败！");
        } catch (e) {
            console.log(e)
            toast.error("发生异常！");
        } finally {
            loading = false;
            applyStatus = 0;
        }
    };
</script>

<div class="w-full px-8 py-5">
    <!-- 头部导航区域 -->
    <div class="flex items-center justify-between p-4 rounded-lg shadow border border-gray-300 dark:border-gray-700 mb-6">
        <div class="flex items-center space-x-4">
            <button class="text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors duration-200"
                    on:click={() => { goto('/') }}
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                     stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round"
                          d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"/>
                </svg>
            </button>
            <h1 class="text-xl font-semibold text-gray-900 dark:text-white">{$i18n.t("SDK访问令牌")}</h1>
        </div>
    </div>
    <div class="main-content rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div class="flex-con w-2/3">

            <button class=" mb-2 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 duration-200 mb-4  transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    on:click={applyToken}
                    disabled={!sdk_access_token_enabled || applied || loading}
            >
                {applyStatus == 0 ? "申请SDK访问令牌" : "确定申请SDK访问令牌"}
            </button>
            {#if applyStatus > 0 }
                <button class="mb-2 ml-2 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                        on:click={()=>{ applyStatus=0; }}

                >
                    取消
                </button>
            {/if}
            {#if applied }
            <textarea rows="3" readonly class="w-full rounded-md border-2 my-2 p-2 dark:bg-gray-900 "
                      bind:this={textareaRef}
                      on:click={selectAll}>{sdk_token}</textarea>
            {/if}
            <div class="info mt-2">
                说明：<br>
                1、SDK访问令牌允许您的应用程序访问<span class="text-blue-600">求索时刻AI</span>的服务接口；<br>
                2、每个账户仅限申请一次访问令牌，{#if $sdk_access_token_duration>0 }
                令牌有效期为 {$sdk_access_token_duration}天，到期后请联系我司工作人员获取进一步支持；
                {:else}令牌长期有效；
                {/if}
            </div>
        </div>
    </div>
</div>
<style>
    .main-content {
        height: calc(100vh - 8.05rem);
    }

    .flex-con {

        gap: 1.5rem;
        margin: 10% auto 0;
    }

    .flex-con textarea {
        width: 100%;
    }

    .flex-con button {
        width: auto;
        float: left;
        margin-bottom: 0.5rem;
    }

    .flex-con textarea {
        margin: 0.5rem 0 0.5rem 0;
        font-size: 1.1rem;
        background: #f8fafc;
        border: 1.5px solid #d1d5db;
        border-radius: 0.5rem;
        transition: border 0.2s;
        resize: none;
    }

    .flex-con textarea:focus {
        border: 1.5px solid #2563eb;
        outline: none;
    }

    .info {
        width: 100%;
        background: #f1f5f9;
        border-radius: 0.75rem;
        padding: 1rem 1.25rem;
        color: #334155;
        font-size: 0.98rem;
        line-height: 2rem;
        letter-spacing: 0.1rem;
        margin-top: 1rem;
        box-shadow: 0 2px 8px 0 rgba(0,0,0,0.03);
        clear: both;
    }


</style>