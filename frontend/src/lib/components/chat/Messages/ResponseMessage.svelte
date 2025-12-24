<script lang="ts">
    import dayjs from 'dayjs';
    import {marked} from 'marked';
    import 'katex/dist/katex.min.css';
    import {fade} from 'svelte/transition';
    import {createEventDispatcher} from 'svelte';
    import {onMount, tick, getContext} from 'svelte';

    const i18n = getContext('i18n');
    const dispatch = createEventDispatcher();
    import {rightpanel_params, rightpanel_auto, system_name, system_logo} from '$lib/stores';
    import Name from './Name.svelte';
    import Skeleton from './Skeleton.svelte';
    import Markdown from './Markdown.svelte';
    import Image from '$lib/components/common/Image.svelte';
    import Tooltip from '$lib/components/common/Tooltip.svelte';
    import Stepper from '$lib/components/chat/Messages/Stepper.svelte';
    import {cleanMessageContent, restoreImageReferences} from '$lib/utils/messageUtils';
    import {toast} from "svelte-sonner";

    export let message;
    export let siblings;

    export let isLastMessage = true;

    export let confirmEditResponseMessage: Function;
    export let showPreviousMessage: Function;
    export let showNextMessage: Function;
    export let rateMessage: Function;

    export let copyToClipboard: Function;
    export let continueGeneration: Function;
    export let regenerateResponse: Function;
    export let translateTo: Function;

    let edit = false;
    let editedContent = '';
    let editTextAreaElement: HTMLTextAreaElement;
    let tooltipInstance = null;

    let timeout_handle = null;
    let show_placeholder = true;
    let cot_content = '';

    // 添加反馈动画状态
    let showFlower = false;
    let showEgg = false;

    const get_content = (m) => {
        let content = m.content.replace(/\[=\d+=\]/g, '');
		let match;
		const regex = /\[\[(\d+)\]\]\(\/rightpanel\/([^)]+)\)/g;
		while ((match = regex.exec(content)) !== null) {
			// match[0] 是整个匹配的字符串，如 "[[1]](/rightpanel/citation...)"
			// match[1] 是第一个捕获组（数字），如 "1"
			// match[2] 是第二个捕获组（链接），如 "/rightpanel/citation..."
			const href = match[2]
			// console.log("match ... " + href + ",rightpanel_auto=" + $rightpanel_auto + ",isLastMessage=" + isLastMessage)
            if (timeout_handle === null && $rightpanel_auto && isLastMessage) {
                timeout_handle = window.setTimeout(() => {
                    rightpanel_params.set([href.replace('/rightpanel/', '').split(" ")[0]]);
                    timeout_handle = null;
                }, 500);
            }
            return content;
		}
        return content;
    }

    const get_step_content = (message) => {
        if ((message.cot ?? "").length == 0) return;
        let steps = [];
        let re_cot = JSON.parse(message.cot);
        re_cot.forEach((cot_step) => {
            cot_step.forEach((step, index) => {
                if (step.title.length > 0) {
                    steps.push({
                        title: step.title,
                        content: step.content,
                        status: 'completed'
                    })
                } else {
                    steps[steps.length - 1].content += step.content;
                }
            })
        });
        (!message.done && steps.length > 0) ? steps[steps.length - 1].status = "current" : null;
        return steps;
    }

    $: show_placeholder = ((get_content(message) === '') && (message?.cot === undefined));
    $: step_tokens = get_step_content(message)

    const handleRateResponse = (rating) => {
        rateMessage(message.id, rating)
        if (rating === 1) {
            showFlower = true;
        } else if (rating === -1) {
            showEgg = true;
        }
        setTimeout(() => {
            if (rating === 1) {
                showFlower = false;
            } else {
                showEgg = false;
            }
        }, 1000);
    };

    let oldMessageContent = '';
    const editMessageHandler = async () => {
        edit = true;
        oldMessageContent = cleanMessageContent(message.content);
        editedContent = oldMessageContent;
        await tick();
        editTextAreaElement.style.height = '';
        editTextAreaElement.style.height = `${editTextAreaElement.scrollHeight}px`;
    };

    const editMessageConfirmHandler = async () => {
        if (editedContent === '') {
            editedContent = ' ';
        }
        if (oldMessageContent != editedContent) {
            message.originalContent = restoreImageReferences(oldMessageContent);
            message.content = restoreImageReferences(editedContent);
            confirmEditResponseMessage(message.id, message.content, message.originalContent);
        }
        edit = false;
        editedContent = '';
    };

    const cancelEditMessage = async () => {
        edit = false;
        editedContent = '';
    };

    onMount(async () => {
    });

</script>

