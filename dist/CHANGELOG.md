# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
