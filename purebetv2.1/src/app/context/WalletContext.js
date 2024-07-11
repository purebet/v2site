'use client'
import React, { createContext, useContext, useMemo } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { SolflareWalletAdapter } from '@solana/wallet-adapter-wallets';
import { clusterApiUrl } from '@solana/web3.js';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { ParticleAdapter } from "@solana/wallet-adapter-wallets";

const WalletContext = createContext();

export const useWallet = () => useContext(WalletContext);

export const WalletProviderComponent = ({ children }) => {
  const network = WalletAdapterNetwork.Mainnet;
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  const particleAdapter = new ParticleAdapter({
    config: {
        projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
      clientKey: process.env.NEXT_PUBLIC_CLIENT_KEY,
      appId: "cb56f837-593a-41cf-8da5-ca9321c38f6e",
    },
  });

  const wallets = useMemo(() => [new SolflareWalletAdapter(), particleAdapter], [particleAdapter]);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <WalletContext.Provider value={{}}>
            {children}
          </WalletContext.Provider>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};
