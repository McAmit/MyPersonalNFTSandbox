import React, { useState,useEffect } from 'react'
import MetaMaskOnboarding from '@metamask/onboarding'
import {Link,useNavigate} from 'react-router-dom';
var userName = ""
//let checker = false

const forwarderOrigin = 'http://localhost:3000';
const initialize = () => {
  //Basic Actions Section
  const onboardButton = document.getElementById('connectButton');
  // const getAccountsButton = document.getElementById('getAccounts');
  // const getAccountsResult = document.getElementById('getAccountsResult');
  const { ethereum } = window;
  //Created check function to see if the MetaMask extension is installed
  const isMetaMaskInstalled = () => {
    
    //Have to check the ethereum binding on the window object to see if it's installed
    return Boolean(ethereum && ethereum.isMetaMask);
  };

  //We create a new MetaMask onboarding object to use in our app
  const onboarding = new MetaMaskOnboarding({ forwarderOrigin });

  //This will start the onboarding proccess
  const onClickInstall = () => {
    onboardButton.innerText = 'Onboarding in progress';
    onboardButton.disabled = true;
    //On this object we have startOnboarding which will start the onboarding process for our end user
    onboarding.startOnboarding();
  };

  const onClickConnect = async () => {
      // Will open the MetaMask UI
      // You should disable this button while the request is pending!
      
        try {
          onboardButton.disabled = true;
          await ethereum.request({ method: 'eth_requestAccounts' });



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
  
  MetaMaskClientCheck();
  checkConnection();
  //history.push("./user", { replace: true })
  
};

async function checkConnection() {
    
    const { ethereum } = window;
     await ethereum.request({ method: 'eth_accounts' }).then(handleAccountsChanged).catch(console.error);
    // checker = true;  
}

function handleAccountsChanged(accounts) {
  console.log(accounts);
  let currentAccount = ""
  if (accounts.length === 0) {
    document.getElementById('connectButton').disabled = true;
    console.log("You're not connected to MetaMask")
    document.getElementById('connectOrNot').innerHTML = "You are not connected to MetaMask"
    // document.getElementById('getAccountsResult').innerHTML = ""

  } else if (accounts[0] !== currentAccount) {
    currentAccount = accounts[0];
    // document.getElementById('getAccountsResult').innerHTML = "Account Address: "+accounts[0] || 'Not able to get accounts';
    console.log("Connected")
    document.getElementById('connectOrNot').innerHTML = "You are Connected"
  }
  userName = currentAccount
  sessionStorage.setItem('username', userName)
}

function UserLogin() {
  const [checker,setChecker]=useState() 
  let nav=useNavigate()
   function click() {
    initialize()
    setChecker(true)
   }
   function moveOnClick(){
    nav("./user")
   }
  return (
    <div>
        <h4 id="connectOrNot"> You are not connected to MetaMask </h4>
        <button id="connectButton" onClick={click} disabled={checker}> 
          Connect your MetaMask
        </button>
       <button id="goToMap" disabled={!checker} onClick={moveOnClick}>Check Out Our Lands!</button>
    </div>
  )
}

export default UserLogin;