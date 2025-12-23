# Modal

A plugin for displaying modal dialogs from Carrd container components.

## Features

- **Trigger by Link**: Click any element with `href="#modalId"` to open the modal
- **Centered Display**: Modals appear centered with smooth animation
- **Unified Overlay**: Same backdrop design as Shopping Cart plugin
- **Close Options**: Click overlay, press Escape, or use close button
- **Body Scroll Lock**: Prevents background scrolling when modal is open
- **Mobile Optimized**: Slide-up animation on mobile devices
- **Instant Hide**: Modals are hidden before content loads (no flash)

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

## Installation

### As Part of Mini Theme (Recommended)

All plugins work together with shared configuration:

```html
<!-- HEAD -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/popskraft/carrd@main/dist/mini-core.min.css">

<!-- BODY END -->
<script src="https://cdn.jsdelivr.net/gh/popskraft/carrd@main/dist/mini-core.min.js"></script>
```

### Standalone Plugin

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/popskraft/carrd@main/dist/modal/modal.min.css">
<script src="https://cdn.jsdelivr.net/gh/popskraft/carrd@main/dist/modal/modal.min.js"></script>
```

### Instant Hide (Recommended for HEAD)

To prevent modals from flashing before CSS loads, add this to `<head>`:

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
    --mini-modal-overlay-bg: var(--mini-overlay-bg, rgba(218, 225, 228, 0.792));
    
    /* Modal Box */
    --mini-modal-max-width: 600px;
    --mini-modal-max-height: 90vh;
    --mini-modal-padding: 1rem;
    
    /* Close Button */
    --mini-modal-close-size: 32px;
    --mini-modal-close-bg: rgba(0, 0, 0, 0.1);
    --mini-modal-close-hover-bg: rgba(0, 0, 0, 0.2);
    --mini-modal-close-color: currentColor;
    --mini-modal-close-top: 1rem;
    --mini-modal-close-right: 1rem;
    
    /* Mobile */
    --mini-modal-padding-mobile: 0.5rem;
    --mini-modal-max-height-mobile: 85vh;
    --mini-modal-border-radius-mobile: 1rem 1rem 0 0;
}
```

## Adding to Theme CSS

Add these variables to `carrd-theme.css`:

```css
:root {
    /* Modal */
    --mini-modal-overlay-bg: var(--mini-overlay-bg);
    --mini-modal-max-width: 600px;
    --mini-modal-close-bg: rgba(255, 255, 255, 0.2);
    --mini-modal-close-hover-bg: rgba(255, 255, 255, 0.3);
}
```
