import React from "react";
import { useEffect, useState } from "react";
import {
  loadContractDecimals,
  getAccountBalance,
  transferTokens,
  transferNFT,
  distributeTokens,
  //connectWallet
} from "./util/web3Interaction.js";

const SmartContract = () => {
  //state variables
  const [walletAddress, setWallet] = useState("");
  const [status, setStatus] = useState("");
  const [myBalance,setMyBalance]=useState(0);
  const [transferAmount, setTransferAmount] = useState("");
  const [decimals, setDecimals] = useState("No connection to the network."); //default message

  //called only once
  useEffect(() => {

    function setup() {
      setWallet(sessionStorage.getItem('username'))

      loadContractDecimals().then(decim=>{
        setDecimals(decim)
      })
      
      getMyBalance()

      if(myBalance===0){
        distributeTokens(walletAddress,(100*(10**decimals)))
      }

      //addWalletListener();

    }
    setup();
  }, []);


  function addWalletListener() {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          setWallet(accounts[0]);
          setStatus("👆🏽 Populate the Data and Click on Button to execute...");
        } else {
          setWallet("");
          setStatus("🦊 Connect to Metamask using the top right button.");
        }
      });
    } else {
      setStatus(
        <p>
          {" "}
          🦊{" "}
          <a target="_blank" rel="noreferrer" href={`https://metamask.io/download.html`}>
            You must install Metamask, a virtual Ethereum wallet, in your
            browser.
          </a>
        </p>
      );
    }
  }

  const connectWalletPressed =  () => {
    connectWallet().then(walletResponse=>{
      setStatus(walletResponse.status)
      setWallet(walletResponse.address)
    })
    
  };

  const getMyBalance =  () => {
    getAccountBalance(walletAddress).then(balance=>{
      setMyBalance(balance)
    })
  };


  //the UI of our component
  return (
    <div id="container">
      <button id="walletButton" onClick={connectWalletPressed}>
        {walletAddress.length > 0 ? (
          "Connected: " +
          String(walletAddress).substring(0, 6) +
          "..." +
          String(walletAddress).substring(38)
        ) : (
          <span>Connect Wallet</span>
        )}
      </button>
      <p >{status}</p>

      <h2 style={{ paddingTop: "5px" }}>Balance in DNA Tokens : </h2>
      <div>
        <p >{myBalance}</p>
      </div>
    </div>
  );
};

export default SmartContract;