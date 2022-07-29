require("dotenv").config()
const API_URL = process.env.API_URL
const PUBLIC_KEY = process.env.PUBLIC_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;


const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(API_URL)


const contract = require("../artifacts/contracts/DANFT.sol/DANFT.json")
//console.log(JSON.stringify(contract.abi))  //print the ABI
const contractAddress = "0x37d8fd36355A62C29c1811eEaBCA04Ef34144DD4"
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

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function mintPls() {
  for(let i=6;i<=10;i++){
    const success = await mintNFT("https://gateway.pinata.cloud/ipfs/QmPFZM2kwV4BUy8ptQoPYydG3vnyQiNeQfF7D8p8HhSDYf")
    await sleep(5000)
    console.log("NFT #%d has been minted",i)
  }
}

mintPls()