<script lang="ts">
    import {UpdateConfigInfo} from '$lib/apis/rag';
    import {
        system_name,
        system_welcome_title,
        system_welcome,
        show_welcome,
        show_welcome_title,
        system_logo,
        login_bg,
        signUpEnabledStatus,
        system_allCompanyName,
        system_allCompanyUrl,
        system_failedAnswer,
        kbman_super_enabled,
        sdk_access_token_enabled,
        sdk_access_token_duration,
        sdk_dev_doc
    } from '$lib/stores';
    import {
        getDefaultUserRole,
        getSignUpEnabledStatus,
        toggleSignUpEnabledStatus,
        updateDefaultUserRole
    } from '$lib/apis/auths';
    import {onMount, getContext} from 'svelte';
    import {toast} from "svelte-sonner";

    const i18n = getContext('i18n');

    let signUpEnabled = true;
    let defaultUserRole = 'kbman';
    let systemName = '';
    let allCompanyName = '';
    let allCompanyUrl = '';
    let failedAnswer = false;
    let tokenEnabled = false;
    let kbman_super = false;
    let tokenDuration = '90';
    let systemWelcome = '';
    let systemWelcomeTitle = '';
    let showSysTitle = false;
    let showSysWelcome = false;
    let systemLogo = ''; // 新增logo变量
    let loginBg = '';
    let sdkDevDoc = true;

    let initDefaultUserRole = 'kbman';
    let initSystemName = '';
    let initSystemWelcome = '';
    let initSystemWelcomeTitle = '';
    let initShowSysTitle = false;
    let initShowSysWelcome = false;
    let initSystemLogo = ''; // 新增初始化logo变量
    let initLoginBg = '';
    let initAllCompanyName = '';
    let initAllCompanyUrl = '';
    let initFailedAnswer = false;
    let initTokenEnabled = false;
    let initKbmanSuper = false;
    let initTokenDuration = 'infinite';
    let initSdkDevDoc = true;


    const saveInfoHandler = async () => {
        if ($signUpEnabledStatus != signUpEnabled) {
            await toggleSignUpEnabledStatus(localStorage.token);
            $signUpEnabledStatus = signUpEnabled;
        }
        if (initDefaultUserRole != defaultUserRole) {
            await updateDefaultUserRole(localStorage.token, defaultUserRole);
            initDefaultUserRole = defaultUserRole;
        }
        if (initSystemName != systemName) {
            await UpdateConfigInfo({key: 'system_name', value: systemName}, localStorage.token)
            initSystemName = systemName
            system_name.set(systemName);
        }
        if (initSystemWelcome != systemWelcome) {
            await UpdateConfigInfo({key: 'system_welcome', value: systemWelcome}, localStorage.token)
            initSystemWelcome = systemWelcome
            system_welcome.set(systemWelcome);
        }
        if (initSystemWelcomeTitle != systemWelcomeTitle) {
            await UpdateConfigInfo({key: 'system_welcome_title', value: systemWelcomeTitle}, localStorage.token)
            initSystemWelcomeTitle = systemWelcomeTitle
            system_welcome_title.set(systemWelcomeTitle);
        }
        if (initShowSysTitle != showSysTitle) {
            await UpdateConfigInfo({key: 'show_system_title', value: String(showSysTitle)}, localStorage.token)
            initShowSysTitle = showSysTitle
            show_welcome_title.set(showSysTitle)
        }
        if (initShowSysWelcome != showSysWelcome) {
            await UpdateConfigInfo({key: 'show_system_welcome', value: String(showSysWelcome)}, localStorage.token)
            initShowSysWelcome = showSysWelcome
            show_welcome.set(showSysWelcome)
        }
        if (initSystemLogo != systemLogo) {
            await UpdateConfigInfo({key: 'system_logo', value: systemLogo}, localStorage.token)
            initSystemLogo = systemLogo
            system_logo.set(systemLogo)
        }

        if (initLoginBg != loginBg) {
            await UpdateConfigInfo({key: 'login_bg', value: loginBg}, localStorage.token)
            initLoginBg = loginBg
            login_bg.set(loginBg)
        }

        if (initAllCompanyName != allCompanyName) {
            await UpdateConfigInfo({key: 'allCompanyName', value: String(allCompanyName)}, localStorage.token)
            initAllCompanyName = allCompanyName
            system_allCompanyName.set(allCompanyName)
        }


        if (initAllCompanyUrl != allCompanyUrl) {
            await UpdateConfigInfo({key: 'allCompanyUrl', value: String(allCompanyUrl)}, localStorage.token)
            initAllCompanyUrl = allCompanyUrl
            system_allCompanyUrl.set(allCompanyUrl)
        }

        if (initFailedAnswer != failedAnswer) {
            await UpdateConfigInfo({key: 'failedAnswer', value: String(failedAnswer)}, localStorage.token)
            initFailedAnswer = failedAnswer
            system_failedAnswer.set(failedAnswer)
        }
        if (initKbmanSuper != kbman_super) {
            await UpdateConfigInfo({key: 'kbman_super_enabled', value: String(kbman_super)}, localStorage.token)
            initKbmanSuper = kbman_super
            kbman_super_enabled.set(kbman_super)
        }
        if (initTokenEnabled != tokenEnabled) {
            await UpdateConfigInfo({key: 'sdk_access_token_enabled', value: String(tokenEnabled)}, localStorage.token)
            initTokenEnabled = tokenEnabled
            sdk_access_token_enabled.set(tokenEnabled)
        }
        if (initTokenDuration != tokenDuration) {
            await UpdateConfigInfo({key: 'sdk_access_token_duration', value: String(tokenDuration)}, localStorage.token)
            initTokenDuration = tokenDuration
            sdk_access_token_duration.set(tokenDuration)
        }

        if (initSdkDevDoc != sdkDevDoc) {
            await UpdateConfigInfo({key: 'sdk_dev_doc', value: String(sdkDevDoc)}, localStorage.token)
            initSdkDevDoc = sdkDevDoc
            sdk_dev_doc.set(sdkDevDoc)
        }



        toast.success('配置成功');
    };

    // 处理图片上传
    const handleLogoUpload = (event: Event) => {
        const file = (event.target as HTMLInputElement).files?.[0];
        if (!file) return;
        if (file.size / 1024 > 500) {
            toast.error('图片大小不能超过500KB');
            return;
        }

        // 检查图片尺寸
        const img = new Image();
        img.onload = () => {
            if (img.width !== 40 || img.height !== 40) {
                toast.warning('建议上传40x40大小的图片以获得最佳效果');
            }
            const reader = new FileReader();
            reader.onload = (e) => {
                systemLogo = e.target?.result as string;
            };
            reader.readAsDataURL(file);
        };
        img.src = URL.createObjectURL(file);
    };

    // 处理图片上传
    const handleLoginBgUpload = (event: Event) => {
        const file = (event.target as HTMLInputElement).files?.[0];
        if (!file) return;
        if (file.size / 1024 > 500) {
            toast.error('图片大小不能超过500KB');
            return;
        }

        // 检查图片尺寸
        const img = new Image();
        img.onload = () => {
            if (img.width !== 1120 || img.height !== 1080) {
                toast.warning('建议上传1120x1080大小的图片以获得最佳效果');
            }
            const reader = new FileReader();
            reader.onload = (e) => {
                loginBg = e.target?.result as string;
            };
            reader.readAsDataURL(file);
        };
        img.src = URL.createObjectURL(file);

    };

    onMount(async () => {
        initSystemName = systemName = $system_name;
        initSystemWelcomeTitle = systemWelcomeTitle = $system_welcome_title;
        initSystemWelcome = systemWelcome = $system_welcome;
        initShowSysTitle = showSysTitle = $show_welcome_title;
        initShowSysWelcome = showSysWelcome = $show_welcome;
        initSystemLogo = systemLogo = $system_logo;
        initLoginBg= loginBg = $login_bg;
        signUpEnabled = $signUpEnabledStatus;
        initDefaultUserRole = defaultUserRole = await getDefaultUserRole(localStorage.token);

        initAllCompanyName = allCompanyName = $system_allCompanyName;
        initAllCompanyUrl = allCompanyUrl = $system_allCompanyUrl;
        initFailedAnswer = failedAnswer = $system_failedAnswer;
        initTokenEnabled = tokenEnabled = $sdk_access_token_enabled;
        initKbmanSuper = kbman_super = $kbman_super_enabled;
        initTokenDuration = tokenDuration = $sdk_access_token_duration;
        initSdkDevDoc = sdkDevDoc = $sdk_dev_doc;
    });
