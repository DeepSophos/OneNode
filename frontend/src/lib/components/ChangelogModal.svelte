<script lang="ts">
	import { getContext } from 'svelte';
	import { ONENODE_NAME, config } from '$lib/stores';
	import { ONENODE_VERSION } from '$lib/constants';
	import { getChangelog } from '$lib/apis';
	
	const i18n = getContext('i18n');
	let changelog = null;
  
	// 异步获取更新日志数据
	const fetchChangelog = async () => {
	  const res = await getChangelog();
	  changelog = res;
	};
  
	// 在组件挂载时获取更新日志数据
	fetchChangelog();
  </script>
  
  <!-- <div class="px-5 py-4 dark:text-gray-300">
	<div class="text-xl font-bold">
	  {$i18n.t('What’s New in')} {$ONENODE_NAME}
	</div>
	<div class="flex items-center mt-1">
	  <div class="text-sm dark:text-gray-200">{$i18n.t('Release Notes')}</div>
	  <div class="flex self-center w-[1px] h-6 mx-2.5 bg-gray-200 dark:bg-gray-700" />
	  <div class="text-sm dark:text-gray-200">
		v{ONENODE_VERSION}
	  </div>
	</div>
  </div>
  
  <hr class="dark:border-gray-800" />
  
  <div class="w-full p-4 px-5">
	<div class="overflow-y-scroll max-h-80">
	  <div class="mb-3">
		{#if changelog}
		  {#each Object.keys(changelog) as version}
			<div class="mb-3 pr-2">
			  <div class="font-bold text-xl mb-1 dark:text-white">
				v{version} - {changelog[version].date}
			  </div>
			  <hr class="dark:border-gray-800 my-2" />
			  {#each Object.keys(changelog[version]).filter((section) => section !== 'date') as section}
				<div class="">
				  <div class="font-bold uppercase text-xs {section === 'added'
					? 'text-white bg-blue-600'
					: section === 'fixed'
					? 'text-white bg-green-600'
					: section === 'changed'
					? 'text-white bg-yellow-600'
					: section === 'removed'
					? 'text-white bg-red-600'
					: ''}  w-fit px-3 rounded-full my-2.5"
				  >
					{section}
				  </div>
				  <div class="my-2.5 px-1.5">
					{#each Object.keys(changelog[version][section]) as item}
					  <div class="text-sm mb-2">
						<div class="font-semibold uppercase">
						  {changelog[version][section][item].title}
						</div>
						<div class="mb-2 mt-1">{changelog[version][section][item].content}</div>
					  </div>
					{/each}
				  </div>
				</div>
			  {/each}
			</div>
		  {/each}
		{/if}
	  </div>
	</div>
  </div> -->
  