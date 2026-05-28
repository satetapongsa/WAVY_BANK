// app/components/Card.tsx
"use client";
import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  elevated?: boolean;
  noPadding?: boolean;
  style?: React.CSSProperties;
}

export default function Card({
  children,
  className = "",
  elevated = false,
  noPadding = false,
  style,
}: CardProps) {
  const classes = [
    "bg-white border border-slate-200/80 rounded-xl animate-fade-in-up",
    elevated ? "shadow-md" : "shadow-sm",
    noPadding ? "p-0" : "p-6",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes} style={style}>
      {children}
    </div>
  );
}
