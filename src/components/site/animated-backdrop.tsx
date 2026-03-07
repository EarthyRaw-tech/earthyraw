"use client";

import { useEffect, useState } from "react";
import { useSitePreferences } from "@/components/providers/site-preferences-provider";

const BACKDROP_CANDIDATES = [
  "/background-matrix-datacenter.png",
  "/background-tech-nature.png",
] as const;

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export function AnimatedBackdrop() {
  const { motion } = useSitePreferences();
  const [progress, setProgress] = useState(0);
  const [backdropImages, setBackdropImages] = useState<string[]>([]);

  useEffect(() => {
    let cancelled = false;

    const loadAvailableBackdrops = async () => {
      const found: string[] = [];

      for (const candidate of BACKDROP_CANDIDATES) {
        const loaded = await new Promise<boolean>((resolve) => {
          const img = new Image();
          img.onload = () => resolve(true);
          img.onerror = () => resolve(false);
          img.src = candidate;
        });

        if (loaded) found.push(candidate);
      }

      if (!cancelled) {
        setBackdropImages(found);
      }
    };

    loadAvailableBackdrops();

    return () => {
      cancelled = true;
    };
  }, []);

  const primaryBackdrop = backdropImages[0] ?? "";
  const secondaryBackdrop = backdropImages[1] ?? "";

  useEffect(() => {
    if (backdropImages.length) {
      return;
    }

    let cancelled = false;
    const legacyCandidates = [
      "/background-tech-nature.jpg",
      "/background-tech-nature.jpeg",
      "/background-tech-nature.webp",
    ] as const;

    const findLegacyBackdrop = async () => {
      for (const candidate of legacyCandidates) {
        const loaded = await new Promise<boolean>((resolve) => {
          const img = new Image();
          img.onload = () => resolve(true);
          img.onerror = () => resolve(false);
          img.src = candidate;
        });

        if (loaded) {
          if (!cancelled) {
            setBackdropImages([candidate]);
          }
          break;
        }
      }
    };

    findLegacyBackdrop();

    return () => {
      cancelled = true;
    };
  }, [backdropImages.length]);

  useEffect(() => {
    let frameId = 0;

    const updateProgress = () => {
      const maxScroll = Math.max(
        1,
        document.documentElement.scrollHeight - window.innerHeight,
      );
      const next = clamp(window.scrollY / maxScroll, 0, 1);
      setProgress(next);
    };

    const onScroll = () => {
      cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(updateProgress);
    };

    updateProgress();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const safeProgress = progress;
  const hasBackdrop = primaryBackdrop.length > 0;
  const motionMultiplier =
    motion === "subtle" ? 0.6 : motion === "strong" ? 1.35 : 1;
  const speedMultiplier = motion === "subtle" ? 1.4 : motion === "strong" ? 0.75 : 1;
  const baseImageOpacity = hasBackdrop
    ? 0.6 + safeProgress * (0.22 * motionMultiplier)
    : 0;
  const imageBlendProgress = clamp((safeProgress - 0.18) / 0.62, 0, 1);
  const primaryImageOpacity = secondaryBackdrop
    ? baseImageOpacity * (1 - imageBlendProgress)
    : baseImageOpacity;
  const secondaryImageOpacity = secondaryBackdrop
    ? baseImageOpacity * imageBlendProgress
    : 0;
  const imageShiftY = safeProgress * (motion === "subtle" ? 14 : motion === "strong" ? 42 : 26);
  const imageScale = 1 + safeProgress * (0.06 * motionMultiplier);
  const shadeOverlayOpacity = hasBackdrop ? 0.34 : 0.56;
  const primaryOpacity = hasBackdrop
    ? 0.24 - safeProgress * (0.1 * motionMultiplier)
    : 0.72 - safeProgress * (0.38 * motionMultiplier);
  const secondaryOpacity = hasBackdrop
    ? 0.14 + safeProgress * (0.2 * motionMultiplier)
    : 0.2 + safeProgress * (0.54 * motionMultiplier);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div
        className="absolute inset-0 bg-center bg-cover transition duration-700"
        style={{
          opacity: primaryImageOpacity,
          transform: `translate3d(0, ${imageShiftY}px, 0) scale(${imageScale})`,
          backgroundImage: primaryBackdrop ? `url(${primaryBackdrop})` : "none",
          filter: "saturate(1.08) contrast(1.06)",
        }}
      />
      <div
        className="absolute inset-0 bg-center bg-cover transition duration-700"
        style={{
          opacity: secondaryImageOpacity,
          transform: `translate3d(0, ${imageShiftY * 0.7}px, 0) scale(${imageScale * 1.03})`,
          backgroundImage: secondaryBackdrop ? `url(${secondaryBackdrop})` : "none",
          filter: "saturate(1.08) contrast(1.06)",
        }}
      />
      <div
        className="absolute inset-0 transition-opacity duration-700"
        style={{
          opacity: shadeOverlayOpacity,
          background:
            "linear-gradient(180deg, rgba(2,6,23,0.62) 0%, rgba(15,23,42,0.42) 42%, rgba(255,255,255,0.04) 100%)",
        }}
      />
      <div
        className="absolute inset-0 transition-opacity duration-700"
        style={{
          opacity: primaryOpacity,
          background:
            "radial-gradient(80rem 35rem at 15% 0%, rgba(34,211,238,0.25), transparent), radial-gradient(55rem 30rem at 85% 10%, rgba(59,130,246,0.16), transparent), linear-gradient(180deg, #f8fdff 0%, #eff9ff 45%, #f8fafc 100%)",
        }}
      />
      <div
        className="absolute inset-0 hidden transition-opacity duration-700 dark:block"
        style={{
          opacity: primaryOpacity,
          background:
            "radial-gradient(80rem 35rem at 15% 0%, rgba(34,211,238,0.20), transparent), radial-gradient(55rem 30rem at 85% 10%, rgba(59,130,246,0.16), transparent), linear-gradient(180deg, #020617 0%, #0f172a 45%, #111827 100%)",
        }}
      />
      <div
        className="absolute inset-0 transition-opacity duration-700"
        style={{
          opacity: secondaryOpacity,
          background:
            "radial-gradient(65rem 28rem at 50% 95%, rgba(14,165,233,0.20), transparent), radial-gradient(50rem 28rem at 5% 80%, rgba(22,163,74,0.14), transparent)",
        }}
      />
      <div
        className="absolute inset-0 hidden transition-opacity duration-700 dark:block"
        style={{
          opacity: secondaryOpacity,
          background:
            "radial-gradient(65rem 28rem at 50% 95%, rgba(14,165,233,0.30), transparent), radial-gradient(50rem 28rem at 5% 80%, rgba(22,163,74,0.14), transparent)",
        }}
      />

      <div
        className="absolute -left-28 top-16 size-[28rem] rounded-full bg-cyan-300/30 blur-3xl animate-drift-slow"
        style={{
          opacity: 0.16 + safeProgress * (0.18 * motionMultiplier),
          animationDuration: `${20 * speedMultiplier}s`,
        }}
      />
      <div
        className="absolute -right-32 top-24 size-[30rem] rounded-full bg-sky-400/25 blur-3xl animate-drift-reverse"
        style={{
          opacity: 0.2 + safeProgress * (0.16 * motionMultiplier),
          animationDuration: `${24 * speedMultiplier}s`,
        }}
      />
      <div
        className="absolute bottom-[-8rem] left-1/3 size-[25rem] rounded-full bg-teal-300/20 blur-3xl animate-drift-slow"
        style={{
          opacity: 0.08 + safeProgress * (0.32 * motionMultiplier),
          animationDuration: `${18 * speedMultiplier}s`,
        }}
      />
    </div>
  );
}
