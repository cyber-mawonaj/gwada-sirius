<script lang="ts">
	import Seo from '$lib/components/Seo.svelte';
	import Associations from '$lib/components/pages/Associations.svelte';
	import { t, type Locale } from '$lib/i18n';

	const locale: Locale = 'fr';
</script>

<Seo
	{locale}
	title={t(locale, 'meta_associations_title')}
	description={t(locale, 'meta_associations_description')}
	path="/associations/"
/>

<Associations {locale} />
