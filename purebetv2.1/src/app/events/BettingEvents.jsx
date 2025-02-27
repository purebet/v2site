import React, { useState } from "react";
import { MdOutlineInsertLink } from "react-icons/md";
import AsianHandicap from "./components/AsianHandicap";
import {
  BTTS,
  FullTime,
  ResultandBothTeamstoScore,
  ResultandTotal,
  BothTeamstoScoreandTotal,
  HalfTimeFullTime,
  TeamOverUnder,
} from "./HelperFunctions";

const PROP_TYPE_MAP = {
  goals: "Goals",
  points: "Points",
  rebounds: "Rebounds",
  assists: "Assists",
};

const BettingMarket = ({ title, data, showLiquidity = false }) => {
  if (!data || Object.keys(data).length === 0) {
    return null;
  }
  console.log(data);
  return (
    <div className="mb-4 rounded-lg overflow-hidden ">
      <div className="text-sm text-white font-semibold p-3 flex items-center">
        <span className="text-[#7D7D7D] opacity-65 text-2xl">&bull;</span>
        <span className="ml-1 font-poppins opacity-65">{title}</span>
        {showLiquidity && (
          <div className="ml-auto bg-white bg-opacity-10 px-4 py-1 flex items-center gap-1 rounded-full">
            <button className="text-xs text-white">Show Liquidity</button>
            <MdOutlineInsertLink color="white" />
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="grid grid-cols-3 gap-2">
          {Object.entries(data).map(([key, value]) => (
            <div key={key} className="text-center">
              <div className="text-xs text-gray-500">{key}</div>
              <div className="bg-[#334155] text-white p-2 rounded mt-1">
                {Array.isArray(value)
                  ? value[0][0]
                  : typeof value === "object"
                  ? value.odds
                  : value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const PlayerProps = ({ title, data, showLiquidity = false }) => {
  if (!data || Object.keys(data).length === 0) {
    return null;
  }

  return (
    <div className="mb-4 rounded-lg overflow-hidden bg-[#1c2635]">
      <div className="text-sm text-white font-semibold p-3 flex items-center bg-[#273549]">
        <span className="text-[#7D7D7D] opacity-65 text-2xl">&bull;</span>
        <span className="ml-1 font-poppins opacity-65">{title}</span>
        {showLiquidity && (
          <div className="ml-auto bg-white bg-opacity-10 px-4 py-1 flex items-center gap-1 rounded-full">
            <button className="text-xs text-white">Show Liquidity</button>
            <MdOutlineInsertLink color="white" />
          </div>
        )}
      </div>
      <div className="p-4">
        {Object.entries(data).map(([propType, players]) => (
          <div key={propType} className="mb-4">
            <h3 className="text-white font-semibold mb-2">{propType}</h3>
            <div className="grid grid-cols-3 gap-2">
              {Object.entries(players).map(([playerName, props]) => (
                <div key={playerName} className="text-center">
                  <div className="text-xs text-gray-500">{playerName}</div>
                  {Object.entries(props).map(([line, odds]) => (
                    <div
                      key={line}
                      className="bg-[#334155] text-white p-2 rounded mt-1"
                    >
                      {`${line}: ${odds[0][0]}`}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
const BettingEvents = ({ eventDetails }) => {
  const [selectedMarket, setSelectedMarket] = useState("Full Time");

  const getMarketData = (marketType, period = "1") => {
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
      // case 'OU':
      //   return periodData[marketType].reduce((acc, market) => {
      //     const line = market.line;
      //     acc[`${eventDetails.homeTeam} ${line}`] = processOdds(market.side0);
      //     acc[`${eventDetails.awayTeam} ${-line}`] = processOdds(market.side1);
      //     return acc;
      //   }, {});
      case "TOU":
        return periodData.TOU;
      default:
        return null;
    }
  };

  const getComplexMarketData = (marketType, period = "1") => {
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
          console.log(market.line);
          console.log(periodData["FT+OU"]);
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
            // acc[`line`] = market.line;
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
        return Object.entries(periodData.CS).reduce((acc, [score, value]) => {
          acc[score] = processOdds(value);
          return acc;
        }, {});
      default:
        return null;
    }
  };

  const getPlayerProps = (period = "1") => {
    const periodData = eventDetails?.periods?.[period];
    if (!periodData || !periodData.PP) return null;

    return Object.entries(periodData.PP).reduce((acc, [propType, players]) => {
      acc[propType] = Object.entries(players).reduce(
        (playerAcc, [playerName, props]) => {
          playerAcc[playerName] = Object.entries(props).reduce(
            (lineAcc, [line, odds]) => {
              lineAcc[line] = odds;
              return lineAcc;
            },
            {}
          );
          return playerAcc;
        },
        {}
      );
      return acc;
    }, {});
  };

  const renderMarkets = () => {
    switch (selectedMarket) {
      case "Full Time":
        return (
          <div className="relative w-full  sm:w-[90%] md:w-[100%] ">
            <div className="absolute inset-0 bg-gradient-to-b from-[#49FFDE] to-[#1BA2EE] rounded-[16px]  p-[0.1px] ]">
              <div className="absolute inset-[0.5px]  bg-[#111111] rounded-[15px] sm:rounded-[22px]"></div>
            </div>
            <div className="relative z-10 box-border p-1.5 pt-0 max-h-[77vh] overflow-y-scroll rounded-[16px] sm:rounded-[24px]">
              {getMarketData("ML") && (
                <BettingMarket
                  title="Money Line"
                  data={getMarketData("ML")}
                  showLiquidity
                />
              )}

              <div className="border-[1px] border-[#ffffff] opacity-15 border-solid"></div>
              {getMarketData("FT") && (
                <FullTime
                  title="Full Time Result"
                  data={getMarketData("FT")}
                  showLiquidity
                  homeTeam={eventDetails.homeTeam}
                  awayTeam={eventDetails.awayTeam}
                />
              )}
              <div className="border-[1px] border-[#ffffff] opacity-15 border-solid"></div>
              {getMarketData("DC") && (
                <BettingMarket
                  title="Double Chance"
                  data={getMarketData("DC")}
                  showLiquidity
                />
              )}
              <div className="border-[1px] border-[#ffffff] opacity-15 border-solid"></div>

              {getMarketData("BTTS") && (
                <BTTS
                  title="Both Teams to Score"
                  data={getMarketData("BTTS")}
                  showLiquidity
                />
              )}
              <div className="border-[1px] border-[#ffffff] opacity-15 border-solid"></div>

              {getMarketData("AH") && (
                <AsianHandicap
                  title="Asian Handicap"
                  data={getMarketData("AH")}
                  homeTeam={eventDetails.homeTeam}
                  awayTeam={eventDetails.awayTeam}
                  showLiquidity
                />
              )}
              <div className="border-[1px] border-[#ffffff] opacity-15 border-solid"></div>

              {getMarketData("OU") && (
                <OU
                  title="Over / Under"
                  data={getMarketData("OU")}
                  homeTeam={eventDetails.homeTeam}
                  awayTeam={eventDetails.awayTeam}
                  showLiquidity
                />
              )}
              <div className="border-[1px] border-[#ffffff] opacity-15 border-solid"></div>

              {getComplexMarketData("FT+BTTS") && (
                <ResultandBothTeamstoScore
                  title="Result and Both Teams to Score"
                  data={getComplexMarketData("FT+BTTS")}
                  homeTeam={eventDetails.homeTeam}
                  awayTeam={eventDetails.awayTeam}
                  showLiquidity
                />
              )}
              <div className="border-[1px] border-[#ffffff] opacity-15 border-solid"></div>

              {getComplexMarketData("FT+OU") && (
                <ResultandTotal
                  title="Result and Total"
                  data={getComplexMarketData("FT+OU")}
                  showLiquidity
                />
              )}
              <div className="border-[1px] border-[#ffffff] opacity-15 border-solid"></div>

              {getComplexMarketData("BTTS+OU") && (
                <BothTeamstoScoreandTotal
                  title="Both Teams to Score and Total"
                  data={getComplexMarketData("BTTS+OU")}
                  showLiquidity
                  homeTeam={eventDetails.homeTeam}
                  awayTeam={eventDetails.awayTeam}
                />
              )}
              <div className="border-[1px] border-[#ffffff] opacity-15 border-solid"></div>

              {getComplexMarketData("HTFT") && (
                <HalfTimeFullTime
                  title="Half-time/Full-time"
                  data={getComplexMarketData("HTFT")}
                  showLiquidity
                />
              )}
              <div className="border-[1px] border-[#ffffff] opacity-15 border-solid"></div>
              {getMarketData("TOU") && (
                <TeamOverUnder
                  title="Team Over/Under"
                  data={getMarketData("TOU")}
                  showLiquidity={true}
                  eventDetails={{
                    homeTeam: `${eventDetails.homeTeam}`,
                    awayTeam: `${eventDetails.awayTeam}`,
                  }}
                />
              )}
              <div className="border-[1px] border-[#ffffff] opacity-15 border-solid"></div>
              {getComplexMarketData("CS") && (
                <BettingMarket
                  title="Correct Score"
                  data={getComplexMarketData("CS")}
                  showLiquidity
                />
              )}

              {/* Other market components remain commented out as in the original code */}
            </div>
          </div>
        );

      case "Half Time":
        return (
          <div className="relative w-full  sm:w-[90%] md:w-[100%] ">
            <div className="absolute inset-0 bg-gradient-to-b from-[#49FFDE] to-[#1BA2EE] rounded-[16px]  p-[0.1px] ]">
              <div className="absolute inset-[0.5px]  bg-[#111111] rounded-[15px] sm:rounded-[22px]"></div>
            </div>
            <div className="relative z-10 box-border p-1.5 pt-0 max-h-[77vh] overflow-y-scroll rounded-[16px] sm:rounded-[24px]">
              {getMarketData("ML", "2") && (
                <BettingMarket
                  title="Money Line"
                  data={getMarketData("ML", "2")}
                  showLiquidity
                />
              )}

              <div className="border-[1px] border-[#ffffff] opacity-15 border-solid"></div>
              {getMarketData("FT", "2") && (
                <FullTime
                  title="Full Time Result"
                  data={getMarketData("FT", "2")}
                  showLiquidity
                  homeTeam={eventDetails.homeTeam}
                  awayTeam={eventDetails.awayTeam}
                />
              )}
              <div className="border-[1px] border-[#ffffff] opacity-15 border-solid"></div>
              {getMarketData("DC", "2") && (
                <BettingMarket
                  title="Double Chance"
                  data={getMarketData("DC", "2")}
                  showLiquidity
                />
              )}
              <div className="border-[1px] border-[#ffffff] opacity-15 border-solid"></div>

              {getMarketData("BTTS", "2") && (
                <BTTS
                  title="Both Teams to Score"
                  data={getMarketData("BTTS", "2")}
                  showLiquidity
                />
              )}
              <div className="border-[1px] border-[#ffffff] opacity-15 border-solid"></div>

              {getMarketData("AH", "2") && (
                <AsianHandicap
                  title="Asian Handicap"
                  data={getMarketData("AH", "2")}
                  homeTeam={eventDetails.homeTeam}
                  awayTeam={eventDetails.awayTeam}
                  showLiquidity
                />
              )}
              <div className="border-[1px] border-[#ffffff] opacity-15 border-solid"></div>

              {getMarketData("OU", "2") && (
                <OU
                  title="Over / Under"
                  data={getMarketData("OU", "2")}
                  homeTeam={eventDetails.homeTeam}
                  awayTeam={eventDetails.awayTeam}
                  showLiquidity
                />
              )}
              <div className="border-[1px] border-[#ffffff] opacity-15 border-solid"></div>

              {getComplexMarketData("FT+BTTS", "2") && (
                <ResultandBothTeamstoScore
                  title="Result and Both Teams to Score"
                  data={getComplexMarketData("FT+BTTS", "2")}
                  homeTeam={eventDetails.homeTeam}
                  awayTeam={eventDetails.awayTeam}
                  showLiquidity
                />
              )}
              <div className="border-[1px] border-[#ffffff] opacity-15 border-solid"></div>

              {getComplexMarketData("FT+OU", "2") && (
                <ResultandTotal
                  title="Result and Total"
                  data={getComplexMarketData("FT+OU", "2")}
                  showLiquidity
                />
              )}
              <div className="border-[1px] border-[#ffffff] opacity-15 border-solid"></div>

              {getComplexMarketData("BTTS+OU", "2") && (
                <BothTeamstoScoreandTotal
                  title="Both Teams to Score and Total"
                  data={getComplexMarketData("BTTS+OU", "2")}
                  showLiquidity
                  homeTeam={eventDetails.homeTeam}
                  awayTeam={eventDetails.awayTeam}
                />
              )}
              <div className="border-[1px] border-[#ffffff] opacity-15 border-solid"></div>

              {getComplexMarketData("HTFT", "2") && (
                <HalfTimeFullTime
                  title="Half-time/Full-time"
                  data={getComplexMarketData("HTFT", "2")}
                  showLiquidity
                />
              )}
              {/* <div className='border-[1px] border-[#ffffff] opacity-15 border-solid'></div> */}
              {getMarketData("TOU", "2") && (
                <TeamOverUnder
                  title="Team Over/Under"
                  data={getMarketData("TOU", "2")}
                  showLiquidity={true}
                  eventDetails={{
                    homeTeam: `${eventDetails.homeTeam}`,
                    awayTeam: `${eventDetails.awayTeam}`,
                  }}
                />
              )}
              <div className="border-[1px] border-[#ffffff] opacity-15 border-solid"></div>
              {getComplexMarketData("CS", "2") && (
                <BettingMarket
                  title="Correct Score"
                  data={getComplexMarketData("CS", "2")}
                  showLiquidity
                />
              )}

              {/* Other market components remain commented out as in the original code */}
            </div>
          </div>
        );

      case "Team Totals":
        return (
          <div className="box-border p-1.5 pt-0 max-h-[77vh] overflow-y-scroll bg-[#111111] border border-[#2E2D2D] rounded-[6px]">
            {/* {getMarketData('TOU') && <BettingMarket title="Team Totals" data={getMarketData('TOU')} showLiquidity />} */}
          </div>
        );
      case "Player Props":
        const playerProps = getPlayerProps();
        return playerProps ? (
          <div className="box-border p-1.5 pt-0 max-h-[77vh] overflow-y-scroll bg-[#111111] border border-[#2E2D2D] rounded-[6px]">
            {/* <PlayerProps title="Player Props" data={playerProps} showLiquidity /> */}
          </div>
        ) : null;
      default:
        return null;
    }
  };

  return (
    <div className="">
      <div className="flex overflow-x-auto w-[90%] md:w-[80%] justify-start md:mt-5 p-4 gap-2 z-[100]">
        {["Full Time", "Half Time", "Team Totals", "Player Props"].map(
          (label) => (
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
          )
        )}
      </div>
      {renderMarkets()}
    </div>
  );
};

export default BettingEvents;
