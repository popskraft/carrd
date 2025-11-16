# Mini Theme Base

## Purpose
Provides a single stylesheet that exposes shared color, motion, and focus tokens for every Mini plugin. When you load it once per site, plugins can inherit `--mini-*` custom properties instead of hard-coding colors or timings, which keeps them visually consistent and easier to theme.

## How to include it
1. Add the stylesheet in **Head** via an Embed → Code element:
   ```html
   <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/popskraft/carrd@main/dist/themes/mini/style.css">
   ```
2. Loading this file only declares shared tokens; it intentionally avoids overriding Carrd’s native classes. Apply `body.is-theme-mini` (or any custom hook) manually if you need the same color scheme outside the built-in Mini pages.

## Key tokens
This stylesheet now exposes exactly the tokens that existing Mini plugins consume. Table below documents every token, its role, and which plugin currently depends on it. Rely on these tokens (with fallbacks) rather than adding new globals, and keep this table as the single source of truth when you extend the UI.

| Token | Purpose | Plugin(s) |
| --- | --- | --- |
| `--mini-color-primary` | Drives accent color, from focus rings to the FAQ toggle icon. | Global theme, FAQ |
| `--mini-focus-outline`, `--mini-focus-outline-width`, `--mini-focus-outline-offset`, `--mini-focus-outline-color` | Standardizes focus rings across anchors and buttons. | Global theme |
| `--mini-transition-transform` | Reuses the same transform transition when toggling the FAQ icon. | FAQ |
| `--mini-anim-duration-fast`, `--mini-anim-duration-medium` | Provides consistent timing for FAQ color/accordion transitions and animation helpers. | FAQ |
| `--mini-anim-ease-standard`, `--mini-anim-ease-emphasized`, `--mini-anim-ease-decelerate` | Ensures FAQ motion curves match the Mini feel. | FAQ |
| `--mini-accordion-open-animation`, `--mini-accordion-close-animation`, `--mini-rotate-open-animation` | Exposed keyframe-driven animations for toggles and answer panels. | FAQ |
| `--mini-grid-row-gap`, `--mini-grid-row-gap-compact`, `--mini-grid-row-gap-wide`, `--mini-grid-column-gap`, `--mini-grid-column-gap-compact`, `--mini-grid-column-gap-wide`, `--mini-grid-column-gap-max` | Provides grid gap defaults so Grid Cluster inherits spacing without duplicating logic. | Grid Cluster |

Override these tokens in your embed *after* loading `themes/mini/style.css` to recolor the whole Mini palette without touching the plugins directly.

## Example Usage
For easy integration with Carrd, use the `example.html` file which contains ready-to-copy code for embedding:

1. Open `example.html`
2. Copy the entire code content
3. In Carrd, add ( + ) an Element → Embed with these parameters:
   - **Type**: Code
   - **Title**: Mini Theme Base
   - **Style**: Hidden → Body End
   - **Code**: Paste the copied code from example.html

**Important**: Place HTML Elements at the very bottom of the page below the footer, ensuring they don't fall into containers with hidden content.

## CDN Installation
Alternatively, you can manually include the plugin files directly from CDN using two separate Embed elements:

### CSS Embed Element
In Carrd, add ( + ) an Element → Embed with these parameters:
   - **Type**: Code
   - **Title**: CSS CDN Mini Theme Base
   - **Style**: Hidden → Head
   - **Code**:
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/popskraft/carrd@main/dist/themes/mini/style.css">
```
