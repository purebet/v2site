'use client';

import React, { useEffect, useState } from 'react';
import {
  clusterApiUrl,
  Connection,
  PublicKey,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";
// import { useParticleConnect, useConnectKit, useAccount } from '@particle-network/connect-react-ui';
import { TOKEN_PROGRAM_ID, AccountLayout } from '@solana/spl-token';
import bs58 from 'bs58';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faCheck } from '@fortawesome/free-solid-svg-icons';
import truncateAndMaskWalletAddress from '../utils/truncateAndMaskWalletAddress';
import FreeBetBalance from '../walletcardmobile/FreeBetBalance';
import ReferralButton from '../walletcardmobile/ReferralButton';
import {
  ConnectButton,
  ModalProvider,
  useAccount,
  useParticleConnect,
  useConnectKit
  } from '@particle-network/connect-react-ui';
import RandomName from '../utils/RandomName';
  // import './particlenetwork2.css'

  export default function WalletDataCard() {
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
    navigator.clipboard.writeText(account || '');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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

  return (
    <div className="flex flex-col md:mr-4 px-3.5 pt-3.5 pb-20 rounded-lg border border-solid bg-neutral-950 border-neutral-800 max-w-[271px]">
      {account ? (
        <>
          <div className="flex gap-2.5">
            {/* <div className="w-32">
              <img src="https://d2zia2w5autnlg.cloudfront.net/118907/5ffbb6f05363c-large" />
            </div> */}
            <div className="flex flex-col self-start">
              <div className="text-base font-medium text-white"><RandomName /></div>
              <div className="justify-center px-1.5 py-1 mt-2 text-xs rounded-md bg-[rgba(63,174,255,0.22)] bg-opacity-10 text-[#44AFFF]">
                Wallet Address: {truncateAndMaskWalletAddress(account || '')}   
                <button onClick={handleCopy} className="ml-2 focus:outline-none">
                  <FontAwesomeIcon icon={copied ? faCheck : faCopy} className="text-zinc-400" />
                </button>
              </div>
            </div>
          </div>
          <div className="mt-3.5 text-xs text-neutral-400">Account Balance</div>
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
        </>
      ) : (
        <>
          <div className="flex gap-1.5 self-center mt-14 text-base text-white">
            <div className="underline">
              Wallet not <span className="underline">connected</span>
            </div>
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/aef0ef34c40db4e84bb08617c0a1f19a648ffe36987ebae1bf3fe74c55d6f96f?apiKey=d1ee9f6275604677bd2583ecebeab853&"
              className="shrink-0 my-auto aspect-square w-[17px]"
              alt="Warning Icon"
            />
          </div>
          <div className="mt-1.5 text-xs font-light text-center text-neutral-400">
            Purebet relies on wallet connection to establish bets and ensure your bet is live on-chain.
          </div>
          {/* <div className='text-white  my-4 box-border border border-[#353535] rounded-[3px] flex justify-center text-center'>
            <div className='flex white'>
           
          <ConnectButton className="white" />
          </div>
          </div> */}
        </>
      )}
    </div>
  );
}
