require("dotenv").config()
const API_URL = process.env.API_URL
const PUBLIC_KEY = process.env.PUBLIC_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;


const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(API_URL)


const contract = require("../artifacts/contracts/DANFT.sol/DANFT.json")
//console.log(JSON.stringify(contract.abi))  //print the ABI
const contractAddress = "0x07cbB679880C96329cB491321B9aAdE218fb8Fb9"
const nftContract = new web3.eth.Contract(contract.abi, contractAddress)
async function mintNFT(tokenURI){
    const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, 'latest');

    const txn = {
        'from': PUBLIC_KEY,
        'to': contractAddress,
        'nonce': nonce,
        'gas': 500000,
        'data': nftContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI()
      };

      const signPromise = web3.eth.accounts.signTransaction(txn, PRIVATE_KEY)
      signPromise
        .then((signedTx) => {
          web3.eth.sendSignedTransaction(
            signedTx.rawTransaction,
            function (err, hash) {
              if (!err) {
                console.log(
                  "The hash of your transaction is: ",
                  hash,
                  "\nCheck Alchemy's Mempool to view the status of your transaction!"
                )
                return true;
              } else {
                console.log(
                  "Something went wrong when submitting your transaction:",
                  err
                )
              }
            }
          )
        })
        .catch((err) => {
          console.log(" Promise failed:", err)
          return false;
        })
}

for(let i=3;i<2500;){
  if(mintNFT("https://gateway.pinata.cloud/ipfs/QmPFZM2kwV4BUy8ptQoPYydG3vnyQiNeQfF7D8p8HhSDYf")){
    i++
    console.log("NFT #%d has been minted",i)
  }

}