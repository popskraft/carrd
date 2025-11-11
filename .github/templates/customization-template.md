# Шаблон для новой кастомизации

## Структура папки

```
src/{project}/{name}/
├── index.html       # Описание (опционально)
├── style.css        # Стили
├── script.js        # Скрипты
└── meta.json        # Метаданные
```

## index.html

```html
<!-- 
  {Title} - {Short description}
  
  Features:
  - Feature 1
  - Feature 2
  
  Usage:
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/popskraft/carrd@main/dist/{project}/{name}.css">
  <script src="https://cdn.jsdelivr.net/gh/popskraft/carrd@main/dist/{project}/{name}.js"></script>
-->
```

## style.css

```css
/* Минимум комментариев, только код */
.selector {
  property: value;
}
```

## script.js

```javascript
// Используйте IIFE для изоляции scope
(function() {
  // Ваш код здесь
})();
```

## meta.json

```json
{
  "name": "{name}",
  "title": "{Title}",
  "version": "1.0.0",
  "description": "Short description",
  "author": "popskraft",
  "license": "MIT",
  "tags": ["tag1", "tag2"],
  "breakpoints": {
    "mobile": 736,
    "tablet": 1024,
    "desktop": 1681
  },
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

## Обновление index.json проекта

В `src/{project}/index.json` добавьте:

```json
{
  "customizations": [
    {
      "id": "{name}",
      "path": "{name}",
      "enabled": true
    }
  ]
}
```

## Команды

```bash
# Валидировать структуру
npm run validate

# Build локально
npm run build

# Проверить результат
cat dist/{project}/{name}.css
cat dist/{project}/{name}.js
```

## Требования

✅ Все файлы должны быть в папке `src/{project}/{name}/`
✅ Обязательны: `style.css`, `script.js`, `meta.json`
✅ Опционально: `index.html`
✅ Код должен быть минимизирован (без лишних комментариев)
✅ Используйте IIFE в JavaScript
✅ Версионирование в meta.json
