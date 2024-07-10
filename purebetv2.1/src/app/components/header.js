'use client';
import { IoWallet } from 'react-icons/io5';
import { useState, useEffect, useRef } from 'react';
import { HiChevronDown, HiChevronRight } from "react-icons/hi2";
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import Image from 'next/image';
import { FaBars } from 'react-icons/fa';
import { IoIosSearch } from 'react-icons/io';
import { useWallet } from '@solana/wallet-adapter-react';
import WalletDataCard from './walletdatacard';

const Header = ({ toggleSidebar, isSidebarOpen }) => {
  const { connected } = useWallet();
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const popupRef = useRef(null);

  const togglePopup = () => {
    setIsPopupVisible(!isPopupVisible);
  };

  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      setIsPopupVisible(false);
    }
  };

  useEffect(() => {
    if (isPopupVisible) {
      document.addEventListener('click', handleClickOutside, true);
    } else {
      document.removeEventListener('click', handleClickOutside, true);
    }
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, [isPopupVisible]);

  return (
    <div className={`relative flex mb-2 m-4 rounded-xl border-2 border-[#222222] items-center justify-between p-4 bg-black text-white ${isSidebarOpen ? 'hidden md:flex' : 'flex'}`}>
      <button 
        className="md:hidden flex text-2xl focus:outline-none" 
        onClick={toggleSidebar}
      >
        <FaBars />
        <IoIosSearch />
      </button>
     
      
      <div className="text-xl font-bold">
        <img width={60} height={50} src="/pure.svg" alt="Logo" />
      </div>


     
      <div className='flex justify-center items-center'>
        <div className='hidden md:block'>
          {!connected && <Image width={20} height={20} src='/warning.svg' alt="Warning" />}
        </div>
        {connected &&  <button 
            className="md:hidden rounded-md flex justify-center items-center w-8 h-8 "
            onClick={togglePopup}
          >
            {isPopupVisible ? <HiChevronDown color={"#ffffff"} /> : <HiChevronRight color={"#ffffff"} />}
          </button> }
        &nbsp; &nbsp;
        <div className='bg-white rounded-md flex justify-center items-center w-24 h-8'>

       
          {isPopupVisible && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-10 flex justify-center items-center" style={{ backdropFilter: 'blur(25px)' }}>
              <div ref={popupRef} className="absolute top-10 right-0  shadow-lg rounded-lg z-20 p-4">
                <WalletDataCard />
              </div>
            </div>
          )}

          <WalletMultiButton className="">
            <IoWallet color='black' />
            {!connected && <span className='hidden text-xs text-black md:block'>&nbsp; Login</span>}
          </WalletMultiButton>
        </div>
      </div>
    </div>
  );
};

export default Header;
