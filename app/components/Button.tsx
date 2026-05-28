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

const variantMap: Record<Variant, string> = {
  primary: "btn",
  secondary: "btn btn-secondary",
  success: "btn btn-success",
  danger: "btn btn-danger",
  accent: "btn btn-accent",
};

const sizeMap: Record<string, string> = {
  sm: "btn-sm",
  md: "",
  lg: "btn-lg",
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
    variantMap[variant],
    sizeMap[size],
    iconOnly ? "btn-icon" : "",
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
