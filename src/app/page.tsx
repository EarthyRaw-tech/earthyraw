import type { Metadata } from "next";
import { RawClonePage } from "@/components/raw-clone-page";
import { getPageBundle, getPageMetadata } from "@/lib/page-content";

export const metadata: Metadata = getPageMetadata("home");

export default function HomePage() {
  const page = getPageBundle("home");
  return <RawClonePage html={page.html} css={page.css} />;
}
