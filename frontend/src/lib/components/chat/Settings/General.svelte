<script lang="ts">
    import {toast} from 'svelte-sonner';
    import {createEventDispatcher, onMount, getContext} from 'svelte';
    import {getLanguages} from '$lib/i18n';
    import {getAnswerCorrection, UpdateConfigInfo} from '$lib/apis/rag';

    const dispatch = createEventDispatcher();
    import {user, theme} from '$lib/stores';

    const i18n = getContext('i18n');

    export let saveSettings: Function;

    // General
    let themes = ['dark', 'light', 'rose-pine dark', 'rose-pine-dawn light', 'oled-dark'];
    let selectedTheme = 'system';
    let selAnswerCorrection = '';
    let languages = [];
    let lang = $i18n.language;
    let notificationEnabled = false;
    let system = '';
    let showAdvanced = false;

    const toggleNotification = async () => {
        const permission = await Notification.requestPermission();

        if (permission === 'granted') {
            notificationEnabled = !notificationEnabled;
            saveSettings({notificationEnabled: notificationEnabled});
        } else {
            toast.error(
                'Response notifications cannot be activated as the website permissions have been denied. Please visit your browser settings to grant the necessary access.'
            );
        }
    };

    // Advanced
    let requestFormat = '';
    let keepAlive = null;

    let options = {
        // Advanced
        seed: 0,
        temperature: '',
        repeat_penalty: '',
        repeat_last_n: '',
        mirostat: '',
        mirostat_eta: '',
        mirostat_tau: '',
        top_k: '',
        top_p: '',
        stop: '',
        tfs_z: '',
        num_ctx: '',
        num_predict: ''
    };

    const toggleRequestFormat = async () => {
        if (requestFormat === '') {
            requestFormat = 'json';
        } else {
            requestFormat = '';
        }

        saveSettings({requestFormat: requestFormat !== '' ? requestFormat : undefined});
    };

    onMount(async () => {
        selectedTheme = localStorage.theme ?? 'system';
        await getAnswerCorrectionConfig();

        let settings = JSON.parse(localStorage.getItem('settings') ?? '{}');
        languages = await getLanguages();

        notificationEnabled = settings.notificationEnabled ?? false;
        system = settings.system ?? '';

        requestFormat = settings.requestFormat ?? '';
        keepAlive = settings.keepAlive ?? null;

        options.seed = settings.seed ?? 0;
        options.temperature = settings.temperature ?? '';
        options.repeat_penalty = settings.repeat_penalty ?? '';
        options.top_k = settings.top_k ?? '';
        options.top_p = settings.top_p ?? '';
        options.num_ctx = settings.num_ctx ?? '';
        options = {...options, ...settings.options};
        options.stop = (settings?.options?.stop ?? []).join(',');
    });

    const applyTheme = (_theme: string) => {
        let themeToApply = _theme === 'oled-dark' ? 'dark' : _theme;

        if (_theme === 'system') {
            themeToApply = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        }

        if (themeToApply === 'dark' && !_theme.includes('oled')) {
            document.documentElement.style.setProperty('--color-gray-900', '#171717');
            document.documentElement.style.setProperty('--color-gray-950', '#0d0d0d');
        }

        themes
            .filter((e) => e !== themeToApply)
            .forEach((e) => {
                e.split(' ').forEach((e) => {
                    document.documentElement.classList.remove(e);
                });
            });

        themeToApply.split(' ').forEach((e) => {
            document.documentElement.classList.add(e);
        });
    };

    const themeChangeHandler = (_theme: string) => {
        theme.set(_theme);
        localStorage.setItem('theme', _theme);
        if (_theme.includes('oled')) {
            document.documentElement.style.setProperty('--color-gray-900', '#000000');
            document.documentElement.style.setProperty('--color-gray-950', '#000000');
            document.documentElement.classList.add('dark');
        }
        applyTheme(_theme);
    };


    const getAnswerCorrectionConfig = async () => {
        await getAnswerCorrection(localStorage.token).then((res) => {
            selAnswerCorrection = res
        });
    }

    const settingAnswerCorrection = async (val: string) => {
        selAnswerCorrection = val;
        await UpdateConfigInfo({key: 'answer_correction', value: val}, localStorage.token).then(() => {
            toast.success('设置成功')
        })
    }

