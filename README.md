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

- **[11ty (Eleventy)](https://www.11ty.dev/)** — génération du site statique, contenu et navigation en HTML/CSS, fonctionnel sans JavaScript
- **[Svelte 5](https://svelte.dev/)** en îlots — hydratation ciblée pour les 3 seuls widgets interactifs (calculateur de prédictions, carte d'observation, globe de la vague planétaire), via `@11ty/eleventy-plugin-vite`
- **[Paraglide (inlang)](https://paraglidejs.com/)** — i18n compilée, FR (défaut) / EN / Kreyòl Ayisyen, routée par URL (`/`, `/en/`, `/ht/`)
- **CSS natif** — tokens `oklch()`, cascade `@layer`, container queries, aucun framework CSS ni préprocesseur
- Polices auto-hébergées (Fraunces, Atkinson Hyperlegible), zéro dépendance à Google Fonts

Conforme à la doctrine UI/UX OKI (voir document de référence interne) : navigation à 5 entrées, cibles tactiles ≥ 48 px, contraste AA/AAA, `prefers-reduced-motion` respecté, budget JS minimal.

## 📦 Installation

```bash
npm install
npm run dev      # serveur de développement sur http://localhost:8080
npm run build    # build de production dans _site/
npm run preview  # prévisualiser le build de production
```

## 🗂️ Structure

```
src/
├── _data/            # données globales (sites d'observation, navigation)
├── _includes/         # layout de base, partiels (nav, footer)
├── styles/            # design system CSS (tokens, reset, base, layouts, composants)
├── islands/           # composants Svelte 5 hydratés côté client (prédictions, carte, globe)
├── paraglide/         # messages i18n compilés (généré, ignoré par git)
├── index.njk          # accueil
├── sirius-science.njk # astronomie + méthode de calcul
├── culture-savoirs.njk# héritage culturel + savoir dogon
├── observer.njk        # calculateur, carte, guide d'observation
└── associations.njk    # associations qui fêtent le Wep Ronpet
messages/               # catalogues de traduction (fr/en/ht), source pour Paraglide
project.inlang/         # configuration du projet i18n
```

## 👥 Crédits

Projet réalisé avec ❤️ par [cyber-mawonaj](https://github.com/cyber-mawonaj) et [OKI](https://o-k-i.net).

## 📜 Licence

MIT — voir [LICENSE](LICENSE).

---

*"Les étoiles sont les ancêtres qui veillent sur nous" — proverbe africain*
