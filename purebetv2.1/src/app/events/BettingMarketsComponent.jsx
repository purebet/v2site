import React, { useState } from "react";
import { MdOutlineInsertLink } from "react-icons/md";
import AsianHandicap from "./components/AsianHandicap";
import OU from "./components/OU";
import {
  BTTS,
  FullTime,
  ResultandBothTeamstoScore,
  ResultandTotal,
  BothTeamstoScoreandTotal,
  HalfTimeFullTime,
  TeamOverUnder,
  CorrectScore,
} from "./HelperFunctions";
import { DropdownMenuIcon } from "@radix-ui/react-icons";

const PROP_TYPE_MAP = {
  goals: "Goals",
  points: "Points",
  rebounds: "Rebounds",
  assists: "Assists",
};

const SPORT_PERIODS = {
  // Basketball (id: 4)
  4: {
    FULL_TIME: "0", // Including OT
    REGULATION: "1", // Regular time
    HALF_TIME: "2",
    QUARTERS: ["11", "12", "13", "14"], // Q1, Q2, Q3, Q4
  },
  // Soccer/Football (id: 15, 29)
  DEFAULT: {
    FULL_TIME: "1", // Regular 90 minutes
    HALF_TIME: "2",
    EXTRA_TIME: "21",
    PENALTIES: "24",
  },
};

const BettingMarket = ({ title, data, showLiquidity = false }) => {
  if (!data || Object.keys(data).length === 0) {
    return null;
  }

  return (
    <MarketContainer title={title} showLiquidity={showLiquidity}>
      <div className="grid grid-cols-3 gap-2">
        {Object.entries(data).map(([key, value]) => (
          <MarketItem key={key} label={key} value={value} />
        ))}
      </div>
    </MarketContainer>
  );
};

const MarketContainer = ({ title, showLiquidity, children }) => (
  <div className="mb-4 rounded-lg overflow-hidden">
    <div className="text-sm text-white font-semibold p-3 flex items-center">
      <span className="text-[#7D7D7D] opacity-65 text-2xl">&bull;</span>
      <span className="ml-1 font-poppins opacity-65 ">{title}</span>
      {showLiquidity && <LiquidityButton />}
    </div>
    <div className="p-4">{children}</div>
  </div>
);

const MarketItem = ({ label, value }) => (
  <div className="text-center">
    <div className="text-xs text-gray-500">{label}</div>
    <div className="bg-[#132C42] text-white p-2 rounded mt-1">
      {Array.isArray(value)
        ? value[0][0]
        : typeof value === "object"
        ? value.odds
        : value}
    </div>
  </div>
);

const LiquidityButton = () => (
  <div className="ml-auto bg-white bg-opacity-10 px-4 py-1 flex items-center gap-1 rounded-full">
    <button className="text-xs text-white">Show Liquidity</button>
    <MdOutlineInsertLink color="white" />
  </div>
);

