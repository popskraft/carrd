# Cards

Transforms a standard Carrd container into a set of individual cards with inherited styling.

## Features
- **Inheritance**: Automatically adopts parent container's background, border, and shadow.
- **Custom Padding**: configurable via `data-padding` and `data-padding-mobile`.
- **Responsive**: Fully compatible with Carrd's column system.

## Setup
1. **Container**: Add a Container element with Columns.
2. **Styles**: Apply Background, Border, and Shadow to the Container.
3. **Class**: Add `cards` to the Container's **Classes** field.
4. **(Optional) Padding**: Add `data-padding="2 1"` (desktop) or `data-padding-mobile="1"` (mobile) to **Attributes**.

## Installation
**CSS (Hidden, Head)**
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/popskraft/carrd@main/dist/cards/style.css">
```

**JS (Hidden, Body End)**
```html
<script src="https://cdn.jsdelivr.net/gh/popskraft/carrd@main/dist/cards/script.js"></script>
```

## Example Usage
For easy integration with Carrd, use the `example.html` file which contains ready-to-copy code for embedding:

1. Open `example.html`
2. Copy the entire code content
3. In Carrd, add ( + ) an Element → Embed with these parameters:
   - **Type**: Code
   - **Title**: Cards
   - **Style**: Hidden → Body End
   - **Code**: Paste the copied code from example.html

**Important**: Place HTML Elements at the very bottom of the page below the footer, ensuring they don't fall into containers with hidden content.

## CDN Installation
Alternatively, you can manually include the plugin files directly from CDN using two separate Embed elements:

### 1. CSS Embed Element
In Carrd, add ( + ) an Element → Embed with these parameters:
   - **Type**: Code
   - **Title**: CSS CDN Cards
   - **Style**: Hidden → Head
   - **Code**:
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/popskraft/carrd@main/cards/style.css">
```

### 2. JavaScript Embed Element
In Carrd, add ( + ) another Element → Embed with these parameters:
   - **Type**: Code
   - **Title**: JS CDN Cards
   - **Style**: Hidden → Body End
   - **Code**:
```html
<script src="https://cdn.jsdelivr.net/gh/popskraft/carrd@main/cards/script.js"></script>
```
