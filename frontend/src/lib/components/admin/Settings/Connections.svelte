<script lang="ts">
    import {user} from '$lib/stores';
    import {onMount, getContext} from 'svelte';

    import {getServiceUrl, getDefaultServiceUrl, updateServiceUrl} from '$lib/apis/configs';

    import {toast} from 'svelte-sonner';

    const i18n = getContext('i18n');

    let LLM_SRV1_URL = "";
    let LLM_SRV2_URL = "";
    let HF_URL = "";
    let INTERVL_URL = "";
    let OMPT_URL = "";


    const resetServiceUrlHandler = async () => {
        let serviceUrl = await getDefaultServiceUrl(localStorage.token);
        if (serviceUrl) {
            LLM_SRV1_URL = serviceUrl.LLM_SRV1_URL;
            LLM_SRV2_URL = serviceUrl.LLM_SRV2_URL;
            HF_URL = serviceUrl.HF_URL;
            INTERVL_URL = serviceUrl.INTERVL_URL;
            OMPT_URL = serviceUrl.OMPT_URL;
        }
    };

    const updateServiceUrlHandler = async () => {
        let res = await updateServiceUrl(localStorage.token, {
            LLM_SRV1_URL,
            LLM_SRV2_URL,
            HF_URL,
            INTERVL_URL,
            OMPT_URL

        });

        if (res && res.status) {
            toast.success($i18n.t('Settings saved successfully!'));
        }
    };

    onMount(async () => {
        if ($user.role === 'admin') {
            let serviceUrl = await getServiceUrl(localStorage.token);
            if (serviceUrl) {
                LLM_SRV1_URL = serviceUrl.LLM_SRV1_URL;
                LLM_SRV2_URL = serviceUrl.LLM_SRV2_URL;
                HF_URL = serviceUrl.HF_URL;
                INTERVL_URL = serviceUrl.INTERVL_URL;
                OMPT_URL = serviceUrl.OMPT_URL;
            }
        }
    });
</script>

<form
        class="flex flex-col h-full justify-between text-sm"
        on:submit|preventDefault={updateServiceUrlHandler}
        on:reset|preventDefault={resetServiceUrlHandler}
>
    <div class="pr-1.5 overflow-y-scroll h-[50vh] space-y-3">

        <div>
            <div class=" mb-2.5 text-sm font-medium">DeepSeek服务Url</div>
            <div class="flex w-full gap-1.5">
                <div class="flex-1 flex flex-col gap-2">

                    <div class="flex gap-1.5">
                        <input
                                class="w-full rounded-lg py-2 px-4 text-sm dark:text-gray-300 dark:bg-gray-850 outline-none"
                                placeholder="Enter URL (e.g. http://localhost:11434)"
                                bind:value={LLM_SRV1_URL}
                        />
                    </div>
                </div>
            </div>
        </div>
        <div>
            <div class=" mb-2.5 text-sm font-medium">QWen服务Url</div>
            <div class="flex w-full gap-1.5">
                <div class="flex-1 flex flex-col gap-2">

                    <div class="flex gap-1.5">
                        <input
                                class="w-full rounded-lg py-2 px-4 text-sm dark:text-gray-300 dark:bg-gray-850 outline-none"
                                placeholder="Enter URL (e.g. http://localhost:11434)"
                                bind:value={LLM_SRV2_URL}
                        />
                    </div>
                </div>
            </div>
        </div>
        <div>
            <div class=" mb-2.5 text-sm font-medium">语义嵌入服务Url</div>
            <div class="flex w-full gap-1.5">
                <div class="flex-1 flex flex-col gap-2">

                    <div class="flex gap-1.5">
                        <input
                                class="w-full rounded-lg py-2 px-4 text-sm dark:text-gray-300 dark:bg-gray-850 outline-none"
                                placeholder="Enter URL (e.g. http://localhost:11434)"
                                bind:value={HF_URL}
                        />
                    </div>
                </div>
            </div>
        </div>
        <div>
            <div class=" mb-2.5 text-sm font-medium">多模态大模型服务Url</div>
            <div class="flex w-full gap-1.5">
                <div class="flex-1 flex flex-col gap-2">

                    <div class="flex gap-1.5">
                        <input
                                class="w-full rounded-lg py-2 px-4 text-sm dark:text-gray-300 dark:bg-gray-850 outline-none"
                                placeholder="Enter URL (e.g. http://localhost:11434)"
                                bind:value={INTERVL_URL}
                        />
                    </div>
                </div>
            </div>
        </div>
        <div>
            <div class=" mb-2.5 text-sm font-medium">文档扫描服务Url</div>
            <div class="flex w-full gap-1.5">
                <div class="flex-1 flex flex-col gap-2">

                    <div class="flex gap-1.5">
                        <input
                                class="w-full rounded-lg py-2 px-4 text-sm dark:text-gray-300 dark:bg-gray-850 outline-none"
                                placeholder="Enter URL (e.g. http://localhost:11434)"
                                bind:value={OMPT_URL}
                        />
                    </div>
                </div>
            </div>
        </div>

    </div>

    <div class="flex justify-end pt-3 text-sm font-medium">
        <button
                class="  px-4 py-2 mx-2 bg-gray-200 hover:bg-gray-300 text-gray-700 transition rounded-lg"
                type="reset"
        >
            恢复默认
        </button>
        <button
                class="  px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-gray-100 transition rounded-lg"
                type="submit"
        >
            {$i18n.t('Save')}
        </button>
    </div>
</form>
