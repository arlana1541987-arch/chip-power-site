import { createFileRoute } from "@tanstack/react-router";
import heroImg from "@/assets/hero.jpg";
import dynoImg from "@/assets/dyno.jpg";
import { CarSelector } from "@/components/CarSelector";
import { BrandGrid } from "@/components/BrandGrid";
import { ApplicationForm } from "@/components/ApplicationForm";
import { CookieBanner } from "@/components/CookieBanner";
import { SiteHeader, SiteFooter } from "@/components/SiteChrome";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Чип-тюнинг в СПб — прошивка ЭБУ Stage 1 / Stage 2 | CHIP·POWER" },
      { name: "description", content: "Профессиональный чип-тюнинг автомобилей в Санкт-Петербурге. Прирост мощности до 40%, гарантия, оплата после замера. Онлайн-калькулятор стоимости." },
      { property: "og:title", content: "Чип-тюнинг СПб — CHIP·POWER" },
      { property: "og:description", content: "Прошивка ЭБУ Stage 1/2 с гарантией. Более 8 000 автомобилей. Онлайн-расчёт стоимости." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <div className="min-h-screen">
      <SiteHeader />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <img src={heroImg} alt="Чип-тюнинг двигателя" width={1920} height={1088}
          className="absolute inset-0 h-full w-full object-cover opacity-40" />
        <div className="absolute inset-0" style={{ background: "var(--gradient-dark)" }} />
        <div className="relative mx-auto max-w-7xl px-4 py-20 md:px-6 md:py-28 lg:py-36">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs uppercase tracking-widest text-primary">
              <span className="size-1.5 rounded-full bg-primary" /> Чип-тюнинг №1 в СПб
            </div>
            <h1 className="mt-5 font-display text-4xl font-bold leading-tight md:text-6xl lg:text-7xl">
              Больше мощности.<br />
              <span className="text-gradient-fire">Меньше расход.</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg text-muted-foreground">
              Профессиональная прошивка ЭБУ вашего автомобиля. Прирост мощности до <b className="text-foreground">+40%</b>, снижение расхода до <b className="text-foreground">−15%</b>. Гарантия и оплата после результата.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#calc" className="btn-fire rounded-xl px-6 py-3.5 font-semibold">Рассчитать стоимость</a>
              <a href="#zayavka" className="rounded-xl border border-border bg-background/60 px-6 py-3.5 font-semibold backdrop-blur hover:border-primary">Оставить заявку</a>
            </div>
            <div className="mt-10 grid max-w-lg grid-cols-3 gap-4">
              {[["8 000+", "авто прошито"], ["10 лет", "на рынке"], ["24 мес", "гарантии"]].map(([a,b]) => (
                <div key={b} className="rounded-xl border border-border bg-background/40 p-3 backdrop-blur">
                  <div className="text-gradient-fire text-2xl font-bold">{a}</div>
                  <div className="text-xs text-muted-foreground">{b}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Calculator */}
      <section id="calc" className="mx-auto max-w-7xl px-4 py-16 md:px-6">
        <CarSelector />
      </section>

      {/* Brand grid */}
      <section id="brands" className="mx-auto max-w-7xl px-4 py-16 md:px-6">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <div className="text-xs uppercase tracking-widest text-primary">Марки</div>
            <h2 className="mt-2 text-3xl font-bold md:text-4xl">Работаем со всеми популярными марками</h2>
            <p className="mt-2 text-muted-foreground">Нажмите на марку — выберите модель, двигатель и увидите цену.</p>
          </div>
        </div>
        <BrandGrid />
      </section>

      {/* About */}
      <section id="about" className="mx-auto max-w-7xl px-4 py-16 md:px-6">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="relative overflow-hidden rounded-2xl border border-border">
            <img src={dynoImg} loading="lazy" alt="Стенд диагностики" width={1280} height={896} className="h-full w-full object-cover" />
          </div>
          <div>
            <div className="text-xs uppercase tracking-widest text-primary">О компании</div>
            <h2 className="mt-2 text-3xl font-bold md:text-4xl">Технологичный чип-тюнинг — с уважением к вашему авто</h2>
            <p className="mt-4 text-muted-foreground">
              CHIP·POWER — команда инженеров-калибровщиков с опытом более 10 лет. Работаем на собственном
              диностенде, используем оригинальное оборудование CMD Flash, KESS3, MPPS. Каждая прошивка
              собирается индивидуально под ваш двигатель и климат.
            </p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {[
                ["Гарантия 24 месяца", "На каждую прошивку и работу двигателя после."],
                ["Стенд мощности", "Замеры до/после — вы видите реальный результат."],
                ["Возврат стока", "В любой момент бесплатно вернём заводскую прошивку."],
                ["Оплата после замера", "Не устраивает — не платите. Так честно."],
              ].map(([t,d]) => (
                <li key={t} className="rounded-xl border border-border bg-background/40 p-4">
                  <div className="flex items-center gap-2 font-semibold">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-primary"><polyline points="20 6 9 17 4 12"/></svg>
                    {t}
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{d}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="mx-auto max-w-7xl px-4 py-16 md:px-6">
        <div className="text-center">
          <div className="text-xs uppercase tracking-widest text-primary">Как это работает</div>
          <h2 className="mt-2 text-3xl font-bold md:text-4xl">4 шага до +40% мощности</h2>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-4">
          {[
            ["01", "Заявка", "Оставляете заявку — уточняем детали автомобиля."],
            ["02", "Диагностика", "Считываем оригинальный файл ЭБУ и делаем замер на стенде."],
            ["03", "Калибровка", "Инженер собирает индивидуальную прошивку под ваш двигатель."],
            ["04", "Результат", "Заливаем ПО, проводим контрольный замер, выдаём гарантию."],
          ].map(([n,t,d]) => (
            <div key={n} className="card-surface rounded-2xl p-5">
              <div className="text-gradient-fire font-display text-3xl font-bold">{n}</div>
              <div className="mt-2 font-semibold">{t}</div>
              <p className="mt-1 text-sm text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Application form */}
      <section id="zayavka" className="mx-auto max-w-3xl px-4 py-16 md:px-6">
        <ApplicationForm />
      </section>

      <SiteFooter />
      <CookieBanner />
    </div>
  );
}
