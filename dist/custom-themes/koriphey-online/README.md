# Koriphey Online — Custom Theme

> Built: 2026-02-20 | Base version: v0.1.12

Custom theme for **Koriphey Online** site on Carrd.
Files in this folder are production-ready and served via **jsDelivr CDN**.

> CSS/JS bundles are connected as external links. Config is pasted manually to HEAD from `custom-config.js`.

---

## How to connect in Carrd

Add **Code** (Embed) elements to your Carrd site with the links below.

### 1. HEAD — Base theme + Plugin styles + Custom overrides

**Code element → placement: Head**

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/popskraft/carrd@main/dist/theme-design-tokens.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/popskraft/carrd@main/dist/theme-ui.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/popskraft/carrd@main/custom-themes/koriphey-online/dist/custom-plugins-head.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/popskraft/carrd@main/custom-themes/koriphey-online/dist/custom-theme.min.css">
```

### 2. HEAD — Plugin config

**Second Code element → placement: Head** (after styles):

Copy/paste the full contents of `custom-config.js` from this folder.

```html
<!-- Paste full contents of custom-config.js here -->
<script>
/* Custom theme config */
</script>
```

### 3. Body End — Plugin scripts

**Code element → placement: Body End**:

```html
<script src="https://cdn.jsdelivr.net/gh/popskraft/carrd@main/custom-themes/koriphey-online/dist/custom-plugins-body-end.min.js"></script>
```

---

## Files in this folder

| File | Description | Carrd placement |
|------|-------------|-----------------|
| `custom-theme.min.css` | Custom CSS overrides (design tokens + UI) | HEAD (last) |
| `custom-plugins-head.min.css` | Consolidated plugin styles | HEAD |
| `custom-plugins-body-end.min.js` | Consolidated plugin scripts | Body End |
| `custom-config.js` | Ready `<script>...</script>` block for manual paste | HEAD (manual paste) |

---

## Included plugins

Bundled in `custom-plugins-head.min.css` / `custom-plugins-body-end.min.js`: `no-loadwaiting`, `cards`, `cookie-banner`, `faq`, `grid-cluster`, `header-nav`, `modal`, `slider`, `typography`

---

## jsDelivr cache

After pushing to GitHub, changes may take a few minutes to appear.
To force cache refresh, use a specific commit hash:

```
https://cdn.jsdelivr.net/gh/popskraft/carrd@<commit-hash>/custom-themes/koriphey-online/dist/custom-theme.min.css
```

---

## Build metadata

- Version: `0.1.12`
- Build date (UTC): `2026-02-20`
