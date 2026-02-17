# Grid Cluster

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
