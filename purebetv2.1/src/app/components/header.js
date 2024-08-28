'use client';
import { IoWallet } from 'react-icons/io5';
import { useState, useEffect, useRef } from 'react';
import { HiChevronDown, HiChevronRight } from "react-icons/hi2";
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import Image from 'next/image';
import { FaBars } from 'react-icons/fa';
import { IoIosSearch } from 'react-icons/io';
import { useWallet } from '@solana/wallet-adapter-react';
import WalletDataCard from './walletdatacard';
import {
  ConnectButton,
  ModalProvider,
  useAccount,
  useParticleConnect,
  useConnectKit
  } from '@particle-network/connect-react-ui';
  
  import {Solana, SolanaDevnet } from '@particle-network/chains'
  import { solanaWallets } from '@particle-network/connect'
  import {
    clusterApiUrl,
    Connection,
    PublicKey,
    LAMPORTS_PER_SOL,
  } from "@solana/web3.js";
  import bs58 from 'bs58';
  // import './App.css';
  import './particlenetwork.css'
const Header = ({ toggleSidebar, isSidebarOpen }) => {
  const { connect, disconnect } = useParticleConnect();
  const connectKit = useConnectKit();
  const account = useAccount();
  const isParticleActive = connectKit?.particle?.auth.isLogin();
  const getProvider =  () => isParticleActive ? null: window.phantom?.solana;
  const connectPhantom = async () => {
  const provider = getProvider();
  if (provider) {
  await provider.connect();
  }
  }

  useEffect(()=>{
      if (account) connectPhantom();
  },[account]);


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
      document.addEventListener('click', handleClickOutside, true);
    } else {
      document.removeEventListener('click', handleClickOutside, true);
    }
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, [isPopupVisible]);







  //wallet 


  
  const getBalance = async  ( )=> {
    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
    const phantomProvider = getProvider();
    const address = phantomProvider?.isPhantom ? phantomProvider?.publicKey.toString(): await connectKit.particle.solana.getAddress();
    console.log(address)
    const balance = await connection.getBalance(new PublicKey(address));
    // let wallet = new PublicKey("G2FAbFQPFa5qKXCetoFZQEvF9BVvCKbvUZvodpVidnoY");
    // console.log(
    //   `${(await connection.getBalance(wallet)) / LAMPORTS_PER_SOL} SOL`,
    // );
    console.log(`${(balance) / LAMPORTS_PER_SOL} SOL` )
    // notification.success({
    // message: "getBalance successful",
    // description: 'Balance: ${balance / 1e9} SOL',
    // });
    };
    const personalSign = async () => {
    const message = "GMGM Particle Network!";
    const encodedMessage = new TextEncoder().encode(message);
    const phantomProvider =  getProvider();
    const signedMessage = phantomProvider?.isPhantom ? await phantomProvider?.signMessage(encodedMessage, 'utf8'): await connectKit.particle.solana.signMessage(bs58.encode( encodedMessage));
    // notification.success({
    // message: `personalSign successful (${phantomProvider.isPhantom ? 'Phantom' : 'Particle'})`,
    // description: JSON.stringify(signedMessage),
    // });
    };

    const onDisconnect = () => disconnect({ hideLoading: true });
   
  return (
    <div className={`box-border  bg-[#121418]  border-[#294B4E] backdrop-blur-[5.7px] relative z-50 flex mb-2 m-4 rounded-xl border  items-center justify-between p-4  text-white ${isSidebarOpen ? 'hidden md:flex' : 'flex'}`}>
      
     
     <div className='md:hidden'>
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


     
      <div className='flex justify-center items-center'>
        <div className='hidden md:block'>
          {!account && <Image className='pointer-events-none'  width={20} height={20} src='/warning.svg' alt="Warning" />}
        </div>
        {/* {connected &&  <button 
            className="md:hidden rounded-md flex justify-center items-center w-8 h-8 "
            onClick={togglePopup}
          >
            {isPopupVisible ? <HiChevronDown color={"#ffffff"} /> : <HiChevronRight color={"#ffffff"} />}
          </button> } */}
        &nbsp; &nbsp;
        <div className={`${ account ? " " : "bg-[#61BDFF]"} rounded-md flex justify-center items-center w-12 mx-4 md:w-32 h-8`}>

        <div className="flex items-center">
  <IoWallet color={`${account?'white':"black" }`}  className={`md:block ${account ? "block mr-2" : "block"}`} />
  <ConnectButton />
</div>

          {/* {isPopupVisible && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-10 flex justify-center items-center" style={{ backdropFilter: 'blur(25px)' }}>
              <div ref={popupRef} className="absolute top-10 right-0  shadow-lg rounded-lg z-20 p-4">
                <WalletDataCard />
              </div>
            </div>
          )} */}

          {/* <WalletMultiButton className="">
           <IoWallet className={`md:block ${connected?"hidden ":"block"}`} color='black' />
            
            {!connected && <span className='hidden text-xs text-black md:block'>&nbsp; Login</span>}
          </WalletMultiButton>
          
          */}

{/* <div className=''> */}

              {/* {account && (
                <div className="connected-actions text-white">
                  <div type="primary" onClick={getBalance}>
                    Get Balance
                  </div>
                  <div type="primary" onClick={personalSign}>
                    Personal Sign
                  </div>
                  <div type="primary" onClick={onDisconnect}>
                    Disconnect
                  </div>
                </div>
              )} */}
            {/* </div> */}
        </div>
      </div>
    </div>
  );
};

export default Header;
