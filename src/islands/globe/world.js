// Continents simplifiés (issus de Natural Earth, tracé approximatif) —
// utilisés uniquement comme repère visuel derrière la vague du lever héliaque.
export const worldData = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: { name: "Africa" },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [-17.5, 35], [-5, 36], [10, 37], [35, 30], [42, 15],
          [51, 12], [51, -2], [41, -12], [35, -25], [28, -33],
          [20, -35], [18, -35], [12, -18], [10, -5], [8, 5],
          [-5, 5], [-17, 15], [-17.5, 35],
        ]],
      },
    },
    {
      type: "Feature",
      properties: { name: "Europe" },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [-10, 36], [-5, 43], [0, 50], [10, 54], [20, 59],
          [30, 60], [40, 55], [30, 45], [20, 40], [10, 45],
          [0, 40], [-10, 36],
        ]],
      },
    },
    {
      type: "Feature",
      properties: { name: "North America" },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [-170, 65], [-165, 68], [-150, 70], [-130, 70], [-100, 70],
          [-80, 68], [-65, 60], [-55, 50], [-65, 45], [-75, 40],
          [-80, 35], [-85, 30], [-90, 25], [-95, 20], [-105, 20],
          [-110, 25], [-115, 30], [-120, 35], [-125, 40], [-130, 45],
          [-135, 50], [-140, 55], [-150, 58], [-160, 60], [-170, 65],
        ]],
      },
    },
    {
      type: "Feature",
      properties: { name: "South America" },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [-35, -5], [-38, -15], [-40, -20], [-48, -25], [-58, -35],
          [-65, -45], [-70, -55], [-68, -55], [-73, -45], [-72, -35],
          [-70, -25], [-75, -15], [-78, -5], [-80, 0], [-77, 5],
          [-75, 10], [-70, 12], [-60, 8], [-50, 5], [-35, -5],
        ]],
      },
    },
  ],
};

// Progression du lever héliaque à travers la diaspora africaine et caribéenne
// (fin juin à mi-août), du plus oriental au plus occidental.
export const waveCities = [
  { name: "La Réunion", lat: -21.1151, lon: 55.5364, date: "27 juin" },
  { name: "Kinshasa", lat: -4.4419, lon: 15.2663, date: "16 juillet" },
  { name: "Douala", lat: 4.0511, lon: 9.7679, date: "18 juillet" },
  { name: "Yaoundé", lat: 3.848, lon: 11.5021, date: "19 juillet" },
  { name: "Abidjan", lat: 5.36, lon: -4.0083, date: "20 juillet" },
  { name: "Accra", lat: 5.6037, lon: -0.187, date: "21 juillet" },
  { name: "Guadeloupe", lat: 16.265, lon: -61.551, date: "22 juillet" },
  { name: "Martinique", lat: 14.6415, lon: -61.0242, date: "23 juillet" },
  { name: "Dakar", lat: 14.7167, lon: -17.4677, date: "23 juillet" },
  { name: "Cayenne", lat: 4.9346, lon: -52.3281, date: "24 juillet" },
  { name: "Bamako", lat: 12.6392, lon: -8.0029, date: "25 juillet" },
  { name: "Le Caire", lat: 30.0444, lon: 31.2357, date: "3 août" },
  { name: "Paris", lat: 48.8566, lon: 2.3522, date: "15 août" },
];
