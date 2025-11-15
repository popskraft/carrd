# FAQ Toggle

## Purpose
Transforms the Carrd FAQ block into a divider-driven accordion while keeping your original markup untouched. Every segment between two `hr.divider-component` elements is treated as one Q/A pair, with the heading becoming the toggle and the intervening nodes wrapped into an animated answer.

## How to include it
1. Wrap your markup inside a container that carries the `FAQContainer` class.
2. Structure questions as `<h1–h3>` elements with the surrounding divider pair: `hr.divider-component → heading → answer nodes → hr.divider-component`.
3. Load the stylesheet in **Head** and the script in **Body End** (or use the example embed below); the JS automatically wraps answers in `.faq-answer`, wires the headings as toggles, and animates their open/close states with aria attributes.

## Example skeleton
```
<div class="FAQContainer">
  <hr class="divider-component">
  <h3 class="text-component">Q. Can I mix different VLT on one vehicle?</h3>
  <p class="text-component">Yes. Combine tint types by zone—just mind the legal limits.</p>
  <hr class="divider-component">

  <hr class="divider-component">
  <h3 class="text-component">Q. Can I install it myself?</h3>
  <p class="text-component">Sure. Follow the kit guide and wipe the surface clean first.</p>
  <hr class="divider-component">
</div>
```

## Behavior notes
- Questions are grouped strictly by divider pairs, so insert an `hr.divider-component` before each heading and after the answer block.
- The script adds `faq-question`, toggles the `faq-answer` wrapper, and manages aria attributes plus keyboard handling.
- Animations control `max-height`, `opacity`, and spacing to keep the collapsed rows from breaking Carrd’s layout.
- If you don’t use `<h1>–<h3>` headings, the script will promote the first `<p>` after the opening divider to act as the toggle so every block still works.

## Theme-wide styling
- Load the shared Mini Theme Base CSS once per site (Head embed → `<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/popskraft/carrd@main/dist/themes/mini/style.css">`) to expose the accent, motion, and focus tokens tracked in `_theme-base`.
- This FAQ stylesheet already references those variables but includes fallbacks, so it retains the same look on non-Mini Carrd themes if you skip the base layer entirely.
