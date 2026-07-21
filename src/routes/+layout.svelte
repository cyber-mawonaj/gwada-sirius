<script lang="ts">
	import '$lib/styles/app.css';
	import { base } from '$app/paths';
	import { page } from '$app/state';
	import Footer from '$lib/components/Footer.svelte';
	import Nav from '$lib/components/Nav.svelte';
	import { localeFromPath, t } from '$lib/i18n';
	import type { Snippet } from 'svelte';

	interface Props {
		children: Snippet;
	}

	const { children }: Props = $props();

	// page.url.pathname inclut le base path (/gwada-sirius) : on le retire
	// avant de déduire la locale du premier segment.
	const locale = $derived(
		localeFromPath(
			page.url.pathname.startsWith(base)
				? page.url.pathname.slice(base.length) || '/'
				: page.url.pathname
		)
	);
</script>

<a class="skip-link" href="#main-content">{t(locale, 'skip_to_content')}</a>

<Nav {locale} />

<main id="main-content">
	{@render children()}
</main>

<Footer {locale} />
