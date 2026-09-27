import type { Metadata } from "next";
import Link from "next/link";
import { SOCIAL_LINKS } from "@/shared/socialLinks";
import "./maintenance.css";

export const metadata: Metadata = {
  title: "Техническое обслуживание | Art Nexus",
  description: "Сайт Art Nexus временно недоступен. Мы скоро вернёмся.",
  robots: { index: false, follow: false },
};

export default function MaintenancePage() {
  return (
    <div className="maintenance-page">
      <div className="maintenance-page__inner">
        <img src="/logo.svg" alt="Art Nexus" className="maintenance-page__logo" />

        <h1 className="maintenance-page__title">Сайт на техническом обслуживании</h1>
        <p className="maintenance-page__text">
          Мы обновляем витрину и скоро снова откроемся. Пока вы можете написать нам
          или следить за новостями в соцсетях.
        </p>

        <div className="maintenance-page__social" aria-label="Соцсети Art Nexus">
          <a
            href={SOCIAL_LINKS.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="maintenance-page__social-btn"
            aria-label="Instagram Art Nexus"
          >
            <img src="/icons/inst.svg" alt="" width={28} height={28} />
          </a>
          <a
            href={SOCIAL_LINKS.telegramChannel}
            target="_blank"
            rel="noopener noreferrer"
            className="maintenance-page__social-btn"
            aria-label="Telegram Art Nexus"
          >
            <img src="/icons/tg.svg" alt="" width={28} height={28} />
          </a>
        </div>

        <p className="maintenance-page__hint">
          <a href={`mailto:art.nexus.russia@gmail.com`}>art.nexus.russia@gmail.com</a>
          {" · "}
          <Link href={SOCIAL_LINKS.telegramManager}>Telegram @ArtNexus_Manager</Link>
        </p>
      </div>
    </div>
  );
}
