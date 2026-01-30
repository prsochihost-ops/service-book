# Инструкция по пушу на GitHub

## Шаг 1: Создайте репозиторий на GitHub

1. Перейдите на https://github.com/new
2. Название: `beliy-mys-servicebook`
3. Описание: `Сервис-бук для ресторана "Белый Мыс"`
4. **НЕ** инициализируйте с README/LICENSE/.gitignore
5. Нажмите "Create repository"

## Шаг 2: Подключите удалённый репозиторий

Скопируйте URL репозитория (например: `https://github.com/username/beliy-mys-servicebook.git`)

Затем выполните:

```bash
git remote add origin https://github.com/USERNAME/beliy-mys-servicebook.git
git push -u origin main
```

## Готово! 🎉

Ваш сервис-бук теперь на GitHub!

### Что дальше?

- Откройте `viewer.html` локально для просмотра с навигацией
- Или настройте GitHub Pages для публикации онлайн

### GitHub Pages (опционально)

1. Settings → Pages
2. Source: Deploy from a branch
3. Branch: `main` → `/root` → Save
4. Ваш сервис-бук будет доступен по адресу:
   `https://username.github.io/beliy-mys-servicebook/viewer.html`
