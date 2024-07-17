import { useState, useEffect } from 'react';
  import { MdOutlineSportsSoccer } from "react-icons/md";
import { HiChevronDown, HiChevronRight } from "react-icons/hi2";
import useSports from "@/app/hooks/useSports";
import EventCard from "@/app/components/EventCard";

export default function Sports() {
  


  const { sports, sportName, leagues, loading, error } = useSports(); // Use appropriate sport ID
  const [expandedLeagues, setExpandedLeagues] = useState({});

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const leaguesa = sports && sports[sportName] ? Object.values(sports[sportName]):{};
console.log(leagues)
  const toggleLeague = (leagueId) => {
    setExpandedLeagues(prev => ({
      ...prev,
      [leagueId]: !prev[leagueId]
    }));
  };

  return (
    <div className="bg-black border-2 md:mx-3 md:m-0 m-4 overflow-x-hidden rounded-lg border-[#222222] text-white p-6 max-h-screen md:min-h-screen">
      <div className="mx-auto">
        <div className="flex items-center space-x-2 mb-4">
          <MdOutlineSportsSoccer style={{ width: '35px', height: '35px' }} />
          <h1 className="text-2xl font-bold">{sportName}</h1>
        </div>
        <p className="text-muted-foreground mb-6">Top Leagues</p>
        <div className="space-y-4">
        {Object.keys(leaguesa).length > 0 ? (
      leaguesa.map((league) => (
            <div key={league.leagueId}>
              <div
                className="flex items-center justify-between p-4 bg-[#1c1c1c] rounded-md cursor-pointer"
                onClick={() => toggleLeague(league.leagueId)}
              >
                <div>
                  <h2 className="text-lg font-semibold">{league.leagueName}</h2>
                  <p className="text-sm text-muted-foreground">{league.events.length} events</p>
                </div>
                <div className="flex items-center space-x-2">
                <StarIcon className="w-5 h-5 text-muted-foreground" />

                  {expandedLeagues[league.leagueId] ? (
                    <HiChevronDown className="w-5 h-5 text-muted-foreground" />
                  ) : (
                    <HiChevronRight className="w-5 h-5 text-muted-foreground" />
                  )}
                </div>
              </div>
              {expandedLeagues[league.leagueId] && (
                <div className="space-y-4">
                  {league.events.map(event => (
                    <EventCard key={event.event} event={event} />
                  ))}
                </div>
              )}
            </div>
         ))
        ) : (
          <p>No leagues found for {sportName}</p>
        )}
        </div>
      </div>
    </div>
  );
}


function StarIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}
