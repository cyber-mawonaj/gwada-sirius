import { mount } from "svelte";
import PredictionsCalculator from "./PredictionsCalculator.svelte";

const container = document.querySelector('[data-island="predictions"]');
if (container) {
  const target = container.querySelector(".island-app");
  const sitesData = JSON.parse(document.getElementById("sites-data").textContent);

  mount(PredictionsCalculator, {
    target,
    props: {
      sites: sitesData,
      year: Number(target.dataset.year),
      locale: target.dataset.locale,
      labels: {
        select: target.dataset.selectLabel,
        heliacal: target.dataset.heliacalLabel,
        window: target.dataset.windowLabel,
      },
    },
  });

  container.classList.add("is-enhanced");
}
