"use client"
import React, { useState } from 'react';
import BalanceItem from './BalanceItem';
import FreeBetBalance from './FreeBetBalance';
import ReferralButton from './ReferralButton';
import BetCard from './BetCard';
function AccountInfo() {
  const bets = [
    {
      match: 'Scotland - Hungary',
      betType: 'Draw',
      amount: '50.00',
      odds: '2.65',
      status: 'Matched',
      profit: '+132.5'
    },
    {
      match: 'Scotland - Hungary',
      betType: 'Win',
      amount: '20.00',
      odds: '2.65',
      status: 'Unmatched',
      profit: '-20.00'
    }
  ];

  const balanceItems = [
    { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/d1ceb8faa652d41bbadc7fdc03369a84951849200291caf66ec1097cd1152c2e?apiKey=d1ee9f6275604677bd2583ecebeab853&", amount: "0.02 SOL" },
    { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/fab3f391bb0340078567e8bc4d302f9bfc83699d48397e9edffbe2bc85d3b12e?apiKey=d1ee9f6275604677bd2583ecebeab853&", amount: "200 USDC" }
  ];

  const [activeTab, setActiveTab] = useState('accountInfo');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <section className="flex w-full max-h-[55%] fixed bottom-0 flex-col pb-3.5 rounded-lg border border-solid bg-neutral-950 border-zinc-800">
      <div className="shrink-0 self-center mt-1.5 h-0.5 rounded bg-neutral-500 w-[21px]" />
      <div className="flex flex-col px-4 mt-3 w-full">
        <nav className="flex gap-3.5 justify-center items-center text-xs text-white">
          <button
            onClick={() => handleTabChange('accountInfo')}
            className={`justify-center px-10 py-2.5 rounded-3xl ${activeTab === 'accountInfo' ? 'bg-[#3D3D3D]' : ''}`}
          >
            Account Info
          </button>
          <button
            onClick={() => handleTabChange('yourBets')}
            className={`justify-center px-12 py-2.5 rounded-3xl ${activeTab === 'yourBets' ? 'bg-[#3D3D3D]' : ''}`}
          >
            Your Bets
          </button>
        </nav>
        {activeTab === 'accountInfo' && (
          <>
            <h2 className="mt-7 text-base font-medium text-white">
              Hairy French
            </h2>
            <div className="justify-center px-1.5 py-1 mt-2 text-xs bg-gray-900 rounded-md text-zinc-400">
              Wallet Address: ggaergejhvvdweHFV
            </div>
            <h3 className="mt-3.5 text-xs text-neutral-400">Account Balance</h3>
            {balanceItems.map((item, index) => (
              <BalanceItem key={index} icon={item.icon} amount={item.amount} />
            ))}
            <FreeBetBalance amount="10 USD" />
            <ReferralButton />
          </>
        )}
        {activeTab === 'yourBets' && (
          <>
                <div className="flex flex-col px-4 mt-6 w-full">

           <nav className="flex gap-3.5 justify-center mb-4 border-t border-[#373737] border-solid pt-4 items-center text-xs text-zinc-300">
        <button className="justify-center px-6 py-2 rounded">Pending Bets</button>
        <button className="justify-center px-7 py-2.5 rounded bg-[#111111]">Settled Bets</button>
      </nav>
            {bets.map((bet, index) => (
              <BetCard key={index} {...bet} />
            ))}
               </div>
          </>
        )}
      </div>
   
    </section>
  );
}

export default AccountInfo;
