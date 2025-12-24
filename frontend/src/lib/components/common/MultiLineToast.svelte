<script>
  export let lines = [];
  export let type = 'success'; // success, error, info, warning
</script>

<div class="flex flex-col gap-1">
  {#each lines as line}
    <div>{line}</div>
  {/each}
</div>