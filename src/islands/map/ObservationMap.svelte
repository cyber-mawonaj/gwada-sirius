<script>
  import { onMount, onDestroy } from "svelte";
  import L from "leaflet";
  import "leaflet/dist/leaflet.css";

  let { sites, locale } = $props();

  let mapContainer = $state();
  let map;

  function markerIcon(active) {
    return L.divIcon({
      className: "site-marker" + (active ? " site-marker-active" : ""),
      iconSize: active ? [22, 22] : [16, 16],
      iconAnchor: active ? [11, 11] : [8, 8],
    });
  }

  onMount(() => {
    map = L.map(mapContainer, {
      scrollWheelZoom: false,
    });

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 18,
    }).addTo(map);

    const markers = sites.map((site) => {
      const marker = L.marker([site.lat, site.lon], { icon: markerIcon(false) }).addTo(map);
      const desc = site[`description_${locale}`] ?? site.description_fr;
      marker.bindPopup(
        `<strong>${site.name}</strong><br>${desc}<br><small>${site.lat}°N, ${site.lon}°O — ${site.alt} m</small>`
      );
      marker.on("popupopen", () => marker.setIcon(markerIcon(true)));
      marker.on("popupclose", () => marker.setIcon(markerIcon(false)));
      return marker;
    });

    const group = L.featureGroup(markers);
    map.fitBounds(group.getBounds().pad(0.2));
  });

  onDestroy(() => {
    map?.remove();
  });
</script>

<div class="observation-map">
  <div bind:this={mapContainer} class="leaflet-container-host" role="group" aria-label="Carte des sites d'observation de Sirius en Guadeloupe"></div>
</div>

<style>
  .leaflet-container-host {
    width: 100%;
    height: 22rem;
    border-radius: var(--radius-md);
    overflow: hidden;
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
</style>
