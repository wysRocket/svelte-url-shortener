<script>
	import { createEventDispatcher } from 'svelte';

	let url = '';
	let shortUrl = '';
	let error = '';
	let loading = false;
	let success = false;

	const dispatch = createEventDispatcher();

	function validateUrl(value) {
		try {
			new URL(value);
			return true;
		} catch (_) {
			return false;
		}
	}

	async function handleSubmit(event) {
		event.preventDefault();
		error = '';
		success = false;

		if (!validateUrl(url)) {
			error = 'Invalid URL';
			return;
		}

		loading = true;

		try {
			// Simulate an API call
			await new Promise((resolve) => setTimeout(resolve, 1000));

			// Check if shortUrl already exists (simulate)
			if (shortUrl === 'existing') {
				throw new Error('Short URL already exists');
			}

			success = true;
			dispatch('success', { shortUrl });
		} catch (err) {
			error = err.message;
		} finally {
			loading = false;
		}
	}
</script>

<main class="container">
	<h1>URL Shortener</h1>
	<form on:submit={handleSubmit}>
		<label for="url">URL</label>
		<input
			id="url"
			type="text"
			bind:value={url}
			class:invalid={!validateUrl(url) && url.length > 0}
			required
		/>

		<label for="shortUrl">Short URL</label>
		<input id="shortUrl" type="text" bind:value={shortUrl} required />

		{#if error}
			<p class="error">{error}</p>
		{/if}

		{#if success}
			<p class="success">Success! <a href="/{shortUrl}/stats">View stats</a></p>
		{:else}
			<button type="submit" disabled={loading}>
				{#if loading}Loading...{:else}Submit{/if}
			</button>
		{/if}
	</form>
</main>

<style>
	.invalid {
		border-color: red;
	}

	.error {
		color: red;
	}

	.success {
		color: green;
	}
</style>
