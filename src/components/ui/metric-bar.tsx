import * as React from "react";
import { cn } from "@/lib/utils";

type MetricBarProps = {
  label: string;
  valueLabel: string;
  valuePercent: number; // 0..100
  tone?: "success" | "danger" | "primary";
  className?: string;
};

const toneMap = {
  success: "from-green-500 to-emerald-400",
  danger: "from-red-500 to-rose-400",
  primary: "from-blue-500 to-violet-500",
};

export function MetricBar({ label, valueLabel, valuePercent, tone = "primary", className }: MetricBarProps) {
  const clamped = Math.max(0, Math.min(100, valuePercent));
  return (
    <div className={cn("space-y-1", className)}>
      <div className="flex items-center justify-between text-xs md:text-sm">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-semibold">{valueLabel}</span>
      </div>
      <div className="h-2.5 rounded-full bg-background/60 border border-border/40 overflow-hidden">
        <div
          className={cn("h-full rounded-full bg-gradient-to-r", toneMap[tone])}
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
}

