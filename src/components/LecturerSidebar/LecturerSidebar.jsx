import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../API/Auth/Auth';
import { userContext } from '../../context/User.context';
import { useContext } from 'react';

const MOBILE_BREAKPOINT = 768;

const LecturerSidebar = () => {
  const navigate = useNavigate();
  const { setToken } = useContext(userContext);
  const [isSidebarOpen, setSidebarOpen] = useState(window.innerWidth >= MOBILE_BREAKPOINT);
  const [isMobile, setIsMobile] = useState(window.innerWidth < MOBILE_BREAKPOINT);

  useEffect(() => {
    const handleResize = () => {
      const isMobileView = window.innerWidth < MOBILE_BREAKPOINT;
      setIsMobile(isMobileView);
      setSidebarOpen(!isMobileView);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = () => {
    logout(navigate, setToken);
  };

  const handleSidebarToggle = () => {
    if (isMobile) setSidebarOpen(prev => !prev);
  };

  return (
    <>
      {isMobile && isSidebarOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30" onClick={handleSidebarToggle} />
      )}

      <aside className={`fixed left-0 top-0 z-40 h-screen transition-all duration-300 bg-gray-900 border-r border-white/10 ${isSidebarOpen ? 'w-72' : 'w-[60px]'}`}>
        <div className="flex flex-col h-full">
          <div className="p-4 border-b border-white/10">
            <div className="flex items-center justify-between">
              <Link to="/lecturer">
                <div className={`transition-all duration-300 ${!isSidebarOpen ? 'opacity-0 w-0' : 'opacity-100 w-auto'}`}>
                  <h1 className="text-2xl font-bold text-white tracking-wide whitespace-nowrap">EduConnect</h1>
                  <p className="text-gray-400 text-sm mt-1">Lecturer Dashboard</p>
                </div>
              </Link>
              {isMobile && (
                <button
                  onClick={handleSidebarToggle}
                  className={`p-1.5 rounded-full border border-white/20 transition-all duration-300 overflow-hidden cursor-pointer hover:bg-white/10 ${!isSidebarOpen ? 'absolute left-1/2 -translate-x-1/2' : ''}`}
                >
                  <i className={`fas ${isSidebarOpen ? 'fa-chevron-left' : 'fa-chevron-right'} text-sm`} />
                </button>
              )}
            </div>
          </div>

          <nav className="flex-1 p-4 space-y-2">
            <Link
              to="/lecturer/add-topic"
              className={`flex items-center gap-3 p-3 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200 ${!isSidebarOpen ? 'justify-center' : ''}`}
            >
              <i className="fas fa-plus text-emerald-500" />
              <span className={`transition-all duration-300 ${!isSidebarOpen ? 'hidden' : 'block'}`}>
                Add Lecture/Section
              </span>
            </Link>

            <Link
              to="/lecturer"
              className={`flex items-center gap-3 p-3 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200 ${!isSidebarOpen ? 'justify-center' : ''}`}
            >
              <i className="fas fa-list text-sky-500" />
              <span className={`transition-all duration-300 ${!isSidebarOpen ? 'hidden' : 'block'}`}>
                Display All
              </span>
            </Link>
          </nav>

           <div className="p-4">
            <button
              onClick={handleLogout}
              className={`w-full flex items-center justify-center p-2 btn transition-all duration-300 ${!isSidebarOpen ? 'p-2' : 'gap-3'}`}
            >
              <i className="fas fa-sign-out-alt text-xl" />
              <span className={`font-medium transition-all duration-300 ${!isSidebarOpen ? 'hidden' : 'block'}`}>
                Sign Out
              </span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default LecturerSidebar; 