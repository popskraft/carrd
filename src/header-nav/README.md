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
