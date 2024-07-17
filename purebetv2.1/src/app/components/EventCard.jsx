import getOdds from "../utils/getOdds";
import truncateText from "../utils/truncateText";
import { formatDate, formatTime } from "../utils/formatDate";

export default function EventCard({ event }) {
  const odds = getOdds(event);
  return (
    <div className="flex gap-5 justify-between px-3.5 py-2 mt-3 w-full text-center rounded-md border border-solid shadow-sm border-zinc-800 max-md:flex-wrap max-md:pr-5 max-md:max-w-full">
      <div className="flex flex-col my-auto items-start">
        <div className="text-xl hidden md:flex  text-neutral-400">
        <div className=" w-14 h-7 font-poppins font-semibold text-lg leading-7 text-center text-white flex items-center justify-center">
  <span>{formatTime(event.startTime)}</span>
</div>


          <div className="text-zinc-300 mx-10 ">{event.eventName}</div>
        </div>
        <div className="mt-1.5 text-xs font-medium text-neutral-500 self-start">
        <div className="md:hidden w-14 h-7 font-poppins font-semibold text-lg leading-7 text-center text-white flex items-center justify-center">
  <span>{formatTime(event.startTime)}</span>
</div>


          <div className="hidden md:block">{formatDate(event.startTime)}</div>
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
          <div className="justify-center max-w-26 min-w-26 px-8 py-2 mt-1.5 text-sm rounded border border-solid bg-zinc-900 border-white border-opacity-10 max-md:px-5">
            {odds.draw}
          </div>
        </div>
        <div className="flex flex-col">
          <div className="self-center text-xs">{truncateText(event.awayTeam, 8)}</div>
          <div className="justify-center max-w-26 min-w-26 px-8 py-2 mt-1.5 text-sm whitespace-nowrap rounded border border-solid bg-zinc-900 border-white border-opacity-10 max-md:px-5">
            {odds.away}
          </div>
        </div>
      </div>
    </div>
  );
}
