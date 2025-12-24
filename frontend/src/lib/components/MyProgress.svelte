<script lang="ts">
    import {Progress} from "bits-ui";
    import {getContext} from 'svelte';
    import {fade} from 'svelte/transition';

    export let valueLabel;
    export let labelId;
    export let label;

    let max = 100
    let showTooltip = false;
    let tooltipElement;
    let triggerElement;

    const i18n = getContext('i18n');
    export let value = {
        error: false,
        progress: 0
    }
    let min = 0

    // 创建 portal 到 body
    function createTooltipPortal(node) {
        if (showTooltip && value.error) {
            document.body.appendChild(node);

            // 计算位置
            if (triggerElement) {
                const rect = triggerElement.getBoundingClientRect();
                node.style.position = 'fixed';
                node.style.top = `${rect.top - node.offsetHeight - 8}px`;
                node.style.left = `${rect.left}px`;
                node.style.zIndex = '9999';
            }
        }

        return {
            destroy() {
                if (node.parentNode) {
                    node.parentNode.removeChild(node);
                }
            }
        };
    }
</script>

<div class="relative" bind:this={triggerElement}>
    <div class="flex space-x-2"
         on:mouseenter={() => value.error && (showTooltip = true)}
         on:mouseleave={() => showTooltip = false}>
        {#if value.error}
        <span class="text-sm truncate min-w-0 text-red-500">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                 stroke="currentColor"
                 class="size-6 w-5 h-5">
              <path stroke-linecap="round" stroke-linejoin="round"
                    d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"/>
            </svg>
        </span>
        {/if}
        <span id={labelId} class="text-sm truncate min-w-0 {value.error ? 'text-red-500' : ''}">{$i18n.t(label)}</span>
        <span class="text-sm flex-shrink-0 {value.error ? 'text-red-500' : ''}">{value.progress}%</span>
    </div>

    {#if value.error && showTooltip}
        <div use:createTooltipPortal
             bind:this={tooltipElement}
             transition:fade={{ duration: 200 }}
             class="pointer-events-none px-3 py-2 bg-gray-900 text-white text-sm rounded-lg shadow-lg w-full max-w-96 whitespace-normal border border-gray-700">
            {value.log}
            <div class="absolute top-full left-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
        </div>
    {/if}
</div>