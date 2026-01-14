# Carrd Plugins (Mini Theme)

## Version

- Version: `0.1.4`
- Build date (UTC): `2026-01-14`
- [View Changelog](CHANGELOG.md)

---

Lightweight plugins for Carrd sites.

## ⚠️ Required Theme Files

**All installation methods require these two theme files to be loaded first.** They provide essential CSS variables and shared UI components.

1. `dist/theme-design-tokens.css`
2. `dist/theme-ui.css`

---

## Installation Methods

### Option 1: CDN - Individual Plugins

Load only the plugins you need via CDN.

**1. Add Theme Files**

Place in **Embed Element** (Type: *Code*, Style: *Hidden*, Head):

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/popskraft/carrd@main/dist/theme-design-tokens.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/popskraft/carrd@main/dist/theme-ui.css">
```

**2. Add Plugin Files**

Place plugin CSS in **Head** and JS in **Body End**.

*Example: FAQ Plugin*

```html
<!-- Head -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/popskraft/carrd@main/dist/faq/faq.min.css">

<!-- Body End -->
<script src="https://cdn.jsdelivr.net/gh/popskraft/carrd@main/dist/faq/faq.min.js"></script>
```

### Option 2: CDN - Full Bundle (All Plugins)

Load all plugins at once (excludes no-loadwaiting).

**HEAD:**

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/popskraft/carrd@main/dist/theme-design-tokens.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/popskraft/carrd@main/dist/theme-ui.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/popskraft/carrd@main/dist/theme-core.min.css">
```

**BODY END:**

```html
<script src="https://cdn.jsdelivr.net/gh/popskraft/carrd@main/dist/theme-core.min.js"></script>
```

> [!NOTE]
> Best for sites using 3+ plugins. The bundle includes: Slider, Modal, Shopping Cart, FAQ, Columns. (No-loadwaiting is standalone only.)

### Option 3: Direct Embed (HTML Element)

Copy code directly into Carrd Embed elements. Useful to avoid external requests or modify code.

**1. Add Theme Files**

Create **Embed Element** (Type: *Code*, Style: *Hidden*, Head) and paste contents inside `<style>` tags:

```html
<style>
/* PASTE CONTENTS OF dist/theme-design-tokens.css HERE */

/* PASTE CONTENTS OF dist/theme-ui.css HERE */
</style>
```

**2. Add Plugins**

- **CSS:** Copy plugin CSS file content into `<style>` block in **Head** Embed
- **JS:** Copy plugin JS file content into `<script>` block in **Body End** Embed

### Option 4: Single Embed File (Quickest Setup)

Each plugin includes a ready-to-use embed file combining CSS + JS.

**Steps:**

1. Open `dist/<plugin>/<plugin>-embed.html` (e.g., `dist/faq/faq-embed.html`)
2. Copy entire file content
3. Paste into Carrd **Embed → Code → Hidden → Body End**

> [!IMPORTANT]
> Still requires `theme-design-tokens.css` in HEAD:
>
> ```html
> <!-- HEAD -->
> <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/popskraft/carrd@main/dist/theme-design-tokens.css">
> ```

> [!TIP]
> Embed files include only the plugin CSS/JS. You still need to load `theme-design-tokens.css` and `theme-ui.css` in HEAD.

---

## Which Installation Method?

| Method | Best For | Pros | Cons |
|--------|----------|------|------|
| **Option 1: CDN Individual** | 1-2 plugins | Small footprint, auto-updates | Multiple requests |
| **Option 2: CDN Full Bundle** | 3+ plugins | Single file, efficient | Larger if using only 1 plugin |
| **Option 3: Direct Embed** | Custom code needs | No external requests, editable | Manual updates |
| **Option 4: Embed File** | Quick testing | One snippet, fastest setup | Inline CSS (larger HTML) |

**Recommendation:** Start with **Option 4** to test, then switch to **Option 2** (bundle) or **Option 1** (individual) for production.

---

## Included Plugins

