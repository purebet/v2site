import useNext from "@/src/app/hooks/useNext";
import { formatTime, getEventDay } from "@/src/app/utils/formatDate";
import truncateText from "@/src/app/utils/truncateText";
import getOdds from "@/src/app/utils/getOdds";
export default function Upcoming() {
  const { leagues, loading, error } = useNext();

  console.log(leagues, "this is upcoming events ");

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
            <div
              onClick={() =>
                (window.location.href = `/events?event=${event.event}`)
              }
              key={event.event}
              className="flex gap-5 justify-between px-3.5 py-2 mt-3 w-full text-center rounded-md border border-solid shadow-sm border-zinc-800 max-md:flex-wrap max-md:pr-5 max-md:max-w-full"
            >
              <div className="flex flex-col my-auto items-start">
                <div className=" text-neutral-400">
                  <span className="text-zinc-300 text-sm md:text-xl">
                    {event.eventName}
                  </span>
                </div>
                <div className="mt-1.5 text-xs font-medium text-neutral-500 self-start">
                  {getEventDay(event.startTime)} at{" "}
                  {formatTime(event.startTime)}
                </div>
              </div>
              <div className="flex gap-2.5 font-medium text-white">
                <div className="flex flex-col whitespace-nowrap hover:cursor-pointer">
                  <div className="self-center text-xs">
                    {truncateText(event.homeTeam, 8)}
                  </div>
                  <div className="justify-center max-w-26 min-w-26 px-9 py-2 mt-1.5 text-sm rounded border border-solid bg-custom-blue-o border-white border-opacity-10 max-md:px-5">
                    {odds.home}
                  </div>
                </div>
                <div className="flex flex-col whitespace-nowrap hover:cursor-pointer">
                  <div className="self-center text-xs">Draw</div>
                  <div className="justify-center  max-w-26 min-w-26 px-8 py-2 mt-1.5 text-sm rounded border border-solid bg-custom-blue-o border-white border-opacity-10 max-md:px-5">
                    {odds.draw}
                  </div>
                </div>
                <div className="flex flex-col hover:cursor-pointer">
                  <div className="self-center text-xs">
                    {truncateText(event.awayTeam, 8)}
                  </div>
                  <div className="justify-center  max-w-26 min-w-26 px-8 py-2 mt-1.5 text-sm whitespace-nowrap rounded border border-solid bg-custom-blue-o border-white border-opacity-10 max-md:px-5">
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
