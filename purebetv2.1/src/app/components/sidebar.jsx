'use client'
import React, { useState , useEffect, useRef } from 'react';
import { IoIosSearch } from "react-icons/io";
import { RiSidebarFoldLine } from "react-icons/ri";
import { FaRegHeart } from "react-icons/fa";
import { FaBaseball  } from "react-icons/fa6";
import { HiChevronDown , HiChevronRight } from "react-icons/hi2";
import { FaArrowTrendUp  } from "react-icons/fa6";
import { SiNba , SiPremierleague} from "react-icons/si";
import { IoAmericanFootball } from "react-icons/io5";
import { PiBasketballLight , PiHockey } from "react-icons/pi";
import { MdOutlineSportsScore , MdOutlineSportsSoccer ,MdSportsEsports , MdOutlineSportsRugby , MdOutlineSportsTennis , MdSportsCricket} from "react-icons/md";
import Image from 'next/image';
import { IoMdClose } from 'react-icons/io';

const Sidebar = ({ isOpen, toggleSidebar }) => {



    const sidebarRef = useRef(null);

  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target) && isOpen) {
      toggleSidebar();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);


    const [selectedItem, setSelectedItem] = useState(null);

    const handleItemClick = (item) => {
      setSelectedItem(selectedItem === item ? null : item);
      toggleSidebar(); // Close the sidebar when a list item is clicked

    };
  


  return (
    // <div className={`fixed inset-0 bg-black bg-opacity-75 `}>

    <div        ref={sidebarRef}  className={`w-64  h-screen md:relative border-2 border-[#222222] md:ml-4  bg-[#000000] rounded-lg font-inter text-white flex flex-col md:translate-x-0  z-50 transform ${isOpen ? 'translate-x-0' : '-translate-x-full hidden md:flex'} transition-transform duration-300 ease-in-out`}>
     <div className="p-4 flex items-center relative">
  <input 
    type="text" 
    placeholder="Search" 
    className="w-full p-2 pl-8 bg-[#171717] text-white rounded-lg "
  />
  <IoIosSearch className="absolute right-16 text-gray-500" style={{ top: '50%', transform: 'translateY(-50%)' }} />
  <RiSidebarFoldLine  onClick={toggleSidebar} className='text-[#818181] ml-2  ' size={30} />

</div>

      <div className="flex-1 overflow-y-scroll no-scrollbar">
        <div className="p-4">
          <h2 className="text-sm flex text-[#989898]    font-normal	 items-center  mb-4"><FaRegHeart size={12} />&nbsp;  Favourites</h2>
          <ul>
            <li 
              className={`flex items-center p-2 rounded-md cursor-pointer ${selectedItem === 'PremierLeague' ? 'bg-white/15' : ''}`} 
              onClick={() => handleItemClick('PremierLeague')}
            >
              <SiPremierleague /> &nbsp; Premier League
             
            </li>
            <li 
              className={`flex items-center  p-2 rounded-md cursor-pointer ${selectedItem === 'LaLiga' ? 'bg-white/15' : ''}`} 
              onClick={() => handleItemClick('LaLiga')}
            >
              <Image width={20} height={20} src="/la-liga-logo.svg" /> &nbsp; La Liga
            
            </li>
            </ul>
        </div>
        <div className="p-4">
          <h2 className="text-sm flex text-[#989898] font-normal items-center mb-4"><FaArrowTrendUp size={12} />&nbsp; Top Leagues</h2>
          <ul>
            <li 
              className={`flex items-center  p-2 rounded-md cursor-pointer ${selectedItem === 'TopPremierLeague' ? 'bg-white/15' : ''}`} 
              onClick={() => handleItemClick('TopPremierLeague')}
            >
              <SiPremierleague /> &nbsp; Premier League
              
            </li>
            <li 
              className={`flex items-center  p-2 rounded-md cursor-pointer ${selectedItem === 'TopLaLiga' ? 'bg-white/15' : ''}`} 
              onClick={() => handleItemClick('TopLaLiga')}
            >
              <Image width={20} height={20} src="/la-liga-logo.svg" /> &nbsp; La Liga
             
            </li>
            <li 
              className={`flex items-center  p-2 rounded-md cursor-pointer ${selectedItem === 'NBA' ? 'bg-white/15' : ''}`} 
              onClick={() => handleItemClick('NBA')}
            >
              <SiNba size={24} /> &nbsp; NBA
              
            </li>
          </ul>
        </div>
        <div className="p-4">
        <h2 className="text-sm flex text-[#989898]    font-normal	 items-center  mb-4"><MdOutlineSportsScore size={12} />&nbsp;  All Sports</h2>
        <ul>
            <li 
              className={`flex items-center mb-2 p-2 rounded-md cursor-pointer ${selectedItem === 'Soccer' ? 'bg-white/15' : ''}`} 
              onClick={() => handleItemClick('Soccer')}
            >
              <MdOutlineSportsSoccer />&nbsp; Soccer
              <div className="ml-auto">
                {selectedItem === 'Soccer' && <HiChevronDown color={"#AAAAAA"} />}
                {selectedItem !== 'Soccer' && <HiChevronRight color={"#AAAAAA"} />}
              </div>
            </li>
            <li 
              className={`flex items-center mb-2 p-2 rounded-md cursor-pointer ${selectedItem === 'AmericanFootball' ? 'bg-white/15' : ''}`} 
              onClick={() => handleItemClick('AmericanFootball')}
            >
              <IoAmericanFootball /> &nbsp; American Football
              <div className="ml-auto">
                {selectedItem === 'AmericanFootball' && <HiChevronDown color={"#AAAAAA"} />}
                {selectedItem !== 'AmericanFootball' && <HiChevronRight color={"#AAAAAA"} />}
              </div>
            </li>
            <li 
              className={`flex items-center mb-2 p-2 rounded-md cursor-pointer ${selectedItem === 'Baseball' ? 'bg-white/15' : ''}`} 
              onClick={() => handleItemClick('Baseball')}
            >
              <FaBaseball /> &nbsp; Baseball
              <div className="ml-auto">
                {selectedItem === 'Baseball' && <HiChevronDown color={"#AAAAAA"} />}
                {selectedItem !== 'Baseball' && <HiChevronRight color={"#AAAAAA"} />}
              </div>
            </li>
            <li 
              className={`flex items-center mb-2 p-2 rounded-md cursor-pointer ${selectedItem === 'Basketball' ? 'bg-white/15' : ''}`} 
              onClick={() => handleItemClick('Basketball')}
            >
              <PiBasketballLight /> &nbsp; Basketball
              <div className="ml-auto">
                {selectedItem === 'Basketball' && <HiChevronDown color={"#AAAAAA"} />}
                {selectedItem !== 'Basketball' && <HiChevronRight color={"#AAAAAA"} />}
              </div>
            </li>
            <li 
              className={`flex items-center mb-2 p-2 rounded-md cursor-pointer ${selectedItem === 'IceHockey' ? 'bg-white/15' : ''}`} 
              onClick={() => handleItemClick('IceHockey')}
            >
              <PiHockey /> &nbsp; Ice Hockey
              <div className="ml-auto">
                {selectedItem === 'IceHockey' && <HiChevronDown color={"#AAAAAA"} />}
                {selectedItem !== 'IceHockey' && <HiChevronRight color={"#AAAAAA"} />}
              </div>
            </li>
            <li 
              className={`flex items-center mb-2 p-2 rounded-md cursor-pointer ${selectedItem === 'Rugby' ? 'bg-white/15' : ''}`} 
              onClick={() => handleItemClick('Rugby')}
            >
              <MdOutlineSportsRugby /> &nbsp; Rugby
              <div className="ml-auto">
                {selectedItem === 'Rugby' && <HiChevronDown color={"#AAAAAA"} />}
                {selectedItem !== 'Rugby' && <HiChevronRight color={"#AAAAAA"} />}
              </div>
            </li>
            <li 
              className={`flex items-center mb-2 p-2 rounded-md cursor-pointer ${selectedItem === 'Tennis' ? 'bg-white/15' : ''}`} 
              onClick={() => handleItemClick('Tennis')}
            >
              <MdOutlineSportsTennis /> &nbsp; Tennis
              <div className="ml-auto">
                {selectedItem === 'Tennis' && <HiChevronDown color={"#AAAAAA"} />}
                {selectedItem !== 'Tennis' && <HiChevronRight color={"#AAAAAA"} />}
              </div>
            </li>
            <li 
              className={`flex items-center mb-2 p-2 rounded-md cursor-pointer ${selectedItem === 'Cricket' ? 'bg-white/15' : ''}`} 
              onClick={() => handleItemClick('Cricket')}
            >
              <MdSportsCricket /> &nbsp; Cricket
              <div className="ml-auto">
                {selectedItem === 'Cricket' && <HiChevronDown color={"#AAAAAA"} />}
                {selectedItem !== 'Cricket' && <HiChevronRight color={"#AAAAAA"} />}
              </div>
            </li>
            <li 
              className={`flex items-center mb-2 p-2 rounded-md cursor-pointer ${selectedItem === 'Esports' ? 'bg-white/15' : ''}`} 
              onClick={() => handleItemClick('Esports')}
            >
              <MdSportsEsports /> &nbsp; Esports
              <div className="ml-auto">
                {selectedItem === 'Esports' && <HiChevronDown color={"#AAAAAA"} />}
                {selectedItem !== 'Esports' && <HiChevronRight color={"#AAAAAA"} />}
              </div>
            </li>
            <li 
              className={`flex items-center mb-2 p-2 rounded-md cursor-pointer ${selectedItem === 'CombatSports' ? 'bg-white/15' : ''}`} 
              onClick={() => handleItemClick('CombatSports')}
            >
              <Image width={20} height={20} src="/wrestling.svg" /> &nbsp; Combat Sports
              <div className="ml-auto">
                {selectedItem === 'CombatSports' && <HiChevronDown color={"#AAAAAA"} />}
                {selectedItem !== 'CombatSports' && <HiChevronRight color={"#AAAAAA"} />}
              </div>
            </li>
            <li 
              className={`flex items-center mb-2 p-2 rounded-md cursor-pointer ${selectedItem === 'Cryptocurrency' ? 'bg-white/15' : ''}`} 
              onClick={() => handleItemClick('Cryptocurrency')}
            >
              <Image width={15} height={15} src="/logos_ethereum.svg" /> &nbsp; Cryptocurrency
              <div className="ml-auto">
                {selectedItem === 'Cryptocurrency' && <HiChevronDown color={"#AAAAAA"} />}
                {selectedItem !== 'Cryptocurrency' && <HiChevronRight color={"#AAAAAA"} />}
              </div>
            </li>
            <li 
              className={`flex items-center mb-2 p-2 rounded-md cursor-pointer ${selectedItem === 'Politics' ? 'bg-white/15' : ''}`} 
              onClick={() => handleItemClick('Politics')}
            >
              <Image width={15} height={15} src="/politics.svg" /> &nbsp; Politics
              <div className="ml-auto">
                {selectedItem === 'Politics' && <HiChevronDown color={"#AAAAAA"} />}
                {selectedItem !== 'Politics' && <HiChevronRight color={"#AAAAAA"} />}
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;