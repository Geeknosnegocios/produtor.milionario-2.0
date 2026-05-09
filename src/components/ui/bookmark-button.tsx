import { ArrowRight } from "lucide-react";
import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";

import { cn } from "@/lib/utils";

interface BookmarkButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: ReactNode;
  sub?: ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
  fullWidth?: boolean;
}

/**
 * BookmarkButton · pill-shaped CTA with animated icon-fill on hover.
 * Icon container expands to fill the button, text fades right.
 */
const BookmarkButton = forwardRef<HTMLButtonElement, BookmarkButtonProps>(
  ({ text, sub, size = "md", fullWidth, className, ...props }, ref) => {
    const config = {
      sm: { h: "h-10", iconSize: "w-7 h-7", svgSize: "w-3.5 h-3.5", textPad: "pl-10 pr-4", text: "text-xs", hoverW: "group-hover/bm:w-[calc(100%-8px)]" },
      md: { h: "h-12", iconSize: "w-10 h-10", svgSize: "w-4 h-4", textPad: "pl-12 pr-4", text: "text-sm", hoverW: "group-hover/bm:w-[calc(100%-8px)]" },
      lg: { h: "h-14", iconSize: "w-11 h-11", svgSize: "w-5 h-5", textPad: "pl-14 pr-5", text: "text-sm sm:text-base", hoverW: "group-hover/bm:w-[calc(100%-12px)]" },
      xl: { h: "h-14 sm:h-16 md:h-18", iconSize: "w-11 h-11 sm:w-12 sm:h-12 md:w-14 md:h-14", svgSize: "w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6", textPad: "pl-14 sm:pl-16 md:pl-20 pr-4 sm:pr-6 md:pr-8", text: "text-xs sm:text-base md:text-lg", hoverW: "group-hover/bm:w-[calc(100%-12px)]" },
    }[size];

    return (
      <button
        ref={ref}
        type="button"
        className={cn(
          "group/bm relative inline-flex items-center justify-start rounded-full bg-[#0c0c0c] cursor-pointer overflow-hidden p-0",
          "border border-blue-400/40 hover:border-blue-400/80",
          "shadow-[0_0_30px_rgba(59,130,246,0.25)] hover:shadow-[0_0_60px_rgba(59,130,246,0.5)]",
          "transition-all duration-300 active:scale-[0.97]",
          config.h,
          "min-w-[160px]",
          fullWidth ? "w-full" : "max-w-full",
          className
        )}
        {...props}
      >
        {/* Icon container · expands on hover */}
        <span
          className={cn(
            "absolute z-[2] flex items-center justify-center rounded-full overflow-hidden",
            "bg-gradient-to-b from-blue-400 to-blue-600",
            "left-1 top-1/2 -translate-y-1/2",
            "transition-all duration-500 ease-out",
            "group-hover/bm:rounded-[35px] group-hover/bm:left-1",
            config.iconSize,
            config.hoverW
          )}
        >
          <ArrowRight className={cn("text-white", config.svgSize)} strokeWidth={2.5} />
        </span>

        {/* Text · fades + slides right on hover */}
        <span
          className={cn(
            "relative z-[1] flex flex-col items-start font-bold text-white",
            "transition-all duration-300 min-w-0 flex-1",
            "group-hover/bm:opacity-0 group-hover/bm:translate-x-8",
            config.textPad,
            config.text
          )}
        >
          <span className="truncate w-full">{text}</span>
          {sub && <span className="text-[9px] sm:text-[10px] md:text-xs font-normal text-white/70 mt-0.5 truncate w-full">{sub}</span>}
        </span>
      </button>
    );
  }
);

BookmarkButton.displayName = "BookmarkButton";

export { BookmarkButton };
