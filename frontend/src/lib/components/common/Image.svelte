<script lang="ts">
	import { ONENODE_BASE_URL } from '$lib/constants';
	import ImagePreview from './ImagePreview.svelte';

	export let src = '';
	export let alt = '';

	let _src = '';

	$: _src = src.startsWith('/') ? `${ONENODE_BASE_URL}${src}` : src;

	let showImagePreview = false;
</script>
<div></div>
<ImagePreview bind:show={showImagePreview} src={_src} {alt} />
<button
	on:click={() => {
		showImagePreview = true;
	}}
>
	<img src={_src} {alt} class="max-h-96 rounded-sm" draggable="false" />
</button>
