<!-- FileList.svelte -->
<script lang="ts">
    import {dev} from '$app/environment'
    import MyProgress from '$lib/components/MyProgress.svelte';
    import {createEventDispatcher, getContext, onMount} from 'svelte';
    import Tooltip from '$lib/components/common/Tooltip.svelte';
    import {toast} from "svelte-sonner";
    import {uploadFile, getFileList, performFileOperationList} from '$lib/apis/chats';
    import 'virtual:uno.css'
    import {KTour} from '@ikun-ui/core';
    import EmbedPDF from '$lib/components/common/EmbedPDF.svelte';

    export let refBtn1 = '';
    let _fileList = [];
    let copyFileList = [];
    let tourShow = false;
    let interval = null;
    let refBtn2 = null;
    let refBtn3 = null;
    let refBtn4 = null;
    let refBtn5 = null;
    let refBtn6 = null;
    let refBtn7 = null;
    let exampleList = [
        {
            "keyname": "示例文件-1.pdf",
            "status": "staged",
            "data": {
                "text_chunk": 1,
                "image_chunk": 1,
                "table_chunk": 0
            },
            "operation": [
                "nop",
                "delete",
                "mask"
            ],
            "default": "nop",
            "keyid": 1
        },
        {
            "keyname": "示例文件-2.pdf",
            "status": "staged",
            "data": {
                "text_chunk": 1,
                "image_chunk": 1,
                "table_chunk": 0
            },
            "operation": [
                "nop",
                "delete",
                "mask"
            ],
            "default": "nop",
            "keyid": 2
        },
        {
            "keyname": "示例文件-3.pdf",
            "status": "staged",
            "data": {
                "text_chunk": 1,
                "image_chunk": 1,
                "table_chunk": 0
            },
            "operation": [
                "nop",
                "delete",
                "mask"
            ],
            "default": "nop",
            "keyid": 3
        },
        {
            "keyname": "示例文件-4.png",
            "status": "unstaged",
            "data": null,
            "operation": [
                "nop",
                "import",
                "remove_from_staging",
                "remove_scanned_files"
            ],
            "default": "import",
            "keyid": 4
        },
        {
            "keyname": "示例文件-5.png",
            "status": "unstaged",
            "data": null,
            "operation": [
                "nop",
                "import",
                "remove_from_staging",
                "remove_scanned_files"
            ],
            "default": "import",
            "keyid": 5
        }
    ]
    let importList = [
        {
            "keyname": "示例文件-1.png",
            "status": "unstaged",
            "data": null,
            "operation": [
                "nop",
                "import",
                "remove_from_staging",
                "remove_scanned_files"
            ],
            "default": "import",
            "keyid": 4
        },
        {
            "keyname": "示例文件-2.png",
            "status": "unstaged",
            "data": null,
            "operation": [
                "nop",
                "import",
                "remove_from_staging",
                "remove_scanned_files"
            ],
            "default": "import",
            "keyid": 5
        }
    ]
    let steps = [];
    let stepsBatch = [];
    let openTour = false;
    let openBatchTour = false;

    function handleImportNext(originalHandleNext, current) {

        switch (current) {
            case 0:
                interval = setTimeout(() => {
                    _fileList = importList
                    interval = setTimeout(() => {
                        handleSelectAll()
                    }, 1000)
                }, 200)
                break;
            case 3:
                clearTour()
                break;
            case 4:
                setTimeout(() => {
                    batchHelp()
                }, 100)
                break;
        }
        originalHandleNext();
    }

    function handleBatchPrev(originalHandlePrev, current) {
        switch (current) {
            case 1:
                interval = setTimeout(() => {
                    handleSelectAll()
                }, 1000)
                break;
        }
        originalHandlePrev()
    }

    function handleBatchNext(originalHandleNext, current) {
        if (current === 4) {
            clearTour()
        }

        switch (current) {
            case 0:
                interval = setTimeout(() => {
                    handleSelectAll()
                }, 1000)
                break;
            case 1:
                interval = setTimeout(() => {
                    bulkOperation = 'remove_scanned_files'
                    interval = setTimeout(() => {
                        paginatedFiles = paginatedFiles.map(file => {
                            if (selectedFiles.has(file.keyid)) { // 只处理选中的文件
                                return {...file, default: bulkOperation}; // 创建新对象
                            }
                            return file; // 未选中的文件不变
                        });
                    }, 100)
                }, 1000)
        }
        // 最后调用原始的 handlePrev
        originalHandleNext();
    }

    $: {
        stepsBatch = [
            {
                title: '筛选状态',
                description: '筛选文件列表显示相应状态的文件（示例为筛选未入库文件）。',
                target: refBtn5
            },
            {
                title: '勾选文件',
                description: '勾选需要操作的文件（示例为全选）。',
                target: refBtn2
            },
            {
                title: '操作设置',
                description: '批量设置选择文件的操作（示例为把所有文件设置为移除扫描文件）。',
                target: refBtn4
            },
            {
                title: '文件操作',
                description: '每个文件都有自己的操作，也可以单独设置。（示例为批量设置）',
                target: refBtn6
            },
            {
                title: '一键应用',
                description: '点击“一键应用”,应用选择文件的操作',
                target: refBtn3
            }
        ]
    }
    $: {
        steps = [
            {
                title: '导入文件',
                description: '第一步,点击“导入文件”,选择文件导入知识集。',
                target: refBtn1
            },
            {
                title: '勾选文件',
                description: '第二步,勾选所有文件进行操作。',
                target: refBtn2
            },
            {
                title: '文件操作',
                description: '每个文件都有自己的操作，也可以单独设置。（新上传文件默认为导入）。',
                target: refBtn6
            },
            {
                title: '一键应用',
                description: '第三步，点击“一键应用”（执行文件设置操作）。',
                target: refBtn3
            },
            {
                title: '批量操作',
                description: '批量操作，批量设置文件操作。',
                target: refBtn7
            }
        ]
    }


    export const handleOpen = () => {
        openTour = true;
        tourShow = true;
    };

    const handleClose = () => {
        openTour = false;
        openBatchTour = false;
        clearTour()
    };


    const clearTour = () => {
        clearTimeout(interval)
        _fileList = []
        filterStatus = 'all'
        tourShow = false
        selectedFiles = new Set();
        interval = setTimeout(() => {
            selectAll = false
            fileList = copyFileList
        }, 100)
    };

    const handleFinish = () => {
        openTour = false;
        openBatchTour = false;
    };
    const handleTourHide = () => {
        localStorage.setItem('TourT1Hide', true);
        handleClose()
    };
    const batchHelp = () => {
        _fileList = exampleList
        tourShow = true
        openBatchTour = true
        interval = setTimeout(() => {
            filterStatus = 'unstaged'
            interval = setTimeout(() => {
                filterStatusChange()
            }, 100)
        }, 2000)
    };

    const i18n = getContext('i18n');
    const dispatch = createEventDispatcher();

    export let fileList = [];
    export let isAuthor = false;
    export let scopeName = "";
    let opChangeList = {};
    let selectedFiles = new Set();
    let selectAll = false;
    let fileUrl = '';
    let open = false;
    // State for pagination and filtering
    let currentPage = 1;
    let pageSize = 50;
    let filterStatus = 'all';
    let filterName = '';
    let bulkOperation = '';
    //批量操作选项
    let operators = new Array();

    $: _fileList = !tourShow ? [...fileList] : _fileList
    $: copyFileList = [...fileList]

    // Filtered and paginated data
    $: filteredFiles = _fileList.filter(file => {
        const matchesStatus = filterStatus === 'all' || file.status === filterStatus;
        const matchesName = !filterName || file.keyname.toLowerCase().includes(filterName.toLowerCase());
        return matchesStatus && matchesName;
    });

    function updateFileList(newFileList) {
        _fileList = newFileList?.length > 0 ? [...newFileList] : [];
    }

    $: totalPages = Math.ceil(filteredFiles.length / pageSize);
    $: paginatedFiles = filteredFiles.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    $:unstagedFiles = _fileList.filter(file => file.status === 'unstaged');

    function filterStatusChange() {
        selectAll = false;
        selectedFiles = new Set();
        currentPage = 1;
        if (filterStatus != 'all' && paginatedFiles.length > 0) {
            operators = paginatedFiles[0].operation;
            bulkOperation = paginatedFiles[0].default;
        } else {
            bulkOperation = '';
        }
    }

    // Handle bulk operation change
    const handleBulkOperationChange = (e) => {
        const newOperation = e.target.value;
        // 仅更新选中的文件
        paginatedFiles = paginatedFiles.map(file => {
            if (selectedFiles.has(file.keyid)) { // 只处理选中的文件
                return {...file, default: newOperation}; // 创建新对象
            }
            return file; // 未选中的文件不变
        });
    };

    const openFile = (path) => {
        open = true
        fileUrl = encodeURI('/staged/' + path);
        const prefix = dev ? `http://${location.hostname}:8080` : window.location.origin;
        fileUrl = (new URL(fileUrl, prefix)).href;
    };

    const close = () => {
        open = false
    }
    // Handle page change
    const handlePageChange = (page) => {
        selectAll = false;
        selectedFiles = new Set();
        currentPage = Math.max(1, Math.min(page, totalPages));
    };

    // Handle page size change
    const handlePageSizeChange = (size) => {
        selectAll = false;
        selectedFiles = new Set();
        pageSize = size;
        currentPage = 1; // Reset to first page when changing page size
    };

    function getPageNumbers(currentPage, totalPages) {
        const pages = [];
        const maxVisible = 5;

        if (totalPages <= maxVisible) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else if (currentPage <= 3) {
            for (let i = 1; i <= maxVisible; i++) {
                pages.push(i);
            }
        } else if (currentPage >= totalPages - 2) {
            for (let i = totalPages - maxVisible + 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            for (let i = currentPage - 2; i <= currentPage + 2; i++) {
                pages.push(i);
            }
        }

        return pages;
    }

    // 处理全选
    const handleSelectAll = () => {
        selectedFiles = !selectAll ? new Set(paginatedFiles.map(f => f.keyid)) : new Set();
        selectAll = !selectAll;
    };

    // 处理单个选择
    const handleSelect = (file) => {
        if (selectedFiles.has(file.keyid)) {
            selectedFiles.delete(file.keyid);
        } else {
            selectedFiles.add(file.keyid, file);
        }
        selectedFiles = selectedFiles// 刷新选中状态，用于出发监听
        // 更新全选状态
        selectAll = selectedFiles.size === paginatedFiles.length;
    };

    // 处理操作选择
    const handleOperationChange = (file, operation) => {
        opChangeList[file.keyname] = operation;
    };

    const get_progress = (state, percent, log) => {
        return {
            error: state < 0,
            progress: Math.floor(percent * 100),
            log: log
        };
    };

    // 处理一键应用
    const handleApplyAll = async () => {
        let newSelFile = new Set();
        newSelFile = selectedFiles;
        let toastId = toast.loading('处理中...', {duration: Infinity});
        const selectedItems = paginatedFiles.filter((item) => newSelFile.has(item.keyid));
        let opItems = selectedItems.map((item) => {
            return {
                "keyname": item.keyname,
                "scope": scopeName,
                "status": item.status,
                "operation": opChangeList[item.keyname] ?? item.default,
                "data": item.data || {}
            }
        });
        opChangeList = {};
        const requestData = {
            "operations": opItems
        };
        await performFileOperationList(localStorage.token, requestData);
        bulkOperation = '';
        selectedFiles = new Set();
        selectAll = false;
        unstagedFiles = new Array();
        dispatch('backRefreshTimer');
        toast.dismiss(toastId);
    }
    onMount(() => {
        // interval=setTimeout(()=>{
        // 	if(localStorage.TourT1Hide!='true') handleOpen()
        // },1000)
    })


</script>

<div class=" w-full min-w-[500px] whitespace-nowrap h-full overflow-hidden text-sm flex flex-col">
    <!-- Search and Filter Controls -->
    <div class="px-4 py-2 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div bind:this={refBtn7} class="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
                <!-- Status Filter -->

                <div bind:this={refBtn5}>
                    <select
                            bind:value={filterStatus}
                            class="w-32 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm outline-none"
                            on:change={filterStatusChange}
                    >
                        <option value="all">所有状态</option>
                        <option value="staged">已入库</option>
                        <option value="unstaged">未入库</option>
                        <option value="processing">处理中</option>
                    </select>
                </div>
                <div bind:this={refBtn4}>
                    <select
                            bind:value={bulkOperation}
                            class="w-32 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm outline-none "
                            disabled={filterStatus === 'all' || selectedFiles.size === 0}
                            on:change={handleBulkOperationChange}
                    >
                        <option value="">请选择</option>
                        {#each operators as op}
                            <option value={op}>{$i18n.t(op)}</option>
                        {/each}
                    </select>
                </div>
                {#if isAuthor}
                    <button
                            class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                            on:click={handleApplyAll}
                            disabled={selectedFiles.size === 0}
                            bind:this={refBtn3}
                    >
                        一键应用 ({selectedFiles.size})
                    </button>
                {/if}
                {#if unstagedFiles && unstagedFiles.length > 0}
                    <div class="flex items-center gap-2 bg-yellow-50 text-yellow-700 px-3 py-1 rounded-md border border-yellow-200">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd"
                                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                                  clip-rule="evenodd"/>
                        </svg>
                        <span class="text-sm">
                            发现 {unstagedFiles.length} 个未入库文件
                        </span>
                    </div>
                {/if}
            </div>

            <div class="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
                <!-- Name Search -->
                <div class="relative flex-grow">
                    <input
                            bind:value={filterName}
                            class="w-full dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm outline-none pl-10"
                            placeholder="文件名..."
                            type="text"
                    />
                    <svg class="w-5 h-5 absolute left-3 top-2.5 text-gray-400 dark:text-gray-500" fill="none"
                         stroke="currentColor" viewBox="0 0 24 24">
                        <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"/>
                    </svg>
                    {#if filterName !== ''}
                        <button
                                on:click={()=>{filterName = '';}}
                                class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                                aria-label="清除搜索"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                 stroke="currentColor" class="w-5 h-5">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
                            </svg>
                        </button>
                    {/if}
                </div>
            </div>
        </div>
    </div>

    <div class="w-full h-[60vh] overflow-y-auto flex-1">
        <table class="w-full ">
            <thead>
            <tr class="sticky bg-gray-50 dark:bg-gray-800 top-0 z-10 from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 border-b-1 border-gray-200 dark:border-gray-600">
                <!-- 复选框列 -->
                <th class="w-14 px-2 py-2 text-left whitespace-nowrap">
                    <div bind:this={refBtn2} class="flex items-center justify-center">
                        <input checked={selectAll}
                               class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded transition-all duration-200 hover:scale-110 cursor-pointer"
                               on:change={handleSelectAll} type="checkbox"/>
                    </div>
                </th>
                <!-- 文件名列 -->
                <th class="min-w-[180px] w-auto px-2 py-2 text-left text-sm font-semibold text-gray-700 dark:text-gray-300 whitespace-nowrap">
                    <div class="flex items-center space-x-2">
                        <svg class="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                            <path clip-rule="evenodd"
                                  d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                                  fill-rule="evenodd"/>
                        </svg>
                        <span>文件名</span>
                    </div>
                </th>
                <!-- 文件大小 -->
                <th class="w-28 px-2 py-2 text-left text-sm font-semibold text-gray-700 dark:text-gray-300 whitespace-nowrap">
                    <div class="flex items-center space-x-2 justify-center">
                        <svg class="w-4 h-4 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
                                  stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                        </svg>
                        <span>文件大小</span>
                    </div>
                </th>
                <!-- 切片数列 -->
                <th class="w-28 px-2 py-2 text-left text-sm font-semibold text-gray-700 dark:text-gray-300 whitespace-nowrap">
                    <div class="flex items-center space-x-2 justify-center">
                        <svg class="w-4 h-4 text-indigo-500" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"/>
                        </svg>
                        <span>切片数</span>
                    </div>
                </th>
                <!-- 图片数列 -->
                <th class="w-28 px-2 py-2 text-left text-sm font-semibold text-gray-700 dark:text-gray-300 whitespace-nowrap">
                    <div class="flex items-center space-x-2 justify-center">
                        <svg class="w-4 h-4 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                            <path clip-rule="evenodd"
                                  d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                                  fill-rule="evenodd"/>
                        </svg>
                        <span>图片</span>
                    </div>
                </th>
                <!-- 表格数列 -->
                <th class="w-28 px-2 py-2 text-left text-sm font-semibold text-gray-700 dark:text-gray-300 whitespace-nowrap">
                    <div class="flex items-center space-x-2 justify-center">
                        <svg class="w-4 h-4 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                            <path clip-rule="evenodd"
                                  d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm0 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V8zm0 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1v-2z"
                                  fill-rule="evenodd"/>
                        </svg>
                        <span>表格</span>
                    </div>
                </th>
                <!-- 状态列 -->
                <th class="w-28 px-2 py-2 text-left text-sm font-semibold text-gray-700 dark:text-gray-300 whitespace-nowrap">
                    <div class="flex items-center space-x-2 justify-center">
                        <svg class="w-4 h-4 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                            <path clip-rule="evenodd"
                                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                  fill-rule="evenodd"/>
                        </svg>
                        <span>状态</span>
                    </div>
                </th>
                <!-- 进度列 -->
                <th class="w-60 px-2 py-2 text-left text-sm font-semibold text-gray-700 dark:text-gray-300 whitespace-nowrap">
                    {#if isAuthor}
                        <div class="flex items-center space-x-2 justify-center">
                            <svg class="w-4 h-4 text-cyan-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd"
                                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12z"
                                      clip-rule="evenodd"/>
                            </svg>
                            <span>进度</span>
                        </div>
                    {/if}
                </th>
                <!-- 操作列 -->
                <th class="w-36 px-2 py-2 text-left text-sm font-semibold text-gray-700 dark:text-gray-300 whitespace-nowrap">
                    {#if isAuthor}
                        <div class="flex items-center space-x-2 justify-center" bind:this={refBtn6}>
                            <svg class="w-4 h-4 text-rose-500" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"/>
                            </svg>
                            <span>操作</span>
                        </div>
                    {/if}
                </th>
            </tr>
            </thead>
            <tbody class="divide-y divide-gray-100 dark:divide-gray-700">
            {#each paginatedFiles as file}
                <tr class="group hover:bg-gradient-to-r hover:from-blue-50 hover:via-indigo-50 hover:to-purple-50 dark:hover:from-gray-700 dark:hover:via-gray-600 dark:hover:to-gray-700 transition-all duration-300 ease-in-out transform hover:shadow-sm">
                    <!-- 复选框 -->
                    <td class=" whitespace-nowrap">
                        <div class="flex items-center justify-center">
                            <input
                                    type="checkbox"
                                    checked={selectedFiles.has(file.keyid)}
                                    on:change={() => handleSelect(file)}
                                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded transition-all duration-200 hover:scale-110 cursor-pointer"
                            />
                        </div>
                    </td>
                    <!-- 文件名 -->
                    <td class="whitespace-nowrap">
                        <div class="flex items-center space-x-3">
                            <div class="flex-1 min-w-0">
                                <p class="text-sm font-medium text-gray-900 dark:text-white truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200"
                                   title={file.keyname.split('/').pop()}>
                                    {#if file.status === 'staged'}
                                        <div class="cursor-pointer text-blue-600"
                                             on:click="{() => openFile(file.keyname)}">
                                            {file.keyname.split('/').pop()}
                                        </div>
                                    {:else}
                                        {file.keyname.split('/').pop()}
                                    {/if}
                                </p>
                            </div>
                        </div>
                    </td>
                    <!-- 文件大小 -->
                    <td class="whitespace-nowrap">
                        <div class="flex items-center justify-center">
                                <span class="inline-flex items-center px-2 rounded-full text-xs font-semibold bg-gradient-to-r from-cyan-100 to-teal-100 text-cyan-800 dark:from-cyan-900 dark:to-teal-900 dark:text-cyan-200 border border-cyan-200 dark:border-cyan-700 shadow-sm">
                                    {file.size ? (file.size / 1024 / 1024).toFixed(2) + ' MB' : '0MB'}
                                </span>
                        </div>
                    </td>
                    <!-- 切片数 -->
                    <td class=" whitespace-nowrap">
                        <div class="flex items-center justify-center">
                                    <span class="inline-flex items-center px-2  rounded-full text-xs font-semibold bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 dark:from-blue-900 dark:to-indigo-900 dark:text-blue-200 border border-blue-200 dark:border-blue-700 shadow-sm">
                                        {file.data?.text_chunk ?? 0}
                                    </span>
                        </div>
                    </td>
                    <!-- 图片数 -->
                    <td class=" whitespace-nowrap">
                        <div class="flex items-center justify-center">
                                    <span class="inline-flex items-center px-2 rounded-full text-xs font-semibold bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 dark:from-purple-900 dark:to-pink-900 dark:text-purple-200 border border-purple-200 dark:border-purple-700 shadow-sm">
                                        {file.data?.image_chunk ?? 0}
                                    </span>
                        </div>
                    </td>
                    <!-- 表格数 -->
                    <td class=" whitespace-nowrap">
                        <div class="flex items-center justify-center">
                                    <span class="inline-flex items-center px-2 rounded-full text-xs font-semibold bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-800 dark:from-emerald-900 dark:to-teal-900 dark:text-emerald-200 border border-emerald-200 dark:border-emerald-700 shadow-sm">
                                        {file.data?.table_chunk ?? 0}
                                    </span>
                        </div>
                    </td>
                    <!-- 状态 -->
                    <td class="py-3 whitespace-nowrap">
                        <div class="flex items-center justify-center">
                            {#if file.status === 'staged'}
                                        <span class="inline-flex items-center px-2 rounded-full text-xs font-semibold bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 dark:from-green-800 dark:to-emerald-800 dark:text-green-100 border border-green-200 dark:border-green-600 shadow-sm">
                                            <svg class="w-3 h-3 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
                                                <path fill-rule="evenodd"
                                                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                      clip-rule="evenodd"/>
                                            </svg>
                                            已入库
                                        </span>
                            {:else if file.status === 'unstaged'}
                                        <span class="inline-flex items-center px-2 rounded-full text-xs font-semibold bg-gradient-to-r from-yellow-100 to-orange-100 text-yellow-800 dark:from-yellow-800 dark:to-orange-800 dark:text-yellow-100 border border-yellow-200 dark:border-yellow-600 shadow-sm">
                                            <svg class="w-3 h-3 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
                                                <path fill-rule="evenodd"
                                                      d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                                                      clip-rule="evenodd"/>
                                            </svg>
                                            未入库
                                        </span>
                            {:else if file.status === 'processing'}
                                {#if file.data.state >= 0}
                                        <span class="inline-flex items-center px-2 rounded-full text-xs font-semibold bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-800 dark:from-blue-800 dark:to-cyan-800 dark:text-blue-100 border border-blue-200 dark:border-blue-600 shadow-sm">
                                            <svg class="w-3 h-3 mr-1.5 animate-spin" fill="none" stroke="currentColor"
                                                 viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                                            </svg>
                                            处理中
                                        </span>
                                {:else}
                                        <span class="inline-flex items-center px-2 rounded-full text-xs font-semibold bg-gradient-to-r from-red-100 to-red-100 text-red-800 dark:from-red-800 dark:to-cyan-800 dark:text-red-100 border border-red-200 dark:border-red-600 shadow-sm">
                                            <svg class="w-3 h-3 mr-1.5" fill="none" stroke="currentColor"
                                                 viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                                            </svg>
                                            处理出错
                                        </span>
                                {/if}
                            {:else}
                                        <span class="inline-flex items-center px-2 rounded-full text-xs font-semibold bg-gradient-to-r from-gray-100 to-slate-100 text-gray-800 dark:from-gray-700 dark:to-slate-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600 shadow-sm">
                                            <svg class="w-3 h-3 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
                                                <path fill-rule="evenodd"
                                                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                                                      clip-rule="evenodd"/>
                                            </svg>
                                            <span class="truncate">{file.status || '未知'}</span>
                                        </span>
                            {/if}
                        </div>
                    </td>
                    <!-- 进度 -->
                    {#if isAuthor}
                        <td class=" whitespace-nowrap">
                            {#if file.status === 'processing'}
                                <div class="w-full max-w-xs">
                                    <MyProgress label={file.data.progress_label} labelId="{file.id}"
                                                value={get_progress(file.data.state, file.data.progress_percent,file.data.log_text)}/>
                                </div>
                            {/if}
                        </td>
                    {/if}
                    <!-- 操作 -->
                    <td class=" whitespace-nowrap">
                        {#if isAuthor}
                            {#if file.data?.related_file && file.default == "version_up" || false}
                                <Tooltip content={"更新:" + file.data.related_file[0].split('/').pop()}
                                         placement="bottom">
                                    <select
                                            class={`w-32 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-sm px-2 text-xs outline-none ${selectedFiles.has(file.keyid) ? 'ring-2 ring-blue-500' : ''}`}
                                            on:change={(e) => handleOperationChange(file, e.target.value)}
                                            value={file.default}
                                    >
                                        {#each file.operation || [] as op}
                                            <option value={op} selected={op === file.default}
                                                    class="truncate">{$i18n.t(op)}</option>
                                        {/each}
                                    </select>
                                </Tooltip>
                            {:else}
                                <select
                                        class={`w-32 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-sm px-2 text-xs outline-none  ${selectedFiles.has(file.keyid) ? 'ring-2 ring-blue-500' : ''}`}
                                        on:change={(e) => handleOperationChange(file, e.target.value)}
                                        value={file.default}
                                >
                                    {#each file.operation || [] as op}
                                        <option value={op} class="truncate">{$i18n.t(op)}</option>
                                    {/each}
                                </select>
                            {/if}
                        {/if}
                    </td>
                </tr>
            {/each}
            </tbody>
        </table>
    </div>


    <!-- Pagination -->
    <div class="p-2 border-t border-gray-200 dark:border-gray-700 dark:bg-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div class=" flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
            <span>每页显示</span>
            <select
                    bind:value={pageSize}
                    class="w-16 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md px-2 text-sm outline-none"
                    on:change={() => handlePageSizeChange(pageSize)}
            >
                <option value={50}>50</option>
                <option value={200}>100</option>
                <option value={500}>200</option>
            </select>
            <span>条，共 {filteredFiles.length} 条</span>
        </div>

        <div class="flex items-center gap-2">
            <button
                    class="px-3 py-0 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={currentPage === 1}
                    on:click={() => handlePageChange(1)}
            >
                首页
            </button>
            <button
                    class="px-3 py-0 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={currentPage === 1}
                    on:click={() => handlePageChange(currentPage - 1)}
            >
                上一页
            </button>

            <div class="flex items-center gap-1">
                {#each getPageNumbers(currentPage, totalPages) as page}
                    <button
                            class={`px-3 py-0 rounded-md text-sm font-medium ${currentPage === page ? 'bg-blue-600 text-white' : 'border border-gray-300 dark:border-gray-600 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600'}`}
                            on:click={() => handlePageChange(page)}
                    >
                        {page}
                    </button>
                {/each}
            </div>

            <button
                    class="px-3 py-0 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={currentPage === totalPages}
                    on:click={() => handlePageChange(currentPage + 1)}
            >
                下一页
            </button>
            <button
                    class="px-3 py-0 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={currentPage === totalPages}
                    on:click={() => handlePageChange(totalPages)}
            >
                尾页
            </button>
        </div>
    </div>

    {#if open}
        <EmbedPDF fileUrl="{fileUrl}" closeCallback="{close}"/>
    {/if}
    <KTour finishBtnText="完成" nextBtnText="下一步" on:close={handleClose} on:finish={handleFinish} open={openTour}
           placement="right"
           prevBtnText="上一步" {steps}>
        <!-- 使用具名slot -->
        <div let:current let:handleNext let:handlePrev slot="footer">
            <footer class="flex justify-end">
                <div>

                    {#if current > 0}
                        <button class="px-2 py-1 text-[10px] border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                on:click={handlePrev} disabled={current === 0}>
                            上一步
                        </button>
                    {:else}
                        <!-- 占位元素，保持布局 -->
                        <button style="visibility: hidden"
                                class="px-2 py-2 text-xs border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                on:click={handlePrev} disabled={current === 0}>
                            上一步
                        </button>
                    {/if}
                    <button class="px-2 py-1 text-[10px] bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            on:click={()=>handleImportNext(handleNext,current)}>
                        <!--{current === 4 ? '完成' : '下一步'}-->
                        下一步
                    </button>
                </div>
            </footer>
        </div>
    </KTour>

    <KTour finishBtnText="完成" nextBtnText="下一步" on:close={handleClose} on:finish={handleFinish}
           open={openBatchTour}
           placement="right" prevBtnText="上一步" steps={stepsBatch}>
        <!-- 使用具名slot -->
        <div let:current let:handleNext let:handlePrev slot="footer">
            <footer class="flex justify-end">
                <div>

                    {#if current > 0}
                        <button class="px-2 py-1 text-[10px] border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                on:click={() =>handleBatchPrev(handlePrev,current)} disabled={current === 0}>
                            上一步
                        </button>
                    {:else}
                        <!-- 占位元素，保持布局 -->
                        <button style="visibility: hidden"
                                class="px-2 py-2 text-xs border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                on:click={handleBatchPrev} disabled={current === 0}>
                            上一步
                        </button>
                    {/if}
                    <button class="px-2 py-1 text-[10px] bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            on:click={() =>handleBatchNext(handleNext,current)}>
                        {current === 4 ? '完成' : '下一步'}
                    </button>
                </div>
            </footer>
        </div>
    </KTour>
</div>
