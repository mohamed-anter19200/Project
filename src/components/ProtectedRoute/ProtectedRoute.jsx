import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { userContext } from '../../context/User.context';

export default function ProtectedRoute({ children }) {
  const { token, role } = useContext(userContext);
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  const currentPath = location.pathname;

  // لو داخل على admin ومش admin
  if (currentPath.startsWith('/admin') && role !== 'admin') {
    if (role === 'student') return <Navigate to="/student" replace />;
    if (role === 'doctor') return <Navigate to="/lecturer" replace />;
  }

  // لو داخل على student ومش user
  if (currentPath.startsWith('/student') && role !== 'student') {
    if (role === 'admin') return <Navigate to="/admin" replace />;
    if (role === 'doctor') return <Navigate to="/lecturer" replace />;
  }

  // لو داخل على lecturer ومش doctor
  if (currentPath.startsWith('/lecturer') && role !== 'doctor') {
    if (role === 'admin') return <Navigate to="/admin" replace />;
    if (role === 'student') return <Navigate to="/student" replace />;
  }

  return children;
}



//  import React, { useContext } from 'react';
// import { Navigate, useLocation } from 'react-router-dom';
// import { userContext } from '../../context/User.context';

// export default function ProtectedRoute({ children }) {
//   const { token, role } = useContext(userContext);
//   const location = useLocation();

//   if (!token) {
//     return <Navigate to="/login" replace />;
//   }

//   if (location.pathname.startsWith('/admin') && role !== 'admin' && role == 'user') {
//     return <Navigate to="/student" replace />;
//   }
//   if (location.pathname.startsWith('/student') && role !== 'user' && role == 'admin') {
//     return <Navigate to="/admin" replace />;
//   }
//   return children;
// }











// import React, { useContext } from 'react';
// import { Navigate, useLocation } from 'react-router-dom';
// import { userContext } from '../../context/User.context';

// export default function ProtectedRoute({ children }) {
//   const { token, role } = useContext(userContext);
//   const location = useLocation();

//   if (!token) {
//     return <Navigate to="/login" replace />;
//   }

//    const path = location.pathname;

//   const rolePaths = {
//     admin: '/admin',
//     user: '/student',
//     doctor: '/lecturer',
//   };

//   const allowedPath = rolePaths[role];

//   if (path.startsWith(allowedPath)) {
//     return <Navigate to={allowedPath} replace />;
//   }

//   return children;
// }
