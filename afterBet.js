function lilEndInt(bytes){
    let output = 0;
    for(let pow = 0; pow < bytes.length; pow++){
        output = output + bytes[pow] * 256**pow;
    }
    return output;
}
  
function isBlankWallet(bytes){
    return new solanaWeb3.PublicKey(bytes).toBase58() == "11111111111111111111111111111111";
}

(result) => {
    // result is an object with attrs showNow and listen
    // showNow --> [array of {odds, stake, acc}]
    // listen --> base58 pubkey str of the acc to listen for
    // loop through showNow and call addBet() on them
    // set a listener for listen, and it will fill in timestamp, odds, stake, matched, potentialReturn from payload. Event, team, isLay, eventStart is all from closure? maybe make a class but not necessary
    // set a setTimeout to clear the listener and call refreshData() in 60 seconds
    
    console.log(result);
    //send a dispatch call to edit the appropriate ob
    dispatch({
      type: "justbet",
      odds: odds,
      stake: totalRisk
    });
    let isLay = state.selectedOdd.back_lay == 'lay';
    let bet = isLay ? state.selectedOdd.team + " does not win" : state.selectedOdd.team; //this will show soccer back bets as HOME instead of HOME wins, not a big deal
    for(let rawBet of result.showNow){
      let betObj = { // in the future correct this but leave it for now because no user to user or monaco bets will be happening
        placedAt: Date.now() / 1000,
        bettorOdds: rawBet.odds,
        bettorStake: rawBet.liquidity,
        matched: true, // pb user to user matches instantly, monaco will open up crank so that will match instantly too in the future
        event: state.selectedOdd.event,
        team: bet,
        isLay: isLay,
        acc: rawBet.acc, 
        potentialReturn: Math.round(rawBet.odds * rawBet.liquiidty * 100) / 100,
        eventStart: state.selectedOdd.startDate
      };
      addBet(betObj);
    }
    if(result.listen != null){
      subscriptionId = connection.onAccountChange(
        new solanaWeb3.PublicKey(result.listen), 
        function(accInfo, contextIgnored){
          let accData = accInfo.data;
          console.log("websocket message", accData);
          if(isBlankWallet(accData.slice(36, 68)) || isBlankWallet(accData.slice(68, 100))){
            return;
          }
          //odds, stake, , potentialReturn, timestamp
          //matched will always be true if this is running
          let side = new solanaWeb3.PublicKey(accData.slice(36, 68)).toBase58() == wallet.publicKey.toBase58() ? 0 : 1;
          let side0Stake = lilEndInt(accData.slice(20, 28)) / 1000000;
          let side1Stake = lilEndInt(accData.slice(28, 36)) / 1000000;
          let stake = side == 0 ? side0Stake : side1Stake
          let potentialReturn = side0Stake + side1Stake
          let betObj = {
            placedAt: lilEndInt(accData.slice(133, 141)),
            bettorOdds: potentialReturn / stake,
            bettorStake: stake,
            isMatched: true, // if this account has changed, and the partial match situation is handled above, then it must be matched
            event: state.selectedOdd.event,
            description: bet,
            isLay: isLay,
            betAddr: result.listen, 
            potentialReturn: potentialReturn,
            eventStart: state.selectedOdd.startDate,
            isMonacoDirect: false,
            bettorSide: side,
            period: state.selectedOdd.period,
            sport: state.selectedOdd.sport,
            mkt: state.selectedOdd.mkt, 
            league: state.selectedOdd.league,
            eventId: state.selectedOdd.eventId
          };
          addBet(betObj);
          runRefresh = false; // acccount subscription succesfully did all refreshing
        }
      );
      console.log(subscriptionId);
    }
    else{
      runRefresh = false; //no aggregated bets means all bets were refreshed, no need to refresh
    }
    setTimeout(
      function(){
        if(result.listen != null){
          connection.removeAccountChangeListener(subscriptionId);
        }
        if(runRefresh){
          refreshData(); // only if there was an issue with the subscription
        }
      },
      60000
    );    
}