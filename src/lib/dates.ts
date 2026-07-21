import type { Locale } from '$lib/i18n';

/**
 * Formate une date ISO `YYYY-MM-DD` pour l'affichage.
 *
 * Piège documenté (NOTES_PROJET §3) : `new Date("2026-07-22")` est parsé en
 * UTC minuit, ce qui peut reculer d'un jour une fois formaté dans un fuseau
 * derrière UTC (Guadeloupe, UTC-4). On construit donc la date à partir de
 * ses composants, en heure locale — logique reprise à l'identique du filtre
 * `formatDate` de l'ancien eleventy.config.js.
 */
export function formatDate(
	isoDate: string,
	locale: Locale,
	options: Intl.DateTimeFormatOptions = {}
): string {
	const [year, month, day] = isoDate.split('-').map(Number);
	return new Date(year, month - 1, day).toLocaleDateString(locale === 'ht' ? 'fr' : locale, {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
		...options
	});
}
