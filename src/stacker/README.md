# Stacker

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
