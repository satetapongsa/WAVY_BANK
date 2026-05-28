// app/components/Card.tsx
"use client";
import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  elevated?: boolean;
  noPadding?: boolean;
}

export default function Card({
  children,
  className = "",
  elevated = false,
  noPadding = false,
}: CardProps) {
  const classes = [
    "glass-card",
    elevated ? "glass-elevated" : "",
    noPadding ? "!p-0" : "",
    "animate-fade-in-up",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return <div className={classes}>{children}</div>;
}
