import { motion } from "framer-motion";
import PageContainer from "@/components/organisms/PageContainer";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const StubPage = ({ 
  title = "Coming Soon", 
  description = "This page is under development and will be available soon.",
  icon = "Wrench"
}) => {
  return (
    <PageContainer>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-center min-h-[60vh]"
      >
        <Card className="p-12 text-center max-w-md">
          <div className="bg-primary-400/10 rounded-full p-4 w-20 h-20 mx-auto mb-6">
            <ApperIcon name={icon} className="w-12 h-12 text-primary-400" />
          </div>
          
          <h1 className="text-2xl font-display font-bold text-white mb-4">
            {title}
          </h1>
          
          <p className="text-slate-400 mb-8 leading-relaxed">
            {description}
          </p>
          
          <Button 
            variant="primary" 
            onClick={() => window.history.back()}
          >
            <ApperIcon name="ArrowLeft" className="w-4 h-4 mr-2" />
            Go Back
          </Button>
        </Card>
      </motion.div>
    </PageContainer>
  );
};

export default StubPage;