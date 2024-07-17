import React from 'react';

const BetStatus = ({ status, profit }) => {
  const statusColor = status === 'Matched' ? 'text-lime-600' : 'text-neutral-500';
  const profitColor = parseFloat(profit) > 0 ? 'text-stone-300' : 'text-stone-300';

  return (
    <div className="flex flex-col justify-center self-stretch pb-2.5 my-auto whitespace-nowrap">
      <div className={`text-xs ${statusColor}`}>{status}</div>
      <div className={`self-center text-xs ${profitColor}`}>{profit}</div>
    </div>
  );
};

export default BetStatus;