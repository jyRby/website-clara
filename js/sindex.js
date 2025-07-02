document.addEventListener("DOMContentLoaded", () => {
  // Gestion des iframes sans data-src (ex: la première iframe préchargée)
  document.querySelectorAll('.moviePackage').forEach(container => {
    const iframe = container.querySelector('iframe');
    if (!iframe) return;

    // Si iframe a src direct (pas de data-src), on crée direct le player et events
    if (!iframe.hasAttribute('data-src')) {
      const player = new Vimeo.Player(iframe);

      container.addEventListener('mouseover', () => {
        player.play().catch(e => console.error('Erreur lecture :', e));
      });

      container.addEventListener('mouseout', () => {
        player.pause().catch(e => console.error('Erreur pause :', e));
      });

      container.addEventListener('touchstart', () => {
        player.play().catch(e => console.error('Erreur lecture mobile :', e));
      });

      container.addEventListener('touchend', () => {
        player.pause().catch(e => console.error('Erreur pause mobile :', e));
      });
    }
  });

  // Gestion des iframes avec lazy loading
  const lazyIframes = document.querySelectorAll('iframe[data-src]');

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const iframe = entry.target;
        const container = iframe.closest('.moviePackage');
        iframe.src = iframe.dataset.src;

        iframe.addEventListener('load', () => {
          const player = new Vimeo.Player(iframe);

          container.addEventListener('mouseover', () => {
            player.play().catch(e => console.error('Erreur lecture :', e));
          });

          container.addEventListener('mouseout', () => {
            player.pause().catch(e => console.error('Erreur pause :', e));
          });

          container.addEventListener('touchstart', () => {
            player.play().catch(e => console.error('Erreur lecture mobile :', e));
          });

          container.addEventListener('touchend', () => {
            player.pause().catch(e => console.error('Erreur pause mobile :', e));
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
