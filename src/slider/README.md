# Slider

Horizontal slider/carousel from consecutive Carrd containers with responsive slides per view.

## Features
- **Touch Support**: Swipe gestures on mobile
- **Mouse Drag**: Click and drag on desktop
- **Responsive**: Different slides per view at different breakpoints
- **Navigation**: Dots and optional arrow controls
- **Auto-clustering**: Groups consecutive `.slider` containers

## Carrd Admin Settings
1. Add class `.slider` to consecutive containers in Carrd
2. Each container becomes a slide in the carousel
3. (Optional) Add `data-slider-id="your-id"` to the first container in a cluster to use per-instance settings

## Default Responsive Behavior

| Screen Size | Breakpoint | Slides Visible |
|-------------|------------|----------------|
| Mobile XS | < 737px | 1 |
| Tablet/Mobile | ≥ 737px | 3 |
| Desktop M | ≥ 1280px | 4 |

## Configuration

```html
<script>
window.CarrdPluginOptions = {
    slider: {
        showDots: true,
        showArrows: true,
        loop: false,
        autoplay: false,
        autoplayInterval: 5000,
        gap: 16,
        slidesPerView: 1,
        breakpoints: {
            737: { slidesPerView: 3 },   // Tablet
            1280: { slidesPerView: 4 }   // Desktop
        },
        instances: {
            hero: { slidesPerView: 1, autoplay: true },
            gallery: { slidesPerView: 3, gap: 24, loop: true }
        }
    }
};
</script>
```

### Options

| Option | Default | Description |
|--------|---------|-------------|
| `showDots` | `true` | Show navigation dots |
| `showArrows` | `true` | Show prev/next arrows |
| `loop` | `false` | Loop back to start |
| `autoplay` | `false` | Auto-advance slides |
| `autoplayInterval` | `5000` | Autoplay delay (ms) |
| `gap` | `16` | Gap between slides (px) |
| `slidesPerView` | `1` | Default slides visible |
| `breakpoints` | `{...}` | Responsive config (see below) |
| `instances` | `{}` | Per-instance overrides by `data-slider-id` |

### Breakpoints

Configure different `slidesPerView` at different screen widths:

```javascript
breakpoints: {
    // At 737px and above: show 2 slides
    737: { slidesPerView: 2 },
    
    // At 1024px and above: show 3 slides
    1024: { slidesPerView: 3 },
    
    // At 1280px and above: show 4 slides
    1280: { slidesPerView: 4 }
}
```

## CSS Variables

```css
:root {
    /* Navigation dots */
    --theme-slider-dot-size: var(--theme-ui-dot-size);
    --theme-slider-dot-bg: var(--theme-ui-dot-bg);
    --theme-slider-dot-hover-bg: var(--theme-ui-dot-hover-bg);
    --theme-slider-dot-active-bg: var(--theme-ui-dot-active-bg);
    --theme-slider-dots-margin: 1rem;
    
    /* Navigation arrows */
    --theme-slider-arrow-size: var(--theme-ui-control-size);
    --theme-slider-arrow-bg: var(--theme-ui-control-bg);
    --theme-slider-arrow-color: var(--theme-ui-control-color);
    --theme-slider-arrow-shadow: var(--theme-ui-control-shadow);
    --theme-slider-arrow-radius: var(--theme-ui-control-radius);
    --theme-slider-arrow-icon-size: var(--theme-ui-icon-size);
    --theme-slider-arrow-offset: 0.5rem;
}
```

## Usage Example

In Carrd, create several containers and add `.slider` class to each:

```
Container 1: class="slider" → Slide 1
Container 2: class="slider" → Slide 2  
Container 3: class="slider" → Slide 3
Container 4: class="slider" → Slide 4
Container 5: class="slider" → Slide 5
```

On mobile (< 737px): 1 slide visible, swipe to navigate
On tablet (≥ 737px): 3 slides visible at once
On desktop (≥ 1280px): 4 slides visible at once
### Per-Instance Settings

Use `data-slider-id` on the first slide in a cluster to apply overrides. Full process:

1. Add class `.slider` to all containers that form the cluster (as usual).
2. On the first container of that cluster, add `data-slider-id="your-id"`.
3. In `window.CarrdPluginOptions.slider.instances`, add a key with the same id.
4. Put any overrides inside that key (only the options you want to change).

Notes:
- Only the first container in the cluster needs `data-slider-id`.
- If an id is missing from `instances`, the global defaults apply.

```html
<!-- Cluster A -->
<div class="slider" data-slider-id="hero">...</div>
<div class="slider">...</div>
<div class="slider">...</div>

<!-- Cluster B -->
<div class="slider" data-slider-id="gallery">...</div>
<div class="slider">...</div>
```

```javascript
window.CarrdPluginOptions = {
    slider: {
        slidesPerView: 1,
        gap: 16,
        instances: {
            hero: { autoplay: true, slidesPerView: 1 },
            gallery: { slidesPerView: 3, gap: 24 }
        }
    }
};
```
