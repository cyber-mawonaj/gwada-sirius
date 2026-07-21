/**
 * i18n — catalogues Paraglide (format message-format JSON) consommés
 * directement, routage par dossiers : `/` = fr, `/en/`, `/ht/`.
 * Le créole (ht) couvre le chrome ; le contenu long retombe sur le fr
 * (fallback documenté dans NOTES_PROJET).
 */

import en from './en.json';
import fr from './fr.json';
import ht from './ht.json';
import type { Pathname } from '$app/types';

export const LOCALES = ['fr', 'en', 'ht'] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'fr';

type Messages = Record<string, string>;

const BUNDLES: Record<Locale, Messages> = {
	fr: fr as Messages,
	en: en as Messages,
	ht: ht as Messages
};

export function isLocale(value: string): value is Locale {
	return (LOCALES as readonly string[]).includes(value);
}

/** Locale déduite du chemin (`/en/...` → en, `/ht/...` → ht, sinon fr). */
export function localeFromPath(pathname: string): Locale {
	const segment = pathname.split('/').filter(Boolean)[0] ?? '';
	return isLocale(segment) ? segment : DEFAULT_LOCALE;
}

export function getMessages(locale: Locale): Messages {
	return BUNDLES[locale] ?? BUNDLES[DEFAULT_LOCALE];
}

/**
 * Traduit une clé : locale demandée, fallback fr, fallback clé.
 * Interpolation `{name}` via `vars`.
 */
export function t(locale: Locale, key: string, vars?: Record<string, string | number>): string {
	const raw = BUNDLES[locale]?.[key] ?? BUNDLES[DEFAULT_LOCALE][key] ?? key;
	if (!vars) return raw;
	return raw.replace(/\{(\w+)\}/g, (_, name) => String(vars[name] ?? `{${name}}`));
}

/** Préfixe d'URL d'une locale (`''` pour fr, `/en`, `/ht`). */
export function localePrefix(locale: Locale): string {
	return locale === DEFAULT_LOCALE ? '' : `/${locale}`;
}

/** Chemin localisé (`/observer/` + en → `/en/observer/`). */
export function localizedPath(locale: Locale, path: string): Pathname {
	const prefix = localePrefix(locale);
	return `${prefix}${path === '/' ? '/' : path}` as Pathname;
}

/** Chemin de la même page dans une autre locale. */
export function switchLocalePath(pathname: string, target: Locale): Pathname {
	const current = localeFromPath(pathname);
	const prefix = localePrefix(current);
	const bare = prefix ? pathname.slice(prefix.length) : pathname;
	return (localePrefix(target) + (bare || '/')) as Pathname;
}

/** Libellé natif d'une locale (lang_name_*). */
export function localeLabel(locale: Locale): string {
	return t(locale, `lang_name_${locale}`);
}
