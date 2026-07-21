<script lang="ts">
	import { resolve } from '$app/paths';
	import nextRising from '$lib/data/nextRising.js';
	import waveCities from '$lib/data/waveCities.js';
	import { formatDate } from '$lib/dates';
	import { localizedPath, t, type Locale } from '$lib/i18n';

	/**
	 * Page d'accueil — portage de legacy/src/index.njk. Factorisée ici ;
	 * les routes `/`, `/en/` et `/ht/` ne sont que des coquilles qui
	 * passent leur locale (et leurs métadonnées via <Seo>).
	 */
	interface Props {
		locale: Locale;
	}

	const { locale }: Props = $props();

	// Calculé au build (prerender) — logique identique à l'ancien site.
	const rising = nextRising();
</script>

<section class="hero">
	<div class="hero-orbits" aria-hidden="true">
		<div class="sun"></div>
		<div class="orbit" style="width:5rem;height:5rem;animation-duration:6s"><span></span></div>
		<div class="orbit" style="width:8rem;height:8rem;animation-duration:10s"><span></span></div>
		<div class="orbit" style="width:11rem;height:11rem;animation-duration:14s"><span></span></div>
		<div class="orbit" style="width:14rem;height:14rem;animation-duration:18s"><span></span></div>
		<div class="orbit sirius" style="width:18rem;height:18rem;animation-duration:26s">
			<span></span>
		</div>
	</div>

	<div class="container center hero-content">
		<p class="section-eyebrow">{t(locale, 'hero_eyebrow')}</p>
		<h1 class="hero-title">
			<span>{t(locale, 'hero_title1')}</span>
			<span class="accent">{t(locale, 'hero_title2')}</span>
		</h1>
		<p class="hero-subtitle">{t(locale, 'hero_subtitle')}</p>
		<p class="hero-description">{t(locale, 'hero_description')}</p>
		<p class="hero-date">
			{t(locale, 'hero_date_label')}
			<strong>{formatDate(rising.date, locale)} · {rising.time}</strong>
		</p>
		<div class="cluster hero-cta">
			<a class="btn btn-primary comet-ring" href={resolve(localizedPath(locale, '/observer/'))}
				>{t(locale, 'hero_cta_predictions')}</a
			>
			<a class="btn btn-outline" href={resolve(localizedPath(locale, '/sirius-science/'))}
				>{t(locale, 'hero_cta_learn')}</a
			>
		</div>
	</div>
</section>

<section class="section" id="intro">
	<div class="container">
		<div class="section-header center">
			<h2>{t(locale, 'home_intro_title')}</h2>
			<p class="pattern-strip kente" aria-hidden="true" style="margin-inline:auto"></p>
			<p class="section-subtitle">{t(locale, 'home_intro_subtitle')}</p>
		</div>

		<div class="prose center stack" style="--stack-space: var(--space-3)">
			<!-- home_intro_p1 contient du <strong> (| safe dans le legacy) -->
			<p>{@html t(locale, 'home_intro_p1')}</p>
			<p>{t(locale, 'home_intro_p2')}</p>
			<p>{t(locale, 'home_intro_p3')}</p>
		</div>

		<div class="grid-auto" style="margin-top: var(--space-6)">
			<div class="feature-card reveal">
				<h3>{t(locale, 'feature_brightest_title')}</h3>
				<p>{t(locale, 'feature_brightest_desc')}</p>
			</div>
			<div class="feature-card reveal">
				<h3>{t(locale, 'feature_rising_title')}</h3>
				<p>{t(locale, 'feature_rising_desc')}</p>
			</div>
			<div class="feature-card reveal">
				<h3>{t(locale, 'feature_heritage_title')}</h3>
				<p>{t(locale, 'feature_heritage_desc')}</p>
			</div>
		</div>
	</div>
</section>

<section class="section" style="background: var(--surface-sunk)">
	<div class="container">
		<div class="section-header center">
			<h2>{t(locale, 'wave_showcase_title')}</h2>
			<p class="section-subtitle">{t(locale, 'wave_showcase_subtitle')}</p>
		</div>

		<ul class="wave-badges">
			{#each waveCities as city, i (city.name)}
				<li class="wave-badge wave-badge-{i % 3}">
					<span class="wave-badge-name">{city.name}</span>
					<span class="wave-badge-date">{city.date}</span>
				</li>
			{/each}
		</ul>

		<p class="center" style="margin-top: var(--space-5)">
			<a class="btn btn-outline" href={resolve(localizedPath(locale, '/observer/'))}
				>{t(locale, 'wave_showcase_cta')}</a
			>
		</p>
	</div>
</section>

<style>
	/* Reveal d'entrée au scroll, CSS pur : sans effet si animation-timeline
	   n'est pas supporté, désactivé en reduced-motion. */
	@supports (animation-timeline: view()) {
		@media (prefers-reduced-motion: no-preference) {
			.reveal {
				animation: reveal-rise linear both;
				animation-timeline: view();
				animation-range: entry 0% entry 60%;
			}
		}
	}

	@keyframes reveal-rise {
		from {
			opacity: 0;
			transform: translateY(1.5rem);
		}
	}
</style>
