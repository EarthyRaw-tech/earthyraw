"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { ThemeProvider } from "next-themes";
import type { MotionIntensity, SiteLanguage } from "@/lib/i18n";

type SitePreferencesContextValue = {
  language: SiteLanguage;
  setLanguage: (value: SiteLanguage) => void;
  motion: MotionIntensity;
  setMotion: (value: MotionIntensity) => void;
};

const LANGUAGE_KEY = "earthyraw-language";

const SitePreferencesContext = createContext<SitePreferencesContextValue | null>(
  null,
);

export function SitePreferencesProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [language, setLanguageState] = useState<SiteLanguage>("en");
  const motion: MotionIntensity = "subtle";

  useEffect(() => {
    const savedLanguage = window.localStorage.getItem(LANGUAGE_KEY);

    const frameId = window.requestAnimationFrame(() => {
      if (savedLanguage === "en" || savedLanguage === "es") {
        setLanguageState(savedLanguage);
      }
    });

    return () => window.cancelAnimationFrame(frameId);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-motion", motion);
  }, [motion]);

  const value = useMemo<SitePreferencesContextValue>(
    () => ({
      language,
      setLanguage: (nextLanguage) => {
        setLanguageState(nextLanguage);
        window.localStorage.setItem(LANGUAGE_KEY, nextLanguage);
      },
      motion,
      setMotion: (nextMotion) => {
        void nextMotion;
      },
    }),
    [language, motion],
  );

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <SitePreferencesContext.Provider value={value}>
        {children}
      </SitePreferencesContext.Provider>
    </ThemeProvider>
  );
}

export function useSitePreferences() {
  const context = useContext(SitePreferencesContext);
  if (!context) {
    throw new Error("useSitePreferences must be used inside SitePreferencesProvider");
  }

  return context;
}
