<script lang="ts">
	import Seo from '$lib/components/Seo.svelte';
	import Observer from '$lib/components/pages/Observer.svelte';
	import { t, type Locale } from '$lib/i18n';

	const locale: Locale = 'fr';
</script>

<Seo
	{locale}
	title={t(locale, 'meta_observer_title')}
	description={t(locale, 'meta_observer_description')}
	path="/observer/"
/>

<Observer {locale} />
