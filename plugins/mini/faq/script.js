(function () {
  const containers = document.querySelectorAll('[data-faq]');
  if (!containers.length) {
    return;
  }

  containers.forEach(container => {
    const items = Array.from(container.querySelectorAll('.faq-item'));
    items.forEach((item, index) => {
      const header = item.querySelector('.faq-header');
      const content = item.querySelector('.faq-content');
      if (!header || !content) {
        return;
      }

      header.setAttribute('role', 'button');
      header.setAttribute('tabindex', '0');
      header.setAttribute('aria-expanded', 'false');
      content.setAttribute('aria-hidden', 'true');
      content.id = content.id || `faq-content-${index + 1}`;
      header.setAttribute('aria-controls', content.id);

      header.addEventListener('click', () => toggle(item, header, content));
      header.addEventListener('keydown', event => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          toggle(item, header, content);
        }
      });
    });
  });

  function toggle(item, header, content) {
    const isOpen = item.classList.contains('is-open');
    item.classList.toggle('is-open', !isOpen);
    header.setAttribute('aria-expanded', String(!isOpen));
    content.setAttribute('aria-hidden', String(isOpen));
  }
})();
