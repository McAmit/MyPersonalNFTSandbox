import React, { useEffect, useState } from 'react'
import MetaMaskOnboarding from '@metamask/onboarding'
import {useHistory} from 'react-router-dom';
import { render } from 'react-dom';
var userName = ""
//let checker = false

const forwarderOrigin = 'http://localhost:3000';
const initialize = () => {
  //Basic Actions Section
  const onboardButton = document.getElementById('connectButton');
  const { ethereum } = window;
  //Created check function to see if the MetaMask extension is installed
  const isMetaMaskInstalled = () => {  
    return Boolean(ethereum && ethereum.isMetaMask);
  };
  const onboarding = new MetaMaskOnboarding({ forwarderOrigin });

  const onClickInstall = () => {
    onboardButton.innerText = 'Onboarding in progress';
    onboardButton.disabled = true;
    //On this object we have startOnboarding which will start the onboarding process for our end user
    onboarding.startOnboarding();
  };

  const onClickConnect = () => {
      // Will open the MetaMask UI
      
        try {
          onboardButton.disabled = true;
          ethereum.request({ method: 'eth_requestAccounts' });

        } catch (error) {
          console.error(error);
        }
    
  };

  const MetaMaskClientCheck = () => {
    //Now we check to see if Metmask is installed
    if (!isMetaMaskInstalled()) {
      //If it isn't installed we ask the user to click to install it
      onboardButton.innerText = 'Click here to install MetaMask!';
      //When the button is clicked we call th is function
      onboardButton.onclick = onClickInstall;
      //The button is now disabled
      onboardButton.disabled = false;
    } else {
      //If MetaMask is installed we ask the user to connect to their wallet
      onboardButton.innerText = 'Connect your MetaMask';
      //When the button is clicked we call this function to connect the users MetaMask Wallet
      onboardButton.onclick = onClickConnect;
      //The button is now disabled
      onboardButton.disabled = false;
    }
  };
  
  MetaMaskClientCheck()
  checkConnection()
};

function checkConnection() {
    
    const { ethereum } = window;
    return ethereum.request({ method: 'eth_accounts' }).then(handleAccountsChanged).catch(console.error);
    // checker = true;  
}

function handleAccountsChanged(accounts) {
  console.log(accounts);
  let currentAccount = ""
  if (accounts.length === 0) {
    console.log("You're not connected to MetaMask")
    document.getElementById('connectOrNot').innerHTML = "You are not connected to MetaMask"
    // document.getElementById('getAccountsResult').innerHTML = ""

  } else if (accounts[0] !== currentAccount) {
    currentAccount = accounts[0];
    // document.getElementById('getAccountsResult').innerHTML = "Account Address: "+accounts[0] || 'Not able to get accounts';
    console.log("Connected")
    document.getElementById('connectButton').disabled = true;
    document.getElementById('button2').disabled = false;
    document.getElementById('connectOrNot').innerHTML = "You are Connected as:" + currentAccount
    sessionStorage.setItem('username', userName)
    return true
  }
  
}

function UserLogin() {
  const [isConnected,setIsConnected] = useState() 
  const nav = useHistory()

  useEffect(() => {
      checkConnection().then((connected) => {
        if (connected) {
          setIsConnected(true)
        }
        
      });
  },[])

   function click() {
    initialize()
   }
   function moveOnClick() {
    nav.push("./user")
   }
  return (
    <div>
        <h4 id="connectOrNot"> You are not connected to MetaMask </h4>
        <button id="connectButton" onClick={click} disabled={isConnected}> Connect your MetaMask </button>
       <button id="button2" disabled={!isConnected} onClick={moveOnClick}>Check Out Our Lands!<br/>(Only Members)</button>
    </div>
  )
}

export default UserLogin;