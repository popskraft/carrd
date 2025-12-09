# Shopping Cart

A lightweight, dependency-free shopping cart for Carrd sites.

## Features
- **No Dependencies**: Pure JavaScript and CSS.
- **Responsive**: Works on desktop and mobile.
- **Customizable**: Easy to change colors and fonts via CSS variables.
- **Native Integration**: Uses standard Carrd forms for order submission.

## Setup
1. **Form**: Create a **Form** element in Carrd.
2. **Form ID**: Set the **ID** of the form to `form-shopping-cart` (Settings tab).
3. **Textarea**: Add a **Textarea** field with **ID** `order-details`.
   - The plugin looks for `#form-shopping-cart-order-details`.
4. **Section**: Create a **Section** named `#shopping-cart` for the form (cart scrolls here on checkout).

## Configuration
Customize appearance by editing CSS variables in the **Styles** embed:
```css
:root {
    /* Optional: Override defaults or define if not using Mini theme */
    --mini-cart-bg: #ffffff;           /* Panel background */
    --mini-cart-text: #333333;         /* Text color */
    --mini-cart-accent: #3b82f6;       /* Focus color */
    --mini-cart-btn-bg: #3b82f6;       /* Checkout button background */
    --mini-cart-icon-bg: #3b82f6;      /* Floating cart icon background */
    --mini-cart-badge-bg: #ef4444;     /* Badge background */
    --mini-cart-font: "Inter", sans-serif; /* Font family */
    --mini-cart-overlay-bg: rgba(0, 0, 0, 0.5); /* Overlay background */
    --mini-cart-toast-bg: #333333;     /* Toast background */
    --mini-cart-toast-text: #ffffff;   /* Toast text color */
}
```

## Installation

### Option 1: CDN (Recommended)

**1. Styles**
Add an **Embed** element:
- **Type**: Code
- **Style**: Hidden, Head
- **Code**:
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/popskraft/carrd@main/dist/shopping-cart/shopping-cart.min.css">
```

**2. Script**
Add an **Embed** element:
- **Type**: Code
- **Style**: Hidden, Body End
- **Code**:
```html
<script src="https://cdn.jsdelivr.net/gh/popskraft/carrd@main/dist/shopping-cart/shopping-cart.min.js"></script>
```

### Option 2: Direct Code
Copy the content of the file directly into the Embed element.

**1. Styles**
```html
<style>
/* Copy content from dist/shopping-cart/shopping-cart.min.css */
</style>
```

**2. Script**
```html
<script>
/* Copy content from dist/shopping-cart/shopping-cart.min.js */
</script>
```

## Usage

### Adding Items
Link any Button or Link element to an "On Click" action using Javascript:

**Label**: `Add to Cart`
**URL**: `#`
**On Click**: `CartPlugin.add('Product Name', 25.00)`

Example:
- `CartPlugin.add('T-Shirt', 20)`
- `CartPlugin.add('Premium Plan', 99.99)`
