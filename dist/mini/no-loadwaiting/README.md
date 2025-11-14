# No Load Waiting

## Purpose
No Load Waiting forces Carrd pages to start their animations as soon as the DOM is ready, instead of waiting for the default window load event. It removes the built-in loader, toggles the `is-ready` state, and dispatches early scroll/resize pulses so visitors see the page animate immediately.

## How to Use
1. Add the plugin assets to your Carrd site either via CDN links in the global code injection or by embedding the provided script manually with an Embed element placed near the end of the page.
2. Publish or preview; the script listens for `DOMContentLoaded`, strips loader classes or elements, and triggers the ready state automatically.
3. Optional: keep Carrd's loader enabled in the editor—the plugin will remove it on load to avoid delays.

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
<script src="https://cdn.jsdelivr.net/gh/popskraft/carrd@main/dist/mini/no-loadwaiting/script.js"></script>
```
