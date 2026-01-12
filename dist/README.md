## Version

- Version: `0.1.0`
- Build date (UTC): `2026-01-12`
- [View Changelog](CHANGELOG.md)

---

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
1. Open [carrd-theme.css](./carrd-theme.css).
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
1. Open [carrd-config.js](./carrd-config.js).
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
| **Columns** | `dist/columns/` |
| **FAQ** | `dist/faq/` |
| **Modal** | `dist/modal/` |
| **No-loadwaiting** | `dist/no-loadwaiting/` |
| **Shopping Cart** | `dist/shopping-cart/` |
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


---

## Step-by-Step for Beginners (Quick Summary)

1. In Carrd, click **+ Add Element**.
2. Choose **Embed → Code**.
3. Add the **CSS** snippet in **Hidden → Head**.
4. Add the **JS** snippet in **Hidden → Body End**.
5. Publish the site and refresh the page.

Optional: if you want a single snippet, open
`dist/<plugin>/<plugin>-embed.html`, copy everything, and paste it into
**Hidden → Body End** (replace `<plugin>` with the plugin folder name).

Important: if you use `window.CarrdPluginOptions`, place it **before** the
plugin `<script>` tag.

## Glossary

- Embed → Code: Carrd element for pasting HTML snippets.
- Hidden → Head: Injects CSS or metadata in the document `<head>`.
- Hidden → Body End: Injects JS at the end of `<body>`.
- Container/Section: The blocks you add in Carrd that can receive classes.
- Class: A CSS class name you add in Carrd to target elements.

## Troubleshooting

- Nothing happens: confirm the class name or selector matches your Carrd elements.
- Styles missing: CSS must be in **Hidden → Head**, not in **Body End**.
- Config not applied: `window.CarrdPluginOptions` must appear **before** the plugin script.
- Embed not available: you need a Carrd plan that supports **Embed → Code**.
- CDN blocked: open the CDN URL directly to confirm it loads.
