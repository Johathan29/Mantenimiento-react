import React from "react";
import clsx from "clsx";

export function Button({ children, variant = "default", size = "md", className, ...props }) {
  return (
    <button
      className={clsx(
        "rounded-md font-medium transition-all focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50",
        variant === "default" && "bg-primary text-white hover:bg-primary/90",
        variant === "outline" && "border border-input bg-transparent hover:bg-accent",
        variant === "ghost" && "hover:bg-accent",
        variant === "destructive" && "bg-red-600 text-white hover:bg-red-500",
        size === "sm" && "px-2 py-1 text-sm",
        size === "md" && "px-4 py-2 text-sm",
        size === "lg" && "px-6 py-3 text-base",
        size === "icon" && "h-9 w-9 flex items-center justify-center",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
