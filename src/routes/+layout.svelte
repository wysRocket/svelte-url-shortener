<script>
	import '@picocss/pico/css/pico.min.css';
</script>

<div class="flex-container">
	<header class="container">
		<nav>
			<ul>
				<li>
					<a href="https://bitly.com">
						<img
							src="https://docrdsfx76ssb.cloudfront.net/static/1721741801/pages/wp-content/uploads/2021/08/bitly_logo.svg"
							alt="Bitly Logo"
							width="100"
							height="50"
						/>
					</a>
				</li>
			</ul>
			<ul>
				<li><a href="https://bitly.com/a/sign_in">Log in</a></li>
				<li>
					<a
						href="https://bitly.com/pages/landing/discover-enterprise"
						role="button"
						class="secondary">Get a Quote</a
					>
				</li>
				<li>
					<a href="https://bitly.com/pages/pricing" role="button" class="primary">Sign up Free</a>
				</li>
			</ul>
		</nav>
	</header>

	<main class="container flex-content">
		<slot></slot>
	</main>

	<footer class="container">
		<small>&copy; Svelte URL-shortener</small>
	</footer>
</div>

<style>
	.flex-container {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	.flex-content {
		flex: 1;
	}
</style>
