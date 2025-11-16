# No Load Waiting

## Purpose
No Load Waiting forces Carrd pages to start their animations as soon as the DOM is ready, instead of waiting for the default window load event. It removes the built-in loader, toggles the `is-ready` state, and dispatches early scroll/resize pulses so visitors see the page animate immediately.

## How to Use
1. Add the plugin assets to your Carrd site either via CDN links in the global code injection or by embedding the provided script manually with an Embed element placed near the end of the page.
2. Publish or preview; the script listens for `DOMContentLoaded`, strips loader classes or elements, and triggers the ready state automatically.
3. Optional: keep Carrd's loader enabled in the editor—the plugin will remove it on load to avoid delays.

## Manual (Step by Step)
### Option A — One-shot embed (recommended)
1. Open `dist/no-loadwaiting/example.html`.
2. In Carrd: **Embed → Code**, set **Hidden → Body End**.
3. Paste the full contents of the file; it already references the CSS/JS on jsDelivr with cache-busting query params.

### Option B — Separate CDN tags
1. **Head** embed → paste:  
   ```html
   <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/popskraft/carrd@main/dist/no-loadwaiting/style.css">
   ```
2. **Body End** embed → paste:  
   ```html
   <script src="https://cdn.jsdelivr.net/gh/popskraft/carrd@main/dist/no-loadwaiting/script.js" defer></script>
   ```

### Configuration notes
- Works with Carrd’s default loader state; you don’t need to toggle the «Show Loader» switch off manually.
- The script dispatches `resize`/`scroll` pulses immediately. If you have other plugins that react to those events, load them **after** No Load Waiting so they see the synthetic pulses.
- To temporarily disable the behavior for debugging, wrap the `<script>` tag in an HTML comment and republish.

## Known limitations & troubleshooting
1. **Video autoplay blocks ready state** – browsers may still delay animations if hero videos require user interaction. No Load Waiting can’t bypass autoplay restrictions; provide poster images for background videos.
2. **Conflicts with custom loaders** – if you built a custom loader with its own DOM ID, add `id="loader"` (or update the script manually) so the plugin can remove it. Otherwise the loader stays visible even though the rest of the page is ready.
3. **Very heavy third-party widgets** – they might re-add `with-loader` or `is-loading` classes after the plugin cleans them. In that case, include No Load Waiting near the bottom of the embed list so it runs last, or remove the conflicting snippet.
4. **Debugging** – open DevTools and check for `[warn] esbuild ...` logs only when building assets locally; the runtime script logs only if a fatal error occurs while forcing the ready state.

## Example Usage
For easy integration with Carrd, use the `example.html` file which contains ready-to-copy code for embedding:

1. Open `example.html`
2. Copy the entire code content
3. In Carrd, add ( + ) an Element → Embed with these parameters:
   - **Type**: Code
   - **Title**: No Load Waiting
   - **Style**: Hidden → Body End
   - **Code**: Paste the copied code from example.html

**Important**: Place HTML Elements at the very bottom of the page below the footer, ensuring they don't fall into containers with hidden content.

## CDN Installation
Alternatively, you can manually include the plugin files directly from CDN using two separate Embed elements:

### JavaScript Embed Element
In Carrd, add ( + ) another Element → Embed with these parameters:
   - **Type**: Code
   - **Title**: JS CDN No Load Waiting
   - **Style**: Hidden → Body End
   - **Code**:
```html
<script src="https://cdn.jsdelivr.net/gh/popskraft/carrd@main/dist/no-loadwaiting/script.js"></script>
```
