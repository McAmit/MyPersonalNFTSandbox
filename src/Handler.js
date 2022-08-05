import {
    getAccountBalance,
    transferTokens,
    transferNFT,
    distributeTokens,
  } from "./util/web3Interaction.js";

  const decimals = 18 
  class Handler{
    constructor(address){
        console.log("arrived handler")
        this.myAddress=address
        this.myBalance = 0;
        getAccountBalance(this.myAddress).then(balance=>{
            this.myBalance=balance
        })

        //if(this.myBalance === 0)
            //distributeTokens(this.myAddress,100*(10**decimals))
    }

  } 
  export default Handler