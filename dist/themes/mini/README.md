# Mini

## What is it?
Base CSS layer for the Mini theme family that declares shared `--mini-*` tokens covering color, motion, and focus across every Mini plugin.

## Why use it
Keeps Mini plugins (FAQ, Grid Cluster, etc.) visually consistent and makes recoloring easy—override a token once instead of editing each plugin stylesheet.

## How to use it
1. In Carrd add an **Embed → Code** block targeting **Head** and paste:  
   ```html
   <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/popskraft/carrd@main/dist/themes/mini/style.css">
   ```
2. The file does **not** change native Carrd classes; it only registers tokens. If you need a global hook such as `body.is-theme-mini`, add it with your own snippet after loading this base layer.
3. Customize the palette by overriding variables after the include:
   ```html
   <style>
     :root {
       --mini-color-primary: #61dafb;
       --mini-focus-outline-color: rgba(97, 218, 251, 0.75);
     }
   </style>
   ```

## Key tokens
Use this table as the single source of truth for what each Mini plugin consumes.

| Token | Purpose | Plugin(s) |
| --- | --- | --- |
| `--mini-color-primary` | Drives the accent color, focus states, and FAQ icons. | Global, FAQ |
| `--mini-focus-outline`, `--mini-focus-outline-width`, `--mini-focus-outline-offset`, `--mini-focus-outline-color` | Standardizes focus styles for links/buttons. | Global |
| `--mini-transition-transform` | Controls icon rotation timing when toggles open. | FAQ |
| `--mini-anim-duration-fast`, `--mini-anim-duration-medium` | Timings for FAQ accordion transitions and helpers. | FAQ |
| `--mini-anim-ease-standard`, `--mini-anim-ease-emphasized`, `--mini-anim-ease-decelerate` | Defines the Mini motion curves. | FAQ |
| `--mini-accordion-open-animation`, `--mini-accordion-close-animation`, `--mini-rotate-open-animation` | Keyframes used by toggles and answer panels. | FAQ |
| `--mini-grid-row-gap`, `--mini-grid-row-gap-compact`, `--mini-grid-row-gap-wide`, `--mini-grid-column-gap`, `--mini-grid-column-gap-compact`, `--mini-grid-column-gap-wide`, `--mini-grid-column-gap-max` | Gap values inherited by Grid Cluster. | Grid Cluster |

Override tokens after loading `themes/mini/style.css` to recolor every Mini plugin instantly.

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
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/popskraft/carrd@main/dist/themes/mini/style.css">
```
