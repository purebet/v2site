"use client";
import { IoWallet } from "react-icons/io5";
import { useState, useEffect, useRef } from "react";
import { HiChevronDown, HiChevronRight } from "react-icons/hi2";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import Image from "next/image";
import { FaBars } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import { useWallet } from "@solana/wallet-adapter-react";
import WalletDataCard from "./walletdatacard";
import {
  ConnectButton,
  ModalProvider,
  useAccount,
  useParticleConnect,
  useConnectKit,
} from "@particle-network/connect-react-ui";

import { Solana, SolanaDevnet } from "@particle-network/chains";
import { solanaWallets } from "@particle-network/connect";
import {
  clusterApiUrl,
  Connection,
  PublicKey,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";
import bs58 from "bs58";
import "./particlenetwork.css";

const Header = ({ toggleSidebar, isSidebarOpen }) => {
  const { connect, disconnect } = useParticleConnect();
  const connectKit = useConnectKit();
  const account = useAccount();
  const isParticleActive = connectKit?.particle?.auth.isLogin();

  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const popupRef = useRef(null);

  const togglePopup = () => {
    setIsPopupVisible(!isPopupVisible);
  };

  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      setIsPopupVisible(false);
    }
  };

  useEffect(() => {
    if (isPopupVisible) {
      document.addEventListener("click", handleClickOutside, true);
    } else {
      document.removeEventListener("click", handleClickOutside, true);
    }
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [isPopupVisible]);

  // Get balance using Particle Network or Phantom
  const getBalance = async () => {
    const connection = new Connection(
      "https://mainnet.helius-rpc.com/?api-key=a95e3765-35c7-459e-808a-9135a21acdf6",
      "confirmed"
    );

    const address = await connectKit.particle.solana.getAddress();
    console.log(address);
    const balance = await connection.getBalance(new PublicKey(address));
    console.log(`${balance / LAMPORTS_PER_SOL} SOL`);
  };

  // Personal sign using Particle Network or Phantom
  const personalSign = async () => {
    const message = "GMGM Particle Network!";
    const encodedMessage = new TextEncoder().encode(message);
    const signedMessage = await connectKit.particle.solana.signMessage(
      bs58.encode(encodedMessage)
    );
    console.log("Signed message:", signedMessage);
  };

  // Disconnect wallet
  const onDisconnect = () => disconnect({ hideLoading: true });

  return (
    <div
      className={`box-border bg-[#121418] border-[#294B4E] backdrop-blur-[5.7px] relative z-50 flex mb-2 m-4 rounded-xl border items-center justify-between p-4 text-white ${
        isSidebarOpen ? "hidden md:flex" : "flex"
      }`}
    >
      <div className="md:hidden">
        <button
          className="md:hidden flex text-2xl focus:outline-none"
          onClick={toggleSidebar}
        >
          <FaBars />
          <IoIosSearch />
        </button>
      </div>

      <div className="text-xl font-bold">
        <img width={60} height={50} src="/pure.svg" alt="Logo" />
      </div>

      <div className="flex justify-center items-center">
        <div className="hidden md:block">
          {!account && (
            <Image
              className="pointer-events-none"
              width={20}
              height={20}
              src="/warning.svg"
              alt="Warning"
            />
          )}
        </div>
        &nbsp; &nbsp;
        <div
          className={`${
            account ? " " : "bg-[#61BDFF]"
          } rounded-md flex justify-center items-center w-12 mx-4 md:w-32 h-8`}
        >
          <div className="flex items-center">
            <IoWallet
              color={`${account ? "white" : "black"}`}
              className={`md:block ${account ? "block mr-2" : "block"}`}
            />
            <ConnectButton />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
