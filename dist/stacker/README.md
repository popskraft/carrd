# Stacker

## Version

- Version: `0.1.13`
- Build date (UTC): `2026-03-14`

## Quick Start (Beginner-Friendly)

> **Note:** This plugin requires `theme-design-tokens.css` and `theme-ui.css` to be loaded first. These files contain essential CSS variables and shared UI styles used by all theme plugins.

1. In Carrd, click **+ Add Element**.
2. Choose **Embed → Code**.
3. In **Hidden → Head**, add the **Theme CSS** first, then the **Theme UI CSS**, then the **Plugin CSS** (see **Installation** below).
4. In **Hidden → Body End**, add the **Plugin JS** (see **Installation** below).
5. Publish the site and refresh the page.

Optional: if you want a single snippet, open
`dist/stacker/stacker-embed.html`, copy everything, and paste it
into **Hidden → Body End**. Note: you still need `theme-design-tokens.css` and `theme-ui.css` in HEAD.

**Configuration (Optional):**

To customize plugin behavior, add `window.CarrdPluginOptions` **before** plugin scripts:

```html
<!-- BODY END: Configuration -->
<script>
window.CarrdPluginOptions = {
  stacker: {
    // See Configuration section below for all options
  }
};
</script>

<!-- BODY END: Plugin script -->
<script src="...stacker.min.js"></script>
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
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/popskraft/carrd@main/dist/stacker/stacker.min.css">
```

<!-- BODY END -->
```html
<script src="https://cdn.jsdelivr.net/gh/popskraft/carrd@main/dist/stacker/stacker.min.js"></script>
```

---

Clusters consecutive Carrd containers into a sticky stack where each next card rises from below, covers the previous one, and the whole cluster releases when its bottom edge leaves the viewport.

> Included in `theme-core`.

## Features

- **Auto-clustering**: Consecutive `.stacker` containers are wrapped automatically
- **Sticky overlay flow**: Each next container pins to the same top line and visually replaces the previous one
- **Responsive spacing**: Supports breakpoint-specific `gap` and `top` offsets
- **Per-instance overrides**: Optional `data-stacker-id` on the first container in a cluster

## Carrd Admin Settings
1. Add class `.stacker` to each consecutive container that should belong to the same stack.
2. Keep the stacker containers next to each other in the DOM without unrelated elements between them.
3. Optional: add `data-stacker-id="process"` on the first container of a cluster for per-instance settings.
4. Optional: set `top` to your sticky header height if cards should stop below a fixed navigation bar.

## Configuration

```html
<script>
window.CarrdPluginOptions = {
    stacker: {
        enabled: true,
        selector: '.stacker',
        top: 0,
        gap: null,
        zIndexBase: 10,
        breakpoints: {
            737: { gap: 24 },
            1280: { gap: 32 }
        },
        instances: {
            process: {
                top: 0,
                breakpoints: {
                    737: { gap: 24 },
                    1280: { gap: 32 }
                }
            }
        }
    }
};
</script>
```

### Options

| Option | Default | Description |
|--------|---------|-------------|
| `enabled` | `true` | Enable/disable stack processing |
| `selector` | `.stacker` | Selector used to find stack items |
| `top` | `0` | Sticky top offset in px |
| `gap` | `null` | Gap between items in px. `null` keeps the measured Carrd spacing |
| `zIndexBase` | `10` | Base z-index for the first stacked item |
| `breakpoints` | `{}` | Responsive overrides for `top` and `gap` |
| `instances` | `{}` | Per-cluster overrides keyed by `data-stacker-id` |

## Runtime API

```javascript
window.CarrdStacker = {
    init,
    destroyAll,
    destroyById,
    getInstances
};
```

Notes:
- `destroyById('process')` works only if the first container in that cluster has `data-stacker-id="process"`.
- `getInstances()` returns internal cluster instances for advanced/manual control.

## CSS Variables

```css
:root {
    --theme-stacker-gap: 1rem;
    --theme-stacker-top: 0px;
}
```

## How It Works

- The plugin scans for consecutive `.stacker` siblings.
- It creates one wrapper around that sequence.
- Every stacked item becomes `position: sticky` with the same `top` value.
- Later items get higher `z-index`, so they naturally cover earlier ones while scrolling.
- When the wrapper bottom reaches the sticky boundary, the whole stack scrolls away as one cluster.

---

## Troubleshooting

- **Styles look broken or missing colors:** Make sure `theme-design-tokens.css` and `theme-ui.css` are loaded **before** the plugin CSS.
- Nothing happens: confirm the class name or selector in **Carrd Admin Settings** matches your Carrd elements.
- Styles missing: CSS must be in **Hidden → Head**, not in **Body End**.
- Config not applied: `window.CarrdPluginOptions` must be defined **before** the plugin `<script>` tag. Check browser console for errors.
- To see all available options: open `dist/theme-config.js` or check the Configuration section.
- Embed not available: you may need a Carrd plan that supports **Embed → Code**.
- CDN blocked: try opening the CDN URL directly and confirm it loads.
