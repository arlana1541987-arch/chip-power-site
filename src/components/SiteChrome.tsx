import { Link } from "@tanstack/react-router";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-border/60 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">
        <Link to="/" className="flex items-center gap-2">
          <div className="grid size-9 place-items-center rounded-lg" style={{ background: "var(--gradient-fire)" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><path d="M13 2 3 14h7l-1 8 10-12h-7l1-8Z" /></svg>
          </div>
          <div className="leading-tight">
            <div className="font-display text-lg font-bold tracking-wide">CHIP·POWER</div>
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Чип-тюнинг СПб</div>
          </div>
        </Link>
        <nav className="hidden gap-6 text-sm md:flex">
          <a href="/#calc" className="hover:text-primary">Калькулятор</a>
          <a href="/#brands" className="hover:text-primary">Марки</a>
          <a href="/#about" className="hover:text-primary">О нас</a>
          <a href="/#zayavka" className="hover:text-primary">Заявка</a>
          <a href="/#contacts" className="hover:text-primary">Контакты</a>
        </nav>
        <a href="tel:+78121234567" className="hidden md:inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm hover:border-primary">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
          +7 (812) 123-45-67
        </a>
        <a href="/#zayavka" className="btn-fire md:hidden rounded-lg px-3 py-2 text-xs font-semibold">Заявка</a>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer id="contacts" className="mt-20 border-t border-border/60 bg-background/60">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 md:grid-cols-4 md:px-6">
        <div>
          <div className="font-display text-xl font-bold">CHIP·POWER</div>
          <p className="mt-2 text-sm text-muted-foreground">Профессиональный чип-тюнинг в Санкт-Петербурге с 2014 года. Более 8 000 успешных прошивок.</p>
        </div>
        <div>
          <div className="mb-2 text-sm font-semibold">Контакты</div>
          <ul className="space-y-1.5 text-sm text-muted-foreground">
            <li>СПб, ул. Автомобильная, 12</li>
            <li><a href="tel:+78121234567" className="hover:text-primary">+7 (812) 123-45-67</a></li>
            <li><a href="mailto:info@chip-tuning-spb.ru" className="hover:text-primary">info@chip-tuning-spb.ru</a></li>
            <li>Ежедневно 10:00 – 21:00</li>
          </ul>
        </div>
        <div>
          <div className="mb-2 text-sm font-semibold">Услуги</div>
          <ul className="space-y-1.5 text-sm text-muted-foreground">
            <li>Stage 1 / Stage 2</li>
            <li>Отключение EGR, DPF, AdBlue</li>
            <li>Удаление сажевого фильтра</li>
            <li>Диагностика ЭБУ</li>
          </ul>
        </div>
        <div>
          <div className="mb-2 text-sm font-semibold">Документы</div>
          <ul className="space-y-1.5 text-sm text-muted-foreground">
            <li><Link to="/oferta" className="hover:text-primary">Оферта</Link></li>
            <li><Link to="/privacy" className="hover:text-primary">Политика конфиденциальности</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/60 py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} CHIP·POWER. Все права защищены.
      </div>
    </footer>
  );
}
