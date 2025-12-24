<script>
	import { getContext, onDestroy, onMount } from 'svelte';
	import {
		inner_prompt,
		scopes,
		show_welcome,
		show_welcome_title,
		system_logo,
		system_name,
		system_welcome,
		system_welcome_title,
		system_allCompanyName,
		system_allCompanyUrl,
		gpu_number,
		sdk_dev_doc
	} from '$lib/stores';
	import { getQuestionList } from '$lib/apis/rag';
	import Tooltip from '../common/Tooltip.svelte';
	import VoiceRecording from './MessageInput/VoiceRecording.svelte';
	import { checkAudioService } from '$lib/apis/audio';
	import AddImagePlaceholder from '$lib/components/AddImagePlaceholder.svelte';
	// import { SUPPORTED_FILE_EXTENSIONS, SUPPORTED_FILE_TYPE } from '$lib/constants.js';
	import { toast } from 'svelte-sonner';

	let dragged = false;

	const i18n = getContext('i18n');

	// State variables
	let message = '';

	export let files = [];
	let inputFiles;
	let filesInputElement;

	let recording = false;
	let voice_input_enabled = false;

	// 添加状态变量来跟踪按钮选中状态
	let isDeepThinkingActive = false;
	let isWebSearchActive = false;
	export let selectedScopes;

	// 添加图片预览状态
	let attachedImages = [];

	// Function to handle submit
	function handleSubmit() {
		console.log('Submitting:', message);
	}

	// Function to handle file attachment
	function handleFileAttachment() {
		if (filesInputElement) {
			filesInputElement.click();
		}
	}

	// Function to handle file selection
	function handleFileSelect(event) {
		let reader = new FileReader();
		const imageId = Date.now() + Math.random();
		reader.onload = (event) => {
			files = [
				...files,
				{
					id: imageId,
					type: 'image',
					url: `${event.target.result}`
				}
			];
			inputFiles = null;
			filesInputElement.value = '';
		};

		if (inputFiles && inputFiles.length > 0) {
			const file = inputFiles[0];
			if (['image/gif', 'image/jpeg', 'image/png'].includes(file['type'])) {
				reader.readAsDataURL(file);

				addImagePreview(file, imageId);
			} else {
				toast.error(
					$i18n.t(
						`Unknown File Type '{{file_type}}', but accepting and treating as plain text`,
						{ file_type: file['type'] }
					)
				);
				filesInputElement.value = '';
			}
		} else {
			toast.error("不支持的上传文件格式.");
		}
	}

	// Function to add image preview
	function addImagePreview(file, imageId, isPasted = false) {
		const imageUrl = URL.createObjectURL(file);


		const imageInfo = {
			id: imageId,
			file: file,
			url: imageUrl,
			name: isPasted ? `pasted-image-${Date.now()}.${file.type.split('/')[1]}` : file.name,
			size: file.size,
			type: file.type
		};

		attachedImages = [...attachedImages, imageInfo];
		console.log('Image added to preview:', imageInfo);
	}

	// Function to remove image preview
	function removeImagePreview(imageId) {
		const imageToRemove = attachedImages.find(img => img.id === imageId);
		if (imageToRemove) {
			URL.revokeObjectURL(imageToRemove.url); // Clean up memory
		}
		files = files.filter(file => file.id !== imageId);
		attachedImages = attachedImages.filter(img => img.id !== imageId);
	}

	// Function to handle paste events
	function handlePaste(e) {
		const clipboardData = e.clipboardData || window.clipboardData;

		if (clipboardData && clipboardData.items) {
			for (const item of clipboardData.items) {
				if (item.type.indexOf('image') !== -1) {
					const blob = item.getAsFile();
					const reader = new FileReader();
					const imageId = Date.now() + Math.random();
					reader.onload = function(e) {
						files = [
							...files,
							{
								id: imageId,
								type: 'image',
								url: `${e.target.result}`
							}
						];
					};

					reader.readAsDataURL(blob);

					addImagePreview(blob, imageId, true);
				}
			}
		}
	}

	// Function to handle drag over
	function handleDragOver(event) {
		event.preventDefault();
		event.dataTransfer.dropEffect = 'copy';
	}

	// Function to handle drop
	function handleDrop(e) {
		e.preventDefault();
		if (e.dataTransfer?.files) {
			let reader = new FileReader();
			const imageId = Date.now() + Math.random();
			reader.onload = (event) => {
				files = [
					...files,
					{
						id: imageId,
						type: 'image',
						url: `${event.target.result}`
					}
				];
			};

			const inputFiles = e.dataTransfer?.files;

			if (inputFiles && inputFiles.length > 0) {
				const file = inputFiles[0];
				if (['image/gif', 'image/jpeg', 'image/png'].includes(file['type'])) {
					reader.readAsDataURL(file);
					addImagePreview(file, imageId);
				}
			} else {
				toast.error("不支持的上传文件格式.");
			}
		}
	}

	// 添加常用问题列表
	let allQuestions = [];
	let commonQuestions = [];

	function handleQuestionClick(que) {
		message = que.question;
		inner_prompt.set(message);
		message = '';
	}

	$:if (selectedScopes) {
		commonQuestions = [];
		if (allQuestions.length > 0 && selectedScopes.length > 0) {
			const names = new Set(selectedScopes);
			const scopeArr = $scopes.filter(item => names.has(item.name));
			const scopeIds = scopeArr.map(item => item.id);
			commonQuestions = allQuestions.filter(item => scopeIds.includes(item.scopeId));
		}
	}

	let currentPage = 0;
	const questionsPerPage = 5;

	// 计算当前显示的问题
	$: currentQuestions = commonQuestions.slice(
		currentPage * questionsPerPage,
		(currentPage + 1) * questionsPerPage
	);

	// 换一批功能
	function switchQuestions() {
		const totalPages = Math.ceil(commonQuestions.length / questionsPerPage);
		currentPage = (currentPage + 1) % totalPages;
	}
		let dropZone;
	const onDragOver = (e) => {
		e.preventDefault();
		dragged = true;
	};

	const onDragLeave = () => {
		dragged = false;
	};
	$: allCompanyUrl = $system_allCompanyUrl
    ? (/^https?:\/\//i.test($system_allCompanyUrl)
        ? $system_allCompanyUrl
        : `https://${$system_allCompanyUrl}`)
    : 'http://www.seektime.com.cn';

	const onDrop = async (e) => {
		e.preventDefault();
	  const imageId = Date.now() + Math.random();
		if (e.dataTransfer?.files) {
			let reader = new FileReader();

			reader.onload = (event) => {
				files = [
					...files,
					{
						id: imageId,
						type: 'image',
						url: `${event.target.result}`
					}
				];
			};

			const inputFiles = e.dataTransfer?.files;
			if (inputFiles && inputFiles.length > 0) {
				const file = inputFiles[0];
				if (['image/gif', 'image/jpeg', 'image/png'].includes(file['type'])) {
					reader.readAsDataURL(file);
					addImagePreview(file, imageId);
				} else {
					toast.error("不支持的上传文件格式.");
				}
			}
		}
		dragged = false;
	};

	onMount(async () => {
		await getQuestionList(localStorage.token).then((data) => {
			allQuestions = data;
		});
		voice_input_enabled = await checkAudioService();
		dropZone = document.querySelector('body');
		dropZone?.addEventListener('dragover', onDragOver);
		dropZone?.addEventListener('drop', onDrop);
		dropZone?.addEventListener('dragleave', onDragLeave);
	});

		onDestroy(() => {
		dropZone?.removeEventListener('dragover', onDragOver);
		dropZone?.removeEventListener('drop', onDrop);
		dropZone?.removeEventListener('dragleave', onDragLeave);
	});
