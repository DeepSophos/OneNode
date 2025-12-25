<script lang="ts">
    import {getVersionInfo} from '$lib/apis';
    import {ONENODE_VERSION} from '$lib/constants';
    import {ONENODE_NAME, config, showChangelog,system_name} from '$lib/stores';
    import {compareVersion} from '$lib/utils';
    import {onMount, getContext} from 'svelte';
    import {toast} from 'svelte-sonner';

    const i18n = getContext('i18n');

    let ollamaVersion = '';

    let updateAvailable = null;
    let version = {
        current: '0.4.0',
        repos: [
            {
                repo_name: "sapientia",
                branch_name: "unknown",
                commit_id: "unknown"
            }
        ]
    };

    const checkForVersionUpdates = async () => {
        updateAvailable = null;
        version = await getVersionInfo(localStorage.token).catch((error) => {
            return version;
        });
    };

    // 复制版本信息函数
    const copyVersionInfo = async () => {
        try {
            const reposInfo = version.repos.map(repo => {
                return Object.entries(repo)
                    .map(([key, value]) => `${key}: ${value}`)
                    .join('\n');
            }).join('\n\n');
            const versionText = `版本号: ${version.current}\n\n${reposInfo}`;

            if (navigator.clipboard) {
                await navigator.clipboard.writeText(versionText);
                toast.success($i18n.t('Version information has been copied to the clipboard!'));
            }
            else {
                const textarea = document.createElement('textarea');
                textarea.value = versionText;
                textarea.style.position = 'fixed'; // 防止页面滚动
                document.body.appendChild(textarea);
                textarea.select();
                try {
                    const successful = document.execCommand('copy');
                    if (successful) {
                        toast.success($i18n.t('Version information has been copied to the clipboard!'));
                    } else {
                        toast.success($i18n.t('Copying to clipboard was successful!'));
                    }
                } catch (err) {
                    console.error('Fallback copy failed:', err);
                    toast.error($i18n.t('Failed to copy version information'));
                } finally {
                    document.body.removeChild(textarea);
                }
            }
        } catch (err) {
            console.error('Copy failed:', err);
            toast.error($i18n.t('Failed to copy version information'));
        }
    };

    onMount(async () => {
        checkForVersionUpdates();
    });
</script>

<div class="pr-1.5 overflow-y-scroll h-[50vh] space-y-3">
    <div class=" space-y-3">
        <div>
            <div class=" mb-2.5 text-sm font-medium flex space-x-2 items-center">
                {$system_name}
            </div>
            <div class="w-full ">
                <div class="text-sm text-gray-700 dark:text-gray-200 flex justify-start ">
					<span class=" transition-colors duration-200 ">
							版本号：{version.current.toUpperCase()}
						</span>
                    <span class="flex justify-start px-5 cursor-pointer" on:click={copyVersionInfo}>
                        <svg class="size-6 w-5 h-5 text-blue-300" fill="none" stroke="currentColor" stroke-width="1.5"
                             viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
                              stroke-linecap="round"
                              stroke-linejoin="round"/>
                    </svg>
                    <i class="text-xs text-blue-300">点击复制版本信息</i>
                    </span>

                </div>
            </div>
        </div>
    </div>
</div>