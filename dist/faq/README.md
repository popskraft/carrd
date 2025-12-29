# FAQ

## Version

- Version: `0.0.0`
- Build date (UTC): `2025-12-29`

## Quick Start (Beginner-Friendly)

1. In Carrd, click **+ Add Element**.
2. Choose **Embed → Code**.
3. Add any required **CSS** in **Hidden → Head** (see **Installation** below).
4. Add required **JS** in **Hidden → Body End** (see **Installation** below).
5. Publish the site and refresh the page.

Optional: if you want a single snippet, open
`dist/faq/faq-embed.html`, copy everything, and paste it
into **Hidden → Body End**.

Important: if you use `window.CarrdPluginOptions`, place it **before** the plugin
`<script>` tag in **Hidden → Body End**.

---

## Installation

### As Part of Mini Theme

```html
<!-- HEAD -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/popskraft/carrd@main/dist/mini-core.min.css">

<!-- BODY END -->
<script src="https://cdn.jsdelivr.net/gh/popskraft/carrd@main/dist/mini-core.min.js"></script>
```

### Standalone

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/popskraft/carrd@main/dist/faq/faq.min.css">
<script src="https://cdn.jsdelivr.net/gh/popskraft/carrd@main/dist/faq/faq.min.js"></script>
```

---

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
    --mini-faq-spacing: 0.75rem;
    --mini-faq-icon-size: 1.75rem;
    --mini-faq-icon-color: var(--mini-color-primary);
}
```

---

## Troubleshooting

- Nothing happens: confirm the class name or selector in **Carrd Admin Settings** matches your Carrd elements.
- Styles missing: CSS must be in **Hidden → Head**, not in **Body End**.
- Config not applied: `window.CarrdPluginOptions` must appear **before** the plugin script.
- Embed not available: you may need a Carrd plan that supports **Embed → Code**.
- CDN blocked: try opening the CDN URL directly and confirm it loads.
