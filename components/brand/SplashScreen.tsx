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
          className={`mb-8 transform transition-all duration-700 ease-out ${
            mounted ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        >
          <LogoGlow size="xl" withGlow={mounted} />
        </div>
        
        <h1
          className={`text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent transform transition-all duration-600 delay-300 ${
            mounted ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
          }`}
        >
          ImporTrade
        </h1>
        
        <p
          className={`mt-2 text-sm text-muted-foreground transform transition-all duration-600 delay-500 ${
            mounted ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
          }`}
        >
          Logística Inteligente
        </p>

        <div
          className={`mt-8 h-1 w-48 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700 transform transition-all duration-1000 delay-700 ${
            mounted ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"
          }`}
        >
          <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 animate-pulse" />
        </div>
      </div>
    </div>
  );
}
