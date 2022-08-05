import React from 'react';
import { Switch, Route, Redirect } from "react-router-dom";

import User from './User'
import Guest from './Guest.js'
import Home from './Home.js'
import Tictactoe from '../TictactoeGame/Tictactoe.js';
import Connect4 from '../Connect4/connect4.js'

function LoginPage() {
  return (
    <div className='LoginPage'>
           <Switch>
            <Route exact path="/user" component={User}></Route>
            <Route exact path="/" component={Home}></Route>
            <Route exact path="/guest" component={Guest}></Route>
            <Route path="/user/tictactoe/" component={Tictactoe}></Route>
            <Route path="/guest/tictactoe/" component={Tictactoe}></Route>
            <Route exact path="/user/connect4" component={Connect4}></Route>
            <Route exact path="/guest/connect4" component={Connect4}></Route>
        </Switch>
    </div>
  )
}

export default LoginPage