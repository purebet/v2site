import * as React from "react";

export default function Bottomnav() {
return (
  <div className="flex w-full flex-col justify-center text-xs text-center whitespace-nowrap max-w-[390px] text-neutral-400">
    <div className="flex overflow-hidden relative flex-col gap-5 items-start px-7 py-3 w-full border border-solid aspect-[6.72] border-neutral-800 fill-[linear-gradient(180deg,#181818_0%,#000_100%)] stroke-[1px] stroke-neutral-800">
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/59704c959b846bcaa34dc75fdbc427765261947afb34f12fe39416155f1a60ec?apiKey=d1ee9f6275604677bd2583ecebeab853&"
        className="object-cover absolute inset-0 size-full"
      />
      <div className="flex relative flex-1 gap-5 justify-between">
        <div className="flex flex-col">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/25899e40d43f33bc96f465d42faeb0ab8b834d5002f5990e67cbb59efd039170?apiKey=d1ee9f6275604677bd2583ecebeab853&"
            className="self-center aspect-[1.54] w-[37px]"
          />
          <div>Premier</div>
        </div>
        <div className="flex flex-col">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/46bc5630bbdb13c05d7a479d6ca4092e5ac36da67a650059fb77b987ceb78734?apiKey=d1ee9f6275604677bd2583ecebeab853&"
            className="self-center w-6 aspect-square"
          />
          <div>EPL</div>
        </div>
      </div>
      <div className="flex relative flex-1 gap-5 justify-between">
        <div className="flex flex-col">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/98ac0a949c2a80c1519195ffccf45a663d6bd6f67223194eb40bbcbe4e23edd7?apiKey=d1ee9f6275604677bd2583ecebeab853&"
            className="self-center w-6 aspect-square"
          />
          <div>Basketball</div>
        </div>
        <div className="flex flex-col">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/8314568bdd28822c04f60009a7b23bd7e7521e366cb4b27ba123458292bf9875?apiKey=d1ee9f6275604677bd2583ecebeab853&"
            className="self-center aspect-[1.41] w-[34px]"
          />
          <div>Soccer</div>
        </div>
      </div>
    </div>
  </div>
);
}