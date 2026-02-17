# FAQ

Accordion-style expandable Q&A sections.

## Features
- **Accessible**: Keyboard navigation, ARIA attributes
- **Animated**: Smooth expand/collapse transitions
- **Configurable**: Multiple open, default open, custom selectors

## Carrd Admin Settings
1. Add class `.FAQContainer` to a Carrd container.
2. Inside it, build entries in this exact order:
   `Divider -> Heading (H1/H2/H3) -> Answer content`.
3. Add a **Divider before the first question** (required for parser start).
4. Repeat for each FAQ item:
   `Divider -> Heading -> Answer -> Divider -> Heading -> Answer ...`
5. Carrd path for class assignment: Element Settings -> Style -> Classes.

### Required Structure (Important)

```text
.FAQContainer
  hr.divider-component
  h2 Question 1
  p Answer 1 line 1
  p Answer 1 line 2
  hr.divider-component
  h2 Question 2
  p Answer 2
```

If a question has no preceding Divider, it will not be parsed by default logic.

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
