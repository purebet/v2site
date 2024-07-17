import React from 'react';

function ReferralButton() {
  return (
    <button className="flex justify-center items-center px-16 py-1.5 mt-3.5 w-full text-base text-blue-400 rounded-lg shadow-sm">
      <div className="flex gap-2.5 justify-center">
        <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/56a21267b0c5bbe662e91e21b67d3c02eb173adb70a4fbbaa0d63b845df06bdd?apiKey=d1ee9f6275604677bd2583ecebeab853&" alt="" className="shrink-0 my-auto aspect-square w-[17px]" />
        <span>Refer and earn!</span>
      </div>
    </button>
  );
}

export default ReferralButton;