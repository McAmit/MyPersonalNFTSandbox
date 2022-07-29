import {Route, Routes } from 'react-router-dom'; 
import LandMap from '../LandMap.js';
import UserLogin from '../UserLogin.js'
import Guest from './Guest.js'
import Home from './Home.js'

function LoginPage() {
  return (
    <div className='LoginPage'>
        <Routes>
            <Route path="/user" element={<LandMap/>}></Route>
            <Route path="/" element={<Home/>}></Route>
            <Route path="/guest" element={<Guest/>}></Route>
        </Routes>
    </div>
  )
}

export default LoginPage