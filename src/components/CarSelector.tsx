import { useMemo, useState } from "react";
import { brands } from "@/data/cars";
import { formatRub } from "@/lib/format";

export function CarSelector() {
  const [brandSlug, setBrandSlug] = useState("");
  const [model, setModel] = useState("");
  const [engine, setEngine] = useState("");

  const brand = useMemo(() => brands.find(b => b.slug === brandSlug), [brandSlug]);
  const models = brand?.models ?? [];
  const engines = useMemo(() => models.find(m => m.model === model)?.engines ?? [], [models, model]);
  const priceRow = engines.find(e => e.engine === engine);

  return (
    <div className="card-surface rounded-2xl p-6 md:p-8">
      <div className="mb-4">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs uppercase tracking-widest text-primary">
          <span className="size-1.5 rounded-full bg-primary animate-pulse" />
          Онлайн-калькулятор
        </div>
        <h3 className="mt-3 text-2xl md:text-3xl font-bold">Узнайте стоимость чип-тюнинга</h3>
        <p className="mt-1 text-muted-foreground text-sm">Выберите марку, модель и двигатель — получите цену за 5 секунд.</p>
      </div>
      <div className="grid gap-3 md:grid-cols-3">
        <Select label="Марка" value={brandSlug} onChange={(v) => { setBrandSlug(v); setModel(""); setEngine(""); }}
          options={brands.map(b => ({ value: b.slug, label: b.name }))} placeholder="Выберите марку" />
        <Select label="Модель" value={model} onChange={(v) => { setModel(v); setEngine(""); }}
          options={models.map(m => ({ value: m.model, label: m.model }))} placeholder="Выберите модель" disabled={!brand} />
        <Select label="Двигатель" value={engine} onChange={setEngine}
          options={engines.map(e => ({ value: e.engine, label: e.engine }))} placeholder="Выберите двигатель" disabled={!model} />
      </div>

      {priceRow && (
        <div className="mt-6 grid gap-3 md:grid-cols-2">
          <PriceCard title="Stage 1" price={priceRow.stage1}
            desc="Оптимальный прирост мощности и крутящего момента. Заводская надёжность сохраняется." highlight />
          {priceRow.stage2 ? (
            <PriceCard title="Stage 2" price={priceRow.stage2}
              desc="Максимальный прирост с доработкой впуска/выпуска. Для энтузиастов." />
          ) : (
            <div className="rounded-xl border border-dashed border-border p-5 text-sm text-muted-foreground">
              Stage 2 недоступен для этого двигателя. Уточните у мастера индивидуальные решения.
            </div>
          )}
          <div className="md:col-span-2 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-background/40 p-4">
            <div className="text-sm text-muted-foreground">
              Гарантия на прошивку · Диагностика в подарок · Возможность возврата стока
            </div>
            <a href="#zayavka" className="btn-fire rounded-lg px-5 py-2.5 text-sm font-semibold">
              Записаться на тюнинг →
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

function Select({ label, value, onChange, options, placeholder, disabled }: {
  label: string; value: string; onChange: (v: string) => void;
  options: { value: string; label: string }[]; placeholder: string; disabled?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs uppercase tracking-wider text-muted-foreground">{label}</span>
      <div className="relative">
        <select
          disabled={disabled}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none rounded-lg border border-border bg-input px-4 py-3 pr-9 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30 disabled:opacity-50"
        >
          <option value="">{placeholder}</option>
          {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
        <svg className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
      </div>
    </label>
  );
}

function PriceCard({ title, price, desc, highlight }: { title: string; price: number; desc: string; highlight?: boolean }) {
  return (
    <div className={`rounded-xl border p-5 ${highlight ? "border-primary/50 bg-primary/5" : "border-border bg-background/40"}`}>
      <div className="flex items-baseline justify-between gap-2">
        <div className="font-display text-lg font-semibold">{title}</div>
        <div className="text-2xl font-bold text-gradient-fire">{formatRub(price)}</div>
      </div>
      <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
    </div>
  );
}
