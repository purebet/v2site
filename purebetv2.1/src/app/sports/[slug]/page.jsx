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
    <div
    className='bg-black min-h-screen'>
      <Header toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />

      <div
       style={{
        position: 'absolute',
        width: 396.9,
        height: 232.02,
        left: 0,
        top:-10,
        backgroundColor: 'rgba(0, 35, 103, 0.4)',
        filter: 'blur(64.4px)',
        transform: [{ rotate: '-142.81deg' }],
      }} 
      >
   </div>
<div
  style={{
    position: 'absolute',
    width: 396.9,
    height: 150.02,
    left: "35%",
    top:-15,
    background: 'linear-gradient(90deg, rgba(97, 221, 0, 0.6) 0%, rgba(192, 59, 214, 0.6) 48%, rgba(0, 102, 255, 0.6) 100%)',
    filter: 'blur(85.05px)',
    transform: 'rotate(0.44deg)',
  }}
>
</div>

   
      <div 
      
      className='flex max-w-full'>
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
