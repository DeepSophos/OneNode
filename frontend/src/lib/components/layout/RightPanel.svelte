<script lang="ts">
	import { getContext, onDestroy } from 'svelte';
	import { goto } from '$app/navigation';
	import { getBackendConfig } from '$lib/apis';
	import { getRightPanelContent,getPdfUrl } from '$lib/apis/rag';
	import { rightpanel_auto, rightpanel_params } from '$lib/stores';
	import { marked } from 'marked';
	import Cross from '$lib/components/icons/Cross.svelte';
	import PicPreview from '$lib/components/layout/RightPanel/PicPreview.svelte';
	import CodeBlock from '$lib/components/chat/Messages/CodeBlock.svelte';
	import { page } from '$app/stores';
	import EmbedPDF from '$lib/components/common/EmbedPDF.svelte';
	import { dev } from '$app/environment';

	const i18n = getContext('i18n');


	const handleGoPrev = () => {
		if (navPrev.length > 1) {
			navPrev.pop();
			navCurrent = navPrev.pop();
			goto(navCurrent);
		}
	};


	let show = false;
	let open = false;
	let fileUrl = '';
	let navElement;
	let docOffset: number = 0;
	let boxContent: string;
	let content: { content: string; type: string; };
	let funcName: string;
	let funcKey: string;
	let tokens: any[] = [];
	let navPrev: string[] = [];
	let navCurrent: string | undefined;
	let locaPathName: string;

	$: {
		show = show ? ($page.url.pathname == locaPathName) : false;
	}

	function splitString(input: string): { firstPart: string; restPart: string } {
		const parts = input.split('-');
		const firstPart = parts[0];
		const restPart = parts.slice(1).join('-');
		return { firstPart, restPart };
	}

	const unsubscribeCI = rightpanel_params.subscribe(async (v) => {
		// console.log("rightpanel_param length=" + v.length);
		// if (v.length > 0) {
		// 	console.log(v[0])
		// }
		if (v.length > 0) {
			navCurrent = `/rightpanel/${v[0]}`;
			navPrev.push(navCurrent);
			const result = splitString(v[0]);
			docOffset = 0;
			funcName = result.firstPart;
			funcKey = result.restPart;
			boxContent = '';
			const backendConfig = await getBackendConfig();
			boxContent = backendConfig.version;
			rightpanel_auto.set(false);
			locaPathName = locaPathName = $page.url.pathname;
			show = true;
		} else {
			show = false;
		}
	});

	onDestroy(() => {
		unsubscribeCI();
	});

	const { extensions, ...defaults } = marked.getDefaults() as marked.MarkedOptions & {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		extensions: any;
	};

	const renderer = new marked.Renderer();

	// For code blocks with simple backticks
	renderer.codespan = (code) => {
		return `<code>${code.replaceAll('&amp;', '&')}</code>`;
	};

	function isDisabled(v: string[]) {
		return !v.length;
	}

	// function handleOffsetChange(event:ComponentEvents<PicPreview>['offsetChange']) {
	// 	alert(event.detail.offset);
	// }

	$: {
		if (funcName) {
			getRightPanelContent(funcName, funcKey, docOffset)
				.then((ret) => {
					content = JSON.parse(ret);
				});
		}
	}
	;

	$: {
		if (content) {
			tokens = marked.lexer(content.content);
		}
	}
	const openFile = async() => {
		open = true;
		console.log('openFile');
		console.log(content.content.split('pdf_image')[1]);
		const path=await getPdfUrl(funcName, content.content.split('pdf_image/')[1])
		// console.log(res)
		fileUrl = encodeURI('/staged/' + path);
		const prefix = dev ? `http://${location.hostname}:8080` : window.location.origin;
		fileUrl = (new URL(fileUrl, prefix)).href;
		console.log(fileUrl);
		// fileUrl= 'https://snippet.embedpdf.com/ebook.pdf'
		//pdf_u//pdf_url
	};

	const close = () => {
		open = false;
	};

	// todo after CitationContent ready
	// $: {
	//     const content = await getCitationContent(docOffset);
	//     boxContent = content;
	// }
</script>

<div
	bind:this={navElement}
	class="h-screen max-h-[100dvh] min-h-screen z-50 {show
		? 'lg:relative width-618'
		: 'translate-x-[260px] w-[0px]'} bg-gray-200 text-gray-900 dark:bg-gray-950 dark:text-gray-200 text-sm transition fixed z-10 top-0 right-0
        "
	style="transition-duration: 500ms;"
