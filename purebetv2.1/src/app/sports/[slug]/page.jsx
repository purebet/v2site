'use client';
import React, { useState } from 'react';
import { usePathname } from 'next/navigation';

import Sidebar from "../../components/sidebar";
import Header from "../../components/header";
import Sports from './sports';
import Home from './home'; // import the Home component
import WalletDataCard from "../../components/walletdatacard";
import Bottomnav from '../../components/Bottomnav';
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
      return <Sports />;
    }
  };

  return (
    <div
    className='bg-black min-h-screen'>
      <Header toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />

      <div
       className='blueball'
      >
   </div>
<div
  className='colorfulellipse'
>
</div>

   
      <div 
      
      className='flex max-w-full'>
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <div className={`flex-1 ${isSidebarOpen ? 'hidden lg:block' : 'block'}`}>
          {renderMainContent()}
        </div>
        <div className={` hidden md:block lg:block`}>
          {/* <WalletDataCard /> */}
          <div className='w-full bg-white'></div>
        </div>
      </div>
      <div className="md:hidden">   <Bottomnav /></div>  

    </div>
  );
}
