<script>
	import { onMount, tick, setContext } from 'svelte';
	import {overwriteRequest} from '$lib/utils';
	import {
		config,
		user,
		theme,
		ONENODE_NAME,
		userDefaultPath,
		system_name,
		system_welcome,
		system_welcome_title,
		show_welcome,
		show_welcome_title,
		system_logo,
		login_bg,
		signUpEnabledStatus, system_allCompanyName, system_allCompanyUrl, system_failedAnswer,
		sdk_access_token_duration, sdk_access_token_enabled, gpu_number, sdk_dev_doc, kbman_super_enabled
	} from '$lib/stores';
	import { goto } from '$app/navigation';
	import { Toaster, toast } from 'svelte-sonner';

	import { getBackendConfig } from '$lib/apis';
	import { getSessionUser } from '$lib/apis/auths';
    import { getSystemInfo, getVersion } from '$lib/apis/rag';
	import { getSignUpEnabledStatus } from '$lib/apis/auths';

	import '../app.css';
	import '../tailwind.css';
	import 'tippy.js/dist/tippy.css';
	import { ONENODE_BASE_URL } from '$lib/constants';
	import i18n, { initI18n } from '$lib/i18n';

	setContext('i18n', i18n);

	let loaded = false;

	overwriteRequest();

	onMount(async () => {
		theme.set(localStorage.theme);
		// Check Backend Status
		const backendConfig = await getBackendConfig();
		signUpEnabledStatus.set(await getSignUpEnabledStatus());
		if (backendConfig) {
			// Save Backend Status to Store
			await config.set(backendConfig);
			if ($config.default_locale) {
				initI18n($config.default_locale);
			} else {
				initI18n();
			}

			await ONENODE_NAME.set(backendConfig.name);
			console.log(backendConfig);
			if ($config) {
                const queryParams = new URLSearchParams(window.location.search);

                // Check if 'token' parameter exists
                if (queryParams.has('token')) {
                    const token = queryParams.get('token'); // Get the token value
					const sessionUser = await getSessionUser(token).catch((error) => {
						toast.error(error);
					});
					localStorage.token = token;
                    await user.set(sessionUser);
                    localStorage.setItem('builtin_mode', 'token')//登录模式
                }

				if (localStorage.token) {
				    await getSystemInfo(localStorage.token).then((data) => {
						if(!data.token_valid)
							goto('/auth');
						system_name.set(data.system_name);
						system_welcome.set(data.system_welcome);
						system_welcome_title.set(data.system_welcome_title);
						show_welcome.set(data.show_system_welcome==="true")
						show_welcome_title.set(data.show_system_title==="true")
						system_logo.set(data.system_logo)
						login_bg.set(data.login_bg)
						system_allCompanyName.set(data.allCompanyName)
						system_allCompanyUrl.set(data.allCompanyUrl)
						system_failedAnswer.set(data.failedAnswer==="true")
						sdk_access_token_enabled.set(data.token_enabled==="true")
						sdk_access_token_duration.set(data.token_duration)
						gpu_number.set(parseInt(data.gpu_number || 0))
						sdk_dev_doc.set(data.sdk_dev_doc==="true")
						kbman_super_enabled.set(data.kbman_super_enabled==="true")
				    })


					// Get Session User Info
					const sessionUser = await getSessionUser(localStorage.token).catch((error) => {
						toast.error(error);
						return null;
					});

					if (sessionUser) {
						// Save Session User to Store
						await user.set(sessionUser);
					} else {
						// Redirect Invalid Session User to /auth Page
						localStorage.removeItem('token');
						await goto('/auth');
					}
				} else {
					await goto('/auth');
				}
			}
		} else {
			// Redirect to /error when Backend Not Detected
			await goto(`/error`);
		}

		await tick();
		loaded = true;
	});
</script>

<svelte:head>
	<!--<link rel="icon" href="{ONENODE_BASE_URL}/static/favicon.png" />-->
	<link rel="stylesheet" type="text/css" href="/themes/rosepine.css" />
	<link rel="stylesheet" type="text/css" href="/themes/rosepine-dawn.css" />
</svelte:head>

{#if loaded}
	<slot />
{/if}

<Toaster closeButton richColors position="top-center" />
