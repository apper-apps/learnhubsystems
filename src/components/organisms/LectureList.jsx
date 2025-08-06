import { useState } from "react";
import { motion } from "framer-motion";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const LectureList = ({ lectures, programSlug }) => {
  const [selectedLecture, setSelectedLecture] = useState(null);
  
  // Group lectures by category
  const groupedLectures = lectures.reduce((acc, lecture) => {
    if (!acc[lecture.category]) {
      acc[lecture.category] = [];
    }
    acc[lecture.category].push(lecture);
    return acc;
  }, {});

  const LectureItem = ({ lecture }) => (
    <motion.div
      whileHover={{ x: 4 }}
      className="flex items-center space-x-4 p-4 rounded-lg hover:bg-midnight-800 transition-colors cursor-pointer"
      onClick={() => setSelectedLecture(lecture)}
    >
      <div className="w-16 h-12 bg-midnight-700 rounded-lg flex items-center justify-center">
        <ApperIcon name="Play" className="w-6 h-6 text-primary-400" />
      </div>
      
      <div className="flex-1">
        <h4 className="font-medium text-white">{lecture.title}</h4>
        <p className="text-sm text-slate-400">
          {lecture.duration_minutes} minutes
        </p>
      </div>
      
      <ApperIcon name="ChevronRight" className="w-5 h-5 text-slate-500" />
    </motion.div>
  );

  if (selectedLecture) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-display font-bold text-white">
            {selectedLecture.title}
          </h2>
          <Button 
            variant="ghost" 
            onClick={() => setSelectedLecture(null)}
          >
            <ApperIcon name="X" className="w-5 h-5 mr-2" />
            Back to List
          </Button>
        </div>
        
        <div className="video-responsive">
          <iframe
            src={selectedLecture.embed_url}
            title={selectedLecture.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-white mb-2">About this lecture</h3>
          <div className="space-y-2 text-slate-400">
            <p><strong>Category:</strong> {selectedLecture.category}</p>
            <p><strong>Level:</strong> {selectedLecture.level}</p>
            <p><strong>Duration:</strong> {selectedLecture.duration_minutes} minutes</p>
            {selectedLecture.cohort_number && (
              <p><strong>Cohort:</strong> #{selectedLecture.cohort_number}</p>
            )}
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {Object.entries(groupedLectures).map(([category, categoryLectures]) => (
        <Card key={category} className="p-6">
          <h3 className="text-xl font-display font-semibold text-white mb-4">
            {category}
          </h3>
          
          <div className="space-y-2">
            {categoryLectures
              .sort((a, b) => a.order_index - b.order_index)
              .map((lecture) => (
                <LectureItem key={lecture.Id} lecture={lecture} />
              ))}
          </div>
        </Card>
      ))}
    </div>
  );
};

export default LectureList;