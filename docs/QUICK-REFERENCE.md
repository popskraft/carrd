# ⚡ Быстрый справочник

## 🎯 Команды

```bash
npm run validate    # Проверить структуру
npm run build       # Build и генерировать manifest
npm run dev         # Валидация + build
```

## 📁 Структура

```
src/{project}/{name}/
├── index.html      # Описание (опционально)
├── style.css       # Стили
├── script.js       # Скрипты
└── meta.json       # Метаданные
```

## 📝 meta.json шаблон

```json
{
  "name": "grid-cluster",
  "title": "Grid Cluster",
  "version": "1.0.0",
  "description": "Short description",
  "author": "popskraft",
  "license": "MIT",
  "tags": ["tag1", "tag2"],
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

## 🔗 CDN URL

```
https://cdn.jsdelivr.net/gh/popskraft/carrd@main/dist/{project}/{name}.css
https://cdn.jsdelivr.net/gh/popskraft/carrd@main/dist/{project}/{name}.js
```

## 📋 Чек-лист первичной настройки

```bash
# 1. Установка
npm install

# 2. Валидация
npm run validate
# Результат: ✓ Validation passed!

# 3. Build
npm run build
# Результат: ✨ Build complete!

# 4. Проверка
ls -la dist/mini/
cat docs/CDN-LINKS.md

# 5. Коммит и пуш
git add .
git commit -m "Setup: New CDN deployment"
git push origin main

# 6. GitHub Actions
# Откройте https://github.com/popskraft/carrd/actions
# Дождитесь завершения Build and Deploy to CDN
```

## 🔄 Рабочий процесс

```bash
# 1. Редактируете код
nano src/mini/grid-cluster/style.css
nano src/mini/grid-cluster/script.js

# 2. Локально тестируете
npm run build

# 3. Коммитите и пушите
git add src/
git commit -m "Update: grid-cluster"
git push origin main

# 4. GitHub Action обновит CDN автоматически
```

## ➕ Добавление новой кастомизации

```bash
# 1. Создать папку
mkdir -p src/mini/smooth-scroll

# 2. Создать файлы
touch src/mini/smooth-scroll/{index.html,style.css,script.js,meta.json}

# 3. Заполнить файлы
# - index.html: описание
# - style.css: стили
# - script.js: скрипты
# - meta.json: метаданные

# 4. Обновить index.json
# Добавить в src/mini/index.json:
# {
#   "id": "smooth-scroll",
#   "path": "smooth-scroll",
#   "enabled": true
# }

# 5. Валидировать и build
npm run validate
npm run build

# 6. Коммит и пуш
git add src/
git commit -m "Add: smooth-scroll customization"
git push origin main
```

## 🐛 Решение проблем

### Ошибка: "Missing meta.json"
```bash
ls -la src/mini/grid-cluster/
# Должны быть: index.html, style.css, script.js, meta.json
```

### Ошибка: "Missing CSS/JS file"
```bash
cat src/mini/grid-cluster/meta.json
# Проверить files.css и files.js
```

### CDN ссылки не обновляются
```bash
# 1. Дождитесь GitHub Action
# 2. Очистите кэш: добавьте ?v=1.0.1
# 3. Проверьте docs/CDN-LINKS.md
```

## 📚 Документация

| Файл | Назначение |
|------|-----------|
| **README.md** | Обзор |
| **GETTING-STARTED.md** | Быстрый старт |
| **ARCHITECTURE.md** | Архитектура |
| **WORKFLOW.md** | Диаграммы |
| **CHECKLIST.md** | Полный чек-лист |
| **INDEX.md** | Полный индекс |

## 🎯 Использование в Carrd

```html
<!-- Скопируйте из docs/CDN-LINKS.md -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/popskraft/carrd@main/dist/mini/grid-cluster.css">
<script src="https://cdn.jsdelivr.net/gh/popskraft/carrd@main/dist/mini/grid-cluster.js"></script>
```

## 📊 Структура файлов

```
dist/mini/
├── grid-cluster.css    ← Минифицирован
├── grid-cluster.js     ← Минифицирован
└── ...

docs/CDN-LINKS.md       ← Готовые ссылки
dist/manifest.json      ← Индекс файлов
```

## ⏱️ Временная шкала

```
t=0s    → git push
t=30s   → GitHub Action завершён
t=60s   → jsDelivr кэширует
t=120s  → CDN готов
```

## 🔐 Git команды

```bash
git add src/                    # Добавить исходники
git add dist/ docs/CDN-LINKS.md # Добавить результаты
git commit -m "message"         # Коммит
git push origin main            # Пуш
git log -n 5                    # История
git status                      # Статус
```

## 🛠️ Полезные команды

```bash
# Проверить структуру
tree src/

# Посмотреть CDN ссылки
cat docs/CDN-LINKS.md

# Посмотреть manifest
cat dist/manifest.json | jq

# Размер файлов
du -sh dist/mini/*

# Проверить git статус
git status

# Последние коммиты
git log --oneline -n 10
```

## 📱 Мобильный чек-лист

- [ ] Валидация: `npm run validate`
- [ ] Build: `npm run build`
- [ ] Проверка: `ls -la dist/mini/`
- [ ] Коммит: `git push origin main`
- [ ] GitHub Actions: завершился?
- [ ] CDN ссылки: в `docs/CDN-LINKS.md`?
- [ ] Carrd: вставлены ссылки?
- [ ] Тест: работает на сайте?

## 🎓 Обучение

1. **Новичок?** → [GETTING-STARTED.md](GETTING-STARTED.md)
2. **Хотите понять?** → [ARCHITECTURE.md](docs/ARCHITECTURE.md)
3. **Визуально?** → [WORKFLOW.md](WORKFLOW.md)
4. **Проверяете?** → [CHECKLIST.md](CHECKLIST.md)
5. **Ищете?** → [INDEX.md](INDEX.md)

## 🚀 Быстрый старт (3 минуты)

```bash
npm install              # 30 сек
npm run validate         # 5 сек
npm run build            # 10 сек
git push origin main     # 5 сек
# GitHub Action: 30 сек
# Итого: ~2 минуты
```

## 📞 Помощь

**Ошибки:**
- Локально: `npm run build`
- GitHub: Actions → Logs

**Вопросы:**
- Документация: [INDEX.md](INDEX.md)
- Примеры: [GETTING-STARTED.md](GETTING-STARTED.md)

---

**Готово!** Начните с `npm install` → `npm run build` → `git push`