</script>
<div class="flex flex-col h-full justify-between text-sm">
    <div class="pr-1.5 overflow-y-scroll h-[50vh] space-y-3">
        <div>
            <div class=" mb-2.5 text-sm font-medium"> {$i18n.t('Theme')}</div>
            <div class="flex w-full gap-1.5">
                <div class="flex-1 flex flex-col gap-2">
                    <div class="grid grid-cols-3 gap-2">
                        <button
                                class="flex items-center gap-1 p-3 rounded-lg border-2 transition-all hover:bg-gray-50 dark:hover:bg-gray-700 {selectedTheme === 'system' ? 'border-blue-500 bg-blue-50 dark:bg-blue-950' : 'border-gray-200 dark:border-gray-600'}"
                                on:click={() => {selectedTheme = 'system'; themeChangeHandler('system')}}
                        >
                            <span class="text-sm">⚙️</span>
                            <span class="text-sm font-medium">{$i18n.t('System')}</span>
                        </button>

                        <button
                                class="flex items-center gap-1 p-3 rounded-lg border-2 transition-all hover:bg-gray-50 dark:hover:bg-gray-700 {selectedTheme === 'dark' ? 'border-blue-500 bg-blue-50 dark:bg-blue-950' : 'border-gray-200 dark:border-gray-600'}"
                                on:click={() => {selectedTheme = 'dark'; themeChangeHandler('dark')}}
                        >
                            <span class="text-sm">🌑</span>
                            <span class="text-sm font-medium">{$i18n.t('Dark')}</span>
                        </button>

                        <button
                                class="flex items-center gap-1 p-3 rounded-lg border-2 transition-all hover:bg-gray-50 dark:hover:bg-gray-700 {selectedTheme === 'oled-dark' ? 'border-blue-500 bg-blue-50 dark:bg-blue-950' : 'border-gray-200 dark:border-gray-600'}"
                                on:click={() => {selectedTheme = 'oled-dark'; themeChangeHandler('oled-dark')}}
                        >
                            <span class="text-sm">🌃</span>
                            <span class="text-sm font-medium">{$i18n.t('OLED Dark')}</span>
                        </button>

                        <button
                                class="flex items-center gap-1 p-3 rounded-lg border-2 transition-all hover:bg-gray-50 dark:hover:bg-gray-700 {selectedTheme === 'light' ? 'border-blue-500 bg-blue-50 dark:bg-blue-950' : 'border-gray-200 dark:border-gray-600'}"
                                on:click={() => {selectedTheme = 'light'; themeChangeHandler('light')}}
                        >
                            <span class="text-sm">☀️</span>
                            <span class="text-sm font-medium">{$i18n.t('Light')}</span>
                        </button>

                        <button
                                class="flex items-center gap-1 p-3 rounded-lg border-2 transition-all hover:bg-gray-50 dark:hover:bg-gray-700 {selectedTheme === 'rose-pine dark' ? 'border-blue-500 bg-blue-50 dark:bg-blue-950' : 'border-gray-200 dark:border-gray-600'}"
                                on:click={() => {selectedTheme = 'rose-pine dark'; themeChangeHandler('rose-pine dark')}}
                        >
                            <span class="text-sm">🌹</span>
                            <span class="text-sm font-medium">{$i18n.t('Rosé Pine')}</span>
                        </button>

                        <button
                                class="flex items-center gap-1 p-3 rounded-lg border-2 transition-all hover:bg-gray-50 dark:hover:bg-gray-700 {selectedTheme === 'rose-pine-dawn light' ? 'border-blue-500 bg-blue-50 dark:bg-blue-950' : 'border-gray-200 dark:border-gray-600'}"
                                on:click={() => {selectedTheme = 'rose-pine-dawn light'; themeChangeHandler('rose-pine-dawn light')}}
                        >
                            <span class="text-sm">🌷</span>
                            <span class="text-sm font-medium">{$i18n.t('Rosé Pine Dawn')}</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        {#if $user.role === 'admin'}
            <div>
                <div class="flex mb-2.5 text-sm font-medium">
                    {$i18n.t('Answer correction')}
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                         stroke="currentColor" class="size-5 ml-1">
                        <path stroke-linecap="round" stroke-linejoin="round"
                              d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"/>
                    </svg>
                </div>
                <div class="flex w-full gap-1.5">
                    <div class="flex-1 flex flex-col gap-2">
                        <div class="grid grid-cols-2 gap-2">
                            <button
                                    class="flex items-center gap-1 p-3 rounded-lg border-2 transition-all hover:bg-gray-50 dark:hover:bg-gray-700
                                    {selAnswerCorrection === 'auto' ? 'border-blue-500 bg-blue-50 dark:bg-blue-950' : 'border-gray-200 dark:border-gray-600'}"
                                    on:click={()=>{settingAnswerCorrection('auto')}}
                            >
                                <span class="text-sm font-medium">自动生效</span>
                            </button>

                            <button
                                    class="flex items-center gap-1 p-3 rounded-lg border-2 transition-all hover:bg-gray-50 dark:hover:bg-gray-700
                                    {selAnswerCorrection === 'review' ? 'border-blue-500 bg-blue-50 dark:bg-blue-950' : 'border-gray-200 dark:border-gray-600'}"
                                    on:click={()=>{settingAnswerCorrection('review')}}
                            >
                                <span class="text-sm font-medium">知识集管理员审核</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        {/if}

<!--        &lt;!&ndash;多语言设置：暂时屏蔽&ndash;&gt;-->
<!--        <div class=" flex w-full justify-between hidden">-->
<!--            <div class=" self-center font-medium">{$i18n.t('Language')}</div>-->
<!--            <div class="flex items-center relative">-->
<!--                <select-->
<!--                        class=" dark:bg-gray-900 w-fit pr-8 rounded py-2 px-2 text-xs bg-transparent outline-none text-right"-->
<!--                        bind:value={lang}-->
<!--                        placeholder="Select a language"-->
<!--                        on:change={(e) => {-->
<!--							$i18n.changeLanguage(lang);-->
<!--						}}-->
<!--                >-->
<!--                    {#each languages as language}-->
<!--                        <option value={language['code']}>{language['title']}</option>-->
<!--                    {/each}-->
<!--                </select>-->
<!--            </div>-->
<!--        </div>-->
<!--        {#if $i18n.language === 'zh-CN'}-->
<!--            <div class="hidden mb-2 text-gray-400 dark:text-gray-500 ">-->
<!--                Couldn't find your language?-->
<!--                <a-->
<!--                        class=" text-gray-300 font-medium underline"-->
<!--                        href="https://github.com/open-webui/open-webui/blob/main/docs/CONTRIBUTING.md#-translations-and-internationalization"-->
<!--                        target="_blank"-->
<!--                >-->
<!--                    Help us translate Sapientia!-->
<!--                </a>-->
<!--            </div>-->
<!--        {/if}-->
<!--        &lt;!&ndash;桌面通知设置：暂时屏蔽&ndash;&gt;-->
<!--        <div>-->
<!--            <div class="hidden py-0.5 flex w-full justify-between">-->
<!--                <div class=" self-center font-medium">{$i18n.t('Desktop Notifications')}</div>-->

<!--                <button-->
<!--                        class="p-1 px-3 flex rounded transition"-->
<!--                        on:click={() => {-->
<!--							toggleNotification();-->
<!--						}}-->
<!--                        type="button"-->
<!--                >-->
<!--                    {#if notificationEnabled === true}-->
<!--                        <span class="ml-2 self-center">{$i18n.t('On')}</span>-->
<!--                    {:else}-->
<!--                        <span class="ml-2 self-center">{$i18n.t('Off')}</span>-->
<!--                    {/if}-->
<!--                </button>-->
<!--            </div>-->
<!--        </div>-->

    </div>
</div>
