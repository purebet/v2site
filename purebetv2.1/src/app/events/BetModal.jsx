import React, { useState } from 'react';
import { AlertCircle } from 'lucide-react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { placeBet } from './bet';
// import { findAssociatedTokenAddress } from './utils';
import solanaWeb3 from '@solana/web3.js';
const BetModal = ({ isOpen, onClose, selectedOdd, eventDetails }) => {
  const [stake, setStake] = useState('');
  const [potentialWin, setPotentialWin] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const { connection } = useConnection();
  let wallet  ;
function getWalletPublicKey () {
    const wallet_pubkey = window.phantom?.solana.publicKey || window.particle?.solanaWallet.publicKey;    
    const walletPublicKey = new solanaWeb3.PublicKey(wallet_pubkey);
wallet = walletPublicKey;
      return walletPublicKey;

  };

  if (!isOpen) return null;

  const calculatePotentialWin = (stakeAmount) => {
    if (!stakeAmount || !selectedOdd) return 0;
    return (parseFloat(stakeAmount) * selectedOdd[0]).toFixed(2);
  };

  const handleStakeChange = (e) => {
    const value = e.target.value;
    setStake(value);
    setPotentialWin(calculatePotentialWin(value));
  };

  const handlePlaceBet = async () => {
 
    setIsProcessing(true);
    try {
     wallet =  getWalletPublicKey()
      const idObj = {
        sport: eventDetails.sport,
        league: eventDetails.league,
        event: eventDetails.event,
        period: 1, // Default to full time
        mkt: selectedOdd.mkt,
        player: selectedOdd.player || ''
      };

      const betInfo = {
        userStake: parseFloat(stake),
        side: selectedOdd.side || 0,
        odds: selectedOdd[0],
      };

      const fixtures = {
        selectionName: `${eventDetails.homeTeam} vs ${eventDetails.awayTeam}`,
        eventName: eventDetails.eventName
      };

      const addrs = {
        bettor: wallet,
        usdcATA: await findAssociatedTokenAddress(wallet),
      };

      const result = await placeBet(idObj, betInfo, addrs, fixtures, connection);

      if (result.listen) {
        alert('Bet placed successfully!');
        onClose();
      }
    } catch (error) {
      console.error('Error placing bet:', error);
      alert('Failed to place bet: ' + error.message);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative bg-neutral-900 p-6 rounded-lg max-w-md w-full m-4">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-neutral-400 hover:text-white"
        >
          ×
        </button>

        <h2 className="text-xl font-bold text-white mb-4">Place Bet</h2>

        <div className="space-y-4">
          <div className="bg-neutral-800 p-3 rounded">
            <p className="text-sm text-neutral-400">Selected Odds</p>
            <p className="text-lg text-white">{selectedOdd?.[0] || '-'}</p>
          </div>

          <div>
            <label className="text-sm text-neutral-400 block mb-1">
              Stake (USDC)
            </label>
            <input
              type="number"
              value={stake}
              onChange={handleStakeChange}
              className="w-full px-3 py-2 bg-neutral-800 border border-neutral-700 rounded text-white focus:outline-none focus:border-blue-500"
              placeholder="Enter stake amount"
            />
          </div>

          <div className="bg-neutral-800 p-3 rounded">
            <p className="text-sm text-neutral-400">Potential Win</p>
            <p className="text-lg text-white">{potentialWin} USDC</p>
          </div>

          {stake && parseFloat(stake) < 1 && (
            <div className="flex items-center gap-2 text-yellow-500">
              <AlertCircle size={16} />
              <p className="text-sm">Minimum stake is 1 USDC</p>
            </div>
          )}

          <button
            onClick={handlePlaceBet}
            disabled={!stake || parseFloat(stake) < 1 || isProcessing}
            className={`w-full py-2 px-4 rounded font-medium transition-colors ${
              !stake || parseFloat(stake) < 1 || isProcessing
                ? 'bg-blue-600/50 cursor-not-allowed text-white/50'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            {isProcessing ? 'Processing...' : 'Place Bet'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BetModal;