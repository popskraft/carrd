/* Carrd Plugins Configuration - Load BEFORE main scripts */
window.CarrdPluginOptions = window.CarrdPluginOptions || {};

/* Shopping Cart */
window.CarrdPluginOptions.shoppingCart = {
    currency: '$',
    currencyPosition: 'before',
    position: 'top-right',
    storageKey: 'carrd_cart_v1',
    orderInputSelector: '#form-shopping-cart-order-details',
    orderInputClass: '.cart-output',
    texts: {
        title: 'Shopping Cart',
        empty: 'Your cart is empty.',
        checkout: 'Checkout',
        total: 'Total',
        remove: 'Remove',
        required: 'Required'
    }
};

/* FAQ */
window.CarrdPluginOptions.faq = {
    containerSelector: '.FAQContainer',
    dividerSelector: 'hr.divider-component',
    headerTags: ['H1', 'H2', 'H3'],
    allowMultipleOpen: false,
    defaultOpen: false
};

/* Columns (Grid + Cards) */
window.CarrdPluginOptions.columns = {
    gridClasses: ['grid-2', 'grid-3', 'grid-4', 'grid-5', 'grid-6'],
    cardSelector: '.cards',
    defaultCardBg: 'var(--mini-card-bg-default)'
};

/* No-loadwaiting */
window.CarrdPluginOptions.noLoadwaiting = {
    animationDuration: 750,
    observerTimeout: 5000
};
