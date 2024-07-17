import React from 'react';

const BetInfo = ({ match, betType, amount }) => {
  return (
    <div className="flex flex-col self-stretch text-xs text-white">
      <div className="text-zinc-500">{match}</div>
      <div>{betType}</div>
      <div className="flex gap-5 justify-between px-1 py-1 mt-2 whitespace-nowrap rounded border border-solid bg-[#111111]-950 border-neutral-800">
        <div className="flex gap-1">
          <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/b85184fb0d262c9c53019479c29a56be76efcc6438f9d7512ea0e1ea9a5174a4?apiKey=d1ee9f6275604677bd2583ecebeab853&" className="shrink-0 my-auto w-2.5 aspect-square fill-white" alt="" />
          <div>{amount}</div>
        </div>
        <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/4ec8431abcbee3a56ed040958dfa589fe06b3bfefa4315553a90b339f1fc2e84?apiKey=d1ee9f6275604677bd2583ecebeab853&" className="shrink-0 my-auto w-3 aspect-square" alt="" />
      </div>
    </div>
  );
};

export default BetInfo;