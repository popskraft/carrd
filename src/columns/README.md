# Columns

Grid layout with optional Cards styling.

## Features
- **Responsive Grid**: 2-6 column layouts with breakpoints
- **Cards**: Auto-styled items with padding, radius, backgrounds
- **Flexible Widths**: Custom column widths via classes

## Carrd Admin Settings
1. Add class `.grid-2` to `.grid-6` to consecutive containers
2. For cards: add class `.cards` to a container
3. Optional: use `data-padding`, `data-color` attributes


## Configuration

```html
<script>
window.CarrdPluginOptions = {
    columns: {
        gridClasses: ['grid-2', 'grid-3', 'grid-4', 'grid-5', 'grid-6'],
        cardSelector: '.cards',
        defaultCardBg: 'var(--mini-card-bg-default)',
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
    --mini-card-padding: 2rem;
    --mini-card-padding-mobile: 1rem;
    --mini-card-border-radius: 0;
    --mini-card-bg-default: #f5f5f5;
    --mini-grid-row-gap: 1rem;
    --mini-grid-column-gap: 1rem;
    --mini-grid-row-gap-desktop: 2rem;
    --mini-grid-column-gap-desktop: 1.5rem;
}
```

## Data Attributes

| Attribute | Description |
|-----------|-------------|
| `data-padding` | Card padding (e.g., data-padding=2rem 3rem) |
| `data-padding-mobile` | Mobile padding |
| `data-color` | Background color for all cards |
| `data-color-1`, `data-color-2`... | Individual card colors |
