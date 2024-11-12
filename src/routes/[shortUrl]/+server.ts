import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ params, request }) => {
	const { shortUrl } = params;
	const kv = (globalThis as any)[process.env.VITE_URLS] as KVNamespace;

	// Fetch the original URL from KV
	const originalUrl = await kv.get(shortUrl);
	if (!originalUrl) {
		return new Response('Not Found', { status: 404 });
	}

	// Save transition data in KV
	const userAgent = request.headers.get('user-agent') || 'unknown';
	const ip = request.headers.get('cf-connecting-ip') || 'unknown';
	const geo = request.headers.get('cf-ipcountry') || 'unknown';
	const transitionTime = new Date().toISOString();

	const transitionData = {
		userAgent,
		ip,
		geo,
		transitionTime
	};

	await kv.put(`${shortUrl}:transition`, JSON.stringify(transitionData));

	// Increment the click count
	const totalClicks = await kv.get(`${shortUrl}:clicks`);
	const newTotalClicks = totalClicks ? parseInt(totalClicks, 10) + 1 : 1;
	await kv.put(`${shortUrl}:clicks`, newTotalClicks.toString());

	// Redirect to the original URL
	return new Response(null, {
		status: 302,
		headers: {
			Location: originalUrl
		}
	});
};
