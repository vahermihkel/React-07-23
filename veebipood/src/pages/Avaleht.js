import React, { useState } from 'react'

function Avaleht() {  // Muudmoodi ei saagi väärtusi HTMLs muuta kui useState
  const [kogus, uuendaKogus] = useState(Number(localStorage.getItem("kogus"))); // number --> kokkuarvutusteks, võrdusteks, tehted
  const [laigitud, uuendaLaigitud] = useState(false); //kahendväärtus ehk boolean
  const [sonum, uuendaSonum] = useState("Uuenda kogust!"); // võta esimene täht, tagurpidi keerata
  // Reacti hook ehk Reacti erikood. Muudab väärtusi HTMLs

  function nulli() { // <----------
    uuendaKogus(0);
    uuendaSonum("Panid tagasi nulli!");
    localStorage.setItem("kogus", 0); // localStoragesse tuleb saata jutumärkide kujul väärtus
  } // <----------

  function vahenda() { // <----------
    uuendaKogus(kogus - 1); // HTMLi uuenduseks
    uuendaSonum("Vähendasid kogust!");
    localStorage.setItem("kogus", kogus - 1); // localStorage-sse salvestuseks
  } // <--------

  function suurenda() { // <----------
    uuendaKogus(kogus + 1);
    uuendaSonum("Suurendasid kogust!");
    localStorage.setItem("kogus", kogus + 1);
  } // <----------

  return (
    <div>
      { laigitud === true && <img src="/laigitud.svg" alt="" />}
      { laigitud === false && <img src="/mittelaigitud.svg" alt="" />}
      {/* 
      ternary operator     TINGIMUS ? KUI_TINGIMUS_TÕDE : KUI TINGIMUS_VÄÄR
      AND operator         TINGIMUS && KUI_TINGIMUS_TÕDE
      { laigitud === true ? 
            <img src="/laigitud.svg" alt="" /> : 
            <img src="/mittelaigitud.svg" alt="" /> 
      } */}
      <span>{laigitud}</span>
      { laigitud === true && <button onClick={() => uuendaLaigitud(false)}>Muuda mittelaigituks</button> }
      { laigitud === false && <button onClick={() => uuendaLaigitud(true)}>Muuda laigituks</button> }
      {/* { laigitud === true ? 
        <button onClick={() => uuendaLaigitud(false)}>Muuda mittelaigituks</button> :
        <button onClick={() => uuendaLaigitud(true)}>Muuda laigituks</button>
      } */}
      <br /><br />

      <div>{sonum}</div>
      { kogus !== 0 && <button onClick={nulli}>Tagasi nulli</button> }
      <button disabled={kogus === 0} onClick={vahenda}>-</button>
      <span className={kogus >= 10 ? "kuldne" : undefined}>{kogus} tk</span>
      <button onClick={suurenda}>+</button>
    </div>
  )
}

export default Avaleht

// HTML:
// tumesinine - sissekirjutatud tüüp - tag: img, button, div, span
// tavaline sinine - muutujad HTMLs
// helesinine - tagi atribuudid (omadused): onClick, className, src, alt, path, element, to
// kollane - funktsioon
// valge - väljanäidatav, märgid
// oranž/punane - sõna, jutumärkide vahel
// roheline - suure tähega roheline - imporditud tag, peab olema import: <Avaleht />   <BrowserRouter /> <Route />

// JavaScript:
// tumesinine - sissekirjutatud tüüp - reserveeritud sõnad: const, let, function, true, false, undefined, null
// tavaline sinine - muutujad
// helesinine - muutuja võtmed (omadused): ref.current.value    .length
// kollane - funktsioon
// valge - märgid
// oranž/punane - sõna, jutumärkide vahel
// roheline - suure tähega roheline - imporditud klass