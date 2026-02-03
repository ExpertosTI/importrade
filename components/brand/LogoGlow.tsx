"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface LogoGlowProps {
  size?: "sm" | "md" | "lg" | "xl";
  withGlow?: boolean;
  className?: string;
}

export function LogoGlow({ size = "md", withGlow = true, className }: LogoGlowProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const sizeClasses = {
    sm: "h-8 w-auto",
    md: "h-12 w-auto",
    lg: "h-16 w-auto",
    xl: "h-32 w-auto",
  };

  const glowSizeClasses = {
    sm: "drop-shadow-[0_0_8px_rgba(37,99,235,0.5)]",
    md: "drop-shadow-[0_0_12px_rgba(37,99,235,0.6)]",
    lg: "drop-shadow-[0_0_16px_rgba(37,99,235,0.7)]",
    xl: "drop-shadow-[0_0_24px_rgba(37,99,235,0.8)]",
  };

  return (
    <div className={cn("relative", className)}>
      <Image
        src="/logo.svg"
        alt="ImporTrade"
        width={200}
        height={mounted ? parseInt(sizeClasses[size].split(" ")[0].replace("h-", "")) * 4 : 0}
        className={cn(
          "transition-all duration-700 ease-out",
          sizeClasses[size],
          withGlow && glowSizeClasses[size],
          mounted ? "opacity-100 scale-100" : "opacity-0 scale-95"
        )}
        priority
      />
      {withGlow && mounted && (
        <div
          className={cn(
            "absolute inset-0 opacity-60 blur-xl animate-pulse",
            "bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600",
            sizeClasses[size]
          )}
        />
      )}
    </div>
  );
}
