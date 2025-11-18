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
