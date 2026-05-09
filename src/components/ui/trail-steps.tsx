import * as React from "react";
import { cn } from "@/lib/utils";

type Step = {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
};

type TrailStepsProps = {
  steps: Step[];
  badgeLabel?: string;
  showTimeEstimate?: boolean;
  className?: string;
};

export function TrailSteps({ steps, badgeLabel, showTimeEstimate = false, className }: TrailStepsProps) {
  return (
    <div className={cn("relative", className)}>
      {/* Badge */}
      {badgeLabel && (
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-blue-500/30">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
            <span className="text-sm font-semibold text-cyan-300">{badgeLabel}</span>
          </div>
        </div>
      )}

      {/* Mobile Layout - Vertical Stack */}
      <div className="md:hidden">
        <div className="relative flex flex-col gap-4">
          {/* Vertical connecting line */}
          <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-gradient-to-b from-blue-500/50 via-blue-500/50 to-blue-500/50" />

          {steps.map((step, i) => (
            <div
              key={i}
              className="relative flex items-center gap-4 z-10"
            >
              {/* Number badge on the left */}
              <div className={cn(
                "relative z-20 flex-shrink-0",
                "w-12 h-12 rounded-xl",
                "bg-gradient-to-br from-slate-800/80 to-slate-900/80",
                "border border-white/10",
                "flex items-center justify-center",
                "shadow-[0_0_15px_rgba(6,182,212,0.2)]"
              )}>
                <span className="text-blue-400 w-5 h-5">{step.icon}</span>
                {/* Number indicator */}
                <div className={cn(
                  "absolute -top-1 -right-1",
                  "w-5 h-5 rounded-md",
                  "bg-gradient-to-br from-blue-500 to-pink-500",
                  "flex items-center justify-center",
                  "text-[10px] font-bold text-white",
                  "shadow-[0_0_10px_rgba(168,85,247,0.5)]"
                )}>
                  {String(i + 1).padStart(2, "0")}
                </div>
              </div>

              {/* Content card */}
              <div className={cn(
                "flex-1 glass-card rounded-xl",
                "border border-white/10",
                "p-3",
                "transition-all duration-300"
              )}>
                <h3 className="text-sm font-bold text-white leading-tight">
                  {step.title}
                </h3>
                {step.subtitle && (
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {step.subtitle}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Desktop Layout - Wave Pattern */}
      <div className="hidden md:block relative h-[280px]">
        {/* Connecting line SVG */}
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 1000 280"
          preserveAspectRatio="none"
          style={{ zIndex: 0 }}
        >
          <defs>
            <linearGradient id="lineGradient" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0%" stopColor="hsl(185 100% 50%)" />
              <stop offset="50%" stopColor="hsl(210 100% 60%)" />
              <stop offset="100%" stopColor="hsl(280 100% 65%)" />
            </linearGradient>
          </defs>
          {/* Wave path */}
          <path
            d="M0,140 C100,140 100,60 200,60 C300,60 300,180 400,180 C500,180 500,60 600,60 C700,60 700,180 800,180 C900,180 900,60 1000,60"
            fill="none"
            stroke="url(#lineGradient)"
            strokeWidth="2"
            opacity="0.4"
          />
          {/* Decorative dots on the line */}
          <circle cx="0" cy="140" r="6" fill="hsl(185 100% 50%)" opacity="0.6" />
          <circle cx="200" cy="60" r="4" fill="hsl(185 100% 50%)" opacity="0.4" />
          <circle cx="400" cy="180" r="6" fill="hsl(210 100% 60%)" opacity="0.6" />
          <circle cx="600" cy="60" r="4" fill="hsl(210 100% 60%)" opacity="0.4" />
          <circle cx="800" cy="180" r="6" fill="hsl(280 100% 65%)" opacity="0.6" />
          <circle cx="1000" cy="60" r="4" fill="hsl(280 100% 65%)" opacity="0.4" />
        </svg>

        {/* Step Cards */}
        <div className="relative h-full flex justify-between items-start px-4">
          {steps.map((step, i) => {
            const isEven = i % 2 === 1;
            return (
              <div
                key={i}
                className={cn(
                  "relative flex flex-col items-center",
                  "w-[17%]",
                  isEven ? "mt-[120px]" : "mt-0"
                )}
                style={{ zIndex: 10 }}
              >
                {/* Number badge */}
                <div className={cn(
                  "absolute -top-3 -right-3 z-20",
                  "w-8 h-8 rounded-lg",
                  "bg-gradient-to-br from-blue-500 to-pink-500",
                  "flex items-center justify-center",
                  "text-sm font-bold text-white",
                  "shadow-[0_0_15px_rgba(168,85,247,0.5)]"
                )}>
                  {String(i + 1).padStart(2, "0")}
                </div>

                {/* Card */}
                <div className={cn(
                  "relative group w-full",
                  "glass-card rounded-2xl",
                  "border border-white/10 hover:border-blue-500/30",
                  "p-5",
                  "transition-all duration-300 hover:-translate-y-1",
                  "hover:shadow-[0_0_30px_rgba(6,182,212,0.2)]"
                )}>
                  {/* Icon */}
                  <div className="flex justify-center mb-3">
                    <div className={cn(
                      "w-12 h-12 rounded-xl",
                      "bg-gradient-to-br from-slate-800/80 to-slate-900/80",
                      "border border-white/10",
                      "flex items-center justify-center",
                      "group-hover:border-blue-500/30 transition-colors duration-300"
                    )}>
                      <span className="text-blue-400 w-6 h-6">{step.icon}</span>
                    </div>
                  </div>

                  {/* Text */}
                  <div className="text-center">
                    <h3 className="text-sm font-bold text-white mb-1 leading-tight">
                      {step.title}
                    </h3>
                    {step.subtitle && (
                      <p className="text-xs text-muted-foreground leading-tight">
                        {step.subtitle}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Time badge at bottom - only show if prop is true */}
      {showTimeEstimate && (
        <div className="flex justify-center mt-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-white/10">
            <span className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_10px_rgba(74,222,128,0.5)]" />
            <span className="text-xs sm:text-sm text-muted-foreground">
              Tempo Total: <span className="text-blue-400 font-semibold">2 horas a 2 dias</span>
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
