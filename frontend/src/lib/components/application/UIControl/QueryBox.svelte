<script>
    export let options = {};
    export let isReady = false;

    let queryStr = "";
    let textareaRef;

    import { onMount } from 'svelte';
    onMount(() => {
        textareaRef?.focus();
    });

    function handleChange() {
        isReady = queryStr.trim() !== '';
    }

    $:options.callbackData = {description: queryStr};

</script>

<div class="w-full h-full p-2 rounded-2xl transition-all duration-300">
    <div class="flex-1 min-h-0 mb-0 h-full">
        <textarea
        bind:value={queryStr}
        bind:this={textareaRef}
        on:input={handleChange}
        class="w-full h-full px-4 py-4 border border-gray-300 rounded-xl shadow-sm
        text-gray-800 placeholder-gray-400 resize-none
        transition-all duration-200 bg-white
        outline-none"
        placeholder="请输入..."
        ></textarea>
    </div>
</div>