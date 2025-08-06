import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import PageContainer from "@/components/organisms/PageContainer";
import ProgramCard from "@/components/organisms/ProgramCard";
import InsightCard from "@/components/organisms/InsightCard";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import ApperIcon from "@/components/ApperIcon";
import { programService } from "@/services/api/programService";
import { postService } from "@/services/api/postService";

const HomePage = () => {
  const [programs, setPrograms] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const [programsData, postsData] = await Promise.all([
        programService.getAll(),
        postService.getAll()
      ]);
      
      setPrograms(programsData.slice(0, 3));
      setPosts(postsData.slice(0, 3));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  if (loading) return <Loading variant="card" />;
  if (error) return <Error message={error} onRetry={loadData} />;

  return (
    <div className="min-h-screen bg-midnight-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-midnight-900 via-midnight-800 to-midnight-900">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary-400/10 via-transparent to-transparent" />
        
        <PageContainer className="relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-6">
              Master Your{" "}
              <span className="bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
                Learning Journey
              </span>
            </h1>
            
            <p className="text-xl text-slate-400 mb-8 max-w-3xl mx-auto leading-relaxed">
              Unlock your potential with expert-led courses, exclusive insights, and a thriving community of learners. Start your transformation today.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="primary" size="lg" asChild>
                <Link to="/program">
                  <ApperIcon name="Play" className="w-5 h-5 mr-2" />
                  Explore Programs
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/insight">
                  <ApperIcon name="BookOpen" className="w-5 h-5 mr-2" />
                  Read Insights
                </Link>
              </Button>
            </div>
          </motion.div>
        </PageContainer>
      </section>

      {/* Featured Programs */}
      <section className="py-16">
        <PageContainer>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-display font-bold text-white mb-2">
                Featured Programs
              </h2>
              <p className="text-slate-400">
                Discover our most popular learning experiences
              </p>
            </div>
            <Button variant="outline" asChild>
              <Link to="/program">
                View All Programs
                <ApperIcon name="ArrowRight" className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {programs.map((program, index) => (
              <motion.div
                key={program.Id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <ProgramCard program={program} />
              </motion.div>
            ))}
          </div>
        </PageContainer>
      </section>

      {/* Latest Insights */}
      <section className="py-16 bg-gradient-to-b from-transparent to-surface/50">
        <PageContainer>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-display font-bold text-white mb-2">
                Latest Insights
              </h2>
              <p className="text-slate-400">
                Stay updated with the latest industry trends and tips
              </p>
            </div>
            <Button variant="outline" asChild>
              <Link to="/insight">
                View All Insights
                <ApperIcon name="ArrowRight" className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post, index) => (
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
        </PageContainer>
      </section>

      {/* Stats Section */}
      <section className="py-16">
        <PageContainer>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Card className="p-8 text-center">
                <div className="bg-primary-400/10 rounded-full p-4 w-16 h-16 mx-auto mb-4">
                  <ApperIcon name="Users" className="w-8 h-8 text-primary-400" />
                </div>
                <h3 className="text-3xl font-display font-bold text-white mb-2">
                  10,000+
                </h3>
                <p className="text-slate-400">Active Learners</p>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <Card className="p-8 text-center">
                <div className="bg-primary-400/10 rounded-full p-4 w-16 h-16 mx-auto mb-4">
                  <ApperIcon name="BookOpen" className="w-8 h-8 text-primary-400" />
                </div>
                <h3 className="text-3xl font-display font-bold text-white mb-2">
                  500+
                </h3>
                <p className="text-slate-400">Expert Lectures</p>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Card className="p-8 text-center">
                <div className="bg-primary-400/10 rounded-full p-4 w-16 h-16 mx-auto mb-4">
                  <ApperIcon name="Award" className="w-8 h-8 text-primary-400" />
                </div>
                <h3 className="text-3xl font-display font-bold text-white mb-2">
                  95%
                </h3>
                <p className="text-slate-400">Success Rate</p>
              </Card>
            </motion.div>
          </div>
        </PageContainer>
      </section>
    </div>
  );
};

export default HomePage;