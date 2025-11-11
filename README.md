# Carrd Grid Cluster 2

This repository mirrors the production-ready payload that Carrd loads via jsDelivr. The authoritative files live under `dist/plugins/**`, while `plugins/**` contains the readable sources that get minified before publishing.

All additional tooling, metadata, and documentation reside in a private working repository.

## Usage Concept
1. **CSS in `<head>`** – load the stylesheet generated at `dist/plugins/mini/grid-cluster/style.css` inside your Carrd head injection block:

   ```html
   <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/popskraft/carrd@main/dist/plugins/mini/grid-cluster/style.css">
   ```

   Placing it in the head ensures the grid layout classes are available when the Carrd page renders.

2. **JS in a footer container** – append the script just before closing `</body>` (Carrd's "Special Container" at the bottom works well). The script expects to sit on top of the TGM body so it can enhance the DOM without layout flicker:

   ```html
     <script src="https://cdn.jsdelivr.net/gh/popskraft/carrd@main/dist/plugins/mini/grid-cluster/script.js"></script>
   ```

   Keeping it in a dedicated container helps avoid Carrd sanitizing the tag and allows the plugin to overlay the TGM body safely.

## Building Updates
Run the build in the private repo, copy the fresh assets into `plugins/`, minify them into `dist/plugins/`, and push. jsDelivr will automatically serve the new `dist/` artifacts once the commit lands on `main`.

## License
MIT.
