import { matches } from "../demodata";

export default function Highlights(){
    const repeatedMatches = matches.concat(matches, matches);

    return(
        <>
<div className="flex text-center overflow-x-auto gap-5 mt-2 max-md:flex-wrap">
        {repeatedMatches.map((match, index) => (
            <div key={index} className="flex flex-col flex-wrap justify-center content-center p-2.5 rounded-md border border-solid shadow-sm border-zinc-800">
              <div className="flex gap-1">
                <img
                  loading="lazy"
                  src={match.imgSrc}
                  className="shrink-0 w-3.5 aspect-square"
                />
                <div className="flex items-center justify-center mx-1  self-start">
                  <div className="text-xs text-neutral-400">
                    <span className="text-zinc-300">{match.team1}</span>{" "}
                    <span className="font-light">vs</span>{" "}
                    <span className="text-zinc-300">{match.team2}</span>
                  </div>
                  {match.live && (
                    <div className="justify-center  mx-1 px-1 text-xs font-medium text-red-600 whitespace-nowrap rounded-md border border-red-700 border-solid bg-red-800 bg-opacity-30">
                      Live
                    </div>
                  )}
                </div>
              </div>
              <div className="flex gap-2.5 px-0.5 mt-6">
                <div className="flex flex-col whitespace-nowrap">
                  <div className="text-xs text-neutral-400">{match.team1}</div>
                  <div className="justify-center px-5 py-1.5 mt-1.5 text-xs font-medium text-white rounded border border-solid bg-stone-900 border-white border-opacity-10">
                    {match.odds.team1}
                  </div>
                </div>
                <div className="flex flex-col whitespace-nowrap">
                  <div className="self-center text-xs text-neutral-400">Draw</div>
                  <div className="justify-center px-5 py-1.5 mt-1.5 text-xs font-medium text-white rounded border border-solid bg-stone-900 border-white border-opacity-10">
                    {match.odds.draw}
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="text-xs text-neutral-400">Czech Re..</div>
                  <div className="justify-center px-5 py-1.5 mt-1.5 text-xs font-medium text-white whitespace-nowrap rounded border border-solid bg-stone-900 border-white border-opacity-10">
                    {match.odds.team2}
                  </div>
                </div>
              </div>
            </div>
          ))}
         </div>
        </>
    )
}