# Carrd Plugins (Mini Theme)

A collection of lightweight plugins for Carrd sites.

## Quick Start (CDN)

Add to your Carrd site via **Embed** elements:

**HEAD** (Embed → Code → Hidden Head):
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/popskraft/carrd@main/dist/mini-core.min.css">
```

**BODY END** (Embed → Code → Hidden Body End):
```html
<script src="https://cdn.jsdelivr.net/gh/popskraft/carrd@main/dist/mini-core.min.js"></script>
```

---

## Configuration (Optional)

Plugins work out-of-the-box. To customize them, use the separate config files provided in `dist/`.

### 1. Customize Appearance (CSS)

Use `dist/carrd-theme.css` as a template.
1. Open [carrd-theme.css](dist/carrd-theme.css).
2. Copy the variables you want to change.
3. Paste them into a **HEAD** Embed element:

```html
<style>
/* Paste configuration from carrd-theme.css here */
:root {
    --mini-color-primary: #ff0000; /* Example: Changed to Red */
    --mini-card-padding: 3rem;
}
</style>
```

### 2. Customize Behavior (JS)

Use `dist/carrd-config.js` as a template.
1. Open [carrd-config.js](dist/carrd-config.js).
2. Copy the options object.
3. Paste it into a **BODY END** Embed element (BEFORE the plugin script):

```html
<script>
/* Paste configuration from carrd-config.js here */
window.CarrdPluginOptions = {
    shoppingCart: {
        currency: '€',
        position: 'bottom-left'
    },
    faq: {
        allowMultipleOpen: true
    }
};
</script>

<!-- Main Plugin Script follows -->
<script src="https://cdn.jsdelivr.net/gh/popskraft/carrd@main/dist/mini-core.min.js"></script>
```

---

## Included Plugins

| Plugin | Feature |
|--------|---------|
| **Shopping Cart** | `dist/shopping-cart/` |
| **FAQ** | `dist/faq/` |
| **Columns** | `dist/columns/` |
| **No-loadwaiting** | `dist/no-loadwaiting/` |
| **Modal** | `dist/modal/` |
| **Slider** | `dist/slider/` |

Note: `no-loadwaiting` is not included in the `mini-core` bundle. Use its standalone script.

---

## Standalone Usage

If you don't need the full bundle, you can use individual plugins:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/popskraft/carrd@main/dist/faq/faq.min.css">
<script src="https://cdn.jsdelivr.net/gh/popskraft/carrd@main/dist/faq/faq.min.js"></script>
```

## File Structure

```
dist/
├── mini-core.min.js       # Core plugins bundled (excludes no-loadwaiting)
├── mini-core.min.css      # Core styles bundled (excludes no-loadwaiting)
├── carrd-config.js        # CONFIG TEMPLATE (Copy content to Embed)
├── carrd-theme.css        # THEME TEMPLATE (Copy content to Embed)
└── [plugin]/              # Standalone files
```
