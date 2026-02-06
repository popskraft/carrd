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
CarrdModal.open('modalContact');

// Close current modal
CarrdModal.close();

// Toggle modal
CarrdModal.toggle('modalContact');

// Check if modal is open
CarrdModal.isOpen(); // Any modal
CarrdModal.isOpen('modalContact'); // Specific modal
```

## CSS Variables

```css
:root {
    /* Overlay */
    --theme-modal-overlay-bg: var(--theme-overlay-bg);
    
    /* Modal Box */
    --theme-modal-max-width: 600px;
    --theme-modal-max-height: 90vh;
    --theme-modal-padding: 1rem;
    
    /* Close Button */
    --theme-modal-close-size: var(--theme-ui-control-size);
    --theme-modal-close-bg: var(--theme-ui-control-bg);
    --theme-modal-close-hover-bg: var(--theme-ui-control-bg-hover);
    --theme-modal-close-color: var(--theme-ui-control-color);
    --theme-modal-close-top: 1rem;
    --theme-modal-close-right: 1rem;
    
    /* Mobile */
    --theme-modal-padding-mobile: 0.5rem;
    --theme-modal-max-height-mobile: 85vh;
    --theme-modal-border-radius-mobile: 1rem 1rem 0 0;
}
```

## Adding to Theme CSS

Add these variables to `theme-design-tokens.css`:

```css
:root {
    /* Modal */
    --theme-modal-overlay-bg: var(--theme-overlay-bg);
    --theme-modal-max-width: 600px;
    --theme-modal-close-bg: var(--theme-ui-control-bg);
    --theme-modal-close-hover-bg: var(--theme-ui-control-bg-hover);
}
```
