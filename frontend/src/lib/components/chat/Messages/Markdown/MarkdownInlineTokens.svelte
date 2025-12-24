<script lang="ts">
	import DOMPurify from 'dompurify';
	import { toast } from 'svelte-sonner';

	import type { Token } from 'marked';
	import { getContext } from 'svelte';

	const i18n = getContext('i18n');

	import { ONENODE_BASE_URL } from '$lib/constants';
	import { copyToClipboard, unescapeHtml } from '$lib/utils';

	import Image from '$lib/components/common/Image.svelte';
	import KatexRenderer from './KatexRenderer.svelte';
	import Source from './Source.svelte';
	import HtmlToken from './HTMLToken.svelte';
	import TextToken from './MarkdownInlineTokens/TextToken.svelte';
	import CodespanToken from './MarkdownInlineTokens/CodespanToken.svelte';

	export let id: string;
	export let done = true;
	export let tokens: Token[];
	export let onSourceClick: Function = () => {};

	let link_text;
	let link_state;


    function checkStringPattern(token) {
      let str = token.text
      if (/^\d+\'\./.test(str)) {
        link_text = str.replace("'", "")
        link_state = true;
        token.value = link_text;
        return;
      }

      if (/^\d+\./.test(str)) {
        link_state = false;
        link_text = token.text;
        token.value = link_text;
        return;
      }
      link_state = null;
      token.value = link_text;
    }

</script>

{#each tokens as token}
	{#if token.type === 'escape'}
		{unescapeHtml(token.text)}
	{:else if token.type === 'html'}
		<HtmlToken {id} {token} {onSourceClick} />
	{:else if token.type === 'link'}
		{#if token.tokens}
		    {#await checkStringPattern(token)}
		    {:then}
                <a href={token.href} target rel="nofollow"
                class=" {link_state === true
                ? 'text-gray-900 dark:text-gray-100'
                : link_state === false
                  ? 'text-gray-500 dark:text-gray-700'
                  : 'text-gray-900 dark:text-gray-100'}"
                >{token?.value||token.text}</a>
            {/await}
		{:else}
			<a class="text-blue-500" href={token.href} target rel="nofollow">{token.text}</a>
		{/if}
	{:else if token.type === 'image'}
		<Image src={token.href} alt={token.text} />
	{:else if token.type === 'strong'}
		<strong><svelte:self id={`${id}-strong`} tokens={token.tokens} {onSourceClick} /></strong>
	{:else if token.type === 'em'}
		<em><svelte:self id={`${id}-em`} tokens={token.tokens} {onSourceClick} /></em>
	{:else if token.type === 'codespan'}
		<CodespanToken {token} {done} />
	{:else if token.type === 'br'}
		<br />
	{:else if token.type === 'del'}
		<del><svelte:self id={`${id}-del`} tokens={token.tokens} {onSourceClick} /></del>
	{:else if token.type === 'inlineKatex'}
		{#if token.text}
			<KatexRenderer content={token.text} displayMode={false} />
		{/if}
	{:else if token.type === 'iframe'}
		<iframe
			src="{ONENODE_BASE_URL}/api/v1/files/{token.fileId}/content"
			title={token.fileId}
			width="100%"
			frameborder="0"
			onload="this.style.height=(this.contentWindow.document.body.scrollHeight+20)+'px';"
		></iframe>
	{:else if token.type === 'text'}
		<TextToken {token} {done} />
	{/if}
{/each}
