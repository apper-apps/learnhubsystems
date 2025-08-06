import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import PageContainer from "@/components/organisms/PageContainer";
import InsightCard from "@/components/organisms/InsightCard";
import SearchBar from "@/components/molecules/SearchBar";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import { postService } from "@/services/api/postService";

const InsightListPage = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const loadPosts = async () => {
    try {
      setLoading(true);
      setError(null);
      
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const data = await postService.getAll();
      setPosts(data);
      setFilteredPosts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setFilteredPosts(posts);
    } else {
      const filtered = posts.filter(post =>
        post.title.toLowerCase().includes(query.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredPosts(filtered);
    }
  };

  if (loading) return <Loading variant="card" />;
  if (error) return <Error message={error} onRetry={loadPosts} />;

  return (
    <PageContainer
      title="Insights & Articles"
      description="Explore our latest insights, industry trends, and expert advice to stay ahead in your learning journey."
    >
      <div className="mb-8">
        <SearchBar
          onSearch={handleSearch}
          placeholder="Search insights..."
        />
      </div>

      {filteredPosts.length === 0 ? (
        <Empty
          title="No insights found"
          description={searchQuery ? `No insights match "${searchQuery}". Try adjusting your search.` : "No insights are available at the moment."}
          icon="FileText"
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post, index) => (
            <motion.div
              key={post.Id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <InsightCard post={post} />
            </motion.div>
          ))}
        </div>
      )}
    </PageContainer>
  );
};

export default InsightListPage;