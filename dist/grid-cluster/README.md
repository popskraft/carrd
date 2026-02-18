# Grid Cluster

## Version

- Version: `0.1.12`
- Build date (UTC): `2026-02-18`

## Quick Start (Beginner-Friendly)

> **Note:** This plugin requires `theme-design-tokens.css` and `theme-ui.css` to be loaded first. These files contain essential CSS variables and shared UI styles used by all theme plugins.

1. In Carrd, click **+ Add Element**.
2. Choose **Embed → Code**.
3. In **Hidden → Head**, add the **Theme CSS** first, then the **Theme UI CSS**, then the **Plugin CSS** (see **Installation** below).
4. In **Hidden → Body End**, add the **Plugin JS** (see **Installation** below).
5. Publish the site and refresh the page.

Optional: if you want a single snippet, open
`dist/grid-cluster/grid-cluster-embed.html`, copy everything, and paste it
into **Hidden → Body End**. Note: you still need `theme-design-tokens.css` and `theme-ui.css` in HEAD.

**Configuration (Optional):**

To customize plugin behavior, add `window.CarrdPluginOptions` **before** plugin scripts:

```html
<!-- BODY END: Configuration -->
<script>
window.CarrdPluginOptions = {
  grid-cluster: {
    // See Configuration section below for all options
  }
};
</script>

<!-- BODY END: Plugin script -->
<script src="...grid-cluster.min.js"></script>
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
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/popskraft/carrd@main/dist/grid-cluster/grid-cluster.min.css">
```

<!-- BODY END -->
```html
<script src="https://cdn.jsdelivr.net/gh/popskraft/carrd@main/dist/grid-cluster/grid-cluster.min.js"></script>
```

---

Wraps consecutive Carrd grid containers into responsive layout clusters.

> Included in `theme-core`. Also supports legacy fallback from `window.CarrdPluginOptions.columns` (`gridClasses`, `widthClasses`, `grid.enabled`) for migration safety.

## Carrd Admin Settings
1. Add one of `.grid-2`, `.grid-3`, `.grid-4`, `.grid-5`, `.grid-6` to consecutive containers.
2. Optional: add `.grid-sm-2` to any container in the cluster for two columns on mobile.
3. Optional: add `.justify` to the first container in a cluster to propagate justify layout.
4. Optional: add width classes (`.w-20`, `.w-25`, `.w-30`, `.w-40`, `.w-50`, `.w-60`, `.w-70`, `.w-75`, `.w-80`) on first-row items.

## Configuration

```html
<script>
window.CarrdPluginOptions = {
    gridCluster: {
        enabled: true,
        gridClasses: ['grid-2', 'grid-3', 'grid-4', 'grid-5', 'grid-6'],
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
| `enabled` | `true` | Enable/disable grid cluster processing |
| `gridClasses` | `['grid-2'...'grid-6']` | Classes used for cluster detection |
| `widthClasses` | `{ 'w-20': '20%' ... }` | Map of class names to desktop width values |

## CSS Variables

```css
:root {
    --theme-grid-row-gap: 1rem;
    --theme-grid-column-gap: 1rem;
    --theme-grid-column-gap-sm: 0.5rem;
    --theme-grid-row-gap-desktop: 2rem;
    --theme-grid-column-gap-desktop: 1.5rem;
    --theme-grid-column-gap-desktop-large: 2rem;
}
```

## Notes

- Clusters are created only from consecutive siblings with the same `grid-*` size.
- Width overrides from `w-*` classes are applied using the first row of the cluster.
- Plugin marks processed elements with `data-grid-initialized="true"` to avoid duplicate re-processing.

---

## Troubleshooting

- **Styles look broken or missing colors:** Make sure `theme-design-tokens.css` and `theme-ui.css` are loaded **before** the plugin CSS.
- Nothing happens: confirm the class name or selector in **Carrd Admin Settings** matches your Carrd elements.
- Styles missing: CSS must be in **Hidden → Head**, not in **Body End**.
- Config not applied: `window.CarrdPluginOptions` must be defined **before** the plugin `<script>` tag. Check browser console for errors.
- To see all available options: open `dist/theme-config.js` or check the Configuration section.
- Embed not available: you may need a Carrd plan that supports **Embed → Code**.
- CDN blocked: try opening the CDN URL directly and confirm it loads.
