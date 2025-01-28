"use client";
import React, { useEffect, useState } from "react";
import { useAccount } from "@particle-network/connect-react-ui"; // Use useAccount hook
import { Connection, PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { getAssociatedTokenAddress } from "@solana/spl-token"; // For fetching token balances (e.g., USDT)
import SolanaImage from "../../../../public/Solana.png";
import USDTimage from "../../../../public/USDT.png";
import Image from "next/image";

function SidebarHomePage() {
  const account = useAccount(); // Get connected wallet details
  const [solBalance, setSolBalance] = useState(0); // State for SOL balance
  const [usdtBalance, setUsdtBalance] = useState(0); // State for USDT balance

  const [walletAddress, setWalletAddress] = useState(""); // State for wallet address

  // Fetch wallet details when the wallet is connected
  useEffect(() => {
    if (account) {
      const fetchWalletDetails = async () => {
        try {
          // Set wallet address

          setWalletAddress(account);

          // Fetch SOL balance
          const solanaConnection = new Connection(
            "https://mainnet.helius-rpc.com/?api-key=a95e3765-35c7-459e-808a-9135a21acdf6",
            "confirmed"
          );
          const solBalance = await solanaConnection.getBalance(
            new PublicKey(account)
          );
          setSolBalance(solBalance / LAMPORTS_PER_SOL);

          // Fetch USDT balance on Solana
          const usdtMintAddress = new PublicKey(
            "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB" // USDT mint address on Solana
          );
          const associatedTokenAddress = await getAssociatedTokenAddress(
            usdtMintAddress,
            new PublicKey(account)
          );
          const usdtBalance = await solanaConnection.getTokenAccountBalance(
            associatedTokenAddress
          );
          setUsdtBalance(usdtBalance.value.uiAmount || 0);
        } catch (error) {
          console.error("Error fetching wallet details:", error);
        }
      };

      fetchWalletDetails();
    }
  }, [account]); // Re-run when the wallet connection changes

  return (
    <div
      className={`w-64 h-screen md:relative border-2 border-[#222222] bg-[#000000] rounded-lg md:mr-4 font-inter text-white flex flex-col md:translate-x-0 transform p-4 gap-4`}
    >
      <div className="flex flex-col justify-start align-middle items-start gap-2">
        <div className="name_of_user font-semibold ">Ankit Mishra</div>
        <div className="walletaddress bg-[#3FAEFF38] text-[#3FAEFF] rounded-[5px] py-1 px-2 text-sm">
          {walletAddress
            ? ` Wallet Adress: ${walletAddress.slice(
                0,
                6
              )}...${walletAddress.slice(-4)}`
            : "Not connected"}
        </div>
      </div>
      <div className="accountbalance">
        <span className="text-xs text-[#A0A0A0]">Account Balance</span>
        <div className="solbalance border border-[#7AFFFF3D] p-2 mt-2 rounded flex justify-start align-middle items-center gap-3">
          <Image
            src={SolanaImage}
            alt="Solana"
            width={500}
            height={500}
            className="size-6 object-cover"
          />
          {solBalance.toFixed(4)} SOL
        </div>
        <div className="usdtbalance border border-[#7AFFFF3D] p-2 mt-2 rounded flex  justify-start align-middle items-center gap-3">
          <Image
            src={USDTimage}
            alt="USDT"
            width={500}
            height={500}
            className="size-6 object-cover"
          />
          {usdtBalance.toFixed(2)} USDT
        </div>
        <div className="usdtbalance border border-[#7AFFFF3D] p-2 mt-2 rounded flex  justify-start align-middle items-center gap-3">
          10 USD{" "}
          <span className="text-xs text-[#A0A0A0]">Free Bet Balance</span>
        </div>
      </div>
    </div>
  );
}

export default SidebarHomePage;
