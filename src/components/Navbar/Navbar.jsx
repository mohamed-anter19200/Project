import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { logout } from "../../API/Auth/Auth";
import { useContext } from "react";
import { userContext } from "../../context/User.context";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const {setToken} = useContext(userContext)
  const [menuOpen, setMenuOpen] = useState(false);
  const handleLogout = () => {
    logout(navigate,setToken)
  };
  const links = [
    { path: "/student", label: "Home", exact: true },
    { path: "/student/subjects", label: "Subjects" },
    { path: "/student/sections", label: "Sections" },
  ];

  const toggleMenu = () => setMenuOpen(prev => !prev);
 
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const getLinkClass = ({ isActive }) =>
    `relative inline-block px-2 py-1 before:absolute before:bottom-0 before:left-0 before:h-0.5 before:transition-all before:duration-300 before:bg-blue-700 ${
      isActive ? "before:w-full font-semibold text-blue-700" : "before:w-0 hover:before:w-full hover:text-blue-700"
    }`;

  return (
    <nav className="fixed w-full h-13 z-20 top-0 start-0 border-b bg-slate-50 border-gray-200 text-black transition-colors duration-150">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto px-4 py-2">
                
        <div className="flex items-center space-x-3 rtl:space-x-reverse">
          <span className="self-center text-xl font-semibold whitespace-nowrap">EduConnect</span>
        </div>

         <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <button onClick={handleLogout} className="btn p-2" aria-label="Log out">Log out</button>
          <button
            onClick={toggleMenu}
            className="p-2 w-10 h-10 flex items-center justify-center rounded-lg md:hidden transition-colors duration-300"
            aria-controls="navbar-sticky"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 17 14" aria-hidden="true">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          </button>
        </div>

        <div className={`items-center md:me-auto md:ms-10 justify-between ${menuOpen ? "block" : "hidden"} w-full md:flex md:w-auto`} id="navbar-sticky">
          <ul className="flex flex-col font-medium rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 bg-slate-50 text-black">
            {links.map(({ path, label, exact }) => (
              <li key={path}>
                <NavLink to={path} end={exact} className={getLinkClass}>
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
