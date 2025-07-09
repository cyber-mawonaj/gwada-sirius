// Données des prédictions du lever héliaque
export const predictionsData = {
  "Pointe des Châteaux": {
    coords: { lat: 16.2476, lon: -61.1771, alt: 30 },
    description: "Point de vue élevé avec panorama dégagé vers l'Est sur l'Atlantique",
    predictions: {
      "2025": { date: "22 juillet", time: "05:12" },
      "2026": { date: "22 juillet", time: "05:12" },
      "2027": { date: "22 juillet", time: "05:13" },
      "2028": { date: "21 juillet", time: "05:13" },
      "2029": { date: "22 juillet", time: "05:14" }
    }
  },
  "Pointe de la Grande Vigie": {
    coords: { lat: 16.5098, lon: -61.4666, alt: 81 },
    description: "Point le plus septentrional de la Guadeloupe, horizon marin parfait",
    predictions: {
      "2025": { date: "22 juillet", time: "05:11" },
      "2026": { date: "22 juillet", time: "05:12" },
      "2027": { date: "22 juillet", time: "05:12" },
      "2028": { date: "21 juillet", time: "05:12" },
      "2029": { date: "22 juillet", time: "05:13" }
    }
  },
  "Duzer (Sainte-Rose)": {
    coords: { lat: 16.3361, lon: -61.7430, alt: 20 },
    description: "Site nécessitant un point dégagé vers l'Est sur les mornes",
    predictions: {
      "2025": { date: "22 juillet", time: "05:13" },
      "2026": { date: "22 juillet", time: "05:14" },
      "2027": { date: "22 juillet", time: "05:14" },
      "2028": { date: "21 juillet", time: "05:14" },
      "2029": { date: "22 juillet", time: "05:15" }
    }
  },
  "Saint-Félix (Le Gosier)": {
    coords: { lat: 16.2005, lon: -61.4605, alt: 5 },
    description: "Plage avec observation au niveau de la mer",
    predictions: {
      "2025": { date: "22 juillet", time: "05:13" },
      "2026": { date: "22 juillet", time: "05:13" },
      "2027": { date: "22 juillet", time: "05:14" },
      "2028": { date: "21 juillet", time: "05:14" },
      "2029": { date: "22 juillet", time: "05:15" }
    }
  },
  "Grande Pointe (Trois-Rivières)": {
    coords: { lat: 15.9696, lon: -61.6308, alt: 42 },
    description: "Site côtier avec altitude intéressante pour l'observation",
    predictions: {
      "2025": { date: "22 juillet", time: "05:13" },
      "2026": { date: "22 juillet", time: "05:14" },
      "2027": { date: "22 juillet", time: "05:14" },
      "2028": { date: "21 juillet", time: "05:15" },
      "2029": { date: "22 juillet", time: "05:15" }
    }
  },
  "Petit-Pérou": {
    coords: { lat: 16.0517, lon: -61.5567, alt: 10 },
    description: "Site des roches gravées, observation depuis la côte",
    predictions: {
      "2025": { date: "22 juillet", time: "05:14" },
      "2026": { date: "22 juillet", time: "05:14" },
      "2027": { date: "22 juillet", time: "05:15" },
      "2028": { date: "21 juillet", time: "05:15" },
      "2029": { date: "22 juillet", time: "05:16" }
    }
  },
  "Pointe du Vieux-Fort": {
    coords: { lat: 15.9483, lon: -61.7072, alt: 20 },
    description: "Point le plus méridional de Basse-Terre, vue sur le canal des Saintes",
    predictions: {
      "2025": { date: "22 juillet", time: "05:14" },
      "2026": { date: "22 juillet", time: "05:14" },
      "2027": { date: "22 juillet", time: "05:15" },
      "2028": { date: "21 juillet", time: "05:15" },
      "2029": { date: "22 juillet", time: "05:16" }
    }
  }
};

export const years = ["2025", "2026", "2027", "2028", "2029"];

export function calculateObservationWindow(dateStr) {
  const day = parseInt(dateStr.split(' ')[0]);
  const month = dateStr.split(' ')[1];
  const startDay = day - 2;
  const endDay = day + 2;
  return `${startDay} au ${endDay} ${month}`;
}
