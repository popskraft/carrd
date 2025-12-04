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
