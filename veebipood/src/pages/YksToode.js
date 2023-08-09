import React from 'react'
import { useParams } from 'react-router-dom'
import tootedFailist from "../data/tooted.json";

function YksToode() {
  // kui on kandilised, siis peab olema täpselt selline arv muutujaid nagu
  //      mulle ette antakse (useState poolt)
  // const [kogus, uuendaKogus]
  // kui on loogelised, siis võib olla mitu tükki tahes
  const {jrknr} = useParams(); // URLs localhost:3000/pilt/101
  // const {id, name} = useSearchParams(); localhost:3000/pilt?id=101&name=pildike
  const leitud = tootedFailist[jrknr];
  // undefined

  if (leitud === undefined) {
    return <div>Toodet ei leitud!</div>
  }

  return (
    <div>
      <div>Toote järjekorranumber: {jrknr}</div>
      <div>Toote nimi: {leitud.nimi}</div>
      <div>Toote hind: {leitud.hind}</div>
      <div>Toote kirjeldus: ....</div>
      <img src={leitud.pilt} alt="" />
    </div>
  )
}

export default YksToode