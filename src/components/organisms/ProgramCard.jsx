import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Card from "@/components/atoms/Card";
import ApperIcon from "@/components/ApperIcon";

const ProgramCard = ({ program }) => {
  return (
    <Link to={`/program/${program.slug}`}>
      <Card hover className="p-6 h-full">
        <div className="aspect-video bg-midnight-800 rounded-lg mb-4 overflow-hidden">
          {program.thumbnail_url ? (
            <img 
              src={program.thumbnail_url} 
              alt={program.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <ApperIcon name="Play" className="w-12 h-12 text-primary-400" />
            </div>
          )}
        </div>
        
        <div className="space-y-3">
          <h3 className="text-xl font-display font-semibold text-white line-clamp-2">
            {program.title}
          </h3>
          
          <p className="text-slate-400 text-sm line-clamp-3">
            {program.description_short}
          </p>
          
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center space-x-2">
              {program.has_common_course && (
                <span className="px-2 py-1 bg-primary-400/20 text-primary-400 text-xs rounded-full font-medium">
                  Common Course
                </span>
              )}
            </div>
            
            <motion.div
              whileHover={{ x: 4 }}
              className="text-primary-400"
            >
              <ApperIcon name="ArrowRight" className="w-5 h-5" />
            </motion.div>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default ProgramCard;