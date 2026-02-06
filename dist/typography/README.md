# Typography

## Version

- Version: `0.1.9`
- Build date (UTC): `2026-02-06`

## Quick Start (Beginner-Friendly)

> **Note:** This plugin requires `theme-design-tokens.css` and `theme-ui.css` to be loaded first. These files contain essential CSS variables and shared UI styles used by all theme plugins.

1. In Carrd, click **+ Add Element**.
2. Choose **Embed → Code**.
3. In **Hidden → Head**, add the **Theme CSS** first, then the **Theme UI CSS**, then the **Plugin CSS** (see **Installation** below).
4. In **Hidden → Body End**, add the **Plugin JS** (see **Installation** below).
5. Publish the site and refresh the page.

Optional: if you want a single snippet, open
`dist/typography/typography-embed.html`, copy everything, and paste it
into **Hidden → Body End**. Note: you still need `theme-design-tokens.css` and `theme-ui.css` in HEAD.

**Configuration (Optional):**

To customize plugin behavior, add `window.CarrdPluginOptions` **before** plugin scripts:

```html
<!-- BODY END: Configuration -->
<script>
window.CarrdPluginOptions = {
  typography: {
    // See Configuration section below for all options
  }
};
</script>

<!-- BODY END: Plugin script -->
<script src="...typography.min.js"></script>
```

For all available options, see [theme-config.js](../theme-config.js) or the Configuration section below.

---

## Installation

### As Part of Mini Theme

```html
<!-- HEAD -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/popskraft/carrd@main/dist/theme-design-tokens.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/popskraft/carrd@main/dist/theme-ui.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/popskraft/carrd@main/dist/theme-core.min.css">

<!-- BODY END -->
<script src="https://cdn.jsdelivr.net/gh/popskraft/carrd@main/dist/theme-core.min.js"></script>
```

### Standalone

<!-- HEAD -->
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/popskraft/carrd@main/dist/theme-design-tokens.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/popskraft/carrd@main/dist/theme-ui.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/popskraft/carrd@main/dist/typography/typography.min.css">
```

<!-- BODY END -->
```html
<script src="https://cdn.jsdelivr.net/gh/popskraft/carrd@main/dist/typography/typography.min.js"></script>
```

---

Responsive typography with Markdown-like parsing for `.txt` containers.

## Features

- **Markdown Parsing**: Converts `#`, `##`, `###`, `####` to headings
- **Lists**: Supports unordered (`-`) and ordered (`1.`) lists
- **Horizontal Rules**: `---` becomes `<hr>`
- **Responsive**: 3 breakpoints (desktop, tablet, mobile)

## Carrd Admin Settings

**Important:** You must add the class `.txt` to the Text element or container for these styles to apply.

1. Add class `.txt` to a Text element in Carrd.
2. Use Markdown-like syntax in the text content.

## Syntax Reference

| Markdown Syntax | HTML Output |
|-----------------|-------------|
| `# Heading` | `<h1>Heading</h1>` |
| `## Heading` | `<h2>Heading</h2>` |
| `### Heading` | `<h3>Heading</h3>` |
| `#### Heading` | `<h4>Heading</h4>` |
| `---` | `<hr>` |
| `- Item` | `<ul><li>Item</li></ul>` |
| `1. Item` | `<ol><li>Item</li></ol>` |

## Configuration

```html
<script>
window.CarrdPluginOptions = {
    typography: {
        containerSelector: '.txt',
        paragraphSelector: 'span.p',
        headingClasses: { h1: 'theme-typography-h1', h2: 'theme-typography-h2', h3: 'theme-typography-h3', h4: 'theme-typography-h4' },
        listClasses: { ul: 'theme-typography-ul', ol: 'theme-typography-ol', li: 'theme-typography-li' },
        hrClass: 'theme-typography-hr'
    }
};
</script>
```

### Options

| Option | Default | Description |
|--------|---------|-------------|
| `containerSelector` | `.txt` | Selector for text containers |
| `paragraphSelector` | `span.p` | Selector for paragraph spans |
| `headingClasses` | `{ h1: 'theme-typography-h1', ... }` | CSS classes for headings |
| `listClasses` | `{ ul: 'theme-typography-ul', ... }` | CSS classes for lists |
| `hrClass` | `'theme-typography-hr'` | CSS class for horizontal rules |

## JavaScript API

```javascript
// Re-initialize all containers
CarrdTypography.init();

// Process a specific container
const el = document.querySelector('.txt');
CarrdTypography.process(el);
```

## CSS Variables

```css
:root {
    --theme-color-headlines: #19355A;
    --theme-color-border: #efefef;
}
```

Typography uses shared theme tokens from `theme-design-tokens.css`. Headings inherit `--theme-color-headlines`, horizontal rules use `--theme-color-border`.

---

## Troubleshooting

- **Styles look broken or missing colors:** Make sure `theme-design-tokens.css` and `theme-ui.css` are loaded **before** the plugin CSS.
- Nothing happens: confirm the class name or selector in **Carrd Admin Settings** matches your Carrd elements.
- Styles missing: CSS must be in **Hidden → Head**, not in **Body End**.
- Config not applied: `window.CarrdPluginOptions` must be defined **before** the plugin `<script>` tag. Check browser console for errors.
- To see all available options: open `dist/theme-config.js` or check the Configuration section.
- Embed not available: you may need a Carrd plan that supports **Embed → Code**.
- CDN blocked: try opening the CDN URL directly and confirm it loads.
