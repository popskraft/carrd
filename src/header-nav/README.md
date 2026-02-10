# Header Nav

Mobile hamburger toggle for a header navigation list inside `#site-header`.

## Carrd Admin Settings

1. Ensure your header container has the ID `site-header`.
2. Recommended: set your navigation list ID to `site-header-nav`.
3. If `navId` is missing or points outside the header, the plugin auto-detects the first `.links-component` inside the header.
4. Add the plugin CSS in **Head** and the plugin JS in **Body End**.

## Configuration

Add before the plugin script:

```html
<script>
window.CarrdPluginOptions = {
    headerNav: {
        breakpoint: 736,
        closeOnLinkClick: true,
        sticky: true,
        hideOnScrollDown: false,
        stickyTop: 0
    }
};
</script>
```

### Options

| Option | Default | Description |
|--------|---------|-------------|
| `headerId` | `'site-header'` | Header container ID |
| `navId` | `'site-header-nav'` | Navigation container ID |
| `navSelector` | `'.links-component'` | Fallback selector to find navigation inside header |
| `ctaId` | `'site-header-cta'` | CTA element ID used for mobile compact row |
| `mobileStickyAnchorId` | `'site-header-topnav'` | Optional element ID used to offset sticky top on mobile |
| `mobileStickyOffset` | `0` | Additional mobile sticky top offset in px |
| `mobileStickyTop` | `null` | Visual sticky top in px for mobile (does not change sticky trigger point) |
| `breakpoint` | `736` | Max width (px) for mobile behavior |
| `closeOnLinkClick` | `true` | Close menu when a link is clicked (mobile) |
| `sticky` | `true` | Enables sticky header behavior |
| `hideOnScrollDown` | `false` | When `true`, hides sticky header on scroll down and shows it on scroll up |
| `stickyTop` | `0` | Sticky top offset in px |

Legacy compatibility notes:
- `enableStickyHider` is still accepted as a legacy alias for `sticky`.
- `disableStickyEffect: true` still force-disables sticky behavior.
- `animationDuration` and `navMaxHeight` are still accepted, but prefer CSS variables for styling.

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
    --theme-header-nav-sticky-top: 0;
    --theme-header-nav-sticky-z-index: 1000;
}
```
