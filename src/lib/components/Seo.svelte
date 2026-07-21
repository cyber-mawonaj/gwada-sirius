<script lang="ts">
	import { LOCALES, localizedPath, type Locale } from '$lib/i18n';

	/**
	 * Métadonnées SEO d'une page : title, description, canonical absolu,
	 * hreflang ×3 (+ x-default), Open Graph et Twitter summary.
	 * Pas d'og:image : le site n'a pas d'image de partage.
	 */
	interface Props {
		locale: Locale;
		title: string;
		description: string;
		/** Chemin de la page sans locale, ex. `/observer/`. */
		path: string;
	}

	const { locale, title, description, path }: Props = $props();

	// URL de production (GitHub Pages, inclut déjà le base path /gwada-sirius).
	const SITE = 'https://cyber-mawonaj.github.io/gwada-sirius';

	const OG_LOCALES: Record<Locale, string> = {
		fr: 'fr_FR',
		en: 'en_US',
		ht: 'ht_HT'
	};

	const canonical = $derived(SITE + localizedPath(locale, path));
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={canonical} />

	{#each LOCALES as loc (loc)}
		<link rel="alternate" hreflang={loc} href={SITE + localizedPath(loc, path)} />
	{/each}
	<link rel="alternate" hreflang="x-default" href={SITE + localizedPath('fr', path)} />

	<meta property="og:type" content="website" />
	<meta property="og:url" content={canonical} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:locale" content={OG_LOCALES[locale]} />
	<meta property="og:site_name" content="Sirius Gwada" />

	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
</svelte:head>
