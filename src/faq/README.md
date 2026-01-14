# FAQ

Accordion-style expandable Q&A sections.

## Features
- **Accessible**: Keyboard navigation, ARIA attributes
- **Animated**: Smooth expand/collapse transitions
- **Configurable**: Multiple open, default open, custom selectors

## Carrd Admin Settings
1. Add class `.FAQContainer` to a Carrd container
2. Use **Divider** elements to separate questions
3. Add **Heading** (H1-H3) for each question
4. Content after heading becomes the answer

## Configuration

```html
<script>
window.CarrdPluginOptions = {
    faq: {
        containerSelector: '.FAQContainer',
        dividerSelector: 'hr.divider-component',
        headerTags: ['H1', 'H2', 'H3'],
        allowMultipleOpen: false,
        defaultOpen: false
    }
};
</script>
```

### Options

| Option | Default | Description |
|--------|---------|-------------|
| `containerSelector` | `.FAQContainer` | FAQ container selector |
| `dividerSelector` | `hr.divider-component` | Question divider selector |
| `headerTags` | `['H1','H2','H3']` | Tags treated as questions |
| `allowMultipleOpen` | `false` | Allow multiple answers open |
| `defaultOpen` | `false` | Open first question by default |

## CSS Variables

```css
:root {
    --theme-faq-spacing: 0.75rem;
    --theme-faq-icon-size: 1.75rem;
    --theme-faq-icon-color: var(--theme-color-primary);
}
```
