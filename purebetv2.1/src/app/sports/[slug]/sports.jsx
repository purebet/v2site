import { useState, useEffect, React } from "react";
import { MdOutlineSportsSoccer } from "react-icons/md";
import { HiChevronDown, HiChevronRight } from "react-icons/hi2";
import useSports from "../../hooks/useSports";
import EventCard from "../../components/EventCard";
import sportsIcons from "../../utils/sportsIcons";
import Image from "next/image";
// import flagData from "../../utils/countrynametocode"
import getFlagUrl from "../../utils/getFlagUrl";
import Cookies from "js-cookie";
import { hashWallet } from "@purebet/sports-betting-wallet-nickname";

export default function Sports() {
  // Function to get the flag URL based on the league name

  const { sports, sportName, leagues, loading, error } = useSports(); // Use appropriate sport ID
  const [expandedLeagues, setExpandedLeagues] = useState({});

  const nickname = hashWallet("Premier League");
  console.log(nickname);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const leaguesa =
    sports && sports[sportName] ? Object.values(sports[sportName]) : {};
  console.log(leagues);
  const toggleLeague = (leagueId) => {
    setExpandedLeagues((prev) => ({
      ...prev,
      [leagueId]: !prev[leagueId],
    }));
  };

  const normalizedSportName = sportName
    ? sportName.toLowerCase().replace(/\s+/g, "")
    : "";
  const sport = sportsIcons[normalizedSportName] || {};
  const SportIcon = sport.icon ? sport.icon : null;

  return (
    <div className="bg-black border-2 md:mx-3 md:m-0 m-4 overflow-x-hidden rounded-lg border-[#222222] text-white p-6 max-h-screen md:min-h-screen">
      <div className="mx-auto">
        <div className="flex items-center space-x-2 mb-4">
          {SportIcon ? (
            <SportIcon style={{ width: "35px", height: "35px" }} />
          ) : (
            sport.src && (
              <Image src={sport.src} alt={sportName} width={35} height={35} />
            )
          )}

          <h1 className="text-2xl font-bold">{sportName}</h1>
        </div>
        <p className="text-muted-foreground mb-6">Top Leagues </p>
        <div className="space-y-4">
          {Object.keys(leaguesa).length > 0 ? (
            leaguesa.map((league) => (
              <div key={league.leagueId}>
                <div
                  className="flex items-center justify-between p-4 bg-[#1c1c1c] rounded-md cursor-pointer "
                  onClick={() => toggleLeague(league.leagueId)}
                >
                  <div>
                    <h2 className="text-lg font-semibold flex justify-center items-center">
                      {getFlagUrl(league.leagueName) && (
                        <img
                          src={getFlagUrl(league.leagueName)}
                          alt={league.leagueName}
                          className="w-6 h-6"
                        />
                      )}{" "}
                      &nbsp; {league.leagueName}
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      {league.events.length} events
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <StarIcon
                      leagueId={league.leagueId}
                      leagueName={league.leagueName}
                    />

                    {expandedLeagues[league.leagueId] ? (
                      <HiChevronDown className="w-5 h-5 text-muted-foreground" />
                    ) : (
                      <HiChevronRight className="w-5 h-5 text-muted-foreground" />
                    )}
                  </div>
                </div>
                {expandedLeagues[league.leagueId] && (
                  <div className="space-y-4">
                    {league.events.map((event) => (
                      <EventCard key={event.event} event={event} />
                    ))}
                  </div>
                )}
              </div>
            ))
          ) : (
            <p>No leagues found for {sportName}</p>
          )}
          {/* <div class="absolute w-[1286px] h-[287px] left-[272.78px] bottom-[0] bg-gradient-to-br from-[#00F0FF]/[0.2] to-[#0057FF]/[0.2] filter blur-[133.2px] rotate-[-5.94deg] z-[]"></div> */}
        </div>
      </div>
    </div>
  );
}

function StarIcon({ leagueId, leagueName }) {
  const [isFavorited, setIsFavorited] = useState(false);

  const handleStarClick = () => {
    // Use leagueId or leagueName as the "wallet address" for hashing
    const walletAddress = leagueId || leagueName || "0"; // Fallback to "0" if needed
    const nickname = hashWallet(walletAddress); // Generate nickname

    // Get the current favorite leagues from the cookie
    const favoriteLeagues = Cookies.get("favoriteLeagues")
      ? JSON.parse(Cookies.get("favoriteLeagues"))
      : [];

    // Check if the league is already favorited
    const isAlreadyFavorited = favoriteLeagues.some(
      (league) => league.leagueId === leagueId
    );

    if (!isAlreadyFavorited) {
      // Add the new league to the favorites
      const updatedFavorites = [
        ...favoriteLeagues,
        { leagueId, leagueName, nickname },
      ];

      // Set the updated favorites in the cookie
      Cookies.set("favoriteLeagues", JSON.stringify(updatedFavorites), {
        expires: 365, // Cookie expires in 1 year
      });

      // Update the state to reflect the favorited status
      setIsFavorited(true);

      console.log("League favorited:", { leagueId, leagueName, nickname });
    } else {
      // Remove the league from favorites if it's already favorited
      const updatedFavorites = favoriteLeagues.filter(
        (league) => league.leagueId !== leagueId
      );

      // Update the cookie
      Cookies.set("favoriteLeagues", JSON.stringify(updatedFavorites), {
        expires: 365,
      });

      // Update the state to reflect the unfavorited status
      setIsFavorited(false);

      console.log("League unfavorited:", { leagueId, leagueName });
    }
  };

  return (
    <svg
      onClick={handleStarClick}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill={isFavorited ? "gold" : "none"} // Change fill color if favorited
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-5 h-5 text-muted-foreground cursor-pointer"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}
