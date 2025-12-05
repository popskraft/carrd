# Mini Theme

Shared design system for Mini plugins (FAQ, Grid Cluster, etc.) providing centralized tokens for color, motion, and focus.

## Setup
1. **Theme CSS**: Add to **Head**.
2. **Plugin CSS**: Add to **Head** (after Theme CSS).
3. **Plugin JS**: Add to **Body End**.

## Installation

### Option 1: CDN (Recommended)

**1. Theme Styles**
Add an **Embed** element:
- **Type**: Code
- **Style**: Hidden, Head
- **Code**:
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/popskraft/carrd@main/dist/themes/mini/theme-style.min.css">
```

**2. Plugin Styles**
Add an **Embed** element:
- **Type**: Code
- **Style**: Hidden, Head
- **Code**:
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/popskraft/carrd@main/dist/themes/mini/plugin-style.min.css">
```

**3. Plugin Script**
Add an **Embed** element:
- **Type**: Code
- **Style**: Hidden, Body End
- **Code**:
```html
<script src="https://cdn.jsdelivr.net/gh/popskraft/carrd@main/dist/themes/mini/plugin-script.min.js"></script>
```

### Option 2: Direct Code
Copy the content of the file directly into the Embed element.

**1. Theme Styles**
- **Code**:
```html
<style>
/* Copy content from dist/themes/mini/theme-style.min.css */
</style>
```

**2. Plugin Styles**
- **Code**:
```html
<style>
/* Copy content from dist/themes/mini/plugin-style.min.css */
</style>
```

**3. Plugin Script**
- **Code**:
```html
<script>
/* Copy content from dist/themes/mini/plugin-script.min.js */
</script>
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


