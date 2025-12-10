/* Carrd Plugins Configuration - Load BEFORE main scripts */
window.CarrdPluginOptions = window.CarrdPluginOptions || {};

/* Shopping Cart */
window.CarrdPluginOptions.shoppingCart = {
    currency: '$',
    currencyPosition: 'before',
    position: 'top-right',
    storageKey: 'carrd_cart_v1',
    orderInputSelector: '[name="order-details"], #order-details',
    orderInputClass: '.cart-output',
    texts: {
        title: 'Shopping Cart',
        empty: 'Your cart is empty.',
        checkout: 'Checkout',
        total: 'Total',
        remove: 'Remove',
        required: 'Required',
        addedToCart: 'Added "${name}" to cart',
        errorName: 'Invalid product name',
        errorPrice: 'Invalid price for ${name}',
        errorForm: 'Error: Could not find the order form. Please contact support.',
        consoleErrorForm: 'Carrd Cart: Could not find "Order Details" field. Please ensure a Textarea with name="order-details" or ID="order-details" exists.'
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
    defaultCardBg: 'var(--mini-card-bg-default)',
    widthClasses: {
        'w-20': '20%',
        'w-25': '25%',
        'w-30': '32%',
        'w-40': '40%',
        'w-50': '50%',
        'w-60': '60%',
        'w-70': '68%',
        'w-75': '75%',
        'w-80': '80%'
    }
};

/* No-loadwaiting */
window.CarrdPluginOptions.noLoadwaiting = {
    animationDuration: 750,
    observerTimeout: 5000,
    scrollPulseInterval: 60,
    scrollPulseCount: 10,
    rafPulseCount: 4
};
