# Columns

Combines Grid Cluster and Cards functionality into a single package to optimize resource loading.

## Features
- **Grid Cluster**: Wraps consecutive `.grid-*` classes (e.g., `.grid-2`, `.grid-3`) into a responsive grid layout. Supports width helpers like `.w-50`.
- **Cards**: Applies advanced styling to container elements marked with `.cards`. Supports `data-padding`, `data-color`, and mobile overrides.
- **Unified**: Replaces the need for separate `grid-cluster` and `cards` plugins, reducing HTTP requests.

## Setup
1. **Grid**: Add Container elements with classes like `grid-2`, `grid-3`, `grid-4`, etc.
2. **Cards**: Add a Container element with class `cards`. Use `.inner` container for items.
3. **Attributes**: Configure spacing and colors using data attributes (`data-padding="2rem"`, `data-color="#f0f0f0"`).

## Installation

### Option 1: CDN (Recommended)

**CDN Styles + Script**
Add an **Embed** element:
- **Type**: Code
- **Style**: Hidden, Body End
- **Code**:
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/popskraft/carrd@main/dist/columns/columns.min.css">
<script src="https://cdn.jsdelivr.net/gh/popskraft/carrd@main/dist/columns/columns.min.js" defer></script>
```

### Option 2: Direct Code (Robust)
Copy the content of the file directly into the Embed element.

**Styles + Script**
Add an **Embed** element:
- **Type**: Code
- **Style**: Hidden, Body End
- **Code**:
```html
<style>
/* Copy content from dist/columns/columns.min.css */
</style>
<script>
/* Copy content from dist/columns/columns.min.js */
</script>
```
