<script lang="ts">
	import Home from '$lib/components/pages/Home.svelte';
	import Seo from '$lib/components/Seo.svelte';
	import { t, type Locale } from '$lib/i18n';

	const locale: Locale = 'ht';
</script>

<Seo
	{locale}
	title="{t(locale, 'hero_title1')} {t(locale, 'hero_title2')} — {t(locale, 'meta_title')}"
	description={t(locale, 'meta_description')}
	path="/"
/>

<Home {locale} />
