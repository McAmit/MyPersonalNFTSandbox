require("dotenv").config()
const API_URL = process.env.API_URL
const PUBLIC_KEY = process.env.PUBLIC_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;


const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(API_URL)


const contract = require("../artifacts/contracts/DANFT.sol/DANFT.json")
//console.log(JSON.stringify(contract.abi))  //print the ABI
const contractAddress = "0xA54b28279C6FeB36A695Db9F98b41F3f1dE7c75f"
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
      return signPromise
        .then((signedTx) => {
          return web3.eth.sendSignedTransaction(
            signedTx.rawTransaction,
            function (err, hash) {
              if (!err) {
                console.log("The hash of your transaction is: ",hash,"\nCheck Alchemy's Mempool to view the status of your transaction!")
                return true;
              } else {
                console.log("Something went wrong when submitting your transaction:",err)
              }
            }
          )
        })
        .catch((err) => {
          console.log(" Promise failed:", err)
          return false;
        })
}
async function sentNFT(to,id){
  const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, 'latest');

      const txn = {
        'from': PUBLIC_KEY,
        'to': contractAddress,
        'nonce': nonce,
        'gas': 500000,
        'data': nftContract.methods.transferFrom(PUBLIC_KEY,to,id).encodeABI()
      };
      const signPromise = web3.eth.accounts.signTransaction(txn, PRIVATE_KEY)
      console.log(signPromise)
      return signPromise
        .then((signedTx) => {
          
          return web3.eth.sendSignedTransaction(
            signedTx.rawTransaction,
            function (err, hash) {
              
              if (!err) {
                console.log("The hash of your transaction is: ",hash,"\nCheck Alchemy's Mempool to view the status of your transaction!")
                return true;
              } else {
                console.log("Something went wrong when submitting your transaction:",err)
              }
            }
          )
        })
        .catch((err) => {
          console.log(" Promise failed:", err)
          return false;
        })
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


async function mintmint(){
var lastI=0
async function mintForever(i) {
  for(;i<=2500;i++){
    const success = await mintNFT("https://gateway.pinata.cloud/ipfs/QmPFZM2kwV4BUy8ptQoPYydG3vnyQiNeQfF7D8p8HhSDYf").catch(error=>{
      lastI=i
      i--;  
      console.error(error)
    })
    await sleep(2000)
    console.log("NFT #%d has been minted",i)
    lastI=i
      
  }
}
while(lastI<2500){
    const suces = await mintForever(lastI+1).catch(error=>{
    console.error(error)
    
  })
}
}
const snd =async () => {
  let endFor=436
  for(let i=411;i<endFor;i++){
    const chdadeck = await sentNFT("0x4d7EcF86c524D2F35dAd57879e387cBE1F14e48a",i)
    if(endFor===435){
      endFor=486
      i=461
    }
  }
  
  // const chdadeck2= await sentNFT("0x4d7EcF86c524D2F35dAd57879e387cBE1F14e48a",14)
  // const chdadeck3= await sentNFT("0x4d7EcF86c524D2F35dAd57879e387cBE1F14e48a",15)
}
snd()
//mintmint()