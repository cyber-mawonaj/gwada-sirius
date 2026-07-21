// Service worker minimal : résilience réseau (3G/4G irrégulier) et usage
// hors-ligne des pages déjà visitées. Stratégie stale-while-revalidate.
// NOTES_PROJET §5 : incrémenter CACHE_NAME à chaque évolution du SW.
const CACHE_NAME = "gwada-sirius-v3";

self.addEventListener("install", () => {
	self.skipWaiting();
});

self.addEventListener("activate", (event) => {
	event.waitUntil(
		caches
			.keys()
			.then((keys) =>
				Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))
			)
	);
	self.clients.claim();
});

self.addEventListener("fetch", (event) => {
	if (event.request.method !== "GET") return;
	const url = new URL(event.request.url);
	if (url.origin !== self.location.origin) return;

	event.respondWith(
		caches.open(CACHE_NAME).then(async (cache) => {
			const cached = await cache.match(event.request);
			const network = fetch(event.request)
				.then((response) => {
					if (response.ok) cache.put(event.request, response.clone());
					return response;
				})
				.catch(() => cached);

			return cached || network;
		})
	);
});
