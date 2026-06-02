import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import { HeaderComponent } from "@/widgets/header/HeaderComponent";
import { HeaderMobile } from "@/widgets/headerMobile/HeaderMobile";
import { Footer } from "@/widgets/footer/Footer";
import { getYandexMetrikaId, YandexMetrikaScript } from "./YandexMetrika";
import { YandexMetrikaHits } from "./YandexMetrikaHits";
import { Suspense } from "react"; // Импортируем Suspense

export const metadata: Metadata = {
  metadataBase: new URL("https://art-nexus.ru"),
  title: {
    default: "Art Nexus — дизайнерская одежда",
    template: "%s | Art Nexus",
  },
  description:
    "Art Nexus — российский дизайнерский бренд. Эксклюзивная одежда с доставкой по Москве и России.",
  keywords: [
    "Art Nexus",
    "дизайнерская одежда",
    "российский дизайнерский бренд",
    "купить дизайнерскую одежду",
    "дизайнерский бренд",
    "одежда",
  ],
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    siteName: "Art Nexus",
    locale: "ru_RU",
    url: "/",
    title: "Art Nexus — дизайнерская одежда",
    description:
      "Art Nexus — российский дизайнерский бренд. Эксклюзивная одежда с доставкой по Москве и России.",
    images: [
      { url: "/og-default.jpg", width: 1200, height: 630, alt: "Art Nexus — дизайнерская одежда" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Art Nexus — дизайнерская одежда",
    description:
      "Art Nexus — российский дизайнерский бренд. Эксклюзивная одежда с доставкой по Москве и России.",
    images: ["/og-default.jpg"],
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/favicon.svg", type: "image/svg+xml" }],
  },
  ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ||
  process.env.NEXT_PUBLIC_YANDEX_VERIFICATION
    ? {
        verification: {
          ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION && {
            google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
          }),
          ...(process.env.NEXT_PUBLIC_YANDEX_VERIFICATION && {
            yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION,
          }),
        },
      }
    : {}),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const yandexMetrikaId = getYandexMetrikaId();

  return (
    <html lang="ru">
      <body>
        <YandexMetrikaScript counterId={yandexMetrikaId} />
        <Suspense fallback={null}>
          <YandexMetrikaHits counterId={yandexMetrikaId} />
        </Suspense>

        <Providers>
          <div className="headers-container">
            <HeaderComponent />
            <HeaderMobile />
          </div>

          <main className="app-content-wrapper">{children}</main>

          <Footer />
        </Providers>
      </body>
    </html>
  );
}
