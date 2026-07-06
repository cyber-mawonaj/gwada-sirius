const container = document.querySelector('[data-island="globe"]');

if (container && "IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        observer.disconnect();

        Promise.all([
          import("svelte"),
          import("./SiriusGlobe.svelte"),
        ]).then(([{ mount }, { default: SiriusGlobe }]) => {
          const target = container.querySelector(".island-app");
          mount(SiriusGlobe, { target });
          container.classList.add("is-enhanced");
        });
      }
    },
    { rootMargin: "200px" }
  );

  observer.observe(container);
}
