<script lang="ts">
	import { t, type Locale } from '$lib/i18n';
	import SiriusPredictions from '$lib/components/islands/SiriusPredictions.svelte';
	import ObservationMap from '$lib/components/islands/ObservationMap.svelte';
	import SiriusGlobe from '$lib/components/islands/SiriusGlobe.svelte';

	let { locale }: { locale: Locale } = $props();
</script>

<section class="section">
	<div class="container">
		<div class="section-header center">
			<p class="section-eyebrow">Sirius Gwada</p>
			<h1>{t(locale, 'observer_title')}</h1>
			<p class="pattern-strip kente" aria-hidden="true" style="margin-inline:auto"></p>
			<p class="section-subtitle">{t(locale, 'observer_subtitle')}</p>
		</div>

		<div id="predictions-island">
			<h2 class="center">{t(locale, 'observer_calculator_title')}</h2>
			<p class="section-subtitle center">{t(locale, 'observer_calculator_subtitle')}</p>

			<div style="margin-top: var(--space-4)">
				<SiriusPredictions {locale} />
			</div>
		</div>

		<div id="map-island" style="margin-top: var(--space-7)">
			<h2 class="center">{t(locale, 'observer_map_title')}</h2>
			<p class="section-subtitle center">{t(locale, 'observer_map_subtitle')}</p>

			<div style="margin-top: var(--space-4)">
				<ObservationMap {locale} />
			</div>
		</div>

		<h2 class="center" style="margin-top: var(--space-7)">{t(locale, 'observer_timeline_title')}</h2>
		<div class="timeline-h card" style="margin-top: var(--space-4)">
			<div class="timeline-h-step">
				<div class="timeline-h-icon" aria-hidden="true">🌙</div>
				<p class="timeline-h-time">{t(locale, 'observer_phase1_time')}</p>
				<h4>{t(locale, 'observer_phase1_title')}</h4>
				<p>{t(locale, 'observer_phase1_desc')}</p>
			</div>
			<div class="timeline-h-step">
				<div class="timeline-h-icon" aria-hidden="true">🔭</div>
				<p class="timeline-h-time">{t(locale, 'observer_phase2_time')}</p>
				<h4>{t(locale, 'observer_phase2_title')}</h4>
				<p>{t(locale, 'observer_phase2_desc')}</p>
			</div>
			<div class="timeline-h-step">
				<div class="timeline-h-icon" aria-hidden="true">⭐</div>
				<p class="timeline-h-time">{t(locale, 'observer_phase3_time')}</p>
				<h4>{t(locale, 'observer_phase3_title')}</h4>
				<p>{t(locale, 'observer_phase3_desc')}</p>
			</div>
			<div class="timeline-h-step">
				<div class="timeline-h-icon" aria-hidden="true">✨</div>
				<p class="timeline-h-time">{t(locale, 'observer_phase4_time')}</p>
				<h4>{t(locale, 'observer_phase4_title')}</h4>
				<p>{t(locale, 'observer_phase4_desc')}</p>
			</div>
		</div>

		<h2 class="center" style="margin-top: var(--space-7)">{t(locale, 'observer_equipment_title')}</h2>
		<div class="grid-auto" style="margin-top: var(--space-4)">
			<div class="card info-card essential">
				<div class="info-card-header">
					<h3>{t(locale, 'observer_equipment_lamp_name')}</h3>
					<span class="badge">{t(locale, 'observer_equipment_essential_badge')}</span>
				</div>
				<p>{t(locale, 'observer_equipment_lamp_desc')}</p>
			</div>
			<div class="card info-card essential">
				<div class="info-card-header">
					<h3>{t(locale, 'observer_equipment_compass_name')}</h3>
					<span class="badge">{t(locale, 'observer_equipment_essential_badge')}</span>
				</div>
				<p>{t(locale, 'observer_equipment_compass_desc')}</p>
			</div>
			<div class="card info-card essential">
				<div class="info-card-header">
					<h3>{t(locale, 'observer_equipment_clothes_name')}</h3>
					<span class="badge">{t(locale, 'observer_equipment_essential_badge')}</span>
				</div>
				<p>{t(locale, 'observer_equipment_clothes_desc')}</p>
			</div>
			<div class="card info-card">
				<h3>{t(locale, 'observer_equipment_binoculars_name')}</h3>
				<p>{t(locale, 'observer_equipment_binoculars_desc')}</p>
			</div>
			<div class="card info-card">
				<h3>{t(locale, 'observer_equipment_notebook_name')}</h3>
				<p>{t(locale, 'observer_equipment_notebook_desc')}</p>
			</div>
		</div>

		<h2 class="center" style="margin-top: var(--space-7)">{t(locale, 'observer_tips_title')}</h2>
		<div class="grid-auto" style="margin-top: var(--space-4)">
			<div class="feature-card">
				<div style="font-size: var(--text-4)" aria-hidden="true">🌤️</div>
				<h3>{t(locale, 'observer_tip_weather_title')}</h3>
				<p>{t(locale, 'observer_tip_weather_desc')}</p>
			</div>
			<div class="feature-card">
				<div style="font-size: var(--text-4)" aria-hidden="true">🌑</div>
				<h3>{t(locale, 'observer_tip_moon_title')}</h3>
				<p>{t(locale, 'observer_tip_moon_desc')}</p>
			</div>
			<div class="feature-card">
				<div style="font-size: var(--text-4)" aria-hidden="true">📱</div>
				<h3>{t(locale, 'observer_tip_apps_title')}</h3>
				<p>{t(locale, 'observer_tip_apps_desc')}</p>
			</div>
			<div class="feature-card">
				<div style="font-size: var(--text-4)" aria-hidden="true">👥</div>
				<h3>{t(locale, 'observer_tip_group_title')}</h3>
				<p>{t(locale, 'observer_tip_group_desc')}</p>
			</div>
		</div>
	</div>
</section>

<section class="section" id="globe-island" style="background: var(--surface-sunk)">
	<div class="container">
		<div class="section-header center">
			<h2>{t(locale, 'globe_title')}</h2>
			<p class="section-subtitle">{t(locale, 'globe_p1')}</p>
		</div>
		<p class="prose center">{t(locale, 'globe_p2')}</p>
		<div style="margin-top: var(--space-4)">
			<SiriusGlobe {locale} />
		</div>
		<p class="center" style="color: var(--ink-soft); font-size: var(--text-0)">
			{t(locale, 'globe_controls_hint')}
		</p>
	</div>
</section>
