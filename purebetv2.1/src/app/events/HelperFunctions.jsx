'use client';
import React from 'react';
import { MdOutlineInsertLink } from "react-icons/md";
import { FaAngleDown } from "react-icons/fa6";
import { useState } from 'react';
import BetModal from './BetModal';

const BTTS = ({ title, data, showLiquidity = false }) => {
  if (!data || !data?.side0 || !data?.side1) {
    return null;
  }

  return (
    <div className="mb-4 rounded-lg overflow-hidden">
      <div className="text-sm text-white font-semibold p-3 flex items-center">
        <span className="text-[#7D7D7D] opacity-65 text-2xl">&bull;</span>
        <span className="ml-1 font-poppins opacity-65">{title}</span>
        {showLiquidity && (
          <div className="ml-auto bg-white bg-opacity-10 px-2 md:px-4 py-1 flex items-center gap-1 rounded-full">
            <button className="md:text-xs text-[10px] text-white">Show Liquidity</button>
            <MdOutlineInsertLink color="white" />
          </div>
        )}
      </div>
      <div className="md:p-4">
        <div className="flex justify-center items-center gap-2 md:gap-20">
          <div className="text-center">
            <div className="text-xs text-white">Yes</div>
            <div className="bg-[#132C42] w-[94px] text-white p-2 rounded mt-1">
              {data?.side0[0][0]}
            </div>
          </div>
          <div className="text-center">
            <div className="text-xs text-white">No</div>
            <div className="bg-[#132C42] w-[94px] text-white p-2 rounded mt-1">
              {data?.side1[0][0]}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const FullTime = ({ title, data, showLiquidity = false, homeTeam, awayTeam, eventDetails }) => {
  const [isBetModalOpen, setIsBetModalOpen] = useState(false);
  const [selectedBet, setSelectedBet] = useState(null);

  if (!data || Object.keys(data).length === 0) {
    return null;
  }

  const getTeamName = (key) => {
    switch (key.toLowerCase()) {
      case 'home':
        return homeTeam;
      case 'away':
        return awayTeam;
      default:
        return key;
    }
  };

  const handleBetSelection = (key, value) => {
    // Extract betting data from the value object
    const betData = {
      odds: Array.isArray(value) ? value[0][0] : (typeof value === 'object' ? value.odds : value),
      liquidity: Array.isArray(value) ? value[0][1] : (typeof value === 'object' ? value.side0?.[0]?.[1] : 0),
      mkt: value.mkt || (key.toLowerCase() === 'home' ? 1 : key.toLowerCase() === 'away' ? 3 : 2),
      side: 0, // Default to side0
      player: "",
      selection: getTeamName(key)
    };

    setSelectedBet(betData);
    setIsBetModalOpen(true);
  };

  const getBetButton = (key, value) => {
    const odds = Array.isArray(value) ? value[0][0] : (typeof value === 'object' ? value.odds : value);
    const isDisabled = !odds || odds === 0;

    return (
      <button
        onClick={() => handleBetSelection(key, value)}
        disabled={isDisabled}
        className={`
          w-[94px] p-2 rounded mt-1 text-center transition-all duration-200
          ${isDisabled 
            ? 'bg-neutral-800 text-neutral-500 cursor-not-allowed' 
            : 'bg-[#132C42] text-white hover:bg-[#1a3b59] active:bg-[#0f2231] cursor-pointer'
          }
        `}
      >
        {odds?.toFixed(2) || '-'}
      </button>
    );
  };

  return (
    <div className="mb-4 mt-4 md:mt-0 rounded-lg overflow-hidden">
      <div className="text-sm text-white font-semibold md:p-3 p-1 flex items-center">
        <span className="text-[#7D7D7D] opacity-65 text-2xl">&bull;</span>
        <span className="ml-1 font-poppins opacity-65">{title}</span>
        {showLiquidity && (
          <div className="ml-auto bg-white bg-opacity-10 px-2 md:px-4 py-1 flex items-center gap-1 rounded-full">
            <button className="md:text-xs text-[10px] text-white">Show Liquidity</button>
            <MdOutlineInsertLink color="white" />
          </div>
        )}
      </div>
      
      <div className="md:p-4">
        <div className="flex justify-center items-center gap-2 md:gap-20">
          {Object.entries(data).map(([key, value]) => (
            <div key={key} className="text-center">
              <div className="text-xs text-white mb-1">{getTeamName(key)}</div>
              {getBetButton(key, value)}
            </div>
          ))}
        </div>
      </div>

      <BetModal
        isOpen={isBetModalOpen}
        onClose={() => {
          setIsBetModalOpen(false);
          setSelectedBet(null);
        }}
        selectedOdd={selectedBet}
        eventDetails={{
          ...eventDetails,
          homeTeam,
          awayTeam
        }}
      />
    </div>
  );
};



  const ResultandBothTeamstoScore = ({ title, data, showLiquidity = false, homeTeam, awayTeam }) => {
    if (!data || Object?.keys(data)?.length === 0) {
      return null;
    }
  
    const yesData = {
      home: data[`${homeTeam} & Yes`],
      draw: data['Draw & Yes'],
      away: data[`${awayTeam} & Yes`]
    };
  
    const noData = {
      home: data[`${homeTeam} & No`],
      draw: data['Draw & No'],
      away: data[`${awayTeam} & No`]
    };
  
    return (
      <div className="mb-4 rounded-lg overflow-hidden">
        <div className="text-sm text-white font-semibold p-3 flex items-center">
          <span className="text-[#7D7D7D] opacity-65 text-2xl">&bull;</span>
          <span className="ml-1 font-poppins text-[10px] md:text-sm opacity-65">{title}</span>
          {showLiquidity && (
            <div className="ml-auto bg-white bg-opacity-10 px-2 md:px-4 py-1 flex items-center gap-1 rounded-full">
              <button className="md:text-xs text-[10px] text-white">Show Liquidity</button>
              <MdOutlineInsertLink color="white" />
            </div>
          )}
        </div>
       {/* Betting Odds Table */}
       <div className="grid grid-cols-4 gap-2">
        {/* Empty Cell */}
        <div></div>

        {/* Header Row with Teams */}
        <div className=" text-xs  w-[94px] text-center">{homeTeam}</div>
        <div className="text-center w-[94px] text-xs">Draw</div>
        <div className="text-center w-[94px] text-xs">{awayTeam}</div>

        {/* Yes Row */}
        <div  className="flex items-center justify-center">
        <div className="flex items-center justify-center bg-[#132C42]  text-xs h-7 rounded w-9">Yes</div>
        </div>
        {Object?.entries(yesData)?.map(([key, value]) => (
          <div key={key} className="bg-[#132C42] w-[94px] text-white p-2  text-center rounded mt-1">
            {value}
          </div>
        ))}

        {/* No Row */}
        <div  className="flex items-center justify-center">
        <div className="flex items-center justify-center bg-[#132C42]  text-xs h-7 rounded w-9">No</div>
        </div>
        {Object?.entries(noData)?.map(([key, value]) => (
          <div key={key} className="bg-[#132C42] w-[94px] text-white p-2 rounded mt-1 text-center">
            {value}
          </div>
        ))}
      </div>


      </div>
    );
  };

  
  const ResultandTotal = ({ title, data, showLiquidity = false }) => {
    // Extract team names from the data keys
    const teams = Array.from(new Set(Object.keys(data).map(key => key.split(' & ')[0]))).filter(team => team !== 'Draw');
    const [homeTeam, awayTeam] = teams;
  
    // Extract the market line (e.g., "2.5") from the first key
    const marketLine = Object.keys(data)[0].split(' ').pop();
  
    const createDataObject = (condition) => {
      return {
        [homeTeam]: data[`${homeTeam} & ${condition}`] || 0,
        'Draw': data[`Draw & ${condition}`] || 0,
        [awayTeam]: data[`${awayTeam} & ${condition}`] || 0
      };
    };
  
    const overData = createDataObject(`Over ${marketLine}`);
    const underData = createDataObject(`Under ${marketLine}`);
  
    return (
      <div className="text-white p-4 rounded-lg">
        {/* Header */}
        <div className="text-sm text-white font-semibold p-3 flex items-center">
          <div className="flex items-center">
            <span className="text-gray-500 text-2xl mr-2">•</span>
            <span className="ml-1 font-poppins opacity-65">{title} - {marketLine}</span>
          </div>
          {showLiquidity && (
            <div className="ml-auto bg-white bg-opacity-10 px-2 md:px-4 py-1 flex items-center gap-1 rounded-full">
              <button className="md:text-xs text-[10px] text-white">Show Liquidity</button>
              <MdOutlineInsertLink color="white" />
            </div>
          )}
        </div>
  
        {/* Betting Market Table */}
        <div className="grid grid-cols-4 gap-2">
          {/* Empty corner to align labels */}
          <div></div>
          <div className="text-center w-[94px] text-xs">{homeTeam}</div>
          <div className="text-center w-[94px] text-xs">Draw</div>
          <div className="text-center w-[94px] text-xs">{awayTeam}</div>
  
          {/* Over Row */}
          <div className="flex items-center justify-center">
            <div className="flex items-center justify-center bg-[#132C42] text-xs h-7 rounded w-12">Over</div>
          </div>
          {[homeTeam, 'Draw', awayTeam].map((team) => (
            <div key={`over-${team}`} className="bg-[#132C42] w-[94px] text-white p-2 rounded mt-1 text-center">
              {overData[team].toFixed(2)}
            </div>
          ))}
  
          {/* Under Row */}
          <div className="flex items-center justify-center">
            <div className="flex items-center justify-center bg-[#132C42] text-xs h-7 rounded w-12">Under</div>
          </div>
          {[homeTeam, 'Draw', awayTeam].map((team) => (
            <div key={`under-${team}`} className="bg-[#132C42] w-[94px] text-white p-2 rounded mt-1 text-center">
              {underData[team].toFixed(2)}
            </div>
          ))}
        </div>
      </div>
    );
  };
  

//   const BothTeamstoScoreandTotal = ({ title, data, showLiquidity = false }) => {
//     // console?.log(data, title, showLiquidity);
//   // Extract the first market to get the line
// //   // console?.log(data?.line)
//     // Extract team names from the data keys
//     const teams = Object?.keys(data)
//       ?.map(key => key?.split(' & ')[0])
//       ?.filter((value, index, self) => self?.indexOf(value) === index);
  
//     // Assuming the first team is home and the second is away
//     const [homeTeam, awayTeam] = teams;
//   // Extract the market line from the first key (or any relevant key)
// const marketLine = Object?.keys(data)[0]?.split(' ')?.pop(); // This will give you '2?.5'
//     const createDataObject = (condition) => {
//       return teams?.reduce((acc, team) => {
//         const key = `${team} & ${condition}`;
//         acc[team] = data[key] || 0;
//         return acc;
//       }, {});
//     };
  
//     const overData = createDataObject('Over 2?.5');
//     const underData = createDataObject('Under 2?.5');
  
//     return (
//       <div className=" text-white p-4 rounded-lg">
//         {/* Header */}
//         <div className="text-sm text-white font-semibold p-3 flex items-center">
//           <div className="flex items-center">
//             <span className="text-gray-500 text-2xl mr-2">•</span>
//             <span className="ml-1 font-poppins text-[8px] md:text-xs opacity-65">{title} - {marketLine}</span>
//           </div>
//           {showLiquidity && (
//             <div className="ml-auto bg-white bg-opacity-10 px-2 md:px-4 py-1 flex items-center gap-1 rounded-full">
//               <button className="md:text-xs text-[10px] text-white">Show Liquidity</button>
//               <MdOutlineInsertLink color="white" />
//             </div>
//           )}
//         </div>
  
//         {/* Betting Market Table */}
//         <div className="grid grid-cols-3 gap-2">
//           {/* Empty corner to align labels */}
//           <div></div>
//           <div className="text-center w-[94px] text-xs ">{homeTeam}</div>
//           <div className="text-center w-[94px] text-xs ">{awayTeam}</div>
  
//           {/* Over Row */}
//           <div  className="flex items-center justify-center">
//         <div className="flex items-center justify-center bg-[#132C42]  text-xs h-7 rounded w-12">Over</div>
//         </div>
//                   {teams?.map((team) => (
//             <div key={`over-${team}`} className="bg-[#132C42] w-[94px] text-white p-2 rounded mt-1 text-center">
//               {overData[team]?.toFixed(2)}
//             </div>
//           ))}
  
//           {/* Under Row */}
//           <div  className="flex items-center justify-center">
//         <div className="flex items-center justify-center bg-[#132C42]  text-xs h-7 rounded w-12">Under</div>
//         </div>
//                   {teams?.map((team) => (
//             <div key={`under-${team}`} className="bg-[#132C42] w-[94px] text-white p-2 rounded mt-1 text-center">
//               {underData[team]?.toFixed(2)}
//             </div>
//           ))}
//         </div>
//       </div>
//     );
//   };


const BothTeamstoScoreandTotal = ({ title, data, showLiquidity = false }) => {
  if (!data || data.length === 0) {
    return null;
  }
  console.log(data, title, showLiquidity);

  const market = data[0]; // Assuming we're using the first market

  return (
    <MarketContainer title={title} showLiquidity={showLiquidity}>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <h3 className="text-white font-semibold mb-2">Yes</h3>
          <div className="grid grid-cols-2 gap-2">
            <MarketItem label={`Over ${market.line}`} value={market.yes.over.side0[0][0]} />
            <MarketItem label={`Under ${market.line}`} value={market.yes.under.side0[0][0]} />
          </div>
        </div>
        <div>
          <h3 className="text-white font-semibold mb-2">No</h3>
          <div className="grid grid-cols-2 gap-2">
            <MarketItem label={`Over ${market.line}`} value={market.no.over.side0[0][0]} />
            <MarketItem label={`Under ${market.line}`} value={market.no.under.side0[0][0]} />
          </div>
        </div>
      </div>
    </MarketContainer>
  );
};

  const HalfTimeFullTime = ({ title, data, showLiquidity = false }) => {
    // console?.log(data, title, showLiquidity);
  
    const fullTimeResults = ['Home', 'Draw', 'Away'];
    const halfTimeResults = ['Home', 'Draw', 'Away'];
  
    const getOdds = (halfTime, fullTime) => {
      const key = `${halfTime} / ${fullTime}`;
      return data[key] ? data[key]?.toFixed(2) : '-';
    };
  
    return (
      <div className="text-white p-4 rounded-lg">
        {/* Header */}
        <div className="text-sm text-white font-semibold p-3 flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-gray-500 text-2xl mr-2">•</span>
            <span className="ml-1 font-poppins text-[10px] md:text-xs opacity-65">{title}</span>
          </div>
          {showLiquidity && (
            <div className="bg-white bg-opacity-10 px-2 md:px-4 py-1 flex items-center gap-1 rounded-full">
              <button className="md:text-xs text-[10px] text-white">Show Liquidity</button>
              <MdOutlineInsertLink color="white" />
            </div>
          )}
        </div>
  
        {/* Betting Market Table */}
        <div className="grid grid-cols-[auto] gap-2">
          {/* Vertical "Half-time Result" text */}
          <div className="writing-mode-vertical-rl transform absolute -left-5 mt-28 rotate-90 text-xs text-center ">
            Half-time Result
          </div>
  
          <div>
            {/* "Full-time Result" header */}
            <div className="text-xs text-center mb-3">Full-time Result</div>
  
            <div className="grid grid-cols-[auto,repeat(3,1fr)] gap-2">
              {/* Empty top-left corner */}
              <div></div>
  
              {/* Full Time column headers */}
              {fullTimeResults?.map((result) => (
                <div key={result} className="flex items-center justify-center">
                  <div className="flex items-center justify-center mx-auto bg-[#132C42] text-xs h-7 rounded w-12">
                    {result}
                  </div>
                </div>
              ))}
  
              {/* Rows for each Half Time result */}
              {halfTimeResults?.map((halfTime) => (
                <React.Fragment key={halfTime}>
                  {/* Half Time row header */}
                  <div className="flex items-center justify-center">
                    <div className="flex items-center justify-center bg-[#132C42] ml-5 text-xs h-7 rounded w-12">
                      {halfTime}
                    </div>
                  </div>
  
                  {/* Odds for each Full Time result */}
                  {fullTimeResults?.map((fullTime) => (
                    <div key={`${halfTime}-${fullTime}`} className="bg-[#132C42] text-white p-2 rounded text-center">
                      {getOdds(halfTime, fullTime)}
                    </div>
                  ))}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };
  


  const TeamOverUnder = ({ title, data, showLiquidity = false, eventDetails }) => {
    const processOdds = (side) => {
      if (!side || !Array?.isArray(side) || side?.length === 0 || !side[0] || !Array?.isArray(side[0])) {
        return 'N/A';
      }
      return side[0][0]?.toFixed(2);
    };
  
    const renderMarketGroup = (marketData) => {
      return (
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div></div>
          <div className="text-center w-[94px] text-xs">{eventDetails?.homeTeam}</div>
          <div className="text-center w-[94px] text-xs">{eventDetails?.awayTeam}</div>
  
          <div className="flex items-center justify-center">
            <div className="flex items-center justify-center bg-[#132C42] text-xs h-7 rounded w-12">Over</div>
          </div>
          <div className="bg-[#132C42] w-[94px] text-white p-2 rounded mt-1 text-center">
            {processOdds(marketData?.home?.side0)}
          </div>
          <div className="bg-[#132C42] w-[94px] text-white p-2 rounded mt-1 text-center">
            {processOdds(marketData?.away?.side0)}
          </div>
  
          <div className="flex items-center justify-center">
            <div className="flex items-center justify-center bg-[#132C42] text-xs h-7 rounded w-12">Under</div>
          </div>
          <div className="bg-[#132C42] w-[94px] text-white p-2 rounded mt-1 text-center">
            {processOdds(marketData?.home?.side1)}
          </div>
          <div className="bg-[#132C42] w-[94px] text-white p-2 rounded mt-1 text-center">
            {processOdds(marketData?.away?.side1)}
          </div>
        </div>
      );
    };
  
    return (
      <div className="text-white p-4 rounded-lg">
        {/* Header */}
        <div className="text-sm text-white font-semibold p-3 flex items-center">
          <div className="flex items-center">
            <span className="text-gray-500 text-2xl mr-2">•</span>
            <span className="ml-1 font-poppins text-[8px] md:text-xs opacity-65">{title}</span>
          </div>
          {showLiquidity && (
            <div className="ml-auto bg-white bg-opacity-10 px-2 md:px-4 py-1 flex items-center gap-1 rounded-full">
              <button className="md:text-xs text-[10px] text-white">Show Liquidity</button>
              <MdOutlineInsertLink color="white" />
            </div>
          )}
        </div>
  
        {/* Team Over/Under Markets */}
        {data?.home?.map((homeMarket, index) => {
          const awayMarket = data?.away[index];
          return (
            <div key={index}>
              <div className="text-xs font-semibold mb-2">Line {homeMarket?.line}</div>
              {renderMarketGroup({ home: homeMarket, away: awayMarket })}
            </div>
          );
        })}
      </div>
    );
  };
  


  const CorrectScore = ({ data, showLiquidity = false, eventDetails }) => {
    // console?.log(data, showLiquidity , eventDetails.homeTeam, eventDetails.awayTeam);
    const processOdds = (marketData) => {
      if (!marketData || !marketData.side0 || !Array.isArray(marketData.side0) || marketData.side0.length === 0) {
        return 'N/A';
      }
      const odds = marketData.side0[0][0];
      return odds ? odds.toFixed(2) : 'N/A';
    };
  
    const groupScores = (scores) => {
      const homeWin = [];
      const draw = [];
      const awayWin = [];
  
      scores.forEach(score => {
        const [home, away] = score.split('-').map(Number);
        if (home > away) {
          homeWin.push(score);
        } else if (home === away) {
          draw.push(score);
        } else {
          awayWin.push(score);
        }
      });
  
      const sortFn = (a, b) => {
        const [aHome, aAway] = a.split('-').map(Number);
        const [bHome, bAway] = b.split('-').map(Number);
        return aHome - bHome || aAway - bAway;
      };
  
      return [
        homeWin.sort(sortFn),
        draw.sort(sortFn),
        awayWin.sort(sortFn)
      ];
    };
  
    const renderScoreColumn = (scores) => {
      return (
        <div className="flex flex-col gap-2">
          {scores.map(score => (
            <div key={score} className="bg-[#132C42] w-[94px] text-white p-2 rounded text-center">
              {score}: {processOdds(data[score])}
            </div>
          ))}
        </div>
      );
    };
  
    const [homeWin, draw, awayWin] = groupScores(Object.keys(data));
  
    return (
      <div className="text-white p-4 rounded-lg">
        {/* Header */}
        <div className="text-sm text-white font-semibold p-3 flex items-center">
          <div className="flex items-center">
            <span className="text-gray-500 text-2xl mr-2">•</span>
            <span className="ml-1 font-poppins text-[8px] md:text-xs opacity-65">Correct Score</span>
          </div>
          {showLiquidity && (
            <div className="ml-auto bg-white bg-opacity-10 px-2 md:px-4 py-1 flex items-center gap-1 rounded-full">
              <button className="md:text-xs text-[10px] text-white">Show Liquidity</button>
              <MdOutlineInsertLink />
            </div>
          )}
        </div>
  
        {/* Correct Score Markets */}
        <div className="flex justify-center gap-12">
          <div>
            <div className="text-center flex justify-center items-center  min-w-[94px] mb-2 text-xs">{eventDetails?.homeTeam}  </div>
            {renderScoreColumn(homeWin)}
          </div>
          <div>
            <div className="text-center flex justify-center items-center min-w-[94px] mb-2 text-xs">Draw</div>
            {renderScoreColumn(draw)}
          </div>
          <div>
            <div className="text-center flex justify-center items-center  min-w-[94px] mb-2 text-xs">{eventDetails?.awayTeam} </div>
            {renderScoreColumn(awayWin)}
          </div>
        </div>
      </div>
    );
  };

  export { BTTS, FullTime, ResultandBothTeamstoScore, ResultandTotal, BothTeamstoScoreandTotal, HalfTimeFullTime, TeamOverUnder, CorrectScore };
  