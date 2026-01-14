# Shopping Cart

## Version

- Version: `0.1.6`
- Build date (UTC): `2026-01-14`

## Quick Start (Beginner-Friendly)

> **Note:** This plugin requires `theme-design-tokens.css` and `theme-ui.css` to be loaded first. These files contain essential CSS variables and shared UI styles used by all theme plugins.

1. In Carrd, click **+ Add Element**.
2. Choose **Embed → Code**.
3. In **Hidden → Head**, add the **Theme CSS** first, then the **Theme UI CSS**, then the **Plugin CSS** (see **Installation** below).
4. In **Hidden → Body End**, add the **Plugin JS** (see **Installation** below).
5. Publish the site and refresh the page.

Optional: if you want a single snippet, open
`dist/shopping-cart/shopping-cart-embed.html`, copy everything, and paste it
into **Hidden → Body End**. Note: you still need `theme-design-tokens.css` and `theme-ui.css` in HEAD.

**Configuration (Optional):**

To customize plugin behavior, add `window.CarrdPluginOptions` **before** plugin scripts:

```html
<!-- BODY END: Configuration -->
<script>
window.CarrdPluginOptions = {
  shopping-cart: {
    // See Configuration section below for all options
  }
};
</script>

<!-- BODY END: Plugin script -->
<script src="...shopping-cart.min.js"></script>
```

For all available options, see [theme-config.js](../theme-config.js) or the Configuration section below.

---

## Installation

### As Part of Mini Theme

```html
<!-- HEAD -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/popskraft/carrd@main/dist/theme-design-tokens.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/popskraft/carrd@main/dist/theme-ui.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/popskraft/carrd@main/dist/theme-core.min.css">

<!-- BODY END -->
<script src="https://cdn.jsdelivr.net/gh/popskraft/carrd@main/dist/theme-core.min.js"></script>
```

### Standalone

<!-- HEAD -->
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/popskraft/carrd@main/dist/theme-design-tokens.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/popskraft/carrd@main/dist/theme-ui.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/popskraft/carrd@main/dist/shopping-cart/shopping-cart.min.css">
```

<!-- BODY END -->
```html
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
    --theme-shopcart-bg: var(--theme-color-bg);
    --theme-shopcart-text: var(--theme-color-text);
    --theme-shopcart-accent: var(--theme-color-primary);
    --theme-shopcart-btn-bg: var(--theme-color-success);
    --theme-shopcart-overlay-bg: var(--theme-overlay-bg);
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

- **Styles look broken or missing colors:** Make sure `theme-design-tokens.css` and `theme-ui.css` are loaded **before** the plugin CSS.
- Nothing happens: confirm the class name or selector in **Carrd Admin Settings** matches your Carrd elements.
- Styles missing: CSS must be in **Hidden → Head**, not in **Body End**.
- Config not applied: `window.CarrdPluginOptions` must be defined **before** the plugin `<script>` tag. Check browser console for errors.
- To see all available options: open `dist/theme-config.js` or check the Configuration section.
- Embed not available: you may need a Carrd plan that supports **Embed → Code**.
- CDN blocked: try opening the CDN URL directly and confirm it loads.
