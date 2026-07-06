<script>
  import { onMount } from "svelte";
  import { worldData, waveCities } from "./world.js";

  let canvas = $state();
  let activeCity = $state(null);

  function project(lon, lat, width, height) {
    const x = ((lon + 180) / 360) * width;
    const y = ((90 - lat) / 180) * height;
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
    const border = styles.getPropertyValue("--border").trim() || "#333";

    ctx.fillStyle = border;
    worldData.features.forEach((feature) => {
      ctx.beginPath();
      feature.geometry.coordinates[0].forEach(([lon, lat], i) => {
        const { x, y } = project(lon, lat, width, height);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.closePath();
      ctx.fill();
    });

    waveCities.forEach((city) => {
      const { x, y } = project(city.lon, city.lat, width, height);
      ctx.beginPath();
      ctx.arc(x, y, city.name === activeCity?.name ? 7 : 4, 0, Math.PI * 2);
      ctx.fillStyle = city.name === "Guadeloupe" || city.name === "Martinique" ? gold : teal;
      ctx.fill();
    });
  }

  function pickCity(clientX, clientY) {
    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    let closest = null;
    let closestDist = Infinity;
    waveCities.forEach((city) => {
      const p = project(city.lon, city.lat, rect.width, rect.height);
      const dist = Math.hypot(p.x - x, p.y - y);
      if (dist < closestDist) {
        closestDist = dist;
        closest = city;
      }
    });
    activeCity = closestDist < 30 ? closest : null;
    draw();
  }

  onMount(() => {
    draw();
    const onResize = () => draw();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  });
</script>

<div class="sirius-globe">
  <canvas
    bind:this={canvas}
    class="island-canvas"
    aria-label="Carte de la progression du lever héliaque à travers l'Afrique et les Caraïbes, touchez une ville pour voir sa date"
    tabindex="0"
    onmousemove={(e) => pickCity(e.clientX, e.clientY)}
    onmouseleave={() => { activeCity = null; draw(); }}
    onclick={(e) => pickCity(e.clientX, e.clientY)}
  ></canvas>
  <p class="globe-caption" aria-live="polite">
    {#if activeCity}
      <strong>{activeCity.name}</strong> — {activeCity.date}
    {:else}
      &nbsp;
    {/if}
  </p>
</div>

<style>
  .island-canvas {
    cursor: crosshair;
  }

  .globe-caption {
    text-align: center;
    min-height: 1.5em;
    color: var(--gold);
    font-weight: 600;
  }
</style>
