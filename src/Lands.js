import React, { useEffect, useState } from 'react'
import Land from "./Land.js"
import Handler from './Handler.js'

function Lands(userName) {
    const handy = new Handler(userName)
    //const currentUser=sessionStorage.getItem('username')
    function distTokens(){
        //await handler.kingGivingBack(currentUser)
    }
    let uKeytd = 0 // unique key - td
    // let uKeytr = 0 // unique key - tr

    function createRowLands(x, totalRowLands){
        let landsByRow = []
        for (let y = 0; y < totalRowLands; y++, uKeytd++) {
            landsByRow.push(<Land x={x} y={y} uKeytd={uKeytd} userName={userName} key={"land"+uKeytd} rowLength={totalRowLands}></Land>)
        }
        return landsByRow
    
    }



    function createLands(totalRowLands) {
        const lnds = []
        for (let x = 0; x < totalRowLands; x++) {
            lnds.push(createRowLands(x, totalRowLands))
        }
        return lnds
    
    }


    const lands = createLands(50)
    useEffect(() => {
        
    }, [])

  return (
    <div>
        <div className="lands">
            <div className='box'>
                <table className='table'>
                    <thead></thead>
                    <tbody id="tbody-table">
                        { lands.map((landsByRow, key) => {
                            return (
                                <tr key={key}>
                                    {landsByRow}
                                </tr>
                            )
                        })}
                    </tbody>
                    <tfoot></tfoot>
                </table>
            </div>
        </div>
    </div>
  )


} export default Lands;
