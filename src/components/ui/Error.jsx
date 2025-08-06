import { motion } from "framer-motion";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const Error = ({ message = "Something went wrong", onRetry }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-12 px-4"
    >
      <div className="bg-red-500/10 rounded-full p-4 mb-4">
        <ApperIcon name="AlertCircle" className="w-8 h-8 text-red-400" />
      </div>
      
      <h3 className="text-xl font-display font-semibold text-white mb-2">
        Oops! Something went wrong
      </h3>
      
      <p className="text-slate-400 text-center mb-6 max-w-md">
        {message}
      </p>
      
      {onRetry && (
        <Button onClick={onRetry} variant="primary">
          <ApperIcon name="RefreshCw" className="w-4 h-4 mr-2" />
          Try Again
        </Button>
      )}
    </motion.div>
  );
};

export default Error;