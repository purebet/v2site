var solanaWeb3 = require("@solana/web3.js"); // this package is required for solana related functionality

var programID = new solanaWeb3.PublicKey("9uReBEtnYGYf1oUe4KGSt6kQhsqGE74i17NzRNEDLutn");
var pool = new solanaWeb3.PublicKey("3SdgUSptYW5NM4SFUYfJwV3awTG7hYJnc1T1yL519mEZ");
var tokenProgram = new solanaWeb3.PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA");
//solana has a devnet for testing and a mainnet for production
// if handling both devnet and mainnet is too hard, the v2 site can have just mainnet
var mint = process.env.REACT_APP_WALLET_ADAPTER_NETWORK == 'dev' ?  
  new solanaWeb3.PublicKey("Gh9ZwEmdLJ8DscKNTkTqPbNwLNNBjuSzaG9Vp2KGtKJr") : 
  new solanaWeb3.PublicKey("EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v");;
var pda = new solanaWeb3.PublicKey("8AbwG4Cbr9DefgeF7P9Pt9RJMA1RS1KVogRWBWh9U8wM");
var delay = process.env.REACT_APP_WALLET_ADAPTER_NETWORK == 'dev' ? 
  new solanaWeb3.PublicKey("Axb9d4GZ9QtMEJoRbnv75gGaos5CSeCpEpJRJsz9YPHF") :
  new solanaWeb3.PublicKey("5dSxWtuxD6reEiaAYjtp91Kp74grdJKFxa3HduqTZH9f"); 
var blankPubkey = "11111111111111111111111111111111";

/*
@param: betAccStr, string, the address of the bet to cancel. Obtain this from the pending bets API call response
@return: signature, string, the transaction signature of a successful cancelation
*/
async function cancelBet(betAccStr) {
    //connection is an object that should come from solana wallet adapter, but I'm not 100% sure
    //below is how to initialize it if needed. We can provide the rpc url
    //var connection = new solanaWeb3.Connection(process.env.REACT_APP_RPC_URL, "confirmed");
    //wallet.publicKey is the user's public key, from solana wallet adapter
    let callForATA = await connection.getTokenAccountsByOwner(wallet.publicKey, { mint: mint });
    let destination = callForATA.value[0].pubkey;

    let keyform = new solanaWeb3.PublicKey(betAccStr);
    let info = await connection.getAccountInfo(keyform);
    
    let betData = Array.from(info.data);
    let id = betData.slice(0, 20);
    let side = new solanaWeb3.PublicKey(betData.slice(36, 68)).toBase58() != blankPubkey ? 0 : 1;
    let instrData = id.concat([side]);
    instrData.push(0);
    let payer = new solanaWeb3.PublicKey(betData.slice(100, 132));

    let keysArr = [
        {pubkey: keyform, isSigner: false, isWritable: true },
        {pubkey: tokenProgram, isSigner: false, isWritable: false},
        {pubkey: pool, isSigner: false, isWritable: true },
        {pubkey: destination, isSigner: false, isWritable: true},
        {pubkey: wallet.publicKey, isSigner: true, isWritable: true },
        {pubkey: payer, isSigner: false, isWritable: true },
        {pubkey: pda, isSigner: false, isWritable: true }
    ];
    if(betData[141] == 1){// to aggregate
        keysArr.push({pubkey: delay, isSigner: false, isWritable: false});
    }
    let betInstr = new solanaWeb3.TransactionInstruction({
        keys: keysArr,
        programId: programID,
        data: new Uint8Array(instrData),
    });
    let transaction = new solanaWeb3.Transaction();
    transaction.add(betInstr);
    transaction.feePayer = window.solana.publicKey;
    let blockInfo = await connection.getLatestBlockhash(); 
    transaction.recentBlockhash = blockInfo.blockhash;

    const {
      context: { slot: minContextSlot },
      value: { blockhash, lastValidBlockHeight },
    } = await connection.getLatestBlockhashAndContext();

    const signature = await wallet.sendTransaction(transaction, connection, { minContextSlot });
    await connection.confirmTransaction({ signature });
    //now make an API call to mark the bet as canceled in betlog. In the future we may get rid of this call but keep it for now
    await axios.get("https://p43l0w1hu4.execute-api.ap-northeast-1.amazonaws.com/default/pendingBetsV2?cancel=" + betAccStr + "&for=" + wallet.publicKey.toBase58());
    return signature;
}