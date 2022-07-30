import React, { useEffect, useState } from 'react'
import Popup from 'reactjs-popup';
import {useNavigate} from 'react-router-dom';
const ethers = require("ethers")

const contract = require("./abi.json")
const nftABI = contract.abi
const nftAddress = "0x37d8fd36355A62C29c1811eEaBCA04Ef34144DD4"

const provider = new ethers.providers.Web3Provider(window.ethereum)
const signer = provider.getSigner()

const nftContract = new ethers.Contract(nftAddress,nftABI,provider)

var currentUser=sessionStorage.getItem('username')

async function getAddress(id) {
  const owner = await nftContract.ownerOf(id)
  return owner
}
async function buyLand(landID){
  if(checkIfImOwner())
    return "This land is already yours!"
  else {
    // make TXN
  }

}

async function checkIfImOwner(id){
  if(currentUser===getAddress(id))
    return true

  return false
}

function isUser(){ 
  if(currentUser!=="undefined") 
    return false
  return true
}

function Land({x, y, uKeytd}) {
    let nav=useNavigate()
    const PopUp = () => {
      const [address, setAddress] = useState()
      const [price,setPrice] = useState()

      function priceSet(num){
        if(!checkIfImOwner())
          document.getElementById("priceMessage").innerText="Cannot change the price of a land you do not own"
        else 
          setPrice(num)
      }

      function onClickPlay(){
        nav("./tictactoe")
      }

      function addGameToLand(game){
        
      }

      useEffect(() => {
          (async () => {

            getAddress(uKeytd).then(addressFromContract => {
              setAddress(addressFromContract)
            })
            setPrice(5)
          })()
      }, [])

        return (

          <Popup id="popup"
            trigger={<button className="button"> </button>} // button to open a land with NFT
            modal
            nested
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
                  <b>Owner: </b>{address}
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
                  {/* need to implement disable option while there is no game on land */}
                  <Popup
                    trigger={<button className="button"> Play </button>}
                    modal
                    nested
                  >
                    {close => (<div className="modal" id="popup">
                    <button onClick={close}>&times;</button>
                    <h2 className='header'> Start a Game </h2>
                    <button id="button2" onClick={onClickPlay}>Play</button>
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
                    <select id="SelectGames" name="Games">
                      <option value="Tic-Tac-Toc">Tic-Tac-Toc</option>
                      <option value="temp">temp</option>
                    </select>
                    <br></br>
                    {/* the game value need to chagne to the value we get from the select game: */}
                    <button id="button2" disabled={true} onClick={(game) => addGameToLand(game)}> Insert a Game</button>
                  </div>
                    )}
                  </Popup>
                </div>
              </div>
            )}
          </Popup>
        );


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
          return (<td className='td' id="purple" key={"td"+uKeytd}><PopUp></PopUp></td>)
        }
        else {
            return (<td className='td' key={"td"+uKeytd}><PopUp></PopUp></td>)
        }
}

export default Land;