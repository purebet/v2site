import useNext from "@/src/app/hooks/useNext";
import { formatDate } from "@/src/app/utils/formatDate";
import truncateText from "@/src/app/utils/truncateText";
import getOdds from "@/src/app/utils/getOdds";
export default function Upcoming() {
  const { leagues, loading, error } = useNext();



  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        leagues.map((event) => {
          const odds = getOdds(event);
          return (
            <div key={event.event} className="flex gap-5 justify-between px-3.5 py-2 mt-3 w-full text-center rounded-md border border-solid shadow-sm border-zinc-800 max-md:flex-wrap max-md:pr-5 max-md:max-w-full">
              <div className="flex flex-col my-auto items-start">
                <div className="text-xl text-neutral-400">
                  <span className="text-zinc-300">{event.eventName}</span>
                </div>
                <div className="mt-1.5 text-xs font-medium text-neutral-500 self-start">
                  {formatDate(event.startTime)}
                </div>
              </div>
              <div className="flex gap-2.5 font-medium text-white">
                <div className="flex flex-col whitespace-nowrap">
                  <div className="self-center text-xs">{truncateText(event.homeTeam, 8)}</div>
                  <div className="justify-center max-w-26 min-w-26 px-9 py-2 mt-1.5 text-sm rounded border border-solid bg-zinc-900 border-white border-opacity-10 max-md:px-5">
                    {odds.home}
                  </div>
                </div>
                <div className="flex flex-col whitespace-nowrap">
                  <div className="self-center text-xs">Draw</div>
                  <div className="justify-center  max-w-26 min-w-26 px-8 py-2 mt-1.5 text-sm rounded border border-solid bg-zinc-900 border-white border-opacity-10 max-md:px-5">
                    {odds.draw}
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="self-center text-xs">{truncateText(event.awayTeam, 8)}</div>
                  <div className="justify-center  max-w-26 min-w-26 px-8 py-2 mt-1.5 text-sm whitespace-nowrap rounded border border-solid bg-zinc-900 border-white border-opacity-10 max-md:px-5">
                    {odds.away}
                  </div>
                </div>
              </div>
            </div>
          );
        })
      )}
    </>
  );
}
