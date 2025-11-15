# Plugins

## FAQ Toggle

`faq` — Transforms the Carrd FAQ block into a divider-driven accordion while keeping your original markup untouched. Every segment between two `hr.divider-component` elements is treated as one Q/A pair, with the heading becoming the toggle and the intervening nodes wrapped into an animated answer.

[GitHub folder](https://github.com/popskraft/carrd/tree/main/dist/faq)
## Container to Grid Converter

`grid-cluster` — In Carrd you can merge consecutive containers into a single grid spanning 2–6 columns. Assign each container the matching class (grid-2 … grid-6, and grid-sm-2 if needed) and place them back-to-back. The grid ends automatically where the sequence of containers stops.

[GitHub folder](https://github.com/popskraft/carrd/tree/main/dist/grid-cluster)
## No Load Waiting

`no-loadwaiting` — No Load Waiting forces Carrd pages to start their animations as soon as the DOM is ready, instead of waiting for the default window load event. It removes the built-in loader, toggles the `is-ready` state, and dispatches early scroll/resize pulses so visitors see the page animate immediately.

[GitHub folder](https://github.com/popskraft/carrd/tree/main/dist/no-loadwaiting)
## Mini Theme Base

`themes/mini` — Provides a single stylesheet that exposes shared color, motion, and focus tokens for every Mini plugin. When you load it once per site, plugins can inherit `--mini-*` custom properties instead of hard-coding colors or timings, which keeps them visually consistent and easier to theme.

[GitHub folder](https://github.com/popskraft/carrd/tree/main/dist/themes/mini)
