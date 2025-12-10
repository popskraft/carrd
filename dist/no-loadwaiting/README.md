# No-loadwaiting

Instant page display without Carrd's loading delay.

## Features
- **Faster FCP**: Fixes Lighthouse NO_FCP warning
- **Smooth Animations**: Entry animations still work
- **Automatic**: No setup required

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
<script src="https://cdn.jsdelivr.net/gh/popskraft/carrd@main/dist/no-loadwaiting/no-loadwaiting.min.js"></script>
```

## Configuration

```html
<script>
window.CarrdPluginOptions = {
    noLoadwaiting: {
        animationDuration: 750,
        observerTimeout: 5000
    }
};
</script>
```

### Options

| Option | Default | Description |
|--------|---------|-------------|
| `animationDuration` | `750` | Entry animation duration (ms) |
| `observerTimeout` | `5000` | Observer auto-disconnect (ms) |
