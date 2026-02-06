# Typography

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
