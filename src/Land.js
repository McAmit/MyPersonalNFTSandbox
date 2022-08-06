import React, { useEffect, useState } from 'react'
import Popup from 'reactjs-popup';
import {useHistory} from 'react-router-dom';
import { getAccountBalance,
    transferNFT,
    distributeNFT,
     distributeTokens,
    transferTokens} from './util/web3Interaction.js'
const ethers = require("ethers")
const contract = require("./abi.json")
const nftABI = contract.abi
const nftAddress = "0xA54b28279C6FeB36A695Db9F98b41F3f1dE7c75f"

const provider = new ethers.providers.Web3Provider(window.ethereum)
const signer = provider.getSigner()

const nftContract = new ethers.Contract(nftAddress,nftABI,signer)

const ownerAddress = "0xEEd4028BeF9DC4E72Aa809954ccbd0a85d2d855C"

const openSaleKey = 'openSale'
const gameKey = 'savedGames'

function getAddress(id) {
  console.log("ID: ",id)
    return nftContract.ownerOf(id).then(owner => owner)
}

function getInitializeSale() {
  const sale = localStorage.getItem(openSaleKey)
  if (!sale) {
      return JSON.stringify({})
  }
  return JSON.parse(sale)
}
function getInitialGames(){
  const game = localStorage.getItem(gameKey)
  if(!game){
    return JSON.stringify({})
  }
  return JSON.parse(game)
}

function getItem(key,mapKey)  {
  const itemString = localStorage.getItem(mapKey);
  if(!itemString) {
    return null
  }
  return JSON.parse(itemString)[key]
}

function setItem(item,mapKey) {
  const saleString = localStorage.getItem(mapKey)
  if(saleString){
    try {
      const sale = JSON.parse(saleString)
      sale[item.id] = item
      localStorage.setItem(mapKey, JSON.stringify(sale))
    } catch (e) {
      console.log(e)
    }
  }else {
    const sale=JSON.parse('{}')
    sale[item.id]=item
    localStorage.setItem(mapKey, JSON.stringify(sale))
  }
  
  
}


function removeItem(id,mapKey) {
  const sale = getInitializeSale()
  if (sale[id]) {
    delete sale[id]
    localStorage.setItem(mapKey, JSON.stringify(sale))
  }
}


