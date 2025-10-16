import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { AppContext } from "../context1/AppContext";
import { User, LogOut, X, Menu, ChevronDown } from "lucide-react";
import Sidebar from "../components/Sidebar";

const Menubar = ({ activeMenu }) => {
  const [openSideMenu, setOpenSideMenu] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const { user, clearUser } = useContext(AppContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    setShowDropdown(false);
    navigate("/login");
  };

  // Close dropdown when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    
    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    // Cleanup listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown]);

  return (
    <div className="flex items-center justify-between gap-5 bg-white border-b border-gray-200/50 backdrop-blur-sm py-4 px-4 sm:px-7 sticky top-0 z-30 shadow-sm">
      {/* left side - menu button and title */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => setOpenSideMenu(!openSideMenu)}
          className="lg:hidden text-gray-600 hover:bg-gray-100 p-2 rounded-xl transition-all duration-300 hover:scale-105 active:scale-95"
        >
          {openSideMenu ? (
            <X size={20} className="transition-transform duration-300" />
          ) : (
            <Menu size={20} className="transition-transform duration-300" />
          )}
        </button>
        <div className="flex items-center gap-3">
          <img src={assets.logo} alt="logo" className="h-10 w-10 rounded-xl shadow-sm" />
          <span className="text-xl font-semibold text-gray-800 truncate bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Money Manager
          </span>
        </div>
      </div>

      {/* right side - avatar and dropdown */}
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className="flex items-center gap-2 bg-white hover:bg-gray-50 rounded-xl px-3 py-2 transition-all duration-300 border border-gray-200 hover:border-purple-200 hover:shadow-md group"
        >
          <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-purple-100 to-blue-100 rounded-full border border-purple-200">
            <User size={16} className="text-purple-600" />
          </div>
          <div className="hidden sm:block text-left">
            <p className="text-sm font-medium text-gray-800 truncate max-w-[120px]">
              {user?.fullName || "Welcome"}
            </p>
          </div>
          <ChevronDown 
            size={16} 
            className={`text-gray-500 transition-transform duration-300 ${showDropdown ? 'rotate-180' : ''}`} 
          />
        </button>

        {showDropdown && (
          <div className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50 animate-scaleIn">
            {/* user info */}
            <div className="px-4 py-4 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white rounded-t-2xl">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-purple-100 to-blue-100 rounded-xl border border-purple-200">
                  <User size={20} className="text-purple-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-800 truncate">
                    {user?.fullName || "User Name"}
                  </p>
                  <p className="text-xs text-gray-500 truncate mt-1">
                    {user?.email || "Email Address"}
                  </p>
                </div>
              </div>
            </div>

            {/* dropdown options */}
            <div className="py-2">
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 w-full px-4 py-3 text-sm text-gray-700 hover:bg-red-50 hover:text-red-700 rounded-lg mx-2 transition-all duration-200 group"
              >
                <div className="p-1.5 bg-red-100 rounded-lg group-hover:bg-red-200 transition-colors duration-200">
                  <LogOut size={16} className="text-red-500" />
                </div>
                <span className="font-medium">Logout</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* mobile side menu */}
      <div className={`fixed inset-0 z-20 transition-all duration-500 ease-in-out lg:hidden ${openSideMenu ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        <div className={`absolute left-0 right-0 top-[73px] bg-white border-b border-gray-200 transform transition-transform duration-500 ${openSideMenu ? 'translate-y-0' : '-translate-y-4'}`}>
          <Sidebar activeMenu={activeMenu} />
        </div>
        {/* Backdrop */}
        {openSideMenu && (
          <div 
            className="absolute inset-0 bg-black/20 backdrop-blur-sm -z-10"
            onClick={() => setOpenSideMenu(false)}
          />
        )}
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.95) translateY(-8px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        
        .animate-scaleIn {
          animation: scaleIn 0.2s ease-out forwards;
        }
        
        /* Mobile responsiveness */
        @media (max-width: 640px) {
          .w-64 {
            width: 280px;
            right: -10px;
          }
        }
      `}</style>
    </div>
  );
};

export default Menubar;