# Shopping Cart

A lightweight, dependency-free shopping cart for Carrd sites.

## Features
- **No Dependencies**: Pure JavaScript and CSS.
- **Responsive**: Works on desktop and mobile.
- **Customizable**: Easy to change colors and fonts via CSS variables.
- **Native Integration**: Uses standard Carrd forms for order submission.

## Setup
1. **Form**: Create a **Form** element in Carrd with ID `form-shopping-cart`.
2. **Textarea**: Add a **Textarea** field with ID `order-details`.
3. **Section**: Create a **Section** named `#shopping-cart` for the cart panel.
4. **Trigger**: Use `CartPlugin.add('Product', Price)` in an element's On Click event.

## Installation

### Option 1: CDN (Recommended)

**CDN Styles + Script**
Add an **Embed** element:
- **Type**: Code
- **Style**: Hidden, Body End
- **Code**:
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/popskraft/carrd@main/dist/shopping-cart/shopping-cart.min.css">
<script src="https://cdn.jsdelivr.net/gh/popskraft/carrd@main/dist/shopping-cart/shopping-cart.min.js" defer></script>
```

### Option 2: Direct Code (Robust)
Copy the content of the file directly into the Embed element.

**Styles + Script**
Add an **Embed** element:
- **Type**: Code
- **Style**: Hidden, Body End
- **Code**:
```html
<style>
/* Copy content from dist/shopping-cart/shopping-cart.min.css */
</style>
<script>
/* Copy content from dist/shopping-cart/shopping-cart.min.js */
</script>
```
