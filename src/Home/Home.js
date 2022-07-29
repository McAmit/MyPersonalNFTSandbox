import React from 'react'
import {Link} from 'react-router-dom';
import UserLogin from '../UserLogin.js'

function Home() {

  return (
    <div className='Home'>
        <h1>Welcome Please login</h1>
        <UserLogin/>
        <Link to='/guest' id="guest"> Start as guest</Link>
    </div>
  )
}

export default Home