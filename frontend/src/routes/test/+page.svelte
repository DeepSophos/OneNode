<script>
    import {onMount} from 'svelte';
    import Markdown from '$lib/components/chat/Messages/Markdown.svelte';

    let message = {
        id: '1',
        content:
            `
[示例网站1](https://example.123.com){data-xx="9999666"}
\n\n<details>
  \n\n<summary>点击展开（混合语法）</summary>
    \n\n[示例网站1](https://example.123.com)
    \n\n[示例网站2](https://example.com)
    \n\n[示例网站3](https://example.com)
    \n\n[示例网站4](https://example.com)
    \n\n[示例网站4](https://example.com)
\n\n</details>
`
    }



    onMount(() => {

    })
</script>
<div>
    {#if message}
        <Markdown
                id={message.id}
                content={message.content}
        />
    {/if}
</div>
