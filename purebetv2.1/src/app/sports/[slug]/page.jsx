'use client';
import React, { useState } from 'react';
import { usePathname } from 'next/navigation';

import Sidebar from "../../components/sidebar";
import Header from "../../components/header";
import Avsports from './sports';
import Home from './home'; // import the Home component
import WalletDataCard from "../../components/walletdatacard";

export default function Component() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const path = usePathname();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const renderMainContent = () => {
    if (path.includes("home")) {
      return <Home />;
    } else {
      return <Avsports />;
    }
  };

  return (
    <div className='bg-black min-h-screen'>
      <Header toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />

      <div className='flex'>
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <div className={`flex-1 ${isSidebarOpen ? 'hidden lg:block' : 'block'}`}>
          {renderMainContent()}
        </div>
        <div className={` hidden md:block lg:block`}>
          <WalletDataCard />
        </div>
      </div>
    </div>
  );
}
