import './App.css';
import LandMap from './LandMap.js';
import Login from "./Login"

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <h1 id="title">Decentraland</h1>
      </header>
      <Login/> {/*Need to implement the users: buyer, seller and guest 
       <Instructions/> */}
      <LandMap/>
    </div>
  );
}

export default App;
