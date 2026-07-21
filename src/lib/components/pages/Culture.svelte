<script lang="ts">
	import { t, type Locale } from '$lib/i18n';

	let { locale }: { locale: Locale } = $props();
</script>

<section class="section">
	<div class="container">
		<div class="section-header center">
			<p class="section-eyebrow">Sirius Gwada</p>
			<h1>{t(locale, 'culture_title')}</h1>
			<p class="pattern-strip adinkra" aria-hidden="true" style="margin-inline:auto"></p>
			<p class="section-subtitle">{t(locale, 'culture_subtitle')}</p>
		</div>

		<div class="grid-auto">
			<div class="feature-card">
				<div style="font-size: var(--text-4)" aria-hidden="true">🏺</div>
				<h3>{t(locale, 'culture_egypt_title')}</h3>
				<p>{t(locale, 'culture_egypt_desc')}</p>
			</div>
			<div class="feature-card">
				<div style="font-size: var(--text-4)" aria-hidden="true">🌍</div>
				<h3>{t(locale, 'culture_dogon_title')}</h3>
				<p>{t(locale, 'culture_dogon_desc')}</p>
			</div>
			<div class="feature-card">
				<div style="font-size: var(--text-4)" aria-hidden="true">⛵</div>
				<h3>{t(locale, 'culture_caribbean_title')}</h3>
				<p>{t(locale, 'culture_caribbean_desc')}</p>
			</div>
		</div>

		<h2 class="center" style="margin-top: var(--space-7)">{t(locale, 'culture_timeline_title')}</h2>
		<div class="timeline-v" style="margin-top: var(--space-5)">
			<div class="timeline-v-item">
				<p class="timeline-v-date">{t(locale, 'culture_timeline_1_date')}</p>
				<h4>{t(locale, 'culture_timeline_1_title')}</h4>
				<p>{t(locale, 'culture_timeline_1_desc')}</p>
			</div>
			<div class="timeline-v-item">
				<p class="timeline-v-date">{t(locale, 'culture_timeline_2_date')}</p>
				<h4>{t(locale, 'culture_timeline_2_title')}</h4>
				<p>{t(locale, 'culture_timeline_2_desc')}</p>
			</div>
			<div class="timeline-v-item">
				<p class="timeline-v-date">{t(locale, 'culture_timeline_3_date')}</p>
				<h4>{t(locale, 'culture_timeline_3_title')}</h4>
				<p>{t(locale, 'culture_timeline_3_desc')}</p>
			</div>
			<div class="timeline-v-item">
				<p class="timeline-v-date">{t(locale, 'culture_timeline_4_date')}</p>
				<h4>{t(locale, 'culture_timeline_4_title')}</h4>
				<p>{t(locale, 'culture_timeline_4_desc')}</p>
			</div>
		</div>
	</div>
</section>

