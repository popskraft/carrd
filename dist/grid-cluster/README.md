# Grid Cluster

## What is it?
Plugin that merges consecutive Carrd containers carrying `grid-2` … `grid-6` classes into a single `.custom-grid-container`, effectively turning them into a managed CSS grid.

## Why use it
Lets you build responsive multi-column layouts out of vanilla Carrd containers: the columns auto-align, optionally collapse into a 2-up mobile grid, and support desktop-only width overrides.

## How to use it
1. **Prepare your containers.** Add multiple Container elements, place them consecutively, and give each one a `grid-2`, `grid-3`, `grid-4`, `grid-5`, or `grid-6` class (the digit defines the grid size). To force a 2-column mobile layout, add `grid-sm-2` to at least one block in the sequence.
2. **Optionally set desktop widths.** Control the first row on ≥1280px screens by adding `w-20`, `w-25`, `w-30`, `w-40`, `w-50`, `w-60`, `w-70`, `w-75`, or `w-80` classes to chosen containers; remaining columns split the leftover space.
3. **Embed the assets.** In Carrd open **Embed → Code**.  
   • In Head add:  
   ```html
   <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/popskraft/carrd@main/dist/grid-cluster/style.css">
   ```  
   • In Body End add:  
   ```html
   <script src="https://cdn.jsdelivr.net/gh/popskraft/carrd@main/dist/grid-cluster/script.js" defer></script>
   ```
4. **Publish and verify.** On load the script finds `grid-*` runs, wraps them with `.custom-grid-container`, propagates `grid-sm-2` when present, and applies your desktop widths (adds `.custom-grid-container--desktop-widths`). Images whose `.frame` exceed 20rem get `.constrain-width` so large art stops stretching columns.

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
