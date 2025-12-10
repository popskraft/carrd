# Grid Cluster

Merges consecutive `grid-*` containers into a single responsive CSS grid.

## Features
- **Auto-Grid**: Combines separate containers into a unified grid layout.
- **Responsive**: Supports 2-6 columns with optional 2-column mobile view.
- **Flexible**: Allows per-column width overrides on desktop.

## Setup
1. **Containers**: Add consecutive Container elements.
2. **Grid Class**: Add `grid-2` through `grid-6` to each container to define column count.
3. **(Optional) Mobile**: Add `grid-sm-2` to any block for a 2-column mobile layout.
4. **(Optional) Widths**: Add `w-20`, `w-25`, `w-33`, `w-40`, `w-50`, `w-60`, `w-67`, `w-75`, or `w-80` for desktop width overrides.

## Installation

### Option 1: CDN (Recommended)

**1. Styles**
Add an **Embed** element:
- **Type**: Code
- **Style**: Hidden, Head
- **Code**:
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/popskraft/carrd@main/dist/grid-cluster/grid-cluster.min.css">
```

**2. Script**
Add an **Embed** element:
- **Type**: Code
- **Style**: Hidden, Body End
- **Code**:
```html
<script src="https://cdn.jsdelivr.net/gh/popskraft/carrd@main/dist/grid-cluster/grid-cluster.min.js" defer></script>
```

### Option 2: Direct Code
Copy the content of the file directly into the Embed element.

**1. Styles**
- **Code**:
```html
<style>
/* Copy content from dist/grid-cluster/grid-cluster.min.css */
</style>
```

**2. Script**
- **Code**:
```html
<script>
/* Copy content from dist/grid-cluster/grid-cluster.min.js */
</script>
```
