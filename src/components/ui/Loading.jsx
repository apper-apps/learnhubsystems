import { motion } from "framer-motion";

const Loading = ({ variant = "default" }) => {
  if (variant === "card") {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.1 }}
            className="bg-surface rounded-xl p-6 space-y-4"
          >
            <div className="w-full h-48 bg-midnight-800 rounded-lg animate-pulse" />
            <div className="space-y-2">
              <div className="h-6 bg-midnight-800 rounded animate-pulse" />
              <div className="h-4 bg-midnight-800 rounded w-3/4 animate-pulse" />
            </div>
          </motion.div>
        ))}
      </div>
    );
  }

  if (variant === "list") {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.1 }}
            className="bg-surface rounded-xl p-6 flex items-center space-x-4"
          >
            <div className="w-16 h-16 bg-midnight-800 rounded-lg animate-pulse" />
            <div className="flex-1 space-y-2">
              <div className="h-5 bg-midnight-800 rounded animate-pulse" />
              <div className="h-4 bg-midnight-800 rounded w-2/3 animate-pulse" />
            </div>
          </motion.div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center py-12">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className="w-8 h-8 border-2 border-primary-400 border-t-transparent rounded-full"
      />
    </div>
  );
};

export default Loading;