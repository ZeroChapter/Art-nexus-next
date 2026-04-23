import type { Metadata } from "next";
import "./globals.css"; 
import { Providers } from "./providers";
import { HeaderComponent } from "@/widgets/header/HeaderComponent";
import { HeaderMobile } from "@/widgets/headerMobile/HeaderMobile";
import { Footer } from "@/widgets/footer/Footer";
import { YandexMetrika } from "./YandexMetrika"; // Импортируем компонент
import { Suspense } from "react"; // Импортируем Suspense

export const metadata: Metadata = {
  title: "ART NEXUS | Эксклюзивная одежда",
  description: "Магазин уникальной одежды от российских дизайнеров",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
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
          <YandexMetrika counterId={108407139} /> 
        </Suspense>

        <Providers>
          <div className='headers-container'>
            <HeaderComponent />
            <HeaderMobile />
          </div>
          
          <main className='app-content-wrapper'>
            {children}
          </main>
          
          <Footer />
        </Providers>
      </body>
    </html>
  );
}