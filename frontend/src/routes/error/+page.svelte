<script>
	import { goto } from '$app/navigation';
	import { ONENODE_NAME, config } from '$lib/stores';
	import { onMount, getContext } from 'svelte';
	import { uploadLicense } from '$lib/apis/index';

	const i18n = getContext('i18n');

	let loaded = false;
	let tip_text = "";
    let error_status = 0;
	onMount(async () => {
		if ($config) {
			await goto('/');
		}
        error_status = (localStorage.getItem("error_status") || 0) * 1;
		loaded = true;
	});
	const handleFileUpload = async (event) => {
		const file = event.target.files[0];
		if (file && file.name === 'license.bin') {
			try {
				let res = await uploadLicense(file);
				if (res.status) location.href = '/';
				else tip_text = res.message;
			} catch (error) {
				tip_text = '上传失败：'+ error;
			}
		} else {
			tip_text= '请选择一个有效的license.bin文件。';
		}
	};
</script>

{#if loaded}
	<div class="absolute w-full h-full flex z-50">
		<div class="absolute rounded-xl w-full h-full backdrop-blur flex justify-center">
			<div class="m-auto pb-44 flex flex-col justify-center">
                {#if error_status == 503 }
                    <div class="max-w-md">
                        <div class="text-center text-2xl font-medium z-50">
                            服务暂时不可用
                        </div>

                        <div class=" mt-4 text-center text-sm w-full">
                            请上传正确的 license.bin 文件，<br>或联系求索时刻技术支持人员获取帮助。
                            <br><br>
                        </div>

                        <div class=" mt-6 mx-auto relative group w-fit">
                            <label
                                    class="relative z-20 flex px-5 py-2 rounded-full bg-gray-100 hover:bg-gray-200 transition font-medium text-sm cursor-pointer"
                            >
                                上传 license.bin 文件
                                <input
                                        type="file"
                                        accept=".bin"
                                        class="hidden"
                                        on:change={handleFileUpload}
                                />
                            </label>
                        </div>
                        <div class=" mt-4 text-center text-sm w-full text-red-500 ">
                            {tip_text}
                        </div>
                    </div>
                {:else if error_status == 403 }
                    <div class="max-w-md">
                        <div class="text-center text-2xl font-medium z-50">
                            服务暂时不可用
                        </div>

                        <div class=" mt-4 text-center text-sm w-full">
                            请确保访问来源合法且已授权，<br>或联系求索时刻技术支持人员获取帮助。
                            <br><br>
                        </div>

                        <div class=" mt-6 mx-auto relative group w-fit">
                            <button
                                    class="relative z-20 flex px-5 py-2 rounded-full bg-gray-100 hover:bg-gray-200 transition font-medium text-sm"
                                    on:click={() => {
                                    location.href = '/';
                                }}>
                                重试一下
                            </button>
                        </div>
                    </div>
                {:else }
                    <div class="max-w-md">
                        <div class="text-center text-2xl font-medium z-50">
                            服务暂时不可用
                        </div>

                        <div class=" mt-4 text-center text-sm w-full">
                            未知错误，请联系求索时刻技术支持人员获取帮助。
                            <br><br>
                        </div>

                        <div class=" mt-6 mx-auto relative group w-fit">
                            <button
                                    class="relative z-20 flex px-5 py-2 rounded-full bg-gray-100 hover:bg-gray-200 transition font-medium text-sm"
                                    on:click={() => {
                                    location.href = '/';
                                }}>
                                重试一下
                            </button>
                        </div>
                    </div>
                {/if}
			</div>
		</div>
	</div>
{/if}
