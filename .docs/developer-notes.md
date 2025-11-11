# Carrd Grid Cluster Developer Notes

This document explains what the published scripts do and how to rebuild the CDN-ready payload.

## Overview
- `plugins/**` contains the readable source versions of each plugin asset.
- `dist/plugins/**` mirrors the same tree but with minified output that jsDelivr serves.
- Everything in this repository should be production safe—no experimental files go here.

## Plugin Behaviors
### Grid Cluster
`plugins/mini/grid-cluster/*` holds the styling and interaction logic that drives the card clustering effect. The CSS defines the grid layout plus utility classes that Carrd elements use. The JavaScript enhances the existing DOM once Carrd finishes rendering and assumes the CSS has already loaded in the document `<head>`.

### Early Page Animation Trigger (no-loadwaiting)
`plugins/mini/no-loadwaiting/script.js` accelerates the visual readiness state:
1. Removes the `is-loading` / `with-loader` classes as soon as the DOM is ready.
2. Forces a quick `is-playing → is-ready` transition to kick off CSS animations.
3. Hides the `#loader` node if Carrd left it behind.
4. Sends several resize/scroll events (via intervals and `requestAnimationFrame`) so Carrd widgets that rely on those handlers lay out correctly without waiting for `window.onload`.
5. Uses mutation observers for ~5 seconds to strip any late `with-loader` class toggles and to watch for loader nodes being reinserted.

Keep this file lightweight—any heavy logic should live in the private working repo and be compiled down before copying here.

## Minification Workflow
1. Update the readable sources inside `plugins/**`.
2. Run the helper to emit minified copies into `dist/plugins/**`:

   ```bash
   python3 scripts/minify_plugins.py
   ```

   Optional flags:
   - `--source` (defaults to `plugins`)
   - `--dist` (defaults to `dist/plugins`)

3. Inspect `dist/plugins/...` to confirm the output and commit both the readable and minified files.
4. Push to `main`; jsDelivr will fetch from `dist/...` automatically.

Do **not** commit intermediary build artifacts—only the human-readable `plugins/**`, the minified `dist/plugins/**`, and documentation like this file.
