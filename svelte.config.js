import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter({
			platformProxy: {
				adapter: 'cloudflare',
				configPath: 'wrangler.toml',
				persist: './kv-data'
			}
		})
	}
};

export default config;
