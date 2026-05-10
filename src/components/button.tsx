"use client";

import { cn } from "@/lib/tailwind-utils";
import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "primary";
}

const Button = ({ className, variant = "default", children, ...props }: ButtonProps) => (
  <button
    {...props}
    className={cn(
      "h-8 pl-2 pr-3 flex items-center gap-1.5 rounded-md font-medium",
      "cursor-pointer whitespace-nowrap shrink-0",
      "disabled:opacity-40 disabled:pointer-events-none",
      variant === "primary"
        ? "bg-indigo-500 hover:bg-indigo-600 text-white border border-indigo-500"
        : "bg-zinc-900 hover:bg-zinc-800 text-zinc-500 hover:text-zinc-50 border border-zinc-800",
      className,
    )}
  >
    {children}
  </button>
);

export default Button;
