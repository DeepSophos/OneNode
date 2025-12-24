<script lang="ts">
    import {onDestroy, onMount} from 'svelte';
    import {map} from './entry';
    import {ONENODE_BASE_URL} from '$lib/constants';
    // import EmbedPDF from ONENODE_BASE_URL+'/embedPdf/embedpdf.js'
    import Modal from './Modal.svelte';
    import TranslatePDF from './TranslatePdf.mjs';

    export let closeCallback: Function;
    export let fileUrl = '';
    let show = false;
    let EmbedPDF = null;
    let t: TranslatePDF;
    onMount(async () => {
        show = true;
        const module = await import(/* @vite-ignore */ `${ONENODE_BASE_URL}/static/embedPdf/embedpdf.js`);
        EmbedPDF = module.default;
        setTimeout(() => {
            EmbedPDF.init({
                type: 'container',
                target: document.getElementById('pdf-viewer'),
                src: fileUrl
            });
            const container = document.querySelector('embedpdf-container');
            t = new TranslatePDF(container?.shadowRoot || container!, map);

        }, 200);
    });
    onDestroy(() => {
        t.destroy();
    });
    const close = () => {
        show = false
        closeCallback();
    }

</script>

<main>
    <Modal bind:show size="auto">
        <div class="relative px-4 py-4">
            <div class="absolute cursor-pointer px-2 py-2 rounded-full ml-[-40px] right-0 top-0 hover:text-black"
                 on:click={close}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                     stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12"/>
                </svg>

            </div>
            <div class="PdfViewer-content h-[89vh] overflow-y-auto text-center rounded-xl m-1.5"
                 style="display: flex; justify-content: center; align-items: flex-start;">
                <div id="pdf-viewer" style="width: 100%; height: 100%;"></div>
            </div>
        </div>
    </Modal>
</main>
