# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
- **Documentation**: Enhanced Included Plugins table with mini-core bundle information.
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
- Unified `mini-core.min.js` and `mini-core.min.css` bundles.
- Theme customization via CSS variables (`--mini-*`).
- JS configuration via `window.CarrdPluginOptions`.
