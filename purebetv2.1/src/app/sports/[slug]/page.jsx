'use client'
import React, { useState } from 'react';

import Sidebar from "../../components/sidebar";
import Header from "../../components/header";
import Avsports from './avsports';

export default function Component() {

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
      setIsSidebarOpen(!isSidebarOpen);
    };


    return (
        <div className='bg-black min-h-screen'>
      <Header toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />

      <div className='flex'>
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <div className={`flex-1 ${isSidebarOpen ? 'hidden lg:block' : 'block'}`}>
          <Avsports />
        </div>
      </div>
    </div>
    )
  }
  