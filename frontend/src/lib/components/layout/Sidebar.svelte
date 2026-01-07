<script lang="ts">
    import {v4 as uuidv4} from 'uuid';
    import fileSaver from 'file-saver';
    import 'virtual:uno.css'

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
        <div class="px-3 py-3 border-b ">
            <div class="space-y-1">
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

                            <!-- 菜单选项 -->
                            <div class="space-y-2">

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
