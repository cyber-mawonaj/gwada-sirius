<script lang="ts">
	import { t, type Locale } from '$lib/i18n';

	let { locale }: { locale: Locale } = $props();
</script>

<section class="section">
	<div class="container">
		<div class="section-header center">
			<p class="section-eyebrow">Sirius Gwada</p>
			<h1>{t(locale, 'science_title')}</h1>
			<p class="pattern-strip bogolan" aria-hidden="true" style="margin-inline:auto"></p>
			<p class="section-subtitle">{t(locale, 'science_subtitle')}</p>
		</div>

		<fieldset class="tabs">
			<legend class="visually-hidden">{t(locale, 'science_title')}</legend>

			<input type="radio" name="science-tab" id="tab-mechanics" class="tab-input" checked />
			<input type="radio" name="science-tab" id="tab-arcus" class="tab-input" />
			<input type="radio" name="science-tab" id="tab-factors" class="tab-input" />
			<input type="radio" name="science-tab" id="tab-calc" class="tab-input" />

			<div class="tab-list" role="tablist">
				<label class="tab-label" for="tab-mechanics">{t(locale, 'science_tab_mechanics')}</label>
				<label class="tab-label" for="tab-arcus">{t(locale, 'science_tab_arcus')}</label>
				<label class="tab-label" for="tab-factors">{t(locale, 'science_tab_factors')}</label>
				<label class="tab-label" for="tab-calc">{t(locale, 'science_tab_calc')}</label>
			</div>

			<div class="tab-panels">
				<div class="tab-panel prose center">
					<h2>{t(locale, 'science_mechanics_title')}</h2>
					<p>{t(locale, 'science_mechanics_p1')}</p>
					<div class="diagram-orbit card" aria-hidden="true">
						<div class="ring"></div>
						<div class="body sun">☀️<span>{t(locale, 'science_diagram_sun')}</span></div>
						<div class="body earth">🌍<span>{t(locale, 'science_diagram_earth')}</span></div>
						<div class="body sirius">⭐<span>{t(locale, 'science_diagram_sirius')}</span></div>
					</div>
					<p>{t(locale, 'science_mechanics_p2')}</p>
				</div>

				<div class="tab-panel prose center">
					<h2>{t(locale, 'science_arcus_title')}</h2>
					<p>{t(locale, 'science_arcus_p1')}</p>
					<div class="diagram-arcus card" aria-hidden="true">
						<span class="horizon-label">{t(locale, 'science_arcus_horizon_label')}</span>
						<div class="angle"></div>
						<span class="angle-label">9-10°</span>
						<span class="sirius-mark">⭐</span>
						<span class="sun-mark">☀️</span>
					</div>
					<p>{t(locale, 'science_arcus_p2')}</p>
				</div>

				<div class="tab-panel">
					<div class="grid-auto">
						<div class="info-card">
							<h3>{t(locale, 'science_factor_magnitude_title')}</h3>
							<p>{t(locale, 'science_factor_magnitude_desc')}</p>
						</div>
						<div class="info-card">
							<h3>{t(locale, 'science_factor_latitude_title')}</h3>
							<p>{t(locale, 'science_factor_latitude_desc')}</p>
						</div>
						<div class="info-card">
							<h3>{t(locale, 'science_factor_atmosphere_title')}</h3>
							<p>{t(locale, 'science_factor_atmosphere_desc')}</p>
						</div>
					</div>
				</div>

				<div class="tab-panel prose center">
					<h2>{t(locale, 'science_calc_title')}</h2>

					<div class="card">
						<h3>{t(locale, 'science_calc_formula_label')}</h3>
						<p style="font-family: ui-monospace, monospace">{t(locale, 'science_calc_formula')}</p>
					</div>

					<div class="card" style="margin-top: var(--space-3)">
						<h3>{t(locale, 'science_calc_step1_title')}</h3>
						<p style="font-family: ui-monospace, monospace">{t(locale, 'science_calc_step1_value')}</p>
					</div>

					<div class="card" style="margin-top: var(--space-3)">
						<h3>{t(locale, 'science_calc_step2_title')}</h3>
						<p style="font-family: ui-monospace, monospace">
							{t(locale, 'science_calc_step2_ra')}<br />
							{t(locale, 'science_calc_step2_dec')}
						</p>
					</div>

					<div class="card" style="margin-top: var(--space-3)">
						<h3>{t(locale, 'science_calc_arcus_title')}</h3>
						<p>{t(locale, 'science_calc_arcus_desc')}</p>
					</div>

					<div class="card" style="margin-top: var(--space-3)">
						<h3>{t(locale, 'science_calc_sources_title')}</h3>
						<p>{t(locale, 'science_calc_sources_text')}</p>
					</div>
				</div>
			</div>
		</fieldset>
	</div>
</section>
