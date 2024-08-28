'use client'
import React, { useState, useEffect, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { IoIosSearch } from "react-icons/io";
import { RiSidebarFoldLine } from "react-icons/ri";
import { FaRegHeart, FaArrowTrendUp } from "react-icons/fa6";
import { HiChevronDown, HiChevronRight } from "react-icons/hi2";
import Image from 'next/image';
import { IoMdClose } from 'react-icons/io';
import sportsIcons from '../utils/sportsIcons';
import { MdOutlineSportsScore } from "react-icons/md";
import useSearch from '../hooks/useSearch';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const router = useRouter();
  const path = usePathname();
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
  useEffect(() => {
    if (path.includes('/sports/')) {
      const selected = path.split('/sports/')[1].toLowerCase();
      setSelectedItem(selected);
    } else {
      setSelectedItem(null);
    }
  }, [path]);

  const handleItemClick = (item) => {
    setSelectedItem(selectedItem === item ? null : item);
    toggleSidebar();
    router.push(`/sports/${item}`);
  };

  const renderIcon = (IconComponent, src) => {
    return src ? <Image  width={20} height={20} src={src} /> : <IconComponent />;
  };

  const formatSportName = (sport) => {
    return sport.charAt(0).toUpperCase() + sport.slice(1).replace(/([A-Z])/g, ' $1').trim();
  };


  // search bar
  // State for the search query and integrating the useSearch hook
    const [query, setQuery] = useState('');
    const { results, loading, error } = useSearch(query);
  
    const handleSearchChange = (e) => {
      setQuery(e.target.value);
    };

  return (
    <div ref={sidebarRef} className={`w-64 h-screen md:relative border-2 border-[#222222] md:ml-4 bg-[#000000] rounded-lg font-inter text-white flex flex-col md:translate-x-0 z-50 transform ${isOpen ? 'translate-x-0' : '-translate-x-full hidden md:flex'} transition-transform duration-300 ease-in-out`}>
      <div className={`p-4 ${(results.leagues.length > 0 || results.events.length > 0 )? "pb-0": ""} flex items-center relative`}>
        <input 
        value={query}
        onChange={handleSearchChange}
        type="text" placeholder="Search" className={`w-full p-2 pl-8 bg-[#171717] text-white ${(results.leagues.length > 0 || results.events.length > 0 )? "rounded-t-lg": "rounded-lg"}`} />
       {!((results.leagues.length > 0) || (results.events.length > 0) ) &&   <IoIosSearch className="absolute right-16 -top-20 text-gray-500" style={{ top: '50%', transform: 'translateY(-50%)' }} />}
        {!((results.leagues.length > 0) || (results.events.length > 0) ) && <RiSidebarFoldLine onClick={toggleSidebar} className='text-[#818181] ml-2' size={30} /> }
      
      </div>
      {(results.leagues.length > 0 || results.events.length > 0 ) &&
      <div className='p-[0.9rem] pt-0 '>
          {loading && <p className="text-sm p-6 flex text-[#989898] font-normal items-center mb-4">Loading...</p>}
     <div className='bg-white  flex items-center p-4 pt-3 rounded-b-md cursor-pointer'>
         {/* Add logic to display search results here */}
       
      {error && <p>Error: {error}</p>}
      {results.leagues.length > 0 && (
        <div>
          <div className="text-sm flex text-[#000] font-normal items-center "><FaArrowTrendUp size={12} />&nbsp; Top Leagues</div>
          <ul>
            {results.leagues.map((league) => (
              <li key={league.leagueId} className={`flex text-black items-center p-2 rounded-md cursor-pointer`}>
                 {league.name}
                 </li>
            ))}
          </ul>
        </div>
      )}
      {results.events.length > 0 && (
        <div>
          <div className="text-sm flex text-[#000] font-normal items-center "><MdOutlineSportsScore size={12} />&nbsp;Top Event</div>
          <ul>
            {results.events.map((event) => (
              <li
              key={event.event}
              className={`flex ${
                results.events.length <= 2 ? 'text-sm' : 'text-xs'
              } items-center p-2 text-black rounded-md cursor-pointer`}
            >
              {event.eventName}
            </li>
            ))}
          </ul>
        </div>
      )}
     </div>
     </div>
}
      <div className="flex-1 overflow-y-scroll no-scrollbar">
        <div className="p-4">
          <h2 className="text-sm flex text-[#989898] font-normal items-center mb-4"><FaRegHeart size={12} />&nbsp; Favourites</h2>
          <ul>
            {['premier league', 'la liga'].map(item => (
              <li key={item} className={`flex items-center p-2 rounded-md cursor-pointer ${selectedItem === item ? 'bg-custom-blue text-[#3FAEFF]' : ''}`} onClick={() => handleItemClick(formatSportName(item))}>
                {renderIcon(sportsIcons[item]?.icon, sportsIcons[item]?.src)} &nbsp; {formatSportName(item)}
              </li>
            ))}
          </ul>
        </div>
        <div className="p-4">
          <h2 className="text-sm flex text-[#989898] font-normal items-center mb-4"><FaArrowTrendUp size={12} />&nbsp; Top Leagues</h2>
          <ul>
            {['premier league', 'la liga', 'nba'].map(item => (
              <li key={item} className={`flex items-center p-2 rounded-md cursor-pointer ${selectedItem === item ? 'bg-custom-blue text-[#3FAEFF]' : ''}`} onClick={() => handleItemClick(formatSportName(item))}>
                {renderIcon(sportsIcons[item]?.icon, sportsIcons[item]?.src)} &nbsp; {formatSportName(item)}
              </li>
            ))}
          </ul>
        </div>
        <div className="p-4">
          <h2 className="text-sm flex text-[#989898] font-normal items-center mb-4"><MdOutlineSportsScore size={12} />&nbsp; All Sports</h2>
          <ul>
            {Object.keys(sportsIcons).map(item => (
              <li key={item} className={`flex items-center  mb-2 p-2 rounded-md cursor-pointer ${selectedItem === item ? 'bg-custom-blue text-[#3FAEFF]' : ''}`} onClick={() => handleItemClick(formatSportName(item))}>
                {renderIcon(sportsIcons[item]?.icon, sportsIcons[item]?.src)} &nbsp; {formatSportName(item)}
                <div className="ml-auto">
                  {selectedItem === item ? <HiChevronDown color={"#AAAAAA"} /> : <HiChevronRight color={"#AAAAAA"} />}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
