import { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Input = forwardRef(({ 
  className,
  type = "text",
  error,
  ...props 
}, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-10 w-full rounded-lg border border-midnight-600 bg-surface px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-400/20 disabled:cursor-not-allowed disabled:opacity-50",
        error && "border-red-500 focus:border-red-500 focus:ring-red-500/20",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});

Input.displayName = "Input";

export default Input;