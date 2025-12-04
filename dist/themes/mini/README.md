# Mini Theme

Shared design system for Mini plugins (FAQ, Grid Cluster, etc.) providing centralized tokens for color, motion, and focus.

## Setup
1. **Theme CSS**: Add to **Head**.
2. **Plugin CSS**: Add to **Head** (after Theme CSS).
3. **Plugin JS**: Add to **Body End**.

## Installation
**Theme CSS (Hidden, Head)**
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/popskraft/carrd@main/dist/themes/mini/theme-style.min.css">
```

**Plugin CSS (Hidden, Head)**
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/popskraft/carrd@main/dist/themes/mini/plugin-style.min.css">
```

**Plugin JS (Hidden, Body End)**
```html
<script src="https://cdn.jsdelivr.net/gh/popskraft/carrd@main/dist/themes/mini/plugin-script.min.js"></script>
```

## Customization
Override tokens in a separate **Embed** (Head, after Theme CSS):
```html
<style>
  :root {
    --mini-color-primary: #61dafb;
    --mini-focus-outline-color: rgba(97, 218, 251, 0.75);
  }
</style>
```

## Example Usage
For easy integration with Carrd, use the `example.html` file which contains ready-to-copy code for embedding:

1. Open `example.html`
2. Copy the entire code content
3. In Carrd, add ( + ) an Element → Embed with these parameters:
   - **Type**: Code
   - **Title**: Mini Theme
   - **Style**: Hidden → Body End
   - **Code**: Paste the copied code from example.html

**Important**: Place HTML Elements at the very bottom of the page below the footer, ensuring they don't fall into containers with hidden content.

## CDN Installation
Alternatively, you can manually include the plugin files directly from CDN using two separate Embed elements:

### CSS Embed Element
In Carrd, add ( + ) an Element → Embed with these parameters:
   - **Type**: Code
   - **Title**: CSS CDN Mini Theme
   - **Style**: Hidden → Head
   - **Code**:
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/popskraft/carrd@main/themes/mini/style.css">
```
