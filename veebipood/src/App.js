// import logo from './logo.svg'; edit ---> toggle line comment
import './App.css';
import { Link, Route, Routes } from 'react-router-dom';
import Avaleht from './pages/Avaleht';
import LisaToode from './pages/LisaToode';
import Ostukorv from './pages/Ostukorv';
import Seaded from './pages/Seaded';
import { useState } from 'react';
import MitteLeitud from './pages/MitteLeitud';
import Hinnad from './pages/Hinnad';
import Poed from './pages/Poed';
import Tooted from './pages/Tooted';
import HaldaTooted from './pages/HaldaTooted';
import MuudaToode from './pages/MuudaToode';
import YksToode from './pages/YksToode';

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

      <Link to="/hinnad">
        <button className="nupp">hinnad</button>
      </Link>

      <Link to="/poed">
        <button className="nupp">poed</button>
      </Link>

      <Link to="/tooted">
        <button className="nupp">tooted</button>
      </Link>

      <Link to="/halda">
        <button className="nupp">Halda tooted</button>
      </Link>

      <Routes>
        <Route path="" element={ <Avaleht /> } />
        <Route path="lisa-toode" element={ <LisaToode /> } />
        <Route path="ostukorv" element={ <Ostukorv /> } />
        <Route path="settings" element={ <Seaded /> } />
        <Route path="hinnad" element={ <Hinnad /> } />
        <Route path="poed" element={ <Poed /> } />
        <Route path="tooted" element={ <Tooted /> } />
        <Route path="halda" element={ <HaldaTooted /> } />
        <Route path="muuda" element={ <MuudaToode /> } />
        <Route path="toode" element={ <YksToode /> } />
        <Route path="*" element={ <MitteLeitud /> } />
      </Routes>

    </div>
  );
}

export default App;
