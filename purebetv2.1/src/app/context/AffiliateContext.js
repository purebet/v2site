import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';


const AffiliateContext = createContext();

export const useAffiliate = () => {
  const context = useContext(AffiliateContext);
  if (context === undefined) {
    throw new Error('useAffiliate must be used within an AffiliateProvider');
  }
  return context;
};



export const AffiliateProvider = ({ children }) => {
  const [referralCode, setReferralCode] = useState('default');
  const [hasUsedReferral, setHasUsedReferral] = useState(false);

  useEffect(() => {
    // Check URL for referral code on initial load
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    if (code) {
      setReferralCode(code);
      localStorage.setItem('referralCode', code);
    } else {
      const savedCode = localStorage.getItem('referralCode');
      if (savedCode) {
        setReferralCode(savedCode);
      }
    }

    const usedReferral = localStorage.getItem('hasUsedReferral');
    if (usedReferral === 'true') {
      setHasUsedReferral(true);
    }
  }, []);

  const useReferralCode = async (address) => {
    if (!hasUsedReferral) {
      try {
        const response = await fetch(`https://ogs3htok73.execute-api.ap-northeast-1.amazonaws.com/v2/affiliate/referral?address=${address}&code=${referralCode}`);
        if (response.ok) {
          setHasUsedReferral(true);
          localStorage.setItem('hasUsedReferral', 'true');
        }
      } catch (error) {
        console.error('Failed to use referral code:', error);
      }
    }
  };

  const getExistingCodes = async (address) => {
    try {
      const response = await fetch(`https://ogs3htok73.execute-api.ap-northeast-1.amazonaws.com/v2/affiliate/getCode?address=${address}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return Array.isArray(data) ? data : data.codes || [];
    } catch (error) {
      console.error('Failed to fetch existing codes:', error);
      return [];
    }
  };

  const linkNewCode = async (address, code) => {
    try {
      const response = await fetch(`https://ogs3htok73.execute-api.ap-northeast-1.amazonaws.com/v2/affiliate/new?address=${address}&code=${code}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data.confirmed || false;
    } catch (error) {
      console.error('Failed to link new code:', error);
      return false;
    }
  };

  const generateReferralLink = (code) => {
    return `https://exchange.purebet.io/ref?code=${code}`;
  };

  const value = {
    referralCode,
    hasUsedReferral,
    setReferralCode,
    useReferralCode,
    getExistingCodes,
    linkNewCode,
    generateReferralLink,
  };

  return <AffiliateContext.Provider value={value}>
    {children}
    </AffiliateContext.Provider>;
};