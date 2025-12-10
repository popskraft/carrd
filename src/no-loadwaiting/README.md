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

**CDN Script**
Add an **Embed** element:
- **Type**: Code
- **Style**: Hidden, Body End
- **Code**:
```html
<script src="https://cdn.jsdelivr.net/gh/popskraft/carrd@main/dist/no-loadwaiting/no-loadwaiting.min.js" defer></script>
```

### Option 2: Direct Code (Robust)
Copy the content of the file directly into the Embed element.

**Script**
Add an **Embed** element:
- **Type**: Code
- **Style**: Hidden, Body End
- **Code**:
```html
<script>
/* Copy content from dist/no-loadwaiting/no-loadwaiting.min.js */
</script>
```
