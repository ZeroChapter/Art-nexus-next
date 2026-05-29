import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Art Nexus — дизайнерская одежда",
    short_name: "Art Nexus",
    description:
      "Российский дизайнерский бренд одежды. Эксклюзивные коллекции с доставкой по Москве и России.",
    start_url: "/",
    display: "standalone",
    background_color: "#0B0B0B",
    theme_color: "#0B0B0B",
    lang: "ru",
    icons: [
      {
        src: "/favicon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
