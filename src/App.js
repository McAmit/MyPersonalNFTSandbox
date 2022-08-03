import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import LoginPage from './Home/LoginPage.js';
// import LandMap from './LandMap.js';
// import Login from "./Login"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <header className="App-header"><h1 id="title">Decentraland</h1></header>
        <LoginPage/>
      </BrowserRouter>
    </div>
  );
}

export default App;
