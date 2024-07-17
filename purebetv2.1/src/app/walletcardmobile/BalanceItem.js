import React from 'react';

function BalanceItem({ icon, amount }) {
  return (
    <div className="flex flex-col justify-center items-start px-3 py-2.5 mt-2 text-base font-medium text-white rounded-lg border border-solid border-neutral-800">
      <div className="flex gap-3.5">
        <img loading="lazy" src={icon} alt="" className="shrink-0 w-6 aspect-square" />
        <div className="my-auto">{amount}</div>
      </div>
    </div>
  );
}

export default BalanceItem;