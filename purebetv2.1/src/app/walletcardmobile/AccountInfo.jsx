
"use client"
import React, { useEffect, useState } from 'react';
import BalanceItem from './BalanceItem';
import FreeBetBalance from './FreeBetBalance';
import ReferralButton from './ReferralButton';
import BetCard from './BetCard';
import { TOKEN_PROGRAM_ID, AccountLayout } from '@solana/spl-token';
import {
  clusterApiUrl,
  Connection,
  PublicKey,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";
import truncateAndMaskWalletAddress from '../utils/truncateAndMaskWalletAddress';
import { useParticleConnect, useConnectKit, useAccount } from '@particle-network/connect-react-ui';
import { faCopy, faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import RandomName from '../utils/RandomName';

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
  const [copied2, setCopied2] = useState(false);
  const [affiliateCode, setAffiliateCode] = useState('');
  const [customCode, setCustomCode] = useState('');
  const [existingCodes, setExistingCodes] = useState([]);
  const refText = React.useRef();

  const handleCopy = () => {
    navigator.clipboard.writeText(account || '');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopy2 = () => {
    navigator.clipboard.writeText(refText.current.innerText || '');
    setCopied2(true);
    setTimeout(() => setCopied2(false), 2000);
  };

  const fetchBalance = async () => {
    const connection = new Connection('https://mainnet.helius-rpc.com/?api-key=a95e3765-35c7-459e-808a-9135a21acdf6', 'confirmed');
    const address = account || '';
  
    if (address) {
      const balance = await connection.getBalance(new PublicKey(address));
      setSolBalance(balance / LAMPORTS_PER_SOL);
  
      const usdcMintAddress = new PublicKey('EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v');
      const tokenAccounts = await connection.getTokenAccountsByOwner(new PublicKey(address), { mint: usdcMintAddress });
  
      if (tokenAccounts.value.length > 0) {
        // Decode the account data using the AccountLayout from @solana/spl-token
        const accountInfo = tokenAccounts.value[0].account.data;
        const data = AccountLayout.decode(accountInfo);
  
        // Get the amount of tokens (USDC)
        const usdcBalanceRaw = data.amount; // This is a raw BigInt
        const usdcBalance = Number(usdcBalanceRaw) / Math.pow(10, 6); // Convert BigInt to Number and divide
        setUsdcBalance(usdcBalance);
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

  const generateRandomCode = () => {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  };

  const fetchExistingCodes = async () => {
    try {
      const response = await fetch(`/api/affiliate/getCode?address=${account}`);
      console.log('Fetch existing codes response:', response);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log('Existing codes data:', data);
      setExistingCodes(data || []);
    } catch (error) {
      console.error('Failed to fetch existing codes:', error);
    }
  };

  useEffect(() => {
    if (account && activeTab === 'affiliate') {
      fetchExistingCodes();
    }
  }, [account, activeTab]);

  const generateNewCode = () => {
    setAffiliateCode(generateRandomCode());
  };

  const linkCode = async (code) => {
    try {
      const response = await fetch(`/api/affiliate/new?address=${account}&code=${code}`);
      console.log('Link code response:', response);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Link code data:', data);
  
      // Check if the response indicates success
      if (response.ok && !data.error) {
        alert('Code linked successfully!');
        fetchExistingCodes();
        setAffiliateCode('');
        setCustomCode('');
      } else {
        // If there's an error message in the response, use it
        const errorMessage = data.error || 'Failed to link code. It may already be taken.';
        alert(errorMessage);
      }
    } catch (error) {
      console.error('Failed to link code:', error);
      alert(`An error occurred while linking the code: ${error.message}`);
    }
  };

  const generateReferralLink = (code) => {
    return `https://exchange.purebet.io/ref?code=${code}`;
  };

  return (
    <section className="flex min-w-[344px] min-h-[55%] fixed bottom-0 flex-col pb-3.5 rounded-lg border border-solid bg-neutral-950 border-zinc-800">
      <div className="shrink-0 self-center mt-1.5 h-0.5 rounded bg-neutral-500 w-[21px]" />
      <div className="flex flex-col px-4 mt-3 w-full">
        <nav className="flex gap-3.5 justify-center items-center text-xs text-white">
          <button
            onClick={() => handleTabChange('accountInfo')}
            className={`justify-center px-6 py-2.5 rounded-3xl ${activeTab === 'accountInfo' ? 'bg-[#3D3D3D]' : ''}`}
          >
            Account Info
          </button>
          <button
            onClick={() => handleTabChange('yourBets')}
            className={`justify-center px-6 py-2.5 rounded-3xl ${activeTab === 'yourBets' ? 'bg-[#3D3D3D]' : ''}`}
          >
            Your Bets
          </button>
          <button
            onClick={() => handleTabChange('affiliate')}
            className={`justify-center px-6 py-2.5 rounded-3xl ${activeTab === 'affiliate' ? 'bg-[#3D3D3D]' : ''}`}
          >
            Affiliate
          </button>
        </nav>
        {activeTab === 'accountInfo' && (
          <>
            <h2 className="mt-7 text-base font-medium text-white">
              <RandomName />
            </h2>
            <div className="justify-center px-1.5 py-1 mt-2 text-xs bg-[rgba(63,174,255,0.22)] rounded-md text-[#44AFFF]">
              Wallet Address: {truncateAndMaskWalletAddress(account) || " "} 
               <button onClick={handleCopy} className="ml-2 focus:outline-none">
                  <FontAwesomeIcon icon={copied ? faCheck : faCopy} className="text-zinc-400" />
                </button>
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
            <div className='w-full py-2 border-2 px-2 border-[#60A4F9] rounded-lg mt-4 flex justify-between'>
              <div ref={refText}>text</div>
              <button onClick={handleCopy2} className="text-blue-400 bg-[#263C55] px-1 rounded-md text-sm">
                {copied2 ? (
                  <FontAwesomeIcon icon={faCheck} className="text-zinc-400" />
                ) : (
                  "Copy"
                )}
              </button>
            </div>
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
        {activeTab === 'affiliate' && (
          <div className="mt-4">
            <h2 className="text-base font-medium text-white mb-4">Affiliate Management</h2>
            <div className="mb-4">
              <h3 className="text-sm py-2 rounded-md px-1 text-neutral-400 mb-2">Your Existing Codes</h3>
              <div className="max-h-[70px] overflow-y-auto pr-2 mb-2">
        {existingCodes.length > 0 ? (
          existingCodes.map((code, index) => (
            <div key={index} className="bg-[#3D3D3D] text-white p-2 rounded mb-2">
              <div>{code}</div>
              <div className="text-sm text-gray-400">
      Referral Link: {generateReferralLink(code)}
        </div>
            </div>
            
          ))
        ) : (
          <div className="text-white">No existing codes found.</div>
        )}
      </div>

            </div>
            <div className="mb-4">
              <h3 className="text-sm text-neutral-400 mb-2">Generate New Code</h3>
              <div className="flex gap-2 mb-2">
                <input 
                  type="text" 
                  value={affiliateCode}
                  onChange={(e) => setAffiliateCode(e.target.value)}
                  placeholder="Your affiliate code"
                  className="flex-grow bg-[#0A0A0A] border-zinc-800 border text-white p-2 rounded-lg"
                />
                <button onClick={generateNewCode} className="border-[#263C55] border-2 text-blue-400 px-4 py-2 rounded-lg">Generate</button>
              </div>
              <button onClick={() => linkCode(affiliateCode)} className="w-full border-[#263C55] border-2 text-blue-400 py-2 rounded-lg">Link Code</button>
            </div>
            <div>
              <h3 className="text-sm text-neutral-400 mb-2">Custom Code</h3>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={customCode}
                  onChange={(e) => setCustomCode(e.target.value)}
                  placeholder="Enter custom code"
                  className="flex-grow bg-[#0A0A0A] border-zinc-800 border text-white p-2 rounded-lg"
                />
                <button onClick={() => linkCode(customCode)} className="border-[#263C55] border-2 text-blue-400 px-4 py-2 rounded-lg">Link</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default AccountInfo;