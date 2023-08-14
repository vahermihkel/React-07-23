import React, { useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import tootedFailist from "../data/tooted.json";

function MuudaToode() {
  const { index } = useParams();
  const leitud = tootedFailist[index];
  const nimiRef = useRef();
  const hindRef = useRef();
  const piltRef = useRef();
  const aktiivneRef = useRef();
  const navigate = useNavigate();

  // use-d on Reacti HOOKid ehk Reacti erikood, selle abil React lihtsustab JavaScripti
  // Reeglid:
  // 1. kõik algavad use- eesliidesega
  // 2. kõik tuleb importida
  // 3. alati on sulg lõpus ehk ta tuleb käivitada
  // 4. ta ei tohi olla funktsiooni sees loodud
  // 5. ta ei tohi olla dünaamiliselt loodud (vahepeal pole loodud)

  const muuda = () => {
    tootedFailist[index] = {
      nimi: nimiRef.current.value,
      hind: Number(hindRef.current.value),
      pilt: piltRef.current.value,
      aktiivne: aktiivneRef.current.checked,
    };
    navigate("/halda");
  };

  if (leitud === undefined) {
    return <div>Toodet ei leitud!</div>;
  }

  return (
    <div>
      <label>Toote nimi</label> <br />
      <input ref={nimiRef} defaultValue={leitud.nimi} type="text" /> <br />
      <label>Toote hind</label> <br />
      <input ref={hindRef} defaultValue={leitud.hind} type="number" /> <br />
      <label>Toote pilt</label> <br />
      <input ref={piltRef} defaultValue={leitud.pilt} type="text" /> <br />
      <label>Toote aktiivne</label> <br />
      <input ref={aktiivneRef} defaultChecked={leitud.aktiivne} type="checkbox" />
      <br />
      <button onClick={muuda}>Muuda</button> <br />
    </div>
  );
}

export default MuudaToode;
