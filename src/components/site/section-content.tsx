import { FiCheckCircle } from "react-icons/fi";
import { Reveal } from "@/components/site/reveal";
import { getSectionIcon } from "@/lib/icon-map";
import type { ContentSection } from "@/lib/site-content";

type SectionContentProps = {
  headline: string;
  intro: string;
  sections: ContentSection[];
  eyebrow?: string;
};

export function SectionContent({
  headline,
  intro,
  sections,
  eyebrow,
}: SectionContentProps) {
  return (
    <section className="space-y-8">
      <Reveal>
        <header className="rounded-3xl border border-cyan-100 bg-white/72 p-8 shadow-sm backdrop-blur-sm dark:border-cyan-900/50 dark:bg-slate-900/72">
          {eyebrow ? (
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-cyan-700 dark:text-cyan-300">
              {eyebrow}
            </p>
          ) : null}
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 md:text-4xl">
            {headline}
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-700 dark:text-slate-300 md:text-lg">
            {intro}
          </p>
        </header>
      </Reveal>

      <div className="grid gap-5">
        {sections.map((section, index) => {
          const SectionIcon = getSectionIcon(section.title);
          return (
            <Reveal key={section.title} delayMs={60 * index}>
              <article className="rounded-2xl border border-slate-200/70 bg-white/70 p-6 shadow-sm backdrop-blur-sm dark:border-slate-700 dark:bg-slate-900/70">
                <h2 className="inline-flex items-center gap-2 text-xl font-semibold text-slate-900 dark:text-slate-100">
                  <SectionIcon className="size-5 shrink-0 text-cyan-700 dark:text-cyan-300" />
                  {section.title}
                </h2>

                {section.paragraphs?.map((paragraph) => (
                  <p key={paragraph} className="mt-3 leading-relaxed text-slate-700 dark:text-slate-300">
                    {paragraph}
                  </p>
                ))}

                {section.bullets?.length ? (
                  <ul className="mt-4 grid gap-2">
                    {section.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="flex items-start gap-2 rounded-lg bg-slate-50/82 px-3 py-2 text-sm text-slate-700 dark:bg-slate-800/72 dark:text-slate-200"
                      >
                        <FiCheckCircle className="mt-0.5 size-4 shrink-0 text-cyan-700 dark:text-cyan-300" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}

                {section.note ? (
                  <p className="mt-4 rounded-lg border border-cyan-100 bg-cyan-50/76 px-3 py-2 text-sm text-cyan-900 dark:border-cyan-900/50 dark:bg-cyan-900/24 dark:text-cyan-100">
                    {section.note}
                  </p>
                ) : null}
              </article>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

