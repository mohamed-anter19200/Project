import React from 'react';

export default function DashboardTitle({ title }) {
  return (
    <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">
      {title}
    </h2>
  );
} 