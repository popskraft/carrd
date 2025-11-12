# Grid Cluster

## Purpose
Grid Cluster turns consecutive Carrd grid blocks into cohesive, responsive containers so layouts stay aligned across breakpoints. It solves uneven spacing by applying a shared wrapper, keeps image widths constrained, and respects optional `grid-sm-2` rules for smaller screens.

## How to Use
1. Add Carrd elements with classes such as `grid-2` through `grid-6` (and `grid-sm-2` when a two-column mobile layout is needed).
2. Place those grid blocks consecutively; the plugin detects adjacent grids and wraps them in a unified `.custom-grid-container` with the proper column count.
3. Publish the page with either CDN injection or a manual embed so the script runs at page load and restructures the grids automatically.

[[ADD MANUAL HERE]]
