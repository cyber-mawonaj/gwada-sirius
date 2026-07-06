const container = document.querySelector('[data-island="map"]');

if (container && "IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        observer.disconnect();

        Promise.all([
          import("svelte"),
          import("./ObservationMap.svelte"),
        ]).then(([{ mount }, { default: ObservationMap }]) => {
          const target = container.querySelector(".island-app");
          const sitesData = JSON.parse(document.getElementById("sites-data").textContent);
          const locale = document.documentElement.lang;

          mount(ObservationMap, {
            target,
            props: { sites: sitesData, locale },
          });

          container.classList.add("is-enhanced");
        });
      }
    },
    { rootMargin: "200px" }
  );

  observer.observe(container);
}
