document.addEventListener("DOMContentLoaded", () => {
  // 1. Gestion des iframes déjà chargées (avec src direct, ex: première iframe)
  const immediateIframes = document.querySelectorAll('iframe:not([data-src])');

  immediateIframes.forEach(iframe => {
    const player = new Vimeo.Player(iframe);

    iframe.addEventListener("mouseover", () => {
      player.play().catch(e => console.error("Erreur lecture :", e));
    });

    iframe.addEventListener("mouseout", () => {
      player.pause().catch(e => console.error("Erreur pause :", e));
    });

    iframe.addEventListener("touchstart", () => {
      player.play().catch(e => console.error("Erreur mobile lecture :", e));
    });

    iframe.addEventListener("touchend", () => {
      player.pause().catch(e => console.error("Erreur mobile pause :", e));
    });
  });

  // 2. Gestion des iframes avec lazy loading (data-src)
  const lazyIframes = document.querySelectorAll('iframe[data-src]');

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const iframe = entry.target;
        iframe.src = iframe.dataset.src;

        iframe.addEventListener('load', () => {
          const player = new Vimeo.Player(iframe);

          iframe.addEventListener("mouseover", () => {
            player.play().catch(e => console.error("Erreur lecture :", e));
          });

          iframe.addEventListener("mouseout", () => {
            player.pause().catch(e => console.error("Erreur pause :", e));
          });

          iframe.addEventListener("touchstart", () => {
            player.play().catch(e => console.error("Erreur mobile lecture :", e));
          });

          iframe.addEventListener("touchend", () => {
            player.pause().catch(e => console.error("Erreur mobile pause :", e));
          });
        }, { once: true });

        observer.unobserve(iframe);
      }
    });
  }, {
    rootMargin: "100px",
  });

  lazyIframes.forEach(iframe => observer.observe(iframe));
});