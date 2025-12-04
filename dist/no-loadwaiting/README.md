# No Load Waiting

Forces Carrd pages to load instantly by bypassing the default loader.

## Features
- **Instant Load**: Removes the "black screen" delay.
- **Compatibility**: Fires synthetic scroll/resize events to trigger animations.

## Setup
1. **Editor**: Keep the default Carrd loader **Enabled**.
2. **Embed**: Add the plugin script to the page.

## Installation
**CSS (Hidden, Head)**
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/popskraft/carrd@main/dist/no-loadwaiting/style.css">
```

**JS (Hidden, Body End)**
```html
<script src="https://cdn.jsdelivr.net/gh/popskraft/carrd@main/dist/no-loadwaiting/script.js" defer></script>
```

## Notes
- **Video Autoplay**: Browsers may still pause videos requiring interaction.
- **Custom Loaders**: Ensure your loader has `id="loader"` for the script to remove it.

## Example Usage
For easy integration with Carrd, use the `example.html` file which contains ready-to-copy code for embedding:

1. Open `example.html`
2. Copy the entire code content
3. In Carrd, add ( + ) an Element → Embed with these parameters:
   - **Type**: Code
   - **Title**: No Load Waiting
   - **Style**: Hidden → Body End
   - **Code**: Paste the copied code from example.html

**Important**: Place HTML Elements at the very bottom of the page below the footer, ensuring they don't fall into containers with hidden content.

## CDN Installation
Alternatively, you can manually include the plugin files directly from CDN using two separate Embed elements:

### JavaScript Embed Element
In Carrd, add ( + ) another Element → Embed with these parameters:
   - **Type**: Code
   - **Title**: JS CDN No Load Waiting
   - **Style**: Hidden → Body End
   - **Code**:
```html
<script src="https://cdn.jsdelivr.net/gh/popskraft/carrd@main/no-loadwaiting/script.js"></script>
```
