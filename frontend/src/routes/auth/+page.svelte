<script>
    import {goto} from '$app/navigation';
    import {getContext, onDestroy, onMount} from 'svelte';
    import {
        isRegistration,
        sendVerification,
        userSignIn,
        userSignUp,
        getRegVerifyStatus,
        getSystemName
    } from '$lib/apis/auths';
    import {registerNameExists} from '$lib/apis/users';
    import {toast} from 'svelte-sonner';
    import {user, signUpEnabledStatus, system_allCompanyName} from '$lib/stores';
    import {verifyPasswordReg} from "$lib/utils";

    const i18n = getContext('i18n');

    let accountRecord = '';
    let phoneNumberRecord = '';

    let phoneNumber = '';
    let registerName = '';
    let registerNameErr = '';
    let passwordTwo = '';
    let passwordTwoErr = '';
    let password = '';
    let verificationCode = '';
    let verificationInput = '';
    let isCodeSent = false;
    let countdown = 0;
    let timer;
    let isLoading = false;
    let isVerificationMode = false;
    let isRegister = false;
    let next = false;
    let registerState = false;
    let isRegisterMode = false;
    let phoneNumberErr = '';
    let passwordErr = '';
    let verificationCodeErr = '';
    let reg_verify = false;//是否开启手机验证码功能
    let signup_signin_title = "";
    let systemName = '';
    let loginBg = '';
    let company_name = '';
    onMount(async () => {

        await getSystemName().then((data) => {
            console.log(data)
            company_name = data.allCompanyName ? data.allCompanyName : '上海求索时刻科技有限公司';
            systemName = data.system_name;
            loginBg = data.login_bg;
        })
        await getRegVerifyStatus().then((data) => {
            reg_verify = data;
            if ($signUpEnabledStatus) {
                if (reg_verify) {//验证码登录&用户注册
                    signup_signin_title = '验证码登录 / 注册';
                } else {//用户注册
                    signup_signin_title = '用户注册';
                }
            } else {//验证码登录
                if (reg_verify) {
                    signup_signin_title = '验证码登录';
                }
            }
        })

        if ($user !== undefined) {
            await goto('/');
        }
    });

    // 清理定时器以防内存泄漏
    onDestroy(() => {
        if (timer) clearInterval(timer);
    });

    async function handleGetCode() {
        if (!phoneNumber || phoneNumber.length !== 11) {
            phoneNumberErr = '请输入有效的手机号码';
            return;
        }
        if (verificationInput) verificationInput.focus();
        // 发送验证码
        await sendVerification(phoneNumber).then((res) => {
            if (res.success) {
                isCodeSent = true;
                countdown = 60;
                if (timer) clearInterval(timer);
                timer = setInterval(() => {
                    countdown--;
                    if (countdown <= 0) {
                        clearInterval(timer);
                        isCodeSent = false;
                    }
                }, 1000);
                toast.success(res.message);
            } else {
                toast.error(res.message);
            }
        });
    }

    async function handleLogin() {
        verifyPhoneNumber();
        verifyPassword();
        verifyCode();
        if (phoneNumberErr || passwordErr || verificationCodeErr) return;
        isLoading = true;
        if (isRegisterMode) {
            await signUpHandler();//注册
        } else {
            await signInHandler();//登录
        }
    }

    async function newRegister() {
        verifyPhoneNumber();
        verifyPassword();
        verifyName();
        if (reg_verify) {
            verifyCode();
        }

        verifyPasswordTwo();
        verifyPasswordOne();
        await nameBlur();
        if (phoneNumberErr || passwordErr || verificationCodeErr || passwordTwoErr || registerNameErr) return;
        isLoading = true;
        await userSignUp(registerName, phoneNumber, password, verificationCode)
            .then(async (sessionUser) => {
                await setSessionUser(sessionUser);
                isLoading = false;
            })
            .catch((error) => {
                toast.error(error);
                isLoading = false;
                return null;
            });
    }

    async function JudgingRegistration() {
        const has_phoneNumber = await isRegistration(phoneNumber).catch(() => {
            isLoading = false;
            return null;
        })
        if (has_phoneNumber) {//手机号已注册
            if (!reg_verify) {
                toast.warning('该手机号已注册。');
                return;
            }
            registerState = !has_phoneNumber;
            isRegister = !has_phoneNumber;
            next = true;//进入下一步
        } else {//手机号未注册
            if ($signUpEnabledStatus) {//允许注册
                registerState = !has_phoneNumber;
                isRegister = !has_phoneNumber;
                next = true;//进入下一步
            } else {//禁止注册
                toast.warning('该手机号未注册。');
            }
        }
    }

    const signInHandler = async () => {
        await userSignIn(phoneNumber, password, verificationCode)
            .then(async (sessionUser) => {
                localStorage.setItem('builtin_mode', 'pwd');//登录模式
                await setSessionUser(sessionUser);
                isLoading = false;
            })
            .catch((error) => {
                if (isVerificationMode) {
                    toast.error('登录失败,请检查手机号和验证码是否正确');
                } else {
                    toast.error('登录失败,请检查账号密码是否正确');
                }
                isLoading = false;
                return null;
            });

    };

    const signUpHandler = async () => {
        let name = phoneNumber;
        await userSignUp(name, phoneNumber, '', verificationCode)
            .then(async (sessionUser) => {
                await setSessionUser(sessionUser);
                isLoading = false;
            })
            .catch((error) => {
                toast.error(error);
                isLoading = false;
                return null;
            });
    };

    const setSessionUser = async (sessionUser) => {
        if (sessionUser) {
            toast.success($i18n.t(`You're now logged in.`));
            localStorage.token = sessionUser.token;
            await user.set(sessionUser);
            window.location.replace('/');
        }
    };

    function changeVerificationMode() {
        isVerificationMode = !isVerificationMode;
        if (isVerificationMode) {
            accountRecord = phoneNumber;
            phoneNumber = phoneNumberRecord;
        } else {
            phoneNumberRecord = phoneNumber;
            phoneNumber = accountRecord;
        }
        isRegister = isVerificationMode;
        cleanUp();
        if (phoneNumber) verifyPhoneNumber();
    }

    // 监听键盘Enter事件进行登录
    function handleKeydown(event) {
        if (event.key === 'Enter' && !isRegister) {
            handleLogin();
        }
    }

    function verifyPhoneNumber() {
        phoneNumberErr = '';
        if (isRegisterMode) {
            if (!phoneNumber || phoneNumber.length !== 11) {
                phoneNumberErr = '请输入有效的手机号码';
                return;
            }
            if (!/^\d+$/.test(phoneNumber)) {
                phoneNumberErr = '请输入有效的手机号码';
                return;
            }
        } else {
            if (isVerificationMode) {
                if (!phoneNumber || phoneNumber.length !== 11) {
                    phoneNumberErr = '请输入有效的手机号码';
                    return;
                }
                if (!/^\d+$/.test(phoneNumber)) {
                    phoneNumberErr = '请输入有效的手机号码';
                    return;
                }
            } else {
                if (!phoneNumber) {
                    phoneNumberErr = '请输入账号';
                    return;
                }
            }
        }
    }


    function verifyName() {
        registerNameErr = '';
        if (!registerName) {
            registerNameErr = '请输入名称';
            return;
        }
    }

    async function nameBlur() {
        await registerNameExists(registerName)
            .then((registration) => {
                if (registration) {
                    registerNameErr = '名称已存在,请换一个';
                }
            })
            .catch((error) => {
                if (isVerificationMode) {
                    toast.error('登录失败,请检查手机号和验证码是否正确');
                } else {
                    toast.error('登录失败,请检查账号密码是否正确');
                }
                isLoading = false;
                return null;
            });

    }

    function verifyPasswordOne() {
        passwordErr = verifyPasswordReg(password);
    }

    function verifyPasswordTwo() {
        passwordTwoErr = '';
        if (!passwordTwo) {
            passwordTwoErr = '请输入密码';
            return;
        } else {
            if (password !== passwordTwo) {
                passwordTwoErr = '两次密码不一致';
            }
        }
    }

    function verifyPassword() {
        passwordErr = '';
        if (!isRegisterMode && !isVerificationMode) {
            if (!password) {
                passwordErr = '请输入密码';
                return;
            }
        }
    }

    function verifyCode() {
        verificationCodeErr = '';
        if (isRegisterMode || isVerificationMode) {
            if (!/^\d{6}$/.test(verificationCode)) {
                verificationCodeErr = '请输入6位数字验证码';
                return;
            }
        }
    }

    function cleanUp() {
        phoneNumberErr = '';
        password = '';
        passwordErr = '';
        verificationCode = '';
        verificationCodeErr = '';
        registerName = '';
        registerNameErr = '';
        registerState = false;
        isCodeSent = false;
        next = false;
    }


    function back() {
        phoneNumberErr = '';
        password = '';
        passwordErr = '';
        verificationCode = '';
        verificationCodeErr = '';
        registerName = '';
        registerNameErr = '';
        registerState = false;
        isCodeSent = false;
        next = false;
        isRegister = true;
    }
