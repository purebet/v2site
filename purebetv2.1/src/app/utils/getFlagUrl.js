import flagData from "./countrynametocode";
const getFlagUrl = (countryCode) => {
    if(!countryCode) return null
    const flagInfo = flagData.find(flag => flag.code == countryCode.toUpperCase()); // Match the country name partially
    return flagInfo ? flagInfo.image : null; // Return the flag URL or an empty string
  };

  export default getFlagUrl;