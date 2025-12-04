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
