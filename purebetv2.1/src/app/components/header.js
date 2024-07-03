'use client'

import React from 'react';
import Image from 'next/image';
import { FaBars } from 'react-icons/fa';
import { IoIosSearch } from "react-icons/io";
import { IoWallet } from "react-icons/io5";


const Header = ({ toggleSidebar, isSidebarOpen }) => {
  return (
    
    <div className={`flex mb-2 m-4 rounded-xl   border-2 border-[#222222] items-center justify-between p-4 bg-black text-white ${isSidebarOpen ? 'hidden md:flex' : 'flex'}`}>
      <button 
        className="md:hidden flex text-2xl focus:outline-none" 
        onClick={toggleSidebar}
      >
        <FaBars />
        <IoIosSearch  />

      </button>
      
      <div className="text-xl font-bold"><img width={60} height={50} src="/pure.svg"/></div>

<div className='flex justify-center items-center'>
<div className='hidden md:block' ><Image width={20} height={20} src='/warning.svg' /> </div>
     &nbsp;   &nbsp;<button 
        className="bg-white p-1   rounded-lg flex text-2xl focus:outline-none" 
      >
     <div className='flex items-center p-1   '>  <IoWallet color='black' /> <div className='hidden text-xs text-black md:block'> &nbsp; Wallet  </div> </div>


      </button>

      </div>
    </div>
  );
};

export default Header;
