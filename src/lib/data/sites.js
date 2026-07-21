// Sept sites d'observation du lever héliaque de Sirius en Guadeloupe.
//
// Dates interpolées à partir des tables d'Arcus Visionis de Jean Meeus, recoupées
// avec les calculs de Jeffrey L. Hunt (whenthecurveslineup.com) : à 16°N, la
// heliacal rising tombe autour du 22 juillet (~24 juillet à 20°N, ~17 juillet à
// 10°N). Les petits écarts entre sites reflètent la longitude et l'altitude de
// l'horizon Est. Ce sont des estimations de modèle — la date réellement observée
// dépend toujours de la météo et de la clarté de l'horizon.
export default [
  {
    id: "pointe-des-chateaux",
    name: "Pointe des Châteaux",
    lat: 16.2476,
    lon: -61.1771,
    alt: 30,
    description_fr:
      "Point de vue élevé avec panorama dégagé vers l'Est sur l'Atlantique.",
    description_en:
      "Elevated viewpoint with a clear panorama east over the Atlantic.",
    predictions: {
      2025: { date: "2025-07-22", time: "05:12" },
      2026: { date: "2026-07-22", time: "05:12" },
      2027: { date: "2027-07-22", time: "05:13" },
      2028: { date: "2028-07-21", time: "05:13" },
      2029: { date: "2029-07-22", time: "05:14" },
      2030: { date: "2030-07-22", time: "05:14" },
      2031: { date: "2031-07-22", time: "05:15" },
      2032: { date: "2032-07-21", time: "05:15" },
    },
  },
  {
    id: "grande-vigie",
    name: "Pointe de la Grande Vigie",
    lat: 16.5098,
    lon: -61.4666,
    alt: 81,
    description_fr:
      "Point le plus septentrional de la Guadeloupe, horizon marin parfait.",
    description_en:
      "Guadeloupe's northernmost point, with a perfect sea horizon.",
    predictions: {
      2025: { date: "2025-07-22", time: "05:11" },
      2026: { date: "2026-07-22", time: "05:12" },
      2027: { date: "2027-07-22", time: "05:12" },
      2028: { date: "2028-07-21", time: "05:12" },
      2029: { date: "2029-07-22", time: "05:13" },
      2030: { date: "2030-07-22", time: "05:13" },
      2031: { date: "2031-07-22", time: "05:14" },
      2032: { date: "2032-07-21", time: "05:14" },
    },
  },
  {
    id: "duzer",
    name: "Duzer (Sainte-Rose)",
    lat: 16.3361,
    lon: -61.743,
    alt: 20,
    description_fr:
      "Site nécessitant un point dégagé vers l'Est sur les mornes.",
    description_en: "Requires a clear vantage point east over the hills.",
    predictions: {
      2025: { date: "2025-07-22", time: "05:13" },
      2026: { date: "2026-07-22", time: "05:14" },
      2027: { date: "2027-07-22", time: "05:14" },
      2028: { date: "2028-07-21", time: "05:14" },
      2029: { date: "2029-07-22", time: "05:15" },
      2030: { date: "2030-07-22", time: "05:15" },
      2031: { date: "2031-07-22", time: "05:16" },
      2032: { date: "2032-07-21", time: "05:16" },
    },
  },
  {
    id: "saint-felix",
    name: "Saint-Félix (Le Gosier)",
    lat: 16.2005,
    lon: -61.4605,
    alt: 5,
    description_fr: "Plage avec observation au niveau de la mer.",
    description_en: "Beach with sea-level observation.",
    predictions: {
      2025: { date: "2025-07-22", time: "05:13" },
      2026: { date: "2026-07-22", time: "05:13" },
      2027: { date: "2027-07-22", time: "05:14" },
      2028: { date: "2028-07-21", time: "05:14" },
      2029: { date: "2029-07-22", time: "05:15" },
      2030: { date: "2030-07-22", time: "05:15" },
      2031: { date: "2031-07-22", time: "05:16" },
      2032: { date: "2032-07-21", time: "05:16" },
    },
  },
  {
    id: "grande-pointe",
    name: "Grande Pointe (Trois-Rivières)",
    lat: 15.9696,
    lon: -61.6308,
    alt: 42,
    description_fr:
      "Site côtier avec une altitude intéressante pour l'observation.",
    description_en: "Coastal site with a useful elevation for observation.",
    predictions: {
      2025: { date: "2025-07-22", time: "05:13" },
      2026: { date: "2026-07-22", time: "05:14" },
      2027: { date: "2027-07-22", time: "05:14" },
      2028: { date: "2028-07-21", time: "05:15" },
      2029: { date: "2029-07-22", time: "05:15" },
      2030: { date: "2030-07-22", time: "05:16" },
      2031: { date: "2031-07-22", time: "05:16" },
      2032: { date: "2032-07-21", time: "05:17" },
    },
  },
  {
    id: "petit-perou",
    name: "Petit-Pérou",
    lat: 16.0517,
    lon: -61.5567,
    alt: 10,
    description_fr:
      "Site des roches gravées, observation depuis la côte.",
    description_en: "Site of the engraved rocks, observed from the coast.",
    predictions: {
      2025: { date: "2025-07-22", time: "05:14" },
      2026: { date: "2026-07-22", time: "05:14" },
      2027: { date: "2027-07-22", time: "05:15" },
      2028: { date: "2028-07-21", time: "05:15" },
      2029: { date: "2029-07-22", time: "05:16" },
      2030: { date: "2030-07-22", time: "05:16" },
      2031: { date: "2031-07-22", time: "05:17" },
      2032: { date: "2032-07-21", time: "05:17" },
    },
  },
  {
    id: "vieux-fort",
    name: "Pointe du Vieux-Fort",
    lat: 15.9483,
    lon: -61.7072,
    alt: 20,
    description_fr:
      "Point le plus méridional de Basse-Terre, vue sur le canal des Saintes.",
    description_en:
      "Basse-Terre's southernmost point, overlooking the Saintes channel.",
    predictions: {
      2025: { date: "2025-07-22", time: "05:14" },
      2026: { date: "2026-07-22", time: "05:14" },
      2027: { date: "2027-07-22", time: "05:15" },
      2028: { date: "2028-07-21", time: "05:15" },
      2029: { date: "2029-07-22", time: "05:16" },
      2030: { date: "2030-07-22", time: "05:16" },
      2031: { date: "2031-07-22", time: "05:17" },
      2032: { date: "2032-07-21", time: "05:17" },
    },
  },
];
