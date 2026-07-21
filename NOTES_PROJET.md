# Notes sur le Projet Sirius en Guadeloupe

## 📋 Vue d'ensemble

**Version 3 (branche `svelte`)** : migration complète 11ty → **SvelteKit 2 + Svelte 5 + TypeScript**, pré-rendu statique intégral (`adapter-static`). Les îlots deviennent des composants natifs avec fallback SSR (fin du montage manuel par `mount.js`/IntersectionObserver). L'i18n Paraglide est remplacée par un routeur maison (`src/lib/i18n/index.ts`) qui consomme **les mêmes catalogues** `src/lib/i18n/{fr,en,ht}.json` (format inlang conservé, éditables avec les outils inlang) : FR à `/`, EN `/en/`, HT `/ht/`, fallback fr automatique. Le sous-répertoire GitHub Pages est géré nativement par `paths.base: '/gwada-sirius'` (les contournements v2 — filtre `withBase`, plugin `restorePassthroughCopy`, alias `/src` — ont disparu). La v2 (11ty) est décrite ci-dessous à titre historique.

**Ce qui change en v3 par rapport aux notes v2 :**
- §1 i18n : plus de compilation Paraglide — les catalogues JSON sont importés tels quels, `t(locale, key, vars?)` gère le fallback ht→fr.
- §2 alias `/src` : sans objet (plus de Vite-sur-sortie).
- §6 BASE_PATH : remplacé par `paths.base` en dur dans `svelte.config.js` ; liens internes via `resolve()` de `$app/paths`, assets via `%sveltekit.assets%`/`asset()`.
- Polices : déclarées une seule fois (`static/fonts/fonts.css`) — la duplication passthrough/bundle de la v2 est corrigée.
- `aria-current` : bug corrigé (comparaison pathname réel, voir `Nav.svelte`).
- Le piège UTC-4 (§3) reste d'actualité : il vit dans `src/lib/dates.ts` et `SiriusPredictions.svelte` — parse par composants, jamais `new Date("YYYY-MM-DD")`.
- §5 cache : la discipline d'incrémentation de `CACHE_NAME` s'applique à `src/service-worker.js` (actuellement `gwada-sirius-v3`).
- SEO ajouté en v3 : `Seo.svelte` (canonical, hreflang ×3, OG, Twitter), `static/robots.txt`, `static/sitemap.xml` (15 URLs).

---

## Historique — v2 (11ty)

Refonte complète (v2) : passage d'une SPA Vite+Svelte 4 à un site **11ty** statique avec **Svelte 5 en îlots**, un design system CSS natif (oklch, `@layer`, container queries) et une i18n compilée (Paraglide/inlang). Conforme à la doctrine UI/UX OKI : nav à 5 entrées, fonctionne sans JavaScript pour tout le contenu éditorial, budget JS minimal.

## 🏗️ Architecture

