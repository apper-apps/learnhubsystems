import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import React from "react";
import { useAuth } from "@/App";
import ApperIcon from "@/components/ApperIcon";
import Dropdown from "@/components/molecules/Dropdown";
import Button from "@/components/atoms/Button";

const Header = () => {
  const { currentUser, isLoggedIn, isAdmin, login, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  
// Mock users data for demo login functionality
  const mockUsers = [
    {
      Id: 1,
      name: "Admin User",
      email: "admin@learnhubpro.com",
      avatar_url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      is_admin: true
    },
    {
      Id: 2,
      name: "John Doe", 
      email: "john.doe@example.com",
      avatar_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      is_admin: false
    }
  ];

  const handleLogin = () => {
    // Mock login - in real app would redirect to login page
    login(mockUsers[0]); // Login as admin for demo
  };

  const handleSignUp = () => {
    // Mock signup - in real app would redirect to signup page  
    login(mockUsers[1]); // Login as regular user for demo
  };

  const handleLogout = () => {
    logout();
  };

  // Avatar dropdown items
  const avatarDropdownItems = [
    { label: "Profile", path: "/profile", icon: "User" },
    { label: "Settings", path: "/settings", icon: "Settings" },
    ...(isAdmin ? [{ label: "Admin", path: "/admin", icon: "Shield" }] : []),
    { label: "Sign Out", onClick: handleLogout, icon: "LogOut" }
  ];

  const isActive = (path) => location.pathname === path || location.pathname.startsWith(path + "/");

  const NavLink = ({ to, children, dropdown }) => {
    const active = isActive(to);
    
    if (dropdown) {
      return (
        <Dropdown
          trigger={
            <div className={`flex items-center space-x-1 px-4 py-2 rounded-lg transition-colors cursor-pointer ${
              active ? "bg-primary-400/20 text-primary-400" : "text-slate-300 hover:text-white hover:bg-surface"
            }`}>
              <span className="font-medium">{children}</span>
              <ApperIcon name="ChevronDown" className="w-4 h-4" />
            </div>
          }
        >
          {dropdown.map((item, index) => (
            <Dropdown.Item
              key={index}
              onClick={() => navigate(item.path)}
            >
              {item.label}
            </Dropdown.Item>
          ))}
        </Dropdown>
      );
    }

    return (
      <Link
        to={to}
        className={`px-4 py-2 rounded-lg transition-colors font-medium ${
          active ? "bg-primary-400/20 text-primary-400" : "text-slate-300 hover:text-white hover:bg-surface"
        }`}
      >
        {children}
      </Link>
    );
  };

  const programDropdown = [
    { label: "All Programs", path: "/program" },
    { label: "Membership Course", path: "/program/membership" },
    { label: "Text Influencer Master", path: "/program/text-influencer" }
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="sticky top-0 z-40 bg-midnight-900/80 backdrop-blur-lg border-b border-midnight-700"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-400 to-primary-600 rounded-lg flex items-center justify-center">
              <ApperIcon name="GraduationCap" className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-display font-bold text-white">
              LearnHub Pro
            </span>
          </Link>
{/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-2">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/program" dropdown={programDropdown}>
              Program
            </NavLink>
            <NavLink to="/insight">Insight</NavLink>
            <NavLink to="/reviews">Reviews</NavLink>
            {isLoggedIn && <NavLink to="/profile">Profile</NavLink>}
            {isAdmin && <NavLink to="/admin">Admin</NavLink>}
          </nav>

          {/* Authentication Section */}
          <div className="hidden md:flex items-center space-x-3">
            {!currentUser ? (
              // Show Log In / Sign Up buttons when not logged in
              <div className="flex items-center space-x-2">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={handleLogin}
                  className="text-midnight-300 hover:text-white"
                >
                  Log In
                </Button>
                <Button 
                  size="sm"
                  onClick={handleSignUp}
                  className="bg-primary-500 hover:bg-primary-600 text-white"
                >
                  Sign Up
                </Button>
              </div>
            ) : (
              // Show avatar dropdown when logged in
              <Dropdown
                align="right"
                trigger={
                  <div className="flex items-center space-x-2 cursor-pointer hover:bg-midnight-800 rounded-lg p-2 transition-colors">
                    <img
                      src={currentUser.avatar_url}
                      alt={currentUser.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <span className="text-sm text-midnight-200">{currentUser.name}</span>
                    <ApperIcon name="ChevronDown" className="w-4 h-4 text-midnight-400" />
                  </div>
                }
              >
                {avatarDropdownItems.map((item, index) => (
                  <Dropdown.Item
                    key={index}
                    onClick={item.onClick || (() => navigate(item.path))}
                    className="flex items-center space-x-2 px-4 py-2 text-sm text-midnight-200 hover:bg-midnight-700 hover:text-white"
                  >
                    <ApperIcon name={item.icon} className="w-4 h-4" />
                    <span>{item.label}</span>
                  </Dropdown.Item>
                ))}
              </Dropdown>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button variant="ghost" size="sm">
              <ApperIcon name="Menu" className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;