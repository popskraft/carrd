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
   - Add a custom attribute `data-padding` with value like `2` (for 2rem) or `3 1` (vertical horizontal) Example: `data-padding=2 1`.
   - Add `data-padding-mobile` for mobile-specific padding (e.g. `1`) Example: `data-padding-mobile=1`.

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
