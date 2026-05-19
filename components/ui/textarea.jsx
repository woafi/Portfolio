import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({
  className,
  ...props
}) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex min-h-[80px] w-full rounded-md border border-[var(--border-subtle)] bg-[var(--bg)]/80 px-4 py-5 text-base text-[var(--color)] placeholder:text-[var(--color-muted)] outline-none transition-[border-color,box-shadow,background-color] duration-300 focus-visible:border-[var(--accent)]/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color-mix(in_srgb,var(--accent)_35%,transparent)] disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props} />
  );
}

export { Textarea }
