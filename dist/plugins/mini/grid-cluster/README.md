# Grid Cluster

## Purpose
Grid Cluster turns consecutive Carrd grid blocks into cohesive, responsive containers so layouts stay aligned across breakpoints. It solves uneven spacing by applying a shared wrapper, keeps image widths constrained, and respects optional `grid-sm-2` rules for smaller screens.

## How to Use
1. Add Carrd elements with classes such as `grid-2` through `grid-6` (and `grid-sm-2` when a two-column mobile layout is needed).
2. Place those grid blocks consecutively; the plugin detects adjacent grids and wraps them in a unified `.custom-grid-container` with the proper column count.
3. Publish the page with either CDN injection or a manual embed so the script runs at page load and restructures the grids automatically.

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

This will automatically include both the CSS and JavaScript files with proper CDN links.

## CDN Installation
Alternatively, you can manually include the plugin files directly from CDN using separate Embed elements.

**Important**: Place HTML Elements at the very bottom of the page below the footer, ensuring they don't fall into containers with hidden content.

### 1. CSS Embed Element
In Carrd, add ( + ) an Element → Embed with these parameters:
   - **Type**: Code
   - **Title**: Grid Cluster
   - **Style**: Hidden → Head
   - **Code**:
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/popskraft/carrd@main/dist/plugins/mini/grid-cluster/style.css">
```


### 2. JavaScript Embed Element
In Carrd, add ( + ) another Element → Embed with these parameters:
   - **Type**: Code
   - **Title**: Grid Cluster
   - **Style**: Hidden → Body End
   - **Code**:
```html
<script src="https://cdn.jsdelivr.net/gh/popskraft/carrd@main/dist/plugins/mini/grid-cluster/script.js"></script>
```
