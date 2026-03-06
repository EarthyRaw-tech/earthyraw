"use client";

import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useTheme } from "next-themes";
import { FiMoon, FiSun } from "react-icons/fi";
import { useSitePreferences } from "@/components/providers/site-preferences-provider";
import type { SiteLanguage } from "@/lib/i18n";
import { uiCopy } from "@/lib/i18n";
import { cn } from "@/lib/utils";

function IconToggleButton({
  active,
  onClick,
  ariaLabel,
  title,
  children,
}: {
  active?: boolean;
  onClick: () => void;
  ariaLabel: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      title={title}
      className={cn(
        "inline-flex size-6 items-center justify-center rounded-sm border text-sm transition",
        active
          ? "border-cyan-700 bg-cyan-700 text-cyan-50"
          : "border-slate-300 bg-white/72 text-slate-700 hover:border-cyan-300 dark:border-slate-600 dark:bg-slate-900/72 dark:text-slate-100",
      )}
    >
      {children}
    </button>
  );
}

const LANGUAGE_CODE: Record<SiteLanguage, "EN" | "ES"> = {
  en: "EN",
  es: "ES",
};

const LANGUAGE_FLAG: Record<SiteLanguage, string> = {
  en: "\u{1F1FA}\u{1F1F8}",
  es: "\u{1F1F5}\u{1F1F7}",
};

export function SiteControls() {
  const { resolvedTheme, setTheme } = useTheme();
  const { language, setLanguage } = useSitePreferences();
  const copy = uiCopy[language];
  const isDark = resolvedTheme === "dark";
  const [overlayCode, setOverlayCode] = useState<"EN" | "ES" | null>(null);
  const overlayTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (overlayTimerRef.current !== null) {
        window.clearTimeout(overlayTimerRef.current);
      }
    };
  }, []);

  const nextLanguage: SiteLanguage = language === "en" ? "es" : "en";

  const toggleLanguage = () => {
    setLanguage(nextLanguage);
    setOverlayCode(LANGUAGE_CODE[nextLanguage]);

    if (overlayTimerRef.current !== null) {
      window.clearTimeout(overlayTimerRef.current);
    }

    overlayTimerRef.current = window.setTimeout(() => {
      setOverlayCode(null);
    }, 860);
  };

  return (
    <>
      <div className="inline-flex items-center gap-1 rounded-md border border-slate-200/80 bg-white/72 p-1 text-xs shadow-sm backdrop-blur-sm dark:border-slate-700 dark:bg-slate-950/72">
        <IconToggleButton
          onClick={toggleLanguage}
          ariaLabel={`${copy.sections.language}: ${copy.sections[language === "en" ? "spanish" : "english"]}`}
          title={`${copy.sections.language}: ${copy.sections[language === "en" ? "spanish" : "english"]}`}
        >
          <span aria-hidden>{LANGUAGE_FLAG[language]}</span>
        </IconToggleButton>

        <span className="h-4 w-px bg-slate-300/80 dark:bg-slate-600/80" />
        <IconToggleButton
          active={isDark}
          onClick={() => setTheme(isDark ? "light" : "dark")}
          ariaLabel={`${copy.sections.theme}: ${isDark ? copy.sections.dark : copy.sections.light}`}
          title={`${copy.sections.theme}: ${isDark ? copy.sections.dark : copy.sections.light}`}
        >
          {isDark ? <FiSun className="size-3.5" /> : <FiMoon className="size-3.5" />}
        </IconToggleButton>
      </div>

      {overlayCode ? (
        <div className="pointer-events-none fixed inset-0 z-[90] flex items-start justify-center pt-24">
          <div className="animate-language-flash rounded-full border border-cyan-300/80 bg-white/76 px-6 py-2.5 text-lg font-semibold tracking-[0.38em] text-cyan-900 shadow-xl backdrop-blur-sm dark:border-cyan-700/60 dark:bg-slate-900/76 dark:text-cyan-100">
            {overlayCode}
          </div>
        </div>
      ) : null}
    </>
  );
}
