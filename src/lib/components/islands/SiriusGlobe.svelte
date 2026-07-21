<script lang="ts">
	import { onMount } from 'svelte';
	import 'leaflet/dist/leaflet.css';
	import type { Map as LeafletMap } from 'leaflet';
	import { t, type Locale } from '$lib/i18n';
	import waveCities from '$lib/data/waveCities.js';

	let { locale }: { locale: Locale } = $props();

	let mapContainer: HTMLDivElement | undefined = $state();
	let enhanced = $state(false);

	function isCaribbean(city: (typeof waveCities)[number]): boolean {
		return city.name === 'Guadeloupe' || city.name === 'Martinique';
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
					className: 'wave-marker' + (active ? ' wave-marker-active' : ''),
					iconSize: active ? [20, 20] : [14, 14],
					iconAnchor: active ? [10, 10] : [7, 7]
				});

			map = L.map(mapContainer, { scrollWheelZoom: false });

			L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
				attribution:
					'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
				maxZoom: 18
			}).addTo(map);

			const markers = waveCities.map((city) => {
				const marker = L.marker([city.lat, city.lon], {
					icon: markerIcon(isCaribbean(city))
				}).addTo(map as LeafletMap);
				marker.bindPopup(`<strong>${city.name}</strong><br>${city.date}`);
				marker.on('popupopen', () => marker.setIcon(markerIcon(true)));
				marker.on('popupclose', () => marker.setIcon(markerIcon(isCaribbean(city))));
				return marker;
			});

			const group = L.featureGroup(markers);
			map.fitBounds(group.getBounds().pad(0.15));
			enhanced = true;
		})();

		return () => {
			cancelled = true;
			map?.remove();
		};
	});
</script>

<div class="sirius-globe">
	<div
		bind:this={mapContainer}
		class="wave-map"
		role="group"
		aria-label={t(locale, 'globe_title')}
	></div>

	<!-- Repli no-JS : liste statique de la vague (ville — date), retirée une
	     fois la carte montée. -->
	{#if !enhanced}
		<ul class="wave-cities grid-auto">
			{#each waveCities as city (city.name)}
				<li class="card">
					<h3>{city.name}</h3>
					<p class="wave-date">{city.date}</p>
				</li>
			{/each}
		</ul>
	{/if}
</div>

<style>
	/* Hauteur fixe identique au legacy : réserve l'espace dès le SSR (zéro CLS). */
	.wave-map {
		width: 100%;
		height: 22rem;
		border-radius: var(--radius-md);
		overflow: hidden;
		background: var(--surface-sunk);
	}

	.wave-cities {
		margin-top: var(--space-4);
		list-style: none;
	}

	.wave-date {
		font-size: var(--text-0);
		color: var(--ink-dim);
	}

	:global(.wave-marker) {
		background: var(--caribbean-teal);
		border: 2px solid oklch(20% 0.03 265);
		border-radius: 50%;
		box-shadow: var(--shadow-sm);
	}

	:global(.wave-marker-active) {
		background: var(--gold-surface);
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
		.sirius-globe :global(.leaflet-fade-anim),
		.sirius-globe :global(.leaflet-popup),
		.sirius-globe :global(.leaflet-zoom-anim) {
			transition: none !important;
		}
	}
</style>
