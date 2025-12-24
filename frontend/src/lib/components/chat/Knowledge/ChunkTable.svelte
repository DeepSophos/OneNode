<script>
	export let files;
</script>

<div class="table-container">
	<h3>文件切片详情</h3>

	{#if files.length > 0}
		<table>
			<thead>
			<tr>
				<th>文件名</th>
				<th>章节</th>
				<th>切片</th>
				<th>Token/切片</th>
				<th>内容类型</th>
			</tr>
			</thead>
			<tbody>
			{#each files as file}
				<tr>
					<td>{file.name}</td>
					<td>{file.chapters}</td>
					<td>{file.chunks}</td>
					<td>{file.avgTokens}</td>
					<td class="content-types">
						<span class="document">{file.contentTypes.document}文</span>
						<span class="image">{file.contentTypes.image}图</span>
						<span class="table">{file.contentTypes.table}表</span>
					</td>
				</tr>
			{/each}
			</tbody>
		</table>
	{:else}
		<p class="empty">请从左侧选择知识范围</p>
	{/if}
</div>

<style>
    .table-container {
        background: white;
        border-radius: 8px;
        padding: 16px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        height: 100%;
        overflow: auto;
    }

    h3 {
        color: #2c3e50;
        margin-top: 0;
        margin-bottom: 16px;
    }

    table {
        width: 100%;
        border-collapse: collapse;
    }

    th, td {
        padding: 12px 16px;
        text-align: left;
        border-bottom: 1px solid #ecf0f1;
    }

    th {
        background-color: #f8f9fa;
        color: #7f8c8d;
        font-weight: 500;
    }

    tr:hover {
        background-color: #f8fafc;
    }

    .content-types span {
        display: inline-block;
        padding: 2px 8px;
        border-radius: 4px;
        margin-right: 4px;
        font-size: 0.8em;
    }

    .document {
        background-color: #e3f2fd;
        color: #1976d2;
    }

    .image {
        background-color: #e8f5e9;
        color: #388e3c;
    }

    .table {
        background-color: #f3e5f5;
        color: #8e24aa;
    }

    .empty {
        color: #95a5a6;
        text-align: center;
        padding: 20px;
    }
</style>
