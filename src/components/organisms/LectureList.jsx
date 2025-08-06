import React, { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { useAuth } from "@/App";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";

const LectureList = ({ lectures, programSlug }) => {
const [selectedLecture, setSelectedLecture] = useState(null);
  const { currentUser } = useAuth();
  
  // Check if user has access to all lectures
  const hasFullAccess = currentUser && (currentUser.role === 'member' || currentUser.role === 'both' || currentUser.is_admin);
  
  // Group lectures by category
const groupedLectures = lectures.reduce((acc, lecture) => {
    if (!acc[lecture.category]) {
      acc[lecture.category] = [];
    }
    acc[lecture.category].push(lecture);
    return acc;
  }, {});

  // Get first category and first lecture for free users
  const firstCategory = Object.keys(groupedLectures)[0];
  const firstLecture = firstCategory ? groupedLectures[firstCategory][0] : null;

  const LockOverlay = ({ onUnlockClick }) => (
    <div className="absolute inset-0 backdrop-blur-sm bg-midnight-900/70 rounded-lg flex items-center justify-center">
      <div className="text-center p-6">
        <ApperIcon name="Lock" className="w-8 h-8 text-primary-400 mx-auto mb-3" />
        <h4 className="font-semibold text-white mb-2">Premium Content</h4>
        <p className="text-sm text-slate-400 mb-4">
          {currentUser ? 'Upgrade to unlock all lectures' : 'Log in to unlock all lectures'}
        </p>
        <Button 
          onClick={onUnlockClick}
          className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 text-sm"
        >
          {currentUser ? 'Upgrade Now' : 'Log In'}
        </Button>
      </div>
    </div>
  );

  const LectureItem = ({ lecture, isLocked = false }) => (
    <motion.div
      whileHover={{ x: 4 }}
      className={`relative flex items-center space-x-4 p-4 rounded-lg transition-colors ${
        isLocked ? 'cursor-not-allowed opacity-75' : 'hover:bg-midnight-800 cursor-pointer'
      }`}
      onClick={() => !isLocked && setSelectedLecture(lecture)}
    >
<div className="w-16 h-12 bg-midnight-700 rounded-lg flex items-center justify-center">
        <ApperIcon name={isLocked ? "Lock" : "Play"} className={`w-6 h-6 ${isLocked ? 'text-slate-400' : 'text-primary-400'}`} />
      </div>
      
      <div className="flex-1">
        <h4 className={`font-medium ${isLocked ? 'text-slate-300' : 'text-white'}`}>
          {lecture.title}
        </h4>
        <p className="text-sm text-slate-400">
          {lecture.duration_minutes} minutes
        </p>
      </div>
      
      <ApperIcon name="ChevronRight" className="w-5 h-5 text-slate-500" />
      
      {isLocked && (
        <LockOverlay 
          onUnlockClick={() => {
            if (!currentUser) {
              toast.info('Please log in to access all lectures');
            } else {
              toast.info('Upgrade your membership to unlock all content');
            }
          }}
        />
      )}
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
        
        <div className="p-6 bg-midnight-800 rounded-lg">
          <h3 className="text-lg font-semibold text-white mb-3">About this lecture</h3>
          <p className="text-slate-300 leading-relaxed">
            This {selectedLecture.duration_minutes}-minute lecture covers essential concepts in {selectedLecture.category.toLowerCase()}.
          </p>
        </div>
      </div>
    );
  }

  return (
    <Card className="bg-midnight-800 border-midnight-700">
      <div className="p-6">
        <h2 className="text-2xl font-display font-bold text-white mb-6">
          Course Content
        </h2>
        
        <div className="space-y-8">
          {Object.entries(groupedLectures).map(([category, categoryLectures], categoryIndex) => (
            <div key={category}>
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <span className="w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                  {categoryIndex + 1}
                </span>
                {category}
              </h3>
              
              <div className="space-y-2 ml-11">
                {categoryLectures.map((lecture, lectureIndex) => {
                  // For free users, only show first lecture of first category as unlocked
                  const isFirstLectureOfFirstCategory = category === firstCategory && lectureIndex === 0;
                  const isLocked = !hasFullAccess && !isFirstLectureOfFirstCategory;
                  
                  return (
                    <LectureItem 
                      key={lecture.Id} 
                      lecture={lecture} 
                      isLocked={isLocked}
                    />
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        
        {!hasFullAccess && (
          <div className="mt-8 p-6 bg-gradient-to-r from-primary-500/20 to-primary-600/20 rounded-lg border border-primary-500/30">
            <div className="flex items-start space-x-4">
              <ApperIcon name="Crown" className="w-8 h-8 text-primary-400 mt-1" />
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {currentUser ? 'Upgrade to Premium' : 'Join Our Community'}
                </h3>
                <p className="text-slate-300 mb-4">
                  {currentUser 
                    ? 'Unlock all lectures and exclusive content with a premium membership.'
                    : 'Sign up to unlock your first lecture and join thousands of learners.'
                  }
                </p>
                <Button 
                  onClick={() => {
                    if (!currentUser) {
                      toast.info('Redirecting to login...');
                    } else {
                      toast.info('Redirecting to upgrade...');
                    }
                  }}
                  className="bg-primary-500 hover:bg-primary-600 text-white"
                >
                  {currentUser ? 'Upgrade Now' : 'Get Started Free'}
                </Button>
              </div>
            </div>
          </div>
)}
      </div>
    </Card>
  );
};

export default LectureList;