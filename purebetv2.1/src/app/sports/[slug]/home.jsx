/// currently just recreating the ui

import * as React from "react";
import Topleagues from "./sections/Topleagues";
import Highlights from "./sections/Highlights";
import Upcoming from "./sections/Upcoming";
export default function Home() {
  return (
    // <div className="flex max-w-[930px] ml-3 overflow-y-auto  max-h-screen md:mx-auto flex-col pt-2.5 rounded-lg border border-solid shadow-2xl backdrop-blur-[5.650000095367432px]  bg-neutral-950 border-neutral-800 ">
    <div className="bg-black md:w-[63vw] w-[92vw]   overflow-hidden overflow-y-auto border-2 md:mx-3 md:m-0 m-4 rounded-lg border-[#222222] text-white  max-h-screen min-h-screen">
      <div className="flex flex-col py-3.5 pl-6  max-md:pl-5 max-md:max-w-full">
        <div className="text-base  bg-gradient-to-b from-white to-black font-semibold text-transparent bg-clip-text max-md:max-w-full">
          Top Leagues
        </div>
        <Topleagues />
      </div>
      <div className="flex flex-col py-3.5 pl-6 w-full  max-md:pl-5 max-md:max-w-full">
        <div className="text-base  bg-gradient-to-b from-white to-black font-semibold text-transparent bg-clip-text max-md:max-w-full">
          Highlights
        </div>
        <Highlights />
      </div>
      <div className="flex z-10 flex-col px-6 pt-2.5 pb-0.5 -mt-3 w-full max-md:px-5 max-md:max-w-full overflow-y-auto">
        <div className="text-base bg-gradient-to-b from-white to-black font-semibold text-transparent bg-clip-text max-md:max-w-full">
          Upcoming
        </div>
        <Upcoming />
      </div>
    </div>
  );
}
