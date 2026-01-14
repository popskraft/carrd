# Modal

## Version

- Version: `0.1.3`
- Build date (UTC): `2026-01-14`

## Quick Start (Beginner-Friendly)

> **Note:** This plugin requires `theme-design-tokens.css` and `theme-ui.css` to be loaded first. These files contain essential CSS variables and shared UI styles used by all Mini theme plugins.

1. In Carrd, click **+ Add Element**.
2. Choose **Embed → Code**.
3. In **Hidden → Head**, add the **Theme CSS** first, then the **Theme UI CSS**, then the **Plugin CSS** (see **Installation** below).
4. In **Hidden → Body End**, add the **Plugin JS** (see **Installation** below).
5. Publish the site and refresh the page.

Optional: if you want a single snippet, open
`dist/modal/modal-embed.html`, copy everything, and paste it
into **Hidden → Body End**. Note: you still need `theme-design-tokens.css` in HEAD.

**Configuration (Optional):**

To customize plugin behavior, add `window.CarrdPluginOptions` **before** plugin scripts:

```html
<!-- BODY END: Configuration -->
<script>
window.CarrdPluginOptions = {
  modal: {
    // See Configuration section below for all options
  }
};
</script>

<!-- BODY END: Plugin script -->
<script src="...modal.min.js"></script>
```

For all available options, see [theme-config.js](../theme-config.js) or the Configuration section below.

---

## Installation

### As Part of Mini Theme

```html
<!-- HEAD -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/popskraft/carrd@main/dist/theme-design-tokens.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/popskraft/carrd@main/dist/theme-ui.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/popskraft/carrd@main/dist/mini-core.min.css">

<!-- BODY END -->
<script src="https://cdn.jsdelivr.net/gh/popskraft/carrd@main/dist/mini-core.min.js"></script>
```

### Standalone

<!-- HEAD -->
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/popskraft/carrd@main/dist/theme-design-tokens.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/popskraft/carrd@main/dist/theme-ui.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/popskraft/carrd@main/dist/modal/modal.min.css">
```

<!-- BODY END -->
```html
<script src="https://cdn.jsdelivr.net/gh/popskraft/carrd@main/dist/modal/modal.min.js"></script>
```

---

A plugin for displaying modal dialogs from Carrd container components.

## Features

- **Trigger by Link**: Click any element with `href="#modalId"` to open the modal
- **Centered Display**: Modals appear centered with smooth animation
- **Unified Overlay**: Same backdrop design as Shopping Cart plugin
- **Close Options**: Click overlay, press Escape, or use close button
- **Body Scroll Lock**: Prevents background scrolling when modal is open
- **Mobile Optimized**: Slide-up animation on mobile devices
- **Instant Hide**: Modals are hidden before content loads (no flash)

## Carrd Admin Settings

1. Create a Carrd container and add the class `modal`.
2. Give it a unique ID (for example `modalContact`).
3. Add a link or button that points to the modal ID, for example:
   `href="#modalContact"` or `data-modal="modalContact"`.

## HTML Structure

Modals are standard Carrd container components with class `modal` and a unique ID:

```html
<div id="modalContact" class="container-component instance-11 style-5 modal default">
    <div class="wrapper">
        <div class="inner">
            <!-- Modal content here -->
            <p>Your modal content</p>
        </div>
    </div>
</div>
```

### Trigger Elements

Any link with `href` pointing to the modal ID:

```html
<a href="#modalContact">Open Contact Modal</a>
<button data-modal="modalContact">Open Modal</button>
```

## Optional: Instant Hide

To prevent modals from flashing before CSS loads, add this to **Hidden → Head**:

```html
<style>.container-component.modal { display: none !important; }</style>
```

## Configuration

Add BEFORE the main script:

```html
<script>
window.CarrdPluginOptions = {
    modal: {
        closeOnOverlay: true,    // Close when clicking overlay
        closeOnEscape: true,     // Close when pressing Escape
        showCloseButton: true,   // Show close button
        lockBodyScroll: true     // Lock body scroll when open
    }
};
</script>
```

### Options

| Option | Default | Description |
|--------|---------|-------------|
| `closeOnOverlay` | `true` | Close modal when clicking the overlay |
| `closeOnEscape` | `true` | Close modal when pressing Escape key |
| `showCloseButton` | `true` | Show close button inside modal |
| `lockBodyScroll` | `true` | Prevent body scroll when modal is open |

## JavaScript API

```javascript
// Open a modal
ModalPlugin.open('modalContact');

// Close current modal
ModalPlugin.close();

// Toggle modal
ModalPlugin.toggle('modalContact');

// Check if modal is open
ModalPlugin.isOpen(); // Any modal
ModalPlugin.isOpen('modalContact'); // Specific modal
```

## CSS Variables

```css
:root {
    /* Overlay */
    --mini-modal-overlay-bg: var(--mini-overlay-bg);
    
    /* Modal Box */
    --mini-modal-max-width: 600px;
    --mini-modal-max-height: 90vh;
    --mini-modal-padding: 1rem;
    
    /* Close Button */
    --mini-modal-close-size: var(--mini-ui-control-size);
    --mini-modal-close-bg: var(--mini-ui-control-bg);
    --mini-modal-close-hover-bg: var(--mini-ui-control-bg-hover);
    --mini-modal-close-color: var(--mini-ui-control-color);
    --mini-modal-close-top: 1rem;
    --mini-modal-close-right: 1rem;
    
    /* Mobile */
    --mini-modal-padding-mobile: 0.5rem;
    --mini-modal-max-height-mobile: 85vh;
    --mini-modal-border-radius-mobile: 1rem 1rem 0 0;
}
```

## Adding to Theme CSS

Add these variables to `theme-design-tokens.css`:

```css
:root {
    /* Modal */
    --mini-modal-overlay-bg: var(--mini-overlay-bg);
    --mini-modal-max-width: 600px;
    --mini-modal-close-bg: var(--mini-ui-control-bg);
    --mini-modal-close-hover-bg: var(--mini-ui-control-bg-hover);
}
```

---

## Troubleshooting

- **Styles look broken or missing colors:** Make sure `theme-design-tokens.css` and `theme-ui.css` are loaded **before** the plugin CSS.
- Nothing happens: confirm the class name or selector in **Carrd Admin Settings** matches your Carrd elements.
- Styles missing: CSS must be in **Hidden → Head**, not in **Body End**.
- Config not applied: `window.CarrdPluginOptions` must be defined **before** the plugin `<script>` tag. Check browser console for errors.
- To see all available options: open `dist/theme-config.js` or check the Configuration section.
- Embed not available: you may need a Carrd plan that supports **Embed → Code**.
- CDN blocked: try opening the CDN URL directly and confirm it loads.
