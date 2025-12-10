// Cards: applies styling (padding, border radius, background) to card items based on container attributes.
(function() {
  'use strict';
  const parsePadding = (val) => {
    if (!val) return null;
    return val.split(' ').map(v => !isNaN(v) ? v + 'rem' : v).join(' ');
  };

  const initCards = () => {
    const cardContainers = document.querySelectorAll('.cards');

    cardContainers.forEach(container => {
      if (container.dataset.cardsInitialized === 'true') return;
      container.dataset.cardsInitialized = 'true';

      const style = window.getComputedStyle(container);
      const backgroundColor = style.backgroundColor;
      const borderRadius = style.borderRadius;
      const borderTopWidth = style.borderTopWidth;
      const borderTopStyle = style.borderTopStyle;
      const borderTopColor = style.borderTopColor;
      const boxShadow = style.boxShadow;
      const backgroundImage = style.backgroundImage;
      const backgroundPosition = style.backgroundPosition;
      const backgroundRepeat = style.backgroundRepeat;
      const backgroundSize = style.backgroundSize;

      const dataPadding = parsePadding(container.dataset.padding);
      const dataPaddingMobile = parsePadding(container.dataset.paddingMobile);
      const dataColor = container.dataset.color;

      // Reset container styles
      container.style.setProperty('border', 'none', 'important');
      container.style.setProperty('box-shadow', 'none', 'important');

      // If no data-color, reset container background (styles will be applied to card items)
      if (!dataColor) {
        container.style.setProperty('background-color', 'transparent', 'important');
        container.style.setProperty('background', 'none', 'important');
      }

      const inner = container.querySelector('.inner');
      if (!inner) return;

      const columns = Array.from(inner.children);

      columns.forEach((column, index) => {
        if (column.querySelector('.card-item')) return;

        const cardItem = document.createElement('div');
        cardItem.classList.add('card-item');

        const specificColor = container.getAttribute(`data-color-${index + 1}`);
        const specificBorderColor = container.getAttribute(`data-border-color-${index + 1}`);

        // Background Color Logic
        if (specificColor) {
          cardItem.style.backgroundColor = specificColor;
        } else if (dataColor) {
          cardItem.style.backgroundColor = dataColor;
        } else if (backgroundColor && backgroundColor !== 'rgba(0, 0, 0, 0)' && backgroundColor !== 'transparent') {
          cardItem.style.backgroundColor = backgroundColor;
        } else {
          // Fallback to theme variable or default gray
          // We set it as a property so it can be overridden by CSS if needed, 
          // or just set the style directly if we want to enforce it.
          // Using var() in inline style works:
          cardItem.style.backgroundColor = 'var(--mini-card-bg-default, #cccccc)';
        }

        // Border Radius
        if (borderRadius && borderRadius !== '0px') {
          cardItem.style.setProperty('--mini-card-border-radius', borderRadius);
        }

        // Border
        if (borderTopWidth && borderTopWidth !== '0px' && borderTopStyle !== 'none') {
          cardItem.style.borderWidth = borderTopWidth;
          cardItem.style.borderStyle = borderTopStyle;
          cardItem.style.borderColor = specificBorderColor || borderTopColor;
        }

        // Box Shadow
        if (boxShadow && boxShadow !== 'none') {
          cardItem.style.boxShadow = boxShadow;
        }

        // Background Image
        if (!dataColor && !specificColor && backgroundImage && backgroundImage !== 'none') {
          cardItem.style.backgroundImage = backgroundImage;
          cardItem.style.backgroundPosition = backgroundPosition;
          cardItem.style.backgroundRepeat = backgroundRepeat;
          cardItem.style.backgroundSize = backgroundSize;
        }

        // Padding
        if (dataPadding) {
          cardItem.style.setProperty('--mini-card-padding', dataPadding);
        }
        if (dataPaddingMobile) {
          cardItem.style.setProperty('--mini-card-padding-mobile', dataPaddingMobile);
        }

        // Move content
        while (column.firstChild) {
          cardItem.appendChild(column.firstChild);
        }
        column.appendChild(cardItem);
      });
    });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCards);
  } else {
    initCards();
  }
})();
