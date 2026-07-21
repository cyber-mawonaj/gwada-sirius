<script lang="ts">
	import Seo from '$lib/components/Seo.svelte';
	import Culture from '$lib/components/pages/Culture.svelte';
	import { t, type Locale } from '$lib/i18n';

	const locale: Locale = 'fr';
</script>

<Seo
	{locale}
	title={t(locale, 'meta_culture_title')}
	description={t(locale, 'meta_culture_description')}
	path="/culture-savoirs/"
/>

<Culture {locale} />
