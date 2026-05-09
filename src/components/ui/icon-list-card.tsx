import * as React from "react";
import { cn } from "@/lib/utils";

type Item = {
  icon: React.ReactNode;
  text: string;
};

type IconListCardProps = {
  title?: string;
  items: Item[];
  tone?: "primary" | "destructive";
  className?: string;
};

const toneMap = {
  primary: {
    gradientBorder: "from-blue-500 via-blue-500 to-blue-500",
    iconGlow: "shadow-[0_0_20px_rgba(6,182,212,0.5)]",
    iconBg: "bg-gradient-to-br from-blue-500/20 to-blue-500/20",
    iconColor: "text-blue-400",
    hoverGlow: "hover:shadow-[0_0_30px_rgba(6,182,212,0.3)]",
    textGlow: "group-hover:text-cyan-300",
  },
  destructive: {
    gradientBorder: "from-red-500 via-orange-500 to-red-500",
    iconGlow: "shadow-[0_0_20px_rgba(239,68,68,0.5)]",
    iconBg: "bg-gradient-to-br from-red-500/20 to-orange-500/20",
    iconColor: "text-red-400",
    hoverGlow: "hover:shadow-[0_0_30px_rgba(239,68,68,0.3)]",
    textGlow: "group-hover:text-red-300",
  },
};

export function IconListCard({ title, items, tone = "primary", className }: IconListCardProps) {
  const t = toneMap[tone];
  
  return (
    <div className={cn("relative", className)}>
      {/* Animated gradient border */}
      <div className={cn(
        "absolute -inset-[1px] rounded-2xl bg-gradient-to-r opacity-75 blur-sm animate-pulse",
        t.gradientBorder
      )} />
      <div className={cn(
        "absolute -inset-[1px] rounded-2xl bg-gradient-to-r",
        t.gradientBorder
      )} />
      
      {/* Main card content */}
      <div className={cn(
        "relative bg-slate-900/90 backdrop-blur-xl rounded-2xl p-5 md:p-7",
        "border border-white/5"
      )}>
        {/* Decorative corner accents */}
        <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-blue-500/10 to-transparent rounded-tl-2xl" />
        <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-blue-500/10 to-transparent rounded-br-2xl" />
        
        {title && (
          <h3 className="text-lg md:text-xl font-bold mb-5 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
            {title}
          </h3>
        )}
        
        <div className="grid sm:grid-cols-2 gap-4 md:gap-5">
          {items.map((item, i) => (
            <div 
              key={i} 
              className={cn(
                "group relative flex items-start gap-4 p-4 rounded-xl",
                "bg-gradient-to-br from-slate-800/50 to-slate-900/50",
                "border border-white/10",
                "transition-all duration-300 ease-out",
                "hover:scale-[1.02] hover:border-white/20",
                t.hoverGlow
              )}
              style={{
                animationDelay: `${i * 100}ms`
              }}
            >
              {/* Hover glow effect */}
              <div className={cn(
                "absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300",
                "bg-gradient-to-r group-hover:opacity-100",
                tone === "primary" 
                  ? "from-blue-500/5 via-transparent to-blue-500/5" 
                  : "from-red-500/5 via-transparent to-orange-500/5"
              )} />
              
              {/* Icon container with glow */}
              <div className={cn(
                "relative flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center",
                "transition-all duration-300",
                t.iconBg,
                "border border-white/10",
                "group-hover:scale-110",
                t.iconGlow
              )}>
                {/* Animated ring */}
                <div className={cn(
                  "absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100",
                  "transition-opacity duration-300",
                  "animate-ping"
                )} style={{ animationDuration: "2s" }}>
                  <div className={cn(
                    "w-full h-full rounded-xl",
                    t.iconBg
                  )} />
                </div>
                
                <span className={cn(
                  "relative z-10 w-5 h-5 transition-transform duration-300",
                  "group-hover:scale-110",
                  t.iconColor
                )}>
                  {item.icon}
                </span>
              </div>
              
              {/* Text content */}
              <span className={cn(
                "relative z-10 text-sm md:text-base font-medium text-slate-200",
                "transition-colors duration-300",
                t.textGlow
              )}>
                {item.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
