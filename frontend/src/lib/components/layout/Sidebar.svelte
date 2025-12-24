<script lang="ts">
    import {v4 as uuidv4} from 'uuid';
    import fileSaver from 'file-saver';
    import 'virtual:uno.css'
    import {KTour} from '@ikun-ui/core';

    const {saveAs} = fileSaver;
    import {goto, invalidateAll} from '$app/navigation';
    import {page} from '$app/stores';
    import {
        user,
        chats,
        settings,
        showSettings,
        chatId,
        tags,
        system_name,
        system_logo,
        sdk_access_token_enabled,
        sdk_access_token_duration
    } from '$lib/stores';
    import {onMount, getContext, onDestroy} from 'svelte';
    import {scopes} from "$lib/stores"

    const i18n = getContext('i18n');
    let refBtn1 = null;
    let openTour = false;
    let steps = [];
    $: {
        steps = [
            {
                title: '添加知识集',
                description: '首先创建一个知识集,上传资料，再开始对话。',
                target: refBtn1
            }
        ]
    }
    let currentPlan = {
        name: '免费版',
        sub_version: 'FREE',
        dailyQueries: 0,
        remaining: 0,
        docsSize: '0',
        docsUsed: '0'
    };
    let pricingData = [];
    let fieldConfig = {};
    import {
        deleteChatById,
        getChatList,
        getChatById,
        getChatListByTagName,
        updateChatById,
        getAllChatTags
    } from '$lib/apis/chats';
    import {rightpanel_params} from '$lib/stores';
    import {toast} from 'svelte-sonner';
    import {fade, slide} from 'svelte/transition';
    import {ONENODE_BASE_URL} from '$lib/constants';
    import Tooltip from '../common/Tooltip.svelte';
    import ChatMenu from './Sidebar/ChatMenu.svelte';
    import {getUsers} from "$lib/apis/users";
    import EditUserModal from "$lib/components/admin/EditUserModal.svelte";
    import PackageModal from "$lib/components/admin/PackageModal.svelte";
    import {getPlanInfo} from '$lib/apis';

    let show = window.innerWidth > 1024;
    let navElement;

    let title: string = 'UI';
    let search = '';

    let selectedChatId = null;
    let chatDeleteId = null;
    let chatTitleEditId = null;
    let chatTitle = '';
    let isEditing = false;
    let showUserMenu = false;
    let showUpdatePwdModal = false;
    let showPackageModal = false;
    let userName = '';
    const unsubscribeCI = rightpanel_params.subscribe(v => {
        if (v.length) {
            show = false;
        }
    })

    onMount(async () => {
        userName = $user.name;
        const isNewUser = !$scopes.some(item => item.owner_name === userName);
        await chats.set(await getChatList(localStorage.token));
        await getPlan()
        setTimeout(() => {
            if (localStorage.TourT2Hide != 'true' && isNewUser && !window.location.href.includes('knowledgebase') && !window.location.href.includes('knowledgedetail')) handleOpen()
        }, 500)
    });

    async function getPlan() {
        const planInfo = await getPlanInfo()
        let packageInfo = {};
        pricingData = [];
        fieldConfig = {};
        try {
            const response = await fetch('/package.json');
            if (!response.ok) {
                throw new Error('文件加载失败');
            }
            const plans = await response.json();
            packageInfo = plans.find(x=>x.version === planInfo.version);
            pricingData = packageInfo.pricingData;
            fieldConfig = packageInfo.fieldConfig;
        } catch (err) {
            console.error(err);
        }
        const findPricing = pricingData.find(item => item.sub_version === planInfo.sub_version)
        currentPlan = {
            version: planInfo.version,
            name: `${packageInfo?.version_name} ${findPricing ? `【${findPricing?.name}】` : ''}`,
            sub_version: planInfo.sub_version,
            dailyQueries: planInfo.chat_count,
            remaining: planInfo.used_chat_count,
            chart_used_percentage: getUsagePercentage(planInfo.used_chat_count, planInfo.chat_count),
            docsSize: formatStorage(planInfo.volume, 0, planInfo.volume > 1024),
            docsUsed: formatStorage(planInfo.used_volume_mb, 2, planInfo.used_volume_mb > 1024),
            volume_used_percentage: getUsagePercentage(planInfo.used_volume_mb, planInfo.volume)
        }
    }

    function formatStorage(mbValue, precision = 2, isGB = false) {
        if (mbValue === -1) return mbValue;
        if (!isGB) {
            // 小于1024MB，显示MB
            return `${mbValue.toFixed(precision)}MB`;
        } else {
            // 大于等于1024MB，显示GB
            const gbValue = mbValue / 1024;
            return `${gbValue.toFixed(precision)}GB`;
        }
    }

    const editChatTitle = async (id, _title) => {
        if (_title === '') {
            toast.error('Title cannot be an empty string.');
        } else {
            title = _title;
            await updateChatById(localStorage.token, id, {
                title: _title
            });
            await chats.set(await getChatList(localStorage.token));
        }
    };

    const deleteChat = async (id) => {
        const res = await deleteChatById(localStorage.token, id).catch((error) => {
            toast.error(error);
            chatDeleteId = null;
            return null;
        });

        if (res) {
            if ($chatId === id) {
                goto('/');
            }
            await chats.set(await getChatList(localStorage.token));
        }
    };

    const saveSettings = async (updated) => {
        await settings.set({...$settings, ...updated});
        localStorage.setItem('settings', JSON.stringify($settings));
        location.href = '/';
    };

    const autoHideHandler = async () => {
        if (window.innerWidth < 1024) {
            setTimeout(() => {
                show = false;
            }, 300);
        }
    };

    onDestroy(() => {
        unsubscribeCI();
    })
    const handleOpen = () => {
        openTour = true;
    };
    const handleTourHide = () => {
        localStorage.setItem('TourT2Hide', true);
        handleClose()
    };
    const handleClose = () => {
        openTour = false;
    };
    const handleFinish = () => {
        openTour = false;
    };


    // 计算使用百分比
    function getUsagePercentage(remaining, total) {
        const remaining_MB = typeof remaining === 'string' && remaining.includes('GB') ? parseFloat(remaining) * 1024 : parseFloat(remaining);
        const total_MB = typeof remaining === 'string' && total.includes('GB') ? parseFloat(total) * 1024 : parseFloat(total);
        const usage = Math.round((remaining_MB / total_MB) * 100);
        return Math.min(usage, 100);
    }
    
