import React, { useState } from 'react';


const BettingSidebar = () => {
    const [activeType, setActiveType] = useState('single');
    const [activeTab, setActiveTab] = useState('bets');
  return (
    <div className="w-80 mr-4 bg-[#111316] rounded-xl border-[#222222] border text-white h-full flex flex-col">
      {/* Top section */}
      <div className="p-4 space-y-4">
<div className="flex">
      <button 
        onClick={() => setActiveType('single')}
        className={`relative pr-8 pl-12 py-3 rounded-lg flex items-center ${
          activeType === 'single' ? 'bg-[#071D2A] text-white' : 'bg-[#151515] text-gray-500'
        }`}
      >
        <div className="absolute left-4">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="opacity-80">
            <path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" strokeWidth="1.5"/>
          </svg>
        </div>
        <span className="text-xl font-light">Single</span>
      </button>
      <button 
        onClick={() => setActiveType('multi')}
        className={`relative -ml-3 pr-8 pl-12 py-3 rounded-lg flex items-center ${
          activeType === 'multi' ? 'bg-[#071D2A] text-white' : 'bg-[#151515] text-gray-500'
        }`}
      >
        <div className="absolute left-4">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="opacity-60">
            <path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" strokeWidth="1.5"/>
          </svg>
        </div>
        <span className="text-xl font-light">Multi</span>
      </button>
    </div>

        {/* Bet Input Card */}
        <div className="bg-[#16222b] rounded-lg p-3">
          <div className="flex flex-col justify-between text-sm mb-2">
            <div className='flex justify-between w-full '>
            <span>Scotland - Hungary</span>
            <span className='cursor-pointer '>x</span>
            </div>
           
            <span>Draw</span>
          </div>
          <div className="flex items-center">
            <div className="flex items-center bg-[#0a0a0a] border-[#111316] border-[1px] rounded px-2 py-1">
  <span className="text-blue-400 mr-1">◆</span>
  <input 
    type="number" 
    defaultValue="20.00" 
    className="w-16 bg-transparent text-white focus:outline-none"
  />
            </div>
            <span className="w-auto h-auto bg-black ml-auto px-2 rounded border-[#111316] border-[1px] ">2.0</span>
          </div>
        </div>

        <div className="flex items-center gap-1 pt-20 text-sm">
          <span>To Return</span>
          <span className='text-green-400'>40$</span>
        </div>

        <button className="w-full bg-gradient-to-r from-teal-500 to-blue-600 py-2 rounded-md font-medium">
          PLACE BET
        </button>
      </div>

      {/* Tabs */}
      {/* <div className="flex border-b border-gray-700 px-4">
        <button className="py-2 px-4 text-sm font-medium border-b-2 border-blue-500">
          Your Bets
        </button>
        <button className="py-2 px-4 text-sm font-medium text-gray-400">
          Account Info
        </button>
      </div> */}

      {/* Scrollable bets section */}
      {/* <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-3">
          <div className="flex justify-between text-sm text-gray-400 mb-2">
            <span>Pending Bets</span>
            <span>Settled Bets</span>
          </div>

        
          <div className="bg-gray-800 rounded-lg p-3">
            <div className="flex justify-between text-sm mb-2">
              <span>Scotland - Hungary</span>
              <span>Draw</span>
            </div>
            <div className="flex items-center">
              <div className="flex items-center">
                <span className="text-blue-400 mr-1">◆</span>
                <span>50.00</span>
              </div>
              <span className="mx-2">2.65</span>
              <div className="ml-auto">
                <div className="text-green-400 text-sm">Matched</div>
                <div className="text-green-400 text-sm">+132.5</div>
              </div>
            </div>
          </div>

          
          {[1, 2].map((index) => (
            <div key={index} className="bg-gray-800 rounded-lg p-3">
              <div className="flex justify-between text-sm mb-2">
                <span>Scotland - Hungary</span>
                <span>Win</span>
              </div>
              <div className="flex items-center">
                <div className="flex items-center">
                  <span className="text-blue-400 mr-1">◆</span>
                  <span>20.00</span>
                </div>
                <span className="mx-2">2.65</span>
                <div className="ml-auto">
                  <div className="text-gray-400 text-sm">Unmatched</div>
                  <div className="text-gray-400 text-sm">-20.00</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div> */}
      <div className="flex flex-col">
      {/* Tabs */}
    <div className="p-4">
        <div className="flex">
          <button 
            onClick={() => setActiveTab('bets')}
            className={`relative pr-8 pl-8 py-2.5 rounded-lg flex items-center ${
              activeTab === 'bets' ? 'bg-[#071D2A] text-white' : 'bg-[#151515] text-gray-500'
            }`}
          >
            <span className="text-base font-light">Your Bets</span>
          </button>
          <button 
            onClick={() => setActiveTab('account')}
            className={`relative -ml-3 pr-8 pl-8 py-2.5 rounded-lg flex items-center ${
              activeTab === 'account' ? 'bg-[#071D2A] text-white' : 'bg-[#151515] text-gray-500'
            }`}
          >
            <span className="text-base font-light">Account Info</span>
          </button>
        </div>
      </div>

      {/* Bets Section */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-4">
          {/* Section Headers */}
          <div className="flex justify-between text-[15px] text-gray-400">
            <span>Pending Bets</span>
            <span>Settled Bets</span>
          </div>

          {/* Matched Bet Card */}
          <div className="bg-[#0E1519] rounded-xl p-4">
            <div className="flex justify-between text-gray-400 mb-2">
              <span className="text-[15px]">Scotland - Hungary</span>
              <span className="text-white">Draw</span>
            </div>
            <div className="flex items-center">
              <div className="flex items-center bg-black/40 rounded px-2 py-1">
                <span className="text-[#1A8CFF] mr-1">◆</span>
                <span>50.00</span>
              </div>
              <div className="ml-3 bg-black/40 rounded px-2 py-1">
                2.65
              </div>
              <div className="ml-auto text-right">
                <div className="text-[#00FF00] text-[15px]">Matched</div>
                <div className="flex flex-col">
                  <span className="text-[#00FF00] text-[15px]">+132.5</span>
                  <span className="text-gray-500 text-xs">Payout</span>
                </div>
              </div>
            </div>
          </div>

          {/* Unmatched Bet Cards */}
          {[1, 2].map((index) => (
            <div key={index} className="bg-[#0E1519] rounded-xl p-4">
              <div className="flex justify-between text-gray-400 mb-2">
                <span className="text-[15px]">Scotland - Hungary</span>
                <span className="text-white">Win</span>
              </div>
              <div className="flex items-center">
                <div className="flex items-center bg-black/40 rounded px-2 py-1">
                  <span className="text-[#1A8CFF] mr-1">◆</span>
                  <span>20.00</span>
                </div>
                <div className="ml-3 bg-black/40 rounded px-2 py-1">
                  2.65
                </div>
                <div className="ml-auto text-right">
                  <div className="text-gray-500 text-[15px]">Unmatched</div>
                  <div className="text-gray-500 text-[15px]">-20.00</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </div>
  );
};

export default BettingSidebar;