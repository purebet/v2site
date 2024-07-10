/// currently just recreating the ui



import * as React from "react";

export default function Home() {
return (
  <div className="flex flex-col pt-2.5 rounded-lg border border-solid shadow-2xl backdrop-blur-[5.650000095367432px] mx-4 bg-neutral-950 border-neutral-800 ">
    <div className="text-base pl-6 font-semibold bg-clip-text max-md:max-w-full">
        Top Leagues
      </div>
    <div className="flex flex-col py-3.5 pl-6 w-full text-center max-md:pl-5 max-md:max-w-full">
     
      <div className="flex overflow-x-auto gap-5 mt-2 max-md:flex-wrap">
        <div className="flex flex-col flex-wrap justify-center content-center p-2.5 rounded-md border border-solid shadow-sm border-zinc-800">
          <div className="flex gap-1">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/ebdef930029d7aed2dbc315c14898f073f2c4256605c0663a9e7f2238575fa19?apiKey=d1ee9f6275604677bd2583ecebeab853&"
              className="shrink-0 w-3.5 aspect-square"
            />
            <div className="flex gap-5 self-start">
              <div className="text-xs text-neutral-400">
                <span className="text-zinc-300">Georgia</span>{" "}
                <span className="font-light">vs</span>{" "}
                <span className="text-zinc-300">Czech Republic</span>
              </div>
              <div className="justify-center px-2.5 py-0.5 text-xs font-medium text-red-600 whitespace-nowrap rounded-md border border-red-700 border-solid bg-red-800 bg-opacity-30">
                Live
              </div>
            </div>
          </div>
          <div className="flex gap-2.5 px-0.5 mt-6">
            <div className="flex flex-col whitespace-nowrap">
              <div className="text-xs text-neutral-400">Georgia</div>
              <div className="justify-center px-5 py-1.5 mt-1.5 text-xs font-medium text-white rounded border border-solid bg-stone-900 border-white border-opacity-10">
                1.93
              </div>
            </div>
            <div className="flex flex-col whitespace-nowrap">
              <div className="self-center text-xs text-neutral-400">Draw</div>
              <div className="justify-center px-5 py-1.5 mt-1.5 text-xs font-medium text-white rounded border border-solid bg-stone-900 border-white border-opacity-10">
                3.56
              </div>
            </div>
            <div className="flex flex-col">
              <div className="text-xs text-neutral-400">Czech Re..</div>
              <div className="justify-center px-5 py-1.5 mt-1.5 text-xs font-medium text-white whitespace-nowrap rounded border border-solid bg-stone-900 border-white border-opacity-10">
                4.58
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-wrap justify-center content-center p-2.5 rounded-md border border-solid shadow-sm border-zinc-800">
          <div className="flex gap-1">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/bc8b3a5cc208ca19624bd07e25c69f411a825855029849d0ae389e8f701adaef?apiKey=d1ee9f6275604677bd2583ecebeab853&"
              className="shrink-0 w-3.5 aspect-square"
            />
            <div className="flex gap-5 self-start">
              <div className="text-xs text-neutral-400">
                <span className="text-zinc-300">Georgia</span>{" "}
                <span className="font-light">vs</span>{" "}
                <span className="text-zinc-300">Czech Republic</span>
              </div>
              <div className="justify-center px-2.5 py-0.5 text-xs font-medium text-red-600 whitespace-nowrap rounded-md border border-red-700 border-solid bg-red-800 bg-opacity-30">
                Live
              </div>
            </div>
          </div>
          <div className="flex gap-2.5 px-0.5 mt-6">
            <div className="flex flex-col whitespace-nowrap">
              <div className="text-xs text-neutral-400">Georgia</div>
              <div className="justify-center px-5 py-1.5 mt-1.5 text-xs font-medium text-white rounded border border-solid bg-stone-900 border-white border-opacity-10">
                1.93
              </div>
            </div>
            <div className="flex flex-col whitespace-nowrap">
              <div className="self-center text-xs text-neutral-400">Draw</div>
              <div className="justify-center px-5 py-1.5 mt-1.5 text-xs font-medium text-white rounded border border-solid bg-stone-900 border-white border-opacity-10">
                3.56
              </div>
            </div>
            <div className="flex flex-col">
              <div className="text-xs text-neutral-400">Czech Re..</div>
              <div className="justify-center px-5 py-1.5 mt-1.5 text-xs font-medium text-white whitespace-nowrap rounded border border-solid bg-stone-900 border-white border-opacity-10">
                4.58
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-wrap justify-center content-center p-2.5 rounded-md border border-solid shadow-sm border-zinc-800">
          <div className="flex gap-1">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/428b2fdbba258beb804185417c61358ce68b405a6e8d2f339e14a5fbb2d28bd3?apiKey=d1ee9f6275604677bd2583ecebeab853&"
              className="shrink-0 w-3.5 aspect-square"
            />
            <div className="flex gap-5 self-start">
              <div className="text-xs text-neutral-400">
                <span className="text-zinc-300">Georgia</span>{" "}
                <span className="font-light">vs</span>{" "}
                <span className="text-zinc-300">Czech Republic</span>
              </div>
              <div className="justify-center px-2.5 py-0.5 text-xs font-medium text-red-600 whitespace-nowrap rounded-md border border-red-700 border-solid bg-red-800 bg-opacity-30">
                Live
              </div>
            </div>
          </div>
          <div className="flex gap-2.5 px-0.5 mt-6">
            <div className="flex flex-col whitespace-nowrap">
              <div className="text-xs text-neutral-400">Georgia</div>
              <div className="justify-center px-5 py-1.5 mt-1.5 text-xs font-medium text-white rounded border border-solid bg-stone-900 border-white border-opacity-10">
                1.93
              </div>
            </div>
            <div className="flex flex-col whitespace-nowrap">
              <div className="self-center text-xs text-neutral-400">Draw</div>
              <div className="justify-center px-5 py-1.5 mt-1.5 text-xs font-medium text-white rounded border border-solid bg-stone-900 border-white border-opacity-10">
                3.56
              </div>
            </div>
            <div className="flex flex-col">
              <div className="text-xs text-neutral-400">Czech Re..</div>
              <div className="justify-center px-5 py-1.5 mt-1.5 text-xs font-medium text-white whitespace-nowrap rounded border border-solid bg-stone-900 border-white border-opacity-10">
                4.58
              </div>
            </div>
          </div>
        </div>
        <div className="flex z-10 flex-col flex-wrap justify-center content-center p-2.5 rounded-md border border-solid shadow-sm border-zinc-800">
          <div className="flex gap-1">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/35f32e86b2d5028294ccd36f11a3bf91d9e797cc402266ca0551af7cc6927b4e?apiKey=d1ee9f6275604677bd2583ecebeab853&"
              className="shrink-0 w-3.5 aspect-square"
            />
            <div className="flex gap-5 self-start">
              <div className="text-xs text-neutral-400">
                <span className="text-zinc-300">Georgia</span>{" "}
                <span className="font-light">vs</span>{" "}
                <span className="text-zinc-300">Czech Republic</span>
              </div>
              <div className="justify-center px-2.5 py-0.5 text-xs font-medium text-red-600 whitespace-nowrap rounded-md border border-red-700 border-solid bg-red-800 bg-opacity-30">
                Live
              </div>
            </div>
          </div>
          <div className="flex gap-2.5 px-0.5 mt-6">
            <div className="flex flex-col whitespace-nowrap">
              <div className="text-xs text-neutral-400">Georgia</div>
              <div className="justify-center px-5 py-1.5 mt-1.5 text-xs font-medium text-white rounded border border-solid bg-stone-900 border-white border-opacity-10">
                1.93
              </div>
            </div>
            <div className="flex flex-col whitespace-nowrap">
              <div className="self-center text-xs text-neutral-400">Draw</div>
              <div className="justify-center px-5 py-1.5 mt-1.5 text-xs font-medium text-white rounded border border-solid bg-stone-900 border-white border-opacity-10">
                3.56
              </div>
            </div>
            <div className="flex flex-col">
              <div className="text-xs text-neutral-400">Czech Re..</div>
              <div className="justify-center px-5 py-1.5 mt-1.5 text-xs font-medium text-white whitespace-nowrap rounded border border-solid bg-stone-900 border-white border-opacity-10">
                4.58
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="flex z-10 flex-col px-6 py-5 -mt-3 w-full max-md:px-5 max-md:max-w-full">
      <div className="text-base font-semibold text-center bg-clip-text max-md:max-w-full">
        Highlights
      </div>
      <div className="mt-2 max-md:pr-5 max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col max-md:gap-0">
          <div className="flex flex-col w-[33%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col flex-wrap grow justify-center content-center p-2.5 mx-auto w-full text-center rounded-md border border-solid shadow-sm bg-neutral-950 border-zinc-800 max-md:mt-5">
              <div className="flex gap-1">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/3c48337160414d380209776a453b42c6906761ba42f5289be6ff6951577a0478?apiKey=d1ee9f6275604677bd2583ecebeab853&"
                  className="shrink-0 w-3.5 aspect-square"
                />
                <div className="flex gap-5 self-start">
                  <div className="text-xs text-neutral-400">
                    <span className="text-zinc-300">Georgia</span>{" "}
                    <span className="font-light">vs</span>{" "}
                    <span className="text-zinc-300">Czech Republic</span>
                  </div>
                  <div className="justify-center px-2.5 py-0.5 text-xs font-medium text-red-600 whitespace-nowrap rounded-md border border-red-700 border-solid bg-red-800 bg-opacity-30">
                    Live
                  </div>
                </div>
              </div>
              <div className="flex gap-2.5 px-0.5 mt-6">
                <div className="flex flex-col whitespace-nowrap">
                  <div className="text-xs text-neutral-400">Georgia</div>
                  <div className="justify-center px-5 py-3 mt-1.5 text-xs font-medium text-white rounded border border-solid bg-stone-900 border-white border-opacity-10 max-md:px-5">
                    1.93
                  </div>
                </div>
                <div className="flex flex-col whitespace-nowrap">
                  <div className="self-center text-xs text-neutral-400">
                    Draw
                  </div>
                  <div className="justify-center px-5 py-3 mt-1.5 text-xs font-medium text-white rounded border border-solid bg-stone-900 border-white border-opacity-10 max-md:pr-5">
                    3.56
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="text-xs text-neutral-400">Czech Re..</div>
                  <div className="justify-center px-5 py-3 mt-1.5 text-xs font-medium text-white whitespace-nowrap rounded border border-solid bg-stone-900 border-white border-opacity-10 max-md:pr-5">
                    4.58
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col ml-5 w-[33%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col flex-wrap grow justify-center content-center p-2.5 mx-auto w-full text-center rounded-md border border-solid shadow-sm bg-neutral-950 border-zinc-800 max-md:mt-5">
              <div className="flex gap-1">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/d37089372af4865bdeaaa97aca92899f1df15864a3583f682454300e12cebe33?apiKey=d1ee9f6275604677bd2583ecebeab853&"
                  className="shrink-0 w-3.5 aspect-square"
                />
                <div className="flex gap-5 self-start">
                  <div className="text-xs text-neutral-400">
                    <span className="text-zinc-300">Georgia</span>{" "}
                    <span className="font-light">vs</span>{" "}
                    <span className="text-zinc-300">Czech Republic</span>
                  </div>
                  <div className="justify-center px-2.5 py-0.5 text-xs font-medium text-red-600 whitespace-nowrap rounded-md border border-red-700 border-solid bg-red-800 bg-opacity-30">
                    Live
                  </div>
                </div>
              </div>
              <div className="flex gap-2.5 px-0.5 mt-6">
                <div className="flex flex-col whitespace-nowrap">
                  <div className="text-xs text-neutral-400">Georgia</div>
                  <div className="justify-center px-5 py-3 mt-1.5 text-xs font-medium text-white rounded border border-solid bg-stone-900 border-white border-opacity-10 max-md:px-5">
                    1.93
                  </div>
                </div>
                <div className="flex flex-col whitespace-nowrap">
                  <div className="self-center text-xs text-neutral-400">
                    Draw
                  </div>
                  <div className="justify-center px-5 py-3 mt-1.5 text-xs font-medium text-white rounded border border-solid bg-stone-900 border-white border-opacity-10 max-md:pr-5">
                    3.56
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="text-xs text-neutral-400">Czech Re..</div>
                  <div className="justify-center px-5 py-3 mt-1.5 text-xs font-medium text-white whitespace-nowrap rounded border border-solid bg-stone-900 border-white border-opacity-10 max-md:pr-5">
                    4.58
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col ml-5 w-[33%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col flex-wrap grow justify-center content-center p-2.5 mx-auto w-full text-center rounded-md border border-solid shadow-sm bg-neutral-950 border-zinc-800 max-md:mt-5">
              <div className="flex gap-1">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/f960aafd69a6c4a061d058a7680b8175a5f1c8932652e2a10305e383f5072cf0?apiKey=d1ee9f6275604677bd2583ecebeab853&"
                  className="shrink-0 w-3.5 aspect-square"
                />
                <div className="flex gap-5 self-start">
                  <div className="text-xs text-neutral-400">
                    <span className="text-zinc-300">Georgia</span>{" "}
                    <span className="font-light">vs</span>{" "}
                    <span className="text-zinc-300">Czech Republic</span>
                  </div>
                  <div className="justify-center px-2.5 py-0.5 text-xs font-medium text-red-600 whitespace-nowrap rounded-md border border-red-700 border-solid bg-red-800 bg-opacity-30">
                    Live
                  </div>
                </div>
              </div>
              <div className="flex gap-2.5 px-0.5 mt-6">
                <div className="flex flex-col whitespace-nowrap">
                  <div className="text-xs text-neutral-400">Georgia</div>
                  <div className="justify-center px-5 py-3 mt-1.5 text-xs font-medium text-white rounded border border-solid bg-stone-900 border-white border-opacity-10 max-md:px-5">
                    1.93
                  </div>
                </div>
                <div className="flex flex-col whitespace-nowrap">
                  <div className="self-center text-xs text-neutral-400">
                    Draw
                  </div>
                  <div className="justify-center px-5 py-3 mt-1.5 text-xs font-medium text-white rounded border border-solid bg-stone-900 border-white border-opacity-10 max-md:pr-5">
                    3.56
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="text-xs text-neutral-400">Czech Re..</div>
                  <div className="justify-center px-5 py-3 mt-1.5 text-xs font-medium text-white whitespace-nowrap rounded border border-solid bg-stone-900 border-white border-opacity-10 max-md:pr-5">
                    4.58
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="flex z-10 flex-col px-6 pt-2.5 pb-0.5 -mt-3 w-full max-md:px-5 max-md:max-w-full">
    <div className="text-base bg-gradient-to-b from-white to-black font-semibold text-transparent bg-clip-text max-md:max-w-full">
  Upcoming
</div>
<div className="flex gap-5 justify-between px-3.5 py-2 mt-3 w-full text-center rounded-md border border-solid shadow-sm border-zinc-800 max-md:flex-wrap max-md:pr-5 max-md:max-w-full">
        <div className="flex flex-col justify-center my-auto">
          <div className="text-xl text-neutral-400">
            <span className="text-zinc-300">Georgia</span>{" "}
            <span className="font-light">vs</span>{" "}
            <span className="text-zinc-300">Czech Republic</span>
          </div>
          <div className="mt-1.5 text-xs font-medium text-neutral-500">
            Sat, Jun 22 6:30 PM
          </div>
        </div>
        <div className="flex gap-2.5 font-medium text-white">
          <div className="flex flex-col whitespace-nowrap">
            <div className="self-center text-xs">Georgia</div>
            <div className="justify-center px-9 py-3 mt-1.5 text-sm rounded border border-solid bg-zinc-900 border-white border-opacity-10 max-md:px-5">
              1.93
            </div>
          </div>
          <div className="flex flex-col whitespace-nowrap">
            <div className="self-center text-xs">Draw</div>
            <div className="justify-center px-8 py-3 mt-1.5 text-sm rounded border border-solid bg-zinc-900 border-white border-opacity-10 max-md:px-5">
              3.56
            </div>
          </div>
          <div className="flex flex-col">
            <div className="self-center text-xs">Czech Re..</div>
            <div className="justify-center px-8 py-3 mt-1.5 text-sm whitespace-nowrap rounded border border-solid bg-zinc-900 border-white border-opacity-10 max-md:px-5">
              4.58
            </div>
          </div>
        </div>
      </div><div className="flex gap-5 justify-between px-3.5 py-2 mt-3 w-full text-center rounded-md border border-solid shadow-sm border-zinc-800 max-md:flex-wrap max-md:pr-5 max-md:max-w-full">
        <div className="flex flex-col justify-center my-auto">
          <div className="text-xl text-neutral-400">
            <span className="text-zinc-300">Georgia</span>{" "}
            <span className="font-light">vs</span>{" "}
            <span className="text-zinc-300">Czech Republic</span>
          </div>
          <div className="mt-1.5 text-xs font-medium text-neutral-500">
            Sat, Jun 22 6:30 PM
          </div>
        </div>
        <div className="flex gap-2.5 font-medium text-white">
          <div className="flex flex-col whitespace-nowrap">
            <div className="self-center text-xs">Georgia</div>
            <div className="justify-center px-9 py-3 mt-1.5 text-sm rounded border border-solid bg-zinc-900 border-white border-opacity-10 max-md:px-5">
              1.93
            </div>
          </div>
          <div className="flex flex-col whitespace-nowrap">
            <div className="self-center text-xs">Draw</div>
            <div className="justify-center px-8 py-3 mt-1.5 text-sm rounded border border-solid bg-zinc-900 border-white border-opacity-10 max-md:px-5">
              3.56
            </div>
          </div>
          <div className="flex flex-col">
            <div className="self-center text-xs">Czech Re..</div>
            <div className="justify-center px-8 py-3 mt-1.5 text-sm whitespace-nowrap rounded border border-solid bg-zinc-900 border-white border-opacity-10 max-md:px-5">
              4.58
            </div>
          </div>
        </div>
      </div><div className="flex gap-5 justify-between px-3.5 py-2 mt-3 w-full text-center rounded-md border border-solid shadow-sm border-zinc-800 max-md:flex-wrap max-md:pr-5 max-md:max-w-full">
        <div className="flex flex-col justify-center my-auto">
          <div className="text-xl text-neutral-400">
            <span className="text-zinc-300">Georgia</span>{" "}
            <span className="font-light">vs</span>{" "}
            <span className="text-zinc-300">Czech Republic</span>
          </div>
          <div className="mt-1.5 text-xs font-medium text-neutral-500">
            Sat, Jun 22 6:30 PM
          </div>
        </div>
        <div className="flex gap-2.5 font-medium text-white">
          <div className="flex flex-col whitespace-nowrap">
            <div className="self-center text-xs">Georgia</div>
            <div className="justify-center px-9 py-3 mt-1.5 text-sm rounded border border-solid bg-zinc-900 border-white border-opacity-10 max-md:px-5">
              1.93
            </div>
          </div>
          <div className="flex flex-col whitespace-nowrap">
            <div className="self-center text-xs">Draw</div>
            <div className="justify-center px-8 py-3 mt-1.5 text-sm rounded border border-solid bg-zinc-900 border-white border-opacity-10 max-md:px-5">
              3.56
            </div>
          </div>
          <div className="flex flex-col">
            <div className="self-center text-xs">Czech Re..</div>
            <div className="justify-center px-8 py-3 mt-1.5 text-sm whitespace-nowrap rounded border border-solid bg-zinc-900 border-white border-opacity-10 max-md:px-5">
              4.58
            </div>
          </div>
        </div>
      </div><div className="flex gap-5 justify-between px-3.5 py-2 mt-3 w-full text-center rounded-md border border-solid shadow-sm border-zinc-800 max-md:flex-wrap max-md:pr-5 max-md:max-w-full">
        <div className="flex flex-col justify-center my-auto">
          <div className="text-xl text-neutral-400">
            <span className="text-zinc-300">Georgia</span>{" "}
            <span className="font-light">vs</span>{" "}
            <span className="text-zinc-300">Czech Republic</span>
          </div>
          <div className="mt-1.5 text-xs font-medium text-neutral-500">
            Sat, Jun 22 6:30 PM
          </div>
        </div>
        <div className="flex gap-2.5 font-medium text-white">
          <div className="flex flex-col whitespace-nowrap">
            <div className="self-center text-xs">Georgia</div>
            <div className="justify-center px-9 py-3 mt-1.5 text-sm rounded border border-solid bg-zinc-900 border-white border-opacity-10 max-md:px-5">
              1.93
            </div>
          </div>
          <div className="flex flex-col whitespace-nowrap">
            <div className="self-center text-xs">Draw</div>
            <div className="justify-center px-8 py-3 mt-1.5 text-sm rounded border border-solid bg-zinc-900 border-white border-opacity-10 max-md:px-5">
              3.56
            </div>
          </div>
          <div className="flex flex-col">
            <div className="self-center text-xs">Czech Re..</div>
            <div className="justify-center px-8 py-3 mt-1.5 text-sm whitespace-nowrap rounded border border-solid bg-zinc-900 border-white border-opacity-10 max-md:px-5">
              4.58
            </div>
          </div>
        </div>
      </div><div className="flex gap-5 justify-between px-3.5 py-2 mt-3 w-full text-center rounded-md border border-solid shadow-sm border-zinc-800 max-md:flex-wrap max-md:pr-5 max-md:max-w-full">
        <div className="flex flex-col justify-center my-auto">
          <div className="text-xl text-neutral-400">
            <span className="text-zinc-300">Georgia</span>{" "}
            <span className="font-light">vs</span>{" "}
            <span className="text-zinc-300">Czech Republic</span>
          </div>
          <div className="mt-1.5 text-xs font-medium text-neutral-500">
            Sat, Jun 22 6:30 PM
          </div>
        </div>
        <div className="flex gap-2.5 font-medium text-white">
          <div className="flex flex-col whitespace-nowrap">
            <div className="self-center text-xs">Georgia</div>
            <div className="justify-center px-9 py-3 mt-1.5 text-sm rounded border border-solid bg-zinc-900 border-white border-opacity-10 max-md:px-5">
              1.93
            </div>
          </div>
          <div className="flex flex-col whitespace-nowrap">
            <div className="self-center text-xs">Draw</div>
            <div className="justify-center px-8 py-3 mt-1.5 text-sm rounded border border-solid bg-zinc-900 border-white border-opacity-10 max-md:px-5">
              3.56
            </div>
          </div>
          <div className="flex flex-col">
            <div className="self-center text-xs">Czech Re..</div>
            <div className="justify-center px-8 py-3 mt-1.5 text-sm whitespace-nowrap rounded border border-solid bg-zinc-900 border-white border-opacity-10 max-md:px-5">
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
          <div className="mt-1.5 text-xs font-medium text-neutral-500">
            Sat, Jun 22 6:30 PM
          </div>
        </div>
        <div className="flex gap-2.5 font-medium text-white">
          <div className="flex flex-col whitespace-nowrap">
            <div className="self-center text-xs">Georgia</div>
            <div className="justify-center px-9 py-3 mt-1.5 text-sm rounded border border-solid bg-zinc-900 border-white border-opacity-10 max-md:px-5">
              1.93
            </div>
          </div>
          <div className="flex flex-col whitespace-nowrap">
            <div className="self-center text-xs">Draw</div>
            <div className="justify-center px-8 py-3 mt-1.5 text-sm rounded border border-solid bg-zinc-900 border-white border-opacity-10 max-md:px-5">
              3.56
            </div>
          </div>
          <div className="flex flex-col">
            <div className="self-center text-xs">Czech Re..</div>
            <div className="justify-center px-8 py-3 mt-1.5 text-sm whitespace-nowrap rounded border border-solid bg-zinc-900 border-white border-opacity-10 max-md:px-5">
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
          <div className="mt-1.5 text-xs font-medium text-neutral-500">
            Sat, Jun 22 6:30 PM
          </div>
        </div>
        <div className="flex gap-2.5 font-medium text-white">
          <div className="flex flex-col whitespace-nowrap">
            <div className="self-center text-xs">Georgia</div>
            <div className="justify-center px-9 py-3 mt-1.5 text-sm rounded border border-solid bg-zinc-900 border-white border-opacity-10 max-md:px-5">
              1.93
            </div>
          </div>
          <div className="flex flex-col whitespace-nowrap">
            <div className="self-center text-xs">Draw</div>
            <div className="justify-center px-8 py-3 mt-1.5 text-sm rounded border border-solid bg-zinc-900 border-white border-opacity-10 max-md:px-5">
              3.56
            </div>
          </div>
          <div className="flex flex-col">
            <div className="self-center text-xs">Czech Re..</div>
            <div className="justify-center px-8 py-3 mt-1.5 text-sm whitespace-nowrap rounded border border-solid bg-zinc-900 border-white border-opacity-10 max-md:px-5">
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
          <div className="mt-1.5 text-xs font-medium text-neutral-500">
            Sat, Jun 22 6:30 PM
          </div>
        </div>
        <div className="flex gap-2.5 font-medium text-white">
          <div className="flex flex-col whitespace-nowrap">
            <div className="self-center text-xs">Georgia</div>
            <div className="justify-center px-9 py-3 mt-1.5 text-sm rounded border border-solid bg-zinc-900 border-white border-opacity-10 max-md:px-5">
              1.93
            </div>
          </div>
          <div className="flex flex-col whitespace-nowrap">
            <div className="self-center text-xs">Draw</div>
            <div className="justify-center px-8 py-3 mt-1.5 text-sm rounded border border-solid bg-zinc-900 border-white border-opacity-10 max-md:px-5">
              3.56
            </div>
          </div>
          <div className="flex flex-col">
            <div className="self-center text-xs">Czech Re..</div>
            <div className="justify-center px-8 py-3 mt-1.5 text-sm whitespace-nowrap rounded border border-solid bg-zinc-900 border-white border-opacity-10 max-md:px-5">
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
          <div className="mt-1.5 text-xs font-medium text-neutral-500">
            Sat, Jun 22 6:30 PM
          </div>
        </div>
        <div className="flex gap-2.5 font-medium text-white">
          <div className="flex flex-col whitespace-nowrap">
            <div className="self-center text-xs">Georgia</div>
            <div className="justify-center px-9 py-3 mt-1.5 text-sm rounded border border-solid bg-zinc-900 border-white border-opacity-10 max-md:px-5">
              1.93
            </div>
          </div>
          <div className="flex flex-col whitespace-nowrap">
            <div className="self-center text-xs">Draw</div>
            <div className="justify-center px-8 py-3 mt-1.5 text-sm rounded border border-solid bg-zinc-900 border-white border-opacity-10 max-md:px-5">
              3.56
            </div>
          </div>
          <div className="flex flex-col">
            <div className="self-center text-xs">Czech Re..</div>
            <div className="justify-center px-8 py-3 mt-1.5 text-sm whitespace-nowrap rounded border border-solid bg-zinc-900 border-white border-opacity-10 max-md:px-5">
              4.58
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
}