# Header Nav

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
    --mini-header-nav-toggle-top: 0.75rem;
    --mini-header-nav-toggle-right: 0.75rem;
    --mini-header-nav-toggle-size: 2.5rem;
    --mini-header-nav-toggle-radius: 0.5rem;
    --mini-header-nav-toggle-bg: transparent;
    --mini-header-nav-toggle-outline: 2px solid currentColor;
    --mini-header-nav-toggle-outline-offset: 2px;

    --mini-header-nav-bar-width: 22px;
    --mini-header-nav-bar-height: 2px;
    --mini-header-nav-bar-gap: 5px;
    --mini-header-nav-bar-radius: 999px;
    --mini-header-nav-bar-color: currentColor;

    --mini-header-nav-duration: 300ms;
    --mini-header-nav-max-height: 60vh;
}
```
