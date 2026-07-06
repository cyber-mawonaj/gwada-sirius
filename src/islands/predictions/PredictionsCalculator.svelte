<script>
  import { untrack } from "svelte";

  let { sites, year, locale, labels } = $props();

  let selectedId = $state(untrack(() => sites[0].id));

  let selected = $derived(sites.find((s) => s.id === selectedId));
  let prediction = $derived(selected.predictions[year]);

  function formatDate(iso) {
    const [y, m, d] = iso.split("-").map(Number);
    return new Date(y, m - 1, d).toLocaleDateString(locale === "ht" ? "fr" : locale, {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }

  function windowLabel(iso) {
    const [y, m, d] = iso.split("-").map(Number);
    const start = new Date(y, m - 1, d - 2);
    const end = new Date(y, m - 1, d + 2);
    const fmt = (date) => date.toLocaleDateString(locale === "ht" ? "fr" : locale, { day: "numeric", month: "short" });
    return `${fmt(start)} – ${fmt(end)}`;
  }
</script>

<div class="calculator card">
  <label class="calculator-label" for="site-select">{labels.select}</label>
  <select id="site-select" bind:value={selectedId} class="calculator-select">
    {#each sites as site}
      <option value={site.id}>{site.name}</option>
    {/each}
  </select>

  {#if prediction}
    <div class="calculator-result">
      <p class="calculator-result-label">{labels.heliacal}</p>
      <p class="calculator-result-value">{formatDate(prediction.date)} · {prediction.time}</p>
      <p class="calculator-result-label">{labels.window}</p>
      <p class="calculator-result-window">{windowLabel(prediction.date)}</p>
    </div>
  {/if}
</div>

<style>
  .calculator {
    max-width: 28rem;
    margin-inline: auto;
  }

  .calculator-label {
    display: block;
    font-weight: 700;
    margin-bottom: var(--space-2);
  }

  .calculator-select {
    width: 100%;
    min-height: var(--tap-target);
    padding-inline: var(--space-3);
    border-radius: var(--radius-sm);
    border: 2px solid var(--border);
    background: var(--surface);
    color: var(--ink);
    font-size: var(--text-1);
  }

  .calculator-result {
    margin-top: var(--space-4);
    padding-top: var(--space-4);
    border-top: 1px solid var(--border);
    text-align: center;
  }

  .calculator-result-label {
    font-size: var(--text-0);
    color: var(--ink-soft);
    margin-top: var(--space-2);
  }

  .calculator-result-value {
    font-family: var(--font-display);
    font-size: var(--text-3);
    color: var(--gold);
  }

  .calculator-result-window {
    font-weight: 600;
  }
</style>
