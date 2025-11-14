# Container to Grid Converter

## Purpose
In Carrd you can merge consecutive containers into a single grid spanning 2–6 columns. Assign each container the matching class (grid-2 … grid-6, and grid-sm-2 if needed) and place them back-to-back. The grid ends automatically where the sequence of containers stops.

## How to Use
1. Add Carrd Container elements with any design and add class such as `grid-2` through `grid-6` (and second class `grid-sm-2` when a two-column mobile layout is needed).
2. Place those Containers consecutively; the plugin detects adjacent grids and wraps them in a unified `.custom-grid-container` with the proper column count.
3. Publish the page with either CDN injection or a manual embed so the script runs at page load and restructures the grids automatically.

[[ADD MANUAL HERE]]
