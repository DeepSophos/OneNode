<script lang="ts">
    // 仅暴露必要的props
    export let isLoading: boolean;
    export let message: string = "数据加载中...";
    export let loadType: 'page' | 'modal' = 'modal';

</script>

{#if isLoading && loadType === 'modal'}
    <div class="w-full h-full relative">
        <div class="absolute inset-0 flex items-center justify-center z-10">
            <div class="text-center p-4">
                <svg class="animate-spin h-8 w-8 text-indigo-600 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none"
                     viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <p class="mt-2 text-gray-600 dark:text-gray-300">{message}</p>
            </div>
        </div>
    </div>
{/if}

{#if isLoading && loadType === 'page'}
    <div class="mask-overlay">
        <div class="loading-content">
            <div class="spinner"></div>
            <p class="text-gray-700 font-medium">{message}</p>
        </div>
    </div>
    <style>
        .mask-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(0, 0, 0, 0.2);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
            backdrop-filter: blur(2px);
        }

        .loading-content {
            background: white;
            border-radius: 8px;
            padding: 2rem;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 1rem;
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }

        .spinner {
            animate: spin 1s linear infinite;
            width: 2rem;
            height: 2rem;
            border: 3px solid #e5e7eb;
            border-top-color: #3b82f6;
            border-radius: 50%;
        }

        @keyframes spin {
            to {
                transform: rotate(360deg);
            }
        }
    </style>
{/if}

