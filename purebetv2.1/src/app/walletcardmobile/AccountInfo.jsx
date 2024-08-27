"use client"
import React, { useEffect, useState } from 'react';
import BalanceItem from './BalanceItem';
import FreeBetBalance from './FreeBetBalance';
import ReferralButton from './ReferralButton';
import BetCard from './BetCard';
import {
  clusterApiUrl,
  Connection,
  PublicKey,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";
import { useParticleConnect, useConnectKit, useAccount } from '@particle-network/connect-react-ui';


function AccountInfo() {
  const { connect, disconnect } = useParticleConnect();
  const connectKit = useConnectKit();
  const account = useAccount();
  console.log(account)
  const isParticleActive = connectKit?.particle?.auth.isLogin();
  const getProvider = () => isParticleActive ? null : window.phantom?.solana;
  const [solBalance, setSolBalance] = useState(0);
  const [usdcBalance, setUsdcBalance] = useState(0);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(account?.publicAddress || '');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const fetchBalance = async () => {
    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
    const address = account || '';
    
    if (address) {
      const balance = await connection.getBalance(new PublicKey(address));
      setSolBalance(balance / LAMPORTS_PER_SOL);

      const usdcMintAddress = new PublicKey('EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v');
      const tokenAccounts = await connection.getTokenAccountsByOwner(new PublicKey(address), { mint: usdcMintAddress });

      if (tokenAccounts.value.length > 0) {
        setUsdcBalance(tokenAccounts.value[0].account.data.parsed.info.tokenAmount.uiAmount);
      } else {
        setUsdcBalance(0);
      }
    }
  };

  useEffect(() => {
    if (account) {
      fetchBalance();
    }
  }, [account]);

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
    <section className="flex min-w-[344px] ml-6 min-h-[55%] fixed bottom-0 flex-col pb-3.5 rounded-lg border border-solid bg-neutral-950 border-zinc-800">
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
              Wallet Address: {account}
            </div>
            <h3 className="mt-3.5 text-xs text-neutral-400">Account Balance</h3>
            {/* {balanceItems.map((item, index) => (
              <BalanceItem key={index} icon={item.icon} amount={item.amount} />
            ))} */}
             <div className="flex flex-col justify-center items-start px-3 py-2.5 mt-2 text-base font-medium text-white rounded-lg border border-solid border-neutral-800">
            <div className="flex gap-3.5">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/a75440bb5f48233e25cbe7d86ade6a6b57e3122ae958a6f82eff9ff6ea897371?apiKey=d1ee9f6275604677bd2583ecebeab853&"
                className="shrink-0 w-6 aspect-square"
                alt="SOL Icon"
              />
              <div className="my-auto">{solBalance.toFixed(4)} SOL</div>
            </div>
          </div>
          <div className="flex flex-col justify-center items-start px-3 py-2.5 mt-2 text-base font-medium text-white rounded-lg border border-solid border-neutral-800">
            <div className="flex gap-3.5">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/7d559fb4954a14bee17ff5930dc1d4e80028760a643fc17f84238a9a782fbe41?apiKey=d1ee9f6275604677bd2583ecebeab853&"
                className="shrink-0 w-6 aspect-square"
                alt="USDC Icon"
              />
              <div className="my-auto">{usdcBalance.toFixed(4)} USDC</div>
            </div>
          </div>
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
