// rfce
import React, { useState } from 'react'

function Seaded() {           // OR operator
    const [keel, uuendaKeel] = useState(localStorage.getItem("keel") || "est");  // let kasutaja = "vsdasdasd"; // let ---> lokaalne muutuja

  // const uuendaKasutaja = () => {
  //   kasutaja = "dasdasdsa";
  //   console.log(kasutaja); // <--- logidesse väljaprint      (print, System.out.println)
  // }

  const keelEst = () => {
    uuendaKeel("est");
    localStorage.setItem("keel", "est" );
  }

  const keelEng = () => {
    uuendaKeel("eng");
    localStorage.setItem("keel", "eng" );
  }

  const keelRus = () => {
    uuendaKeel("rus");
    localStorage.setItem("keel", "rus" );
  }

  return (
    <div>
      <button onClick={keelEst}> Eesti keelseks</button>
      <button onClick={keelEng}>To English</button>
      <button onClick={keelRus}>Pycckuj</button>
      { keel === "est" && <div>Leht on eesti keelne</div>}
      { keel === "eng" && <div>Page is in English</div>}
      { keel === "rus" && <div>Pycckij jasõk</div>}
    </div>
  )
}

export default Seaded