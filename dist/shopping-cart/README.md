# Shopping Cart

## Version

- Version: `0.0.0`
- Build date (UTC): `2025-12-29`

## Quick Start (Beginner-Friendly)

1. In Carrd, click **+ Add Element**.
2. Choose **Embed → Code**.
3. Add any required **CSS** in **Hidden → Head** (see **Installation** below).
4. Add required **JS** in **Hidden → Body End** (see **Installation** below).
5. Publish the site and refresh the page.

Optional: if you want a single snippet, open
`dist/shopping-cart/shopping-cart-embed.html`, copy everything, and paste it
into **Hidden → Body End**.

Important: if you use `window.CarrdPluginOptions`, place it **before** the plugin
`<script>` tag in **Hidden → Body End**.

---

## Installation

### As Part of Mini Theme

```html
<!-- HEAD -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/popskraft/carrd@main/dist/mini-core.min.css">

<!-- BODY END -->
<script src="https://cdn.jsdelivr.net/gh/popskraft/carrd@main/dist/mini-core.min.js"></script>
```

### Standalone

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/popskraft/carrd@main/dist/shopping-cart/shopping-cart.min.css">
<script src="https://cdn.jsdelivr.net/gh/popskraft/carrd@main/dist/shopping-cart/shopping-cart.min.js"></script>
```

---

Floating cart widget with native Carrd form integration.

## Features
- **No Dependencies**: Pure JavaScript and CSS
- **Responsive**: Works on desktop and mobile
- **Form Integration**: Uses standard Carrd forms for checkout
- **Configurable**: Currency, position, all text labels

## Carrd Admin Settings
1. Create a **Form** element with ID `form-shopping-cart` (optional, for semantics)
2. Add a **Textarea** field with **Name** set to `order-details` (or ID `order-details`)
3. Create a **Section** named `#shopping-cart`
4. Use `CartPlugin.add('Product', Price)` in button On Click

## Configuration

```html
<script>
window.CarrdPluginOptions = {
    shoppingCart: {
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
    }
};
</script>
```

### Options

| Option | Default | Description |
|--------|---------|-------------|
| `currency` | `$` | Currency symbol |
| `currencyPosition` | `before` | `before` ($10) or `after` (10€) |
| `position` | `top-right` | Widget position |
| `storageKey` | `carrd_cart_v1` | LocalStorage key |
| `texts.*` | English | All UI text labels |

### Position Values

`top-right`, `top-left`, `bottom-right`, `bottom-left`, `bottom-center`

## JavaScript API

```javascript
CartPlugin.add('Product', 29.99);  // Add item
CartPlugin.remove('Product');       // Remove item
CartPlugin.updateQty('Product', 1); // Change quantity
CartPlugin.clear();                 // Clear cart
CartPlugin.getCart();               // Get all items
CartPlugin.getTotal();              // Get total price
CartPlugin.open();                  // Open panel
CartPlugin.close();                 // Close panel
CartPlugin.checkout();              // Trigger checkout
```

## CSS Variables

```css
:root {
    --mini-shopcart-bg: #ffffff;
    --mini-shopcart-text: #4D535C;
    --mini-shopcart-accent: #5c9dff;
    --mini-shopcart-btn-bg: #5c9dff;
    --mini-shopcart-overlay-bg: rgba(218, 225, 228, 0.8);
}
```

## Localization Example

```html
<script>
window.CarrdPluginOptions = {
    shoppingCart: {
        currency: '€',
        currencyPosition: 'after',
        texts: {
            title: 'Warenkorb',
            empty: 'Ihr Warenkorb ist leer.',
            checkout: 'Zur Kasse',
            total: 'Gesamt'
        }
    }
};
</script>
```

---

## Troubleshooting

- Nothing happens: confirm the class name or selector in **Carrd Admin Settings** matches your Carrd elements.
- Styles missing: CSS must be in **Hidden → Head**, not in **Body End**.
- Config not applied: `window.CarrdPluginOptions` must appear **before** the plugin script.
- Embed not available: you may need a Carrd plan that supports **Embed → Code**.
- CDN blocked: try opening the CDN URL directly and confirm it loads.
