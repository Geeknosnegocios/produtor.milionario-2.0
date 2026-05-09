import { forwardRef, type HTMLAttributes } from "react";
import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

interface IconBadgeProps extends HTMLAttributes<HTMLDivElement> {
  Icon: LucideIcon;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  variant?: "solid" | "soft" | "outline";
}

/**
 * IconBadge · padrão visual consistente para ícones em cards/sections.
 * Default: solid gradient blue + white icon + soft glow.
 */
const IconBadge = forwardRef<HTMLDivElement, IconBadgeProps>(
  ({ Icon, size = "md", variant = "solid", className, ...props }, ref) => {
    const sizeMap = {
      xs: { wrap: "w-7 h-7 rounded-md", icon: "w-3.5 h-3.5" },
      sm: { wrap: "w-9 h-9 rounded-lg", icon: "w-4 h-4" },
      md: { wrap: "w-10 h-10 rounded-lg", icon: "w-5 h-5" },
      lg: { wrap: "w-12 h-12 rounded-xl", icon: "w-6 h-6" },
      xl: { wrap: "w-14 h-14 rounded-xl", icon: "w-7 h-7" },
    } as const;

    const variantMap = {
      solid: "bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-[0_0_15px_rgba(59,130,246,0.3)] border border-blue-400/30",
      soft: "bg-blue-500/15 text-blue-300 border border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.15)]",
      outline: "bg-transparent text-blue-300 border border-blue-500/40",
    } as const;

    const s = sizeMap[size];

    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center flex-shrink-0",
          s.wrap,
          variantMap[variant],
          className
        )}
        {...props}
      >
        <Icon className={s.icon} strokeWidth={2} />
      </div>
    );
  }
);

IconBadge.displayName = "IconBadge";

export { IconBadge };
