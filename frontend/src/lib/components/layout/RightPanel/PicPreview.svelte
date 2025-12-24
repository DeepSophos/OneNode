<script>
    // import { createEventDispatcher } from 'svelte';
    import Tooltip from '$lib/components/common/Tooltip.svelte';

    export let imgSrc;
    export let docOffset;

    // const dispatch = createEventDispatcher();

    // function goPrev() {
	// 	dispatch('offsetChange', {
	// 		offset: -1
	// 	});
	// }

    // function goNext() {
	// 	dispatch('offsetChange', {
	// 		offset: 1
	// 	});
	// }

    //$: imgUrl = `${imgSrc}${docOffset ? `?offset=${docOffset}` : ''}`;

    $: imgUrl = (() => {
      const url = new URL(imgSrc, 'http://dummy-base.com'); // Using a dummy base URL
      const params = new URLSearchParams(url.search);

      if (docOffset) {
        // If no page but docOffset exists, add offset as a new parameter
        params.set('offset', docOffset.toString());
      }

      // Remove the dummy base and return the path with updated search params
      let new_url = `${url.pathname}${params.toString() ? '?' + params.toString() : ''}`;
      // console.log(new_url);
      return new_url;
    })();

</script>

<div class="flex w-full items-center justify-around">
    <Tooltip placement="right" content={'上一页'} touch={false} cus_css="absolute left-0">
        <button
            on:click={() => {
                docOffset -= 1;
            }}
        >
            <div
                class="flex h-[72px] w-8 items-center justify-center opacity-50 hover:opacity-100 transition"
            >
                <div class="flex h-6 w-6 flex-col items-center">
                    <div
                        class="h-3 w-1 rounded-full bg-[#0f0f0f] dark:bg-white rotate-0 translate-y-[0.15rem] rotate-[30deg]"
                    />
                    <div
                        class="h-3 w-1 rounded-full bg-[#0f0f0f] dark:bg-white rotate-0 translate-y-[-0.15rem] rotate-[-30deg]"
                    />
                </div>
            </div>
        </button>
    </Tooltip>

        <img src={imgUrl} alt="Citation" class="w-full max-w-[95%]" />

    <Tooltip placement="right" content={'下一页'} touch={false} cus_css="absolute right-0">
        <button
            on:click={() => {
                docOffset += 1;
            }}
        >
            <div
                class="flex h-[72px] w-8 items-center justify-center opacity-50 hover:opacity-100 transition"
            >
                <div class="flex h-6 w-6 flex-col items-center">
                    <div
                        class="h-3 w-1 rounded-full bg-[#0f0f0f] dark:bg-white rotate-0 translate-y-[0.15rem] rotate-[-30deg]"
                    />
                    <div
                        class="h-3 w-1 rounded-full bg-[#0f0f0f] dark:bg-white rotate-0 translate-y-[-0.15rem] rotate-[30deg]"
                    />
                </div>
            </div>
        </button>
    </Tooltip>
</div>