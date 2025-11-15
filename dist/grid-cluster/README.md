# Container to Grid Converter

## Purpose
In Carrd you can merge consecutive containers into a single grid spanning 2–6 columns. Assign each container the matching class (grid-2 … grid-6, and grid-sm-2 if needed) and place them back-to-back. The grid ends automatically where the sequence of containers stops.

## How to Use
1. Add Carrd Container elements with any design and add class such as `grid-2` through `grid-6` (and second class `grid-sm-2` when a two-column mobile layout is needed).
2. Place those Containers consecutively; the plugin detects adjacent grids and wraps them in a unified `.custom-grid-container` with the proper column count.
3. Publish the page with either CDN injection or a manual embed so the script runs at page load and restructures the grids automatically.

## Example Usage
For easy integration with Carrd, use the `example.html` file which contains ready-to-copy code for embedding:

1. Open `example.html`
2. Copy the entire code content
3. In Carrd, add ( + ) an Element → Embed with these parameters:
   - **Type**: Code
   - **Title**: Container to Grid Converter
   - **Style**: Hidden → Body End
   - **Code**: Paste the copied code from example.html

**Important**: Place HTML Elements at the very bottom of the page below the footer, ensuring they don't fall into containers with hidden content.

## CDN Installation
Alternatively, you can manually include the plugin files directly from CDN using two separate Embed elements:

### 1. CSS Embed Element
In Carrd, add ( + ) an Element → Embed with these parameters:
   - **Type**: Code
   - **Title**: CSS CDN Container to Grid Converter
   - **Style**: Hidden → Head
   - **Code**:
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/popskraft/carrd@main/dist/grid-cluster/style.css">
```

### 2. JavaScript Embed Element
In Carrd, add ( + ) another Element → Embed with these parameters:
   - **Type**: Code
   - **Title**: JS CDN Container to Grid Converter
   - **Style**: Hidden → Body End
   - **Code**:
```html
<script src="https://cdn.jsdelivr.net/gh/popskraft/carrd@main/dist/grid-cluster/script.js"></script>
```
