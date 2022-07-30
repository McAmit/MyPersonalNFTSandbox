import React from 'react'
import {useNavigate} from 'react-router-dom';
import UserLogin from '../UserLogin.js'

function Home() {
  let nav = useNavigate()
  function onClickGuest(){
    nav("./guest")
  }
  return (
    <div className='Home'>
        <h1>Welcome Please login</h1>
        <UserLogin/>
        <button id="button2" onClick={onClickGuest}> Start as guest</button>
    </div>
  )
}

export default Home