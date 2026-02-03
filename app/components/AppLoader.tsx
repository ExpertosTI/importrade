"use client";

import { useState, useEffect } from "react";
import { SplashScreen } from "@/components/brand/SplashScreen";

export function AppLoader({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  if (!isClient) {
    return null;
  }

  if (isLoading) {
    return <SplashScreen minDuration={2000} />;
  }

  return <>{children}</>;
}
