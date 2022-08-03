import React from 'react'
import LandMap from '../LandMap'

function User() {
var user=sessionStorage.getItem('username') //maybe in DIV
  return (
    <div>
        <LandMap userName={user}/>
     </div>
  )
}

export default User