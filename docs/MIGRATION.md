# Миграция на новую архитектуру

## Что изменилось

### Старая структура
```
mini/
├── src/
│   ├── index.html
│   └── assets/
├── grid-cluster.html  ← Всё в одном файле
└── smooth-scroll.html
```

### Новая структура
```
src/mini/
├── grid-cluster/
│   ├── index.html     ← Описание
│   ├── style.css      ← Стили отдельно
│   ├── script.js      ← Скрипты отдельно
│   └── meta.json      ← Метаданные
└── index.json         ← Индекс проекта
```

## Преимущества

✅ **Разделение кода** — CSS и JS в отдельных файлах
✅ **Метаданные** — версионирование и описание
✅ **Автоматизация** — GitHub Actions обрабатывает всё
✅ **Минификация** — автоматическая оптимизация
✅ **Валидация** — проверка структуры перед build
✅ **CDN оптимизация** — jsDelivr кэширует файлы
✅ **Масштабируемость** — легко добавлять новые проекты

## Как мигрировать

### Шаг 1: Создать новую структуру

```bash
mkdir -p src/mini/grid-cluster
mkdir -p src/mini/smooth-scroll
```

### Шаг 2: Разделить код из старых файлов

Из `mini/grid-cluster.html`:

```html
<!-- Было -->
<style>
  /* CSS код */
</style>

<script>
  // JS код
</script>
```

Разделить на:
- `src/mini/grid-cluster/style.css` — только CSS
- `src/mini/grid-cluster/script.js` — только JS
- `src/mini/grid-cluster/index.html` — описание

### Шаг 3: Создать meta.json

```json
{
  "name": "grid-cluster",
  "title": "Grid Cluster",
  "version": "1.0.0",
  "description": "Groups consecutive grid-2/grid-3/grid-4 blocks",
  "author": "popskraft",
  "license": "MIT",
  "tags": ["grid", "layout"],
  "files": {
    "css": "style.css",
    "js": "script.js"
  },
  "dependencies": [],
  "changelog": {
    "1.0.0": "Initial release"
  }
}
```

### Шаг 4: Создать index.json для проекта

`src/mini/index.json`:
```json
{
  "project": "mini",
  "title": "Mini Project",
  "description": "Collection of customizations",
  "customizations": [
    {
      "id": "grid-cluster",
      "path": "grid-cluster",
      "enabled": true
    },
    {
      "id": "smooth-scroll",
      "path": "smooth-scroll",
      "enabled": true
    }
  ]
}
```

### Шаг 5: Удалить старые файлы

```bash
# Удалить старые HTML файлы
rm mini/grid-cluster.html
rm mini/smooth-scroll.html

# Старая папка src больше не нужна
rm -rf mini/src/
```

### Шаг 6: Тестировать локально

```bash
npm install
npm run validate
npm run build
```

### Шаг 7: Коммит и пуш

```bash
git add src/ .github/ package.json docs/
git commit -m "Migrate to new CDN deployment architecture"
git push origin main
```

## Результат

После миграции:

1. **GitHub Action** автоматически:
   - Валидирует структуру
   - Минифицирует CSS и JS
   - Генерирует `dist/` файлы
   - Создаёт `docs/CDN-LINKS.md`

2. **CDN ссылки** готовы к использованию:
   ```html
   <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/popskraft/carrd@main/dist/mini/grid-cluster.css">
   <script src="https://cdn.jsdelivr.net/gh/popskraft/carrd@main/dist/mini/grid-cluster.js"></script>
   ```

3. **Обновления** работают автоматически:
   - Редактируете файлы в `src/`
   - Делаете `git push`
   - GitHub Action обновляет CDN

## Откат

Если что-то пошло не так:

```bash
git reset --hard HEAD~1
git push -f origin main
```

## Поддержка

Все ошибки будут видны в:
- Локально: `npm run build`
- GitHub: Actions → Build and Deploy to CDN → Logs