<section class="section" style="background: var(--surface-sunk)">
	<div class="container">
		<div class="section-header center">
			<h2>{t(locale, 'dogon_title')}</h2>
			<p class="pattern-strip kente" aria-hidden="true" style="margin-inline:auto"></p>
			<p class="section-subtitle">{t(locale, 'dogon_intro')}</p>
		</div>

		<fieldset class="tabs">
			<legend class="visually-hidden">{t(locale, 'dogon_title')}</legend>

			<input type="radio" name="dogon-tab" id="dogon-tab-cosmogony" class="tab-input" checked />
			<input type="radio" name="dogon-tab" id="dogon-tab-system" class="tab-input" />
			<input type="radio" name="dogon-tab" id="dogon-tab-astronomy" class="tab-input" />
			<input type="radio" name="dogon-tab" id="dogon-tab-heritage" class="tab-input" />

			<div class="tab-list" role="tablist">
				<label class="tab-label" for="dogon-tab-cosmogony">{t(locale, 'dogon_tab_cosmogony')}</label>
				<label class="tab-label" for="dogon-tab-system">{t(locale, 'dogon_tab_system')}</label>
				<label class="tab-label" for="dogon-tab-astronomy">{t(locale, 'dogon_tab_astronomy')}</label>
				<label class="tab-label" for="dogon-tab-heritage">{t(locale, 'dogon_tab_heritage')}</label>
			</div>

			<div class="tab-panels">
				<div class="tab-panel prose center">
					<p>{t(locale, 'dogon_cosmogony_p1')}</p>
					<p>{t(locale, 'dogon_cosmogony_p2')}</p>
					<div class="card">
						<h3>{t(locale, 'dogon_cosmogony_nommo_title')}</h3>
						<p>{t(locale, 'dogon_cosmogony_nommo_desc')}</p>
					</div>
				</div>

				<div class="tab-panel">
					<div class="grid-auto">
						<div class="info-card">
							<h3>{t(locale, 'dogon_system_sigutolo_title')}</h3>
							<p>{t(locale, 'dogon_system_sigutolo_desc')}</p>
						</div>
						<div class="info-card">
							<h3>{t(locale, 'dogon_system_potolo_title')}</h3>
							<p>{t(locale, 'dogon_system_potolo_desc')}</p>
						</div>
						<div class="info-card">
							<h3>{t(locale, 'dogon_system_emmeya_title')}</h3>
							<p>{t(locale, 'dogon_system_emmeya_desc')}</p>
						</div>
					</div>
					<div class="card prose center" style="margin-top: var(--space-4)">
						<h3>{t(locale, 'dogon_mystery_title')}</h3>
						<div class="grid-auto">
							<div>
								<h4>{t(locale, 'dogon_mystery_theory1_title')}</h4>
								<p>{t(locale, 'dogon_mystery_theory1_desc')}</p>
							</div>
							<div>
								<h4>{t(locale, 'dogon_mystery_theory2_title')}</h4>
								<p>{t(locale, 'dogon_mystery_theory2_desc')}</p>
							</div>
							<div>
								<h4>{t(locale, 'dogon_mystery_theory3_title')}</h4>
								<p>{t(locale, 'dogon_mystery_theory3_desc')}</p>
							</div>
						</div>
					</div>
					<div class="card prose center" style="margin-top: var(--space-4)">
						<h3>{t(locale, 'dogon_calc_example_title')}</h3>
						<p>{t(locale, 'dogon_calc_example_text')}</p>
					</div>
				</div>

				<div class="tab-panel">
					<div class="grid-auto">
						<div class="info-card">
							<h3>{t(locale, 'dogon_astronomy_geometry_title')}</h3>
							<p>{t(locale, 'dogon_astronomy_geometry_desc')}</p>
						</div>
						<div class="info-card">
							<h3>{t(locale, 'dogon_astronomy_calendar_title')}</h3>
							<p>{t(locale, 'dogon_astronomy_calendar_desc')}</p>
						</div>
						<div class="info-card">
							<h3>{t(locale, 'dogon_astronomy_planets_title')}</h3>
							<p>{t(locale, 'dogon_astronomy_planets_desc')}</p>
						</div>
						<div class="info-card">
							<h3>{t(locale, 'dogon_astronomy_universe_title')}</h3>
							<p>{t(locale, 'dogon_astronomy_universe_desc')}</p>
						</div>
					</div>
				</div>

				<div class="tab-panel">
					<div class="timeline-v">
						<div class="timeline-v-item">
							<p class="timeline-v-date">{t(locale, 'dogon_heritage_1_date')}</p>
							<p>{t(locale, 'dogon_heritage_1_desc')}</p>
						</div>
						<div class="timeline-v-item">
							<p class="timeline-v-date">{t(locale, 'dogon_heritage_2_date')}</p>
							<p>{t(locale, 'dogon_heritage_2_desc')}</p>
						</div>
						<div class="timeline-v-item">
							<p class="timeline-v-date">{t(locale, 'dogon_heritage_3_date')}</p>
							<p>{t(locale, 'dogon_heritage_3_desc')}</p>
						</div>
						<div class="timeline-v-item">
							<p class="timeline-v-date">{t(locale, 'dogon_heritage_4_date')}</p>
							<p>{t(locale, 'dogon_heritage_4_desc')}</p>
						</div>
					</div>

					<div class="card prose center" style="margin-top: var(--space-5)">
						<h3>{t(locale, 'dogon_heritage_diaspora_title')}</h3>
						<p>{t(locale, 'dogon_heritage_diaspora_desc')}</p>
						<div class="grid-auto" style="margin-top: var(--space-3); text-align: left">
							<p>🇭🇹 {t(locale, 'dogon_heritage_diaspora_haiti')}</p>
							<p>🇬🇵 {t(locale, 'dogon_heritage_diaspora_guadeloupe')}</p>
							<p>🇲🇶 {t(locale, 'dogon_heritage_diaspora_martinique')}</p>
							<p>🇯🇲 {t(locale, 'dogon_heritage_diaspora_jamaica')}</p>
						</div>
					</div>
				</div>
			</div>
		</fieldset>
	</div>
</section>
