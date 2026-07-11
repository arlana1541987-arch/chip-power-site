import { useEffect, useState } from "react";

const KEY = "cookies_ok_v1";

export function CookieBanner() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!localStorage.getItem(KEY)) setShow(true);
  }, []);
  if (!show) return null;
  return (
    <div className="fixed bottom-3 left-3 right-3 z-40 md:left-auto md:right-6 md:bottom-6 md:max-w-md">
      <div className="card-surface rounded-2xl p-4 shadow-2xl">
        <div className="text-sm">
          🍪 Мы используем cookies для улучшения работы сайта и аналитики. Продолжая пользоваться сайтом, вы соглашаетесь с
          {" "}<a href="/privacy" className="text-primary underline">политикой конфиденциальности</a>.
        </div>
        <div className="mt-3 flex gap-2">
          <button onClick={() => { localStorage.setItem(KEY, "1"); setShow(false); }}
            className="btn-fire flex-1 rounded-lg px-4 py-2 text-sm font-semibold">
            Принять
          </button>
          <a href="/privacy" className="rounded-lg border border-border px-4 py-2 text-sm">Подробнее</a>
        </div>
      </div>
    </div>
  );
}
