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
5. **(Optional) Individual Colors**: Add `data-color-1="#ff0000"`, `data-color-2="blue"`, etc. to **Attributes** to override the background color for specific cards (1-based index).

## Advanced Usage

### Individual Card Colors
You can set a different background color for specific cards in the sequence using `data-color-N` attributes, where `N` is the card number (starting from 1).

**Example:**
To make the second card gray and the third card transparent:
- `data-color-2="#cccccc"`
- `data-color-3="transparent"`

**Note:**
- If a specific color is set (e.g., `data-color-2`), it overrides the container's background color/image for that card.
- If `data-color` (global) is set, it applies to all cards unless overridden by a specific `data-color-N`.

## Installation

### Option 1: CDN (Recommended)

**1. Styles**
Add an **Embed** element:
- **Type**: Code
- **Style**: Hidden, Head
- **Code**:
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/popskraft/carrd@main/dist/cards/style.css">
```

**2. Script**
Add an **Embed** element:
- **Type**: Code
- **Style**: Hidden, Body End
- **Code**:
```html
<script src="https://cdn.jsdelivr.net/gh/popskraft/carrd@main/dist/cards/script.js"></script>
```

### Option 2: Direct Code
Copy the content of the file directly into the Embed element.

**1. Styles**
- **Code**:
```html
<style>
/* Copy content from dist/cards/style.css */
</style>
```

**2. Script**
- **Code**:
```html
<script>
/* Copy content from dist/cards/script.js */
</script>
```
