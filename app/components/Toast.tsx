// app/components/Toast.tsx
"use client";
import React, { useEffect, useState } from "react";
import { CheckCircle, AlertTriangle, Info, X } from "lucide-react";

export type ToastType = "success" | "danger" | "info";

export interface ToastItem {
  id: number;
  message: string;
  type: ToastType;
}

interface ToastProps {
  toasts: ToastItem[];
  onDismiss: (id: number) => void;
}

const iconMap: Record<ToastType, React.ReactNode> = {
  success: <CheckCircle size={18} className="text-[var(--color-success)]" />,
  danger: <AlertTriangle size={18} className="text-[var(--color-danger)]" />,
  info: <Info size={18} className="text-[var(--color-info)]" />,
};

const typeClass: Record<ToastType, string> = {
  success: "toast-success",
  danger: "toast-danger",
  info: "toast-info",
};

function SingleToast({
  toast,
  onDismiss,
}: {
  toast: ToastItem;
  onDismiss: () => void;
}) {
  useEffect(() => {
    const timer = setTimeout(onDismiss, 4000);
    return () => clearTimeout(timer);
  }, [onDismiss]);

  return (
    <div className={`toast ${typeClass[toast.type]}`}>
      {iconMap[toast.type]}
      <span className="text-sm text-[var(--text-secondary)] flex-1">
        {toast.message}
      </span>
      <button
        onClick={onDismiss}
        className="p-1 rounded hover:bg-[rgba(255,255,255,0.08)] transition-colors"
      >
        <X size={14} className="text-[var(--text-muted)]" />
      </button>
    </div>
  );
}

export default function ToastContainer({ toasts, onDismiss }: ToastProps) {
  return (
    <div className="toast-container">
      {toasts.map((t) => (
        <SingleToast key={t.id} toast={t} onDismiss={() => onDismiss(t.id)} />
      ))}
    </div>
  );
}
