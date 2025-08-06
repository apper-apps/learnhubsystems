import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Layout from "@/components/organisms/Layout";
import HomePage from "@/components/pages/HomePage";
import ProgramListPage from "@/components/pages/ProgramListPage";
import ProgramDetailPage from "@/components/pages/ProgramDetailPage";
import InsightListPage from "@/components/pages/InsightListPage";
import InsightDetailPage from "@/components/pages/InsightDetailPage";
import ReviewsPage from "@/components/pages/ReviewsPage";
import ProfilePage from "@/components/pages/ProfilePage";
import AdminPage from "@/components/pages/AdminPage";
import AdminUsersPage from "@/components/pages/AdminUsersPage";
import AdminProgramsPage from "@/components/pages/AdminProgramsPage";
import AdminLecturesPage from "@/components/pages/AdminLecturesPage";
import AdminPostsPage from "@/components/pages/AdminPostsPage";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-midnight-900 text-white">
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/program" element={<ProgramListPage />} />
            <Route path="/program/:slug" element={<ProgramDetailPage />} />
            <Route path="/insight" element={<InsightListPage />} />
            <Route path="/insight/:slug" element={<InsightDetailPage />} />
            <Route path="/reviews" element={<ReviewsPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/admin/users" element={<AdminUsersPage />} />
            <Route path="/admin/programs" element={<AdminProgramsPage />} />
            <Route path="/admin/lectures" element={<AdminLecturesPage />} />
            <Route path="/admin/posts" element={<AdminPostsPage />} />
          </Routes>
        </Layout>
        
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          style={{ zIndex: 9999 }}
        />
      </div>
    </Router>
  );
}

export default App;