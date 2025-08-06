import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import PageContainer from "@/components/organisms/PageContainer";
import ProgramCard from "@/components/organisms/ProgramCard";
import SearchBar from "@/components/molecules/SearchBar";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import { programService } from "@/services/api/programService";

const ProgramListPage = () => {
  const [programs, setPrograms] = useState([]);
  const [filteredPrograms, setFilteredPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const loadPrograms = async () => {
    try {
      setLoading(true);
      setError(null);
      
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const data = await programService.getAll();
      setPrograms(data);
      setFilteredPrograms(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPrograms();
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setFilteredPrograms(programs);
    } else {
      const filtered = programs.filter(program =>
        program.title.toLowerCase().includes(query.toLowerCase()) ||
        program.description_short.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredPrograms(filtered);
    }
  };

  if (loading) return <Loading variant="card" />;
  if (error) return <Error message={error} onRetry={loadPrograms} />;

  return (
    <PageContainer
      title="Learning Programs"
      description="Discover our comprehensive collection of expert-led courses designed to accelerate your learning journey."
    >
      <div className="mb-8">
        <SearchBar
          onSearch={handleSearch}
          placeholder="Search programs..."
        />
      </div>

      {filteredPrograms.length === 0 ? (
        <Empty
          title="No programs found"
          description={searchQuery ? `No programs match "${searchQuery}". Try adjusting your search.` : "No programs are available at the moment."}
          icon="Search"
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPrograms.map((program, index) => (
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
      )}
    </PageContainer>
  );
};

export default ProgramListPage;