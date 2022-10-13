const alchemyKey= "https://eth-rinkeby.alchemyapi.io/v2/SCRIwYy2WX0mP7w80_0aWuXcyg19YvOP"
const privateKey="f22870efb7b117a303e06a8f2df17a9c9c0f9a7f414f6f58f0ba13df20088c52"
const publicKey="0xEEd4028BeF9DC4E72Aa809954ccbd0a85d2d855C"
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(alchemyKey);

const contractABI = require("../tokenAbi.json");
const contractAddress = "0x02501eEd50C5489E304864F988F91729091A4C3A";

const nftABIJson = require("../abi.json")
const NFTABI=nftABIJson.abi
const nftAddress = "0xA54b28279C6FeB36A695Db9F98b41F3f1dE7c75f"

const saleDetails = new Map()
export const saleMap = saleDetails.set(-1,{address:"",requiredPrice:-1}) // key = id

console.log('Alchemy Key - ' + alchemyKey)
console.log('Contract Address - ' + contractAddress)

export const tokenContract = new web3.eth.Contract(
  contractABI,
  contractAddress
);
export const NFTContract = new web3.eth.Contract(
  NFTABI,
  nftAddress
);


export const loadContractDecimals =  () => {
  return tokenContract.methods.decimals().call();
};


export const getAccountBalance = (address) => {

  const message = tokenContract.methods.balanceOf(address).call();
  return message;

};

export const transferTokens = (address, transferAddress, amount) => { // Transfer ERC-20
  //input error handling
  if (!window.ethereum || address === null || transferAddress === null) {
    return Promise.reject({
      status:
        "💡 Connect your Metamask wallet to update the message on the blockchain.",
    });
  }

  //set up transaction parameters
  const transactionParameters = {
    to: contractAddress, // Required except during contract publications.
    from: address, // must match user's active address.\
    gas: '100000',
    data: tokenContract.methods.transfer(transferAddress, amount).encodeABI(),
  };

  //sign the transaction
  
    return  window.ethereum.request({
      method: "eth_sendTransaction",
      params: [transactionParameters],
    });
   
    
}

export const distributeTokens = (transferAddress,fixedAmount)=>{
  if (!window.ethereum || transferAddress === null) {
    return {
      status:
        "💡 Connect your Metamask wallet to update the message on the blockchain.",
    }
  }
  const txn = {
    to: contractAddress, 
    from: publicKey,
    gas: 100000,
    data: tokenContract.methods.transfer(transferAddress, fixedAmount).encodeABI(),
  }
  const signPromise = web3.eth.accounts.signTransaction(txn, privateKey)
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
export const distributeNFT = (transferAddress,id)=>{
  if (!window.ethereum || transferAddress === null) {
    return {
      status:
        "💡 Connect your Metamask wallet to update the message on the blockchain.",
    }
  }
  const txn = {
    to: nftAddress, 
    from: publicKey,
    gas: 100000,
    data: NFTContract.methods.transferFrom(publicKey,transferAddress, id).encodeABI(),
  }
  const signPromise = web3.eth.accounts.signTransaction(txn, privateKey)
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

export function transferNFT(currentUser, transferAddress, id) { // Transfer ERC-721
  //input error handling
  if (!window.ethereum || currentUser === null || transferAddress === null) {
    return Promise.reject({
      status:
        "💡 Connect your Metamask wallet to update the message on the blockchain.",
    });
  }
  console.log(NFTContract)
  //set up transaction parameters
  const transactionParameters = {
    to: nftAddress, // Required except during contract publications.
    from: currentUser, // must match user's active address.
    data: NFTContract.methods.transferFrom(currentUser,transferAddress, id).encodeABI(),
  };

  return window.ethereum.request({
    method: "eth_sendTransaction",
    params: [transactionParameters],
  })
};