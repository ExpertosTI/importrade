"use client";

import { useEffect, useState } from "react";
import { LogoGlow } from "./LogoGlow";

interface SplashScreenProps {
  onFinish?: () => void;
  minDuration?: number;
}

export function SplashScreen({ onFinish, minDuration = 2000 }: SplashScreenProps) {
  const [visible, setVisible] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => {
      setVisible(false);
      onFinish?.();
    }, minDuration);

    return () => clearTimeout(timer);
  }, [minDuration, onFinish]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-blue-900 dark:to-indigo-900 transition-opacity duration-500">
      <div className="text-center">
        <div
          className={`transform transition-all duration-700 ease-out ${
            mounted ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        >
          <LogoGlow size="xl" withGlow={false} />
        </div>
      </div>
    </div>
  );
}
