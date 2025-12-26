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
    import { GetUserDefaultPath } from '$lib/apis/unit';
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
