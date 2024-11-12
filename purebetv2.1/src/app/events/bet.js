var solanaWeb3 = require('@solana/web3.js');
var programID = new solanaWeb3.PublicKey("9uReBEtnYGYf1oUe4KGSt6kQhsqGE74i17NzRNEDLutn");
var pool = new solanaWeb3.PublicKey("3SdgUSptYW5NM4SFUYfJwV3awTG7hYJnc1T1yL519mEZ");
var tokenProgram = new solanaWeb3.PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA");

function numToBytes(num, bytes){
    let output = [0, 0, 0, 0, 0, 0, 0, 0];
    for(let pow = 7; pow >= 0; pow--){
        output[pow] = Math.floor(num / 256**pow);
        num = num % 256**pow;
    }
    return output.slice(0, bytes);
}

function nameToBytes(name){
    let words = name.split(" ");
    if(words.length == 0){ //no name, not a player props bet
        return [0, 0, 0, 0];
    }
    else if(words.length == 1){//someone only has a first name
        return [name.charCodeAt(0), 0, 0, 0]
    }
    else{
        if(words.length > 2){ //last name with multiple words
            words[1] = words.slice(1).join(" ");
        }
        let output = [words[0].charCodeAt(0), words[1].charCodeAt(0), words[1].charCodeAt(1)]
        if(words[1].length == 2){ //2 letter last name
            output.push(0);
            return output;
        }
        else{
            output.push(words[1].charCodeAt(2));
            return output;
        }
    }
}
function stringToBytes(str){
    let output = [];
    for(let i = 0; i < str.length; i++){
        output.push(str.charCodeAt(i));
    }
    return new Uint8Array(output);
}

// function convertSide(sideName){
//     console.log(sideName, typeof sideName)
//     sideName = typeof sideName === "string" ? sideName.toLowerCase(): sideName;
// 	if ( sideName == 0) {
// 		return 0;
// 	} else if (sideName == 1 || sideName.includes("away") || sideName == 'lay' || sideName.substring(0, 5) == 'under') {
// 		return 1;
// 	}
// 	return -1;
// }

function instrData(idObj, betInfo){
    let {userStake, side, odds} = betInfo;
    //userStake and side need some preprocessing before 
    //betInfo contains userStake, side, odds, isLay
    let data = [];
    let ids = [
        {name: "sport", bytes: 1}, 
        {name: "league", bytes: 4}, 
        {name: "event", bytes: 8},
        {name: "period", bytes: 1},
        {name: "mkt", bytes: 2}
    ];
    for(let i = 0; i < ids.length; i++){
        let value = idObj[ids[i].name];
        data = data.concat(numToBytes(value, ids[i].bytes));
    }
    data = data.concat(nameToBytes(idObj.player));
    let stake0, stake1;
    if(side == 0){
        stake0 = numToBytes(userStake * 1000000);
        stake1 = numToBytes(Math.round(userStake * (odds - 1) * 1000000));
    }
    else{
        stake0 = numToBytes(Math.round(userStake * (odds - 1) * 1000000));
        stake1 = numToBytes(userStake * 1000000);
    }
    data = data.concat(stake0).concat(stake1);
    data.push(side);
    data.push(1); //to aggregate is always true when betting through site
    return data;
}

