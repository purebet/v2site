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
          const league = await getLeagueName(details.league);
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
    
            <div className="p-5 text-white">
                <div className='flex'>
                  {SportIcon ? (
                  <SportIcon style={{ width: '35px', height: '35px' }} className="mr-2" />
                ) : (
                  sport.src && <Image src={sport.src} alt={normalizedSportName} width={35} height={35} className="mr-2" />
                )}
              <div className="text-2xl font-bold mb-4">{eventDetails.eventName}</div>
              </div>
              {/* league name */}
              {leagueName && 
              <div>
                  {getFlagUrl(leagueName) &&
                  <div className='flex text-[15px]'>
                  <img src={getFlagUrl(leagueName)} alt={leagueName} className="w-6 h-6" />  
                 &nbsp; <div className='text-[#7D7D7D]'> {leagueName}  </div> 
                 &nbsp; <div className='text-[15px]'> {formatTime(eventDetails.startTime)} </div>
                  </div>
                  }
              </div>
              }
                  {/* Switch Buttons */}
                  <div className="flex w-[100%]  md:w-[40%] justify-around mt-5 p-4 gap-2 z-[100]">
  {['Full Time', 'Half Time', 'Team Totals', 'Player Props'].map((label) => (
    <button
      key={label}
      onClick={() => setSelectedButton(label)}
      className={`flex md:text-sm text-xs items-center justify-center md:px-3  px-2 py-1.5 md:gap-2  font-semibold rounded-full ${
        selectedButton === label
          ? 'bg-gradient-to-b from-[#0046CF] to-[#002469] text-white'
          : 'bg-[rgba(255,255,255,0.03)] text-gray-300'
      }`}
    >
      {label}
    </button>
  ))}
</div>

<div className="box-border gradient-stroke flex flex-col items-start p-[6px_0_0]  overflow-y-scroll bg-gradient-to-b from-[#121418] to-[#0C0D10] rounded-[6px]">


              <p>Home Team: {eventDetails.homeTeam}</p>
              <p>Away Team: {eventDetails.awayTeam}</p>
              <p>Sport: {Object.keys(sportName).find(key => sportName[key] === eventDetails.sport.toString())}</p>
              {/* Add more details as needed */}
               {/* Both Teams to Score */}
               <div className="market-card">
                  <h3 className="market-title">Both Teams to Score</h3>
                  <div className="market-options">
                    <div className="option">
                      Yes <span>{eventDetails.periods['1']['AH'][0].side0[0][0]}</span>
                    </div>
                    <div className="option">
                      No <span>{eventDetails.periods['1']['AH'][0].side1[0][0]}</span>
                    </div>
                  </div>
                </div>
                {/* Over/Under */}
                <div className="market-card">
                  <h3 className="market-title">Over/Under</h3>
                  <div className="market-options">
                    <div className="option">
                      Over {eventDetails.periods['1']['OU'][0].line} <span>{eventDetails.periods['1']['OU'][0].side0[0][0]}</span>
                    </div>
                    <div className="option">
                      Under {eventDetails.periods['1']['OU'][0].line} <span>{eventDetails.periods['1']['OU'][0].side1[0][0]}</span>
                    </div>
                  </div>
                </div>
                {/* More markets can be added similarly */}
                </div>
            </div>
          ) : (
            <p className="text-white">Loading event details...</p>
          )}
        </div>
        <div className={` hidden md:block lg:block`}>
          <WalletDataCard />
        </div>
      </div>
      <div className="md:hidden">   <Bottomnav /></div>  

    </div>
  );
}
