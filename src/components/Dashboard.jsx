import React, { useContext, useState, useEffect } from "react";
import Menubar from "./Menubar";
import { AppContext } from "../context1/AppContext";
import Sidebar from "./Sidebar";

const Dashboard = ({ children, activeMenu }) => {
  const { user } = useContext(AppContext);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  // Auto-hide sidebar on mobile when route changes
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1080) {
        setIsSidebarVisible(true);
      } else {
        setIsSidebarVisible(false);
      }
    };

    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close sidebar when activeMenu changes (mobile)
  useEffect(() => {
    if (window.innerWidth < 1080) {
      setIsSidebarVisible(false);
    }
  }, [activeMenu]);

  return (
    <div className="min-h-screen bg-gray-50/30">
      <Menubar activeMenu={activeMenu} />
      {user && (
        <div className="flex relative">
          {/* Sidebar for desktop and mobile */}
          <div className={`
            ${isSidebarVisible ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'} 
            transition-all duration-500 ease-in-out
            fixed lg:relative z-20 lg:z-auto
            min-[1080px]:translate-x-0 min-[1080px]:opacity-100
            h-[calc(100vh-73px)] top-[73px] left-0
          `}>
            <Sidebar activeMenu={activeMenu} />
          </div>

          {/* Mobile overlay */}
          {isSidebarVisible && (
            <div 
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-10 lg:hidden transition-all duration-500 animate-fadeIn"
              onClick={() => setIsSidebarVisible(false)}
            />
          )}

          {/* Main content */}
          <div className={`
            grow transition-all duration-500
            ${isSidebarVisible ? 'lg:ml-0' : 'ml-0'}
            w-full
          `}>
            <div className="mx-4 sm:mx-6 lg:mx-8 py-6 animate-fadeInUp">
              {children}
            </div>
          </div>
        </div>
      )}

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out forwards;
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }

        /* Smooth scrolling for the entire app */
        html {
          scroll-behavior: smooth;
        }

        /* Custom scrollbar for main content */
        .grow ::-webkit-scrollbar {
          width: 6px;
        }
        
        .grow ::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        
        .grow ::-webkit-scrollbar-thumb {
          background: #c5c5c5;
          border-radius: 10px;
        }
        
        .grow ::-webkit-scrollbar-thumb:hover {
          background: #a8a8a8;
        }

        /* Mobile responsiveness */
        @media (max-width: 640px) {
          .mx-4.sm\\:mx-6.lg\\:mx-8 {
            margin-left: 1rem;
            margin-right: 1rem;
          }
          
          .py-6 {
            padding-top: 1.25rem;
            padding-bottom: 1.25rem;
          }
        }

        @media (max-width: 480px) {
          .mx-4.sm\\:mx-6.lg\\:mx-8 {
            margin-left: 0.75rem;
            margin-right: 0.75rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Dashboard;