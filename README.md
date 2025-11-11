# Carrd Customizations

Автоматический деплой кастомизаций на jsDelivr CDN.

---

## 🚀 Быстрый старт (5 минут)

```bash
npm install              # Установка
npm run validate         # Валидация
npm run build            # Build
git push origin main     # Пуш
# GitHub Action обновит CDN автоматически
```

---

## 📁 Структура проекта

```
/carrd/
├── 📄 README.md                 ← Этот файл
├── 📄 BREAKPOINTS.md            ← Стандартные breakpoints
│
├── 📁 docs/                     ← ДОКУМЕНТАЦИЯ
│   ├── GETTING-STARTED.md
│   ├── ARCHITECTURE.md
│   ├── QUICK-REFERENCE.md
│   └── ...
│
├── 📁 .github/
│   ├── scripts/
│   │   ├── build.js             ← Минификация
│   │   └── validate.js          ← Валидация
│   └── workflows/
│       └── build-and-deploy.yml ← GitHub Actions
│
├── 📁 src/                      ← РАЗРАБОТКА
│   └── mini/
│       ├── grid-cluster/
│       │   ├── style.css        ← CSS (разработка)
│       │   ├── script.js        ← JS (разработка)
│       │   ├── index.html       ← Описание
│       │   └── meta.json        ← Метаданные
│       └── index.json
│
├── 📁 dist/                     ← ГОТОВЫЕ ФАЙЛЫ (генерируется)
│   └── mini/
│       ├── grid-cluster.css     ← Минифицированный CSS
│       └── grid-cluster.js      ← Минифицированный JS
│
├── 📁 mini/                     ← СПРАВОЧНИК (не для разработки!)
│   └── src/                     ← Эталон сайта
│       ├── index.html           ← Структура сайта
│       └── assets/
│           ├── main.css         ← Существующие стили
│           └── main.js          ← Существующие скрипты
│
└── 📄 package.json
```

---

## 🎯 Как это работает

### Разработка
```
1. Пишем CSS в src/mini/grid-cluster/style.css
2. Пишем JS в src/mini/grid-cluster/script.js
3. Смотрим mini/src/ для справки (селекторы, классы)
```

### Деплой
```
npm run build (локально)
        ↓
git push origin main
        ↓
GitHub Action (автоматически)
  ✓ Валидирует структуру
  ✓ Минифицирует CSS и JS
  ✓ Генерирует dist/
        ↓
jsDelivr CDN кэширует файлы
        ↓
Используете CDN ссылки в Carrd
```

### Использование на сайте
```
Carrd → Settings → Custom Code
        ↓
Вставляем две ссылки:
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/...">
  <script src="https://cdn.jsdelivr.net/..."></script>
        ↓
Кастомизация работает на сайте
```

---

## 🔗 CDN ссылки

Все ссылки генерируются автоматически в `docs/CDN-LINKS.md`:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/popskraft/carrd@main/dist/mini/grid-cluster.css">
<script src="https://cdn.jsdelivr.net/gh/popskraft/carrd@main/dist/mini/grid-cluster.js"></script>
```

---

## 📝 Добавление новой кастомизации

### Структура
```
src/mini/grid-cluster/
├── style.css           ← Только CSS (разработка)
├── script.js           ← Только JS (разработка)
├── index.html          ← Описание (опционально)
└── meta.json           ← Метаданные
```

### Процесс
1. Создайте папку: `src/{project}/{name}/`
2. Добавьте файлы (CSS и JS отдельно)
3. Обновите `src/{project}/index.json`
4. Запустите: `npm run build`
5. Проверьте: `dist/{project}/{name}.{css,js}`
6. Сделайте: `git push`
7. GitHub Action обновит CDN автоматически

### Использование
```html
<!-- Вставляем в Custom Code на Carrd -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/popskraft/carrd@main/dist/mini/grid-cluster.css">
<script src="https://cdn.jsdelivr.net/gh/popskraft/carrd@main/dist/mini/grid-cluster.js"></script>
```

---

## 🛠️ Команды

```bash
npm run validate    # Проверить структуру
npm run build       # Build и генерировать manifest
npm run dev         # Валидация + build
```

---

## 📚 Документация

Все файлы находятся в папке `docs/`:

| Файл | Назначение | Время |
|------|-----------|-------|
| **GETTING-STARTED.md** | Пошаговое руководство | 30 мин |
| **ARCHITECTURE.md** | Архитектура проекта | 20 мин |
| **QUICK-REFERENCE.md** | Быстрый справочник | 5 мин |
| **WORKFLOW.md** | Диаграммы и схемы | 15 мин |
| **SETUP.md** | Первичная настройка | 20 мин |
| **MIGRATION.md** | Миграция со старой структуры | 15 мин |
| **CHECKLIST.md** | Полный чек-лист | 30 мин |
| **INDEX.md** | Полный индекс | 10 мин |
| **TASK-CLARIFICATION.md** | Уточнение задачи | 10 мин |
| **UNDERSTANDING-REPORT.md** | Репорт понимания | 10 мин |
| **STRUCTURE-ANALYSIS.md** | Анализ структуры | 10 мин |
| **ISSUES-FIXED.md** | Исправленные проблемы | 5 мин |
| **CDN-LINKS.md** | CDN ссылки (генерируется) | - |

---

## ✨ Ключевые особенности

✅ **Разделение кода** — CSS и JS в отдельных файлах
✅ **Автоматическая минификация** — экономия трафика
✅ **Валидация структуры** — проверка перед build
✅ **Метаданные** — версионирование и описание
✅ **GitHub Actions** — полная автоматизация
✅ **jsDelivr CDN** — глобальное распределение
✅ **Полная документация** — 9 файлов с примерами
✅ **Масштабируемость** — легко добавлять новое

---

## 🎓 Выбирайте по своим потребностям

| Я хочу... | Читайте |
|-----------|---------|
| Быстро начать | [docs/GETTING-STARTED.md](docs/GETTING-STARTED.md) |
| Понять архитектуру | [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) |
| Увидеть диаграммы | [docs/WORKFLOW.md](docs/WORKFLOW.md) |
| Быстрый справочник | [docs/QUICK-REFERENCE.md](docs/QUICK-REFERENCE.md) |
| Полный чек-лист | [docs/CHECKLIST.md](docs/CHECKLIST.md) |
| Найти что-то | [docs/INDEX.md](docs/INDEX.md) |
| Мигрировать | [docs/MIGRATION.md](docs/MIGRATION.md) |

---

## 📞 Помощь

**Ошибки?**
- Локально: `npm run build`
- GitHub: Actions → Build and Deploy to CDN → Logs

**Вопросы?**
- Документация: [docs/INDEX.md](docs/INDEX.md)
- Примеры: [docs/GETTING-STARTED.md](docs/GETTING-STARTED.md)
- Справочник: [docs/QUICK-REFERENCE.md](docs/QUICK-REFERENCE.md)

---

## 📄 Лицензия

MIT
