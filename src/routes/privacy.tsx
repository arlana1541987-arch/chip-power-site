import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/SiteChrome";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Политика конфиденциальности — CHIP·POWER" },
      { name: "description", content: "Политика обработки персональных данных CHIP·POWER." },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <article className="mx-auto max-w-3xl px-4 py-16 md:px-6">
        <h1 className="font-display text-4xl font-bold">Политика конфиденциальности</h1>
        <p className="mt-2 text-sm text-muted-foreground">Действует с {new Date().toLocaleDateString("ru-RU")}</p>

        <Section title="1. Термины">
          Персональные данные — любая информация, относящаяся к прямо или косвенно определённому физическому лицу
          (субъекту персональных данных).
        </Section>
        <Section title="2. Какие данные мы собираем">
          Имя, номер телефона, электронная почта, сведения об автомобиле (марка, модель, год, двигатель), а также
          технические данные о посещении сайта (cookies, IP-адрес, тип устройства).
        </Section>
        <Section title="3. Цели обработки">
          Обработка заявок, консультация, оказание услуг чип-тюнинга, информирование о статусе работ, улучшение
          качества сервиса и работы сайта.
        </Section>
        <Section title="4. Правовые основания">
          Обработка осуществляется на основании согласия субъекта персональных данных, полученного при отправке
          формы или иного обращения, а также в соответствии с ФЗ №152-ФЗ «О персональных данных».
        </Section>
        <Section title="5. Передача третьим лицам">
          Персональные данные не передаются третьим лицам, за исключением случаев, прямо предусмотренных
          законодательством РФ.
        </Section>
        <Section title="6. Cookies">
          Сайт использует файлы cookies для корректной работы, аналитики и улучшения пользовательского опыта.
          Продолжая пользоваться сайтом, вы соглашаетесь с использованием cookies. Вы можете отключить их в настройках
          браузера.
        </Section>
        <Section title="7. Права субъекта данных">
          Вы вправе запросить сведения об обработке ваших данных, потребовать их уточнения, блокирования или
          удаления, а также отозвать согласие на обработку, направив запрос на info@chip-tuning-spb.ru.
        </Section>
        <Section title="8. Контакты">
          По вопросам обработки персональных данных: info@chip-tuning-spb.ru, +7 (812) 123-45-67.
        </Section>
      </article>
      <SiteFooter />
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-8">
      <h2 className="font-display text-2xl font-bold">{title}</h2>
      <p className="mt-3 text-muted-foreground leading-relaxed">{children}</p>
    </section>
  );
}
