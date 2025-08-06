import React, { forwardRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";

const Button = forwardRef(({ 
  children, 
  variant = "primary", 
  size = "md", 
  className,
  disabled,
  asChild,
  ...props 
}, ref) => {
  const baseClasses = "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 focus:ring-offset-midnight-900 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-primary-400 text-white hover:bg-primary-300 active:bg-primary-500 shadow-lg hover:shadow-xl",
    secondary: "bg-surface text-white border border-midnight-700 hover:bg-midnight-800 hover:border-midnight-600",
    outline: "border-2 border-primary-400 text-primary-400 hover:bg-primary-400 hover:text-white",
    ghost: "text-midnight-300 hover:text-white hover:bg-midnight-800",
    danger: "bg-red-500 text-white hover:bg-red-600 active:bg-red-700"
  };
  
  const sizes = {
    sm: "h-8 px-3 text-sm",
    md: "h-10 px-4 text-sm",
    lg: "h-12 px-6 text-base",
    xl: "h-14 px-8 text-lg"
  };

  // Filter out composition props that shouldn't be passed to DOM
  const { asChild: _, ...domProps } = props;

  return (
    <motion.button
      ref={ref}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      className={cn(
        baseClasses,
        variants[variant],
        sizes[size],
        className
      )}
      disabled={disabled}
      {...domProps}
    >
      {children}
    </motion.button>
  );
});

Button.displayName = "Button";

export default Button;