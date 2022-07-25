import React, { useState } from 'react'
import Land from "./Land.js"

function Lands() {
    let uKeytd = 0 // unique key - td
    let uKeytr = 0 // unique key - tr

    let [lands, setLands] = useState([])

    function createRowLands(x, totalRowLands){
        let landsByRow = []
        for (let y = 0; y < totalRowLands; y++, uKeytd++) {
            landsByRow.push(<Land x={x} y={y} uKeytd={uKeytd} key={"land"+uKeytd} rowLength={totalRowLands}></Land>)
        }
        lands.push(landsByRow)
    }

    function createLands(totalRowLands) {
        if(typeof window !== "undefined"){
                for (let x = 0; x < totalRowLands; x++, uKeytr++) {
                    createRowLands(x, totalRowLands)
                }
        }
    }

  return (
    <div>
        <div className="lands">
            <div className='box'>
                <table className='table'>
                    <thead></thead>
                    <tbody id="tbody-table">
                        {createLands(50)}
                        {console.log("lands len: ", lands.length)} 
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
