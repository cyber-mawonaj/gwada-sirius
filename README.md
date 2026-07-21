# Sirius en Guadeloupe — Gwada-Sirius

Un site célébrant le lever héliaque de Sirius en Guadeloupe (Wep Ronpet), à la croisée de l'astronomie, de l'héritage égyptien et dogon, et de la culture caribéenne.

## 🌟 À propos

Ce site permet de :
- Calculer la date précise du lever héliaque pour 7 sites d'observation en Guadeloupe
- Explorer l'héritage culturel de Sirius (Égypte ancienne, Dogon du Mali, Caraïbes)
- Comprendre la science du phénomène (Arcus Visionis, méthode de calcul)
- Préparer une observation (guide pratique, équipement, carte des sites)
- Découvrir les associations qui célèbrent le Wep Ronpet

## 🚀 Stack technique

Version 3, reconstruite avec **[SvelteKit 2 + Svelte 5 (runes) + TypeScript](https://svelte.dev/)**, entièrement pré-rendue en statique (`adapter-static`). L'ancienne version 11ty est conservée sur la branche `main`.

- **SvelteKit statique** — tout le contenu éditorial fonctionne sans JavaScript ; les 3 widgets (calculateur, carte, globe) sont des composants Svelte natifs avec fallback SSR (plus d'îlots montés à la main)
- **i18n maison** — les catalogues au format Paraglide/inlang (`src/lib/i18n/{fr,en,ht}.json`, éditables avec les outils inlang) consommés par un routeur par dossiers : FR à `/`, EN sur `/en/`, Kreyòl sur `/ht/` (retombe sur le fr pour le contenu long)
- **CSS natif** — tokens `oklch()`, cascade `@layer`, container queries, aucun framework
- **Leaflet** en import dynamique côté client uniquement (tuiles OSM — exception documentée à la règle zéro-tiers)
- Polices auto-hébergées (Fraunces, Atkinson Hyperlegible), zéro Google Fonts
- **PWA** : manifest + service worker stale-while-revalidate (`src/service-worker.js`, incrémenter `CACHE_NAME` à chaque évolution)
- **SEO** : canonical, hreflang ×3 + x-default, Open Graph, Twitter Cards (`src/lib/components/Seo.svelte`), `robots.txt` + `sitemap.xml` (15 URLs)

Conforme à la doctrine UI/UX OKI : navigation à 5 entrées, cibles tactiles ≥ 48 px, contraste AA/AAA, `prefers-reduced-motion` respecté, budget JS minimal.

## 📦 Installation

```bash
npm install
npm run dev      # http://localhost:5173/gwada-sirius/
npm run build    # build de production dans build/
npm run preview  # prévisualiser le build
npm run check    # types + accessibilité (svelte-check)
```

## 🗂️ Structure

```
src/
├── lib/
│   ├── i18n/           # catalogues fr/en/ht (format Paraglide) + routeur localisé
│   ├── data/           # sites d'observation, villes de la vague, prochain lever, nav
│   ├── styles/         # design system CSS (tokens, base, layouts, composants, thème oki)
│   ├── components/     # Nav, Footer, Seo, pages/ (une par page), islands/ (3 widgets)
│   └── dates.ts        # formatage local des dates (piège UTC-4, voir NOTES_PROJET)
├── routes/             # / (fr), en/, ht/ — 5 pages par locale
└── service-worker.js   # PWA (stale-while-revalidate)
static/                 # favicon.svg, manifest.webmanifest, robots.txt, sitemap.xml, fonts/
```

Le déploiement GitHub Pages (sous-répertoire `/gwada-sirius/`) est géré par `paths.base` dans `svelte.config.js` + `.github/workflows/deploy.yml`.

## 👥 Crédits

Projet réalisé avec ❤️ par [cyber-mawonaj](https://github.com/cyber-mawonaj) et [OKI](https://o-k-i.net).

## 📜 Licence

MIT — voir [LICENSE](LICENSE).

---

*"Les étoiles sont les ancêtres qui veillent sur nous" — proverbe africain*
