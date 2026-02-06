# Columns

## Version

- Version: `0.1.8a`
- Build date (UTC): `2026-02-05`

## Quick Start (Beginner-Friendly)

> **Note:** This plugin requires `theme-design-tokens.css` and `theme-ui.css` to be loaded first. These files contain essential CSS variables and shared UI styles used by all theme plugins.

1. In Carrd, click **+ Add Element**.
2. Choose **Embed → Code**.
3. In **Hidden → Head**, add the **Theme CSS** first, then the **Theme UI CSS**, then the **Plugin CSS** (see **Installation** below).
4. In **Hidden → Body End**, add the **Plugin JS** (see **Installation** below).
5. Publish the site and refresh the page.

Optional: if you want a single snippet, open
`dist/columns/columns-embed.html`, copy everything, and paste it
into **Hidden → Body End**. Note: you still need `theme-design-tokens.css` and `theme-ui.css` in HEAD.

**Configuration (Optional):**

To customize plugin behavior, add `window.CarrdPluginOptions` **before** plugin scripts:

```html
<!-- BODY END: Configuration -->
<script>
window.CarrdPluginOptions = {
  columns: {
    // See Configuration section below for all options
  }
};
</script>

<!-- BODY END: Plugin script -->
<script src="...columns.min.js"></script>
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
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/popskraft/carrd@main/dist/columns/columns.min.css">
```

<!-- BODY END -->
```html
<script src="https://cdn.jsdelivr.net/gh/popskraft/carrd@main/dist/columns/columns.min.js"></script>
```

---

Grid layout with optional Cards styling.

## Features
- **Responsive Grid**: 2-6 column layouts with breakpoints
- **Cards**: Auto-styled items with padding, radius, backgrounds
- **Flexible Widths**: Custom column widths via classes

## Carrd Admin Settings
1. Add class `.grid-2` to `.grid-6` to consecutive containers
2. Mobile two-column: add class `.grid-sm-2` to any block in the same grid cluster
3. For cards: add class `.cards` to a container
4. Optional: use `data-padding`, `data-color` attributes


## Configuration

```html
<script>
window.CarrdPluginOptions = {
    columns: {
        gridClasses: ['grid-2', 'grid-3', 'grid-4', 'grid-5', 'grid-6'],
        cardSelector: '.cards',
        defaultCardBg: 'var(--theme-card-bg-default)',
        widthClasses: {
            'w-20': '20%',
            'w-25': '25%',
            'w-30': '33%',
            'w-40': '40%',
            'w-50': '50%',
            'w-60': '60%',
            'w-70': '67%',
            'w-75': '75%',
            'w-80': '80%'
        }
    }
};
</script>
```

### Options

| Option | Default | Description |
|--------|---------|-------------|
| `gridClasses` | `['grid-2'...'grid-6']` | Classes for grid detection |
| `cardSelector` | `.cards` | Cards container selector |
| `defaultCardBg` | CSS variable | Default card background |
| `widthClasses` | `{ 'w-20': '20%' ... }` | Map of class names to width percentages |

## CSS Variables

```css
:root {
    --theme-card-padding: 2rem;
    --theme-card-padding-mobile: 1rem;
    --theme-card-border-radius: 0;
    --theme-card-bg-default: var(--theme-color-primary-light);
    --theme-grid-row-gap: 1rem;
    --theme-grid-column-gap: 1rem;
    --theme-grid-row-gap-desktop: 2rem;
    --theme-grid-column-gap-desktop: 1.5rem;
    --theme-grid-column-gap-desktop-large: 2rem;
}
```

## Data Attributes

| Attribute | Description |
|-----------|-------------|
| `data-padding` | Card padding (e.g., data-padding=2rem 3rem) |
| `data-padding-mobile` | Mobile padding |
| `data-color` | Background color for all cards |
| `data-color-1`, `data-color-2`... | Individual card colors |

---

## Troubleshooting

- **Styles look broken or missing colors:** Make sure `theme-design-tokens.css` and `theme-ui.css` are loaded **before** the plugin CSS.
- Nothing happens: confirm the class name or selector in **Carrd Admin Settings** matches your Carrd elements.
- Styles missing: CSS must be in **Hidden → Head**, not in **Body End**.
- Config not applied: `window.CarrdPluginOptions` must be defined **before** the plugin `<script>` tag. Check browser console for errors.
- To see all available options: open `dist/theme-config.js` or check the Configuration section.
- Embed not available: you may need a Carrd plan that supports **Embed → Code**.
- CDN blocked: try opening the CDN URL directly and confirm it loads.
