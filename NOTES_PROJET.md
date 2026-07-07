# Notes sur le Projet Sirius en Guadeloupe

## 📋 Vue d'ensemble

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