</script>

<div class="min-h-screen flex flex-col md:flex-row">
    <!-- 左侧介绍区域 -->
    <div class="w-full md:w-7/12 bg-blue-50 relative overflow-hidden">

        <!-- 背景图 -->
        <div class="absolute inset-0 z-0">
            <img alt="登录背景图" class="w-full h-full object-cover" src="{loginBg || '/img/login_bg.jpg'}"/>
        </div>
        {#if loginBg == ""}
            <div class="relative z-10 mt-[10vh] px-8 md:px-32 lg:px-52 text-gray-900 text-xl">{systemName}
                原生知识库系统
            </div>
            <div class="relative z-10 h-full mt-[20vh] px-8 md:px-32 lg:px-52">
                <div class="text-blue-700">
                    <div class="text-2xl">欢迎体验全球领先、易用、高性价比的</div>
                    <div class="text-4xl font-bold">多模态AI原生知识库系统！</div>
                </div>
                <ul class="text-gray-900 space-y-3 mt-16 text-xl">
                    <li class="flex items-start">
                        <span>开箱即用、精准智能问答、智能检索、无大模型幻觉</span>
                    </li>
                    <li class="flex items-start">
                        <span>输出内容可精准追溯原文、多模态图片表格理解及混排输出</span>
                    </li>
                    <li class="flex items-start">
                        <span>文档资料自动处理、可局域网内私有化部署、服务器硬件配置要求低</span>
                    </li>
                </ul>
            </div>
            <!-- 版权信息 -->
            <div class="absolute bottom-2 text-gray-400 text-xs px-8 md:px-32 lg:px-52">
                Copyright © 2024-2025 {company_name}. All Rights Reserved
            </div>
        {/if}
    </div>
    <!-- 右侧登录区域 -->
    <div class="w-full md:w-5/12 flex items-center justify-center p-8 bg-white">
        <div class="w-full max-w-md flex flex-col h-[500px]">
            <div class="flex-grow">
                <h3 class="text-2xl font-medium text-gray-900 mb-8">{systemName}原生知识库系统</h3>
                {#if !isRegisterMode}
                    <div class="flex mb-6 border-b">
                        <button
                                type="button"
                                on:click={changeVerificationMode}
                                class={`py-2 px-4 font-medium transition-colors ${!isVerificationMode ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            账号密码登录
                        </button>
                        {#if $signUpEnabledStatus || reg_verify}
                            <button
                                    type="button"
                                    on:click={changeVerificationMode}
                                    class={`py-2 px-4 font-medium transition-colors ${isVerificationMode ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                            >
                                {signup_signin_title}
                            </button>
                        {/if}
                    </div>
                {/if}
                <div class="space-y-5" on:keydown={handleKeydown}>
                    <!-- 手机号输入 -->
                    <div class="relative">
                        <div
                                class="flex items-center border border-gray-300 rounded-md focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-all duration-200">
							<span
                                    class="text-gray-500 px-3 py-3 whitespace-nowrap">{!isRegisterMode && !isVerificationMode ? '账号' : '手机号码'}</span>
                            {#if !isRegisterMode && !isVerificationMode}
                                <input
                                        type="tel"
                                        bind:value={phoneNumber}

                                        on:input={verifyPhoneNumber}
                                        maxlength="{!isRegisterMode && !isVerificationMode ? 50 : 11}"
                                        class="flex-grow py-3 px-2 bg-white rounded-md focus:outline-none"
                                        placeholder="{!isRegisterMode && !isVerificationMode ? '请输入账号' : '请输入手机号码'}"
                                />
                            {:else}
                                {#if !next}
                                    <input
                                            type="text"
                                            inputmode="numeric"
                                            pattern="[0-9]*"
                                            bind:value={phoneNumber}
                                            on:input={verifyPhoneNumber}
                                            maxlength="{!isRegisterMode && !isVerificationMode ? 50 : 11}"
                                            class="flex-grow py-3 px-2 bg-white rounded-md focus:outline-none"
                                            placeholder="{!isRegisterMode && !isVerificationMode ? '请输入账号' : '请输入手机号码'}"
                                    />
                                {:else }
                                    <div class="px-2 text-[#aaa]">{phoneNumber}</div>
                                {/if}
                            {/if}
                            {#if phoneNumber && !next}
                                <button
                                        type="button"
                                        class="px-3 text-gray-400 hover:text-gray-600 outline-none"
                                        tabindex="-1"
                                        on:click={()=>{phoneNumber = ''}}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none"
                                         viewBox="0 0 24 24"
                                         stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                              d="M6 18L18 6M6 6l12 12"/>
                                    </svg>
                                </button>
                            {/if}
                        </div>
                    </div>
                    {#if phoneNumberErr}
                        <i class="text-red-500 text-xs mt-1">{phoneNumberErr}</i>
                    {/if}
                    <!-- 密码输入 (默认显示) -->
                    {#if !isVerificationMode}
                        <div class="relative">
                            <div
                                    class="flex items-center border border-gray-300 rounded-md focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-all duration-200">
                                <span class="text-gray-500 px-3 py-3 whitespace-nowrap">密码</span>
                                <input
                                        type="password"
                                        maxlength="20"
                                        bind:value={password}
                                        on:input={verifyPassword}
                                        class="flex-grow py-3 px-2 bg-white rounded-md focus:outline-none"
                                        placeholder="请输入密码"
                                />
                                {#if password}
                                    <button
                                            type="button"
                                            class="px-3 text-gray-400 hover:text-gray-600 outline-none"
                                            tabindex="-1"
                                            on:click={()=>{password = ''}}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none"
                                             viewBox="0 0 24 24"
                                             stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                  d="M6 18L18 6M6 6l12 12"/>
                                        </svg>
                                    </button>
                                {/if}
                            </div>
                        </div>
                        {#if passwordErr}
                            <i class="text-red-500 text-xs mt-1">{passwordErr}</i>
                        {/if}
                    {:else}
                        {#if next}
                            {#if registerState}

                                <div
                                        class="flex items-center border border-gray-300 rounded-md focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-all duration-200">
                                    <span class="text-gray-500 px-3 py-3 whitespace-nowrap">名　　称</span>
                                    <input
                                            type="tel"
                                            bind:value={registerName}
                                            on:input={verifyName}
                                            on:blur={nameBlur}
                                            maxlength="50"
                                            class="flex-grow py-3 px-2 bg-white rounded-md focus:outline-none"
                                            placeholder='请输入'
                                    />
                                    {#if registerName}
                                        <button
                                                type="button"
                                                class="px-3 text-gray-400 hover:text-gray-600 outline-none"
                                                tabindex="-1"
                                                on:click={()=>{registerName = ''}}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none"
                                                 viewBox="0 0 24 24"
                                                 stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                      d="M6 18L18 6M6 6l12 12"/>
                                            </svg>
                                        </button>
                                    {/if}
                                </div>
                                {#if registerNameErr}
                                    <i class="text-red-500 text-xs mt-1">{registerNameErr}</i>
                                {/if}
                                <div
                                        class="flex items-center border border-gray-300 rounded-md focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-all duration-200">
                                    <span class="text-gray-500 px-3 py-3 whitespace-nowrap">登录密码</span>
                                    <input
                                            type="password"
                                            maxlength="20"
                                            bind:value={password}
                                            on:input={verifyPasswordOne}
                                            class="flex-grow py-3 px-2 bg-white rounded-md focus:outline-none"
                                            placeholder="请输入密码"
                                    />
                                    {#if password}
                                        <button
                                                type="button"
                                                class="px-3 text-gray-400 hover:text-gray-600 outline-none"
                                                tabindex="-1"
                                                on:click={()=>{password = ''}}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none"
                                                 viewBox="0 0 24 24"
                                                 stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                      d="M6 18L18 6M6 6l12 12"/>
                                            </svg>
                                        </button>
                                    {/if}
                                </div>
                                {#if passwordErr}
                                    <i class="text-red-500 text-xs mt-1">{passwordErr}</i>
                                {/if}
                                <div
                                        class="flex items-center border border-gray-300 rounded-md focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-all duration-200">
                                    <span class="text-gray-500 px-3 py-3 whitespace-nowrap">确认密码</span>
                                    <input
                                            type="password"
                                            maxlength="20"
                                            bind:value={passwordTwo}
                                            on:input={verifyPasswordTwo}
                                            class="flex-grow py-3 px-2 bg-white rounded-md focus:outline-none"
                                            placeholder="请输入密码"
                                    />
                                    {#if passwordTwo}
                                        <button
                                                type="button"
                                                class="px-3 text-gray-400 hover:text-gray-600 outline-none"
                                                tabindex="-1"
                                                on:click={()=>{passwordTwo = ''}}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none"
                                                 viewBox="0 0 24 24"
                                                 stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                      d="M6 18L18 6M6 6l12 12"/>
                                            </svg>
                                        </button>
                                    {/if}
                                </div>
                                {#if passwordTwoErr}
                                    <i class="text-red-500 text-xs mt-1">{passwordTwoErr}</i>
                                {/if}

                            {/if}
                            {#if reg_verify}
                                <div class="flex space-x-2">
                                    <div class="relative flex-grow">
                                        <div
                                                class="flex items-center border border-gray-300 rounded-md focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-all duration-200">
                                            <span class="text-gray-500 px-2 py-3 whitespace-nowrap">验证码 　</span>
                                            <input
                                                    type="text"
                                                    bind:value={verificationCode}
                                                    on:input={verifyCode}
                                                    maxlength="6"
                                                    class="flex-grow py-3 px-2 bg-white rounded-md focus:outline-none"
                                                    placeholder="请输入验证码"
                                                    bind:this={verificationInput}
                                            />
                                            {#if verificationCode}
                                                <button
                                                        type="button"
                                                        class="pr-3 text-gray-400 hover:text-gray-600 outline-none"
                                                        tabindex="-1"
                                                        on:click={()=>{verificationCode = ''}}
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none"
                                                         viewBox="0 0 24 24" stroke="currentColor">
                                                        <path stroke-linecap="round" stroke-linejoin="round"
                                                              stroke-width="2"
                                                              d="M6 18L18 6M6 6l12 12"/>
                                                    </svg>
                                                </button>
                                            {/if}
                                        </div>
                                    </div>
                                    <!-- 获取验证码按钮 -->
                                    <button
                                            type="button"
                                            on:click={handleGetCode}
                                            disabled={isCodeSent || !phoneNumber || phoneNumber.length !== 11}
                                            class="px-5 py-3 bg-blue-50 text-blue-600 rounded-md font-medium hover:bg-blue-100 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed transition-all duration-200 flex-shrink-0 min-w-[120px]"
                                    >
                                        {#if isCodeSent}
                                            {countdown}s后重发
                                        {:else}
                                            获取验证码
                                        {/if}
                                    </button>
                                </div>
                                {#if verificationCodeErr}
                                    <i class="text-red-500 text-xs mt-1">{verificationCodeErr}</i>
                                {/if}
                            {/if}
                        {/if}
                    {/if}
                    {#if next}
                        <div class="flex items-center justify-end">
                            <button
                                    type="button"
                                    on:click={back}
                                    class="text-[0.7rem] bg-[#bbbfc4] text-white rounded-md py-1 px-2 hover:text-[#bbbfc4] hover:bg-blue-50 focus:outline-none transition duration-200 font-medium disabled:opacity-70 disabled:cursor-not-allowed "
                            >
                                上一步
                            </button>
                        </div>
                    {/if}
                    <!-- 登录按钮 -->
                    {#if !isRegister}
                        <button
                                type="button"
                                on:click={handleLogin}
                                disabled={isLoading}
                                class="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none transition duration-200 font-medium text-lg disabled:opacity-70 disabled:cursor-not-allowed mt-4"
                        >
                            {#if isLoading}
                            <span class="inline-flex items-center">
                                <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                                     xmlns="http://www.w3.org/2000/svg"
                                     fill="none" viewBox="0 0 24 24">
                                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                            stroke-width="4"></circle>
                                    <path class="opacity-75" fill="currentColor"
                                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                登录中...
                            </span>
                            {:else}
                                {isRegisterMode ? '注册并登录' : '登录系统'}
                            {/if}
                        </button>
                    {:else}

                        {#if !registerState}
                            <button
                                    type="button"
                                    on:click={JudgingRegistration}
                                    disabled={isCodeSent || !phoneNumber || phoneNumber.length !== 11 || !/^\d+$/.test(phoneNumber)}
                                    class="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none transition duration-200 font-medium text-lg disabled:opacity-70 disabled:cursor-not-allowed mt-4"
                            >
                                下一步
                            </button>
                        {:else}
                            <button
                                    type="button"
                                    on:click={newRegister}
                                    disabled={isLoading}
                                    class="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none transition duration-200 font-medium text-lg disabled:opacity-70 disabled:cursor-not-allowed mt-4"
                            >
                                {#if isLoading}
                            <span class="inline-flex items-center">
                                <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                                     xmlns="http://www.w3.org/2000/svg"
                                     fill="none" viewBox="0 0 24 24">
                                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                            stroke-width="4"></circle>
                                    <path class="opacity-75" fill="currentColor"
                                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                登录中...
                            </span>
                                {:else}
                                    注册并登录
                                {/if}
                            </button>
                        {/if}
                    {/if}
                </div>
            </div>

        </div>
    </div>
</div>

<style>
    /* 确保在移动设备上的响应式设计 */
    @media (max-width: 768px) {
        .min-h-screen {
            min-height: 100vh;
        }
    }
</style>
