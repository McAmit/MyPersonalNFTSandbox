// import React, { useEffect, useState } from 'react'

// const {ethers, Contract} = require("ethers")


// const Provider = new ethers.getDefaultProvider('rinkeby',"https://eth-rinkeby.alchemyapi.io/v2/SCRIwYy2WX0mP7w80_0aWuXcyg19YvOP");
// const RPCProvider = new ethers.providers.JsonRpcProvider("https://eth-rinkeby.alchemyapi.io/v2/SCRIwYy2WX0mP7w80_0aWuXcyg19YvOP",{chainId:4,name:"rinkeby"})
// const wallet = new ethers.Wallet("f22870efb7b117a303e06a8f2df17a9c9c0f9a7f414f6f58f0ba13df20088c52",Provider)

// const nftFile = require("./abi.json")
// const nftABI = nftFile.abi
// const nftAddress = "0xA54b28279C6FeB36A695Db9F98b41F3f1dE7c75f" // NFT contract address
// const tokenAddress = '0x02501eEd50C5489E304864F988F91729091A4C3A' //Token contract address
// const ownerAddress = '0xEEd4028BeF9DC4E72Aa809954ccbd0a85d2d855C'
// const nftContract = new ethers.Contract(nftAddress,nftABI,Provider)
// const tokenFile=require("./tokenAbi.json")
// const tokenABI=tokenFile
// //const DNAcontract = new ethers.Contract(tokenAddress,tokenABI,RPCProvider)


// (async() => {

//   if(window.ethereum) {

//       await window.ethereum.enable();
//       const onCorrectNetwork = window.web3.currentProvider.networkVersion === "4"; //Rinkeby Network ID
//       console.log("onCorrectNetwork", onCorrectNetwork);
//       if(!onCorrectNetwork) {
//           // (Display Text) "Connected to Metamask! You are on different network in MetaMask. Please select Rinkeby";

//       } else {
//           await new Promise(function(resolve, reject) {
//               const intervalId = setInterval(() => {
//                   const metamaskWeb3Provider = new ethers.providers.Web3Provider(window.web3.currentProvider);
//                   window.wallet = metamaskWeb3Provider.getSigner();

//                   if(window.wallet.provider._web3Provider.selectedAddress) {
//                       localStorage.walletAddress = wallet.provider._web3Provider.selectedAddress; //Display the Address
//                       resolve();
//                   }
//               },500);           
//           });
          
//           window.connectedToMetamask = true;
//           window.intervalId = await setInterval(() => {
//               window.wallet.address = wallet.provider._web3Provider.selectedAddress;
//               //showNextButton = true;
//           }, 500);
//           localStorage.address = window.wallet.address;
//       }
//   } else {
//       // (Display Message) "Metamask not found";
//   }
// })();

// class ChainHandler {
//         constructor(currentUser){
//     this.toAddress = ''
//     this.sender = currentUser
// }

//     async kingTransferToken(to){
//         const tokenAmount = ethers.utils.parseUnits("100",18)
//         //const tx = await DNAcontract.transfer(to,tokenAmount)
//         console.log("DONE")
        

//     }
    
//     setToAddress(to){
//         this.toAddress=to
//     }

//     setsender(from){
//         this.sender=from
//     }


//     async giveTokensTo(from,to,amount){
//         this.setToAddress(to)
//         this.setsender(from)

//     }
//     kingGivingBack(to){
//         if(ownerAddress===to) return
//         this.setToAddress(to)
//         this.kingTransferToken(to)
//     }

//     async sendNftTo(from,recipent,id){
//         await nftContract._transfer(from,recipent,id)
//     }



// } 

// export {
//     ChainHandler
// }
