var solanaWeb3 = require('@solana/web3.js'); // this package is required for solana related functionality
//solana has a devnet for testing and a mainnet for production
// if handling both devnet and mainnet is too hard, the v2 site can have just mainnet
var mintStr = process.env.REACT_APP_WALLET_ADAPTER_NETWORK == 'dev' ? 
    "Gh9ZwEmdLJ8DscKNTkTqPbNwLNNBjuSzaG9Vp2KGtKJr" : 
    'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v';

async function getUSDCBalance() {
    let payload = {
        "jsonrpc": "2.0",
        "id": Math.round(Math.random() * 100),
        "method": "getTokenAccountsByOwner",
        "params": [
            wallet.publicKey.toBase58(), //wallet.publicKey is the user's public key, from solana wallet adapter
            {
                "mint": mintStr
            },
            {
                "encoding": "jsonParsed"
            }
        ]
    };
    //axios can be substituted for a different library to make REST API calls
    // the url to which the call is made will be provided by us. 
    let resp = await axios.post(process.env.REACT_APP_RPC_URL, payload);
    //the usdcATA is something that will be needed for placing a bet
    setUsdcATA(new solanaWeb3.PublicKey(resp?.data?.result?.value[0]?.pubkey));
    //the USDC balance is below
    setUSDCBalance(resp?.data?.result?.value[0]?.account?.data?.parsed?.info?.tokenAmount?.uiAmount);
}


async function getSolBalance(){
    //connection is an object that should come from solana wallet adapter, but I'm not 100% sure
    //below is how to initialize it if needed
    //var connection = new solanaWeb3.Connection(process.env.REACT_APP_RPC_URL, "confirmed");
    setSolBalance(await connection.getBalance(wallet.publicKey) / 1000000000);
}