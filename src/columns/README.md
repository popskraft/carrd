# Columns (DEPRECATED)

> **Status:** Legacy compatibility plugin.
> **Bundle policy:** Not included in `theme-core` bundle.
> **Recommended replacement:** `Grid Cluster` + `Cards`.
> Keep this plugin only for existing sites that already rely on `window.CarrdPluginOptions.columns`.

Grid layout with optional Cards styling.

## Features
- **Responsive Grid**: 2-6 column layouts with breakpoints
- **Cards**: Auto-styled items with padding, radius, backgrounds
- **Flexible Widths**: Custom column widths via classes
- **Justify Propagation**: If first container in a grid cluster has `.justify`, plugin applies `.justify` to all containers in that cluster

## Migration

- Recommended split:
  - Grid behavior -> `grid-cluster` plugin (`window.CarrdPluginOptions.gridCluster`)
  - Cards behavior -> `cards` plugin (`window.CarrdPluginOptions.cards`)
- Keep `columns` only for backward compatibility on existing sites.

## Carrd Admin Settings
1. Add class `.grid-2` to `.grid-6` to consecutive containers
2. Mobile two-column: add class `.grid-sm-2` to any block in the same grid cluster
3. For cards: add class `.cards` to a container
4. Optional: add `.justify` to the first container in a grid cluster to apply justify layout to the full cluster
5. Optional: use `data-padding`, `data-color` attributes


## Configuration

```html
<script>
window.CarrdPluginOptions = {
    columns: {
        gridClasses: ['grid-2', 'grid-3', 'grid-4', 'grid-5', 'grid-6'],
        cardSelector: '.cards',
        defaultCardBg: 'var(--theme-card-bg-default)',
        grid: {
            enabled: true
        },
        cards: {
            enabled: true
        },
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
| `grid.enabled` | `true` | Enable/disable grid cluster processing |
| `cards.enabled` | `true` | Enable/disable cards processing |
| `widthClasses` | `{ 'w-20': '20%' ... }` | Map of class names to width percentages |

### Feature Flags

Use these flags when you want only one behavior from this plugin:

```javascript
window.CarrdPluginOptions = {
    columns: {
        grid: { enabled: true },
        cards: { enabled: false } // Grid only
    }
};
```

```javascript
window.CarrdPluginOptions = {
    columns: {
        grid: { enabled: false },
        cards: { enabled: true } // Cards only
    }
};
```

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
| `data-border-color-1`, `data-border-color-2`... | Per-card border color override |

## Built-in Utility Styles

Columns plugin includes this utility rule by default (no custom-theme CSS required):

```css
.container-component.justify,
.container-component.justify .wrapper {
  display: flex;
}
```
