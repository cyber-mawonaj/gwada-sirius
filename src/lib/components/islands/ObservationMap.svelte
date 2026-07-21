<script lang="ts">
	import { onMount } from 'svelte';
	import 'leaflet/dist/leaflet.css';
	import type { Map as LeafletMap } from 'leaflet';
	import { t, type Locale } from '$lib/i18n';
	import sites from '$lib/data/sites.js';

	let { locale }: { locale: Locale } = $props();

	let mapContainer: HTMLDivElement | undefined = $state();
	let enhanced = $state(false);

	function description(site: (typeof sites)[number]): string {
		const desc = site as unknown as Record<string, string | undefined>;
		return desc[`description_${locale}`] ?? site.description_fr;
	}

	onMount(() => {
		let cancelled = false;
		let map: LeafletMap | undefined;

		(async () => {
			// Leaflet touche `window` à l'évaluation : import dynamique, jamais de SSR.
			const L = await import('leaflet');
			if (cancelled || !mapContainer) return;

			const markerIcon = (active: boolean) =>
				L.divIcon({
					className: 'site-marker' + (active ? ' site-marker-active' : ''),
					iconSize: active ? [22, 22] : [16, 16],
					iconAnchor: active ? [11, 11] : [8, 8]
				});

			map = L.map(mapContainer, {
				scrollWheelZoom: false
			});

			L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
				attribution:
					'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
				maxZoom: 18
			}).addTo(map);

			const markers = sites.map((site) => {
				const marker = L.marker([site.lat, site.lon], { icon: markerIcon(false) }).addTo(
					map as LeafletMap
				);
				marker.bindPopup(
					`<strong>${site.name}</strong><br>${description(site)}<br><small style="color: var(--ink-dim)">${site.lat}°N, ${site.lon}°O — ${site.alt} m</small>`
				);
				marker.on('popupopen', () => marker.setIcon(markerIcon(true)));
				marker.on('popupclose', () => marker.setIcon(markerIcon(false)));
				return marker;
			});

			const group = L.featureGroup(markers);
			map.fitBounds(group.getBounds().pad(0.2));
			enhanced = true;
		})();

		return () => {
			cancelled = true;
			map?.remove();
		};
	});
</script>

<div class="observation-map">
	<div
		bind:this={mapContainer}
		class="leaflet-container-host"
		role="group"
		aria-label={t(locale, 'observer_map_title')}
	></div>

	<!-- Repli no-JS : liste statique des sites, retirée une fois la carte montée. -->
	{#if !enhanced}
		<ul class="site-list grid-auto">
			{#each sites as site (site.id)}
				<li class="card">
					<h3>{site.name}</h3>
					<p>{description(site)}</p>
					<p class="coords">{site.lat}°N, {site.lon}°O — {site.alt} m</p>
				</li>
			{/each}
		</ul>
	{/if}
</div>

<style>
	/* Hauteur fixe identique au legacy : réserve l'espace dès le SSR (zéro CLS). */
	.leaflet-container-host {
		width: 100%;
		height: 22rem;
		border-radius: var(--radius-md);
		overflow: hidden;
		background: var(--surface-sunk);
	}

	.site-list {
		margin-top: var(--space-4);
		list-style: none;
	}

	.coords {
		font-size: var(--text-0);
		color: var(--ink-dim);
	}

	:global(.site-marker) {
		background: var(--gold-surface);
		border: 2px solid oklch(20% 0.03 265);
		border-radius: 50%;
		box-shadow: var(--shadow-sm);
	}

	:global(.site-marker-active) {
		background: var(--caribbean-teal);
	}

	:global(.leaflet-popup-content-wrapper) {
		background: var(--surface-raised);
		color: var(--ink);
		border-radius: var(--radius-sm);
	}

	:global(.leaflet-popup-tip) {
		background: var(--surface-raised);
	}

	@media (prefers-reduced-motion: reduce) {
		.observation-map :global(.leaflet-fade-anim),
		.observation-map :global(.leaflet-popup),
		.observation-map :global(.leaflet-zoom-anim) {
			transition: none !important;
		}
	}
</style>
