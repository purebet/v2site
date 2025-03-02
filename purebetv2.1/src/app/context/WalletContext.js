"use client";
import React, { createContext, useContext } from "react";
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

const WalletContext = createContext();

export const useWallet = () => useContext(WalletContext);

export const WalletProviderComponent = ({ children }) => {
  const options = {
    projectId: "50abf86a-ade7-4587-8d2b-70a55e29de1c",
    clientKey: "cyTvaY8ATsL0FDqlnrD4D6kATr6GIFfGuGz1Lxlw",
    appId: "cb56f837-593a-41cf-8da5-ca9321c38f6e",
    chains: [Solana, SolanaDevnet], // Supported chains
    wallets: [
      ...solanaWallets({
        preferred: true,
      }),
    ],
    particleWalletEntry: {
      displayWalletEntry: true, // Show Particle Wallet entry
      supportChains: [Solana, SolanaDevnet], // Chains supported by Particle Wallet
    },
  };

  return (
    <ModalProvider
      particleAuthSort={[
        "email",
        "phone",
        "google",
        "twitter",
        "apple",
        "facebook",
        "github",
      ]}
      options={options}
    >
      {children}
    </ModalProvider>
  );
};
