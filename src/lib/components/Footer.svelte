<script lang="ts">
	import { resolve } from '$app/paths';
	import nav from '$lib/data/nav.js';
	import nextRising from '$lib/data/nextRising.js';
	import { formatDate } from '$lib/dates';
	import { localizedPath, t, type Locale } from '$lib/i18n';

	interface Props {
		locale: Locale;
	}

	const { locale }: Props = $props();

	// Calculé au build (prerender) — voir NOTES_PROJET §3 pour la logique dates.
	const rising = nextRising();
	const currentYear = new Date().getFullYear();
</script>

<footer class="site-footer">
	<div class="container footer-grid">
		<div class="footer-section">
			<h2>Sirius Gwada</h2>
			<p>{t(locale, 'footer_tagline')}</p>
		</div>

		<div class="footer-section">
			<h3>{t(locale, 'footer_links_title')}</h3>
			<ul>
				{#each nav as item (item.key)}
					<li>
						<a href={resolve(localizedPath(locale, item.path))}>{t(locale, item.key)}</a>
					</li>
				{/each}
			</ul>
		</div>

		<div class="footer-section">
			<h3>{t(locale, 'footer_resources_title')}</h3>
			<ul>
				<li>
					<a href="https://stellarium.org" target="_blank" rel="noopener"
						>{t(locale, 'footer_resources_stellarium')}</a
					>
				</li>
				<li>
					<a href={resolve(localizedPath(locale, '/observer/'))}
						>{t(locale, 'footer_resources_guide')}</a
					>
				</li>
				<li>
					<a href={resolve(localizedPath(locale, '/sirius-science/'))}
						>{t(locale, 'footer_resources_references')}</a
					>
				</li>
				<li>
					<a href="mailto:contact@o-k-i.net">{t(locale, 'footer_resources_contact')}</a>
				</li>
			</ul>
		</div>

		<div class="footer-section">
			<h3>{t(locale, 'footer_next_title')}</h3>
			<div class="countdown">
				<div class="countdown-item">
					<span class="countdown-value"
						>{formatDate(rising.date, locale, { day: 'numeric', month: 'long' })}</span
					>
					<span class="countdown-label">{rising.time} · {rising.year}</span>
				</div>
			</div>
		</div>
	</div>

	<div class="container footer-bottom">
		<p class="pattern-strip kente" aria-hidden="true"></p>
		<p>&copy; {currentYear} {t(locale, 'footer_rights')}</p>
		<p class="footer-credits">
			{t(locale, 'footer_copyright_prefix')}
			<a href="https://github.com/cyber-mawonaj" target="_blank" rel="noopener">cyber-mawonaj</a>
			{t(locale, 'footer_and')}
			<a href="https://o-k-i.net" target="_blank" rel="noopener">OKI</a>
		</p>
		<p class="footer-quote">{t(locale, 'footer_quote')}</p>
	</div>
</footer>

<style>
	/* Liens dans le corps de texte : distinguables autrement que par la couleur (WCAG) */
	.footer-credits a {
		text-decoration: underline;
		text-underline-offset: 0.15em;
	}
</style>
