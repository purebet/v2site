'use client'


import React, {useEffect } from 'react';
// import { notification } from 'antd';
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
import '@particle-network/connect-react-ui/dist/index.css'
const PageConnectKit = () => {
const options = {
    projectId: "50abf86a-ade7-4587-8d2b-70a55e29de1c",
    clientKey: "cyTvaY8ATsL0FDqlnrD4D6kATr6GIFfGuGz1Lxlw",
    appId: "cb56f837-593a-41cf-8da5-ca9321c38f6e",
chains: [Solana, SolanaDevnet],
wallets: solanaWallets(),
particleWalletEntry: {
displayWalletEntry: true,
supportChains: [Solana, SolanaDevnet]
}
};
return (
    <ModalProvider
    particleAuthSort={[
    'email', 'phone', 'google', 'twitter', 'apple', 'facebook', 'github'
    ]}
    options={options}
    >
    <ConnectContent />
    </ModalProvider>
    );
    };


    const ConnectContent = ( ) => {
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
            <div className={`connectkit-box ${account ? 'show-all-buttons' : 'hide-all-buttons'}`}>
              <div className="connect-btn">
                <ConnectButton />
              </div>
              {account && (
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
              )}
            </div>
          );
          

}

export default PageConnectKit;