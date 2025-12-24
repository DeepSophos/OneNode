<script>
	import { onMount } from 'svelte';
	import UserActivityChart from './User/ActivityCharts.svelte';
	import UserQueryDetails from './User/UserQueryDetails.svelte';
	import { getUserChatCount,getUserChatStatistics,get3hourStats,searchUserCharts,search} from '$lib/apis/chats';

	// 模拟数据 - 实际应用中应从API获取
	let users = [];
	let userChatStatistics = {'today_count':0,'total_users':0,'total_Chats':0}
	let activeUsers = 0;
	let totalLoggedIn = 0;
	let userQueryStats = [];
	let timeDistribution = {};
	let topicDistribution = {};

	// 查询参数
	let selectedUsername = '';
	let startDate = '';
	let endDate = '';
	let userQueryResults = [];

	// 获取用户统计数据
	async function fetchUserStats() {
		// 模拟API调用
		// 实际应用中这里应该是fetch('/api/user-stats')等
		await new Promise(resolve => setTimeout(resolve, 500));

		// 模拟数据
		totalLoggedIn = 42;
		activeUsers = 15;

		users = [
			{ id: 1, username: 'user1', lastActive: '2023-05-15T10:30:00' },
			{ id: 2, username: 'user2', lastActive: '2023-05-15T09:15:00' },
			{ id: 3, username: 'user3', lastActive: '2023-05-14T16:45:00' }
			// 更多用户...
		];


		topicDistribution = {
			'技术问题': 85,
			'账户管理': 42,
			'支付问题': 36,
			'产品功能': 58,
			'其他': 27
		};

	}

	// 查询特定用户的问题
	async function fetchUserQueries() {
		//if (!selectedUsername || !startDate || !endDate) return;

		// 模拟API调用
		let params={
            username: selectedUsername,
            start_time: startDate,
            end_time: endDate
		}
		//let QueryResults=await searchUserCharts(localStorage.token,params)
		let QueryResults=await search(localStorage.token,params)


		// 模拟数据
		userQueryResults = QueryResults.data
	}

	onMount(async() => {
       userQueryStats= await getUserChatCount(localStorage.token)
       userChatStatistics= await getUserChatStatistics(localStorage.token)
       let hourStats= await get3hourStats(localStorage.token)
console.log(hourStats)
       hourStats.forEach(item=> {
            timeDistribution[item.interval] = item.count
        })
		fetchUserStats();
	});
</script>

<div class="dashboard">
	<h1>用户情况监控</h1>

	<div class="stats-grid">
		<div class="stat-card">
			<h3>登录用户总数</h3>
			<p class="stat-value">{userChatStatistics.total_users}</p>
		</div>

		<div class="stat-card">
			<h3>当前在线用户</h3>
			<p class="stat-value">{userChatStatistics.total_Chats}</p>
		</div>
		<div class="stat-card">
			<h3>今日问答数量</h3>
			<p class="stat-value">{userChatStatistics.today_count}</p>
		</div>
		<div class="stat-card">
			<h3>总问答数量</h3>
			<p class="stat-value">{userChatStatistics.total_Chats}</p>
		</div>
	</div>

	<div class="section">
		<h2>用户问题数量排名</h2>
		<table>
			<thead>
			<tr>
				<th>排名</th>
				<th>用户名</th>
				<th>问题数量</th>
			</tr>
			</thead>
			<tbody>
			{#each userQueryStats as user, index}
				<tr>
					<td>{index + 1}</td>
					<td>{user.user_name}</td>
					<td>{user.count}</td>
				</tr>
			{/each}
			</tbody>
		</table>
	</div>

	<div class="charts-section">
		<div class="chart-container">
			<h3>问题时间分布</h3>
			<UserActivityChart data={timeDistribution} type="time" />
		</div>

		<div class="chart-container">
			<h3>问题主题分布</h3>
			<UserActivityChart data={topicDistribution} type="topic" />
		</div>
	</div>

	<div class="section">
		<h2>查询特定用户的问题</h2>
		<div class="query-form">
			<div class="form-group">
				<label for="username">用户名</label>
				<input
					bind:value={selectedUsername}
					id="username"
					placeholder="输入用户名"
					type="text"
				/>
			</div>

			<div class="form-group">
				<label for="startDate">开始日期</label>
				<input
					bind:value={startDate}
					id="startDate"
					type="date"
				/>
			</div>

			<div class="form-group">
				<label for="endDate">结束日期</label>
				<input
					bind:value={endDate}
					id="endDate"
					type="date"
				/>
			</div>

			<button on:click={fetchUserQueries}>查询</button>
		</div>

		{#if userQueryResults.length > 0}
			<UserQueryDetails queries={userQueryResults} />
		{:else if selectedUsername && startDate && endDate}
			<p>未找到该用户在指定时间段内的问题记录。</p>
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

    h1 {
        color: #2c3e50;
        margin-bottom: 30px;
    }

    h2 {
        color: #34495e;
        border-bottom: 1px solid #eee;
        padding-bottom: 10px;
        margin-top: 30px;
    }

    h3 {
        color: #7f8c8d;
        margin-bottom: 15px;
    }

    .stats-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 20px;
        margin-bottom: 30px;
    }

    .stat-card {
        background: white;
        border-radius: 8px;
        padding: 20px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        text-align: center;
    }

    .stat-value {
        font-size: 2.5rem;
        font-weight: bold;
        color: #3498db;
        margin: 10px 0;
    }

    table {
        width: 100%;
        border-collapse: collapse;
        margin: 20px 0;
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

    .charts-section {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 30px;
        margin: 30px 0;
    }

    .chart-container {
        background: white;
        border-radius: 8px;
        padding: 20px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }

    .query-form {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 15px;
        margin: 20px 0;
        align-items: end;
    }

    .form-group {
        display: flex;
        flex-direction: column;
    }

    label {
        margin-bottom: 5px;
        font-weight: bold;
        color: #7f8c8d;
    }

    input {
        padding: 10px;
        border: 1px solid #ddd;
        border-radius: 4px;
        font-size: 16px;
    }

    button {
        padding: 10px 20px;
        background-color: #3498db;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 16px;
        transition: background-color 0.3s;
    }

    button:hover {
        background-color: #2980b9;
    }

    @media (max-width: 768px) {
        .charts-section {
            grid-template-columns: 1fr;
        }
    }
</style>
