import { useState } from "react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const ReviewCard = ({ review, onLike }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(review.likes?.length || 0);

  const handleLike = () => {
    const newIsLiked = !isLiked;
    setIsLiked(newIsLiked);
    setLikeCount(prev => newIsLiked ? prev + 1 : prev - 1);
    
    if (onLike) {
      onLike(review.Id, newIsLiked);
    }
  };

  return (
    <Card className="p-6">
      <div className="flex items-start space-x-4">
        <div className="w-12 h-12 bg-primary-400/20 rounded-full flex items-center justify-center">
          <ApperIcon name="User" className="w-6 h-6 text-primary-400" />
        </div>
        
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-medium text-white">Anonymous User</h4>
            <span className="text-sm text-slate-500">
              {format(new Date(review.created_at), "MMM d, yyyy")}
            </span>
          </div>
          
          <p className="text-slate-300 mb-4 leading-relaxed">
            {review.text}
          </p>
          
          <div className="flex items-center space-x-4">
            <motion.div whileTap={{ scale: 0.95 }}>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLike}
                className={`flex items-center space-x-2 ${
                  isLiked ? "text-red-400" : "text-slate-500"
                }`}
              >
                <ApperIcon 
                  name={isLiked ? "Heart" : "Heart"} 
                  className={`w-4 h-4 ${isLiked ? "fill-current" : ""}`} 
                />
                <span>{likeCount}</span>
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ReviewCard;