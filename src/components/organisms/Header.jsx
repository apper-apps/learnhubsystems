import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Button from "@/components/atoms/Button";
import Dropdown from "@/components/molecules/Dropdown";
import ApperIcon from "@/components/ApperIcon";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Mock authentication state - in real app this would come from context/store
  const isLoggedIn = true;
  const isAdmin = true;

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