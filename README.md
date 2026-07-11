# CHIP·POWER — сайт чип-тюнинга в СПб

Лендинг компании по чип-тюнингу: калькулятор стоимости, каталог марок авто, форма заявки, страницы оферты и политики конфиденциальности.

Создан в [Lovable](https://lovable.dev), дорабатывается локально.

## Стек

- React 19 + TypeScript
- [TanStack Start](https://tanstack.com/start) (SSR)
- [TanStack Router](https://tanstack.com/router) (file-based routing)
- Tailwind CSS 4 + shadcn/ui
- Vite 8 + Nitro (деплой на Cloudflare Workers)

## Требования

- Node.js 20+ (рекомендуется 22 LTS)
- npm 10+
- Git

## Быстрый старт

```bash
# Установить зависимости
npm install

# Запустить dev-сервер (http://localhost:8080)
npm run dev

# Собрать production-версию
npm run build

# Предпросмотр production-сборки
npm run preview
```

## Структура проекта

```
src/
  routes/          # Страницы (file-based routing)
    index.tsx      # Главная
    oferta.tsx     # Публичная оферта
    privacy.tsx    # Политика конфиденциальности
    __root.tsx     # Корневой layout
  components/      # React-компоненты
  data/cars.ts     # Марки, модели, цены
  assets/          # Изображения (hero.jpg, dyno.jpg)
  styles.css       # Глобальные стили
public/            # Статические файлы
```

## Скрипты

| Команда | Описание |
|---------|----------|
| `npm run dev` | Dev-сервер с hot reload |
| `npm run build` | Production-сборка в `.output/` |
| `npm run preview` | Предпросмотр сборки |
| `npm run lint` | Проверка ESLint |
| `npm run format` | Форматирование Prettier |

## Git

Локальный репозиторий уже инициализирован (ветка `main`).

Для публикации на GitHub создайте пустой репозиторий и выполните:

```bash
git remote add origin https://github.com/ВАШ_АККАУНТ/chip-power-site.git
git push -u origin main
```

## Деплой

Сборка создаёт `.output/` — готово для Cloudflare Workers (по умолчанию) или других платформ через Nitro.

```bash
npm run build
npx nitro deploy --prebuilt
```

## Изображения

- `src/assets/hero.jpg` — фон главного экрана (двигатель)
- `src/assets/dyno.jpg` — блок «О компании» (мастерская/стенд)

## Связь с Lovable

Проект изначально создан в Lovable. Файл `AGENTS.md` содержит правила синхронизации с Lovable при работе через git.
