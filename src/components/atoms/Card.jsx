import { forwardRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";

const Card = forwardRef(({ 
  children, 
  className, 
  hover = false,
  ...props 
}, ref) => {
  const CardComponent = hover ? motion.div : "div";
  
  const hoverProps = hover ? {
    whileHover: { scale: 1.02, y: -4 },
    transition: { duration: 0.2 }
  } : {};
  
  return (
    <CardComponent
      ref={ref}
      className={cn(
        "rounded-xl bg-surface border border-transparent transition-all duration-200",
        hover && "hover:border-primary-400 hover:shadow-lg hover:shadow-primary-400/10 cursor-pointer",
        className
      )}
      {...hoverProps}
      {...props}
    >
      {children}
    </CardComponent>
  );
});

Card.displayName = "Card";

export default Card;