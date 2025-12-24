<script lang="ts">
	import { Collapsible } from 'bits-ui';

	import { scopes, showSettings, settings, user } from '$lib/stores';
	import { onMount, tick, getContext } from 'svelte';
	import { toast } from 'svelte-sonner';
	import Selector from './ScopeSelector/Selector.svelte';
	import Tooltip from '../common/Tooltip.svelte';

	const i18n = getContext('i18n');

	export let selectedScopes;
	export let disabled = false;

	const saveDefaultScope = async () => {
		const hasEmptyModel = selectedScopes.filter((it) => it === '');
		if (hasEmptyModel.length) {
			toast.error($i18n.t('Choose a scope before saving...'));
			return;
		}
		settings.set({ ...$settings, scopes: selectedScopes });
		localStorage.setItem('settings', JSON.stringify($settings));
		toast.success($i18n.t('Default knowledge scope is selected!'));
	};

	const compare_scopes = (scopes_a, scopes_b) => {
        if ((scopes_a?.length ?? 0) !== scopes_b.length) {
            return false;
        }
        return scopes_a.every((element, index) => element === scopes_b[index]);
	}

	$: if (selectedScopes.length > 0) {
		const hasEmptyModel = selectedScopes.filter((it) => it === '');
		if (hasEmptyModel.length) {
		}
		else {
		    if (!compare_scopes($settings?.scopes, selectedScopes)) {
    		    settings.set({ ...$settings, scopes: selectedScopes });
    	    	localStorage.setItem('settings', JSON.stringify($settings));
    		}
	    }
	}
</script>

<div class="flex flex-col mt-0.5 w-full">
	{#each selectedScopes as scope, scopeIdx}
		<div class="flex w-full">
			<div class="overflow-hidden w-full">
				<div class="mr-0.5 max-w-full">
					<Selector
						placeholder={$i18n.t('Select knowledge scope')}
						items={$scopes
						.map((s) => ({
							value: s.name,
							label: s.name,
							description: s.description,
							file_num: s.file_num,
							cache_ready: s.cache_ready
						}))}						
						bind:value={scope}
					/>
				</div>
			</div>
			{#if scopeIdx === 0}
				<div class="  self-center mr-2 disabled:text-gray-600 disabled:hover:text-gray-600">
					<Tooltip content="{$i18n.t('Add scope')}">
						<button
							class=" "
							{disabled}
							on:click={() => {
								selectedScopes = [...selectedScopes, ''];
							}}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								class="w-4 h-4"
							>
								<path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m6-6H6" />
							</svg>
						</button>
					</Tooltip>
				</div>
			{:else}
				<div class="  self-center disabled:text-gray-600 disabled:hover:text-gray-600 mr-2">
					<Tooltip content="{$i18n.t('Delete scope')}">
						<button
							{disabled}
							on:click={() => {
								selectedScopes.splice(scopeIdx, 1);
								selectedScopes = selectedScopes;
							}}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								class="w-4 h-4"
							>
								<path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12h-15" />
							</svg>
						</button>
					</Tooltip>
				</div>
			{/if}
		</div>

	{/each}
</div>

<!--
<div class="text-left mt-0.5 ml-1 text-[0.7rem] text-gray-500">
	<button on:click={saveDefaultScope}> {$i18n.t('Set as default')}</button>
</div>
-->