>
	<div class="my-auto flex flex-col justify-between h-screen max-h-[100dvh]">
		<div class="px-2 py-2 flex space-x-2 justify-between top dark:bg-gray-850">
			<button
				id="sidebar-toggle-button"
				class="pb-1"
				on:click={() => {
					rightpanel_params.set([])
					navCurrent = undefined;
					navPrev = [];
				}}
			><span class="" data-state="closed">
					<Cross className="size-4" strokeWidth="2.5" />
				</span>
			</button>

			<button
				class="text-[0.7rem] bg-blue-500 text-white rounded-md py-1 px-2 hover:bg-blue-600 focus:outline-none transition duration-200 font-medium disabled:opacity-70 disabled:cursor-not-allowed "
				on:click="{() => openFile()}"
			>
				预览
			</button>

			<!--<Tooltip content="Copy" placement="bottom">
				<button
					class="pb-1 pr-3 rounded dark:hover:text-white hover:text-black transition
                           disabled:text-gray-500 disabled:hover:text-gray-500 {!boxContent
						? ' cursor-not-allowed'
						: ''}"
                    disabled={!boxContent}
					on:click={() => {
						copyToClipboard(boxContent, $i18n.t('Copying to clipboard was successful!'));
					}}
				>
					<Clipboard className="size-4" strokeWidth="2.5" />
				</button>
			</Tooltip>-->
		</div>

		<div class="py-0relative flex flex-col flex-1 overflow-y-auto middle dark:bg-gray-750">
			<div class="px-2 mt-1 mb-2 flex justify-center space-x-2">

				{#if content}
					{#if content.type == 'png'}
						<PicPreview imgSrc={content.content} bind:docOffset={docOffset} />
					{:else}
						<div
							class="prose chat-assistant w-full max-w-[95%] dark:prose-invert prose-headings:my-0 prose-p:m-0 prose-p:-mb-6 prose-pre:my-0 prose-table:my-0 prose-blockquote:my-0 prose-img:my-0 prose-ul:-my-4 prose-ol:-my-4 prose-li:-my-3 prose-ul:-mb-6 prose-ol:-mb-8 prose-ol:p-0 prose-li:-mb-4 whitespace-pre-line">

							{#each tokens as token}
								{#if token.type === 'code'}
									<!-- {token.text} -->
									<CodeBlock lang={token.lang} code={token.text} />
								{:else}
									{@html marked.parse(token.raw, {
										...defaults,
										gfm: true,
										breaks: true,
										renderer
									})}
								{/if}
							{/each}
						</div>
					{/if}
				{/if}
			</div>
		</div>
		{#if open}
			<EmbedPDF fileUrl="{fileUrl}" closeCallback="{close}" />
		{/if}
		<!--		<div class="px-2.5 py-2 flex justify-between buttons text-gray-700 dark:text-gray-500 dark:bg-gray-850">-->
		<!--		    {#if navPrev}-->
		<!--				<button on:click={handleGoPrev} class="flex pt-2 items-center space-x-2 dark:hover:text-white hover:text-black transition">-->
		<!--				  <svg xmlns="http://www.w3.org/2000/svg" stroke="currentColor" viewBox="-0.5 -0.5 16 16" id="Arrow-Left&#45;&#45;Streamline-Font-Awesome.svg" height="16" width="16"><desc>Arrow Left Streamline Icon: https://streamlinehq.com</desc>&lt;!&ndash;! Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2024 Fonticons, Inc.&ndash;&gt;<path d="M0.45763392857142854 6.758397321428571c-0.4101796875 0.4101763392857143 -0.4101796875 1.076306919642857 0 1.486486607142857L5.707928571428571 13.495178571428571c0.4101763392857143 0.4101796875 1.076306919642857 0.4101796875 1.486486607142857 0s0.4101796875 -1.0763102678571428 0 -1.486489955357143L3.732505580357143 8.550056919642858h10.067434151785713c0.5808147321428572 0 1.0500602678571427 -0.46924218749999996 1.0500602678571427 -1.050056919642857s-0.4692455357142857 -1.0500602678571427 -1.0500602678571427 -1.0500602678571427H3.735786830357143L7.191133928571428 2.9913113839285717c0.4101796875 -0.4101796875 0.4101796875 -1.0763102678571428 0 -1.486489955357143s-1.0763102678571428 -0.4101796875 -1.486486607142857 0L0.4543526785714286 6.755116071428572Z" stroke-width="1"></path></svg>-->
		<!--				<span>{$i18n.t('Previous')}</span> </button>-->
		<!--			{/if}-->
		<!--		</div>-->
	</div>
</div>

<style>
    .width-618 {
        width: 61.8%;
        min-width: min-content;
    }

    .middle {
        padding-top: 1.5rem;
    }
</style>
