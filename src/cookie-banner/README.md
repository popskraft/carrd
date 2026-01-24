# Cookie Banner

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
