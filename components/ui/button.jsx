import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-base font-semibold ring-offset-[var(--bg)] transition-[transform,box-shadow,background-color,color,border-color,opacity] duration-300 ease-out will-change-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98] hover:-translate-y-0.5 motion-reduce:transform-none motion-reduce:hover:translate-y-0",
  {
    variants: {
      variant: {
        default:
          "bg-[var(--accent)] text-[var(--bg)] shadow-[0_12px_40px_rgba(0,255,153,0.22)] hover:bg-[var(--accent-hover)] hover:shadow-[0_16px_48px_rgba(0,255,153,0.32)]",
        primary:
          "bg-[var(--bg-elevated)] text-white border border-white/10 hover:border-[var(--accent)]/50 hover:text-[var(--accent)] hover:shadow-[var(--shadow-glow)]",
        outline:
          "border border-[var(--accent)]/80 bg-transparent text-[var(--accent)] hover:bg-[var(--accent)] hover:text-[var(--bg)] hover:border-[var(--accent)] hover:shadow-[0_0_36px_rgba(0,255,153,0.28)]",
      },
      size: {
        default: "h-[44px] px-6",
        md: "h-[48px] px-6",
        lg: "h-[56px] px-8 text-sm uppercase tracking-[2px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props} />
  );
}

export { Button, buttonVariants }
