# Koriphey Online — Custom Theme

> Built: 2026-03-14 | Base version: v0.1.13

Custom theme for **Koriphey Online** site on Carrd.
Files in this folder are production-ready and served via **jsDelivr CDN**.

> Plugin bundles are connected as external links. Theme CSS + config are pasted manually from `custom-theme-embed.html`.

---

## How to connect in Carrd

Add **Code** (Embed) elements to your Carrd site with the links below.

### 1. HEAD — Plugin styles + Theme styles (manual)

**Code element → placement: Head**

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/popskraft/carrd@main/dist/custom-themes/koriphey-online/custom-plugins-head.min.css">
```

Then open `custom-theme-embed.html` and copy only the `HEAD` `<style>...</style>` block into a second Head code element.

### 2. BODY TOP — Plugin config (manual)

**Code element → placement: Body Top**:

Open `custom-theme-embed.html` and copy the `BODY TOP` `<script>...</script>` block.

```html
<!-- Paste BODY TOP block from custom-theme-embed.html -->
<script>
/* Custom theme config */
</script>
```

### 3. Body End — Plugin scripts

**Code element → placement: Body End**:

```html
<script src="https://cdn.jsdelivr.net/gh/popskraft/carrd@main/dist/custom-themes/koriphey-online/custom-plugins-body-end.min.js"></script>
```

---

## Files in this folder

| File | Description | Carrd placement |
|------|-------------|-----------------|
| `custom-theme.min.css` | Optional CDN theme styles (minified) | HEAD (alternative to embed) |
| `custom-plugins-head.min.css` | Consolidated plugin styles | HEAD |
| `custom-plugins-body-end.min.js` | Consolidated plugin scripts | Body End |
| `custom-theme-embed.html` | Non-minified theme embed blocks (`HEAD` + `BODY TOP`) | Manual paste |

---

## Included plugins

Bundled in `custom-plugins-head.min.css` / `custom-plugins-body-end.min.js`: `no-loadwaiting`, `cards`, `cookie-banner`, `faq`, `grid-cluster`, `header-nav`, `modal`, `slider`, `typography`

---

## jsDelivr cache

After pushing to GitHub, changes may take a few minutes to appear.
To force cache refresh, use a specific commit hash:

```
https://cdn.jsdelivr.net/gh/popskraft/carrd@<commit-hash>/dist/custom-themes/koriphey-online/custom-theme.min.css
```

---

## Build metadata

- Version: `0.1.13`
- Build date (UTC): `2026-03-14`
