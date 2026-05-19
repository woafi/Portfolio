import * as React from "react"

import { cn } from "@/lib/utils"

function Input({
  className,
  type,
  ...props
}) {
  return (
    <input
      type={type}
      data-slot="input"
        className={cn(
        "flex h-[48px] w-full rounded-md border border-[var(--border-subtle)] bg-[var(--bg)]/80 px-4 py-5 text-base font-light text-[var(--color)] placeholder:text-[var(--color-muted)] outline-none transition-[border-color,box-shadow,background-color] duration-300 focus:border-[var(--accent)]/60 focus:ring-2 focus:ring-[color-mix(in_srgb,var(--accent)_35%,transparent)]",
        className
      )}
      {...props} />
  );
}

export { Input }
