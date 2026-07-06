#!/bin/bash

echo "🌟 Sirius en Guadeloupe - Démarrage du projet"
echo "============================================="

if [ ! -d "node_modules" ]; then
    echo "📦 Installation des dépendances..."
    npm install
fi

echo "🚀 Lancement du serveur de développement..."
echo "📱 L'application sera accessible sur http://localhost:8080"
echo ""
echo "Commandes disponibles:"
echo "  - Ctrl+C : Arrêter le serveur"
echo "  - npm run build : Créer une version de production (11ty + Vite -> _site/)"
echo "  - npm run preview : Prévisualiser la version de production"
echo ""

npm run dev
