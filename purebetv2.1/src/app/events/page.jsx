'use client';
import React, { useState , useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

import Sidebar from "../components/sidebar";
import Header from "../components/header";
import { getEventDetail, getLeagueName } from '../utils/apicalls';
import WalletDataCard from "../components/walletdatacard";
import Bottomnav from '../components/Bottomnav';
import sportName from '../utils/sportsIdToSportsName';
import { formatDate , formatTime } from '../utils/formatDate';
import sportsIcons from '../utils/sportsIcons';
import getFlagUrl from '../utils/getFlagUrl';
import BettingMarketsComponent from './BettingMarketsComponent';
import BettingEvents from './BettingEvents';
import BettingSidebar from './BettingSidebar';
export default function Component() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [eventDetails, setEventDetails] = useState(null);
  const [leagueName, setLeagueName] = useState('');
  const [selectedButton, setSelectedButton] = useState('Full Time'); // Default selected button

  const searchParams = useSearchParams()
  const event = searchParams.get('event')
  console.log(event)
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    async function fetchEventDetails() {
      if (event) {
        const details = await getEventDetail(event);
        setEventDetails(details);
        
        if (details && details.league) {
          const league = await getLeagueName([details.league, details.country]);
          setLeagueName(league);
        }
      }
    }

    fetchEventDetails();
  }, [event]);

  const normalizedSportName = eventDetails
    ? Object.keys(sportName).find(key => sportName[key] === eventDetails.sport.toString()).toLowerCase().replace(/\s+/g, '') 
    : '';
  const sport = sportsIcons[normalizedSportName] || {};
  const SportIcon = sport.icon ? sport.icon : null;

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
         
  {/* Display event details */}
  {eventDetails ? (
    
            <div className="text-white">
               <div className="flex items-center  p-5 pb-0 mx-4 ">
      <div className="flex-shrink-0 w-[35px] h-[35px] mr-2"
       style={{
        background: 'linear-gradient(180deg, #FFFFFF 24.77%, #575757 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        textFillColor: 'transparent'
      }}
      >
        {SportIcon ? (
          <SportIcon className="w-full h-full" />
        ) : (
          sport.src && (
            <Image
              src={sport.src}
              alt={sport.name || ''}
              width={25}
              height={25}
              className="w-full h-full object-contain"
               style={{
          background: 'linear-gradient(180deg, #FFFFFF 24.77%, #575757 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          textFillColor: 'transparent'
        }}
            />
          )
        )}
      </div>
      <div 
        className="max-w-[500px] h-[29px] md:text-2xl text-xs font-semibold leading-[29px] font-inter"
        style={{
          background: 'linear-gradient(180deg, #FFFFFF 24.77%, #575757 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          textFillColor: 'transparent'
        }}
      >
        {eventDetails.eventName}
      </div>    </div>
              {console.log(leagueName)}
              {leagueName[0] && getFlagUrl(leagueName[1]) && (
        <div className='flex p-5 pt-0 pb-0 mx-4  items-center text-[9px] md:text-[15px] mt-4 md:mx-8'>
          <img src={getFlagUrl(leagueName[1])} alt={leagueName[1]} className="w-6 h-6 mr-2" />
          <div className='text-[#7D7D7D]'>{leagueName[0]}</div>
          <span className="text-[#7D7D7D] text-2xl mx-2">&bull;</span>
         
          <div> <span className=" text-neutral-400 mx-2">
            
            {formatDate(eventDetails.startTime)}</span>
          
          {formatTime(eventDetails.startTime)}</div>
        </div>
      )}
      <div className='ms:p-5 md:mx-4'>
<BettingMarketsComponent eventDetails={eventDetails} />
</div>
            </div>
          ) : (
            <p className="text-white">Loading event details...</p>
          )}
        </div>
        <div className={` hidden md:block lg:block`}>
          {/* <WalletDataCard /> */}
          {/* <div className='w-full'> */}
      <BettingSidebar/>
          {/* </div> */}
        </div>
      </div>
      <div className="md:hidden">   <Bottomnav /></div>  

    </div>
  );
}
