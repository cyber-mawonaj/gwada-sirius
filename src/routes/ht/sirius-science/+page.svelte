<script lang="ts">
	import Seo from '$lib/components/Seo.svelte';
	import Science from '$lib/components/pages/Science.svelte';
	import { t, type Locale } from '$lib/i18n';

	const locale: Locale = 'ht';
</script>

<Seo
	{locale}
	title={t(locale, 'meta_science_title')}
	description={t(locale, 'meta_science_description')}
	path="/sirius-science/"
/>

<Science {locale} />
