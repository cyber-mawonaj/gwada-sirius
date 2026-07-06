import sites from "./sites.js";

// Prochain lever héliaque (calculé au build, à partir de Pointe des Châteaux
// comme site de référence — les 7 sites ne divergent que de quelques minutes).
export default function () {
  const reference = sites[0];
  const today = new Date();
  const years = Object.keys(reference.predictions)
    .map(Number)
    .sort((a, b) => a - b);

  for (const year of years) {
    const p = reference.predictions[year];
    const when = new Date(`${p.date}T${p.time}:00`);
    if (when >= today) {
      return { ...p, year };
    }
  }

  const lastYear = years[years.length - 1];
  return { ...reference.predictions[lastYear], year: lastYear };
}
