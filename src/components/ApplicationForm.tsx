import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { brands } from "@/data/cars";

const COMPANY_EMAIL = "info@chip-tuning-spb.ru";

export function ApplicationForm() {
  const [status, setStatus] = useState<"idle" | "sent">("idle");
  const [form, setForm] = useState({
    name: "", phone: "", brand: "", model: "", year: "", engine: "", comment: "", agree: true,
  });

  const brandObj = brands.find(b => b.slug === form.brand);
  const models = brandObj?.models ?? [];
  const engines = models.find(m => m.model === form.model)?.engines ?? [];

  function set<K extends keyof typeof form>(k: K, v: (typeof form)[K]) {
    setForm(f => ({ ...f, [k]: v }));
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.agree) return;
    const subject = `Заявка на чип-тюнинг: ${brandObj?.name ?? ""} ${form.model}`.trim();
    const body = [
      `Имя: ${form.name}`,
      `Телефон: ${form.phone}`,
      `Марка: ${brandObj?.name ?? form.brand}`,
      `Модель: ${form.model}`,
      `Год выпуска: ${form.year}`,
      `Двигатель: ${form.engine}`,
      `Комментарий: ${form.comment}`,
    ].join("\n");
    const href = `mailto:${COMPANY_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = href;
    setStatus("sent");
  }

  return (
    <form onSubmit={onSubmit} className="card-surface rounded-2xl p-6 md:p-8">
      <div className="mb-6">
        <h3 className="text-2xl md:text-3xl font-bold">Оставить заявку</h3>
        <p className="mt-1 text-sm text-muted-foreground">Перезвоним в течение 10 минут и подберём оптимальное решение.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Ваше имя *">
          <input required value={form.name} onChange={e => set("name", e.target.value)} placeholder="Иван" className={input} />
        </Field>
        <Field label="Телефон *">
          <input required type="tel" value={form.phone} onChange={e => set("phone", e.target.value)} placeholder="+7 (___) ___-__-__" className={input} />
        </Field>

        <Field label="Марка авто *">
          <select required value={form.brand} onChange={e => { set("brand", e.target.value); set("model", ""); set("engine", ""); }} className={input}>
            <option value="">Выберите марку</option>
            {brands.map(b => <option key={b.slug} value={b.slug}>{b.name}</option>)}
          </select>
        </Field>
        <Field label="Модель *">
          <select required value={form.model} onChange={e => { set("model", e.target.value); set("engine", ""); }} disabled={!brandObj} className={input}>
            <option value="">Выберите модель</option>
            {models.map(m => <option key={m.model} value={m.model}>{m.model}</option>)}
          </select>
        </Field>

        <Field label="Год выпуска *">
          <input required type="number" min="1990" max={new Date().getFullYear()} value={form.year} onChange={e => set("year", e.target.value)} placeholder="2020" className={input} />
        </Field>
        <Field label="Двигатель *">
          <select required value={form.engine} onChange={e => set("engine", e.target.value)} disabled={!form.model} className={input}>
            <option value="">Выберите двигатель</option>
            {engines.map(en => <option key={en.engine} value={en.engine}>{en.engine}</option>)}
          </select>
        </Field>

        <Field label="Комментарий" full>
          <textarea rows={3} value={form.comment} onChange={e => set("comment", e.target.value)} placeholder="Пожелания, время звонка..." className={input} />
        </Field>
      </div>

      <label className="mt-4 flex items-start gap-2 text-xs text-muted-foreground">
        <input type="checkbox" checked={form.agree} onChange={e => set("agree", e.target.checked)} className="mt-0.5 accent-primary" />
        <span>Отправляя форму, я соглашаюсь с <Link to="/privacy" reloadDocument className="text-primary underline">политикой конфиденциальности</Link> и <Link to="/oferta" reloadDocument className="text-primary underline">офертой</Link>.</span>
      </label>

      <button type="submit" disabled={!form.agree} className="btn-fire mt-5 w-full rounded-xl py-3.5 font-semibold disabled:opacity-50">
        {status === "sent" ? "Заявка сформирована ✓" : "Отправить заявку"}
      </button>

      <p className="mt-3 text-center text-xs text-muted-foreground">
        Заявка будет отправлена на {COMPANY_EMAIL}
      </p>
    </form>
  );
}

const input = "w-full rounded-lg border border-border bg-input px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30 disabled:opacity-50";

function Field({ label, children, full }: { label: string; children: React.ReactNode; full?: boolean }) {
  return (
    <label className={`block ${full ? "md:col-span-2" : ""}`}>
      <span className="mb-1.5 block text-xs uppercase tracking-wider text-muted-foreground">{label}</span>
      {children}
    </label>
  );
}