// addrs has 2 attrs: betotr and usdcATA
// idObja nd betInfo explained in instrData()
// fixtures contains 2 attrs: mktName and eventName
async function genTx(idObj, betInfo, addrs, fixtures, connection){
    //move the below to genAcc(), call with parameter window.solana.publicKey
    let rentExemptVal = 1000000000 * 0.0018792;
    let seed = 'purebetv2' + Math.random() * 1000000000000;
    let newAcc = await solanaWeb3.PublicKey.createWithSeed(addrs.bettor, seed, programID);
    let instr = solanaWeb3.SystemProgram.createAccountWithSeed({
        fromPubkey: addrs.bettor,
        basePubkey: addrs.bettor,
        seed: seed,
        newAccountPubkey: newAcc,
        lamports: rentExemptVal,
        space: 142,
        programId: programID,
    });
    
    let betInstr = new solanaWeb3.TransactionInstruction({
        keys: [
            {pubkey: newAcc, isSigner: false, isWritable: true },
            {pubkey: tokenProgram, isSigner: false, isWritable: false},
            {pubkey: addrs.usdcATA, isSigner: false, isWritable: true },
            {pubkey: pool, isSigner: false, isWritable: true},
            {pubkey: addrs.bettor, isSigner: true, isWritable: true }, //the bettor is guaranteed to be paying the usdc if this is running
            {pubkey: addrs.bettor, isSigner: true, isWritable: true },
            {pubkey: addrs.bettor, isSigner: true, isWritable: true }, //if this is running, the bettor is guaranteed to be the rent exemption payer
        ],
        programId: programID,
        data: new Uint8Array(instrData(idObj, betInfo)),
    });

    let memo = new solanaWeb3.TransactionInstruction({
        keys: [{ pubkey: addrs.bettor, isSigner: true, isWritable: true }],
        data: stringToBytes(`{"bet": ${betInfo.userStake}, "at": ${betInfo.odds}, "on": "${fixtures.selectionName}", "in": "${fixtures.eventName}"}`),
        programId: new solanaWeb3.PublicKey("MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr"),
    });

    
    let transaction = new solanaWeb3.Transaction();
    transaction.add(instr);
    transaction.add(betInstr);
    transaction.add(memo);
    transaction.feePayer = addrs.bettor;
    let blockInfo = await connection.getLatestBlockhash(); 
    transaction.recentBlockhash = blockInfo.blockhash;
    return {tx: transaction, listen: newAcc.toBase58()};
}

export async function placeBet(idObj, betInfo, addrs, fixtures, connection) {
    console.log(fixtures)
    let output = {showNow: [], listen: null};
    let transaction;
    if(usdcBalance == 0){
      //free bet or
    } 
    else if(solBalance < 0.0018792){
      // sol free bet, call betBuilder lambda. betBuilder lambda needs to return the proper output.showNow list
      let payload = {idObj, betInfo, fixtures};
      payload.addrs = {
        bettor: addrs.bettor.toBase58(),
        usdcATA: addrs.usdcATA.toBase58()
      }
      let txResp = await axios.post("https://muj8auyny5.execute-api.ap-northeast-1.amazonaws.com/default/betBuilderv2?type=solFree", payload);
      transaction = solanaWeb3.Transaction.from(txResp.data.tx);
      output.listen = txResp.data.listen;
    }
    else{
      //this also needs to handle pb matching a market maker, monaco, aver. That info will come from state.selectedOdd and be cut off depending on which liquidity is used up. stake will be deducted 
      let txResp = await genTx(idObj, betInfo, addrs, fixtures, connection);
      transaction = txResp.tx;
      output.listen = txResp.listen;
    } 
    
    //send total trasnaction
    try {
      
      const {
        context: { slot: minContextSlot },
        value: { blockhash, lastValidBlockHeight },
      } = await connection.getLatestBlockhashAndContext();
      
      const signature = await wallet.sendTransaction(transaction, connection, { minContextSlot }); 
      //await connection.confirmTransaction({ blockhash, lastValidBlockHeight, signature });
      await connection.confirmTransaction({ signature });
      setHash(signature);
      setHashLink(
        'https://explorer.solana.com/tx/' +
          signature +
          (process.env.REACT_APP_WALLET_ADAPTER_NETWORK == 'dev' ? '?cluster=devnet' : '')
      );
      //set the twitter link
      setTwitterDisplay(true);
      toast.info(
        <>
          <Typography variant="h6">Bet request received! We are now working on placing your bet.</Typography>
          <Typography variant="body1">Please be patient and do not cancel your bet for 3 minutes.</Typography>
        </>,
        { autoClose: 20000 }
      );
    } catch (err) {
      console.error(err);
      toast.error(<ErrorToast title="Error while placing bet" message={err.message} error={err} />);
    }
    return output;
}
