import React from 'react'
import MetaMaskOnboarding from '@metamask/onboarding'
const forwarderOrigin = 'http://localhost:3000';
const initialize = () => {
  //Basic Actions Section
  const onboardButton = document.getElementById('connectButton');
  // const getAccountsButton = document.getElementById('getAccounts');
  const getAccountsResult = document.getElementById('getAccountsResult');

  //Created check function to see if the MetaMask extension is installed
  const isMetaMaskInstalled = () => {
    const { ethereum } = window;
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
};

async function checkConnection() {
    const { ethereum } = window;
     await ethereum.request({ method: 'eth_accounts' }).then(handleAccountsChanged).catch(console.error);
}

function handleAccountsChanged(accounts) {
  console.log(accounts);
  let currentAccount = "undefined"
  if (accounts.length === 0) {
    document.getElementById('connectButton').disabled = false;
    console.log("You're not connected to MetaMask")
    document.getElementById('connectOrNot').innerHTML = "You are not connected to MetaMask"
    document.getElementById('getAccountsResult').innerHTML = ""

  } else if (accounts[0] !== currentAccount) {
    currentAccount = accounts[0];
    document.getElementById('getAccountsResult').innerHTML = "Account Address: "+accounts[0] || 'Not able to get accounts';
    console.log("Connected")
    document.getElementById('connectOrNot').innerHTML = "You are Connected"
  }
}

function connectWeb3(){
  if (typeof web3 !== 'undefined') {
    // Mist, Metamask
    web3 = new Web3(web3.currentProvider);
} else {
    // set the provider you want from Web3.providers
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}
}
function login() {
  return (
    <div>
        <h4 id="connectOrNot"> You are not connected to MetaMask </h4>
        <button id="connectButton" onClick={initialize}>Connect your MetaMask</button>
        <p id="getAccountsResult" ></p>
    </div>
  )
}

export default login;