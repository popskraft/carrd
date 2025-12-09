# No Load Waiting

Forces Carrd pages to load instantly by bypassing the default loader.

## Features
- **Instant Load**: Removes the "black screen" delay.
- **Compatibility**: Fires synthetic scroll/resize events to trigger animations.

## Setup
1. **Editor**: Keep the default Carrd loader **Enabled**.
2. **Embed**: Add the plugin script to the page.

## Installation

### Option 1: CDN (Recommended)

**1. Styles**
Add an **Embed** element:
- **Type**: Code
- **Style**: Hidden, Head
- **Code**:
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/popskraft/carrd@main/dist/no-loadwaiting/style.css">
```

**2. Script**
Add an **Embed** element:
- **Type**: Code
- **Style**: Hidden, Body End
- **Code**:
```html
<script src="https://cdn.jsdelivr.net/gh/popskraft/carrd@main/dist/no-loadwaiting/script.js" defer></script>
```

### Option 2: Direct Code
Copy the content of the file directly into the Embed element.

**1. Styles**
- **Code**:
```html
<style>
/* Copy content from dist/no-loadwaiting/style.css */
</style>
```

**2. Script**
- **Code**:
```html
<script>
/* Copy content from dist/no-loadwaiting/script.js */
</script>
```

## Notes
- **Video Autoplay**: Browsers may still pause videos requiring interaction.
- **Custom Loaders**: Ensure your loader has `id="loader"` for the script to remove it.
