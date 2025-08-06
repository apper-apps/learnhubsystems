import { motion } from "framer-motion";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const Empty = ({ 
  title = "No data found", 
  description = "There's nothing here yet.", 
  actionText = "Get Started",
  onAction,
  icon = "Inbox"
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-12 px-4"
    >
      <div className="bg-primary-400/10 rounded-full p-4 mb-4">
        <ApperIcon name={icon} className="w-8 h-8 text-primary-400" />
      </div>
      
      <h3 className="text-xl font-display font-semibold text-white mb-2">
        {title}
      </h3>
      
      <p className="text-slate-400 text-center mb-6 max-w-md">
        {description}
      </p>
      
      {onAction && (
        <Button onClick={onAction} variant="primary">
          {actionText}
        </Button>
      )}
    </motion.div>
  );
};

export default Empty;