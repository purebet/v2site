const truncateAndMaskWalletAddress = (address) => {
    if(address){
    if (address.length <= 10) return address;
    return `${address.slice(0, 3)}.......${address.slice(-4)}`;
    }else{
      return address;
    }
  };
  export default truncateAndMaskWalletAddress;