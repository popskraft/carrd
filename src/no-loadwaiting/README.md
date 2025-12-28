# No-loadwaiting

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
