import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import PageContainer from "@/components/organisms/PageContainer";
import LectureList from "@/components/organisms/LectureList";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import ApperIcon from "@/components/ApperIcon";
import { useAuth } from "@/App";
import { toast } from "react-toastify";
import { programService } from "@/services/api/programService";
import { lectureService } from "@/services/api/lectureService";

const ProgramDetailPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [program, setProgram] = useState(null);
  const [lectures, setLectures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadProgramData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const [programData, lecturesData] = await Promise.all([
        programService.getBySlug(slug),
        lectureService.getByProgramSlug(slug)
      ]);
      
      if (!programData) {
        setError("Program not found");
        return;
      }
      
      setProgram(programData);
      setLectures(lecturesData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProgramData();
  }, [slug]);

if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadProgramData} />;
  if (!program) return <Error message="Program not found" />;

// Membership program is now publicly accessible
  // Content restrictions are handled in LectureList component

  return (
    <PageContainer>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
{/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate("/program")}
          >
            <ApperIcon name="ArrowLeft" className="w-4 h-4 mr-2" />
            Back to Programs
          </Button>
          
          {currentUser?.is_admin && (
            <Button
              className="bg-primary-400 hover:bg-primary-600 text-white"
              onClick={() => toast.info('Add Lecture feature coming soon!')}
            >
              <ApperIcon name="Plus" className="w-4 h-4 mr-2" />
              Add Lecture
            </Button>
          )}
        </div>

        {/* Program Info */}
        <Card className="p-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-4 mb-4">
                <h1 className="text-3xl font-display font-bold text-white">
                  {program.title}
                </h1>
                {program.has_common_course && (
                  <span className="px-3 py-1 bg-primary-400/20 text-primary-400 text-sm rounded-full font-medium">
                    Common Course Available
                  </span>
                )}
              </div>
              
              <p className="text-slate-400 text-lg mb-6 leading-relaxed">
                {program.description_short}
              </p>
              
              {program.description_long && (
                <p className="text-slate-300 leading-relaxed">
                  {program.description_long}
                </p>
              )}
            </div>
            
            <div className="space-y-4">
              <div className="bg-midnight-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Program Stats</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Total Lectures</span>
                    <span className="text-white font-medium">{lectures.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Categories</span>
                    <span className="text-white font-medium">
                      {new Set(lectures.map(l => l.category)).size}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Total Duration</span>
                    <span className="text-white font-medium">
                      {lectures.reduce((acc, l) => acc + l.duration_minutes, 0)} min
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Lectures */}
<div>
          <h2 className="text-2xl font-display font-bold text-white mb-6">
            Course Content
          </h2>
          {lectures.length === 0 ? (
            <Empty
              title="No videos yet"
              description="This program doesn't have any lectures available at the moment. Check back soon for new content!"
              actionText="Browse Other Programs"
              onAction={() => navigate('/program')}
              icon="VideoOff"
            />
          ) : (
            <LectureList lectures={lectures} programSlug={slug} />
          )}
        </div>
      </motion.div>
    </PageContainer>
  );
};

export default ProgramDetailPage;