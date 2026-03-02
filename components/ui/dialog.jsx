"use client";

import * as React from "react";
import { cn } from "../../lib/utils";

export function Dialog({ open, onOpenChange, children }) {
  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center transition-all",
        open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
      )}
      onClick={() => onOpenChange?.(false)}
    >
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        aria-hidden="true"
      />

      <div
        className="relative z-50 max-w-lg w-full bg-white rounded-2xl shadow-xl p-6"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}

export function DialogContent({ children, className }) {
  return <div className={cn("", className)}>{children}</div>;
}

export function DialogHeader({ children, className }) {
  return <div className={cn("mb-4", className)}>{children}</div>;
}

export function DialogTitle({ children, className }) {
  return (
    <h2 className={cn("text-xl font-semibold text-stone-800", className)}>
      {children}
    </h2>
  );
}

export function DialogDescription({ children, className }) {
  return (
    <p className={cn("text-stone-600 mt-1", className)}>
      {children}
    </p>
  );
}

export function DialogFooter({ children, className }) {
  return (
    <div
      className={cn("mt-6 flex justify-end gap-3", className)}
    >
      {children}
    </div>
  );
}
