<script context="module" lang="ts">
	import { error } from '@sveltejs/kit';

	export async function load({ params }) {
		const { shortUrl } = params;
		const kv = (globalThis as any)[process.env.VITE_URLS] as KVNamespace;

		// Fetch the transition data from KV
		const transitionData = await kv.get(`${shortUrl}:transition`, { type: 'json' });
		if (!transitionData) {
			throw error(404, 'Not Found');
		}

		// Fetch the total number of clicks
		const totalClicks = await kv.get(`${shortUrl}:clicks`);
		return {
			shortUrl,
			transitionData: Array.isArray(transitionData) ? transitionData : [transitionData],
			totalClicks: totalClicks ? parseInt(totalClicks, 10) : 0
		};
	}
</script>

<script>
	export let data;
</script>

<main class="container">
	<h1>Stats for {data.shortUrl}</h1>

	<h2>Total Clicks: {data.totalClicks}</h2>

	<table>
		<thead>
			<tr>
				<th>Time</th>
				<th>IP</th>
				<th>User Agent</th>
				<th>Geo Data</th>
			</tr>
		</thead>
		<tbody>
			{#each data.transitionData as transition}
				<tr>
					<td>{transition.transitionTime}</td>
					<td>{transition.ip}</td>
					<td>{transition.userAgent}</td>
					<td>{transition.geo}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</main>

<style>
	table {
		width: 100%;
		border-collapse: collapse;
	}

	th,
	td {
		border: 1px solid #ddd;
		padding: 8px;
	}

	th {
		background-color: #f2f2f2;
	}
</style>
