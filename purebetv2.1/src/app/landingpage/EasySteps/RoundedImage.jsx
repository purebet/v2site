import React from 'react';

function RoundedImage() {
  return (
    <div className="flex flex-col ml-5 w-[28%] max-md:ml-0 max-md:w-full">
      <div className="flex relative flex-col justify-center items-start self-stretch px-5 py-1 my-auto rounded-none aspect-[1.15] w-[123px] max-md:pl-5 max-md:mt-10">
        <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/6d880ce26362d5f3c04e212855b54e60e566b00828453f162a5910f53330fd60?apiKey=d1ee9f6275604677bd2583ecebeab853&&apiKey=d1ee9f6275604677bd2583ecebeab853" alt="" className="object-cover absolute inset-0 size-full" />
        <div className="relative shrink-0 w-full bg-amber-200 rounded-full shadow-2xl h-[100px]" />
      </div>
    </div>
  );
}

export default RoundedImage;