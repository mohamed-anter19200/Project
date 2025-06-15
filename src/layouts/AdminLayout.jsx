import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar/Sidebar';

const AdminLayout = () => {
  return (
    <>
      <div className="min-h-screen bg-gray-100 flex">
        <Sidebar />
        <main className="flex-1 transition-all duration-300 md:ml-72 ml-[60px] p-6">
            <Outlet />
         </main>
      </div>
    </>
  );
};

export default AdminLayout; 