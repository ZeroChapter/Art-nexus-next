"use client";

import MDPreview from "@uiw/react-markdown-preview";
import "@uiw/react-markdown-preview/markdown.css";
import "./ProductDescriptionMarkdown.css";
import { normalizeDescriptionMarkdown } from "./normalizeDescriptionMarkdown";

interface ProductDescriptionMarkdownProps {
  source: string;
}

/** Тот же движок preview, что у MDEditor в админке (@uiw/react-markdown-preview + GFM). */
export function ProductDescriptionMarkdown({
  source,
}: ProductDescriptionMarkdownProps) {
  const normalized = normalizeDescriptionMarkdown(source || "");

  return (
    <div className="product-description-markdown" data-color-mode="light">
      <MDPreview source={normalized} />
    </div>
  );
}
