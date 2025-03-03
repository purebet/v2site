import { useState, useEffect } from "react";

export default function Topleagues() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://devapi.purebet.io/v2/highlights?favLeagues=487"
        );

        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
        }

        const data = await response.json();

        // Combine favEvents and highlights arrays if needed
        const combinedMatches = [
          ...data.favEvents.map((event) => transformEventData(event, true)),
          // ...data.highlights.map((event) => transformEventData(event, false)),
        ];

        setMatches(combinedMatches);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching match data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, []);

  // Transform API data to match your component's expected format
  const transformEventData = (event, isFavEvent) => {
    // Determine if the match is currently live (this is a simplified approach)
    // You might need to adjust this based on your actual data
    const currentTime = Math.floor(Date.now() / 1000);
    const isLive =
      event.startTime <= currentTime && currentTime - event.startTime < 7200; // Assuming a match lasts ~2 hours

    // Get odds data based on whether it's a favEvent or highlight
    let odds = { team1: "N/A", draw: "N/A", team2: "N/A" };

    if (
      isFavEvent &&
      event.periods &&
      event.periods["0"] &&
      event.periods["0"].ML
    ) {
      // For favEvents, ML odds
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
      // For highlights, FT odds (football has 3-way odds with draw)
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

    return {
      team1: event.homeTeam,
      team2: event.awayTeam,
      live: isLive,
      odds: odds,
      imgSrc: sportIcon,
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

  // Repeat matches array to match your original logic if needed
  const displayMatches =
    matches.length > 3 ? matches : matches.concat(matches, matches);

  return (
    <>
      <div className="flex overflow-x-auto max-w-[21rem] md:max-w-full gap-5 mt-2 max-md:flex-nowrap">
        {displayMatches.map((match, index) => (
          <div
            key={index}
            className="flex flex-col justify-center p-2.5 rounded-md border border-solid shadow-sm border-zinc-800 min-w-fit"
          >
            <div className="flex gap-1">
              <img
                loading="lazy"
                src={match.imgSrc}
                className="shrink-0 w-3.5 aspect-square"
              />
              <div className="flex items-center justify-center mx-1 self-start">
                <div className="text-xs text-neutral-400">
                  <span className="text-zinc-300">{match.team1}</span>{" "}
                  <span className="font-light">vs</span>{" "}
                  <span className="text-zinc-300">{match.team2}</span>
                </div>

                <div className="justify-center mx-1 px-1 text-xs font-medium text-red-600 whitespace-nowrap rounded-md border border-red-700 border-solid bg-red-800 bg-opacity-30">
                  Live
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
