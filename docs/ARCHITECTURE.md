# Архитектура проекта

## Новая оптимальная структура

```
src/
├── mini/                           # Проект
│   ├── grid-cluster/              # Кастомизация
│   │   ├── index.html             # Описание (для документации)
│   │   ├── style.css              # Стили
│   │   ├── script.js              # Скрипты
│   │   └── meta.json              # Метаданные
│   ├── smooth-scroll/             # Другая кастомизация
│   │   ├── index.html
│   │   ├── style.css
│   │   ├── script.js
│   │   └── meta.json
│   └── index.json                 # Индекс проекта
│
└── another-project/               # Другой проект
    └── ...
```

## Файлы в каждой кастомизации

### `index.html`
- Описание кастомизации
- Комментарии и примеры использования
- Не обрабатывается build скриптом

### `style.css`
- Чистый CSS без комментариев
- Будет минифицирован при build
- Экспортируется в `dist/{project}/{name}.css`

### `script.js`
- Чистый JavaScript без комментариев
- Будет минифицирован при build
- Экспортируется в `dist/{project}/{name}.js`

### `meta.json`
```json
{
  "name": "grid-cluster",
  "title": "Grid Cluster",
  "version": "1.0.0",
  "description": "...",
  "author": "popskraft",
  "license": "MIT",
  "tags": ["grid", "layout"],
  "breakpoints": { ... },
  "files": {
    "css": "style.css",
    "js": "script.js"
  },
  "dependencies": [],
  "changelog": { ... }
}
```

### `index.json` (в папке проекта)
```json
{
  "project": "mini",
  "title": "Mini Project",
  "description": "...",
  "customizations": [
    {
      "id": "grid-cluster",
      "path": "grid-cluster",
      "enabled": true
    }
  ]
}
```

## Build процесс

```
npm run build
    ↓
.github/scripts/build.js
    ↓
1. Читает src/{project}/index.json
2. Для каждой кастомизации:
   - Читает meta.json
   - Минифицирует CSS → dist/{project}/{name}.css
   - Минифицирует JS → dist/{project}/{name}.js
3. Генерирует dist/manifest.json
4. Генерирует docs/CDN-LINKS.md
```

## Manifest структура

`dist/manifest.json`:
```json
{
  "version": "1.0.0",
  "generated": "2024-11-11T...",
  "projects": [
    {
      "project": "mini",
      "title": "Mini Project",
      "customizations": [
        {
          "id": "grid-cluster",
          "name": "grid-cluster",
          "title": "Grid Cluster",
          "version": "1.0.0",
          "description": "...",
          "cdn": {
            "css": "https://cdn.jsdelivr.net/gh/popskraft/carrd@main/dist/mini/grid-cluster.css",
            "js": "https://cdn.jsdelivr.net/gh/popskraft/carrd@main/dist/mini/grid-cluster.js"
          }
        }
      ]
    }
  ]
}
```

## CDN ссылки

Генерируются автоматически в `docs/CDN-LINKS.md`:

```html
<!-- Для grid-cluster -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/popskraft/carrd@main/dist/mini/grid-cluster.css">
<script src="https://cdn.jsdelivr.net/gh/popskraft/carrd@main/dist/mini/grid-cluster.js"></script>
```

## Преимущества архитектуры

✅ **Разделение кода** — каждый файл отдельно
✅ **Метаданные** — версионирование и описание
✅ **Минификация** — автоматическая оптимизация
✅ **Валидация** — проверка структуры перед build
✅ **Manifest** — индекс всех файлов
✅ **Масштабируемость** — легко добавлять новые проекты
✅ **Автоматизация** — GitHub Actions обрабатывает всё
✅ **CDN оптимизация** — jsDelivr кэширует файлы

## Добавление новой кастомизации

1. Создайте папку: `src/{project}/{name}/`
2. Добавьте файлы:
   - `index.html` — описание
   - `style.css` — стили
   - `script.js` — скрипты
   - `meta.json` — метаданные
3. Обновите `src/{project}/index.json`:
   ```json
   {
     "id": "name",
     "path": "name",
     "enabled": true
   }
   ```
4. Сделайте `git push`
5. GitHub Action автоматически обновит dist/ и CDN ссылки
