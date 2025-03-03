import { useState, useEffect } from "react";

export default function Highlights() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMatchesAndOdds = async () => {
      try {
        setLoading(true);

        // Step 1: Fetch highlights
        const highlightsResponse = await fetch(
          "https://devapi.purebet.io/v2/highlights?favLeagues=487"
        );

        if (!highlightsResponse.ok) {
          throw new Error(
            `API request failed with status ${highlightsResponse.status}`
          );
        }

        const highlightsData = await highlightsResponse.json();
        const highlightEvents = highlightsData.highlights;

        // Step 2: Get detailed odds for each event
        const matchesWithOdds = await Promise.all(
          highlightEvents.map(async (event) => {
            try {
              const eventResponse = await fetch(
                `https://devapi.purebet.io/v2/events?event=${event.event}`
              );

              if (!eventResponse.ok) {
                console.error(`Failed to fetch odds for event ${event.event}`);
                return transformEventData(event, false, null);
              }

              const eventData = await eventResponse.json();
              return transformEventData(event, false, eventData);
            } catch (err) {
              console.error(
                `Error fetching odds for event ${event.event}:`,
                err
              );
              return transformEventData(event, false, null);
            }
          })
        );

        setMatches(matchesWithOdds);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching match data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMatchesAndOdds();
  }, []);

  // Transform API data to match your component's expected format
  const transformEventData = (event, isFavEvent, detailedEventData) => {
    // Determine if the match is currently live
    const currentTime = Math.floor(Date.now() / 1000);
    const isLive =
      event.startTime <= currentTime && currentTime - event.startTime < 7200;

    // Get odds data - first try to use detailed event data if available
    let odds = { team1: "N/A", draw: "N/A", team2: "N/A" };

    if (
      detailedEventData &&
      detailedEventData.periods &&
      detailedEventData.periods["1"] &&
      detailedEventData.periods["1"].FT
    ) {
      // Get the proper odds from detailed data - including draw odds
      const ftOdds = detailedEventData.periods["1"].FT;

      odds = {
        team1:
          ftOdds.home && ftOdds.home.side0 && ftOdds.home.side0[0]
            ? ftOdds.home.side0[0][0]?.toFixed(2) || "N/A"
            : "N/A",
        draw:
          ftOdds.draw && ftOdds.draw.side0 && ftOdds.draw.side0[0]
            ? ftOdds.draw.side0[0][0]?.toFixed(2) || "N/A"
            : "N/A",
        team2:
          ftOdds.away && ftOdds.away.side0 && ftOdds.away.side0[0]
            ? ftOdds.away.side0[0][0]?.toFixed(2) || "N/A"
            : "N/A",
      };
    } else if (
      isFavEvent &&
      event.periods &&
      event.periods["0"] &&
      event.periods["0"].ML
    ) {
      // Fallback to original data - For favEvents, ML odds
      const mlOdds = event.periods["0"].ML;
      odds = {
        team1: mlOdds.side0[0]?.toFixed(2) || "N/A",
        draw: "N/A", // NBA doesn't have draw odds
        team2: mlOdds.side1[0]?.toFixed(2) || "N/A",
      };
    } else if (
      !isFavEvent &&
      event.periods &&
      event.periods["1"] &&
      event.periods["1"].FT
    ) {
      // Fallback to original data - For highlights, FT odds
      const ftOdds = event.periods["1"].FT.home;
      odds = {
        team1: ftOdds.side0[0]?.toFixed(2) || "N/A",
        draw: "N/A", // API doesn't directly provide draw odds in this format
        team2: ftOdds.side1[0]?.toFixed(2) || "N/A",
      };
    }

    // Determine sport type for icon selection
    const sportIcon =
      event.sport === 4 ? "/basketball-icon.svg" : "/football-icon.svg";

    // Format match time
    const matchDate = new Date(event.startTime * 1000);
    const formattedDate = matchDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
    const formattedTime = matchDate.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });

    return {
      team1: event.homeTeam,
      team2: event.awayTeam,
      live: isLive,
      matchTime: `${formattedDate}, ${formattedTime}`,
      odds: odds,
      imgSrc: sportIcon,
      event: event.event, // Include the event ID
      sport: event.sport,
      league: event.league,
    };
  };

  if (loading) {
    return <div className="p-4 text-neutral-400">Loading matches...</div>;
  }

  if (error) {
    return (
      <div className="p-4 text-red-500">Error loading matches: {error}</div>
    );
  }

  // No need to repeat matches
  const displayMatches = matches;

  return (
    <>
      <div className="flex overflow-x-auto max-w-[21rem] md:max-w-full gap-5 mt-2 max-md:flex-nowrap">
        {displayMatches.map((match, index) => (
          <div
            key={index}
            onClick={() =>
              (window.location.href = `/events?event=${match.event}`)
            }
            className="flex flex-col justify-center text-start p-2.5 rounded-md border border-solid shadow-sm border-zinc-800 min-w-fit"
          >
            <div className="flex gap-1 w-full  text-start justify-start items-start">
              <img
                loading="lazy"
                src={match.imgSrc}
                className="shrink-0 w-3.5 aspect-square"
              />
              <div className="flex items-center justify-center mx-1 self-start w-full">
                <div className="text-sm  w-full text-neutral-400">
                  <span className="text-zinc-300">{match.team1}</span>{" "}
                  <span className="font-light">vs</span>{" "}
                  <span className="text-zinc-300">{match.team2}</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2.5 px-0.5 mt-6 text-center">
              <div className="flex flex-col justify-end align-middle items-center w-20 hover:cursor-pointer">
                <div className="text-xs text-neutral-400">{match.team1}</div>
                <div className=" flex justify-center px-5 py-1.5 mt-1.5 text-xs font-medium text-white rounded border border-solid bg-stone-900 border-white border-opacity-10 w-20">
                  {match.odds.team1}
                </div>
              </div>
              <div className="flex flex-col justify-end align-middle items-center w-20 hover:cursor-pointer">
                <div className="self-center text-xs text-neutral-400">Draw</div>
                <div className=" flex w-20 justify-center px-5 py-1.5 mt-1.5 text-xs font-medium text-white rounded border border-solid bg-stone-900 border-white border-opacity-10">
                  {match.odds.draw}
                </div>
              </div>
              <div className="flex flex-col justify-end align-middle items-center w-20 hover:cursor-pointer">
                <div className="text-xs text-neutral-400">{match.team2}</div>
                <div className="flex w-20 justify-center px-5 py-1.5 mt-1.5 text-xs font-medium text-white whitespace-nowrap rounded border border-solid bg-stone-900 border-white border-opacity-10">
                  {match.odds.team2}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
