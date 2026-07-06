# Changelog

## [2.0.0] - 2026-07-06

### 🏗️ Refonte complète : Vite/Svelte 4 SPA → 11ty + îlots Svelte 5

- **Migration du build** : remplacement de la SPA Vite par un site 11ty statique ; Svelte 5 n'hydrate plus que 3 widgets réellement interactifs (calculateur de prédictions, carte d'observation, globe de la vague planétaire). Tout le reste (Science, Culture, Dogon, Observatoire, Associations, navigation) est du HTML/CSS pur, fonctionnel sans JavaScript.
- **Navigation** : passage de 7 entrées (dont Dogon et Calculs absents du menu) à 5 entrées consolidées (Accueil, Sirius & Science, Culture & Savoirs, Observer, Associations), conformément à la loi de Hick-Hyman.
- **i18n** : remplacement du store Svelte custom par Paraglide (inlang), i18n compilée et routée par URL (`/`, `/en/`, `/ht/`), avec repli automatique vers le français pour les traductions manquantes.
- **Design system** : nouveaux tokens CSS en `oklch()` (contraste AA/AAA calculé, pas décoré après coup), cascade `@layer` explicite, `light-dark()` pour un vrai mode clair/sombre (le site n'avait qu'un thème sombre fixe), motifs panafricains (kente/bogolan/adinkra) resserrés en accents ponctuels plutôt qu'en texture de fond généralisée.
- **Typographie** : polices auto-hébergées (Fraunces, Atkinson Hyperlegible) en remplacement de Google Fonts.
- **Performance** : suppression totale d'animejs (toutes les animations d'entrée/interaction sont maintenant en CSS ou omises) ; onglets (Science, Dogon) réimplémentés en CSS pur (`input[type=radio]`), zéro JS.
- **Données astronomiques** : consolidation sur un unique jeu de 7 sites d'observation (l'ancien composant Predictions utilisait des données différentes, moins précises, du jeu de données `predictions.js` jamais branché) ; méthodologie de calcul explicitée et sourcée (Jean Meeus, Jeffrey L. Hunt) ; prédictions étendues jusqu'en 2032 ; date figée "22 juillet 2025" remplacée par un calcul dynamique du prochain lever au build.
- **Nettoyage** : suppression de 3 variantes de globe mortes (`Globe.svelte`, `GlobeThreeJS.svelte`, `GlobeOpenGlobus.svelte.bak`), d'un fichier vide (`og.umd.js`) et du prototype HTML pré-Svelte jamais référencé.

## [1.5.0] - 2024-01-07

### 🚀 Nouvelles fonctionnalités
- **Intégration d'AnimeJS** pour des animations fluides et performantes
- **Loader animé** au chargement de l'application avec barre de progression
- **Animations avancées** :
  - Hero : Entrée progressive des éléments, étoiles filantes, patterns africains animés
  - Navigation : Transitions fluides, menu mobile amélioré
  - Prédictions : Calculateur avec animations de sélection et résultats
  - Globe : Vague planétaire animée avec particules et progression temporelle
- **Effets visuels** :
  - Effet parallaxe amélioré sur le ciel étoilé
  - Hover animations sur les boutons avec effet élastique
  - Shimmer effect sur la timeline
  - Pulsation des marqueurs actifs sur le globe

### 🎨 Améliorations design
- **Mobile-first** : Toutes les animations optimisées pour mobile
- **Performance** : Animations GPU-accelerated avec transform et opacity
- **Interactivité** : Feedback visuel immédiat sur toutes les interactions
- **Accessibilité** : Respect de prefers-reduced-motion

### 🛠️ Technique
- AnimeJS 3.2.1 intégré
- Timeline orchestration pour les animations complexes
- Optimisation des animations Canvas
- Lazy loading des animations lourdes

## [1.0.0] - 2024-01-07

### Version initiale
- Application Svelte avec design panafricain/caribéen
- Calculateur de prédictions pour 7 sites en Guadeloupe
- Globe interactif avec GeoJSON
- Support multilingue (FR, EN, HT)
- Sections : Science, Culture, Dogons, Observatoire
- Déploiement GitHub Pages