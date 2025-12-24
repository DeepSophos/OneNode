<script lang="ts">
    import {Select} from 'bits-ui';

    import {flyAndScale} from '$lib/utils/transitions';
    import {createEventDispatcher, onMount, getContext, tick} from 'svelte';

    import ChevronDown from '$lib/components/icons/ChevronDown.svelte';
    import Check from '$lib/components/icons/Check.svelte';
    import Search from '$lib/components/icons/Search.svelte';

    import {toast} from 'svelte-sonner';
    import {capitalizeFirstLetter, splitStream} from '$lib/utils';
    import Tooltip from '$lib/components/common/Tooltip.svelte';

    const i18n = getContext('i18n');

    export let value;
    export let placeholder = '';
    export let searchEnabled = true;
    export let searchPlaceholder = '';

    export let items = [{value: 'mango', description: 'Mango', file_num: 0}];

    let searchValue = '';

    $: filteredItems = searchValue
        ? items.filter((item) => item.value.toLowerCase().includes(searchValue.toLowerCase()))
        : items;

    let selItem;

    $: if (value !== '') {
        selItem = items.find((item) => item.value === value);
    }

</script>

<Select.Root
        {items}
        onOpenChange={async () => {
		searchValue = '';
		window.setTimeout(() => document.getElementById('scope-search-input')?.focus(), 0);
	}}
        selected={selItem}
        onSelectedChange={(selectedItem) => {
		value = selectedItem?.value ?? '';
	}}
>
    <Select.Trigger class="relative w-full" aria-label={placeholder}>
        <Select.Value
                class="flex text-left px-0.5 outline-none bg-transparent truncate text-lg font-semibold placeholder-gray-400  focus:outline-none"
                {placeholder}
        />
        <ChevronDown className="absolute end-2 top-1/2 -translate-y-[45%] size-3.5" strokeWidth="2.5"/>
    </Select.Trigger>
    <Select.Content
            class=" z-40 w-full rounded-lg  bg-white dark:bg-gray-900 dark:text-white shadow-lg border border-gray-300/30 dark:border-gray-700/50  outline-none"
            transition={flyAndScale}
            sideOffset={4}
    >
        <slot>
            {#if searchEnabled}
                <div class="flex items-center gap-2.5 px-5 mt-3.5 mb-3">
                    <Search className="size-4" strokeWidth="2.5"/>

                    <input
                            id="scope-search-input"
                            bind:value={searchValue}
                            class="w-full text-sm bg-transparent outline-none"
                            placeholder={searchPlaceholder}
                            autocomplete="off"
                    />
                </div>

                <hr class="border-gray-100 dark:border-gray-800"/>
            {/if}

            <div class="px-3 my-2 max-h-72 overflow-y-auto">
                {#each filteredItems as item}
                    <Select.Item
                            class="flex w-full font-medium line-clamp-1 select-none items-center rounded-button py-2 pl-3 pr-1.5 text-sm  text-gray-700 dark:text-gray-100  outline-none transition-all duration-75 hover:bg-gray-100 dark:hover:bg-gray-850 rounded-lg cursor-pointer data-[highlighted]:bg-muted
                            "

                            value={item.value}
                            label={item.value}
                            disabled={!item.cache_ready}
                    >
                        <div class="flex items-center gap-1">
                            {#if !item.cache_ready}
                                <Tooltip content="待入库">
                                    <div class=" text-red-500">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                             stroke-width="1.5" stroke="currentColor" class="size-5">
                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                  d="M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636"/>
                                        </svg>
                                    </div>
                                </Tooltip>
                            {:else }
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     stroke-width="1.5" stroke="currentColor" class="size-5 text-green-500">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                          d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                                </svg>
                            {/if}
                            <div class="line-clamp-1
                            {!item.cache_ready
                            ? 'text-gray-350 dark:text-gray-500 cursor-not-allowed opacity-70 hover:bg-transparent dark:hover:bg-transparent'
                            : 'text-gray-800 dark:text-gray-100 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-850 data-[highlighted]:bg-muted'
                            }
                            ">
                                {item.value}
                                <span class=" text-xs font-medium text-gray-600 dark:text-gray-400"
                                >{`包含 ${item.file_num} 个文档`}</span
                                >
                            </div>
                            <Tooltip
                                    content={item.description}
                            >
                                <div class:hidden={ !item.description || item.description?.length===0 }>
                                    <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke-width="1.5"
                                            stroke="currentColor"
                                            class="size-5"
                                    >
                                        <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
                                        />
                                    </svg>
                                </div>
                            </Tooltip>

                        </div>

                        {#if value === item.value}
                            <div class="ml-auto">
                                <Check/>
                            </div>
                        {/if}
                    </Select.Item>
                {:else}
                    <div>
                        <div class="block px-3 py-2 text-sm text-gray-700 dark:text-gray-100">
                            {$i18n.t('No results found')}
                        </div>
                    </div>
                {/each}
            </div>
        </slot>
    </Select.Content>
</Select.Root>
