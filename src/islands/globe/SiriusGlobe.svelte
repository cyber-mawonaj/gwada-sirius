<script>
  import { onMount, onDestroy } from "svelte";
  import L from "leaflet";
  import "leaflet/dist/leaflet.css";
  import { waveCities } from "./world.js";

  let mapContainer = $state();
  let map;

  function markerIcon(active) {
    return L.divIcon({
      className: "wave-marker" + (active ? " wave-marker-active" : ""),
      iconSize: active ? [20, 20] : [14, 14],
      iconAnchor: active ? [10, 10] : [7, 7],
    });
  }

  onMount(() => {
    map = L.map(mapContainer, { scrollWheelZoom: false });

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 18,
    }).addTo(map);

    const markers = waveCities.map((city) => {
      const isCaribbean = city.name === "Guadeloupe" || city.name === "Martinique";
      const marker = L.marker([city.lat, city.lon], {
        icon: markerIcon(isCaribbean),
      }).addTo(map);
      marker.bindPopup(`<strong>${city.name}</strong><br>${city.date}`);
      marker.on("popupopen", () => marker.setIcon(markerIcon(true)));
      marker.on("popupclose", () => marker.setIcon(markerIcon(isCaribbean)));
      return marker;
    });

    const group = L.featureGroup(markers);
    map.fitBounds(group.getBounds().pad(0.15));
  });

  onDestroy(() => {
    map?.remove();
  });
</script>

<div
  bind:this={mapContainer}
  class="wave-map"
  role="group"
  aria-label="Carte de la progression du lever héliaque à travers l'Afrique et les Caraïbes"
></div>

<style>
  .wave-map {
    width: 100%;
    height: 22rem;
    border-radius: var(--radius-md);
    overflow: hidden;
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
</style>
