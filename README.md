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

Репозиторий: https://github.com/arlana1541987-arch/chip-power-site

**Важно:** GitHub хранит код, но **не запускает сайт сам по себе**.  
Страница репозитория на github.com — это не адрес вашего сайта в интернете.

| Что | Где открывается |
|-----|-----------------|
| Код на GitHub | https://github.com/arlana1541987-arch/chip-power-site |
| Сайт локально | http://localhost:8080 (после `npm run dev`) |
| Сайт без VPN (Россия) | https://arlana1541987-arch.github.io/chip-power-site/ |
| Сайт с SSR (Cloudflare) | https://arlana1541987-arch-chip-power-site.chip-power.workers.dev |

> **Важно:** адрес `*.workers.dev` в России часто блокируется провайдерами — для доступа без VPN используйте GitHub Pages (ссылка выше). Для постоянного адреса на своём домене подключите домен в Cloudflare: Workers → ваш Worker → Settings → Domains & Routes.

## Публикация в интернет (Cloudflare Pages)

Проект собран под **Cloudflare Workers** (SSR). После настройки каждый `git push` будет автоматически обновлять сайт.

### Шаг 1. Cloudflare (бесплатно)

1. Зарегистрируйтесь на https://dash.cloudflare.com/sign-up
2. Откройте **My Profile → API Tokens → Create Token**
3. Используйте шаблон **Edit Cloudflare Workers** (или права: Account → Cloudflare Pages → Edit, Workers → Edit)
4. Скопируйте токен
5. Account ID найдите на главной странице Cloudflare Dashboard (справа в блоке Account)

### Шаг 2. Секреты в GitHub

1. Откройте https://github.com/arlana1541987-arch/chip-power-site/settings/secrets/actions
2. Добавьте два секрета:
   - `CLOUDFLARE_API_TOKEN` — ваш токен
   - `CLOUDFLARE_ACCOUNT_ID` — ваш Account ID

### Шаг 3. Запуск деплоя

После добавления секретов:
- сделайте любой `git push` в ветку `main`, **или**
- откройте вкладку **Actions** в репозитории и нажмите **Run workflow**

Готовый сайт появится на адресе вида:  
`https://arlana1541987-arch-chip-power-site.<ваш-поддомен>.workers.dev`

## Деплой вручную (с вашего компьютера)

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
