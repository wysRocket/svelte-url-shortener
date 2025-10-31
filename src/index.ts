import { GET as handleRequest } from '../src/routes/[shortUrl]/+server';

addEventListener('fetch', (event: FetchEvent) => {
	event.respondWith(handleRequest(event.request));
});
