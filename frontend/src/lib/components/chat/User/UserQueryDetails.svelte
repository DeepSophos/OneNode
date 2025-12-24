<script>
import MessageModal from '$lib/components/chat/User/MessageModal.svelte';
	export let queries;
	let show=false
	let userInfo=[]
	function chartInfo(info) {
let data=JSON.parse(info)
console.log(data)
return data.title
	}
	function showChartInfo(info) {
let data=JSON.parse(info)
show=true
console.log(data.messages)
userInfo=data.messages
	}
</script>

<div class="query-results">
	<table>
		<thead>
		<tr>
			<th>用户名</th>
			<th>时间</th>
			<th>问题</th>
			<th>主题</th>
			<th>操作</th>
		</tr>
		</thead>
		<tbody>
		{#each queries as query}
			<tr>
			<td>{query.username}</td>
				<td>{new Date(query.timestamp).toLocaleString()}</td>
				<td>{chartInfo(query.message)}</td>
				<td>{query.answer}</td>
				<td><button
						class="px-2.5 py-2.5 min-w-fit rounded-lg flex-1 md:flex-none flex text-right transition "
						on:click={showChartInfo(query.message)}
					>
					查看
					</button>
					</td>
			</tr>
		{/each}
		</tbody>
	</table>
	<MessageModal bind:show={show} info={userInfo}/>
</div>

<style>
    .query-results {
        margin-top: 20px;
        overflow-x: auto;
    }

    table {
        width: 100%;
        border-collapse: collapse;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }

    th, td {
        padding: 12px 15px;
        text-align: left;
        border-bottom: 1px solid #ddd;
    }

    th {
        background-color: #3498db;
        color: white;
    }

    tr:nth-child(even) {
        background-color: #f8f9fa;
    }

    tr:hover {
        background-color: #f1f1f1;
    }

    td {
        max-width: 300px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
</style>
