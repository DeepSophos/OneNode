<script lang="ts">
    import {goto} from '$app/navigation';
    import {writable} from "svelte/store";
    import {onMount, tick, getContext, onDestroy} from 'svelte';
    import {page} from '$app/stores';
    import {config, kbman_super_enabled, user} from '$lib/stores';
    import {formatTimestamp} from '$lib/utils/index';
    import {
        getScopeDetail
        , findUnstagedSimilarFiles
        , findStagedSimilarFiles
        , getScopeFolders
        , delScopeFolder
        , getKnowledgeScopes
    } from '$lib/apis/rag';
    import FileList from './FileList.svelte';
    import {uploadFile, getFileList, getFeedbacks} from '$lib/apis/chats';
    import {toast} from 'svelte-sonner';
    import MultiLineToast from "$lib/components/common/MultiLineToast.svelte";
    import FeedbackList from "$lib/components/knowledgebase/FeedbackList.svelte";
    import Tooltip from "$lib/components/common/Tooltip.svelte";
    import DetectionFile from "$lib/components/knowledgebase/DetectionFile.svelte";
    import FileUpdateConflictModal from "$lib/components/knowledgebase/FileUpdateConflictModal.svelte";
    import {Tree} from "$lib/components/common/Tree.svelte";
    import EditFolderFrom from './EditFolderFrom.svelte';
    import ConfirmDialog from "$lib/components/ConfirmDialog.svelte";

    const i18n = getContext('i18n');
    let baseInfo = {
        isAuthor: false
    };
    let scopeName = "";
    // 文件列表
    let fileList: never[] = [];
    // 导入状态
    let isUploading = false;
    let stagedCount = 0;
    let totalFileCount = 0;
    let refBtn1 = null;
    let refFileList = null;
    //清理未入库文件
    let showDetectionFileModal = false;
    let detectionFileGroups = [];

    //确认强制更新文件
    let fileUpdateConflictModal = false;
    let fileUpdateConflictFiles = [];

    // 添加定时器相关变量
    let refreshInterval: NodeJS.Timeout | null = null;
    let currentRefreshRate = 60000; // 默认1分钟
    const NORMAL_REFRESH_RATE = 60000; // 1分钟
    const FAST_REFRESH_RATE = 1500; // 1.5秒
    let refreshCount = 0;

    // 一件应用后刷新
    const handleBackRefreshTimer = (event) => {
        // 执行一键应用后，刷新频率切换为1秒，最少刷新60次
        refreshCount = 40;
        setRefreshInterval(FAST_REFRESH_RATE);
    };

    // 检查是否有处理中的文件
    const hasProcessingFiles = (files: any[]) => {
        return files.some(file => (file.status === 'processing') && (file.data.state > 0));
    };

    // 设置刷新间隔
    const setRefreshInterval = (rate: number) => {
        if (refreshInterval) {
            clearInterval(refreshInterval);
        }
        currentRefreshRate = rate;
        refreshInterval = setInterval(async () => {
            await get_file_list();
        }, rate);
    };

    // 检查并调整刷新频率
    const checkAndAdjustRefreshRate = () => {
        if (refreshCount > 0) {
            refreshCount--;
        } else {
            const hasProcessing = hasProcessingFiles(fileList);
            const needFastRefresh = hasProcessing && currentRefreshRate !== FAST_REFRESH_RATE;
            const needNormalRefresh = !hasProcessing && currentRefreshRate !== NORMAL_REFRESH_RATE;

            if (needFastRefresh) {
                setRefreshInterval(FAST_REFRESH_RATE);
            } else if (needNormalRefresh) {
                setRefreshInterval(NORMAL_REFRESH_RATE);
            }
        }
    };

    const setScopeName = async () => {
        if (!scopeName || scopeName === '') {
            baseInfo = JSON.parse(await getScopeDetail(localStorage.token, $page.params.id));
            baseInfo.isAuthor = false;
            scopeName = baseInfo.name;
        }
    }

    const get_file_list = async () => {
        await setScopeName();
        let folderName = selectedNode.id === 0 ? scopeName : scopeName + '/' + selectedNode.full_path;
        const res = await getFileList(localStorage.token, scopeName, folderName);
        console.log(res.file_stat);
        fileList = res.file_list.map((item, index) => {
            return {...item, keyid: ++index}
        });
        totalFileCount = res.file_stat.total_files;
        stagedCount = res.file_stat.staged_files;
        // 每次获取文件列表后检查并调整刷新频率
        checkAndAdjustRefreshRate();
    };

    // 处理文件选择
    let uploadProgress = 0; // 新增导入进度状态

    const handleFileChange = async (e) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;
        try {
            isUploading = true;
            for (let i = 0; i < files.length; i++) {
                const formData = new FormData();
                const scopName = selectedNode.id === 0 ? baseInfo.name : baseInfo.name + '/' + selectedNode.full_path;
                formData.append('file', files[i]);
                formData.append('scopName', scopName);
                formData.append('fileName', files[i].name);
                uploadProgress = Math.round(((i + 1) / files.length) * 100); // Fixed progress calculation
                const response = await uploadFile(localStorage.token, formData);
                if (response.status == 'success') {
                    toast.success(`${files[i].name} 导入成功`);
                    await refreshTree()
                    await get_file_list();
                } else {
                    toast.error(response.detail ? response.detail : `${files[i].name} 导入失败`);
                }
            }
        } catch (error) {
            let lines = [`导入失败`, '失败原因：' + error];
            if (error.indexOf('File name too long') > -1) {
                lines = [`导入失败`, `失败原因:文件名称超长,建议不超过50个汉字;`, error];
            }
            toast.error(MultiLineToast, {
                componentProps: {
                    lines: lines
                },
                duration: Infinity
            });
        } finally {
            uploadProgress = 0;
            await findUnstaged();
            isUploading = false;
        }
    };

    // 获取未入库相似文件列表
    const findUnstaged = async () => {
        // 获取未入库的相似文件
        const unstagedData = await findUnstagedSimilarFiles(localStorage.token, scopeName);
        if (unstagedData && unstagedData.length > 0) {
            // 如果有未入库的相似文件，显示检测文件模态框
            detectionFileGroups = convertArray(unstagedData);
            showDetectionFileModal = true;
        } else {
            // 如果没有未入库的，检查已入库的相似文件
            const stagedData = await findStagedSimilarFiles(localStorage.token, scopeName);
            if (stagedData && stagedData.length > 0) {
                // 如果有已入库的相似文件，显示冲突模态框
                fileUpdateConflictFiles = stagedData;
                fileUpdateConflictModal = true;
            }
        }
    };

    function convertArray(originalArray) {
        return originalArray.map((group, groupIndex) => {
            return group.map((fileName, fileIndex) => {
                const id = `${groupIndex + 1}-${fileIndex + 1}`;
                return {
                    id: id,
                    name: fileName,
                    checked: true,
                };
            });
        });
    }

    // 打开文件选择器
    const openFileSelector = async () => {
        if (!selectedNode) {
            toast.warning('请先选择目录');
            return;
        }
        const input = document.createElement('input');
        input.type = 'file';
        input.multiple = true; // 启用多选
        input.accept = $config.support_file_formats.all.join(", ") + " ,.zip,.ZIP";
        input.onchange = handleFileChange;
        input.click();
    };

    let showFeedbackMode = false;
    let feedbacks = [];

    async function showFeedbackModeWin() {
        await getFeedbackList().then(() => {
            showFeedbackMode = true;
        });
    }

    async function closeFeedbackModeWin() {
        showFeedbackMode = false;
    }

    async function getFeedbackList() {
        await setScopeName();
        await getFeedbacks(localStorage.token, scopeName, 'positive').then((data) => {
            feedbacks = [...data ?? []];
        });
        return feedbacks;
    }

    async function handleDetectionFileConfirm(event) {
        showDetectionFileModal = false;
        await findStagedSimilarFiles(localStorage.token, scopeName).then((data) => {
            if (data.length > 0) {
                fileUpdateConflictFiles = data;
                fileUpdateConflictModal = true;
            }
        });
        await get_file_list();
    }

    async function handleFileUpdateConflictConfirm(event) {
        setRefreshInterval(FAST_REFRESH_RATE);
    }

    let expandedNodes = writable({});
    let treeData = [];
    let selectedNode = null;
    let delFolderBtn = true;
    let selectedNodeId = writable(null);

    function handleSelect(node) {
        selectedNode = node;
        delFolderBtn = selectedNode.id === 0;
        get_file_list();
    }

    function getAllNodeIds(nodes) {
        const ids = {};
        nodes.forEach(node => {
            ids[node.id] = true; // 标记为展开
            // 递归处理子节点
            if (node.children && node.children.length > 0) {
                Object.assign(ids, getAllNodeIds(node.children));
            }
        });
        return ids;
    }

    /**
     * 刷新目录树
     * @param init 是否初始化,选中根节点
     */
    async function refreshTree(init?: boolean = false) {
        await getScopeFolders(localStorage.token, scopeName).then((res) => {
            treeData = res;
            if (init) {
                selectedNodeId.set(0);
                selectedNode = treeData[0];
            }
            expandedNodes = writable(getAllNodeIds(treeData));
        });
    }

    let showAddFolderModal = false;
    let parentFolderName = "";

    async function addFolder() {
        if (!selectedNode) {
            toast.warning('请选择要添加子目录的父目录');
            return;
        }
        showAddFolderModal = true;
        parentFolderName = selectedNode.full_path;
    }

    async function handleAddFolderConfirm() {
        await refreshTree();
    }

    let showDelFolderConfirm = false;

    async function deleteScopeFolder() {
        if (!selectedNode) {
            toast.warning('请选择要删除的目录');
            return;
        }
        if (selectedNode.id === 0) {
            toast.warning('根目录不能删除');
            return;
        }
        if (selectedNode.children.length > 0) {
            toast.warning('请先删除目录下的子目录');
            return;
        }
        if (fileList.length > 0) {
            toast.warning('目录下有文件，请先删除目录下的文件');
            return;
        }
        showDelFolderConfirm = true;

    }

    async function handleDelFolderConfirm() {
        await delScopeFolder(localStorage.token, {scope_name: scopeName, folder_name: selectedNode.full_path})
            .then(async (res) => {
                if (res.status == 'success') {
                    selectedNode = null;
                    await refreshTree();
                }
            });
    }

    // 组件挂载后执行
    onMount(async () => {
        await setScopeName();
        //判断当前用户是否有操作知识集的权限
        await getKnowledgeScopes(localStorage.token, true).then((res) => {
            const scopes = JSON.parse(res);
            baseInfo.isAuthor = scopes.some(x => x.name === scopeName && x.id === baseInfo.id);
        })
        await refreshTree(true);
        await getFeedbackList();
        await get_file_list();
        // 初始化定时刷新
        setRefreshInterval(NORMAL_REFRESH_RATE);
    });

    onDestroy(() => {
        // 清理定时器
        if (refreshInterval) {
            clearInterval(refreshInterval);
            refreshInterval = null;
        }
    })

    const batchHelp = () => {
        refFileList?.handleOpen()
    };
