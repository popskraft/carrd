# Plugins

- `mini/grid-cluster` — **Container to Grid Converter**: Container to Grid Converter turns consecutive Carrd grid blocks into cohesive, responsive containers so layouts stay aligned across breakpoints. It solves uneven spacing by applying a shared wrapper, keeps image widths constrained, and respects optional `grid-sm-2` rules for smaller screens.
- `mini/no-loadwaiting` — **No Load Waiting**: No Load Waiting forces Carrd pages to start their animations as soon as the DOM is ready, instead of waiting for the default window load event. It removes the built-in loader, toggles the `is-ready` state, and dispatches early scroll/resize pulses so visitors see the page animate immediately.
