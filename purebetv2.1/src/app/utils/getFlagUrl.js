import flagData from "./countrynametocode";
const getFlagUrl = (leagueName) => {
    const firstWord = leagueName.split(' ')[0]; // Extract the first word of the league name
    const flagInfo = flagData.find(flag => flag.name.includes(firstWord)); // Match the country name partially
    return flagInfo ? flagInfo.image : null; // Return the flag URL or an empty string
  };

  export default getFlagUrl;