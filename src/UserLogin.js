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
      onboardButton.onC
    }
  };
  
  MetaMaskClientCheck()
};

function checkConnection() {
    
    const { ethereum } = window;
    return ethereum.request({ method: 'eth_accounts' }).then((accounts) => {
      return handleAccountsChanged(accounts)
    }).catch((e)=> {
      console.error('check connection error', e);
    });
    // checker = true;  
}

export function handleAccountsChanged(accounts) {
  if (accounts.length === 0) {
    console.log("You're not connected to MetaMask")
    document.getElementById('connectOrNot').innerHTML = "You are not connected to MetaMask"
    return false;
  }
  const account = accounts[0]
  window.userName=account;
  sessionStorage.setItem('username', account)
  console.log("Connected")
  document.getElementById('connectOrNot').innerHTML = "You are Connected as:" + account
  return true
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
    ethereum.request({ method: 'eth_requestAccounts' }).then(() => {
      checkConnection().then((connected) => {
        if (connected) {
          setIsConnected(true)
        }
      })
    })
    
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
