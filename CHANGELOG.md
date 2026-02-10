# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

### Fixed

- **Columns**: Added built-in `.container-component.justify` styles to plugin CSS and propagate `.justify` across all containers in the same grid cluster when the first container has `.justify`.

## [0.1.9] - 2026-02-06

### Changed

- **Public API**: Unified plugin globals to `window.Carrd<Plugin>` format for runtime consistency:
  - `window.CarrdShoppingCart`
  - `window.CarrdModal`
  - `window.CarrdTypography`
  - `window.CarrdSlider`
- **Shopping Cart**: Replaced inline template styles with CSS classes to keep styles centralized.
- **Typography**: Migrated default classes to plugin-scoped naming (`theme-typography-*`) for namespace safety.

### Fixed

- **Shopping Cart**: Removed hardcoded widget foreground color and switched to tokenized value `--theme-shopcart-widget-color`.

### Breaking

- **Public API**: Removed legacy global aliases:
  - `window.CartPlugin`
  - `window.CarrdCart`
  - `window.ModalPlugin`
  - `window.TypographyPlugin`
  - Use the new `window.Carrd<Plugin>` globals instead.
- **Typography CSS classes**: Replaced generic classes (`theme-h1`, `theme-ul`, `theme-hr`, etc.) with plugin-scoped classes (`theme-typography-h1`, `theme-typography-ul`, `theme-typography-hr`, etc.).

## [0.1.8a] - 2026-01-24

### Added

- **Cookie Banner**: Added animation for smoother appearance.
- **Cookie Banner**: Added configuration options `showDelay` (default: 1000ms) and `fadeInDuration` (default: 400ms).
- **QA**: Added automated workflows for code quality checks (`/css-consistency-check`, `/plugin-check`).

### Fixed

- **Slider**: Fixed bug where dot indicators would not update on mobile swipe (incorrect CSS selector).
- **Slider**: Refactored internally to use consistent `SELECTORS` constants for all class names.
- **Slider**: Updated CSS classes to use consistent `theme-` prefix (`.theme-slider-nav`, `.theme-slider-dot`).

## [0.1.7] - 2026-01-15

### Changed

- **Typography**: Simplified `README.md` documentation
  - Removed CSS variables section (tokens are no longer in final build)
  - Removed unused configuration options (`paragraphSelector`, `wrapperClass`)
  - Emphasized `.txt` class requirement for plugin activation

---

## [0.1.5] - 2026-01-14

### Changed

- **Build System**: Source file headers (`* Version:`) now auto-sync to `VERSION` on each build.

---

## [0.1.4] - 2026-01-14

### Changed

- **Build System**: Extracted minification logic into separate `scripts/minifier.py` module (342 lines)
  - `minify_plugins.py` reduced from 1120 → 825 lines
  - Added docstrings and improved code organization
  - No functional changes — output is byte-for-byte identical
- **Naming**: Renamed bundle files `mini-core.min.js/css` → `theme-core.min.js/css` for consistency
  - All documentation updated with new bundle names

- **BREAKING (CSS only):** Renamed all `mini-` CSS variables to `theme-` prefix for consistency with file naming
  - CSS variables: `--mini-color-*` → `--theme-color-*`, `--mini-ui-*` → `--theme-ui-*`, etc. (~80 variables)
  - Utility classes: `.mini-text-body` → `.theme-text-body`, `.mini-icon-button` → `.theme-icon-button` (~15 classes)
  - Plugin classes: `.slider-dot` → `.theme-slider-dot`, `.faq-question` → `.theme-faq-question`, etc. (~30 classes)
  - **User-facing selectors unchanged:** `.FAQContainer`, `.slider`, `.cards`, `.grid-*` remain the same
- Updated all source files (13 files) to use new `theme-` prefix
- Rebuilt all distribution files with new naming convention

### Fixed

- Improved naming consistency across entire codebase (files, variables, and classes now all use `theme-` prefix)
- Eliminated confusion between "mini" (small) and "Mini theme" naming

---

## [0.1.3] - 2026-01-14

### Changed

- **Documentation**: Complete overhaul of main `README.md` (73 → 238 lines).
- **Documentation**: Added four installation methods (CDN Individual, CDN Bundle, Direct Embed, Single Embed File).
- **Documentation**: Added installation method comparison table to help users choose the right approach.
- **Documentation**: Added Configuration section with CSS variables and JavaScript options examples.
- **Documentation**: Added Quick Start guide for beginners.
- **Documentation**: Added Glossary section explaining Carrd-specific terminology.
- **Documentation**: Added comprehensive Troubleshooting section.
- **Documentation**: Enhanced Included Plugins table with theme-core bundle information.
- **Documentation**: Clarified that `theme-design-tokens.css` and `theme-ui.css` are required for all installation methods.

---

## [0.1.2] - 2026-01-13

### Changed

- **Breaking**: `theme-design-tokens.css` is now **required** for standalone plugin usage — it defines all CSS variables.
- **Shopping Cart**: Replaced `<h2>` with `<div>` for cart title (no SEO interference).
- **All Plugins**: Removed hardcoded color fallbacks — all colors now cascade from theme variables.
- **Documentation**: Updated plugin READMEs to include theme CSS requirement.

### Fixed

- Fixed CSS syntax error in `theme-design-tokens.css` (`var(#ffffff)` → `#ffffff`).
- Standardized font-family fallbacks to use `--mini-font-family`.

---

## [0.1.0] - 2026-01-12

### Changed

- **Slider**: `equalHeight` is now `true` by default — all slides stretch to the same height without extra configuration.

### Fixed

- Fixed JavaScript syntax error in example `carrd/index.html` (missing closing brace for `window.CarrdPluginOptions`).

---

## [0.0.0] - 2025-12-29

### Added

- Initial release of Carrd Plugins (Mini Theme).
- **Shopping Cart** plugin with full cart functionality.
- **FAQ** plugin with accordion-style Q&A sections.
- **Columns** plugin for grid layouts and card styling.
- **No-loadwaiting** plugin to skip Carrd's loading animation.
- **Modal** plugin for popup/lightbox functionality.
- **Slider** plugin with touch/drag support, navigation dots, and arrows.
- Unified `theme-core.min.js` and `theme-core.min.css` bundles.
- Theme customization via CSS variables (`--mini-*`).
- JS configuration via `window.CarrdPluginOptions`.
