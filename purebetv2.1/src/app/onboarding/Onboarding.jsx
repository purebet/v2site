'use client'
import React, { useState } from "react";
import Footer from "../landingpage/Footer";

const Onboarding = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  const iframeSources = {
    solana: "https://v1.debridge.finance/widget",
    centralized: "https://another-widget-url.com",
    bank: "https://yet-another-widget-url.com",
  };

  const handleButtonClick = (option) => {
    setSelectedOption(option);
  };

  return (
    <div
      style={{
        backgroundImage: `radial-gradient(ellipse 80% 70% at center top, rgba(94, 206, 241, 0.5) 0%, transparent 60%), url("/BG.png")`,
        backgroundPosition: "center top",
        backgroundSize: "cover",
      }}
      className="bg-fixed pt-10 w-full bg-black flex flex-col justify-between"
    >
      <div className="flex p-5 justify-between px-4 sm:px-12 md:px-32">
      <a href="/"><img src="/logo.svg" alt="" /> </a>
        <a href="/sports/home">
          <button className="bg-white text-black px-5 rounded-full py-2 font-semibold">
            Start Betting
          </button>
        </a>
      </div>
      <div className="flex-grow flex flex-col px-4 sm:px-12 md:px-32 py-8 items-center">
        <div className="flex flex-col lg:flex-row gap-12 w-full max-w-7xl">
          {/* <!-- Left Section --> */}
          <div className="flex flex-col gap-6 lg:w-1/2">
            <div className="icon-and-text flex items-center gap-2">
              <img src="/diamond icon.png" alt="" className="w-5 h-5" />
              <span className="text-white font-semibold text-lg">
                Onboarding
              </span>
            </div>
            <span className="bg-gradient-to-r from-[#7ACFFF] to-[#FFFFFF] bg-clip-text text-transparent text-xl sm:text-2xl md:text-3xl font-bold">
              Connect your wallet now!
            </span>
            <div className="check-icon-and-text flex items-start gap-2">
              <img
                src="/check icon.png"
                alt=""
                className="w-5 h-5 mt-1 flex-shrink-0"
              />
              <span className="text-[#D0D0D0] text-sm sm:text-base">
                You are in control of the funds in your wallet at all times
              </span>
            </div>
            <div className="check-icon-and-text flex items-start gap-2">
              <img
                src="/info icon.png"
                alt=""
                className="w-5 h-5 mt-1 flex-shrink-0"
              />
              <span className="text-[#D0D0D0] text-sm sm:text-base">
                Guide to connect your wallet
              </span>
            </div>
            <div>
              <span className="text-[#818181] text-sm sm:text-base">
                Purebet is based on the Solana blockchain. To interact with the
                blockchain, you need to use a Solana blockchain wallet. We
                recommend Phantom but other options are Backpack, Solflare, and
                many more. You are in control of the funds in your wallet at all
                times. More information can be found here.
              </span>
            </div>
            <div className="flex flex-col w-full text-center gap-4">
              <span className="text-white">
                Choose what suits you the most:
              </span>
              <button
                onClick={() => handleButtonClick("solana")}
                className={`border-2 rounded-lg px-4 py-3 text-sm sm:text-base ${selectedOption === "solana" ? "text-white border-white" : "text-[#818181] border-2 border-[#818181]"}`}
                style={{ borderColor: selectedOption === "solana" ? "rgba(44, 217, 255, 1)" : "rgba(44, 217, 255, 0.25)" }}
              >
                If you have funds on Solana or another blockchain...
              </button>
              <button
                onClick={() => handleButtonClick("centralized")}
                className={`border-2 rounded-lg px-4 py-3 text-sm sm:text-base ${selectedOption === "centralized" ? "text-white border-white" : "text-[#818181] border-2 border-[#818181]"}`}
                style={{ borderColor: selectedOption === "centralized" ? "rgba(44, 217, 255, 1)" : "rgba(44, 217, 255, 0.25)" }}
              >
                If you have funds on a centralised exchange…
              </button>
              <button
                onClick={() => handleButtonClick("bank")}
                className={`border-2 rounded-lg px-4 py-3 text-sm sm:text-base ${selectedOption === "bank" ? "text-white border-white" : "text-[#818181] border-2 border-[#818181]"}`}
                style={{ borderColor: selectedOption === "bank" ? "rgba(44, 217, 255, 1)" : "rgba(44, 217, 255, 0.25)" }}
              >
                If you only have funds in your bank or card…
              </button>
            </div>
          </div>

          {/* <!-- Middle Section (Iframe) --> */}
          {selectedOption && (
            <div className="flex-grow justify-center lg:w-1/2">
              <div className="relative w-full  max-w-md md:max-w-full md:h-[300px] h-[600px] lg:h-full">
                <iframe
                  src={iframeSources[selectedOption]}
                  className="absolute inset-0 w-full h-full rounded-lg"
                  title="Selected Widget"
                ></iframe>
              </div>
            </div>
          )}

          {/* <!-- Right Section --> */}
          {!selectedOption && (
            <div className="bg-gradient-to-b from-[#1D3038] to-[#0E0F11] flex-grow lg:w-1/2 rounded-lg border-[#9B8F8F] border-2 flex items-center justify-center p-4 mt-8 lg:mt-0">
              <span className="text-white opacity-35 text-center text-sm sm:text-base">
                Choose a condition to display the Process over here.
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Centered Note and Disclaimer */}
      <div className="flex flex-col items-center gap-4 p-4 text-[#818181]">
        <div className="bg-[#1E1E1E] bg-opacity-80 p-3 sm:p-4 rounded-full text-center w-full max-w-6xl">
          <p className="text-xs sm:text-sm md:text-base">
            <strong className="font-bold text-white">Note:</strong> This page is
            designed to onboard new users to Purebet. Purebet never controls
            your funds. All services mentioned on this page are run by 3rd
            Parties.
          </p>
        </div>
        <div className="bg-[#1E1E1E] bg-opacity-80 p-3 sm:p-4 rounded-full text-center w-full max-w-6xl">
          <p className="text-xs sm:text-sm md:text-base">
            <strong className="font-bold text-white">Disclaimer:</strong> The
            above service is provided by
            &nbsp;
            <a href="#" className="text-[#818181] underline">
              Mayan Finance.
            </a>
            &nbsp;
            Contact them in their
            &nbsp;

            <a href="#" className="text-[#818181] underline 0">
              Discord server
            </a>
            &nbsp;
             if you have any issues.
          </p>
        </div>
      </div>

      <div className=" mt-32 px-4 sm:px-12 md:px-32">
        <hr className="bg-[#444444] opacity-25" />
      </div>

      <div className=" mt-10 pb-10 md:pb-0 ">
        <Footer />
      </div>
    </div>
  );
};

export default Onboarding;
