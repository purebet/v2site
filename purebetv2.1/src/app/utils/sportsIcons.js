import { SiPremierleague, SiNba } from "react-icons/si";
import { IoAmericanFootball } from "react-icons/io5";
import { FaBaseball } from "react-icons/fa6";
import { PiBasketballLight, PiHockey } from "react-icons/pi";
import { MdOutlineSportsSoccer, MdOutlineSportsRugby, MdOutlineSportsTennis, MdSportsCricket, MdSportsEsports } from "react-icons/md";
import Image from 'next/image';

const sportsIcons = {
  "premier league": { icon: SiPremierleague, src: null },
  "la liga": { icon: null, src: "/la-liga-logo.svg" },
  nba: { icon: SiNba, src: null },
  soccer: { icon: MdOutlineSportsSoccer, src: null },
  "american football": { icon: IoAmericanFootball, src: null },
  baseball: { icon: FaBaseball, src: null },
  basketball: { icon: PiBasketballLight, src: null },
  icehockey: { icon: PiHockey, src: null },
  rugby: { icon: MdOutlineSportsRugby, src: null },
  tennis: { icon: MdOutlineSportsTennis, src: null },
  cricket: { icon: MdSportsCricket, src: null },
  esports: { icon: MdSportsEsports, src: null },
  "combat sports": { icon: Image, src: "/wrestling.svg" },
  cryptocurrency: { icon: Image, src: "/logos_ethereum.svg" },
  politics: { icon: Image, src: "/politics.svg" }
};



export default sportsIcons;

