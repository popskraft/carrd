# Cards

## What is it?
A plugin that transforms a standard Carrd container with columns into a set of individual cards. It automatically inherits styles from the parent container.

## Features
- **Automatic Styling**: Inherits `background-color` and `border-radius` from the parent container.
- **Custom Padding**: Configure padding via data attributes (supports desktop and mobile).
- **Responsive**: Works with Carrd's existing column system.

## How to use

1. **Create a Container**: Add a Container element in Carrd.
2. **Set Styles**: Set the Background Color and Corner Rounding (Border Radius) on this Container.
3. **Add Columns**: Set the container to use Columns.
4. **Add Class**: Add the class `cards` to the Container's **Classes** field.
5. **(Optional) Custom Padding**:
   - Add a custom attribute `data-padding` with value like `2` (for 2rem) or `3 1` (vertical horizontal).
   - Add `data-padding-mobile` for mobile-specific padding (e.g. `1`).

## Installation

### CDN (jsDelivr)

#### Plugin Styles
Add an **Embed** element (Hidden, Head):
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/popskraft/carrd@main/dist/cards/style.css">
```

#### Plugin Script
Add an **Embed** element (Hidden, Body End):
```html
<script src="https://cdn.jsdelivr.net/gh/popskraft/carrd@main/dist/cards/script.js"></script>
```