</script>

<!-- 模板部分不变，保持原结构 -->
<div class="w-full h-[100vh] px-8 py-5 mx-auto flex flex-col gap-5 overflow-hidden">
    <div class="flex items-center justify-between p-4 rounded-lg shadow border border-gray-300 dark:border-gray-700">
        <div class="flex items-center space-x-4">
            <button class="text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors duration-200"
                    on:click={() => { goto('/knowledgebase') }}
            >
                <svg class="size-6" fill="none" stroke="currentColor" stroke-width="1.5"
                     viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" stroke-linecap="round"
                          stroke-linejoin="round"/>
                </svg>
            </button>
            <h1 class="text-xl font-semibold text-gray-900 dark:text-white">知识集详情</h1>
        </div>
        <div class="flex items-center">
            {#if baseInfo.isAuthor}
                <div class="mx-2" bind:this={refBtn1}>
                    <Tooltip placement="left"
                             content="{isUploading ? '当前正在导入文件' : selectedNode ? '导入文件' : '请先选择目录'}">
                        <button
                                class="bg-blue-500 text-white px-4 py-1 rounded-md hover:bg-blue-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                                on:click={openFileSelector}
                                disabled={isUploading || !selectedNode}

                        >
                            {#if isUploading}
                                <svg class="animate-spin h-5 w-5 text-white"/>
                                {uploadProgress}% 导入中...
                            {:else}
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                     class="size-5">
                                    <path fill-rule="evenodd"
                                          d="M11.47 2.47a.75.75 0 0 1 1.06 0l4.5 4.5a.75.75 0 0 1-1.06 1.06l-3.22-3.22V16.5a.75.75 0 0 1-1.5 0V4.81L8.03 8.03a.75.75 0 0 1-1.06-1.06l4.5-4.5ZM3 15.75a.75.75 0 0 1 .75.75v2.25a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5V16.5a.75.75 0 0 1 1.5 0v2.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V16.5a.75.75 0 0 1 .75-.75Z"
                                          clip-rule="evenodd"/>
                                </svg>
                                导入文件
                            {/if}
                        </button>
                    </Tooltip>
                </div>
                <button
                        on:click="{() => batchHelp()}"
                        class="bg-gray-300 text-white px-4 py-1 rounded-md hover:bg-gray-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                    <span>?</span>导入帮助
                </button>
            {/if}
            <input id="fileUpload" on:change={handleFileChange} style="display: none;" type="file"/>
        </div>
    </div>
    <div class="border border-gray-300 dark:border-gray-700 p-4 shadow relative rounded-lg text-sm">
        <div class="grid grid-cols-3 grid-rows-3 gap-3 h-auto">
            <div class="min-h-0">
                <div class="flex items-center gap-2 h-full">
                    <span class="text-gray-700 dark:text-gray-300 text-right w-40 shrink-0">知识集:</span>
                    <span class="text-gray-900 dark:text-gray-100 truncate min-w-0">{baseInfo.name}</span>
                </div>
            </div>
            <div class="min-h-0">
                <div class="flex items-center gap-2 h-full">
                    <span class="text-gray-700 dark:text-gray-300 text-right w-40 shrink-0">维护人:</span>
                    <span class="text-gray-900 dark:text-gray-100 truncate min-w-0">{baseInfo.owner_name}</span>
                </div>
            </div>
            <div class="min-h-0">
                <div class="flex items-center gap-2 h-full">
                    <span class="text-gray-700 dark:text-gray-300 text-right w-40 shrink-0">创建时间:</span>
                    <span class="text-gray-900 dark:text-gray-100 truncate min-w-0">{formatTimestamp(baseInfo.timestamp)}</span>
                </div>
            </div>
            <div class="min-h-0">
                <div class="flex items-center gap-2 h-full">
                    <span class="text-gray-700 dark:text-gray-300 text-right w-40 shrink-0">文件数量:</span>
                    <span class="text-gray-900 dark:text-gray-100 text-xs leading-tight min-w-0 truncate">
                    已入库{stagedCount}个，共{totalFileCount}个
                </span>
                </div>
            </div>

            <div class="min-h-0">
                <div class="flex items-center gap-2 h-full">
                    <span class="text-gray-700 dark:text-gray-300 text-right w-40 shrink-0">用户编辑的答案:</span>
                    <span class="text-gray-900 dark:text-gray-100 text-xs leading-tight min-w-0 truncate">
                    {#if baseInfo.isAuthor}
                        <span on:click={showFeedbackModeWin}
                              class="font-bold text-blue-600 hover:text-blue-800 dark:hover:text-blue-400 cursor-pointer underline decoration-solid underline-offset-2">
                            待审核 {feedbacks.filter(f => f.status == 'pending').length} 条
                        </span>，共<span class="font-bold">{feedbacks.length}</span>条
                    {:else}
                        待审核 {feedbacks.filter(f => f.status == 'pending').length} 条，共<span
                            class="font-bold">{feedbacks.length}</span>条
                    {/if}
                </span>
                </div>
            </div>

            <div class="min-h-0"></div>
            <div class="col-span-3 min-h-0">
                <div class="flex items-center gap-2 h-full">
                    <span class="text-gray-700 dark:text-gray-300 text-right w-40 shrink-0">详情描述:</span>
                    <div class="flex-1 min-w-0 h-full overflow-hidden">
                    <span class="text-gray-900 dark:text-gray-100 text-xs leading-relaxed break-words truncate block"
                          title="{baseInfo.description}">{baseInfo.description}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="rounded-lg w-full h-full flex shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div class=" w-[15%] min-w-[200px] border-r border-gray-200 dark:border-gray-700">
            <div class="w-full flex justify-between dark:border-gray-700">
                <span class="py-4 pl-2 text-sm font-semibold text-gray-700 dark:text-gray-300 whitespace-nowrap">
                    目录结构
                </span>
                <div class="flex justify-start px-2 py-4 space-x-1">
                    <Tooltip content="刷新目录" placement="top">
                        <button
                                class="p-1 rounded-md hover:bg-blue-100 hover:text-blue-600"
                                on:click={refreshTree}
                        >
                            <svg class="size-5" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                                      stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </button>
                    </Tooltip>
                    {#if baseInfo.isAuthor}
                        <Tooltip content="添加目录" placement="top">
                            <button
                                    class="p-1 rounded-md hover:bg-blue-100 hover:text-blue-600"
                                    on:click={addFolder}
                            >
                                <svg class="size-5" fill="none" stroke="currentColor" stroke-width="1.5"
                                     viewBox="0 0 24 24"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 10.5v6m3-3H9m4.06-7.19l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"
                                          stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </button>
                        </Tooltip>

                        <Tooltip content={delFolderBtn ? "请选择目录后删除" : "删除目录"} placement="top">
                            <button
                                    class="p-1 rounded-md text-red-600 hover:bg-red-100  disabled:opacity-60 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-400 disabled:border-gray-100 disabled:hover:bg-gray-50"
                                    disabled={delFolderBtn}
                                    on:click={deleteScopeFolder}
                            >
                                <svg class="size-5" fill="none" stroke="currentColor" stroke-width="1.5"
                                     viewBox="0 0 24 24"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                                          stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </button>
                        </Tooltip>
                    {/if}
                </div>
            </div>
            <div class="w-full h-[calc(100%-60px)] overflow-x-auto pl-2">
                <Tree {expandedNodes}
                      onNodeSelect={handleSelect}
                      {selectedNodeId}
                      treeData={treeData}/>
            </div>
        </div>
        <div class="w-[85%] h-[100%] overflow-hidden flex flex-col">
            <FileList
                    bind:scopeName
                    bind:this={refFileList}
                    {fileList}
                    isAuthor={baseInfo.isAuthor}
                    on:backRefreshTimer={handleBackRefreshTimer}
                    {refBtn1}
            />
        </div>
    </div>
</div>
<FeedbackList
        bind:feedbacks={feedbacks}
        bind:isAuthor={baseInfo.isAuthor}
        bind:scopeName={scopeName}
        bind:visible={showFeedbackMode}
        {getFeedbackList}
        on:cancel={closeFeedbackModeWin}
/>
<DetectionFile
        bind:scopeName={scopeName}
        groups={detectionFileGroups}
        on:confirm={handleDetectionFileConfirm}
        visible={showDetectionFileModal}
/>
<FileUpdateConflictModal
        bind:files={fileUpdateConflictFiles}
        bind:scopeName={scopeName}
        bind:visible={fileUpdateConflictModal}
        on:confirm={handleFileUpdateConflictConfirm}
/>
<EditFolderFrom
        bind:visible={showAddFolderModal}
        on:confirm={handleAddFolderConfirm}
        parentFolderName={parentFolderName}
        scopeName={scopeName}
/>
<ConfirmDialog
        bind:show={showDelFolderConfirm}
        icon="danger"
        message="确定要删除目录 <strong>{selectedNode?.label}</strong> 吗？"
        on:cancel={()=>{showDelFolderConfirm = false;}}
        on:confirm={handleDelFolderConfirm}
        size="sm"
        title="删除目录"
/>