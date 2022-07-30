import {Route, Routes } from 'react-router-dom'; 
import User from './User'
import Guest from './Guest.js'
import Home from './Home.js'
import Tictactoe from '../TictactoeGame/Tictactoe.js';
import MemoryGame from '../MemoryGame/MemoryApp.js';

function LoginPage() {
  return (
    <div className='LoginPage'>
        <Routes>
            <Route path="/user" element={<User/>}></Route>
            <Route path="/" element={<Home/>}></Route>
            <Route path="/guest" element={<Guest/>}></Route>
            <Route path="/user/tictactoe" element={<Tictactoe/>}></Route>
            {/* <Route path="/user/memorygame" element={<MemoryGame/>}></Route> */}
        </Routes>
    </div>
  )
}

export default LoginPage