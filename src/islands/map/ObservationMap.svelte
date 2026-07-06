<script>
  import { onMount } from "svelte";

  let { sites, locale } = $props();

  let canvas = $state();
  let activeId = $state(null);
  let active = $derived(sites.find((s) => s.id === activeId) ?? null);

  let bounds = $derived.by(() => {
    const lats = sites.map((s) => s.lat);
    const lons = sites.map((s) => s.lon);
    return {
      minLat: Math.min(...lats) - 0.15,
      maxLat: Math.max(...lats) + 0.15,
      minLon: Math.min(...lons) - 0.15,
      maxLon: Math.max(...lons) + 0.15,
    };
  });

  function project(site, width, height) {
    const x = ((site.lon - bounds.minLon) / (bounds.maxLon - bounds.minLon)) * width;
    const y = height - ((site.lat - bounds.minLat) / (bounds.maxLat - bounds.minLat)) * height;
    return { x, y };
  }

  function draw() {
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, width, height);

    const styles = getComputedStyle(canvas);
    const gold = styles.getPropertyValue("--gold-surface").trim() || "#e8c766";
    const teal = styles.getPropertyValue("--caribbean-teal").trim() || "#3a9088";
    const ink = styles.getPropertyValue("--ink-soft").trim() || "#888";

    sites.forEach((site) => {
      const { x, y } = project(site, width, height);
      ctx.beginPath();
      ctx.arc(x, y, site.id === activeId ? 9 : 6, 0, Math.PI * 2);
      ctx.fillStyle = site.id === activeId ? teal : gold;
      ctx.fill();

      ctx.font = "12px sans-serif";
      ctx.fillStyle = ink;
      ctx.textAlign = x > width * 0.7 ? "right" : "left";
      ctx.fillText(site.name, x + (x > width * 0.7 ? -12 : 12), y + 4);
    });
  }

  function pickSite(clientX, clientY) {
    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    let closest = null;
    let closestDist = Infinity;
    sites.forEach((site) => {
      const p = project(site, rect.width, rect.height);
      const dist = Math.hypot(p.x - x, p.y - y);
      if (dist < closestDist) {
        closestDist = dist;
        closest = site;
      }
    });
    if (closest && closestDist < 40) {
      activeId = closest.id;
      draw();
    }
  }

  onMount(() => {
    draw();
    const onResize = () => draw();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  });
</script>

<div class="observation-map">
  <canvas
    bind:this={canvas}
    class="island-canvas"
    aria-label="Carte schématique des sites d'observation, cliquez sur un point pour voir ses détails"
    tabindex="0"
    onclick={(e) => pickSite(e.clientX, e.clientY)}
  ></canvas>

  {#if active}
    <div class="card map-detail">
      <h3>{active.name}</h3>
      <p>{active[`description_${locale}`] ?? active.description_fr}</p>
      <p style="color: var(--ink-soft); font-size: var(--text-0)">{active.lat}°N, {active.lon}°O — {active.alt} m</p>
    </div>
  {/if}
</div>

<style>
  .observation-map {
    display: grid;
    gap: var(--space-3);
  }

  .island-canvas {
    cursor: pointer;
  }

  .map-detail h3 {
    color: var(--gold);
    margin-bottom: var(--space-2);
  }
</style>