const PlayerProps = ({ title, data, showLiquidity = false }) => {
  const itemsToShowInitially = 5; // Number of items to show initially for each prop type

  if (!data || Object.keys(data).length === 0) return null;

  return (
    <MarketContainer title={title} showLiquidity={showLiquidity}>
      {Object.entries(data).map(([propType, playerProp]) => {
        const [expanded, setExpanded] = useState(false);

        const toggleExpand = () => {
          setExpanded(!expanded);
        };

        const playerEntries = Object.entries(playerProp);
        const visibleEntries = expanded
          ? playerEntries
          : playerEntries.slice(0, itemsToShowInitially);

        return (
          <div key={propType} className="mb-6 relative">
            <div className="flex items-center justify-between mb-3 ml-2">
              <h3 className="text-white text-sm font-semibold">
                {PROP_TYPE_MAP[propType] || propType}
              </h3>
              {playerEntries.length > itemsToShowInitially && (
                <button
                  onClick={toggleExpand}
                  className="ml-auto bg-white bg-opacity-10 px-4 py-1 flex items-center gap-1 rounded-full text-xs text-white focus:outline-none"
                >
                  {expanded ? "Show Less" : "Show More"}
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-12">
              {visibleEntries.map(([player, props]) => (
                <div key={player}>
                  <PlayerPropItem
                    playerName={playerProp[player].playerName}
                    props={props}
                  />
                </div>
              ))}
            </div>
            <div className="w-full mt-5 bg-[#FFFFFF26] h-[1px]"></div>
          </div>
        );
      })}
    </MarketContainer>
  );
};

// const PlayerPropItem = ({ playerName, props }) => (
//   <div className="text-center">
//     <div className="text-xs text-gray-500">{playerName}</div>
//     {Object.entries(props).map(([line, odds]) => (
//       <div key={line} className="bg-[#334155] text-white p-2 rounded mt-1">
//         {`${line}: ${odds[0][0]}`}
//       </div>
//     ))}
//   </div>
// );

const PlayerPropItem = ({ playerName, props }) => {
  console.log(playerName, "Player name");

  // Ensure props is an array and map through it
  const propLines = Array.isArray(props) ? props : [props];

  return (
    <div className="w-full flex flex-col justify-center align-middle items-center">
      <div className="text-xs text-gray-500 mb-1 text-center">{playerName}</div>
      <div className=" gap-2">
        {propLines.map((prop, index) => {
          const { line, side0, side1 } = prop;
          const overOdds = side0?.[0]?.[0]?.toFixed(2) || "N/A";
          const underOdds = side1?.[0]?.[0]?.toFixed(2) || "N/A";

          return (
            <div
              key={index}
              className=" flex flex-col justify-center align-middle items-center gap-3 text-white p-2 rounded text-center"
            >
              <div className="text-xs  text-gray-300">Line {line}</div>
              <div className="bg-[#132C42] w-[94px] text-white p-2 rounded mt-1">
                {" "}
                {overOdds}
              </div>
              <div className="bg-[#132C42] w-[94px] text-white p-2 rounded mt-1">
                {" "}
                {underOdds}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// const PlayerPropItem = ({ playerName, props }) => (
//   <div className="text-center">
//     <div className="text-xs text-gray-500">{playerName}</div>
//     {Object.entries(props).map(([line, odds]) => (
//       <div key={line} className="bg-[#334155] text-white p-2 rounded mt-1">
//         {`${line}: ${odds[0][0]}`}
//       </div>
//     ))}
//   </div>
// );

// const BettingEvents = ({ eventDetails }) => {
//   const [selectedMarket, setSelectedMarket] = useState('Full Time');

//   const getMarketData = (marketType, period =  '0') => {
//     const periodData = eventDetails?.periods?.[period];
//     if (!periodData || !periodData[marketType]) return null;

//     const processOdds = (odds) => {
//       if (Array.isArray(odds)) {
//         return odds[0][0];
//       } else if (typeof odds === 'object' && odds.side0) {
//         return odds.side0[0][0];
//       }
//       return odds;
//     };

//     const processMarket = (market) => {
//       return Object.entries(market).reduce((acc, [key, value]) => {
//         if (typeof value === 'object' && !Array.isArray(value)) {
//           acc[key] = processOdds(value);
//         } else {
//           acc[key] = value;
//         }
//         return acc;
//       }, {});
//     };

//     switch (marketType) {
//       case 'ML':
//       case 'FT':
//       case 'BTTS':
//       case 'DC':
//         return processMarket(periodData[marketType]);
//       case 'AH':
//       case 'OU':
//         return periodData[marketType].map(market => ({
//           mkt: market.mkt,
//           line: market.line,
//           side0: market.side0,
//           side1: market.side1
//         }));
//       // case 'OU':
//       //   return periodData[marketType].reduce((acc, market) => {
//       //     const line = market.line;
//       //     acc[`${eventDetails.homeTeam} ${line}`] = processOdds(market.side0);
//       //     acc[`${eventDetails.awayTeam} ${-line}`] = processOdds(market.side1);
//       //     return acc;
//       //   }, {});
//       case 'TOU':
//         return periodData.TOU;
//       default:
//         return null;
//     }
//   };

//   const getComplexMarketData = (marketType, period = '1') => {
//     const periodData = eventDetails?.periods?.[period];
//     if (!periodData) return null;

//     const processOdds = (odds) => {
//       if (!odds || !odds.side0 || !Array.isArray(odds.side0) || odds.side0.length === 0) {
//         return 'N/A';
//       }
//       return odds.side0[0][0];
//     };

//     switch (marketType) {
//       case 'BTTS+OU':
//         if (!periodData['BTTS+OU']) return null;
//         return periodData['BTTS+OU'].reduce((acc, market) => {
//           if (market && market.yes && market.no) {
//             acc[`Yes & Over ${market.line}`] = processOdds(market.yes.over);
//             acc[`No & Over ${market.line}`] = processOdds(market.no.over);
//             acc[`Yes & Under ${market.line}`] = processOdds(market.yes.under);
//             acc[`No & Under ${market.line}`] = processOdds(market.no.under);
//           }
//           return acc;
//         }, {});
//       case 'FT+BTTS':
//         if (!periodData['FT+BTTS']) return null;
//         return {
//           [`${eventDetails.homeTeam} & Yes`]: processOdds(periodData['FT+BTTS']?.home?.yes),
//           [`${eventDetails.homeTeam} & No`]: processOdds(periodData['FT+BTTS']?.home?.no),
//           [`Draw & Yes`]: processOdds(periodData['FT+BTTS']?.draw?.yes),
//           [`Draw & No`]: processOdds(periodData['FT+BTTS']?.draw?.no),
//           [`${eventDetails.awayTeam} & Yes`]: processOdds(periodData['FT+BTTS']?.away?.yes),
//           [`${eventDetails.awayTeam} & No`]: processOdds(periodData['FT+BTTS']?.away?.no)
//         };
//       case 'FT+OU':
//         if (!periodData['FT+OU']) return null;
//         return periodData['FT+OU'].reduce((acc, market) => {
//           console.log(market.line)
//           console.log(periodData['FT+OU'])
//           if (market && market.home && market.draw && market.away) {
//             acc[`${eventDetails.homeTeam} & Over ${market.line}`] = processOdds(market.home.over);
//             acc[`${eventDetails.homeTeam} & Under ${market.line}`] = processOdds(market.home.under);
//             acc[`Draw & Over ${market.line}`] = processOdds(market.draw.over);
//             acc[`Draw & Under ${market.line}`] = processOdds(market.draw.under);
//             acc[`${eventDetails.awayTeam} & Over ${market.line}`] = processOdds(market.away.over);
//             acc[`${eventDetails.awayTeam} & Under ${market.line}`] = processOdds(market.away.under);
//             // acc[`line`] = market.line;
//           }
//           return acc;
//         }, {});
//       case 'HTFT':
//         if (!periodData.HTFT) return null;
//         return Object.entries(periodData.HTFT).reduce((acc, [key, value]) => {
//           const [ht, ft] = key.split('/');
//           acc[`${ht.charAt(0).toUpperCase() + ht.slice(1)} / ${ft.charAt(0).toUpperCase() + ft.slice(1)}`] = processOdds(value);
//           return acc;
//         }, {});
//       case 'CS':
//         if (!periodData.CS) return null;
//         return periodData.CS;
//       default:
//         return null;
//     }
//   };

//   // const getPlayerProps = (period = '1') => {
//   //   const periodData = eventDetails?.periods?.[period];
//   //   if (!periodData || !periodData.PP) return null;

//   //   return Object.entries(periodData.PP).reduce((acc, [propType, players]) => {
//   //     acc[propType] = Object.entries(players).reduce((playerAcc, [playerName, props]) => {
//   //       playerAcc[playerName] = Object.entries(props).reduce((lineAcc, [line, odds]) => {
//   //         lineAcc[line] = odds;
//   //         return lineAcc;
//   //       }, {});
//   //       return playerAcc;
//   //     }, {});
//   //     return acc;
//   //   }, {});
//   // };
//   const getPlayerProps = (period = '0') => {
//     const periodData = eventDetails?.periods?.[period];
//     if (!periodData || !periodData.playerProps) return null;

//     return Object.entries(periodData.playerProps).reduce((acc, [propType, players]) => {
//       acc[propType] = Object.entries(players).reduce((playerAcc, [playerName, props]) => {
//         playerAcc[playerName] = Object.entries(props).reduce((lineAcc, [line, odds]) => {
//           lineAcc[line] = odds;
//           return lineAcc;
//         }, {});
//         return playerAcc;
//       }, {});
//       return acc;
//     }, {});
//   };

//   const renderMarkets = () => {
//     const commonProps = {
//       showLiquidity: true,
//       homeTeam: eventDetails.homeTeam,
//       awayTeam: eventDetails.awayTeam,
//       eventDetails
//     };

//     switch (selectedMarket) {
//       case 'Full Time':
//       case 'Half Time':
//         const periodData = selectedMarket === 'Full Time' ? '0' : '2';
//         return (
//           <MarketWrapper>
//             {getMarketData('ML', periodData) && <div><BettingMarket title="Money Line" data={getMarketData('ML', periodData)} {...commonProps} />             <div className='border-[1px] border-[#ffffff] opacity-15 border-solid'></div>
//             </div>}
//             {getMarketData('FT', periodData) && <div><FullTime title="Full Time Result" data={getMarketData('FT', periodData)} {...commonProps} />             <div className='border-[1px] border-[#ffffff] opacity-15 border-solid'></div>
// </div>}
//             {getMarketData('DC', periodData) && <div><BettingMarket title="Double Chance" data={getMarketData('DC', periodData)} {...commonProps} />            <div className='border-[1px] border-[#ffffff] opacity-15 border-solid'></div>
// </div>}
//             {getMarketData('BTTS', periodData) && <div><BTTS title="Both Teams to Score" data={getMarketData('BTTS', periodData)} {...commonProps} />            <div className='border-[1px] border-[#ffffff] opacity-15 border-solid'></div>
// </div>}
//             {getMarketData('AH', periodData) && <div><AsianHandicap title="Asian Handicap" data={getMarketData('AH', periodData)} {...commonProps} />            <div className='border-[1px] border-[#ffffff] opacity-15 border-solid'></div>
// </div>}
//             {getMarketData('OU', periodData) && <div><OU title="Over / Under" data={getMarketData('OU', periodData)} {...commonProps} />            <div className='border-[1px] border-[#ffffff] opacity-15 border-solid'></div>
// </div>}
//             {getComplexMarketData('FT+BTTS', periodData) && <div><ResultandBothTeamstoScore title="Result and Both Teams to Score" data={getComplexMarketData('FT+BTTS', periodData)} {...commonProps} />            <div className='border-[1px] border-[#ffffff] opacity-15 border-solid'></div>
// </div>}
//             {getComplexMarketData('FT+OU', periodData) && <div><ResultandTotal title="Result and Total" data={getComplexMarketData('FT+OU', periodData)} {...commonProps} />            <div className='border-[1px] border-[#ffffff] opacity-15 border-solid'></div>
// </div>}
//             {getComplexMarketData('BTTS+OU', periodData) && <div><BothTeamstoScoreandTotal title="Both Teams to Score and Total" data={periodData['BTTS+OU']} {...commonProps} />            <div className='border-[1px] border-[#ffffff] opacity-15 border-solid'></div>
// </div>}
//             {getComplexMarketData('HTFT', periodData) && <div><HalfTimeFullTime title="Half-time/Full-time" data={getComplexMarketData('HTFT', periodData)} {...commonProps} />            <div className='border-[1px] border-[#ffffff] opacity-15 border-solid'></div>
// </div>}
//             {getMarketData('TOU', periodData) && <div><TeamOverUnder title="Team Over/Under" data={getMarketData('TOU', periodData)} {...commonProps} />            <div className='border-[1px] border-[#ffffff] opacity-15 border-solid'></div>
// </div>}
//             {getComplexMarketData('CS', periodData) && <div><CorrectScore title="Correct Score" data={getComplexMarketData('CS', periodData)} {...commonProps} />            <div className='border-[1px] border-[#ffffff] opacity-15 border-solid'></div>
// </div>}
//           </MarketWrapper>
//         );
//       case 'Team Totals':
//         // return (
//         //   <MarketWrapper>
//         //     {getMarketData('TOU') && <div><TeamOverUnder title="Team Over/Under" data={getMarketData('TOU')} {...commonProps} />            <div className='border-[1px] border-[#ffffff] opacity-15 border-solid'></div>
//         //     </div>}
//         //   </MarketWrapper>
//         // );
//         return (
//           <MarketWrapper>
//             {getMarketData('TOU', '1') && (
//               <div>
//                 <TeamOverUnder
//                   title="Team Over/Under"
//                   data={getMarketData('TOU', '2')}
//                   {...commonProps}
//                 />
//                 <div className='border-[1px] border-[#ffffff] opacity-15 border-solid'></div>
//               </div>
//             )}
//           </MarketWrapper>
//         );
//       case 'Player Props':
//         // const playerProps = getPlayerProps();
//         // return playerProps ? (
//         //   <MarketWrapper>
//         //     <PlayerProps title="Player Props" data={playerProps} {...commonProps} />
//         //   </MarketWrapper>
//         // ) : null;
//         const playerProps = getPlayerProps('0'); // Try period 0 first
//   return playerProps ? (
//     <MarketWrapper>
//       <PlayerProps title="Player Props" data={playerProps} {...commonProps} />
//     </MarketWrapper>
//   ) : (
//     // If no player props in period 0, try period 1
//     <MarketWrapper>
//       {getPlayerProps('1') && (
//         <PlayerProps title="Player Props" data={getPlayerProps('1')} {...commonProps} />
//       )}
//     </MarketWrapper>)
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="md:px-0 px-2">
//        <MarketSelector
//         selectedMarket={selectedMarket}
//         setSelectedMarket={setSelectedMarket}
//         eventDetails={eventDetails}
//       />
//       {renderMarkets()}
//     </div>
//   );
// };

const BettingEvents = ({ eventDetails }) => {
  const [selectedMarket, setSelectedMarket] = useState("Full Time");
  const sportId = eventDetails?.sportId || 29; // Default to soccer if not specified

  const getMarketData = (marketType, periodOverride = null) => {
    let period;

    if (periodOverride) {
      period = periodOverride;
    } else {
      period =
        selectedMarket === "Full Time"
          ? getAppropriateFullTimePeriod(sportId)
          : selectedMarket === "Half Time"
          ? getAppropriateHalfTimePeriod(sportId)
          : getAppropriateFullTimePeriod(sportId);
    }

    const periodData = eventDetails?.periods?.[period];
    if (!periodData || !periodData[marketType]) return null;

    const processOdds = (odds) => {
      if (Array.isArray(odds)) {
        return odds[0][0];
      } else if (typeof odds === "object" && odds.side0) {
        return odds.side0[0][0];
      }
      return odds;
    };

    const processMarket = (market) => {
      return Object.entries(market).reduce((acc, [key, value]) => {
        if (typeof value === "object" && !Array.isArray(value)) {
          acc[key] = processOdds(value);
        } else {
          acc[key] = value;
        }
        return acc;
      }, {});
    };

    switch (marketType) {
      case "ML":
      case "FT":
      case "BTTS":
      case "DC":
        return processMarket(periodData[marketType]);
      case "AH":
      case "OU":
        return periodData[marketType].map((market) => ({
          mkt: market.mkt,
          line: market.line,
          side0: market.side0,
          side1: market.side1,
        }));
      case "TOU":
        return periodData.TOU;
      default:
        return null;
    }
  };

  const getComplexMarketData = (marketType, periodOverride = null) => {
    let period;
    if (periodOverride) {
      period = periodOverride;
    } else {
      period =
        selectedMarket === "Full Time"
          ? getAppropriateFullTimePeriod(sportId)
          : getAppropriateHalfTimePeriod(sportId);
    }

    const periodData = eventDetails?.periods?.[period];
    if (!periodData) return null;

    const processOdds = (odds) => {
      if (
        !odds ||
        !odds.side0 ||
        !Array.isArray(odds.side0) ||
        odds.side0.length === 0
      ) {
        return "N/A";
      }
      return odds.side0[0][0];
    };

    switch (marketType) {
      case "BTTS+OU":
        if (!periodData["BTTS+OU"]) return null;
        return periodData["BTTS+OU"].reduce((acc, market) => {
          if (market && market.yes && market.no) {
            acc[`Yes & Over ${market.line}`] = processOdds(market.yes.over);
            acc[`No & Over ${market.line}`] = processOdds(market.no.over);
            acc[`Yes & Under ${market.line}`] = processOdds(market.yes.under);
            acc[`No & Under ${market.line}`] = processOdds(market.no.under);
          }
          return acc;
        }, {});
      case "FT+BTTS":
        if (!periodData["FT+BTTS"]) return null;
        return {
          [`${eventDetails.homeTeam} & Yes`]: processOdds(
            periodData["FT+BTTS"]?.home?.yes
          ),
          [`${eventDetails.homeTeam} & No`]: processOdds(
            periodData["FT+BTTS"]?.home?.no
          ),
          [`Draw & Yes`]: processOdds(periodData["FT+BTTS"]?.draw?.yes),
          [`Draw & No`]: processOdds(periodData["FT+BTTS"]?.draw?.no),
          [`${eventDetails.awayTeam} & Yes`]: processOdds(
            periodData["FT+BTTS"]?.away?.yes
          ),
          [`${eventDetails.awayTeam} & No`]: processOdds(
            periodData["FT+BTTS"]?.away?.no
          ),
        };
      case "FT+OU":
        if (!periodData["FT+OU"]) return null;
        return periodData["FT+OU"].reduce((acc, market) => {
          if (market && market.home && market.draw && market.away) {
            acc[`${eventDetails.homeTeam} & Over ${market.line}`] = processOdds(
              market.home.over
            );
            acc[`${eventDetails.homeTeam} & Under ${market.line}`] =
              processOdds(market.home.under);
            acc[`Draw & Over ${market.line}`] = processOdds(market.draw.over);
            acc[`Draw & Under ${market.line}`] = processOdds(market.draw.under);
            acc[`${eventDetails.awayTeam} & Over ${market.line}`] = processOdds(
              market.away.over
            );
            acc[`${eventDetails.awayTeam} & Under ${market.line}`] =
              processOdds(market.away.under);
          }
          return acc;
        }, {});
      case "HTFT":
        if (!periodData.HTFT) return null;
        return Object.entries(periodData.HTFT).reduce((acc, [key, value]) => {
          const [ht, ft] = key.split("/");
          acc[
            `${ht.charAt(0).toUpperCase() + ht.slice(1)} / ${
              ft.charAt(0).toUpperCase() + ft.slice(1)
            }`
          ] = processOdds(value);
          return acc;
        }, {});
      case "CS":
        if (!periodData.CS) return null;
        return periodData.CS;
      default:
        return null;
    }
  };

  const getPlayerProps = () => {
    const primaryPeriod = getAppropriateFullTimePeriod(sportId);
    const fallbackPeriod = primaryPeriod === "0" ? "1" : "0";
    const periodData = eventDetails?.periods?.[primaryPeriod];
    const fallbackData = eventDetails?.periods?.[fallbackPeriod];
    const props = periodData?.playerProps || fallbackData?.playerProps;

    if (!props) return null;

    return Object.entries(props).reduce((acc, [propType, players]) => {
      acc[propType] = Object.entries(players).reduce(
        (playerAcc, [playerName, playerProps]) => {
          // Convert array-based props to object keyed by line
          playerAcc[playerName] = Array.isArray(playerProps)
            ? playerProps.reduce((lineAcc, { line, odds }) => {
                lineAcc[line] = odds;
                return lineAcc;
              }, {})
            : playerProps; // Fallback if already an object
          return playerAcc;
        },
        {}
      );
      return acc;
    }, {});
  };

  const renderMarkets = () => {
    const commonProps = {
      showLiquidity: true,
      homeTeam: eventDetails.homeTeam,
      awayTeam: eventDetails.awayTeam,
      eventDetails,
    };

    const period =
      selectedMarket === "Full Time"
        ? getAppropriateFullTimePeriod(sportId)
        : selectedMarket === "Half Time"
        ? getAppropriateHalfTimePeriod(sportId)
        : getAppropriateFullTimePeriod(sportId);

    switch (selectedMarket) {
      case "Full Time":
      case "Half Time":
        return (
          <MarketWrapper>
            {getMarketData("ML", period) && (
              <div>
                <BettingMarket
                  title="Money Line"
                  data={getMarketData("ML", period)}
                  {...commonProps}
                />
                <div className="border-[1px] border-[#ffffff] opacity-15 border-solid"></div>
              </div>
            )}
            {getMarketData("FT", period) && (
              <div>
                <BettingMarket
                  title="Full Time Result"
                  data={getMarketData("FT", period)}
                  {...commonProps}
                />
                <div className="border-[1px] border-[#ffffff] opacity-15 border-solid"></div>
              </div>
            )}
            {getMarketData("DC", period) && (
              <div>
                <BettingMarket
                  title="Double Chance"
                  data={getMarketData("DC", period)}
                  {...commonProps}
                />
                <div className="border-[1px] border-[#ffffff] opacity-15 border-solid"></div>
              </div>
            )}
            {getMarketData("BTTS", period) && (
              <div>
                <BTTS
                  title="Both Teams to Score"
                  data={getMarketData("BTTS", period)}
                  {...commonProps}
                />
                <div className="border-[1px] border-[#ffffff] opacity-15 border-solid"></div>
              </div>
            )}
            {getMarketData("AH", period) && (
              <div>
                <AsianHandicap
                  title="Asian Handicap"
                  data={getMarketData("AH", period)}
                  {...commonProps}
                />
                <div className="border-[1px] border-[#ffffff] opacity-15 border-solid"></div>
              </div>
            )}
            {getMarketData("OU", period) && (
              <div>
                <OU
                  title="Over / Under"
                  data={getMarketData("OU", period)}
                  {...commonProps}
                />
                <div className="border-[1px] border-[#ffffff] opacity-15 border-solid"></div>
              </div>
            )}
            {getComplexMarketData("FT+BTTS", period) && (
              <div>
                <ResultandBothTeamstoScore
                  title="Result and Both Teams to Score"
                  data={getComplexMarketData("FT+BTTS", period)}
                  {...commonProps}
                />
                <div className="border-[1px] border-[#ffffff] opacity-15 border-solid"></div>
              </div>
            )}
            {getComplexMarketData("FT+OU", period) && (
              <div>
                <ResultandTotal
                  title="Result and Total"
                  data={getComplexMarketData("FT+OU", period)}
                  {...commonProps}
                />
                <div className="border-[1px] border-[#ffffff] opacity-15 border-solid"></div>
              </div>
            )}
            {getComplexMarketData("BTTS+OU", period) && (
              <div>
                <BothTeamstoScoreandTotal
                  title="Both Teams to Score and Total"
                  data={getComplexMarketData("BTTS+OU", period)}
                  {...commonProps}
                />
                <div className="border-[1px] border-[#ffffff] opacity-15 border-solid"></div>
              </div>
            )}
            {getComplexMarketData("HTFT", period) && (
              <div>
                <HalfTimeFullTime
                  title="Half-time/Full-time"
                  data={getComplexMarketData("HTFT", period)}
                  {...commonProps}
                />
                <div className="border-[1px] border-[#ffffff] opacity-15 border-solid"></div>
              </div>
            )}
            {getMarketData("TOU", period) && (
              <div>
                <TeamOverUnder
                  title="Team Over/Under"
                  data={getMarketData("TOU", period)}
                  {...commonProps}
                />
                <div className="border-[1px] border-[#ffffff] opacity-15 border-solid"></div>
              </div>
            )}
            {getComplexMarketData("CS", period) && (
              <div>
                <CorrectScore
                  title="Correct Score"
                  data={getComplexMarketData("CS", period)}
                  {...commonProps}
                />
                <div className="border-[1px] border-[#ffffff] opacity-15 border-solid"></div>
              </div>
            )}
          </MarketWrapper>
        );
      case "Team Totals":
        return (
          <MarketWrapper>
            {getMarketData("TOU", period) && (
              <div>
                <TeamOverUnder
                  title="Team Over/Under"
                  data={getMarketData("TOU", period)}
                  {...commonProps}
                />
                <div className="border-[1px] border-[#ffffff] opacity-15 border-solid"></div>
              </div>
            )}
          </MarketWrapper>
        );
      case "Player Props":
        const playerProps = getPlayerProps();
        return playerProps ? (
          <MarketWrapper>
            <PlayerProps
              title="Player Props"
              data={playerProps}
              {...commonProps}
            />
          </MarketWrapper>
        ) : null;
      default:
        return null;
    }
  };

  return (
    <div className="md:px-0 px-2">
      <MarketSelector
        selectedMarket={selectedMarket}
        setSelectedMarket={setSelectedMarket}
        eventDetails={eventDetails}
        sportId={sportId}
      />
      {renderMarkets()}
    </div>
  );
};

const MarketSelector = ({
  selectedMarket,
  setSelectedMarket,
  eventDetails,
  sportId,
}) => {
  const fullTimePeriod = getAppropriateFullTimePeriod(sportId);
  const halfTimePeriod = getAppropriateHalfTimePeriod(sportId);

  // Check data availability for each market type
  const hasFullTime = eventDetails?.periods?.[fullTimePeriod];
  const hasHalfTime = eventDetails?.periods?.[halfTimePeriod];
  const hasTeamTotals = hasFullTime?.TOU;
  const hasPlayerProps =
    hasFullTime?.playerProps ||
    eventDetails?.periods?.[fullTimePeriod === "0" ? "1" : "0"]?.playerProps;

  // Create array of available markets
  const availableMarkets = [
    { label: "Full Time", show: hasFullTime },
    { label: "Half Time", show: hasHalfTime },
    { label: "Team Totals", show: hasTeamTotals },
    { label: "Player Props", show: hasPlayerProps },
  ].filter((market) => market.show);

  // Select first available market if current selection is invalid
  React.useEffect(() => {
    if (
      !selectedMarket ||
      !availableMarkets.some((market) => market.label === selectedMarket)
    ) {
      setSelectedMarket(availableMarkets[0]?.label || "Full Time");
    }
  }, [availableMarkets, selectedMarket]);

  return (
    <div className="flex overflow-x-auto w-[90%] md:w-[80%] justify-start md:mt-5 p-4 gap-2 z-[100]">
      {availableMarkets.map(({ label }) => (
        <button
          key={label}
          onClick={() => setSelectedMarket(label)}
          className={`flex md:text-xs text-xs items-center justify-center md:px-3 px-2 py-1.5 md:gap-1 font-semibold rounded-full whitespace-nowrap ${
            selectedMarket === label
              ? "bg-gradient-to-b from-[#0046CF] to-[#002469] text-white"
              : "bg-[rgba(255,255,255,0.03)] text-gray-300"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
};

export default BettingEvents;

const MarketWrapper = ({ children }) => (
  <div className="relative w-full sm:w-[90%]  md:w-[100%] ">
    <div className="absolute inset-0 border border-[#2E202D] bg-gradient-to-r from-[#49FFDE] to-[#1BA2EE] rounded-[16px] p-[0.1px]">
      <div className="absolute inset-[0.5px] bg-[#111111] rounded-[15px]"></div>
    </div>
    <div className="relative z-10 box-border p-1.5 pt-0 min-h-[77vh] overflow-y-scroll rounded-[16px] sm:rounded-[24px]">
      {children}
    </div>
  </div>
);

const getAppropriateFullTimePeriod = (sportId) => {
  // Sports that typically include overtime in full time
  const sportsWithPeriodZero = [3, 4, 19, 16, 18, 32]; // Baseball, Basketball, Hockey, Futsal, Handball, Table Tennis
  if (sportsWithPeriodZero.includes(sportId)) {
    return "0";
  }
  return "1"; // Default (Soccer/Football and others)
};

const getAppropriateHalfTimePeriod = (sportId) => {
  return "2"; // Most sports use period 2 for half time
};

// const MarketSelector = ({ selectedMarket, setSelectedMarket }) => (
//   <div className="flex overflow-x-auto w-[90%] md:w-[80%] justify-start md:mt-5 p-4 gap-2 z-[100]">
//     {['Full Time', 'Half Time', 'Team Totals', 'Player Props'].map((label) => (
//       <button
//         key={label}
//         onClick={() => setSelectedMarket(label)}
//         className={`flex md:text-xs text-xs items-center justify-center md:px-3 px-2 py-1.5 md:gap-1 font-semibold rounded-full whitespace-nowrap ${
//           selectedMarket === label
//             ? 'bg-gradient-to-b from-[#0046CF] to-[#002469] text-white'
//             : 'bg-[rgba(255,255,255,0.03)] text-gray-300'
//         }`}
//       >
//         {label}
//       </button>
//     ))}
//   </div>
// );
// const MarketSelector = ({ selectedMarket, setSelectedMarket, eventDetails }) => {
//   // Check data availability for each market type
//   const hasFullTime = eventDetails?.periods?.['1'] || eventDetails?.periods?.['0'];
//   const hasHalfTime = eventDetails?.periods?.['2'];
//   const hasTeamTotals = eventDetails?.periods?.['1']?.TOU || eventDetails?.periods?.['0']?.TOU;
//   const hasPlayerProps = eventDetails?.periods?.['1']?.PP;

//   // Create array of available markets
//   const availableMarkets = [
//     { label: 'Full Time', show: hasFullTime },
//     { label: 'Half Time', show: hasHalfTime },
//     { label: 'Team Totals', show: hasTeamTotals },
//     { label: 'Player Props', show: hasPlayerProps }
//   ].filter(market => market.show);

//   return (
//     <div className="flex overflow-x-auto w-[90%] md:w-[80%] justify-start md:mt-5 p-4 gap-2 z-[100]">
//       {availableMarkets.map(({ label }) => (
//         <button
//           key={label}
//           onClick={() => setSelectedMarket(label)}
//           className={`flex md:text-xs text-xs items-center justify-center md:px-3 px-2 py-1.5 md:gap-1 font-semibold rounded-full whitespace-nowrap ${
//             selectedMarket === label
//               ? 'bg-gradient-to-b from-[#0046CF] to-[#002469] text-white'
//               : 'bg-[rgba(255,255,255,0.03)] text-gray-300'
//           }`}
//         >
//           {label}
//         </button>
//       ))}
//     </div>
//   );
// };

// const MarketSelector = ({ selectedMarket, setSelectedMarket, eventDetails }) => {
//   // Check data availability for each market type
//   const hasFullTime = eventDetails?.periods?.['0'] || eventDetails?.periods?.['1'];
//   const hasHalfTime = eventDetails?.periods?.['2'];
//   const hasTeamTotals = eventDetails?.periods?.['0']?.TOU || eventDetails?.periods?.['1']?.TOU;
//   const hasPlayerProps = eventDetails?.periods?.['0']?.playerProps || eventDetails?.periods?.['1']?.playerProps;

//   // Create array of available markets
//   const availableMarkets = [
//     { label: 'Full Time', show: hasFullTime },
//     { label: 'Half Time', show: hasHalfTime },
//     { label: 'Team Totals', show: hasTeamTotals },
//     { label: 'Player Props', show: hasPlayerProps }
//   ].filter(market => market.show);

//   // If no market is selected or selected market is not available, select first available market
//   React.useEffect(() => {
//     if (!selectedMarket || !availableMarkets.some(market => market.label === selectedMarket)) {
//       setSelectedMarket(availableMarkets[0]?.label || 'Full Time');
//     }
//   }, [availableMarkets, selectedMarket]);

//   return (
//     <div className="flex overflow-x-auto w-[90%] md:w-[80%] justify-start md:mt-5 p-4 gap-2 z-[100]">
//       {availableMarkets.map(({ label }) => (
//         <button
//           key={label}
//           onClick={() => setSelectedMarket(label)}
//           className={`flex md:text-xs text-xs items-center justify-center md:px-3 px-2 py-1.5 md:gap-1 font-semibold rounded-full whitespace-nowrap ${
//             selectedMarket === label
//               ? 'bg-gradient-to-b from-[#0046CF] to-[#002469] text-white'
//               : 'bg-[rgba(255,255,255,0.03)] text-gray-300'
//           }`}
//         >
//           {label}
//         </button>
//       ))}
//     </div>
//   );
// };

// export default BettingEvents;