{#key message.id}
    <div class=" flex w-full message-{message.id}">
        {#if $system_logo}
            <div class="w-8 h-8 rounded-full overflow-hidden mr-3">
                <img class="w-full h-full object-cover" src={$system_logo}>
            </div>
        {:else }
            <div class="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center mr-3">
                <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                >
                    <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                </svg>
            </div>
        {/if}

        <div class="w-full overflow-hidden">
            <Name>
                {$system_name}
                {#if message.timestamp}
					<span class=" invisible group-hover:visible text-gray-400 text-xs font-medium">
						{dayjs(message.timestamp * 1000).format($i18n.t('DD/MM/YYYY HH:mm'))}
					</span>
                {/if}
            </Name>

            {#if show_placeholder}
                <Skeleton/>
            {:else}
                <Stepper steps="{step_tokens}" done="{message.done}"></Stepper>
                {#if message.files}
                    <div class="my-2.5 w-full flex overflow-x-auto gap-2 flex-wrap">
                        {#each message.files as file}
                            <div>
                                {#if file.type === 'image'}
                                    <Image src={file.url}/>
                                {/if}
                            </div>
                        {/each}
                    </div>
                {/if}
                <div
                        class="prose chat-{message.role} w-full max-w-full dark:prose-invert prose-headings:my-0 prose-p:m-0 prose-p:-mb-6 prose-pre:my-0 prose-table:my-0 prose-blockquote:my-0 prose-img:my-0 prose-ul:-my-4 prose-ol:-my-4 prose-li:-my-3 prose-ul:-mb-6 prose-ol:-mb-8 prose-ol:p-0 prose-li:-mb-4 whitespace-pre-line"
                >
                    <div>
                        {#if edit === true}
                            <div class=" w-full">
								<textarea
                                        id="message-edit-{message.id}"
                                        bind:this={editTextAreaElement}
                                        class="border bg-transparent outline-none w-full resize-none"
                                        bind:value={editedContent}
                                        on:input={(e) => {
										e.target.style.height = '';
										e.target.style.height = `${e.target.scrollHeight}px`;
									}}
                                />

                                <div class=" mt-2 mb-1 flex justify-center space-x-2 text-sm font-medium">
                                    <button
                                            class="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-gray-100 transition rounded-lg"
                                            on:click={() => {
											editMessageConfirmHandler();
										}}
                                    >
                                        {$i18n.t('Save')}
                                    </button>

                                    <button
                                            class=" px-4 py-2 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-100 transition outline outline-1 outline-gray-200 dark:outline-gray-600 rounded-lg"
                                            on:click={() => {
											cancelEditMessage();
										}}
                                    >
                                        {$i18n.t('Cancel')}
                                    </button>
                                </div>
                            </div>
                        {:else}
                            <div id="rc_{message.id}" class="w-full">
                                {#if message?.error === true}
                                    <div
                                            class="flex mt-2 mb-4 space-x-2 border px-4 py-3 border-red-800 bg-red-800/30 font-medium rounded-lg"
                                    >
                                        <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke-width="1.5"
                                                stroke="currentColor"
                                                class="w-5 h-5 self-center"
                                        >
                                            <path
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                                            />
                                        </svg>

                                        <div class=" self-center">
                                            {message.content}
                                        </div>
                                    </div>
                                {:else}
                                    <div></div>
                                    <Markdown
                                            id={message.id}
                                            content={get_content(message)}
                                    />
                                {/if}

                                {#if message.done}
                                    <div class="relative">
                                        {#if showFlower}
                                            <div
                                                    class="absolute -top-8 left-14 pointer-events-none select-none"
                                                    in:fade={{duration: 300}}
                                                    out:fade={{duration: 500}}
                                            >
                                                <div class=" animate-bounce text-xl">🌸</div>
                                            </div>
                                        {/if}

                                        {#if showEgg}
                                            <div
                                                    class="absolute -top-8 left-20 pointer-events-none select-none"
                                                    in:fade={{duration: 300}}
                                                    out:fade={{duration: 500}}
                                            >
                                                <div class="text-xl transform transition-transform duration-200 animate-pulse hover:scale-110">
                                                    🥚
                                                </div>
                                            </div>
                                        {/if}
                                    </div>

                                    <div
                                            class="py-5 flex justify-start space-x-1 overflow-x-auto buttons text-gray-700 dark:text-gray-500"
                                    >
                                        {#if siblings.length > 1}
                                            <div class="flex self-center min-w-fit -mt-1">
                                                <button
                                                        class="self-center dark:hover:text-white hover:text-black transition"
                                                        on:click={() => {
														showPreviousMessage(message);
													}}
                                                >
                                                    <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            viewBox="0 0 20 20"
                                                            fill="currentColor"
                                                            class="w-4 h-4"
                                                    >
                                                        <path
                                                                fill-rule="evenodd"
                                                                d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                                                                clip-rule="evenodd"
                                                        />
                                                    </svg>
                                                </button>

                                                <div class="text-xs font-bold self-center min-w-fit dark:text-gray-100">
                                                    {siblings.indexOf(message.id) + 1} / {siblings.length}
                                                </div>

                                                <button
                                                        class="self-center dark:hover:text-white hover:text-black transition"
                                                        on:click={() => {
														showNextMessage(message);
													}}
                                                >
                                                    <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            viewBox="0 0 20 20"
                                                            fill="currentColor"
                                                            class="w-4 h-4"
                                                    >
                                                        <path
                                                                fill-rule="evenodd"
                                                                d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                                                                clip-rule="evenodd"
                                                        />
                                                    </svg>
                                                </button>
                                            </div>
                                        {/if}

                                        <Tooltip content="{$i18n.t('Edit Response')}" placement="bottom">
                                            <button
                                                    class="{isLastMessage
													? 'visible'
													: 'invisible group-hover:visible'} p-1 rounded dark:hover:text-white hover:text-black transition"
                                                    on:click={() => {
													editMessageHandler();
												}}
                                            >
                                                <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke-width="2"
                                                        stroke="currentColor"
                                                        class="w-4 h-4"
                                                >
                                                    <path
                                                            stroke-linecap="round"
                                                            stroke-linejoin="round"
                                                            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                                                    />
                                                </svg>
                                            </button>
                                        </Tooltip>

                                        <Tooltip content="{$i18n.t('Copy')}" placement="bottom">
                                            <button
                                                    class="{isLastMessage
													? 'visible'
													: 'invisible group-hover:visible'} p-1 rounded dark:hover:text-white hover:text-black transition copy-response-button"
                                                    on:click={() => {
													copyToClipboard(document.getElementById("rc_"+message.id));
												}}
                                            >
                                                <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke-width="2"
                                                        stroke="currentColor"
                                                        class="w-4 h-4"
                                                >
                                                    <path
                                                            stroke-linecap="round"
                                                            stroke-linejoin="round"
                                                            d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184"
                                                    />
                                                </svg>
                                            </button>
                                        </Tooltip>

                                        <Tooltip content="{$i18n.t('Good Response')}" placement="bottom">
                                            <button
                                                    class="{isLastMessage
													? 'visible'
													: 'invisible group-hover:visible'} p-1 rounded  "
                                                    on:click={() => handleRateResponse(1)}
                                            >
                                                <svg
                                                        stroke="currentColor"
                                                        fill="none"
                                                        stroke-width="2"
                                                        viewBox="0 0 24 24"
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                        class="w-4 h-4 transition-transform duration-200 {showFlower ? 'scale-110' : ''}"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                            d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"
                                                    />
                                                </svg
                                                >
                                            </button>
                                        </Tooltip>

                                        <Tooltip content="{$i18n.t('Bad Response')}" placement="bottom">
                                            <button
                                                    class="{isLastMessage
													? 'visible'
													: 'invisible group-hover:visible'} p-1 rounded  "
                                                    on:click={() => handleRateResponse(-1)}
                                            >
                                                <svg
                                                        stroke="currentColor"
                                                        fill="none"
                                                        stroke-width="2"
                                                        viewBox="0 0 24 24"
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                        class="w-4 h-4 transition-transform duration-200 {showEgg ? 'scale-110' : ''}"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                            d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17"
                                                    />
                                                </svg
                                                >
                                            </button>
                                        </Tooltip>

                                        {#if isLastMessage}
                                            <Tooltip content="{$i18n.t('Continue Response')}" placement="bottom">
                                                <button
                                                        type="button"
                                                        class="{isLastMessage
														? 'visible'
														: 'invisible group-hover:visible'} p-1 rounded dark:hover:text-white hover:text-black transition regenerate-response-button hidden"
                                                        on:click={() => {
														continueGeneration();
													}}
                                                >
                                                    <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            stroke-width="2"
                                                            stroke="currentColor"
                                                            class="w-4 h-4"
                                                    >
                                                        <path
                                                                stroke-linecap="round"
                                                                stroke-linejoin="round"
                                                                d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                                        />
                                                        <path
                                                                stroke-linecap="round"
                                                                stroke-linejoin="round"
                                                                d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z"
                                                        />
                                                    </svg>
                                                </button>
                                            </Tooltip>

                                            <Tooltip content="{$i18n.t('Regenerate')}" placement="bottom">
                                                <button
                                                        type="button"
                                                        class="{isLastMessage
														? 'visible'
														: 'invisible group-hover:visible'} p-1 rounded dark:hover:text-white hover:text-black transition regenerate-response-button"
                                                        on:click={regenerateResponse}
                                                >
                                                    <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            stroke-width="2"
                                                            stroke="currentColor"
                                                            class="w-4 h-4"
                                                    >
                                                        <path
                                                                stroke-linecap="round"
                                                                stroke-linejoin="round"
                                                                d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                                                        />
                                                    </svg>
                                                </button>
                                            </Tooltip>
                                        {/if}
                                    </div>
                                {/if}
                            </div>
                        {/if}
                    </div>
                </div>
            {/if}
        </div>
    </div>
{/key}

<style>
    .buttons::-webkit-scrollbar {
        display: none; /* for Chrome, Safari and Opera */
    }

    .buttons {
        -ms-overflow-style: none; /* IE and Edge */
        scrollbar-width: none; /* Firefox */
    }

    .custom_hr {
        border: none;
        height: 1px;
        margin: 0;
    }
</style>