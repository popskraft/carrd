# Mini Theme

## Philosophy
The **Mini Theme** is designed to be the "brain" of your Carrd site's design. Instead of manually styling every single plugin or element, this theme provides a **centralized design system**.

The core concept is **Inheritance**: you define your style rules (like your brand's primary color) in **one place**, and all connected plugins (FAQ, Cards, Grid, etc.) automatically listen to and apply these styles.

*   **Change once, update everywhere**: If you decide to change your primary color from Blue to Red, you only update the theme file. All plugins instantly reflect this change.
*   **Consistent Look & Feel**: Ensures that spacing, border radiuses, and colors are identical across all parts of your site.

## How It Works
The theme uses **CSS Variables** (also known as Custom Properties) to broadcast design tokens to the plugins.

For example, the theme defines a variable:
```css
:root {
    --mini-color-primary: #5c9dff; /* Default Blue */
}
```

The **FAQ Plugin** uses this variable for its icons:
```css
.faq-question::after {
    color: var(--mini-color-primary);
}
```

The **Cards Plugin** might use it for focus states or borders. When you change `--mini-color-primary`, both plugins update automatically.

## Setup in Carrd

To install the Mini Theme, you need to add two **Embed** elements to your site.

### 1. Styles (Head)
This connects the visual design system.

1.  Add an **Embed** element to your site.
2.  Set **Type** to `Code`.
3.  Set **Style** to `Hidden`, `Head`.
4.  **Paste the code below**. This includes the core theme styles and all plugin styles.

> **Option A: Using CDN (Easiest)**
> This loads the latest version from the server.
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/popskraft/carrd@main/dist/themes/mini/theme-style.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/popskraft/carrd@main/dist/themes/mini/plugin-style.min.css">

<!-- Customization: Change color here -->
<style>
:root {
    --mini-color-primary: #ff0ff0; /* Example: Neon Pink */
}
</style>
```

> **Option B: Manual Code (Best for Performance)**
> Copy the content from the generated `styles.html` file (which combines everything) and paste it here.
```html
<style>
/* Paste the content of dist/themes/mini/styles.html here */
/* It will look like this: */

:root{--mini-color-primary:#5c9dff}

/* ----- Cards ----- */
.card-item{...}

/* ----- FAQ ----- */
.FAQContainer{...}
</style>
```

### 2. Scripts (Body End)
This powers the interactivity (like clicking to open FAQs).

1.  Add a second **Embed** element.
2.  Set **Type** to `Code`.
3.  Set **Style** to `Hidden`, `Body End`.
4.  **Paste the code below**.

> **Option A: Using CDN (Easiest)**
```html
<script src="https://cdn.jsdelivr.net/gh/popskraft/carrd@main/dist/themes/mini/plugin-script.min.js"></script>
```

> **Option B: Manual Code (Best for Performance)**
> Copy the content from the generated `scripts.html` file (which combines everything) and paste it here.
```html
<script>
/* Paste the content of dist/themes/mini/scripts.html here */
/* It will look like this: */

/* ----- No Load Waiting ----- */
(function(){...})();

/* ----- Cards ----- */
(function(){...})();

/* ----- FAQ ----- */
(function(){...})();

/* ----- MINI theme scripts ----- */
</script>
```

## Customization Guide
You can customize the entire theme by adjusting the variables in your **Styles** Embed (as shown in Option A above).

**Global Variables:**
*   `--mini-color-primary`: Main accent color (links, icons, focus rings).

**Cards Plugin:**
*   `--mini-card-padding`: Spacing inside cards (default: `2rem`).
*   `--mini-card-padding-mobile`: Spacing on mobile devices (default: `2rem`).
*   `--mini-card-border-radius`: Roundness of card corners (default: `0`).
*   `--mini-card-bg-default`: Default background color if none set (default: `#cccccc`).

**FAQ Plugin:**
*   `--mini-faq-spacing`: Vertical spacing between open answers (default: `0.75rem`).
*   `--mini-faq-icon-size`: Size of the +/- icon (default: `1.75rem`).
*   `--mini-faq-icon-color`: Color of the icon (default: `var(--mini-color-primary)`).

**Grid Cluster Plugin:**
*   `--mini-grid-row-gap`: Vertical gap between rows (mobile default: `1rem`).
*   `--mini-grid-column-gap`: Horizontal gap between columns (mobile default: `1rem`).
*   `--mini-grid-row-gap-desktop`: Vertical gap on desktop (default: `2rem`).
*   `--mini-grid-column-gap-desktop`: Horizontal gap on desktop (default: `1.5rem`).

Simply add these to the `:root` selector in your `<style>` block to override the defaults.


