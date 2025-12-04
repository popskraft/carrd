(function() {
    // Helper to parse padding values (e.g. "2" -> "2rem", "2 1" -> "2rem 1rem")
    const parsePadding = (val) => {
        if (!val) return null;
        return val.split(' ').map(v => !isNaN(v) ? v + 'rem' : v).join(' ');
    };

    const initCards = () => {
        const cardContainers = document.querySelectorAll('.cards');

        cardContainers.forEach(container => {
            // Guard against re-initialization
            if (container.dataset.cardsInitialized === 'true') return;
            container.dataset.cardsInitialized = 'true';
            
            const style = window.getComputedStyle(container);
            
            // 1. Get background color
            const backgroundColor = style.backgroundColor;
            
            // 2. Get border radius and other border properties
            const borderRadius = style.borderRadius;
            const borderTopWidth = style.borderTopWidth;
            const borderTopStyle = style.borderTopStyle;
            const borderTopColor = style.borderTopColor;
            const boxShadow = style.boxShadow;
            
            // 2.1 Get background properties (gradient, image, etc.)
            const backgroundImage = style.backgroundImage;
            const backgroundPosition = style.backgroundPosition;
            const backgroundRepeat = style.backgroundRepeat;
            const backgroundSize = style.backgroundSize;

            // 3. Get padding and color from data attributes
            const dataPadding = parsePadding(container.dataset.padding);
            const dataPaddingMobile = parsePadding(container.dataset.paddingMobile);
            const dataColor = container.dataset.color;

            // 4. Handle styles based on data-color
            // Always reset border and shadow on container as they move to cards
            container.style.setProperty('border', 'none', 'important');
            container.style.setProperty('box-shadow', 'none', 'important');

            if (dataColor) {
                // If data-color is present, container KEEPS its background
                // Cards get the data-color as background
            } else {
                // If no data-color, container loses its background (moves to cards)
                container.style.setProperty('background-color', 'transparent', 'important');
                container.style.setProperty('background', 'none', 'important');
            }
            
            // Remove border radius from parent to avoid clipping weirdness if it had a background
            // container.style.borderRadius = '0'; // Optional, might break layout if used for other things

            const inner = container.querySelector('.inner');
            if (!inner) return;

            const columns = Array.from(inner.children);

            columns.forEach(column => {
                if (column.querySelector('.card-item')) return;

                const cardItem = document.createElement('div');
                cardItem.classList.add('card-item');
                
                // Apply background color
                if (dataColor) {
                    // Use data-color if present
                    cardItem.style.backgroundColor = dataColor;
                } else if (backgroundColor && backgroundColor !== 'rgba(0, 0, 0, 0)' && backgroundColor !== 'transparent') {
                    // Otherwise inherit from container
                    cardItem.style.backgroundColor = backgroundColor;
                } else {
                    // Default fallback
                    cardItem.style.backgroundColor = '#cccccc';
                }

                // Apply border radius
                if (borderRadius && borderRadius !== '0px') {
                    cardItem.style.setProperty('--card-border-radius', borderRadius);
                }

                // Apply border
                if (borderTopWidth && borderTopWidth !== '0px' && borderTopStyle !== 'none') {
                    cardItem.style.borderWidth = borderTopWidth;
                    cardItem.style.borderStyle = borderTopStyle;
                    cardItem.style.borderColor = borderTopColor;
                }

                // Apply box shadow
                if (boxShadow && boxShadow !== 'none') {
                    cardItem.style.boxShadow = boxShadow;
                }

                // Apply background properties (only if no data-color override)
                if (!dataColor && backgroundImage && backgroundImage !== 'none') {
                    cardItem.style.backgroundImage = backgroundImage;
                    cardItem.style.backgroundPosition = backgroundPosition;
                    cardItem.style.backgroundRepeat = backgroundRepeat;
                    cardItem.style.backgroundSize = backgroundSize;
                }

                // Apply padding variables
                if (dataPadding) {
                    cardItem.style.setProperty('--card-padding', dataPadding);
                }
                if (dataPaddingMobile) {
                    cardItem.style.setProperty('--card-padding-mobile', dataPaddingMobile);
                }

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
    window.addEventListener('load', initCards);
})();
