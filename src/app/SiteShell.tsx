"use client";

import { usePathname } from "next/navigation";
import { HeaderComponent } from "@/widgets/header/HeaderComponent";
import { HeaderMobile } from "@/widgets/headerMobile/HeaderMobile";
import { Footer } from "@/widgets/footer/Footer";

export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isMaintenance = pathname === "/maintenance";

  if (isMaintenance) {
    return <>{children}</>;
  }

  return (
    <>
      <div className="headers-container">
        <HeaderComponent />
        <HeaderMobile />
      </div>

      <main className="app-content-wrapper">{children}</main>

      <Footer />
    </>
  );
}
