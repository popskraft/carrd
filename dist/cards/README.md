# Cards

## Version

- Version: `0.1.12`
- Build date (UTC): `2026-02-19`

## Quick Start (Beginner-Friendly)

> **Note:** This plugin requires `theme-design-tokens.css` and `theme-ui.css` to be loaded first. These files contain essential CSS variables and shared UI styles used by all theme plugins.

1. In Carrd, click **+ Add Element**.
2. Choose **Embed → Code**.
3. In **Hidden → Head**, add the **Theme CSS** first, then the **Theme UI CSS**, then the **Plugin CSS** (see **Installation** below).
4. In **Hidden → Body End**, add the **Plugin JS** (see **Installation** below).
5. Publish the site and refresh the page.

Optional: if you want a single snippet, open
`dist/cards/cards-embed.html`, copy everything, and paste it
into **Hidden → Body End**. Note: you still need `theme-design-tokens.css` and `theme-ui.css` in HEAD.

**Configuration (Optional):**

To customize plugin behavior, add `window.CarrdPluginOptions` **before** plugin scripts:

```html
<!-- BODY END: Configuration -->
<script>
window.CarrdPluginOptions = {
  cards: {
    // See Configuration section below for all options
  }
};
</script>

<!-- BODY END: Plugin script -->
<script src="...cards.min.js"></script>
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
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/popskraft/carrd@main/dist/cards/cards.min.css">
```

<!-- BODY END -->
```html
<script src="https://cdn.jsdelivr.net/gh/popskraft/carrd@main/dist/cards/cards.min.js"></script>
```

---

Converts columns inside a `.cards` container into styled card items.

> Included in `theme-core`. Also supports legacy fallback from `window.CarrdPluginOptions.columns` (`cardSelector`, `defaultCardBg`, `cards.enabled`) for migration safety.

## Carrd Admin Settings
1. Add class `.cards` to a container.
2. Optional: set container background, border, radius, shadow in Carrd.
3. Optional: add data attributes for padding and colors.

## Configuration

```html
<script>
window.CarrdPluginOptions = {
    cards: {
        enabled: true,
        cardSelector: '.cards',
        defaultCardBg: 'var(--theme-card-bg-default)'
    }
};
</script>
```

### Options

| Option | Default | Description |
|--------|---------|-------------|
| `enabled` | `true` | Enable/disable cards processing |
| `cardSelector` | `.cards` | Selector for cards containers |
| `defaultCardBg` | CSS variable | Background used when no explicit color/background is found |

## CSS Variables

```css
:root {
    --theme-card-padding: 2rem;
    --theme-card-padding-mobile: 1rem;
    --theme-card-border-radius: 0;
    --theme-card-bg-default: var(--theme-color-primary-light);
}
```

## Data Attributes

| Attribute | Description |
|-----------|-------------|
| `data-padding` | Card padding value(s), numeric values are treated as `rem` |
| `data-padding-mobile` | Mobile card padding value(s), numeric values are treated as `rem` |
| `data-color` | Background color for all cards |
| `data-color-1`, `data-color-2`... | Per-card background color override |
| `data-border-color-1`, `data-border-color-2`... | Per-card border color override |

---

## Troubleshooting

- **Styles look broken or missing colors:** Make sure `theme-design-tokens.css` and `theme-ui.css` are loaded **before** the plugin CSS.
- Nothing happens: confirm the class name or selector in **Carrd Admin Settings** matches your Carrd elements.
- Styles missing: CSS must be in **Hidden → Head**, not in **Body End**.
- Config not applied: `window.CarrdPluginOptions` must be defined **before** the plugin `<script>` tag. Check browser console for errors.
- To see all available options: open `dist/theme-config.js` or check the Configuration section.
- Embed not available: you may need a Carrd plan that supports **Embed → Code**.
- CDN blocked: try opening the CDN URL directly and confirm it loads.
