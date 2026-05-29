import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import { HeaderComponent } from "@/widgets/header/HeaderComponent";
import { HeaderMobile } from "@/widgets/headerMobile/HeaderMobile";
import { Footer } from "@/widgets/footer/Footer";
import { YandexMetrika } from "./YandexMetrika"; // Импортируем компонент
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
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body>
        <Suspense fallback={null}>
          <YandexMetrika counterId={109450548} />
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
