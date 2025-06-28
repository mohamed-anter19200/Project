import React, { useState, useEffect, memo, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../API/Auth/Auth';
import { userContext } from '../../context/User.context';

const MOBILE_BREAKPOINT = 768;
const MENU_ITEMS = [
  {
    id: 'courses',
    title: 'Course Management',
    icon: 'fas fa-book',
    items: [
      { title: 'Add New Course', path: 'courses/addCourse', color: 'text-emerald-500', icon: 'fas fa-plus' },
      { title: 'View All Courses', path: 'courses/displayAllCourses', color: 'text-sky-500', icon: 'fas fa-list' },
    ],
  },
  {
    id: 'lecturers',
    title: 'Lecturer Management',
    icon: 'fas fa-chalkboard-teacher',
    items: [
      { title: 'Add New Lecturer', path: 'lecturers/addLecturer', color: 'text-emerald-500', icon: 'fas fa-plus' },
      { title: 'View All Lecturers', path: 'lecturers/displayAllLecturers', color: 'text-sky-500', icon: 'fas fa-list' },
    ],
  },
];

const MenuItem = memo(({ item, isOpen, isActive, onClick, onSubItemClick }) => (
  <div className="group relative">
    <button
      onClick={() => onClick(item.id)}
      className={`w-full flex items-center justify-between p-2 rounded-lg transition-all duration-300 ease-in-out ${isActive ? 'bg-white' : 'hover:bg-white/10'}`}
    >
      <div className={`flex items-center cursor-pointer overflow-hidden ${isOpen ? 'gap-3 w-full text-blue-600' : 'justify-center w-full'}`}>
        <i className={`${item.icon} text-xl flex-shrink-0 ${!isOpen ? 'text-blue-400' : ''}`} />
        <span className={`font-medium whitespace-nowrap transition-all duration-300 ${!isOpen ? 'hidden' : 'block text-lg'}`}>
          {item.title}
        </span>
      </div>
      {isOpen && <i className={`fas fa-chevron-down text-sm transition-transform duration-300 ${isActive ? 'rotate-180' : ''}`} />}
    </button>

    {!isOpen && (
      <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2 py-1 bg-gray-800 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50">
        {item.title}
      </div>
    )}
    
    {isOpen && isActive && (
      <div className="mt-2 pl-4 space-y-1">
        {item.items.map(subItem => (
          <Link
            key={subItem.path}
            to={subItem.path}
            onClick={onSubItemClick}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/5 transition-all duration-200"
          >
            <i className={`${subItem.icon} text-sm ${subItem.color}`} />
            <span className="text-sm">{subItem.title}</span>
          </Link>
        ))}
      </div>
    )}
  </div>
));

const Sidebar = () => {
  const navigate = useNavigate();
  const { setToken } = useContext(userContext);
  const [openMenus, setOpenMenus] = useState({});
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

  const handleMenuClick = (menuId) => {
    if (!isSidebarOpen && isMobile) {
      setSidebarOpen(true);
    } else {
      setOpenMenus(prev => ({ ...prev, [menuId]: !prev[menuId] }));
    }
  };

  const handleSidebarToggle = () => {
    if (isMobile) setSidebarOpen(prev => !prev);
  };

  const handleLogout = () => {
    logout(navigate, setToken);
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
               <Link to="/admin">
               <div className={`transition-all duration-300 ${!isSidebarOpen ? 'opacity-0 w-0' : 'opacity-100 w-auto'}`}>
                <h1 className="text-2xl font-bold text-white tracking-wide whitespace-nowrap">Study Stack</h1>
                <p className="text-gray-400 text-sm mt-1">Admin Dashboard</p>
              </div>
               </Link>
              {isMobile && (
                <button
                  onClick={handleSidebarToggle}
                  className={`p-1.5 rounded-full border   transition-all duration-300 overflow-hidden cursor-pointer
                     hover:bg-white/10 ${!isSidebarOpen ? 'absolute left-1/2 -translate-x-1/2' : ''}`}
                >
                  <i className={`fas ${isSidebarOpen ? 'fa-chevron-left' : 'fa-chevron-right'} text-sm`} />
                </button>
              )}
            </div>
          </div>

          <nav className="flex-1 p-3 space-y-4">
            {MENU_ITEMS.map(item => (
              <MenuItem
                key={item.id}
                item={item}
                isOpen={isSidebarOpen}
                isActive={openMenus[item.id]}
                onClick={handleMenuClick}
                onSubItemClick={() => isMobile && setSidebarOpen(false)}
              />
            ))}
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

export default memo(Sidebar); 