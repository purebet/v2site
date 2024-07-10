'use client'
import React, { useEffect, useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { Connection, clusterApiUrl, PublicKey } from '@solana/web3.js';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import truncateAndMaskWalletAddress from '../utils/truncateAndMaskWalletAddress';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { IoWallet } from 'react-icons/io5';

import { faCopy, faCheck } from '@fortawesome/free-solid-svg-icons';
export default function WalletDataCard() {
  const { publicKey, connected } = useWallet();
  const [solBalance, setSolBalance] = useState(0);
  const [usdcBalance, setUsdcBalance] = useState(0);

  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(publicKey.toBase58());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset icon after 2 seconds
  };


  useEffect(() => {
    if (publicKey) {
      const connection = new Connection(clusterApiUrl('devnet'));

      // Fetch SOL balance
      connection.getBalance(publicKey).then(balance => {
        setSolBalance(balance / 1e9); // Convert from lamports to SOL
      });

      // Fetch USDC balance (assuming USDC mint address)
      const usdcMintAddress = new PublicKey('EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v');
      connection.getTokenAccountsByOwner(publicKey, { mint: usdcMintAddress }).then(accounts => {
        if (accounts.value.length > 0) {
          setUsdcBalance(accounts.value[0].account.data.parsed.info.tokenAmount.uiAmount);
        } else {
          setUsdcBalance(0);
        }
      });
    }
  }, [publicKey]);

  return (
    <div className="flex flex-col md:mr-4 px-3.5 pt-3.5 pb-20 rounded-lg border border-solid bg-neutral-950 border-neutral-800 max-w-[271px]">
      {connected ? (
        <>
          <div className="flex gap-2.5">
            <div className="w-32">
             <img src="https://d2zia2w5autnlg.cloudfront.net/118907/5ffbb6f05363c-large" />
            </div>
            <div className="flex flex-col self-start">
              <div className="text-base font-medium text-white">Ran Name</div>
              <div className="justify-center px-1.5 py-1 mt-2 text-xs rounded-md bg-white bg-opacity-10 text-zinc-400">
                Wallet Address: {truncateAndMaskWalletAddress(publicKey.toBase58())}   <button onClick={handleCopy} className="ml-2 focus:outline-none">
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
          {/* <div className="flex flex-col justify-center items-start px-2.5 py-3.5 mt-2 rounded-lg border border-solid border-neutral-800">
            <div className="flex gap-2.5">
              <div className="text-base font-medium text-white">10 USD</div>
              <div className="my-auto text-xs text-neutral-400">Free Bet Balance</div>
            </div>
          </div> */}
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
        
        
          <div className="justify-center items-center px-16 py-2.5 mt-5 text-xs font-medium rounded border border-solid border-neutral-700">
        
          <WalletMultiButton className="">
          <span className='hidden text-xs text-[#BFBFBF] hover:text-slate-950 md:block'>&nbsp; Connect Wallet </span>
        </WalletMultiButton>
        
          </div>
        </>
      )}
    </div>
  );
}
