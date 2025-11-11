# Первичная настройка

## Требования

- Node.js 14+
- Git
- GitHub репозиторий с GitHub Pages включённым

## Шаг 1: Клонирование и установка

```bash
cd /Users/popskraft/projects/carrd
npm install
```

## Шаг 2: Валидация структуры

```bash
npm run validate
```

Проверит:
- Наличие всех необходимых файлов
- Корректность JSON структуры
- Наличие CSS и JS файлов

## Шаг 3: Локальный build

```bash
npm run build
```

Создаст:
- `dist/` — готовые файлы
- `dist/manifest.json` — индекс всех файлов
- `docs/CDN-LINKS.md` — все CDN ссылки

## Шаг 4: Проверка результатов

```bash
# Проверить структуру dist
ls -la dist/mini/

# Посмотреть manifest
cat dist/manifest.json

# Посмотреть CDN ссылки
cat docs/CDN-LINKS.md
```

## Шаг 5: Коммит и пуш

```bash
git add src/ .github/ package.json docs/
git commit -m "Setup: New CDN deployment architecture"
git push origin main
```

## Шаг 6: GitHub Actions

1. Откройте https://github.com/popskraft/carrd/actions
2. Дождитесь завершения workflow `Build and Deploy to CDN`
3. Проверьте `dist/` и `docs/CDN-LINKS.md`

## Использование в Carrd

1. Откройте `docs/CDN-LINKS.md`
2. Скопируйте нужные ссылки
3. Вставьте в Custom Code в Carrd:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/popskraft/carrd@main/dist/mini/grid-cluster.css">
<script src="https://cdn.jsdelivr.net/gh/popskraft/carrd@main/dist/mini/grid-cluster.js"></script>
```

## Обновление кода

1. Отредактируйте файлы в `src/`
2. Запустите локально: `npm run build`
3. Сделайте `git push`
4. GitHub Action автоматически обновит CDN

## Команды

```bash
npm run validate    # Проверить структуру
npm run build       # Build и генерировать manifest
npm run dev         # Валидация + build
```

## Решение проблем

### Ошибка: "Missing meta.json"
- Проверьте, что в каждой кастомизации есть `meta.json`

### Ошибка: "Missing CSS/JS file"
- Проверьте пути в `meta.json` → `files.css` и `files.js`

### CDN ссылки не обновляются
- Дождитесь завершения GitHub Action
- Очистите кэш jsDelivr: добавьте `?v=1.0.1` к ссылке

## Поддержка

Все ошибки будут видны в:
- Локально: консоль при `npm run build`
- GitHub: Actions → Build and Deploy to CDN → Logs
