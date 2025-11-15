# Mini Theme Base

## Purpose
Provides a single stylesheet that exposes shared color, motion, and focus tokens for every Mini plugin. When you load it once per site, plugins can inherit `--mini-*` custom properties instead of hard-coding colors or timings, which keeps them visually consistent and easier to theme.

## How to include it
1. Add the stylesheet in **Head** via an Embed → Code element:
   ```html
   <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/popskraft/carrd@main/dist/themes/mini/style.css">
   ```