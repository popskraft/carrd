# Shopping Cart

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
4. Use `CarrdShoppingCart.add('Product', Price)` in button On Click

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
CarrdShoppingCart.add('Product', 29.99);  // Add item
CarrdShoppingCart.remove('Product');       // Remove item
CarrdShoppingCart.updateQty('Product', 1); // Change quantity
CarrdShoppingCart.clear();                 // Clear cart
CarrdShoppingCart.getCart();               // Get all items
CarrdShoppingCart.getTotal();              // Get total price
CarrdShoppingCart.open();                  // Open panel
CarrdShoppingCart.close();                 // Close panel
CarrdShoppingCart.checkout();              // Trigger checkout
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
