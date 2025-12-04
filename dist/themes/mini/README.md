# Mini

## What is it?
Base CSS layer for the Mini theme family that declares shared `--mini-*` tokens covering color, motion, and focus across every Mini plugin.

## Why use it
Keeps Mini plugins (FAQ, Grid Cluster, etc.) visually consistent and makes recoloring easy—override a token once instead of editing each plugin stylesheet.

## Available Files
The Mini theme includes the following files:
- **theme-style.min.css** - Base theme CSS tokens
- **theme-script.min.js** - Base theme JavaScript (if needed)
- **plugin-style.min.css** - Plugin-specific styles
- **plugin-script.min.js** - Plugin-specific functionality

## Installation

Use jsDelivr CDN for faster loading and automatic caching.

#### Theme Styles (Required)
1. In Carrd, add **( + ) → Element → Embed** with these parameters:
   - **Type**: Code
   - **Title**: Mini Theme CSS
   - **Style**: Hidden → Head
   - **Code**:
   ```html
   <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/popskraft/carrd@main/dist/themes/mini/theme-style.min.css">
   ```

#### Plugin Styles (If using Mini plugins)
2. Add another **Embed → Code** element:
   - **Type**: Code
   - **Title**: Mini Plugin CSS
   - **Style**: Hidden → Head
   - **Code**:
   ```html
   <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/popskraft/carrd@main/dist/themes/mini/plugin-style.min.css">
   ```

#### Plugin Scripts (If using Mini plugins)
3. Add another **Embed → Code** element:
   - **Type**: Code
   - **Title**: Mini Plugin JS
   - **Style**: Hidden → Body End
   - **Code**:
   ```html
   <script src="https://cdn.jsdelivr.net/gh/popskraft/carrd@main/dist/themes/mini/plugin-script.min.js"></script>
   ```

#### Theme Scripts (Optional)
4. If the theme requires JavaScript, add:
   - **Type**: Code
   - **Title**: Mini Theme JS
   - **Style**: Hidden → Body End
   - **Code**:
   ```html
   <script src="https://cdn.jsdelivr.net/gh/popskraft/carrd@main/dist/themes/mini/theme-script.min.js"></script>
   ```


## Customization
Override tokens after loading the theme styles to recolor every Mini plugin instantly:

```html
<style>
  :root {
    --mini-color-primary: #61dafb;
    --mini-focus-outline-color: rgba(97, 218, 251, 0.75);
  }
</style>
```

Add this as a separate **Embed → Code** element with **Style**: Hidden → Head, placed **after** the theme CSS embed.

## Important Notes
- The theme files do **not** change native Carrd classes; they only register CSS custom properties (tokens)
- Always load CSS files in the **Head** section
- Always load JavaScript files at **Body End** for optimal performance
- If you need a global hook such as `body.is-theme-mini`, add it with your own snippet after loading the base layer
- Place embed elements in the correct order: theme styles → plugin styles → customization → scripts

## Example Usage
For easy integration with Carrd, use the `example.html` file which contains ready-to-copy code for embedding:

1. Open `example.html`
2. Copy the entire code content
3. In Carrd, add ( + ) an Element → Embed with these parameters:
   - **Type**: Code
   - **Title**: Mini
   - **Style**: Hidden → Body End
   - **Code**: Paste the copied code from example.html

**Important**: Place HTML Elements at the very bottom of the page below the footer, ensuring they don't fall into containers with hidden content.

## CDN Installation
Alternatively, you can manually include the plugin files directly from CDN using two separate Embed elements:

### CSS Embed Element
In Carrd, add ( + ) an Element → Embed with these parameters:
   - **Type**: Code
   - **Title**: CSS CDN Mini
   - **Style**: Hidden → Head
   - **Code**:
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/popskraft/carrd@main/themes/mini/style.css">
```
