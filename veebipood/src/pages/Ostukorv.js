import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function Ostukorv() {
  const [ostukorv, uuendaOstukorv] = useState(["Coca cola", "Fanta", "Sprite"]);

  // ostukorvi lisamine

  // ostukorvist kustutamist

  // ostukorvi tühjendamine

  return (
    <div>
      {ostukorv.map(toode => <div>{toode}</div>)}
      {/* dünaamika: mingil juhul on märge ostukorv on tühi, mingil juhul pole */}
      <div>Ostukorv on tühi</div>
      <Link to="/lisa-toode">Tooteid lisama</Link>
    </div>
  )
}

export default Ostukorv

// kus teen "npm start" - sinna tulevad koodivead
// kompileerimise vead ehk:
// 1. import tegemata
// 2. muutuja seos vale
// 3. HTML pole üks komplekt
// jnejne

// run-time error ehk käimasolemise error
// parem klõps -> inspect -> console
// 1. className --> väikse n tähega
// 2. URL vale
