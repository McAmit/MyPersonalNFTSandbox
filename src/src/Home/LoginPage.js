import {Route, Routes } from 'react-router-dom'; 
import User from './User'
import Guest from './Guest.js'
import Home from './Home.js'
import Tictactoe from '../Tictactoe/Tictactoe.js';

function LoginPage() {
  return (
    <div className='LoginPage'>
        <Routes>
            <Route path="/user" element={<User/>}></Route>
            <Route path="/" element={<Home/>}></Route>
            <Route path="/guest" element={<Guest/>}></Route>
            <Route path="/user/tictactoe" element={<Tictactoe/>}></Route>
        </Routes>
    </div>
  )
}

export default LoginPage