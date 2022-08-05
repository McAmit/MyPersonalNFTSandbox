import React, { useEffect, useState } from 'react'
import Popup from 'reactjs-popup';
import {useHistory} from 'react-router-dom';

const ethers = require("ethers")
const contract = require("./abi.json")
const nftABI = contract.abi
const nftAddress = "0xA54b28279C6FeB36A695Db9F98b41F3f1dE7c75f"

const provider = new ethers.providers.Web3Provider(window.ethereum)
const signer = provider.getSigner()

const nftContract = new ethers.Contract(nftAddress,nftABI,provider)

const ownerAddress = "0xEEd4028BeF9DC4E72Aa809954ccbd0a85d2d855C"
var currentUser=sessionStorage.getItem('username')

function getAddress(id) {
    return nftContract.ownerOf(id).then(owner => owner)
}
function buyLand(landID){
  if(!isUser())
    return "only Metamask users can buy!"
  if(checkIfImOwner())
    return "This land is already yours!"
  else {
    // make TXN
  }

}

function isUser(){ 
  if(currentUser!=="undefined") 
    return false
  return true
}

function Land({x, y, uKeytd, isOpen}) {
      const [showPopup, setShowPopup] = useState(false);
      const nav=useHistory()

      const PopUp = () => {
        const [thereIsGame,setThereIsGame]=useState(() => {return false}) 
        const [selectedValueGameInsert, setSelectedValueGameInsert] = useState(()=> {return "there is no game in this land"})
        const [ownerAddressLand, setAddress] = useState("")
        const [price,setPrice] = useState(5)

        function checkIfImOwner(){
          console.log("currentUser: ", currentUser)
          console.log("Owner: ", ownerAddressLand.toLowerCase())
          if(currentUser === ownerAddressLand.toLowerCase()){  
            return true
          }
          return false
        }

        function priceSet(num){
          if(!checkIfImOwner())
            document.getElementById("priceMessage").innerText="Cannot change the price of a land you do not own"
          else{
            setPrice(num)
          }
        }

        function onClickPlay(){
          if (selectedValueGameInsert === "Connect4")
            nav.push("./user/connect4/")
          else if (selectedValueGameInsert === "Tic-Tac-Toe"){
            nav.push("./user/tictactoe/")
          }
        }

        function addGameToLand(e){
          if(checkIfImOwner(uKeytd+1)){
            setThereIsGame(true)
            console.log(thereIsGame)
            document.getElementById('addedGame').innerHTML = "Game Added!"
          }
          else {
            document.getElementById('addedGame').innerHTML = "Sorry, You are not the owner of this NFT"
          }
        }

        function handleSelectedValueGameInsert(e){
          if(checkIfImOwner(uKeytd+1)){
            console.log("e: ", e.target.value)
            setSelectedValueGameInsert(e.target.value)
          }
        }

        useEffect(() => {
          getAddress(uKeytd).then(addressFromContract => {
            setAddress(addressFromContract)
          })
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
                  <b>ID: </b>#{uKeytd+1}
                  <br></br>
                  <b>Owner: </b>{ownerAddressLand.toLowerCase()}
                  <br></br>
                  <b>Price in DNA Tokens: </b>{price}
                  <br></br>
                  <b id="priceMessage"></b>
                  <br></br>
                  <b>Game exist:</b> No
  
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
                    <p id="butPrice"></p>
                    <button id="button2">Buy</button>
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
                    <input id="sellPrice" placeholder='Set a Price'></input>
                    <br></br>
                    <button id="button2">Submit</button>
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
                        <h3>{selectedValueGameInsert}</h3>
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
                        <select defaultValue={"Tic-Tac-Toe"} id="SelectGames" name="Games" onChange={e => handleSelectedValueGameInsert(e)}>
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
    else if(x===0 & y===0){ // Need to implement a game and change the land when the owner decided 
      return (<td onClick={onClickLand} className='td' id="purple" key={"td"+uKeytd}>{showPopup && <PopUp />}</td>)
    }
    else {
        return (<td onClick={onClickLand} className='td' key={"td"+uKeytd}>{showPopup && <PopUp />}</td>)
    }
}

export default Land;