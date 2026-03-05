import type { Metadata } from "next";
import { RawClonePage } from "@/components/raw-clone-page";
import { getPageBundle, getPageMetadata } from "@/lib/page-content";

export const metadata: Metadata = getPageMetadata("legacyHome");

export default function LegacyHomePage() {
  const page = getPageBundle("legacyHome");
  return <RawClonePage html={page.html} css={page.css} />;
}
