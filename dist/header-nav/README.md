# Header Nav

## Version

- Version: `0.1.9`
- Build date (UTC): `2026-02-06`

## Quick Start (Beginner-Friendly)

> **Note:** This plugin requires `theme-design-tokens.css` and `theme-ui.css` to be loaded first. These files contain essential CSS variables and shared UI styles used by all theme plugins.

1. In Carrd, click **+ Add Element**.
2. Choose **Embed → Code**.
3. In **Hidden → Head**, add the **Theme CSS** first, then the **Theme UI CSS**, then the **Plugin CSS** (see **Installation** below).
4. In **Hidden → Body End**, add the **Plugin JS** (see **Installation** below).
5. Publish the site and refresh the page.

Optional: if you want a single snippet, open
`dist/header-nav/header-nav-embed.html`, copy everything, and paste it
into **Hidden → Body End**. Note: you still need `theme-design-tokens.css` and `theme-ui.css` in HEAD.

**Configuration (Optional):**

To customize plugin behavior, add `window.CarrdPluginOptions` **before** plugin scripts:

```html
<!-- BODY END: Configuration -->
<script>
window.CarrdPluginOptions = {
  header-nav: {
    // See Configuration section below for all options
  }
};
</script>

<!-- BODY END: Plugin script -->
<script src="...header-nav.min.js"></script>
```

For all available options, see [theme-config.js](../theme-config.js) or the Configuration section below.

---

## Installation

### Standalone

<!-- HEAD -->
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/popskraft/carrd@main/dist/theme-design-tokens.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/popskraft/carrd@main/dist/theme-ui.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/popskraft/carrd@main/dist/header-nav/header-nav.min.css">
```

<!-- BODY END -->
```html
<script src="https://cdn.jsdelivr.net/gh/popskraft/carrd@main/dist/header-nav/header-nav.min.js"></script>
```

---

Mobile hamburger toggle for a header navigation list inside `#site-header`.

## Carrd Admin Settings

1. Ensure your header container has the ID `site-header`.
2. Ensure your navigation list has the ID `site-header-nav`.
3. Add the plugin CSS in **Head** and the plugin JS in **Body End**.

## Configuration

Add before the plugin script:

```html
<script>
window.CarrdPluginOptions = {
    headerNav: {
        breakpoint: 736,
        closeOnLinkClick: true,
        navMaxHeight: '60vh',
        animationDuration: 300
    }
};
</script>
```

### Options

| Option | Default | Description |
|--------|---------|-------------|
| `breakpoint` | `736` | Max width (px) for mobile behavior |
| `closeOnLinkClick` | `true` | Close menu when a link is clicked (mobile) |
| `navMaxHeight` | `'60vh'` | Maximum open height for the nav list |
| `animationDuration` | `300` | Transition duration in ms |

## CSS Variables

```css
:root {
    --theme-header-nav-toggle-top: 0.75rem;
    --theme-header-nav-toggle-right: 0.75rem;
    --theme-header-nav-toggle-size: 2.5rem;
    --theme-header-nav-toggle-radius: 0.5rem;
    --theme-header-nav-toggle-bg: transparent;
    --theme-header-nav-toggle-outline: 2px solid currentColor;
    --theme-header-nav-toggle-outline-offset: 2px;

    --theme-header-nav-bar-width: 22px;
    --theme-header-nav-bar-height: 2px;
    --theme-header-nav-bar-gap: 5px;
    --theme-header-nav-bar-radius: 999px;
    --theme-header-nav-bar-color: currentColor;

    --theme-header-nav-duration: 300ms;
    --theme-header-nav-max-height: 60vh;
}
```

---

## Troubleshooting

- **Styles look broken or missing colors:** Make sure `theme-design-tokens.css` and `theme-ui.css` are loaded **before** the plugin CSS.
- Nothing happens: confirm the class name or selector in **Carrd Admin Settings** matches your Carrd elements.
- Styles missing: CSS must be in **Hidden → Head**, not in **Body End**.
- Config not applied: `window.CarrdPluginOptions` must be defined **before** the plugin `<script>` tag. Check browser console for errors.
- To see all available options: open `dist/theme-config.js` or check the Configuration section.
- Embed not available: you may need a Carrd plan that supports **Embed → Code**.
- CDN blocked: try opening the CDN URL directly and confirm it loads.
