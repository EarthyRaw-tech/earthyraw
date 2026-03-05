import type { Metadata } from "next";
import { RawClonePage } from "@/components/raw-clone-page";
import { getPageBundle, getPageMetadata } from "@/lib/page-content";

export const metadata: Metadata = getPageMetadata("legacyLatest");

export default function LegacyLatestPage() {
  const page = getPageBundle("legacyLatest");
  return <RawClonePage html={page.html} css={page.css} />;
}
