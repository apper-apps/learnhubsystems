import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import PageContainer from "@/components/organisms/PageContainer";
import ReviewCard from "@/components/organisms/ReviewCard";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import { reviewService } from "@/services/api/reviewService";

const ReviewsPage = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadReviews = async () => {
    try {
      setLoading(true);
      setError(null);
      
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const data = await reviewService.getAll();
      setReviews(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReviews();
  }, []);

  const handleLike = async (reviewId, isLiked) => {
    try {
      // In a real app, this would make an API call
      toast.success(isLiked ? "Review liked!" : "Like removed");
    } catch (err) {
      toast.error("Failed to update like");
    }
  };

  if (loading) return <Loading variant="list" />;
  if (error) return <Error message={error} onRetry={loadReviews} />;

  return (
    <PageContainer
      title="Community Reviews"
      description="See what our learners are saying about their experience with LearnHub Pro."
    >
      {reviews.length === 0 ? (
        <Empty
          title="No reviews yet"
          description="Be the first to share your experience with the community!"
          actionText="Write a Review"
          icon="MessageSquare"
        />
      ) : (
        <div className="space-y-6">
          {reviews.map((review, index) => (
            <motion.div
              key={review.Id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <ReviewCard review={review} onLike={handleLike} />
            </motion.div>
          ))}
        </div>
      )}
    </PageContainer>
  );
};

export default ReviewsPage;