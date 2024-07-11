/// currently just recreating the ui



import * as React from "react";
import Topleagues from "./sections/Topleagues";
import Highlights from "./sections/Highlights";
export default function Home() {


return (
  <div className="flex max-w-[930px] overflow-y-auto  max-h-screen mx-auto flex-col pt-2.5 rounded-lg border border-solid shadow-2xl backdrop-blur-[5.650000095367432px]  bg-neutral-950 border-neutral-800 ">
   
    <div className="flex flex-col py-3.5 pl-6 w-full  max-md:pl-5 max-md:max-w-full">
    <div className="text-base  bg-gradient-to-b from-white to-black font-semibold text-transparent bg-clip-text max-md:max-w-full">
        Top Leagues //to do
      </div>
      <Topleagues />
    </div>
    <div className="flex flex-col py-3.5 pl-6 w-full  max-md:pl-5 max-md:max-w-full">
    <div className="text-base  bg-gradient-to-b from-white to-black font-semibold text-transparent bg-clip-text max-md:max-w-full">
        Highlights //to do
      </div>
      <Highlights />
              
    </div>
    <div className="flex z-10 flex-col px-6 pt-2.5 pb-0.5 -mt-3 w-full max-md:px-5 max-md:max-w-full overflow-y-auto">
        <div className="text-base bg-gradient-to-b from-white to-black font-semibold text-transparent bg-clip-text max-md:max-w-full">
          Upcoming
        </div>

        <div className="flex gap-5 justify-between px-3.5 py-2 mt-3 w-full text-center rounded-md border border-solid shadow-sm border-zinc-800 max-md:flex-wrap max-md:pr-5 max-md:max-w-full">
          <div className="flex flex-col my-auto">
            <div className="text-xl text-neutral-400">
              <span className="text-zinc-300">Georgia</span>{" "}
              <span className="font-light">vs</span>{" "}
              <span className="text-zinc-300">Czech Republic</span>
            </div>
            <div className="mt-1.5 -ml-32 text-xs font-medium text-neutral-500">
              Sat, Jun 22 6:30 PM
            </div>
          </div>
          <div className="flex gap-2.5 font-medium text-white">
            <div className="flex flex-col whitespace-nowrap">
              <div className="self-center text-xs">Georgia</div>
              <div className="justify-center px-9 py-2 mt-1.5 text-sm rounded border border-solid bg-zinc-900 border-white border-opacity-10 max-md:px-5">
                1.93
              </div>
            </div>
            <div className="flex flex-col whitespace-nowrap">
              <div className="self-center text-xs">Draw</div>
              <div className="justify-center px-8 py-2 mt-1.5 text-sm rounded border border-solid bg-zinc-900 border-white border-opacity-10 max-md:px-5">
                3.56
              </div>
            </div>
            <div className="flex flex-col">
              <div className="self-center text-xs">Czech Re..</div>
              <div className="justify-center px-8 py-2 mt-1.5 text-sm whitespace-nowrap rounded border border-solid bg-zinc-900 border-white border-opacity-10 max-md:px-5">
                4.58
              </div>
            </div>
          </div>
        </div>

      <div className="flex gap-5 justify-between px-3.5 py-2 mt-3 w-full text-center rounded-md border border-solid shadow-sm border-zinc-800 max-md:flex-wrap max-md:pr-5 max-md:max-w-full">
        <div className="flex flex-col justify-center my-auto">
          <div className="text-xl text-neutral-400">
            <span className="text-zinc-300">Georgia</span>{" "}
            <span className="font-light">vs</span>{" "}
            <span className="text-zinc-300">Czech Republic</span>
          </div>
          <div className="mt-1.5 -ml-32 text-xs font-medium text-neutral-500">
            Sat, Jun 22 6:30 PM
          </div>
        </div>
        <div className="flex gap-2.5 font-medium text-white">
          <div className="flex flex-col whitespace-nowrap">
            <div className="self-center text-xs">Georgia</div>
            <div className="justify-center px-9 py-2 mt-1.5 text-sm rounded border border-solid bg-zinc-900 border-white border-opacity-10 max-md:px-5">
              1.93
            </div>
          </div>
          <div className="flex flex-col whitespace-nowrap">
            <div className="self-center text-xs">Draw</div>
            <div className="justify-center px-8 py-2 mt-1.5 text-sm rounded border border-solid bg-zinc-900 border-white border-opacity-10 max-md:px-5">
              3.56
            </div>
          </div>
          <div className="flex flex-col">
            <div className="self-center text-xs">Czech Re..</div>
            <div className="justify-center px-8 py-2 mt-1.5 text-sm whitespace-nowrap rounded border border-solid bg-zinc-900 border-white border-opacity-10 max-md:px-5">
              4.58
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-5 justify-between px-3.5 py-2 mt-3 w-full text-center rounded-md border border-solid shadow-sm border-zinc-800 max-md:flex-wrap max-md:pr-5 max-md:max-w-full">
        <div className="flex flex-col justify-center my-auto">
          <div className="text-xl text-neutral-400">
            <span className="text-zinc-300">Georgia</span>{" "}
            <span className="font-light">vs</span>{" "}
            <span className="text-zinc-300">Czech Republic</span>
          </div>
          <div className="mt-1.5 -ml-32 text-xs font-medium text-neutral-500">
            Sat, Jun 22 6:30 PM
          </div>
        </div>
        <div className="flex gap-2.5 font-medium text-white">
          <div className="flex flex-col whitespace-nowrap">
            <div className="self-center text-xs">Georgia</div>
            <div className="justify-center px-9 py-2 mt-1.5 text-sm rounded border border-solid bg-zinc-900 border-white border-opacity-10 max-md:px-5">
              1.93
            </div>
          </div>
          <div className="flex flex-col whitespace-nowrap">
            <div className="self-center text-xs">Draw</div>
            <div className="justify-center px-8 py-2 mt-1.5 text-sm rounded border border-solid bg-zinc-900 border-white border-opacity-10 max-md:px-5">
              3.56
            </div>
          </div>
          <div className="flex flex-col">
            <div className="self-center text-xs">Czech Re..</div>
            <div className="justify-center px-8 py-2 mt-1.5 text-sm whitespace-nowrap rounded border border-solid bg-zinc-900 border-white border-opacity-10 max-md:px-5">
              4.58
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-5 justify-between px-3.5 py-2 mt-3 w-full text-center rounded-md border border-solid shadow-sm border-zinc-800 max-md:flex-wrap max-md:pr-5 max-md:max-w-full">
        <div className="flex flex-col justify-center my-auto">
          <div className="text-xl text-neutral-400">
            <span className="text-zinc-300">Georgia</span>{" "}
            <span className="font-light">vs</span>{" "}
            <span className="text-zinc-300">Czech Republic</span>
          </div>
          <div className="mt-1.5 -ml-32 text-xs font-medium text-neutral-500">
            Sat, Jun 22 6:30 PM
          </div>
        </div>
        <div className="flex gap-2.5 font-medium text-white">
          <div className="flex flex-col whitespace-nowrap">
            <div className="self-center text-xs">Georgia</div>
            <div className="justify-center px-9 py-2 mt-1.5 text-sm rounded border border-solid bg-zinc-900 border-white border-opacity-10 max-md:px-5">
              1.93
            </div>
          </div>
          <div className="flex flex-col whitespace-nowrap">
            <div className="self-center text-xs">Draw</div>
            <div className="justify-center px-8 py-2 mt-1.5 text-sm rounded border border-solid bg-zinc-900 border-white border-opacity-10 max-md:px-5">
              3.56
            </div>
          </div>
          <div className="flex flex-col">
            <div className="self-center text-xs">Czech Re..</div>
            <div className="justify-center px-8 py-2 mt-1.5 text-sm whitespace-nowrap rounded border border-solid bg-zinc-900 border-white border-opacity-10 max-md:px-5">
              4.58
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
}