| Plugin | Path | Included in theme-core? |
| :--- | :--- | :---: |
| **Shopping Cart** | `dist/shopping-cart/` | ✅ |
| **FAQ** | `dist/faq/` | ✅ |
| **Columns** | `dist/columns/` | ✅ |
| **Modal** | `dist/modal/` | ✅ |
| **Slider** | `dist/slider/` | ✅ |
| **No-loadwaiting** | `dist/no-loadwaiting/` | ❌ Standalone only |

Each plugin folder contains:

- `README.md` - Detailed documentation
- `<plugin>.min.css` - Standalone CSS
- `<plugin>.min.js` - Standalone JS
- `<plugin>-embed.html` - Ready-to-use embed file

---

## Configuration

### Theme Customization (CSS Variables)

Override design tokens by adding a `<style>` block in **HEAD** after theme files:

```html
<style>
:root {
  --theme-color-primary: #ff0000;
  --theme-card-padding: 3rem;
  --theme-font-family: 'Your Custom Font', sans-serif;
}
</style>
```

See all available variables in [theme-design-tokens.css](dist/theme-design-tokens.css).

### Plugin Options (JavaScript)

Configure plugin behavior with `window.CarrdPluginOptions` in **BODY END** before plugin scripts:

```html
<script>
window.CarrdPluginOptions = {
  shoppingCart: {
    currency: '€',
    position: 'bottom-left'
  },
  faq: {
    allowMultipleOpen: true
  },
  slider: {
    autoplay: true,
    loop: true
  }
};
</script>
<!-- THEN load plugin scripts -->
<script src="https://cdn.jsdelivr.net/gh/popskraft/carrd@main/dist/theme-core.min.js"></script>
```

**Using Configuration File:**

For convenience, use [theme-config.js](dist/theme-config.js) as a template with all available options:

1. Open `dist/theme-config.js`
2. Copy desired plugin configurations
3. Paste into `<script>` block in **BODY END** before plugin scripts
4. Modify values as needed

> [!IMPORTANT]
> Configuration must be loaded **before** plugin scripts, otherwise default values will be used.

See all options in [theme-config.js](dist/theme-config.js) or individual plugin README files.

---

## Quick Start for Beginners

**Never used Carrd embeds?**

1. In Carrd editor, click **+ Add Element**
2. Choose **Embed → Code**
3. Select **Hidden** (not Inline/Header)
4. Choose placement:
   - **Head** = loads before page content (for CSS)
   - **Body End** = loads after page content (for JS)
5. Paste code snippets from installation method above
6. **Save embed** → **Publish site** → refresh page

**First time?** Try **Option 4: Single Embed File** - it's the fastest way to test.

For detailed setup, see individual plugin READMEs in `dist/<plugin>/README.md`.

---

## Glossary

- **Embed → Code**: Carrd element for pasting HTML snippets
- **Hidden → Head**: Injects CSS/metadata in `<head>` (loads first)
- **Hidden → Body End**: Injects JS at end of `<body>` (loads last)
- **Container/Section**: Carrd blocks that can receive classes
- **Class**: CSS class name added in Carrd to target elements (e.g., `.FAQContainer`)
- **CDN**: Content Delivery Network (jsDelivr) - loads files from external server
- **Direct Embed**: Copy-paste code directly into Carrd (no external requests)

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| **Nothing happens** | Confirm class names match Carrd elements (check plugin README for required classes) |
| **Styles missing/broken** | Ensure `theme-design-tokens.css` and `theme-ui.css` load in HEAD **before** plugin CSS |
| **Colors wrong** | Missing `theme-design-tokens.css` - it must load first |
| **Config not applied** | `window.CarrdPluginOptions` must be **before** plugin `<script>` tag |
| **Embed option unavailable** | Requires Carrd Pro plan or higher |
| **CDN blocked/slow** | Try Option 3 (Direct Embed) or Option 4 (Embed File) |
| **Console errors** | Check browser DevTools Console for specific error messages |

**Still stuck?** Check individual plugin README: `dist/<plugin>/README.md`
