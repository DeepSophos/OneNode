<script>
	export let ranges;
	export let onSelect;
	export let selected;
</script>

<div class="cards-container">
	{#each ranges as range}
		<div
			class="knowledge-card"
			class:selected={selected?.id === range.id}
			on:click={() => onSelect(range)}
		>
			<h3>{range.name}</h3>
			<div class="metrics">
				<div class="metric">
					<span class="label">文件</span>
					<span class="value">{range.fileCount}</span>
				</div>
				<div class="metric">
					<span class="label">章节</span>
					<span class="value">{range.chapters}</span>
				</div>
				<div class="metric">
					<span class="label">切片</span>
					<span class="value">{range.chunks}</span>
				</div>
			</div>
		</div>
	{/each}
</div>

<style>
    .cards-container {
        background: white;
        height: 100%;
        width: 300px;
        overflow: auto;
        border-radius: 8px;
        padding: 16px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        display: flex;
        flex-direction: column;
        gap: 12px;
    }

    .knowledge-card {
        background: white;
        border-radius: 8px;
        padding: 16px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        cursor: pointer;
        transition: all 0.2s ease;
    }

    .knowledge-card:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }

    .knowledge-card.selected {
        border-left: 4px solid #3498db;
        background-color: #f8fafc;
    }

    .knowledge-card h3 {
        color: #3498db;
        margin: 0 0 8px 0;
        font-size: 1.1em;
    }

    .metrics {
        display: flex;
        justify-content: space-between;
    }

    .metric {
        text-align: center;
    }

    .label {
        display: block;
        font-size: 0.8em;
        color: #7f8c8d;
    }

    .value {
        font-weight: bold;
        color: #2c3e50;
    }
</style>
