import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { motion } from "framer-motion";
import PageContainer from "@/components/organisms/PageContainer";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import ApperIcon from "@/components/ApperIcon";
import { postService } from "@/services/api/postService";

const InsightDetailPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadPost = async () => {
    try {
      setLoading(true);
      setError(null);
      
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const data = await postService.getBySlug(slug);
      
      if (!data) {
        setError("Post not found");
        return;
      }
      
      setPost(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPost();
  }, [slug]);

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadPost} />;
  if (!post) return <Error message="Post not found" />;

  return (
    <PageContainer>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        {/* Header */}
        <div className="flex items-center space-x-4 mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate("/insight")}
          >
            <ApperIcon name="ArrowLeft" className="w-4 h-4 mr-2" />
            Back to Insights
          </Button>
        </div>

        {/* Article Header */}
        <div className="mb-8">
          {post.thumbnail_url && (
            <div className="aspect-video bg-midnight-800 rounded-xl mb-6 overflow-hidden">
              <img 
                src={post.thumbnail_url} 
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          
          <div className="flex items-center space-x-4 text-sm text-slate-500 mb-4">
            <div className="flex items-center space-x-2">
              <ApperIcon name="Calendar" className="w-4 h-4" />
              <span>{format(new Date(post.published_at), "MMMM d, yyyy")}</span>
            </div>
            <div className="flex items-center space-x-2">
              <ApperIcon name="Clock" className="w-4 h-4" />
              <span>5 min read</span>
            </div>
          </div>
          
          <h1 className="text-4xl font-display font-bold text-white mb-4">
            {post.title}
          </h1>
          
          <p className="text-xl text-slate-400 leading-relaxed">
            {post.excerpt}
          </p>
        </div>

        {/* Article Content */}
        <Card className="p-8">
          <div 
            className="rich-content prose prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content_richtext }}
          />
        </Card>

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-midnight-700">
          <div className="flex items-center justify-between">
            <div className="text-slate-400">
              <p>Found this insight helpful? Share it with your network.</p>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <ApperIcon name="Share2" className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" size="sm">
                <ApperIcon name="Bookmark" className="w-4 h-4 mr-2" />
                Save
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </PageContainer>
  );
};

export default InsightDetailPage;