</script>

<form
        class="flex flex-col h-full justify-between text-sm"
        on:submit|preventDefault={saveInfoHandler}
>
    <div class="pr-1.5 overflow-y-scroll h-[50vh] space-y-3">
        <!-- 新增系统logo上传 -->
        <div>
            <div class="mb-2.5 text-sm font-medium">系统Logo</div>
            <div class="flex items-center gap-4">
                {#if systemLogo}
                    <div class="w-10 h-10 rounded overflow-hidden mr-3">
                        <img class="w-full h-full object-cover" src={systemLogo}>
                    </div>
                {:else}
                    <div class="w-10 h-10 rounded border border-dashed border-gray-300 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none"
                             viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                        </svg>
                    </div>
                {/if}
                <label class="cursor-pointer">
                    <span class="px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition">
                        上传图片
                    </span>
                    <input
                            accept="image/*"
                            class="hidden"
                            on:change={handleLogoUpload}
                            type="file"
                    />
                </label>
                <div class="text-xs text-gray-500 dark:text-gray-400">图片大小不能超过500KB;建议尺寸: 40×40</div>
            </div>
        </div>
         <!-- 登录页 -->
        <div>
            <div class="mb-2.5 text-sm font-medium">登录页背景图</div>
            <div class="flex items-center gap-4">
                {#if loginBg}
                    <div class="w-10 h-10 rounded overflow-hidden mr-3">
                        <img class="w-full h-full object-cover" src={loginBg}>
                    </div>
                {:else}
                    <div class="w-10 h-10 rounded border border-dashed border-gray-300 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none"
                             viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                        </svg>
                    </div>
                {/if}
                <label class="cursor-pointer">
                    <span class="px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition">
                        上传图片
                    </span>
                    <input
                            accept="image/*"
                            class="hidden"
                            on:change={handleLoginBgUpload}
                            type="file"
                    />
                </label>
                <div class="text-xs text-gray-500 dark:text-gray-400">图片大小不能超过500KB;建议尺寸: 1120×1080</div>
            </div>
        </div>
        <!-- 系统名称 -->
        <div>
            <div class=" mb-2.5 text-sm font-medium"> {$i18n.t('AI Name')}</div>
            <div class="flex w-full gap-1.5">
                <div class="flex-1 flex flex-col gap-2">
                    <div class="flex gap-1.5">
                        <input
                                bind:value={systemName}
                                class="w-full rounded-lg py-2 px-4 text-sm dark:text-gray-300 dark:bg-gray-850 outline-none"
                                placeholder={$i18n.t('Please input')}
                                type="text"
                        />
                    </div>
                </div>
            </div>
        </div>

        <div>
            <div class=" mb-2.5 text-sm font-medium">所属公司名称</div>
            <div class="flex w-full gap-1.5">
                <div class="flex-1 flex flex-col gap-2">
                    <div class="flex gap-1.5">
                        <input
                                bind:value={allCompanyName}
                                class="w-full rounded-lg py-2 px-4 text-sm dark:text-gray-300 dark:bg-gray-850 outline-none"
                                placeholder={$i18n.t('Please input')}
                                type="text"
                        />
                    </div>
                </div>
            </div>
        </div>

        <div>
            <div class=" mb-2.5 text-sm font-medium">所属公司网址</div>
            <div class="flex w-full gap-1.5">
                <div class="flex-1 flex flex-col gap-2">
                    <div class="flex gap-1.5">
                        <input
                                bind:value={allCompanyUrl}
                                class="w-full rounded-lg py-2 px-4 text-sm dark:text-gray-300 dark:bg-gray-850 outline-none"
                                placeholder={$i18n.t('Please input')}
                                type="text"
                        />
                    </div>
                </div>
            </div>
        </div>

        <!-- 问候语标题 -->
        <div>
            <div class=" mb-2.5 text-sm font-medium"> 问候语标题</div>
            <div class="flex w-full gap-1.5">
                <div class="flex-1 flex flex-col gap-2">
                    <div class="flex gap-1.5">
                        <input
                                bind:value={systemWelcomeTitle}
                                class="w-full rounded-lg py-2 px-4 text-sm dark:text-gray-300 dark:bg-gray-850 outline-none"
                                placeholder={$i18n.t('Please input')}
                                type="text"
                        />
                        <label class="relative inline-flex items-center cursor-pointer">
                            <input
                                    bind:checked={showSysTitle}
                                    class="sr-only peer"
                                    type="checkbox"

                            >
                            <div class="w-11 h-6 bg-gray-200 rounded-full peer
                                dark:bg-gray-700 peer-checked:after:translate-x-full
                                peer-checked:after:border-white after:content-['']
                                after:absolute after:top-[8px] after:left-[2px]
                                after:bg-white after:border-gray-300 after:border
                                after:rounded-full after:h-5 after:w-5
                                after:transition-all dark:border-gray-600
                                peer-checked:bg-emerald-600"></div>
                        </label>
                    </div>
                </div>
            </div>
        </div>

        <!-- 问候语 -->
        <div>
            <div class=" mb-2.5 text-sm font-medium">
                问候语
            </div>
            <div class="flex w-full gap-1.5">
                <div class="flex-1 flex flex-col gap-2">
                    <div class="flex gap-1.5">
                        <input
                                bind:value={systemWelcome}
                                class="w-full rounded-lg py-2 px-4 text-sm dark:text-gray-300 dark:bg-gray-850 outline-none"
                                placeholder={$i18n.t('Please input')}
                                type="text"
                        />
                        <label class="relative inline-flex items-center cursor-pointer">
                            <input
                                    bind:checked={showSysWelcome}
                                    class="sr-only peer"
                                    type="checkbox"
                            >
                            <div class="w-11 h-6 bg-gray-200 rounded-full peer
                                dark:bg-gray-700 peer-checked:after:translate-x-full
                                peer-checked:after:border-white after:content-['']
                                after:absolute after:top-[8px] after:left-[2px]
                                after:bg-white after:border-gray-300 after:border
                                after:rounded-full after:h-5 after:w-5
                                after:transition-all dark:border-gray-600
                                peer-checked:bg-emerald-600"></div>
                        </label>
                    </div>
                </div>
            </div>
        </div>

        <!-- 注册启用切换部分 -->
        <div class="flex space-x-2 items-center ">
            <div class="flex gap-1.5">
                <div class="flex-1 flex flex-col gap-2">
                    <div class="flex gap-1.5">
                        <label class="relative inline-flex items-center cursor-pointer">
                            <input
                                    bind:checked={signUpEnabled}
                                    class="sr-only peer"
                                    type="checkbox"
                            >
                            <div class="w-11 h-6 bg-gray-200 rounded-full peer
                            dark:bg-gray-700 peer-checked:after:translate-x-full
                            peer-checked:after:border-white after:content-['']
                            after:absolute after:top-[2px] after:left-[2px]
                            after:bg-white after:border-gray-300 after:border
                            after:rounded-full after:h-5 after:w-5
                            after:transition-all dark:border-gray-600
                            peer-checked:bg-emerald-600"></div>
                        </label>
                    </div>
                </div>
            </div>
            <div class=" text-sm font-medium"> {$i18n.t('Enable New Sign Ups')}</div>
        </div>
        <!-- 开放SDK文档 -->
        <div class="flex space-x-2 items-center ">
            <div class="flex gap-1.5">
                <div class="flex-1 flex flex-col gap-2">
                    <div class="flex gap-1.5">
                        <label class="relative inline-flex items-center cursor-pointer">
                            <input
                                    bind:checked={sdkDevDoc}
                                    class="sr-only peer"
                                    type="checkbox"
                            >
                            <div class="w-11 h-6 bg-gray-200 rounded-full peer
                            dark:bg-gray-700 peer-checked:after:translate-x-full
                            peer-checked:after:border-white after:content-['']
                            after:absolute after:top-[2px] after:left-[2px]
                            after:bg-white after:border-gray-300 after:border
                            after:rounded-full after:h-5 after:w-5
                            after:transition-all dark:border-gray-600
                            peer-checked:bg-emerald-600"></div>
                        </label>
                    </div>
                </div>
            </div>
            <div class=" text-sm font-medium"> 开放SDK开发文档</div>
        </div>
        <div class="flex space-x-2 items-center ">
            <div class="flex gap-1.5">
                <div class="flex-1 flex flex-col gap-2">
                    <div class="flex gap-1.5">
                        <label class="relative inline-flex items-center cursor-pointer">
                            <input
                                    bind:checked={failedAnswer}
                                    class="sr-only peer"
                                    type="checkbox"
                            >
                            <div class="w-11 h-6 bg-gray-200 rounded-full peer
                                dark:bg-gray-700 peer-checked:after:translate-x-full
                                peer-checked:after:border-white after:content-['']
                                after:absolute after:top-[2px] after:left-[2px]
                                after:bg-white after:border-gray-300 after:border
                                after:rounded-full after:h-5 after:w-5
                                after:transition-all dark:border-gray-600
                                peer-checked:bg-emerald-600"></div>
                        </label>
                    </div>
                </div>
            </div>
            <div class=" text-sm font-medium"> 允许大模型检索失败回答“不知道”</div>
        </div>
        <div class="flex space-x-2 items-center ">
            <div class="flex gap-1.5">
                <div class="flex-1 flex flex-col gap-2">
                    <div class="flex gap-1.5">
                        <label class="relative inline-flex items-center cursor-pointer">
                            <input
                                    bind:checked={kbman_super}
                                    class="sr-only peer"
                                    type="checkbox"
                            >
                            <div class="w-11 h-6 bg-gray-200 rounded-full peer
                                        dark:bg-gray-700 peer-checked:after:translate-x-full
                                        peer-checked:after:border-white after:content-['']
                                        after:absolute after:top-[2px] after:left-[2px]
                                        after:bg-white after:border-gray-300 after:border
                                        after:rounded-full after:h-5 after:w-5
                                        after:transition-all dark:border-gray-600
                                        peer-checked:bg-emerald-600"></div>
                        </label>
                    </div>
                </div>
            </div>
            <div class="text-sm font-medium">角色【知识集管理员】对相同组织机构（包含子级）的知识集拥有文件管理权限</div>
        </div>
        <div class="flex space-x-2 items-center ">
            <div class="flex gap-1.5">
                <div class="flex-1 flex flex-col gap-2">
                    <div class="flex gap-1.5">
                        <label class="relative inline-flex items-center cursor-pointer">
                            <input
                                    bind:checked={tokenEnabled}
                                    class="sr-only peer"
                                    type="checkbox"
                            >
                            <div class="w-11 h-6 bg-gray-200 rounded-full peer
                                        dark:bg-gray-700 peer-checked:after:translate-x-full
                                        peer-checked:after:border-white after:content-['']
                                        after:absolute after:top-[2px] after:left-[2px]
                                        after:bg-white after:border-gray-300 after:border
                                        after:rounded-full after:h-5 after:w-5
                                        after:transition-all dark:border-gray-600
                                        peer-checked:bg-emerald-600"></div>
                        </label>
                    </div>
                </div>
            </div>
            <div class="text-sm font-medium">启用申请SDK访问令牌</div>
        </div>
        <div>
            <div class=" mb-2.5 text-sm font-medium">访问令牌有效期</div>
            <div class="flex w-full gap-1.5">
                <div class="flex-1 flex flex-col gap-2">
                    <div class="flex gap-1.5">
                        <select
                                bind:value={tokenDuration}
                                class="w-full rounded-lg py-2 px-4 text-sm dark:text-gray-300 dark:bg-gray-850 outline-none"
                        >
                            <option value="-1">无期限</option>
                            <option value="7">7天</option>
                            <option value="30">30天</option>
                            <option value="90">90天</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>

        <!-- 默认用户角色部分 -->
        <div>
            <div class=" mb-2.5 text-sm font-medium"> {$i18n.t('Default User Role')}</div>
            <div class="flex w-full gap-1.5">
                <div class="flex-1 flex flex-col gap-2">
                    <div class="flex gap-1.5">
                        <select
                                bind:value={defaultUserRole}
                                class="w-full rounded-lg py-2 px-4 text-sm dark:text-gray-300 dark:bg-gray-850 outline-none"
                        >
                            <option value="kbman">{$i18n.t('kbman')}</option>
                            <option value="user">{$i18n.t('user')}</option>
                            <option value="admin">{$i18n.t('admin')}</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="flex justify-end pt-3 text-sm font-medium">
        <button
                class="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-gray-100 transition rounded-lg"
                type="submit"
        >
            {$i18n.t('Save')}
        </button>
    </div>
</form>