<script lang="ts">
	import { t, type Locale } from '$lib/i18n';
	import sites from '$lib/data/sites.js';
	import nextRising from '$lib/data/nextRising.js';

	let { locale }: { locale: Locale } = $props();

	type Prediction = { date: string; time: string };

	// Année du prochain lever héliaque (calculée au build, comme le 11ty legacy).
	const { year } = nextRising();

	let selectedId = $state(sites[0].id);

	let selected = $derived(sites.find((s) => s.id === selectedId) ?? sites[0]);
	let prediction = $derived(
		(selected.predictions as unknown as Record<number, Prediction>)[year]
	);

	function predictionOf(site: (typeof sites)[number]): Prediction | undefined {
		return (site.predictions as unknown as Record<number, Prediction>)[year];
	}

	function description(site: (typeof sites)[number]): string {
		const desc = site as unknown as Record<string, string | undefined>;
		return desc[`description_${locale}`] ?? site.description_fr;
	}

	// Piège UTC-4 (NOTES_PROJET §3) : une date ISO sans heure est interprétée en
	// UTC et peut reculer d'un jour une fois formatée en heure de Guadeloupe.
	// Toujours parser les composants et construire la date en heure locale.
	function formatDate(iso: string): string {
		const [y, m, d] = iso.split('-').map(Number);
		return new Date(y, m - 1, d).toLocaleDateString(locale === 'ht' ? 'fr' : locale, {
			day: 'numeric',
			month: 'long',
			year: 'numeric'
		});
	}

	function windowLabel(iso: string): string {
		const [y, m, d] = iso.split('-').map(Number);
		const start = new Date(y, m - 1, d - 2);
		const end = new Date(y, m - 1, d + 2);
		const fmt = (date: Date) =>
			date.toLocaleDateString(locale === 'ht' ? 'fr' : locale, {
				day: 'numeric',
				month: 'short'
			});
		return `${fmt(start)} – ${fmt(end)}`;
	}
</script>

<div class="calculator card">
	<label class="calculator-label" for="site-select"
		>{t(locale, 'observer_calculator_select_label')}</label
	>
	<select id="site-select" bind:value={selectedId} class="calculator-select">
		{#each sites as site (site.id)}
			<option value={site.id}>{site.name}</option>
		{/each}
	</select>

	{#if prediction}
		<div class="calculator-result" aria-live="polite">
			<p class="calculator-result-label">{t(locale, 'observer_calculator_result_heliacal')}</p>
			<p class="calculator-result-value">{formatDate(prediction.date)} · {prediction.time}</p>
			<p class="calculator-result-label">{t(locale, 'observer_calculator_result_window')}</p>
			<p class="calculator-result-window">{windowLabel(prediction.date)}</p>
		</div>
	{/if}
</div>

<!-- Table complète : toujours rendue (SSR), c'est le repli no-JS. À
     l'hydratation, la ligne du site sélectionné est mise en valeur. -->
<div class="predictions-table card">
	<table>
		<caption class="visually-hidden">{t(locale, 'observer_calculator_title')}</caption>
		<thead>
			<tr>
				<th scope="col">{t(locale, 'observer_calculator_table_site')}</th>
				<th scope="col">{t(locale, 'observer_calculator_table_date')}</th>
				<th scope="col">{t(locale, 'observer_calculator_table_time')}</th>
			</tr>
		</thead>
		<tbody>
			{#each sites as site (site.id)}
				{@const p = predictionOf(site)}
				<tr class:selected={site.id === selectedId}>
					<th scope="row">
						{site.name}
						<div class="site-desc">{description(site)}</div>
					</th>
					{#if p}
						<td>{formatDate(p.date)}</td>
						<td>{p.time}</td>
					{/if}
				</tr>
			{/each}
		</tbody>
	</table>
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

	.predictions-table {
		overflow-x: auto;
		margin-top: var(--space-4);
	}

	table {
		width: 100%;
		border-collapse: collapse;
	}

	thead tr {
		text-align: left;
		border-bottom: 2px solid var(--border);
	}

	th,
	td {
		padding: var(--space-2);
	}

	tbody tr {
		border-bottom: 1px solid var(--border);
		transition: background-color 0.2s ease;
	}

	tbody tr.selected {
		background: var(--gold-surface);
	}

	tbody th {
		font-weight: 600;
		text-align: left;
	}

	.site-desc {
		font-size: var(--text-0);
		color: var(--ink-soft);
		font-weight: 400;
	}

	@media (prefers-reduced-motion: reduce) {
		tbody tr {
			transition: none;
		}
	}
</style>
