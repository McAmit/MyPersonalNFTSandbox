import React from 'react'
import Popup from 'reactjs-popup';

function Land({x, y, uKeytd}) {

    const PopUp = () => (
        <Popup id="popup"
          trigger={<button className="button"> </button>} // button to open a land with NFT
          modal
          nested
        >
          {close => (
            <div className="modal" id="popup">
              <button className="close" onClick={close}>&times;</button>
              <div><br></br></div>
              <div className="header"> NFT </div>
              <div><br></br></div>
              <div className="content">
                <b>Index Location:</b> ({x}, {y})
                <br></br>
                <b>Owner: </b>No Owner
                <br></br>
                <b>Price: </b>100$
                <br></br>
                <b>Game exist:</b> No

              </div>
              <div><br></br></div>
              <div className="actions">

                {/* BUY Action*/}{/* we can separate to new files */}
                <Popup id="buyPage" trigger={<button className="button"> Buy </button>}
                  modal
                  nested
                >
                <button className="buyPage" onClick={close}>&times;</button>
                <h2> Buy Page </h2>
                {/* need to implement here more details and validation... */}
                </Popup>

                {/* SELL Action */}{/* we can separate to new files */}
                <Popup trigger={<button className="button"> Sell </button>}
                  modal
                  nested
                >
                <button className="sellPage" onClick={close}>&times;</button>
                <h2> Sell Page </h2>
                {/* need to implement here more details and validation... */}
                </Popup>

                {/* PLAY Action */}{/* we can separate to new files */}
                <Popup
                  trigger={<button className="button"> Play </button>}
                  modal
                  nested
                >
                <button className="playPage" onClick={close}>&times;</button>
                <h2> GAME </h2>
                {/* need to implement here more details... */}
                </Popup>
              </div>
            </div>
          )}
        </Popup>
      );

        // can't insert NFT on ROADS(blue):
        if( x % 26 === 10 | y % 26 === 10) { 
            return (<td className='td' id="blue" key={"td"+uKeytd}></td>)
        }
        // can't insert NFT on PARKS(green):
        else if((x>10 & x<20 & y>10 & y<20) | (x>26 & x<37 & y>26 & y<37)
        | (x>6 & x<10 & y>36 & y<40)){ 
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