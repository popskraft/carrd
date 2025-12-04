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
            
            // 2. Get border radius
            const borderRadius = style.borderRadius;

            // 3. Get padding from data attributes
            const dataPadding = parsePadding(container.dataset.padding);
            const dataPaddingMobile = parsePadding(container.dataset.paddingMobile);

            // 4. Set container background to transparent
            container.style.setProperty('background-color', 'transparent', 'important');
            
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
                if (backgroundColor && backgroundColor !== 'rgba(0, 0, 0, 0)' && backgroundColor !== 'transparent') {
                    cardItem.style.backgroundColor = backgroundColor;
                } else {
                    cardItem.style.backgroundColor = '#cccccc';
                }

                // Apply border radius
                if (borderRadius && borderRadius !== '0px') {
                    cardItem.style.setProperty('--card-border-radius', borderRadius);
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
