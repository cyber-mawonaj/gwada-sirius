#!/bin/bash

echo "🌟 Sirius en Guadeloupe - Démarrage du projet"
echo "============================================="

if [ ! -d "node_modules" ]; then
    echo "📦 Installation des dépendances..."
    npm install
fi

echo "🚀 Lancement du serveur de développement..."
echo "📱 L'application sera accessible sur http://localhost:5173/gwada-sirius/"
echo ""
echo "Commandes disponibles:"
echo "  - Ctrl+C : Arrêter le serveur"
echo "  - npm run build : Créer une version de production (SvelteKit -> build/)"
echo "  - npm run preview : Prévisualiser la version de production"
echo "  - npm run check : Vérifier types et accessibilité"
echo ""

npm run dev
