import { useEffect, useState } from "react";
import { GENERATION_TIME_SECONDS } from "@/lib/constants";

const TICK_MS = 20;

export function useGenerationProgress(isGenerating: boolean) {
  const [progress, setProgress] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    if (!isGenerating) {
      setProgress(0);
      setTimeLeft(0);
      return;
    }

    const totalMs = GENERATION_TIME_SECONDS * 1000;
    const start = performance.now();

    setTimeLeft(GENERATION_TIME_SECONDS);

    const timer = setInterval(() => {
      const elapsed = performance.now() - start;
      const pct = Math.min(Math.round((elapsed / totalMs) * 100), 100);
      const remaining = Math.max(0, Math.ceil((totalMs - elapsed) / 1000));

      setProgress(pct);
      setTimeLeft(remaining);

      if (pct >= 100) clearInterval(timer);
    }, TICK_MS);

    return () => clearInterval(timer);
  }, [isGenerating]);

  return { progress, timeLeft };
}