- **Contenu** : pages Nunjucks (`src/*.njk`), chacune paginée sur les 3 langues (`fr`/`en`/`ht`) via `pagination.data: locales`.
- **Données** : `src/_data/sites.js` (7 sites d'observation, dates interpolées Jean Meeus / Jeffrey L. Hunt), `src/_data/nav.js`, `src/_data/nextRising.js` (calculé au build).
- **i18n** : catalogues `messages/{fr,en,ht}.json`, compilés par `@inlang/paraglide-js` en `src/paraglide/` avant chaque build (`npm run messages`). `ht` retombe automatiquement sur `fr` pour les clés non traduites (contenu long, cf. portée d'origine).
- **Îlots Svelte 5** (3 seulement, le reste est HTML/CSS pur) :
  - `PredictionsCalculator` — hydratation immédiate, améliore le tableau statique des 7 sites
  - `ObservationMap` — vraie carte Leaflet + fond OSM, marqueurs/popups pour les 7 sites, hydratation différée (IntersectionObserver). Leaflet est utilisé directement (pas de wrapper Svelte type Sveaflet/svelte-openlayers — évalués mais écartés : le premier cible une prérelease de Svelte 5 et vient d'être publié, le second embarque OpenLayers, bien plus lourd que nécessaire pour 7 marqueurs)
  - `SiriusGlobe` — vague planétaire du lever héliaque (13 villes), carte canvas schématique (continents simplifiés), hydratation différée
- **Onglets** (Science, Dogon) : 100 % CSS (`input[type=radio]` + `label`), zéro JS.
- **Build** : `@11ty/eleventy-plugin-vite` fait passer la sortie 11ty par Vite (bundling CSS/JS, compilation Svelte). Un plugin maison recopie les assets passthrough après le build Vite (voir commentaire dans `eleventy.config.js` — `emptyOutDir` de Vite les efface sinon).

## ⚠️ Points d'attention connus

1. **`<link>` et `vite-ignore`** : Vite traite tout `<link href>` comme une référence d'asset à résoudre, y compris `rel="alternate"`/`rel="icon"`/`rel="preload"`. Un `href="/"` ou `href="/en/"` (URL de répertoire) fait planter le build (`EISDIR`, cf. issue amont). Toujours ajouter `vite-ignore` sur ces `<link>` de métadonnées dans `layouts/base.njk`.
2. **Alias `/src`** : `eleventy-plugin-vite` fait tourner Vite avec pour racine une copie du dossier de **sortie** (`_site`), pas la racine du projet. Toute référence absolue à un fichier source (`/src/styles/app.css`, `/src/islands/.../mount.js`) nécessite l'alias `resolve.alias["/src"]` défini dans `eleventy.config.js`.
3. **Dates ISO sans heure** : `new Date("2026-07-22")` est interprété en UTC ; formaté en heure locale Guadeloupe (UTC-4), ça peut reculer d'un jour. Toujours parser les composants (`year, month, day`) et construire la date en local — voir le filtre `formatDate` et `PredictionsCalculator.svelte`.
4. **Slinkity est abandonné** (son créateur travaille sur Astro) : ne pas l'utiliser pour l'intégration 11ty+Svelte, `eleventy-plugin-vite` (officiel) est la voie robuste.
5. **Service worker et cache obsolète** : la stratégie stale-while-revalidate de `public/sw.js` peut servir une version périmée des îlots (vécu pendant le debug de la carte : un visiteur déjà passé sur le site voyait l'ancien composant malgré un déploiement). **Toujours incrémenter `CACHE_NAME` dans `sw.js`** quand un îlot ou un asset critique change, sinon les visiteurs récurrents restent bloqués sur l'ancienne version jusqu'à revalidation.
6. **GitHub Pages = sous-répertoire, pas la racine du domaine** : `https://cyber-mawonaj.github.io/gwada-sirius/` sert le site sous `/gwada-sirius/`, pas `/`. Tous les chemins absolus (`/assets/...`, `/favicon.svg`, liens de nav, `sw.js`) doivent donc être préfixés. Géré via la variable d'env `BASE_PATH` (vide en local/domaine perso, `/gwada-sirius` en CI — voir `.github/workflows/deploy.yml`) : passée à `viteOptions.base` pour les assets bundlés par Vite, et au filtre maison `withBase`/`localeHref` pour les liens et fichiers passthrough. Le manifest PWA utilise des chemins **relatifs** (`"start_url": "."`) pour ne pas avoir besoin d'être templaté. Pour retester ce scénario en local : `BASE_PATH=/gwada-sirius npm run build`, puis servir `_site` depuis un dossier `gwada-sirius/` à la racine d'un serveur statique.

## 🔄 Améliorations possibles

- Traduire le contenu long en Kreyòl (actuellement chrome/labels uniquement, contenu de fond en français)
- Mettre à jour chaque année les informations d'événements associatifs (`associations.njk`, données à vérifier auprès des organisateurs)
- Le chunk Leaflet (~44 Ko gzip) n'est chargé qu'au scroll sur la carte (`observer/`), mais reste le plus lourd du site ; envisager des tuiles vectorielles/un fournisseur plus léger si le budget JS devient un problème

## 📦 Build pour production

```bash
npm run build
# Sortie dans _site/
```

## 🌐 Déploiement

GitHub Pages via `.github/workflows/deploy.yml` (upload de `_site/`), déclenché sur push vers `main`.
