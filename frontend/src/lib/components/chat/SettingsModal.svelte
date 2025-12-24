<script lang="ts">
    import {getContext} from 'svelte';
    import {toast} from 'svelte-sonner';
    import {settings, user,system_allCompanyName} from '$lib/stores';

    import Modal from '../common/Modal.svelte';
    import Account from './Settings/Account.svelte';
    import About from './Settings/About.svelte';
    import General from './Settings/General.svelte';
    import SystemMonitor from './Settings/SystemMonitor.svelte';
    import AdminSettings from '$lib/components/admin/Settings/General.svelte';
    import Connections from "$lib/components/admin/Settings/Connections.svelte";

    const i18n = getContext('i18n');

    export let show = false;

    const saveSettings = async (updated) => {
        console.log(updated);
        await settings.set({...$settings, ...updated});
        localStorage.setItem('settings', JSON.stringify($settings));
    };

    let selectedTab = 'general';

</script>

<Modal bind:show>
    <div>
        <div class=" flex justify-between dark:text-gray-300 px-5 py-4">
            <div class=" text-sm font-bold self-center">{$i18n.t('System Settings')}</div>
            <button
                    class="self-center"
                    on:click={() => {
					show = false;
				}}
            >
                <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        class="w-5 h-5"
                >
                    <path
                            d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z"
                    />
                </svg>
            </button>
        </div>
        <hr class=" dark:border-gray-800"/>
        <div class="flex flex-col md:flex-row w-full p-4 md:space-x-4">
            <div
                    class="tabs text-sm flex flex-row overflow-x-auto space-x-1 md:space-x-0 md:space-y-1 md:flex-col flex-1 md:flex-none md:w-40 dark:text-gray-200 text-left mb-3 md:mb-0"
            >
                <button
                        class="px-2.5 py-2.5 min-w-fit rounded-lg flex-1 md:flex-none flex text-right transition {selectedTab ===
					'general'
						? 'bg-gray-200 dark:bg-gray-700'
						: ' hover:bg-gray-300 dark:hover:bg-gray-800'}"
                        on:click={() => {
						selectedTab = 'general';
					}}
                >
                    <div class=" self-center mr-2">
                        <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                class="w-4 h-4"
                        >
                            <path
                                    fill-rule="evenodd"
                                    d="M8.34 1.804A1 1 0 019.32 1h1.36a1 1 0 01.98.804l.295 1.473c.497.144.971.342 1.416.587l1.25-.834a1 1 0 011.262.125l.962.962a1 1 0 01.125 1.262l-.834 1.25c.245.445.443.919.587 1.416l1.473.294a1 1 0 01.804.98v1.361a1 1 0 01-.804.98l-1.473.295a6.95 6.95 0 01-.587 1.416l.834 1.25a1 1 0 01-.125 1.262l-.962.962a1 1 0 01-1.262.125l-1.25-.834a6.953 6.953 0 01-1.416.587l-.294 1.473a1 1 0 01-.98.804H9.32a1 1 0 01-.98-.804l-.295-1.473a6.957 6.957 0 01-1.416-.587l-1.25.834a1 1 0 01-1.262-.125l-.962-.962a1 1 0 01-.125-1.262l.834-1.25a6.957 6.957 0 01-.587-1.416l-1.473-.294A1 1 0 011 10.68V9.32a1 1 0 01.804-.98l1.473-.295c.144-.497.342-.971.587-1.416l-.834-1.25a1 1 0 01.125-1.262l.962-.962A1 1 0 015.38 3.03l1.25.834a6.957 6.957 0 011.416-.587l.294-1.473zM13 10a3 3 0 11-6 0 3 3 0 016 0z"
                                    clip-rule="evenodd"
                            />
                        </svg>
                    </div>
                    <div class=" self-center">{$i18n.t('General')}</div>
                </button>
                {#if $user.role === 'admin'}
                    <button
                            class="px-2.5 py-2.5 min-w-fit rounded-lg flex-1 md:flex-none flex text-right transition {selectedTab ===
					'adminsettings'
						? 'bg-gray-200 dark:bg-gray-700'
						: ' hover:bg-gray-300 dark:hover:bg-gray-800'}"
                            on:click={() => {
						selectedTab = 'adminsettings';
					}}
                    >
                        <div class=" self-center mr-2">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                 class="size-4">
                                <path fill-rule="evenodd"
                                      d="M12 6.75a5.25 5.25 0 0 1 6.775-5.025.75.75 0 0 1 .313 1.248l-3.32 3.319c.063.475.276.934.641 1.299.365.365.824.578 1.3.64l3.318-3.319a.75.75 0 0 1 1.248.313 5.25 5.25 0 0 1-5.472 6.756c-1.018-.086-1.87.1-2.309.634L7.344 21.3A3.298 3.298 0 1 1 2.7 16.657l8.684-7.151c.533-.44.72-1.291.634-2.309A5.342 5.342 0 0 1 12 6.75ZM4.117 19.125a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75h-.008a.75.75 0 0 1-.75-.75v-.008Z"
                                      clip-rule="evenodd"/>
                                <path d="m10.076 8.64-2.201-2.2V4.874a.75.75 0 0 0-.364-.643l-3.75-2.25a.75.75 0 0 0-.916.113l-.75.75a.75.75 0 0 0-.113.916l2.25 3.75a.75.75 0 0 0 .643.364h1.564l2.062 2.062 1.575-1.297Z"/>
                                <path fill-rule="evenodd"
                                      d="m12.556 17.329 4.183 4.182a3.375 3.375 0 0 0 4.773-4.773l-3.306-3.305a6.803 6.803 0 0 1-1.53.043c-.394-.034-.682-.006-.867.042a.589.589 0 0 0-.167.063l-3.086 3.748Zm3.414-1.36a.75.75 0 0 1 1.06 0l1.875 1.876a.75.75 0 1 1-1.06 1.06L15.97 17.03a.75.75 0 0 1 0-1.06Z"
                                      clip-rule="evenodd"/>
                            </svg>
                        </div>
                        <div class=" self-center">配置</div>
                    </button>
                    <button
                            class="px-2.5 py-2.5 min-w-fit rounded-lg flex-1 md:flex-none flex text-right transition {selectedTab ===
						'connections'
							? 'bg-gray-200 dark:bg-gray-700'
							: ' hover:bg-gray-300 dark:hover:bg-gray-800'}"
                            on:click={() => {
							selectedTab = 'connections';
						}}
                    >
                        <div class=" self-center mr-2">
                            <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 16 16"
                                    fill="currentColor"
                                    class="w-4 h-4"
                            >
                                <path
                                        d="M1 9.5A3.5 3.5 0 0 0 4.5 13H12a3 3 0 0 0 .917-5.857 2.503 2.503 0 0 0-3.198-3.019 3.5 3.5 0 0 0-6.628 2.171A3.5 3.5 0 0 0 1 9.5Z"
                                />
                            </svg>
                        </div>
                        <div class=" self-center">{$i18n.t('Connections')}</div>
                    </button>
                    <button
                        class="px-2.5 py-2.5 min-w-fit rounded-lg flex-1 md:flex-none flex text-right transition {selectedTab ===
					'system-monitor'
						? 'bg-gray-200 dark:bg-gray-700'
						: ' hover:bg-gray-300 dark:hover:bg-gray-800'}"
                        on:click={() => {
						selectedTab = 'system-monitor';
					}}
                >
                    <div class=" self-center mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-4">
                          <path d="M19.5 6h-15v9h15V6Z" />
                          <path fill-rule="evenodd" d="M3.375 3C2.339 3 1.5 3.84 1.5 4.875v11.25C1.5 17.16 2.34 18 3.375 18H9.75v1.5H6A.75.75 0 0 0 6 21h12a.75.75 0 0 0 0-1.5h-3.75V18h6.375c1.035 0 1.875-.84 1.875-1.875V4.875C22.5 3.839 21.66 3 20.625 3H3.375Zm0 13.5h17.25a.375.375 0 0 0 .375-.375V4.875a.375.375 0 0 0-.375-.375H3.375A.375.375 0 0 0 3 4.875v11.25c0 .207.168.375.375.375Z" clip-rule="evenodd" />
                        </svg>
                    </div>
                    <div class=" self-center">系统监控</div>
                </button>
                {/if}
                <button
                        class="px-2.5 py-2.5 min-w-fit rounded-lg flex-1 md:flex-none flex text-right transition {selectedTab ===
					'about'
						? 'bg-gray-200 dark:bg-gray-700'
						: ' hover:bg-gray-300 dark:hover:bg-gray-800'}"
                        on:click={() => {
						selectedTab = 'about';
					}}
                >
                    <div class=" self-center mr-2">
                        <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                class="w-4 h-4"
                        >
                            <path
                                    fill-rule="evenodd"
                                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z"
                                    clip-rule="evenodd"
                            />
                        </svg>
                    </div>
                    <div class=" self-center">{$i18n.t('About')}</div>
                </button>
            </div>
            <div class="flex-1 h-[56vh]">
                {#if selectedTab === 'general'}
                    <General
                            {saveSettings}
                            on:save={() => {
							toast.success($i18n.t('Settings saved successfully!'));
						}}
                    />
                {:else if selectedTab === 'adminsettings'}
                    <AdminSettings />
                {:else if selectedTab === 'connections'}
                    <Connections/>
                {:else if selectedTab === 'system-monitor'}
                    <SystemMonitor/>
                {:else if selectedTab === 'about'}
                    <About/>
                {/if}
            </div>
        </div>
    </div>
    <div class="mt-auto text-xs text-gray-400 mb-2 dark:text-gray-500 flex justify-center">
        <span class=" text-gray-500 dark:text-gray-300 font-medium">©{$system_allCompanyName?$system_allCompanyName:'上海求索时刻科技有限公司'} 版权所有</span>
    </div>
</Modal>

<style>
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        /* display: none; <- Crashes Chrome on hover */
        -webkit-appearance: none;
        margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
    }

    .tabs::-webkit-scrollbar {
        display: none; /* for Chrome, Safari and Opera */
    }

    .tabs {
        -ms-overflow-style: none; /* IE and Edge */
        scrollbar-width: none; /* Firefox */
    }

    input[type='number'] {
        -moz-appearance: textfield; /* Firefox */
    }
</style>
