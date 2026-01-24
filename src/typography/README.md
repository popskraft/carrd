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

## JavaScript API

```javascript
// Re-initialize all containers
TypographyPlugin.init();

// Process a specific container
const el = document.querySelector('.txt');
TypographyPlugin.process(el);
```
