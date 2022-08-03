import React from 'react';
import { Switch, Route, Redirect } from "react-router-dom";

import User from './User'
import Guest from './Guest.js'
import Home from './Home.js'
import Tictactoe from '../TictactoeGame/Tictactoe.js';
import MemoryGame from '../MemoryGame/MemoryApp.js';

function LoginPage() {
  return (
    <div className='LoginPage'>
          <Switch>
            <Route path="/user" component={User}></Route>
            <Route path="/" component={Home}></Route>
            <Route path="/guest" component={Guest}></Route>
            <Route path="/user/tictactoe" component={Tictactoe}></Route>
            <Route path="/guest/tictactoe" component={Tictactoe}></Route>
            {/* <Route path="/user/memorygame" element={<MemoryGame/>}></Route> */}
        </Switch>
    </div>
  )
}

export default LoginPage