</script>

<div
        bind:this={navElement}
        class="h-screen max-h-[100dvh] min-h-screen {show
		? 'lg:relative w-[260px]'
		: '-translate-x-[260px] w-[0px]'} bg-gray-200 text-gray-900 dark:bg-gray-950 dark:text-gray-200 text-sm transition fixed z-50 top-0 left-0"
        on:blur={()=>{}}
        on:mouseleave={autoHideHandler}
        role="dialog"
        style="transition-duration: 500ms;"
>
    <div class="flex flex-col h-screen max-h-[100dvh] w-[260px] {show ? '' : 'invisible'}">
        <!--系统logo和名称 -->
        <div class="px-4 py-4  border-gray-300 dark:border-gray-700">
            <div class="flex items-center justify-star space-x-3">
                {#if $system_logo}
                    <div class="w-8 h-8 rounded overflow-hidden">
                        <img class="w-full h-full object-cover" src={$system_logo}>
                    </div>
                {:else }
                    <div class="w-7 h-7 rounded-full bg-blue-500 flex items-center justify-center ">
                        <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="h-6 w-6 text-white"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                        >
                            <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M13 10V3L4 14h7v7l9-11h-7z"
                            />
                        </svg>
                    </div>
                {/if}
                <div class="font-bold text-lg">{$system_name}</div>
            </div>
        </div>

        <!--功能菜单 -->
        <div class="px-3 py-3 border-b border-gray-300 dark:border-gray-700">
            <div class="space-y-1">
                <!-- 新对话 -->
                <button
                        class="flex items-center w-full px-3 py-2 rounded-lg hover:bg-white dark:hover:bg-gray-800  hover:shadow-sm group"
                        on:click={async () => {
                        selectedChatId = null;
                        await goto('/');
                        const newChatButton = document.getElementById('new-chat-button');
                        setTimeout(() => {
                            newChatButton?.click();
                        }, 0);
                    }}
                >
                    <svg class="w-5 h-5 mr-3 text-gray-700 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors"
                         fill="none"
                         stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 4v16m8-8H4" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                    </svg>
                    <span class="text-sm text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">{$i18n.t('Open new chat')}</span>
                </button>
                <!-- 应用程序 -->
                <button
                        class="flex items-center w-full px-3 py-2 rounded-lg hover:bg-white dark:hover:bg-gray-800  hover:shadow-sm group"
                        on:click={async () => {
                        selectedChatId = null;
                        await goto('/application');
                        const newChatButton = document.getElementById('new-chat-button');
                        setTimeout(() => {
                            newChatButton?.click();
                        }, 0);
                    }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg"
                         class="w-5 h-5 mr-3 text-gray-700 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors"
                         fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
                    </svg>
                    <span class="text-sm text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">{$i18n.t('Application')}</span>
                </button>
                <!-- 知识集 -->
                <button
                        bind:this={refBtn1}
                        class="flex items-center w-full px-3 py-2 rounded-lg hover:bg-white dark:hover:bg-gray-800 hover:shadow-sm group"
                        on:click={() => {
                    goto('/knowledgebase');
                }}
                >
                    <svg class="w-5 h-5 mr-3 text-gray-700 text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors"
                         fill="none" stroke="currentColor"
                         stroke-width="2" viewBox="0 0 24 24"
                         xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
                              stroke-linecap="round"
                              stroke-linejoin="round"/>
                    </svg>
                    <span class="text-sm text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">{$i18n.t('Scope Manage')}</span>
                </button>
                <!-- 展板 -->
                <button
                        class="flex items-center w-full px-3 py-2 rounded-lg hover:bg-white dark:hover:bg-gray-800 hover:shadow-sm group"
                        on:click={() => {
                        goto('/statistics');
                    }}
                >
                    <svg class="w-5 h-5 mr-3 text-gray-700 text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors"
                         fill="none" stroke="currentColor" stroke-width="1.5"
                         viewBox="0 0 24 24"
                         xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25"
                              stroke-linecap="round"
                              stroke-linejoin="round"/>
                    </svg>

                    <span class="text-sm text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">AI知识库看板</span>
                </button>
                <!-- 用户管理 -->
                {#if $user?.role === 'admin'}
                    <button
                            class="flex items-center w-full px-3 py-2 rounded-lg hover:bg-white dark:hover:bg-gray-800 hover:shadow-sm group"
                            on:click={() => {
                        goto('/admin');
                    }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                             stroke="currentColor"
                             class="w-5 h-5 mr-3 text-gray-700 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                  d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"/>
                        </svg>
                        <span class="text-sm text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">{$i18n.t('User Management')}</span>
                    </button>
                {/if}
                <!-- 组织机构 -->
                {#if $user?.role === 'admin' || $user?.role === 'kbman'}
                    <button
                            class="flex items-center w-full px-3 py-2 rounded-lg hover:bg-white dark:hover:bg-gray-800 hover:shadow-sm group"
                            on:click={() => {
                        goto('/organization');
                    }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                             stroke="currentColor"
                             class="w-5 h-5 mr-3 text-gray-700 text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                  d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 0 0 2.25-2.25V6a2.25 2.25 0 0 0-2.25-2.25H6A2.25 2.25 0 0 0 3.75 6v2.25A2.25 2.25 0 0 0 6 10.5Zm0 9.75h2.25A2.25 2.25 0 0 0 10.5 18v-2.25a2.25 2.25 0 0 0-2.25-2.25H6a2.25 2.25 0 0 0-2.25 2.25V18A2.25 2.25 0 0 0 6 20.25Zm9.75-9.75H18a2.25 2.25 0 0 0 2.25-2.25V6A2.25 2.25 0 0 0 18 3.75h-2.25A2.25 2.25 0 0 0 13.5 6v2.25a2.25 2.25 0 0 0 2.25 2.25Z"/>
                        </svg>
                        <span class="text-sm text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">{$i18n.t('Organization Manage')}</span>
                    </button>
                {/if}
                {#if $sdk_access_token_enabled}
                    <!-- SDK接入凭证 -->
                    <button
                            class="flex items-center w-full px-3 py-2 rounded-lg hover:bg-white dark:hover:bg-gray-800 hover:shadow-sm group"
                            on:click={async () => {
                        goto('/tokens');
                    }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                             stroke="currentColor"
                             class="w-5 h-5 mr-3 text-gray-700 text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                  d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z"/>
                        </svg>
                        <span class="text-sm text-gray-700 dark:text-gray-300 group-hover:text-gray-700 dark:group-hover:text-white transition-colors">{$i18n.t('SDK Access Token')}</span>
                    </button>
                {/if}
                <!-- 系统设置 -->
                <button
                        class="flex items-center w-full px-3 py-2 rounded-lg hover:bg-white dark:hover:bg-gray-800 hover:shadow-sm group"
                        on:click={async () => {
                        await showSettings.set(true);
                    }}
                >
                    <svg class="w-5 h-5 mr-3 text-gray-700 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors"
                         fill="none"
                         stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                              stroke-linecap="round" stroke-linejoin="round"
                              stroke-width="2"/>
                        <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" stroke-linecap="round" stroke-linejoin="round"
                              stroke-width="2"/>
                    </svg>
                    <span class="text-sm text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">{$i18n.t('System Settings')}</span>
                </button>
            </div>
        </div>

        <!--近期对话列表 - 添加标题和图标 -->
        <div class="flex-1 flex flex-col min-h-0  border-gray-300 dark:border-gray-700">
            <!-- 近期对话标题 -->
            <div class="flex justify-between px-3 py-3  border-gray-200 dark:border-gray-800">
                <div class="flex items-center space-x-2 p-0.5">
                    <svg class="w-5 h-5 text-gray-700 dark:text-gray-400" fill="none" stroke="currentColor"
                         stroke-width="1.5"
                         viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
                              stroke-linecap="round"
                              stroke-linejoin="round"/>
                    </svg>
                    <span class="font-bold text-sm text-gray-900 dark:text-gray-300">{$i18n.t('Recent Conversations')}</span>
                </div>
            </div>

            {#if !($settings.saveChatHistory ?? true)}
                <div class="absolute z-40 w-full h-full bg-gray-50/90 dark:bg-black/90 flex justify-center">
                    <div class="text-left px-5 py-2">
                        <div class="font-medium">{$i18n.t('Chat History is off for this browser.')}</div>
                        <div class="text-xs mt-2">
                            {$i18n.t("When history is turned off, new chats on this browser won't appear in your history on any of your devices.")}
                            <span class="font-semibold">{$i18n.t('This setting does not sync across browsers or devices.')}</span>
                        </div>
                        <div class="mt-3">
                            <button
                                    class="flex justify-center items-center space-x-1.5 px-3 py-2.5 rounded-lg text-xs bg-gray-200 hover:bg-gray-300 transition text-gray-800 font-medium w-full"
                                    type="button"
                                    on:click={() => {
                                    saveSettings({
                                        saveChatHistory: true
                                    });
                                }}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
                                     class="w-3 h-3">
                                    <path fill-rule="evenodd"
                                          d="M8 1a.75.75 0 0 1 .75.75v6.5a.75.75 0 0 1-1.5 0v-6.5A.75.75 0 0 1 8 1ZM4.11 3.05a.75.75 0 0 1 0 1.06 5.5 5.5 0 1 0 7.78 0 .75.75 0 0 1 1.06-1.06 7 7 0 1 1-9.9 0 .75.75 0 0 1 1.06 0Z"
                                          clip-rule="evenodd"/>
                                </svg>
                                <div>{$i18n.t('Enable Chat History')}</div>
                            </button>
                        </div>
                    </div>
                </div>
            {/if}
            <!-- 标签 -->
            {#if $tags.length > 0}
                <div class="px-3 mb-2 flex gap-1 flex-wrap">
                    <button
                            class="px-2.5 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 transition rounded-full"
                            on:click={async () => {
                            await chats.set(await getChatList(localStorage.token));
                        }}
                    >
                        全部
                    </button>
                    {#each $tags as tag}
                        <button
                                class="px-2.5 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 transition rounded-full"
                                on:click={async () => {
                                let chatIds = await getChatListByTagName(localStorage.token, tag.name);
                                if (chatIds.length === 0) {
                                    await tags.set(await getAllChatTags(localStorage.token));
                                    chatIds = await getChatList(localStorage.token);
                                }
                                await chats.set(chatIds);
                            }}
                        >
                            {tag.name}
                        </button>
                    {/each}
                </div>
            {/if}

            <!-- 对话列表 - 设置固定高度并限制内容 -->
            <div class="flex-1 px-2 overflow-y-auto">
                <!-- 可滚动的对话列表容器 -->
                <div class="space-y-1 ">
                    {#each $chats.filter((chat) => {
                        if (search === '') {
                            return true;
                        } else {
                            let title = chat.title.toLowerCase();
                            const query = search.toLowerCase();
                            let contentMatches = false;
                            if (chat.chat && chat.chat.messages && Array.isArray(chat.chat.messages)) {
                                contentMatches = chat.chat.messages.some((message) => {
                                    return message.content && message.content.toLowerCase().includes(query);
                                });
                            }
                            return title.includes(query) || contentMatches;
                        }
                    }).slice(0, 9) as chat, i}
                        <div class="w-full pr-2 relative group">
                            {#if chatTitleEditId === chat.id}
                                <div class="w-full flex justify-between rounded-xl px-3 py-2 {chat.id === $chatId || chat.id === chatTitleEditId || chat.id === chatDeleteId ? 'bg-gray-300 dark:bg-gray-800' : chat.id === selectedChatId ? 'bg-gray-100 dark:bg-gray-900' : 'group-hover:bg-gray-100 dark:group-hover:bg-gray-900'} whitespace-nowrap text-ellipsis">
                                    <input bind:value={chatTitle} class="bg-transparent w-full outline-none mr-10"/>
                                </div>
                            {:else}
                                <a
                                        class="w-full flex justify-between rounded-xl px-3 py-2 {chat.id === $chatId || chat.id === chatTitleEditId || chat.id === chatDeleteId ? 'bg-gray-300 dark:bg-gray-800' : chat.id === selectedChatId ? 'bg-gray-100 dark:bg-gray-900' : 'group-hover:bg-gray-100 dark:group-hover:bg-gray-850'} whitespace-nowrap text-ellipsis"
                                        href="/c/{chat.id}"
                                        on:click={() => {
                            selectedChatId = chat.id;
                            if (window.innerWidth < 1024) {
                                show = false;
                            }
                        }}
                                        draggable="false"
                                >
                                    <div class="flex self-center flex-1 w-full">
                                        <div class="text-left self-center overflow-hidden w-full h-[20px]"
                                             style="text-overflow: ellipsis;">
                                            {chat.title}
                                        </div>
                                    </div>
                                </a>
                            {/if}

                            <!-- 对话操作按钮 -->
                            <div class="{chat.id === $chatId || chat.id === chatTitleEditId || chat.id === chatDeleteId ? 'from-gray-300 dark:from-gray-800' : chat.id === selectedChatId ? 'from-gray-100 dark:from-gray-900' : 'invisible group-hover:visible '} absolute right-[10px] top-[10px] pr-2 pl-5">
                                {#if chatTitleEditId === chat.id}
                                    <div class="flex self-center space-x-1.5 z-10">
                                        <button
                                                class="self-center dark:hover:text-white transition"
                                                on:click={() => {
                                    editChatTitle(chat.id, chatTitle);
                                    chatTitleEditId = null;
                                    chatTitle = '';
                                }}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                                                 fill="currentColor" class="w-4 h-4">
                                                <path fill-rule="evenodd"
                                                      d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                                                      clip-rule="evenodd"/>
                                            </svg>
                                        </button>
                                        <button
                                                class="self-center dark:hover:text-white transition"
                                                on:click={() => {
                                    chatTitleEditId = null;
                                    chatTitle = '';
                                }}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                                                 fill="currentColor" class="w-4 h-4">
                                                <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z"/>
                                            </svg>
                                        </button>
                                    </div>
                                {:else if chatDeleteId === chat.id}
                                    <div class="flex self-center space-x-1.5 z-10">
                                        <button
                                                class="self-center dark:hover:text-white transition"
                                                on:click={() => {
                                    deleteChat(chat.id);
                                }}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                                                 fill="currentColor" class="w-4 h-4">
                                                <path fill-rule="evenodd"
                                                      d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                                                      clip-rule="evenodd"/>
                                            </svg>
                                        </button>
                                        <button
                                                class="self-center dark:hover:text-white transition"
                                                on:click={() => {
                                    chatDeleteId = null;
                                }}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                                                 fill="currentColor" class="w-4 h-4">
                                                <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z"/>
                                            </svg>
                                        </button>
                                    </div>
                                {:else}
                                    <div class="flex self-center space-x-1.5 z-10">
                                        <ChatMenu
                                                renameHandler={() => {
                                    chatTitle = chat.title;
                                    chatTitleEditId = chat.id;
                                }}
                                                deleteHandler={() => {
                                    chatDeleteId = chat.id;
                                }}
                                                onClose={() => {
                                    selectedChatId = null;
                                }}
                                        >
                                            <button
                                                    aria-label="Chat Menu"
                                                    class="self-center dark:hover:text-white transition"
                                                    on:click={() => {
                                        selectedChatId = chat.id;
                                    }}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"
                                                     fill="currentColor" class="w-4 h-4">
                                                    <path d="M2 8a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM6.5 8a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM12.5 6.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z"/>
                                                </svg>
                                            </button>
                                        </ChatMenu>
                                    </div>
                                {/if}
                            </div>
                        </div>
                    {/each}
                    <div class="w-full pr-2 relative group">
                        <a
                                class="w-full flex justify-between rounded-xl px-3 py-2 group-hover:bg-gray-100 dark:group-hover:bg-gray-850 whitespace-nowrap text-ellipsis"
                                draggable="false"
                                href="/chathistory"
                        >
                            <div class="flex self-center flex-1 w-full">
                                <div class="text-left self-center overflow-hidden w-full h-[20px] italic"
                                     style="text-overflow: ellipsis;">
                                    更多
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </div>

        <!--用户信息和退出登录 -->
        <div class="px-3 py-4">
            {#if $user !== undefined}
                <div class="flex items-center justify-between">
                    {#if showUserMenu}
                        <div class="floating-menu rounded-2xl shadow-xl p-6 max-w-xs  border absolute bottom-0 left-0 mx-[15px] my-[20px] w-[230px] bg-white dark:bg-gray-800 dark:border-gray-700 z-[60]"
                             on:mouseleave={()=>{showUserMenu = false}}
                             transition:fade={{duration: 150}}
                        >
                            <!-- 用户信息 -->
                            <div class="flex items-center mb-6 pb-4 border-b border-gray-200/50">
                                <div class="bg-gradient-to-r from-violet-600 to-pink-500 from-primary to-secondary rounded-full p-1 mr-3">
                                    <div class="bg-white rounded-full p-1">
                                        <div class=" w-10 h-10 rounded-full  bg-gradient-to-r from-violet-600 to-pink-500 flex items-center justify-center text-white font-medium text-sm">
                                            {$user.name.charAt(0).toUpperCase()}
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <h2 class="font-bold text-gray-800">{$user.name}</h2>
                                    <p class="text-xs text-gray-600">{$user.role === "admin" ? "管理员" : $user.role === "kbman" ? "知识集管理员" : "用户"}</p>
                                </div>
                            </div>

                            <!-- 套餐信息 -->

                            <div class="mb-6">
                                <div class="flex justify-between items-center mb-2">
                                    <span class="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">{currentPlan.name}</span>
                                </div>

                                <!-- 资料使用情况 -->
                                <div class="mb-4">
                                    <div class="flex justify-between text-xs mb-1">
                                        <span class="text-gray-600">资料存储</span>
                                        <span class="text-gray-600">
                                            {currentPlan.docsUsed} /
                                            {@html currentPlan.docsSize === -1
                                                ? '<span class="text-green-400 dark:text-green-600">无限制</span>'
                                                : currentPlan.docsSize}
                                        </span>
                                    </div>

                                    <div class="w-full bg-gray-200 rounded-full h-2">
                                        <div class="progress-bar bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full"
                                             style="width: {currentPlan.volume_used_percentage}%"></div>
                                    </div>
                                    {#if currentPlan.docsSize != -1}
                                        <div class="flex justify-end mt-1">
                                            <span class="text-xs text-gray-500">剩余 {100 - currentPlan.volume_used_percentage}%</span>
                                        </div>
                                    {/if}
                                </div>

                                <!-- 问答次数 -->
                                <div class="mb-2">
                                    <div class="flex justify-between text-xs mb-1">
                                        <span class="text-gray-600">问答次数</span>
                                        {#if currentPlan.dailyQueries === -1}
                                            <span class="text-green-400 dark:text-green-600">无限制</span>
                                        {:else }
                                            <span class="text-gray-600">{currentPlan.remaining}
                                                /{currentPlan.dailyQueries}</span>
                                        {/if}
                                    </div>
                                    {#if currentPlan.dailyQueries != -1}
                                        <div class="w-full bg-gray-200 rounded-full h-2">
                                            <div class="progress-bar bg-gradient-to-r from-green-500 to-emerald-600 h-2 rounded-full"
                                                 style="width: {currentPlan.chart_used_percentage}%"></div>
                                        </div>
                                        <div class="flex justify-end mt-1">
                                            <span class="text-xs text-gray-500">剩余 {currentPlan.dailyQueries - currentPlan.remaining}次</span>
                                        </div>
                                    {/if}
                                </div>
                            </div>

                            <!-- 菜单选项 -->
                            <div class="space-y-2">
                                {#if currentPlan.version === "LIGHTWEIGHT"}
                                    <a href="#"
                                       on:click={()=>{
														showPackageModal = true;
												}}
                                       class="menu-item flex items-center p-3 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                             class="w-5 mr-3">
                                            <path fill-rule="evenodd"
                                                  d="M9.315 7.584C12.195 3.883 16.695 1.5 21.75 1.5a.75.75 0 0 1 .75.75c0 5.056-2.383 9.555-6.084 12.436A6.75 6.75 0 0 1 9.75 22.5a.75.75 0 0 1-.75-.75v-4.131A15.838 15.838 0 0 1 6.382 15H2.25a.75.75 0 0 1-.75-.75 6.75 6.75 0 0 1 7.815-6.666ZM15 6.75a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Z"
                                                  clip-rule="evenodd"/>
                                            <path d="M5.26 17.242a.75.75 0 1 0-.897-1.203 5.243 5.243 0 0 0-2.05 5.022.75.75 0 0 0 .625.627 5.243 5.243 0 0 0 5.022-2.051.75.75 0 1 0-1.202-.897 3.744 3.744 0 0 1-3.008 1.51c0-1.23.592-2.323 1.51-3.008Z"/>
                                        </svg>
                                        <span class="font-medium">升级套餐</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                             class="w-5 ml-auto text-sm text-gray-400">
                                            <path fill-rule="evenodd"
                                                  d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z"
                                                  clip-rule="evenodd"/>
                                        </svg>
                                    </a>
                                {/if}
                                <a href="#"
                                   on:click={()=>{
													showUpdatePwdModal = true
												}}
                                   class="menu-item flex items-center p-3 rounded-xl bg-white text-gray-700 hover:bg-gray-50 border border-gray-200/50 shadow-sm">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                         class="w-5 mr-3 text-purple-500">
                                        <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z"/>
                                        <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z"/>
                                    </svg>
                                    <span class="font-medium">修改个人信息</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                         class="w-5 ml-auto text-sm text-gray-400">
                                        <path fill-rule="evenodd"
                                              d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z"
                                              clip-rule="evenodd"/>
                                    </svg>
                                </a>
                            </div>
                        </div>
                    {/if}
                    <!-- 用户信息 -->
                    <div class="flex items-center space-x-3 w-[90%] relative cursor-pointer">
                        <div class=" w-8 h-8 rounded-full  bg-gradient-to-r from-violet-600 to-pink-500 flex items-center justify-center text-white font-medium text-sm"
                             on:mouseenter={()=>{
															 getPlan()
															 showUserMenu = true
														 }}
                        >
                            {userName.charAt(0).toUpperCase()}
                        </div>
                        <div class="text-left  w-[75%]">
                            <div class="font-medium text-sm truncate">
                                {userName}
                                {$user.role === "admin" ? "管理员" : $user.role === "kbman" ? "知识集管理员" : "用户"}
                            </div>
                        </div>
                    </div>

                    <!-- 退出登录按钮 -->
                    {#if localStorage.builtin_mode != "token"}
                        <button
                                class="p-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors text-gray-600 dark:text-gray-400 hover:text-blue-700 dark:hover:text-blue-300"
                                on:click={() => {
                            localStorage.removeItem('token');
                            location.href = '/auth';
                        }}
                                title="退出登录"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 20 20"
                                 fill="currentColor">
                                <path fill-rule="evenodd"
                                      d="M3 4.25A2.25 2.25 0 015.25 2h5.5A2.25 2.25 0 0113 4.25v2a.75.75 0 01-1.5 0v-2a.75.75 0 00-.75-.75h-5.5a.75.75 0 00-.75.75v11.5c0 .414.336.75.75.75h5.5a.75.75 0 00.75-.75v-2a.75.75 0 011.5 0v2A2.25 2.25 0 0110.75 18h-5.5A2.25 2.25 0 013 15.75V4.25z"
                                      clip-rule="evenodd"/>
                                <path fill-rule="evenodd"
                                      d="M6 10a.75.75 0 01.75-.75h9.546l-1.048-.943a.75.75 0 111.004-1.114l2.5 2.25a.75.75 0 010 1.114l-2.5 2.25a.75.75 0 11-1.004-1.114l1.048-.943H6.75A.75.75 0 016 10z"
                                      clip-rule="evenodd"/>
                            </svg>
                        </button>
                    {/if}
                </div>
            {/if}
        </div>
    </div>

    <!-- 侧边栏切换按钮 -->
    <div class="fixed left-0 top-[50dvh] -translate-y-1/2 transition-transform translate-x-[255px] md:translate-x-[260px] rotate-0">
        <Tooltip
                content={`${show ? $i18n.t('Close') : $i18n.t('Open')} ${$i18n.t('sidebar')}`}
                placement="right"
                touch={false}
        >
            <button
                    class="group"
                    id="sidebar-toggle-button"
                    on:click={() => {
                    show = !show;
                }}
            >
                <span class="" data-state="closed">
                    <div class="flex h-[72px] w-8 items-center justify-center opacity-50 group-hover:opacity-100 transition">
                        <div class="flex h-6 w-6 flex-col items-center">
                            <div class="h-3 w-1 rounded-full bg-[#0f0f0f] dark:bg-white rotate-0 translate-y-[0.15rem] {show ? 'group-hover:rotate-[15deg]' : 'group-hover:rotate-[-15deg]'}"/>
                            <div class="h-3 w-1 rounded-full bg-[#0f0f0f] dark:bg-white rotate-0 translate-y-[-0.15rem] {show ? 'group-hover:rotate-[-15deg]' : 'group-hover:rotate-[15deg]'}"/>
                        </div>
                    </div>
                </span>
            </button>
        </Tooltip>
    </div>
</div>
<KTour finishBtnText="完成" nextBtnText="下一步" on:close={handleClose} on:finish={handleFinish}
       open={openTour} placement="right"
       prevBtnText="上一步" {steps}>
    <!-- 使用具名slot -->
    <div let:current let:handleNext let:handlePrev slot="footer">
        <footer class="flex justify-end">
            <div>
                <button class="px-2 py-1 text-[10px] bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        on:click={handleTourHide}>
                    不在显示
                </button>
            </div>
        </footer>
    </div>
</KTour>
{#key selectedUser}
    <EditUserModal
            bind:show={showUpdatePwdModal}
            selectedUser={$user}
            sessionUser={$user}
            on:save={async (event) => {
                showUpdatePwdModal=false;
		}}
    />
{/key}
<PackageModal
        bind:show={showPackageModal}
        currentPlan={currentPlan}
        fieldConfig={fieldConfig}
        pricingData={pricingData}
/>

<style>
    .custom-gradient {
        background: linear-gradient(to bottom right, #3b82f6, #4f46e5);
    }

    .floating-menu {
        backdrop-filter: blur(10px);
        transition: all 0.3s ease;
    }

    .menu-item {
        transition: all 0.2s ease;
    }

    .menu-item:hover {
        transform: translateX(5px);
    }

    .progress-bar {
        transition: width 0.5s ease-in-out;
    }
</style>
