<script>
	import { knowledgeStore } from '$lib/stores/knowledgeStore';
	import KnowledgeCards from './Knowledge/KnowledgeCards.svelte';
	import FileDistribution from './Knowledge/FileDistribution.svelte';
	import ContentTypePie from './Knowledge/ContentTypePie.svelte';
	import ChunkTable from './Knowledge/ChunkTable.svelte';

	let selectedRange = null;

	function handleSelect(range) {
		selectedRange = range;
	}
</script>

<div class="dashboard">
	<header>
		<h1>知识库内容统计分析</h1>
		<p class="update-time">最后更新: {new Date().toLocaleString()}</p>
	</header>

	<div class="layout">
		<KnowledgeCards
			onSelect={handleSelect}
			ranges={$knowledgeStore.ranges}
			selected={selectedRange}
		/>
		{#if selectedRange}
			<div class="main-content">
				<FileDistribution
					ranges={$knowledgeStore.ranges}
					selected={selectedRange}
				/>

				<div class="chart-row">
					<ContentTypePie
						totals={$knowledgeStore.totals}
						current={selectedRange}
					/>
					<ChunkTable
						files={selectedRange?.files || []}
					/>
				</div>
			</div>
		{:else}
			<div class="none">
				请从左侧选择知识范围
			</div>
		{/if}
	</div>
</div>

<style>
    .dashboard {
        width: 100%;
        margin: 0 auto;
        padding: 20px;
        height: calc(100vh - 60px);
        font-family: Arial, sans-serif;
        overflow: auto;
    }

    header {
        text-align: center;
        margin-bottom: 10px;
    }

    h1 {
        color: #2c3e50;
        margin: 0;
    }

    .update-time {
        color: #95a5a6;
        font-size: 0.9em;
        margin-top: 5px;
    }

    .layout {
        gap: 24px;
        display: flex;
        height: calc(100vh - 160px);
        overflow: auto;
        justify-content: center;
    }

    .none {
        background: white;
        height: 100%;
        width: calc(100vw - 300px);
        overflow: auto;
        border-radius: 8px;
        padding: 16px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        display: flex;
        flex-direction: column;
        gap: 12px;
    }

    .main-content {
        display: flex;
        flex-direction: column;
        gap: 24px;
        height: 100%;
        overflow: auto;
        width: calc(100vw - 300px);
    }

    .chart-row {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 24px;
    }
</style>
