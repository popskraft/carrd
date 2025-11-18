# No Loadwaiting

## What is it?
Plugin that forces Carrd pages into the `is-ready` state right after `DOMContentLoaded`, hiding the built-in loader and firing synthetic `scroll`/`resize` pulses so animations start immediately.

## Why use it
Removes the default “black screen” delay for sites that keep Carrd’s loader enabled, letting hero blocks and custom scripts animate instantly without toggling the loader per project.

## How to use it
1. **Pick your injection method.** The quickest option is to drop the bundled snippet from `dist/no-loadwaiting/example.html`, though you can embed separate CDN tags if you prefer.
2. **Option A — single embed (recommended).**
   1. Open `dist/no-loadwaiting/example.html`.
   2. In Carrd add **Embed → Code** and set **Hidden → Body End**.
   3. Paste the entire file contents; the jsDelivr links are already included.
3. **Option B — standalone CDN tags.**
   - Head →  
     ```html
     <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/popskraft/carrd@main/dist/no-loadwaiting/style.css">
     ```
   - Body End →  
     ```html
     <script src="https://cdn.jsdelivr.net/gh/popskraft/carrd@main/dist/no-loadwaiting/script.js" defer></script>
     ```
4. **Publish the site.** The script removes loader DOM/classes, toggles `is-ready`, dispatches `scroll`/`resize` for downstream plugins, and reveals the page right away. Keep the Carrd loader enabled in the editor—the plugin takes care of it on load.

## Notes and limitations
1. **Video autoplay.** Browsers can still pause animations if hero videos require interaction. Provide poster images or user controls when autoplay is blocked.
2. **Custom loaders.** If you built your own loader element with a custom ID, add `id="loader"` (or edit the script) so the plugin can remove it.
3. **Heavy third-party widgets.** Some snippets reapply `with-loader`/`is-loading`. Place No Loadwaiting last in Body End so it executes after other scripts.
4. **Temporarily disabling.** Wrap the `<script>` tag in an HTML comment and republish when you need to pause the behavior for debugging.