</script>

{#if dragged}
	<div
		class="fixed lg:w-[calc(100%-260px)] w-full h-full flex z-50 touch-none pointer-events-none"
		id="dropzone"
		role="region"
		aria-label="Drag and Drop Container"
	>
		<div class="absolute w-full h-full backdrop-blur bg-gray-800/40 flex justify-center">
			<div class="m-auto flex flex-col justify-center">
				<div class="max-w-md">
					<AddImagePlaceholder />
				</div>
			</div>
		</div>
	</div>
{/if}

<div class="flex flex-col flex-auto items-center pt-48">
	<div class="flex flex-col items-center w-full bg-gray-50 dark:bg-gray-900 min-h-0">
		<!-- Header -->
		<div class="flex items-center justify-center w-full max-w-3xl mb-6">
			<div class="flex items-center">
				{#if $system_logo}
					<div class="w-12 h-12 rounded overflow-hidden mr-3">
						<img class="w-full h-full object-cover" src={$system_logo}>
					</div>
				{:else }
					<div class="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center mr-3">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-6 w-6 text-white"
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
				<div class="flex flex-col">
					{#if $show_welcome_title}
						<div class="flex items-center">
							<span class="text-xl font-bold">{$system_welcome_title}</span>
						</div>
					{/if}
					{#if $show_welcome}
						<span
							class="text-sm mt-1 { $show_welcome_title ? 'text-gray-600' : 'text-gray-900 text-xl' }">{$system_welcome}</span>
					{/if}
				</div>
			</div>
		</div>

		<!-- Search input -->
		<div class="w-full max-w-3xl px-4">
			<div
				class=" border border-gray-300 relative w-full border rounded-xl bg-white dark:bg-gray-900 dark:border-gray-700 dark:text-white shadow-sm"
				on:dragover={handleDragOver}
				on:drop={handleDrop}
			>
				<!-- Image Preview Area -->
				{#if attachedImages.length > 0}
					<div class="flex flex-wrap gap-2 p-3 border-b border-gray-200 dark:border-gray-700">
						{#each attachedImages as image (image.id)}
							<div class="relative group">
								<img
									src={image.url}
									alt={image.name}
									class="w-16 h-16 object-cover rounded-lg border border-gray-200 dark:border-gray-600"
								/>
								<!-- Remove button -->
								<button
									class="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full text-xs hover:bg-red-600 transition-colors duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100"
									on:click={() => removeImagePreview(image.id)}
									title="Remove image"
								>
									<svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none"
											 viewBox="0 0 24 24" stroke="currentColor">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
													d="M6 18L18 6M6 6l12 12" />
									</svg>
								</button>
								<!-- Image name tooltip on hover -->
								<div
									class="absolute bottom-0 left-0 right-0 bg-black bg-opacity-75 text-white text-xs p-1 rounded-b-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 truncate">
									{image.name}
								</div>
							</div>
						{/each}
					</div>
				{/if}

				<input
					type="text"
					placeholder="给{$system_name}发消息{$gpu_number != 3?'（支持粘贴图片）':''}"
					class="w-full px-4 py-5 rounded-xl focus:outline-none bg-white dark:bg-gray-900 dark:text-gray-100 dark:placeholder-gray-700"
					bind:value={message}
					on:keydown={(e) => {
                        if (e.key === 'Enter' && message.trim()) {
                            inner_prompt.set(message);
                            message = ''; // Clear the input after sending
                        }
                    }}
					on:paste={handlePaste}
				/>

				{#if recording}
					<VoiceRecording
						bind:recording
						onCancel={async () => {
                            recording = false;
                        }}
						onConfirm={async (data) => {
                            message = `${message}${data} `;
                            recording = false;
                        }}
					/>
				{/if}

				<!-- Hidden file input -->
				<input
					type="file"
					bind:this={filesInputElement}
					bind:files={inputFiles}
					on:change={handleFileSelect}
					single
					accept=".jpg,.jpeg,.png,.gif"
					style="display: none;"
				/>

				<!-- Bottom toolbar -->
				<div class="flex justify-between items-center px-4 py-2">
					<div class="flex space-x-2">
						<button style="display: none"
										class={`flex items-center text-xs border rounded-full px-2 py-1 transition-colors duration-200
                        ${
							isDeepThinkingActive
								? 'text-blue-500 border-blue-100 bg-blue-50'
								: 'text-gray-500 border-gray-200 hover:border-gray-300'
						}`}
										on:click={() => (isDeepThinkingActive = !isDeepThinkingActive)}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-3 w-3 mr-1"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M19 14l-7 7m0 0l-7-7m7 7V3"
								/>
							</svg>
							<span>深度思维</span>
						</button>

						<button style="display: none"
										class={`flex items-center text-xs border rounded-full px-2 py-1 transition-colors duration-200
                                        ${isWebSearchActive	? 'text-blue-500 border-blue-100 bg-blue-50'
                                                              : 'text-gray-500 border-gray-200 hover:border-gray-300'
						               }`}
										on:click={() => (isWebSearchActive = !isWebSearchActive)}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-3 w-3 mr-1"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
								/>
							</svg>
							<span>外网搜索</span>
						</button>
					</div>

					<div class="flex space-x-2">
						{#if $gpu_number != 3}
							<!-- Attachment Button -->
							<Tooltip content={'带图提问'}>
								<button
									class=" text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition rounded-full p-1.5 self-center hover:bg-gray-100 dark:hover:bg-gray-800"
									type="button"
									on:click={handleFileAttachment}
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 16 16"
										fill="currentColor"
										class="w-5 h-5 mt-1"

									>
										<path
											fill-rule="evenodd"
											d="M9.621 7.68a.75.75 0 0 1 0 1.06l-2.997 2.996a1.85 1.85 0 1 1-2.618-2.618L7.104 6.02a.75.75 0 1 1 1.061 1.06L5.067 10.18a.35.35 0 1 0 .495.495l2.997-2.996a.75.75 0 0 1 1.062 0Z"
											clip-rule="evenodd"
										/>
										<path
											fill-rule="evenodd"
											d="M3.421 8.654a5.25 5.25 0 0 1 7.433-7.433l3.146 3.146a3.75 3.75 0 0 1-5.304 5.303l-2.475-2.474a2.25 2.25 0 1 1 3.182-3.182l2.121 2.122a.75.75 0 1 1-1.06 1.06L8.343 5.075a.75.75 0 1 0-1.061 1.061l2.475 2.475a2.25 2.25 0 0 0 3.182-3.182L9.793 2.283a3.75 3.75 0 0 0-5.304 5.304l2.829 2.828a.75.75 0 0 1-1.061 1.061L3.42 8.654Z"
											clip-rule="evenodd"
										/>
									</svg>
								</button>
							</Tooltip>
						{/if}
						<!-- Record Button -->
						{#if voice_input_enabled}
							<Tooltip content={$i18n.t('Record message') || '录音输入'}>
								<button
									class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition rounded-full p-1.5 self-center hover:bg-gray-100 dark:hover:bg-gray-800"
									type="button"
									on:click={() => recording = true}
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 24 24"
										fill="currentColor"
										class="w-5 h-5"
									>
										<path d="M8.25 4.5a3.75 3.75 0 117.5 0v8.25a3.75 3.75 0 11-7.5 0V4.5z" />
										<path
											d="M6 10.5a.75.75 0 01.75.75v1.5a5.25 5.25 0 1010.5 0v-1.5a.75.75 0 011.5 0v1.5a6.75 6.75 0 01-12 0v-1.5A.75.75 0 016 10.5z" />
									</svg>
								</button>
							</Tooltip>
						{/if}

						<!-- Send Button -->
						<Tooltip content={$i18n.t('Send message')}>
							<button
								class="{message.trim()
                                    ? 'bg-black text-white hover:bg-gray-900 dark:bg-white dark:text-black dark:hover:bg-gray-100 '
                                    : 'text-white bg-gray-100 dark:text-gray-900 dark:bg-gray-800 disabled'} transition rounded-full p-1.5 self-center"
								type="submit"
								disabled={!message.trim()}
								on:click={() => {
                                    if (message.trim()) {
                                        inner_prompt.set(message);
                                        message = ''; // Clear the input after sending
                                    }
                                }}
                            >
                                <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 16 16"
                                        fill="currentColor"
                                        class="w-5 h-5"
                                >
                                    <path
                                            fill-rule="evenodd"
                                            d="M8 14a.75.75 0 0 1-.75-.75V4.56L4.03 7.78a.75.75 0 0 1-1.06-1.06l4.5-4.5a.75.75 0 0 1 1.06 0l4.5 4.5a.75.75 0 0 1-1.06 1.06L8.75 4.56v8.69A.75.75 0 0 1 8 14Z"
                                            clip-rule="evenodd"
                                    />
                                </svg>
                            </button>
                        </Tooltip>
                    </div>
                </div>
            </div>
        </div>
        <div class="w-full max-w-3xl px-4 mt-2">
            {#if currentQuestions.length > 0}
                <div class="flex items-center justify-between space-x-1 mb-4">
                    <div class="flex items-center">
                        <div class="w-1 h-5 bg-blue-500 rounded-full mr-3"></div>
                        <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200 tracking-wide">
                            常用问题
                        </h3>
                    </div>
                    {#if commonQuestions.length > 5}
                       <button
                                    class="px-2 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400
                                    dark:border-gray-700 rounded-lg
                                    hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-blue-300 dark:hover:border-blue-500
                                    transition-all duration-200 group"
                                    on:click={switchQuestions}
                            >
                                <div class="flex items-center">
																	<svg class="w-4 h-4 group-hover:rotate-180 transition-transform duration-300"
                                     fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                                </svg>
												 换一批</div>
                            </button>
                    {/if}
                </div>
            {/if}

			<!-- 问题列表 -->
			<div class="space-y-1">
				{#each currentQuestions as item}
					<button
						class="max-h-96 px-4 py-2 text-sm text-left text-gray-700 dark:text-gray-300
                       bg-white dark:bg-gray-800/10 border border-gray-200 dark:border-gray-700 rounded-lg
                       hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/10
                       transition-all duration-200 focus:outline-none
                       group"
                            on:click={() => handleQuestionClick(item)}
                    >
                        <div class="flex items-center justify-between">
                            <span class="flex-1 pr-3">{item.question}</span>
                            <svg class="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors duration-200 flex-shrink-0"
                                 fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                      d="M9 5l7 7-7 7"></path>
                            </svg>
                        </div>
                    </button>
                    <br/>
                {/each}
            </div>
        </div>
    </div>
	<div class="absolute bottom-4 text-center text-sm text-gray-900  dark:text-gray-400 mt-4 space-x-5 max-w-3xl flex w-full justify-center">
		<span>©{$system_allCompanyName?$system_allCompanyName:'上海求索时刻科技有限公司'} 版权所有</span>
		<a href="{allCompanyUrl}" target="_blank" class="cursor-pointer hover:text-blue-700 dark:hover:text-blue-400" >公司官网：{$system_allCompanyUrl?$system_allCompanyUrl:'www.seektime.com.cn'}</a>
		{#if $sdk_dev_doc}
			<a href="https://www.seek-time.com:43032/doc" target="_blank" class="cursor-pointer hover:text-blue-700 dark:hover:text-blue-400">SDK开发文档</a>
		{/if}
	</div>
</div>