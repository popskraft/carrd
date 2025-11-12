# No Load Waiting

## Purpose
No Load Waiting forces Carrd pages to start their animations as soon as the DOM is ready, instead of waiting for the default window load event. It removes the built-in loader, toggles the `is-ready` state, and dispatches early scroll/resize pulses so visitors see the page animate immediately.

## How to Use
1. Add the plugin assets to your Carrd site either via CDN links in the global code injection or by embedding the provided script manually with an Embed element placed near the end of the page.
2. Publish or preview; the script listens for `DOMContentLoaded`, strips loader classes or elements, and triggers the ready state automatically.
3. Optional: keep Carrd's loader enabled in the editor—the plugin will remove it on load to avoid delays.

[[ADD MANUAL HERE]]
