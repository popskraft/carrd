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
**CSS (Hidden, Head)**
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/popskraft/carrd@main/dist/grid-cluster/style.css">
```

**JS (Hidden, Body End)**
```html
<script src="https://cdn.jsdelivr.net/gh/popskraft/carrd@main/dist/grid-cluster/script.js" defer></script>
```

## Example Usage
For easy integration with Carrd, use the `example.html` file which contains ready-to-copy code for embedding:

1. Open `example.html`
2. Copy the entire code content
3. In Carrd, add ( + ) an Element → Embed with these parameters:
   - **Type**: Code
   - **Title**: Grid Cluster
   - **Style**: Hidden → Body End
   - **Code**: Paste the copied code from example.html

**Important**: Place HTML Elements at the very bottom of the page below the footer, ensuring they don't fall into containers with hidden content.

## CDN Installation
Alternatively, you can manually include the plugin files directly from CDN using two separate Embed elements:

### 1. CSS Embed Element
In Carrd, add ( + ) an Element → Embed with these parameters:
   - **Type**: Code
   - **Title**: CSS CDN Grid Cluster
   - **Style**: Hidden → Head
   - **Code**:
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/popskraft/carrd@main/grid-cluster/style.css">
```

### 2. JavaScript Embed Element
In Carrd, add ( + ) another Element → Embed with these parameters:
   - **Type**: Code
   - **Title**: JS CDN Grid Cluster
   - **Style**: Hidden → Body End
   - **Code**:
```html
<script src="https://cdn.jsdelivr.net/gh/popskraft/carrd@main/grid-cluster/script.js"></script>
```
