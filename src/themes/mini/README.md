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
