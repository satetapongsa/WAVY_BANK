// app/components/Button.tsx
"use client";
import React from "react";

type Variant = "primary" | "secondary" | "success" | "danger" | "accent";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: Variant;
  size?: "sm" | "md" | "lg";
  iconOnly?: boolean;
  className?: string;
}

const variantClasses: Record<Variant, string> = {
  primary: "bg-sky-600 hover:bg-sky-700 text-white border border-transparent shadow-sm focus:ring-sky-500",
  secondary: "bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 shadow-sm focus:ring-slate-400",
  success: "bg-emerald-600 hover:bg-emerald-700 text-white border border-transparent shadow-sm focus:ring-emerald-500",
  danger: "bg-rose-600 hover:bg-rose-700 text-white border border-transparent shadow-sm focus:ring-rose-500",
  accent: "bg-slate-900 hover:bg-slate-800 text-white border border-transparent shadow-sm focus:ring-slate-900",
};

const sizeClasses: Record<string, string> = {
  sm: "px-3 py-1.5 text-xs rounded-md",
  md: "px-4 py-2 text-sm rounded-lg",
  lg: "px-5 py-2.5 text-base rounded-lg",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  iconOnly = false,
  className = "",
  ...props
}: ButtonProps) {
  const classes = [
    "inline-flex items-center justify-center gap-1.5 font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100 active:scale-98",
    variantClasses[variant],
    sizeClasses[size],
    iconOnly ? "p-2 aspect-square" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
