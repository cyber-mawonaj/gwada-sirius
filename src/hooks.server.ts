import { base } from '$app/paths';
import type { Handle } from '@sveltejs/kit';

const LANGS = ['fr', 'en', 'ht'] as const;

export const handle: Handle = async ({ event, resolve }) => {
	// event.url.pathname inclut le base path (/gwada-sirius/…) — le retirer d'abord
	const stripped = event.url.pathname.slice(base.length);
	const segment = stripped.split('/').filter(Boolean)[0];
	const lang = LANGS.includes(segment as (typeof LANGS)[number]) ? segment : 'fr';
	return resolve(event, {
		transformPageChunk: ({ html }) => html.replaceAll('%lang%', lang)
	});
};
