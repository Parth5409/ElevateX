import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import SideNavBar from './SideNavBar';
import TopNavBar from './TopNavBar';

const DashboardLayout = () => {
  const location = useLocation();
  const isTpo = location.pathname.startsWith('/tpo');

  return (
    <div className="bg-background text-on-surface min-h-screen">
      <SideNavBar isTpo={isTpo} />
      <main className="ml-64 min-h-screen relative">
        <TopNavBar />
        <div className="pt-24 pb-12 px-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
