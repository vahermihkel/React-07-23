// import logo from './logo.svg'; edit ---> toggle line comment
import './App.css';
import { Link, Route, Routes } from 'react-router-dom';
import Avaleht from './pages/Avaleht';
import LisaToode from './pages/LisaToode';
import Ostukorv from './pages/Ostukorv';
import Seaded from './pages/Seaded';
import { useState } from 'react';
import MitteLeitud from './pages/MitteLeitud';

function App() {
  const [teema, uuendaTeema] = useState(localStorage.getItem("teema"));

  const uuendaTeemaHeledaks = () => {
    uuendaTeema("hele");
    localStorage.setItem("teema", "hele");
  }

  const uuendaTeemaTumedaks = () => {
    uuendaTeema("tume");
    localStorage.setItem("teema", "tume");
  }

  return (
    <div className={teema === "tume" ? "tume-leht" : "hele-leht"}>
      <Link to="/">
        <img className="pilt" src="https://nobecars.com/wp-content/uploads/2022/01/Untitled-2-5-1024x473.png" alt="" />
      </Link>

      {
        teema === "tume" ?
          <button onClick={uuendaTeemaHeledaks}>Heledaks</button> :
          <button onClick={uuendaTeemaTumedaks}>Tumedaks</button>
      }

      {/* { teema === "tume" && <button>Heledaks</button> }
      { teema === "hele" && <button>Tumedaks</button> } */}

      <Link to="/lisa-toode">
        <button className="nupp">Lisa toode</button>
      </Link>

      <Link to="/ostukorv">
        <button className="nupp">Ostukorvi</button>
      </Link>

      <Link to="/settings">
        <button className="nupp">Seaded</button>
      </Link>

      <Routes>
        <Route path="" element={ <Avaleht /> } />
        <Route path="lisa-toode" element={ <LisaToode /> } />
        <Route path="ostukorv" element={ <Ostukorv /> } />
        <Route path="settings" element={ <Seaded /> } />
        <Route path="*" element={ <MitteLeitud /> } />
      </Routes>

    </div>
  );
}

export default App;
