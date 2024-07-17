import React from 'react';

function FreeBetBalance({ amount }) {
  return (
    <div className="flex flex-col justify-center items-start px-2.5 py-3.5 mt-2 rounded-lg border border-solid border-neutral-800">
      <div className="flex gap-2.5">
        <div className="text-base font-medium text-white">{amount}</div>
        <div className="my-auto text-xs text-neutral-400">
          Free Bet Balance
        </div>
      </div>
    </div>
  );
}

export default FreeBetBalance;