<script lang="ts">
	import { base, resolve } from '$app/paths';
	import { page } from '$app/state';
	import nav from '$lib/data/nav.js';
	import {
		LOCALES,
		localizedPath,
		switchLocalePath,
		t,
		type Locale
	} from '$lib/i18n';

	interface Props {
		locale: Locale;
	}

	const { locale }: Props = $props();

	// Pathname courant sans le base path (/gwada-sirius), pour comparer aux
	// chemins de nav et basculer de locale.
	const pathname = $derived.by(() => {
		const p = page.url.pathname.startsWith(base)
			? page.url.pathname.slice(base.length)
			: page.url.pathname;
		return p || '/';
	});

	const normalize = (s: string) => s.replace(/\/+$/, '') || '/';

	// Correction du bug aria-current du legacy : l'ancien partial comparait
	// `pageKey` (« home ») avec `item.key` (« nav_home ») — toujours faux,
	// l'entrée active n'était jamais marquée. On compare ici le pathname
	// réel au chemin localisé de l'entrée.
	const isCurrent = (path: string) =>
		normalize(pathname) === normalize(localizedPath(locale, path));
</script>

<header class="nav">
	<div class="container nav-inner">
		<a class="nav-brand" href={resolve(localizedPath(locale, '/'))}>
			<span aria-hidden="true">☥</span> Sirius Gwada
		</a>

		<details class="nav-disclosure">
			<summary class="nav-toggle">
				<span class="visually-hidden">Menu</span>
				<span aria-hidden="true" class="nav-toggle-icon"></span>
			</summary>
			<ul class="nav-menu">
				{#each nav as item (item.key)}
					<li>
						<a
							href={resolve(localizedPath(locale, item.path))}
							aria-current={isCurrent(item.path) ? 'page' : undefined}
						>
							{t(locale, item.key)}
						</a>
					</li>
				{/each}
			</ul>
		</details>

		<ul class="nav-lang">
			{#each LOCALES as loc (loc)}
				<li>
					<a
						href={resolve(switchLocalePath(pathname, loc))}
						lang={loc}
						aria-current={loc === locale ? 'true' : undefined}
						class:active={loc === locale}
					>
						{t(locale, `lang_name_${loc}`)}
					</a>
				</li>
			{/each}
		</ul>
	</div>
</header>
