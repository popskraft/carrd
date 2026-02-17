# Cookie Banner

## Version

- Version: `0.1.11`
- Build date (UTC): `2026-02-17`

## Quick Start (Beginner-Friendly)

> **Note:** This plugin requires `theme-design-tokens.css` and `theme-ui.css` to be loaded first. These files contain essential CSS variables and shared UI styles used by all theme plugins.

1. In Carrd, click **+ Add Element**.
2. Choose **Embed → Code**.
3. In **Hidden → Head**, add the **Theme CSS** first, then the **Theme UI CSS**, then the **Plugin CSS** (see **Installation** below).
4. In **Hidden → Body End**, add the **Plugin JS** (see **Installation** below).
5. Publish the site and refresh the page.

Optional: if you want a single snippet, open
`dist/cookie-banner/cookie-banner-embed.html`, copy everything, and paste it
into **Hidden → Body End**. Note: you still need `theme-design-tokens.css` and `theme-ui.css` in HEAD.

**Configuration (Optional):**

To customize plugin behavior, add `window.CarrdPluginOptions` **before** plugin scripts:

```html
<!-- BODY END: Configuration -->
<script>
window.CarrdPluginOptions = {
  cookie-banner: {
    // See Configuration section below for all options
  }
};
</script>

<!-- BODY END: Plugin script -->
<script src="...cookie-banner.min.js"></script>
```

For all available options, see [theme-config.js](../theme-config.js) or the Configuration section below.

---

## Installation

### Standalone

<!-- HEAD -->
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/popskraft/carrd@main/dist/theme-design-tokens.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/popskraft/carrd@main/dist/theme-ui.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/popskraft/carrd@main/dist/cookie-banner/cookie-banner.min.css">
```

<!-- BODY END -->
```html
<script src="https://cdn.jsdelivr.net/gh/popskraft/carrd@main/dist/cookie-banner/cookie-banner.min.js"></script>
```

---

Cookie consent banner for GDPR compliance.

## Features

- **One-click consent**: Accept button hides banner for 7 days
- **Flexible positioning**: 6 position options (corners and center)
- **Smooth animations**: Fade-in on load, fade-out on accept
- **Mobile-friendly**: Responsive design for all screen sizes
- **Zero dependencies**: Pure vanilla JavaScript

## Carrd Admin Settings

1. Add a **Columns** element anywhere on your page
2. Set the element ID to `cookie-baner` (note: single 'n')
3. Add text with your cookie policy message
4. Add an **Icons** element with a checkmark (✓) or similar accept button
5. Style the Columns block as needed (background, padding, etc.)

> **Tip**: The first link with `role="button"` inside the banner will act as the accept button.

## Configuration

```html
<script>
window.CarrdPluginOptions = {
    cookieBanner: {
        position: "bottom-left",
        cookieDays: 7,
        showDelay: 1000,
        fadeInDuration: 400,
        fadeOutDuration: 300
    }
};
</script>
```

### Options

| Option | Default | Description |
|--------|---------|-------------|
| `bannerId` | `"cookie-baner"` | ID of the banner element |
| `cookieName` | `"cookies_accepted"` | Cookie name for storing consent |
| `cookieDays` | `7` | Cookie lifetime in days |
| `showDelay` | `1000` | Delay before showing banner (ms) |
| `fadeInDuration` | `400` | Fade-in animation duration (ms) |
| `fadeOutDuration` | `300` | Fade-out animation duration (ms) |
| `position` | `"bottom-left"` | Banner position (see below) |

### Position Values

| Value | Description |
|-------|-------------|
| `bottom-left` | Bottom-left corner (default) |
| `bottom-right` | Bottom-right corner |
| `bottom-center` | Bottom center |
| `top-left` | Top-left corner |
| `top-right` | Top-right corner |
| `top-center` | Top center |

## Example HTML Structure

```html
<div id="cookie-baner" class="container-component columns">
  <div class="wrapper">
    <div class="inner">
      <div>
        <p>We use cookies according to our <a href="#rules">Privacy Policy</a></p>
      </div>
      <div>
        <ul class="icons-component">
          <li>
            <a href="#" role="button">
              <svg><!-- checkmark icon --></svg>
              <span class="label">Accept</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</div>
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
