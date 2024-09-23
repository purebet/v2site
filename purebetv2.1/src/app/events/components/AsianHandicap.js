import React, { useState, useEffect } from 'react';

import { FaAngleDown } from "react-icons/fa6";

import { MdOutlineInsertLink } from "react-icons/md";

const AsianHandicap = ({ title, data, showLiquidity = false, homeTeam, awayTeam }) => {
    console.log(data, title, showLiquidity);
    const [selectedLine, setSelectedLine] = useState(data[0].line);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
    useEffect(() => {
        if (data.length > 0 && data[0].line !== selectedLine) {
          setSelectedLine(data[0].line);
        }
      }, [data]);
    const selectedData = data.find(item => item.line === selectedLine);
  
    return (
      <div className="mb-4 mt-4 md:mt-0 rounded-lg overflow-hidden">
        <div className="text-sm text-white font-semibold md:p-3 p-1 flex items-center">
          <span className="text-[#7D7D7D] opacity-65 text-2xl">&bull;</span>
          <span className="ml-1 font-poppins opacity-65">{title}</span>
          {showLiquidity && (
            <div className="ml-auto bg-white bg-opacity-10 px-2 md:px-4 py-1 flex items-center gap-1 rounded-full">
              <button className="md:text-xs text-[10px] text-white">Show Liquidity</button>
              <MdOutlineInsertLink color="white" />
            </div>
          )}
        </div>
        <div className="md:p-4">
          <div className="flex flex-col items-center mb-2">
           
            {isDropdownOpen && (
              <div className="mt-1 w-24 bg-[#132C42] rounded absolute z-10">
                {data.map((item) => (
                  <button
                    key={item.line}
                    onClick={() => {
                      setSelectedLine(item.line);
                      setIsDropdownOpen(false);
                    }}
                    className="block w-full text-left text-white p-2 hover:bg-[#1e3a54]"
                  >
                    {item.line}
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="flex justify-center items-center gap-2 md:gap-8">
            <div className="text-center">
              <div className="text-xs text-white">{homeTeam} {selectedLine}</div>
              <div className="bg-[#132C42] w-[94px] text-white p-2 rounded mt-1">
                {selectedData?.side0[0][0]}
              </div>
            </div>
            <div className='text-center'>
                <div>&nbsp;</div>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center justify-between gap-2 text-white p-2 rounded"
            >
              <span>{selectedLine}</span>
              <FaAngleDown />

            </button>
            </div>
            <div className="text-center">
              <div className="text-xs text-white">{awayTeam} {-selectedLine}</div>
              <div className="bg-[#132C42] w-[94px] text-white p-2 rounded mt-1">
                {selectedData?.side1[0][0]}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  export default AsianHandicap;