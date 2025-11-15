# Mini Theme Base

## Purpose
Provides a single stylesheet that exposes shared color, motion, and focus tokens for every Mini plugin. When you load it once per site, plugins can inherit `--mini-*` custom properties instead of hard-coding colors or timings, which keeps them visually consistent and easier to theme.

## How to include it
1. Add the stylesheet in **Head** via an Embed → Code element:
   ```html
   <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/popskraft/carrd@main/dist/themes/mini/style.css">
   ```

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
