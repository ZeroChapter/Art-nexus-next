import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Страница не найдена",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main
      className="page"
      style={{
        textAlign: "center",
        padding: "80px 20px",
        maxWidth: 520,
        margin: "0 auto",
      }}
    >
      <h1>404 — страница не найдена</h1>
      <p style={{ marginTop: 16, lineHeight: 1.5 }}>
        Запрошенная страница не существует или была удалена.
      </p>
      <p style={{ marginTop: 24 }}>
        <Link href="/">Вернуться в каталог дизайнерской одежды Art Nexus</Link>
      </p>
    </main>
  );
}