function Land({x, y, uKeytd, isOpen}) {
      const [showPopup, setShowPopup] = useState(false)
      const [thereIsGame,setThereIsGame]=useState(false) 
      const nav=useHistory()
      
      useEffect(() => {
          const game = getItem(uKeytd,gameKey)
          if(game){
            setThereIsGame(true)
          }
      })

      const PopUp = () => {
        const [isForSale, setIsForSale] = useState(false)
        const [selectedValueGameInsert, setSelectedValueGameInsert] = useState(getInitialGames())
        const [ownerAddressLand, setAddress] = useState("")
        const [currentUser,setCurrentUser]=useState(sessionStorage.getItem('username'))
        const [openSales,setOpenSales]=useState(getInitializeSale())
        const [priceForSale, setPriceForSale] = useState()
        const [balanceETH, setBalanceETH] = useState(0)
        const [balanceDNA, setBalanceDNA] = useState(0)
        checkBalanceDNA()
        checkBalanceETH()
        function checkIfImOwner(){
          console.log("me",currentUser)
          console.log("compareto",ownerAddressLand)
          if(currentUser === ownerAddressLand.toLowerCase()){  
            return true
          }
          return false
        }

        function possibleToBuy(){
          let gasPrice = 100000 // wie
          if(balanceDNA!=="0")
          if ((balanceETH >= gasPrice &&priceForSale<=parseInt(balanceDNA))){
            return true
          }
          return false
        }

        function distTokens(){
          if(!balanceDNA){
            let number = BigInt(100*10**18)
            console.log(number)
            distributeTokens(currentUser, number).then((tx)=> {console.log(tx,"\n 100 DNA added to: ",currentUser)})
          } else {
            console.log("Current Buyer has ",balanceDNA," DNATokens at the moment")
          }
        }

        function onClickBuy(){
          distTokens()
          if(isForSale){
            //console.log(possibleToBuy())
            if(possibleToBuy()){
              const item=getItem(uKeytd,openSaleKey)
              console.log("token: ", balanceDNA)
              transferTokens(currentUser,item.address,BigInt(priceForSale*10**18)).then((tx)=>{
                console.log("token transfer hash: ",tx)
                distributeNFT(currentUser,uKeytd).then((nftTxn)=>{
                  console.log("NFT hash: ",nftTxn)
                  removeItem(uKeytd,openSaleKey)
                  setPriceForSale()
                  setIsForSale(false)
                })
              })
            }
            else{
               //document.getElementById("").innerText="You don't have enough money"
            }
          }
        }
      

        function onClickSell(){
          if(checkIfImOwner()) {
            
            if(currentUser.toLowerCase() !== ownerAddress.toLowerCase()) {
              if(!getItem(uKeytd,openSaleKey)){
              transferNFT(currentUser, ownerAddress, uKeytd).then(txn=>{
                setIsForSale(true) 
                console.log('item saved', txn)
                setItem({id: uKeytd, address:currentUser,requiredPrice:priceForSale},openSaleKey)

              }) 
              }else{
                setIsForSale(true)
                setItem({id: uKeytd, address:currentUser,requiredPrice:priceForSale},openSaleKey)
              }
            }
            else {
              setIsForSale(true)
              console.log('item saved')
              setItem({id: uKeytd, address:currentUser,requiredPrice:priceForSale},openSaleKey)
            }
          }
          else{
            document.getElementById("msgSale").innerText = "Sorry, You are not the owner of this Land"
          }
        }

        function onClickPlay(){
          if (selectedValueGameInsert[uKeytd].str === "Connect4")
            nav.push("./user/connect4/")
          else if (selectedValueGameInsert[uKeytd].str === "Tic-Tac-Toe"){
            nav.push("./user/tictactoe/")
          }
        }

        function addGameToLand(e){
          if(checkIfImOwner(uKeytd)){
            setThereIsGame(true)
            console.log(thereIsGame)
            document.getElementById('addedGame').innerHTML = "Game Added!"
          }
          else {
            document.getElementById('addedGame').innerHTML = "Sorry, You are not the owner of this NFT"
          }
        }

        function handleSelectedValueGameInsert(e,uniqueID){
          if(checkIfImOwner(uKeytd)){
            if(e.target.value==="ChooseGame"){
              document.getElementById('addedGame').innerHTML = "Choose a game to Add!"
            }
            const value = {id:uniqueID,str:e.target.value}
            console.log("e: ",value )
            setSelectedValueGameInsert(value)
            setItem(value,gameKey)
          }
        }
        function checkBalanceDNA(){
          getAccountBalance(currentUser).then(
            balance => {setBalanceDNA(balance.substr(0,balance.length-18))})
        }

        function checkBalanceETH(){
          window.ethereum.request({
            method: "eth_getBalance",
            params: [currentUser, "latest"]
          }).then(balance => {setBalanceETH(balance)})
        }

        function showIsForSale(){
          if(isForSale){
            return "true"
          }else {
            return "false"
          }
        }

        function showIsGameExist(){
          if(thereIsGame){
            return "true"
          }else {
            return "false"
          }
        }
        function gameStringMaker(){
          if(thereIsGame)
            return selectedValueGameInsert[uKeytd].str
          return "No Game in this Land's DNA"
        }


        useEffect(() => {
          window.ethereum.request({ method: 'eth_accounts' }).then(acc=>{
            console.log("Active User: ",acc)
            setCurrentUser(acc[0])
          })
            const item = getItem(uKeytd,openSaleKey)
            console.log("Item from localStorage ", item)
            if (item) {
              setAddress(item.address.toLowerCase())
              setPriceForSale(item.requiredPrice)
              setIsForSale(true)
            } else {
              getAddress(uKeytd).then(addressFromContract => {
                setAddress(addressFromContract.toLowerCase())
              })
            }
            const game = getItem(uKeytd,gameKey)

          
          
        }, [])

        return (

          <Popup id="popup"
            trigger={<button className="button"> </button>} // button to open a land with NFT
            modal
            nested
            close={() => setShowPopup(false)}
          >
            {close => (
              <div className="modal" id="popup">
                <button className="close" onClick={close}>&times;</button>
                <div><br></br></div>
                <div className="header"> NFT D&A</div>
                <div><br></br></div>
                <div className="content">
                  <b>Index Location:</b> ({x}, {y})
                  <br></br>
                  <b>ID: </b>#{uKeytd}
                  <br></br>
                  <b>Owner: </b>{ownerAddressLand.toLowerCase()}
                  <br></br>
                  <br></br>
                  <b id="priceMessage"></b>
                  <br></br>
                  <b>Game exist:</b> {showIsGameExist()} 
                  <br></br>
                  <b>For Sale:</b> {showIsForSale()}
                  <br></br>
                  <p id="Price"><b id="Price">Price in DNA Tokens:</b>{priceForSale ? `${priceForSale}`  : 'Not for Sale'}</p> 
                </div>
                <div><br></br></div>
                <div className="actions">
  
                  {/* BUY Action*/}
                  <Popup id="buyPage" trigger={<button className="button"> Buy </button>}
                    modal
                    nested
                  >
                    {close => (<div className="modal" id="popup">
                    <button onClick={close}>&times;</button>
                    <h2 className='header'> Buy </h2>
                    <h2>Do you want to buy?</h2>
                    <button id="button2" disabled={!isForSale} onClick={()=> onClickBuy()}>Buy</button>
                  </div>
                    )}
                  </Popup>
  
                  {/* SELL Action */}
                  <Popup  trigger={<button className="button"> Sell </button>}
                    modal
                    nested
                  >
                    {close => (<div className="modal" id="popup">
                    <button onClick={close}>&times;</button>
                    <h2 className='header'> Sell </h2>
                    <input id="sellPrice" placeholder='Set a Price' onChange={e => setPriceForSale(e.target.value)}></input>
                    <br></br>
                    <button id="button2" onClick={() => onClickSell(priceForSale)}>Submit</button>
                    <p id="msgSale"></p>
                  </div>
                    )}
                  </Popup>
  
                      {/* PLAY Action */}
                  <Popup
                        trigger={<button className="button"> Play </button>}
                        modal
                        nested
                      >
                        {close => (<div className="modal" id="popup">
                        <button onClick={close}>&times;</button>
                        <h2 className='header'> Start a Game </h2>
                        <h3>{gameStringMaker()}</h3>
                        <button id="button2" onClick={() => onClickPlay()}>Play</button>
                      </div>
                        )}
                      </Popup>
                  {/* ADD GAME Action */}
                  <Popup
                        trigger={<button className="button"> Add Game </button>}
                        modal
                        nested
                      >
                        {close => (<div className="modal" id="popup">
                        <button onClick={close}>&times;</button>
                        <h2 className='header'> Choose a Game </h2>
                        <select defaultValue={"ChooseGame"} id="SelectGames" name="Games" onChange={e => handleSelectedValueGameInsert(e,uKeytd)}>
                          <option value="ChooseGame">ChooseGame</option>
                          <option value="Tic-Tac-Toe">Tic-Tac-Toe</option>
                          <option value="Connect4">Connect4</option>
                        </select>
                        <br></br>
                        <p id="addedGame"> you didn't choose a game yet</p>
                        <button id="button2" onClick={(e) => addGameToLand(e)}> Insert a Game</button>
                      </div>
                        )}
                      </Popup>
                </div>
              </div>
            )}
          </Popup>
        );
    }

    const onClickLand = () => {
        setShowPopup(true)
    }

    // can't insert NFT on ROADS(blue):
    if( x % 26 === 10 | y % 26 === 10) { 
        return (<td className='td' id="blue" key={"td"+uKeytd}></td>)
    }
    // can't insert NFT on PARKS(green):
    else if((x>10 & x<20 & y>10 & y<20) | (x>26 & x<37 & y>26 & y<37)
    | (x>6 & x<10 & y>36 & y<40)|(y===9 & x<=49 &x>36) |(x>41 &x<48 &y>41 &y<48)|(x>20 &x<27 &y>41 &y<48 | x>20 & x<29 & y >2 & y<7) ){ 
        return (<td className='td' id="green" key={"td"+uKeytd}></td>)
    }
    // insert NFT:
    else if(thereIsGame){  
      return (<td onClick={onClickLand} className='td' id="purple" key={"td"+uKeytd}>{showPopup && <PopUp />}</td>)
    }
    else {
        return (<td onClick={onClickLand} className='td' key={"td"+uKeytd}>{showPopup && <PopUp />}</td>)
    }
}

export default Land;