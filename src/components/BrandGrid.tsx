import { useEffect, useState } from "react";
import { brands, type CarBrand, type CarModel, type EnginePrice } from "@/data/cars";
import { BrandMark } from "./BrandMark";
import { formatRub } from "@/lib/format";

type Step = "brand" | "model" | "engine" | "price";

export function BrandGrid() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>("brand");
  const [brand, setBrand] = useState<CarBrand | null>(null);
  const [model, setModel] = useState<CarModel | null>(null);
  const [engine, setEngine] = useState<EnginePrice | null>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  function openBrand(b: CarBrand) {
    setBrand(b); setModel(null); setEngine(null); setStep("model"); setOpen(true);
  }
  function close() {
    setOpen(false);
    setTimeout(() => { setStep("brand"); setBrand(null); setModel(null); setEngine(null); }, 200);
  }

  return (
    <>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {brands.map((b) => (
          <button
            key={b.slug}
            onClick={() => openBrand(b)}
            className="group card-surface flex flex-col items-center gap-3 rounded-xl p-4 transition hover:-translate-y-1 hover:border-primary/50"
          >
            <BrandMark brand={b} size={64} />
            <div className="text-sm font-semibold">{b.name}</div>
            <div className="text-[11px] uppercase tracking-wider text-muted-foreground">
              {b.models.length} моделей
            </div>
          </button>
        ))}
      </div>

      {open && brand && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-sm p-3 sm:p-6" onClick={close}>
          <div
            className="card-surface w-full max-w-2xl overflow-hidden rounded-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 border-b border-border p-4">
              {step !== "brand" && step !== "model" && (
                <button onClick={() => setStep(step === "price" ? "engine" : "model")}
                  className="rounded-lg border border-border p-2 text-muted-foreground hover:text-foreground">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>
                </button>
              )}
              <BrandMark brand={brand} size={44} />
              <div className="flex-1 min-w-0">
                <div className="font-display text-lg font-bold truncate">{brand.name}</div>
                <div className="text-xs text-muted-foreground truncate">
                  {step === "model" && "Выберите модель"}
                  {step === "engine" && model?.model}
                  {step === "price" && `${model?.model} · ${engine?.engine}`}
                </div>
              </div>
              <button onClick={close} className="rounded-lg border border-border p-2 text-muted-foreground hover:text-foreground">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>

            <div className="max-h-[65vh] overflow-y-auto p-4">
              {step === "model" && (
                <div className="grid gap-2 sm:grid-cols-2">
                  {brand.models.map((m) => (
                    <button key={m.model} onClick={() => { setModel(m); setStep("engine"); }}
                      className="flex items-center justify-between rounded-xl border border-border bg-background/40 p-4 text-left transition hover:border-primary/60 hover:bg-primary/5">
                      <div>
                        <div className="font-semibold">{m.model}</div>
                        <div className="text-xs text-muted-foreground">{m.engines.length} двигателей</div>
                      </div>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary"><polyline points="9 18 15 12 9 6"/></svg>
                    </button>
                  ))}
                </div>
              )}

              {step === "engine" && model && (
                <div className="grid gap-2">
                  {model.engines.map((e) => (
                    <button key={e.engine} onClick={() => { setEngine(e); setStep("price"); }}
                      className="flex items-center justify-between rounded-xl border border-border bg-background/40 p-4 text-left transition hover:border-primary/60 hover:bg-primary/5">
                      <div className="font-medium">{e.engine}</div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-muted-foreground">от <span className="text-foreground font-semibold">{formatRub(e.stage1)}</span></span>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary"><polyline points="9 18 15 12 9 6"/></svg>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {step === "price" && engine && (
                <div className="space-y-4">
                  <div className="rounded-2xl border border-primary/40 bg-primary/5 p-6 text-center">
                    <div className="text-xs uppercase tracking-widest text-muted-foreground">Стоимость услуги</div>
                    <div className="mt-2 text-5xl font-bold text-gradient-fire">{formatRub(engine.stage1)}</div>
                    <div className="mt-1 text-sm text-muted-foreground">Stage 1 · «под ключ» с гарантией</div>
                    {engine.stage2 && (
                      <div className="mt-4 border-t border-border pt-4">
                        <div className="text-xs uppercase tracking-widest text-muted-foreground">Stage 2</div>
                        <div className="text-2xl font-bold">{formatRub(engine.stage2)}</div>
                      </div>
                    )}
                  </div>
                  <ul className="grid gap-2 sm:grid-cols-2 text-sm">
                    {["Гарантия на прошивку", "Возврат стока по запросу", "Диагностика в подарок", "Оплата после замера"].map(x => (
                      <li key={x} className="flex items-center gap-2 rounded-lg border border-border bg-background/40 p-3">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-primary"><polyline points="20 6 9 17 4 12"/></svg>
                        {x}
                      </li>
                    ))}
                  </ul>
                  <a href="#zayavka" onClick={close}
                    className="btn-fire block w-full rounded-xl py-3.5 text-center font-semibold">
                    Оставить заявку на тюнинг
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
