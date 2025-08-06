import "@/index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import React, { createContext, useContext, useState } from "react";
import Layout from "@/components/organisms/Layout";
import Error from "@/components/ui/Error";
import AdminProgramsPage from "@/components/pages/AdminProgramsPage";
import AdminUsersPage from "@/components/pages/AdminUsersPage";
import AdminLecturesPage from "@/components/pages/AdminLecturesPage";
import InsightListPage from "@/components/pages/InsightListPage";
import HomePage from "@/components/pages/HomePage";
import ProgramListPage from "@/components/pages/ProgramListPage";
import InsightDetailPage from "@/components/pages/InsightDetailPage";
import ProfilePage from "@/components/pages/ProfilePage";
import AdminPostsPage from "@/components/pages/AdminPostsPage";
import AdminPage from "@/components/pages/AdminPage";
import ReviewsPage from "@/components/pages/ReviewsPage";
import ProgramDetailPage from "@/components/pages/ProgramDetailPage";

// Authentication Context
const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

function App() {
  const [currentUser, setCurrentUser] = useState(null); // null when logged out

  // Mock authentication functions
  const login = (user) => {
    setCurrentUser(user);
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const authValue = {
    currentUser,
    login,
    logout,
    isLoggedIn: currentUser !== null,
    isAdmin: currentUser?.is_admin || false,
  };

return (
    <AuthContext.Provider value={authValue}>
      <BrowserRouter>
        <div className="min-h-screen bg-midnight-900 text-white">
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
<Route path="/program" element={<ProgramListPage />} />
        <Route path="/program/membership" element={<ProgramDetailPage />} />
        <Route path="/program/master" element={<ProgramDetailPage />} />
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
            style={{
              zIndex: 9999
            }} />
        </div>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;