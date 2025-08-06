import { Link } from "react-router-dom";
import { format } from "date-fns";
import Card from "@/components/atoms/Card";
import ApperIcon from "@/components/ApperIcon";

const InsightCard = ({ post }) => {
  return (
    <Link to={`/insight/${post.slug}`}>
      <Card hover className="p-6 h-full">
        <div className="aspect-video bg-midnight-800 rounded-lg mb-4 overflow-hidden">
          {post.thumbnail_url ? (
            <img 
              src={post.thumbnail_url} 
              alt={post.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <ApperIcon name="FileText" className="w-12 h-12 text-primary-400" />
            </div>
          )}
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center space-x-2 text-sm text-slate-500">
            <ApperIcon name="Calendar" className="w-4 h-4" />
            <span>{format(new Date(post.published_at), "MMM d, yyyy")}</span>
          </div>
          
          <h3 className="text-xl font-display font-semibold text-white line-clamp-2">
            {post.title}
          </h3>
          
          <p className="text-slate-400 text-sm line-clamp-3">
            {post.excerpt}
          </p>
          
          <div className="flex items-center justify-between pt-2">
            <span className="text-primary-400 text-sm font-medium">
              Read Article
            </span>
            <ApperIcon name="ArrowRight" className="w-5 h-5 text-primary-400" />
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default InsightCard;