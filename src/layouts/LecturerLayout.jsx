import React from 'react';
import { Outlet } from 'react-router-dom';
import LecturerSidebar from '../components/LecturerSidebar/LecturerSidebar';

const LecturerLayout = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex">
      <LecturerSidebar />
      <main className="flex-1 transition-all duration-300 md:ml-72 ml-[60px]">
        <Outlet />
      </main>
    </div>
  );
};

export default LecturerLayout; 