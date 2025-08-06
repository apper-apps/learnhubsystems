import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";

const Dropdown = ({ trigger, children, align = "left" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const alignmentClasses = {
    left: "left-0",
    right: "right-0",
    center: "left-1/2 transform -translate-x-1/2"
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <div onClick={() => setIsOpen(!isOpen)}>
        {trigger}
      </div>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className={`absolute top-full mt-2 z-50 ${alignmentClasses[align]}`}
          >
            <div className="bg-surface border border-midnight-600 rounded-lg shadow-xl py-2 min-w-[200px]">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const DropdownItem = ({ children, onClick, className = "" }) => (
  <button
    onClick={onClick}
    className={`w-full text-left px-4 py-2 text-sm text-slate-300 hover:text-white hover:bg-midnight-700 transition-colors ${className}`}
  >
    {children}
  </button>
);

Dropdown.Item = DropdownItem;

export default Dropdown;