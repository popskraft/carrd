# No-loadwaiting

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
`dist/no-loadwaiting/no-loadwaiting-embed.html`, copy everything, and paste it
into **Hidden → Body End**.

Important: if you use `window.CarrdPluginOptions`, place it **before** the plugin
`<script>` tag in **Hidden → Body End**.

---

## Installation

### Standalone

```html
<script src="https://cdn.jsdelivr.net/gh/popskraft/carrd@main/dist/no-loadwaiting/no-loadwaiting.min.js"></script>
```

---

Instant page display without Carrd's loading delay.

## Features
- **Faster FCP**: Fixes Lighthouse NO_FCP warning
- **Smooth Animations**: Entry animations still work
- **Automatic**: No setup required

## Carrd Admin Settings

No admin steps required. Install the script and publish.

## Configuration

```html
<script>
window.CarrdPluginOptions = {
    noLoadwaiting: {
        animationDuration: 750,
        observerTimeout: 5000,
        scrollPulseInterval: 60,
        scrollPulseCount: 10,
        rafPulseCount: 4
    }
};
</script>
```

### Options

| Option | Default | Description |
|--------|---------|-------------|
| `animationDuration` | `750` | Duration for `is-playing` class (ms) |
| `observerTimeout` | `5000` | Stop watching for changes after (ms) |
| `scrollPulseInterval` | `60` | Check interval for scroll/resize fix (ms) |
| `scrollPulseCount` | `10` | Number of check intervals |
| `rafPulseCount` | `4` | Number of animation frame checks |

---

## Troubleshooting

- Nothing happens: confirm the class name or selector in **Carrd Admin Settings** matches your Carrd elements.
- Styles missing: CSS must be in **Hidden → Head**, not in **Body End**.
- Config not applied: `window.CarrdPluginOptions` must appear **before** the plugin script.
- Embed not available: you may need a Carrd plan that supports **Embed → Code**.
- CDN blocked: try opening the CDN URL directly and confirm it loads.
