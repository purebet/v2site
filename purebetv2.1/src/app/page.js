'use client'
import React, { useState } from 'react';

import Sidebar from "./components/sidebar";
import Header from "./components/header";
export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (   
<div className='bg-black'>
<Header toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
<Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
</div>
  );
}
