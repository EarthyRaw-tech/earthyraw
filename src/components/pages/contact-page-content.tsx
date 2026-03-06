"use client";

import { useState, type FormEvent } from "react";
import {
  FiCheckSquare,
  FiMail,
  FiMessageSquare,
  FiPhone,
  FiSend,
  FiUser,
  FiUsers,
} from "react-icons/fi";
import { useSitePreferences } from "@/components/providers/site-preferences-provider";
import { Reveal } from "@/components/site/reveal";
import { SiteShell } from "@/components/site/site-shell";
import { uiCopy } from "@/lib/i18n";
import { getLocalizedContent } from "@/lib/site-content-localized";
import type { SiteSettings } from "@/lib/site-settings/schema";

type SubmitState = "idle" | "submitting" | "success" | "error";

export function ContactPageContent({ siteSettings }: { siteSettings: SiteSettings }) {
  const { language } = useSitePreferences();
  const copy = uiCopy[language];
  const { contact, issues } = getLocalizedContent(language);
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [feedback, setFeedback] = useState("");

  const messages =
    language === "es"
      ? {
          sending: "Enviando...",
          success: "Solicitud enviada. Te responderemos pronto.",
          error: "No se pudo enviar la solicitud. Intenta nuevamente.",
        }
      : {
          sending: "Sending...",
          success: "Request sent. We will contact you shortly.",
          error: "Could not send your request. Please try again.",
        };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      nameRole: String(formData.get("nameRole") ?? ""),
      company: String(formData.get("company") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      email: String(formData.get("email") ?? ""),
      usersPcs: String(formData.get("usersPcs") ?? ""),
      hasServer: String(formData.get("hasServer") ?? ""),
      issues: formData.getAll("issues").map(String),
      message: String(formData.get("message") ?? ""),
      language,
      website: String(formData.get("website") ?? ""),
    };

    setSubmitState("submitting");
    setFeedback("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      setSubmitState("success");
      setFeedback(messages.success);
      form.reset();
    } catch {
      setSubmitState("error");
      setFeedback(messages.error);
    }
  };

  return (
    <SiteShell active="contact" siteSettings={siteSettings}>
      <section className="space-y-8">
        <Reveal>
          <header className="rounded-3xl border border-cyan-100 bg-white/72 p-8 shadow-sm backdrop-blur-sm dark:border-cyan-900/50 dark:bg-slate-900/72">
            <p className="mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.28em] text-cyan-700 dark:text-cyan-300">
              <FiMessageSquare className="size-4" />
              {copy.sections.contact}
            </p>
            <h1 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 md:text-4xl">
              {contact.headline}
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-700 dark:text-slate-300 md:text-lg">
              {contact.intro}
            </p>
          </header>
        </Reveal>

        <Reveal>
          <form
            onSubmit={handleSubmit}
            className="rounded-3xl border border-slate-200 bg-white/72 p-6 shadow-sm backdrop-blur-sm dark:border-slate-700 dark:bg-slate-900/72 md:p-8"
          >
            <input
              type="text"
              name="website"
              autoComplete="off"
              tabIndex={-1}
              className="hidden"
              aria-hidden="true"
            />

            <div className="grid gap-4 md:grid-cols-2">
              <label className="grid gap-2 text-sm font-medium text-slate-700 dark:text-slate-200">
                <span className="inline-flex items-center gap-2">
                  <FiUser className="size-4 text-cyan-700 dark:text-cyan-300" />
                  {copy.fields.nameRole}
                </span>
                <input
                  type="text"
                  name="nameRole"
                  required
                  className="rounded-lg border border-slate-300 bg-white/75 px-3 py-2 text-sm outline-none focus:border-cyan-500 dark:border-slate-600 dark:bg-slate-800/74"
                />
              </label>
              <label className="grid gap-2 text-sm font-medium text-slate-700 dark:text-slate-200">
                <span className="inline-flex items-center gap-2">
                  <FiUsers className="size-4 text-cyan-700 dark:text-cyan-300" /> {copy.fields.company}
                </span>
                <input
                  type="text"
                  name="company"
                  className="rounded-lg border border-slate-300 bg-white/75 px-3 py-2 text-sm outline-none focus:border-cyan-500 dark:border-slate-600 dark:bg-slate-800/74"
                />
              </label>
              <label className="grid gap-2 text-sm font-medium text-slate-700 dark:text-slate-200">
                <span className="inline-flex items-center gap-2">
                  <FiPhone className="size-4 text-cyan-700 dark:text-cyan-300" /> {copy.fields.phone}
                </span>
                <input
                  type="tel"
                  name="phone"
                  className="rounded-lg border border-slate-300 bg-white/75 px-3 py-2 text-sm outline-none focus:border-cyan-500 dark:border-slate-600 dark:bg-slate-800/74"
                />
              </label>
              <label className="grid gap-2 text-sm font-medium text-slate-700 dark:text-slate-200">
                <span className="inline-flex items-center gap-2">
                  <FiMail className="size-4 text-cyan-700 dark:text-cyan-300" /> {copy.fields.email}
                </span>
                <input
                  type="email"
                  name="email"
                  required
                  className="rounded-lg border border-slate-300 bg-white/75 px-3 py-2 text-sm outline-none focus:border-cyan-500 dark:border-slate-600 dark:bg-slate-800/74"
                />
              </label>
              <label className="grid gap-2 text-sm font-medium text-slate-700 dark:text-slate-200">
                <span className="inline-flex items-center gap-2">
                  <FiUsers className="size-4 text-cyan-700 dark:text-cyan-300" /> {copy.fields.usersPcs}
                </span>
                <input
                  type="text"
                  name="usersPcs"
                  className="rounded-lg border border-slate-300 bg-white/75 px-3 py-2 text-sm outline-none focus:border-cyan-500 dark:border-slate-600 dark:bg-slate-800/74"
                />
              </label>
              <label className="grid gap-2 text-sm font-medium text-slate-700 dark:text-slate-200">
                <span className="inline-flex items-center gap-2">
                  <FiCheckSquare className="size-4 text-cyan-700 dark:text-cyan-300" /> {copy.fields.hasServer}
                </span>
                <select
                  name="hasServer"
                  className="rounded-lg border border-slate-300 bg-white/75 px-3 py-2 text-sm outline-none focus:border-cyan-500 dark:border-slate-600 dark:bg-slate-800/74"
                >
                  <option>{copy.fields.yes}</option>
                  <option>{copy.fields.no}</option>
                </select>
              </label>
            </div>

            <fieldset className="mt-6">
              <legend className="inline-flex items-center gap-2 text-sm font-semibold text-slate-800 dark:text-slate-100">
                <FiCheckSquare className="size-4 text-cyan-700 dark:text-cyan-300" />
                {copy.sections.issueChecklist}
              </legend>
              <div className="mt-3 grid gap-2 md:grid-cols-2">
                {issues.map((issue, index) => (
                  <Reveal key={issue} delayMs={index * 20}>
                    <label className="flex items-start gap-2 rounded-lg border border-slate-200 bg-white/62 px-3 py-2 text-sm text-slate-700 dark:border-slate-700 dark:bg-slate-900/55 dark:text-slate-200">
                      <input type="checkbox" name="issues" value={issue} className="mt-1" />
                      <span>{issue}</span>
                    </label>
                  </Reveal>
                ))}
              </div>
            </fieldset>

            <label className="mt-6 grid gap-2 text-sm font-medium text-slate-700 dark:text-slate-200">
              <span className="inline-flex items-center gap-2">
                <FiMessageSquare className="size-4 text-cyan-700 dark:text-cyan-300" /> {copy.sections.message}
              </span>
              <textarea
                rows={5}
                name="message"
                required
                className="rounded-lg border border-slate-300 bg-white/75 px-3 py-2 text-sm outline-none focus:border-cyan-500 dark:border-slate-600 dark:bg-slate-800/74"
                placeholder={copy.sections.tellUs}
              />
            </label>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                type="submit"
                disabled={submitState === "submitting"}
                className="inline-flex items-center gap-2 rounded-lg bg-cyan-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-cyan-800 disabled:cursor-not-allowed disabled:opacity-70"
              >
                <FiSend className="size-4" />
                {submitState === "submitting" ? messages.sending : copy.actions.submitRequest}
              </button>

              {feedback ? (
                <p
                  className={
                    submitState === "success"
                      ? "text-sm font-medium text-emerald-700 dark:text-emerald-300"
                      : "text-sm font-medium text-rose-700 dark:text-rose-300"
                  }
                >
                  {feedback}
                </p>
              ) : null}
            </div>
          </form>
        </Reveal>
      </section>
    </SiteShell>
  );
}
