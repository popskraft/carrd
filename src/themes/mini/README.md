# Mini

## What is it?
Base CSS layer for the Mini theme family that declares shared `--mini-*` tokens covering color, motion, and focus across every Mini plugin.

## Why use it
Keeps Mini plugins (FAQ, Grid Cluster, etc.) visually consistent and makes recoloring easy—override a token once instead of editing each plugin stylesheet.

## How to use it
1. In Carrd add an **Embed → Code** block targeting **Head** and paste:  
   ```html
   <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/popskraft/carrd@main/dist/themes/mini/style.css">
   ```
2. The file does **not** change native Carrd classes; it only registers tokens. If you need a global hook such as `body.is-theme-mini`, add it with your own snippet after loading this base layer.
3. Customize the palette by overriding variables after the include:
   ```html
   <style>
     :root {
       --mini-color-primary: #61dafb;
       --mini-focus-outline-color: rgba(97, 218, 251, 0.75);
     }
   </style>

Override tokens after loading `themes/mini/style.css` to recolor every Mini plugin instantly.
