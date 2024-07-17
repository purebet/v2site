import React from 'react';
import BetInfo from './BetInfo';
import BetStatus from './BetStatus';

const BetCard = ({ match, betType, amount, odds, status, profit }) => {
  return (
    <article className="flex gap-5 justify-center items-center px-2.5 py-2.5 mt-2.5 font-medium rounded-lg border border-solid bg-[#111111] border-stone-900">
      <BetInfo match={match} betType={betType} amount={amount} />
      <div className="justify-center self-stretch px-2 py-0.5 my-auto text-xs whitespace-nowrap rounded border border-solid bg-[#111111] border-neutral-800 text-stone-300">
        {odds}
      </div>
      <BetStatus status={status} profit={profit} />
    </article>
  );
};

export default BetCard;