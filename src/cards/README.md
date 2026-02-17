# Cards

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
