"use client";

import { useEffect } from "react";

type RawClonePageProps = {
  html: string;
  css: string;
};

export function RawClonePage({ html, css }: RawClonePageProps) {
  useEffect(() => {
    document.querySelectorAll<HTMLAnchorElement>('a[href^="/#"]').forEach((link) => {
      const href = link.getAttribute("href");
      if (href) {
        link.setAttribute("href", href.slice(1));
      }
    });

    const cleanup: Array<() => void> = [];

    document.querySelectorAll<HTMLFormElement>("form[data-form-id]").forEach((form) => {
      const formId = form.getAttribute("data-form-id");
      if (!formId) {
        return;
      }

      const doneMessage = document.getElementById(`b12-form-done-${formId}`);
      const errorMessage = document.getElementById(`b12-form-error-${formId}`);

      const handleSubmit = (event: SubmitEvent) => {
        event.preventDefault();
        errorMessage?.classList.add("hidden");

        if (doneMessage) {
          form.style.display = "none";
          doneMessage.classList.remove("hidden");
          doneMessage.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      };

      form.addEventListener("submit", handleSubmit);
      cleanup.push(() => form.removeEventListener("submit", handleSubmit));
    });

    return () => cleanup.forEach((fn) => fn());
  }, [html]);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <div data-astro-cid-j7pv25f6 dangerouslySetInnerHTML={{ __html: html }} />
    </>
  );
}
