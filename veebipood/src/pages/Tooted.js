import React, { useState } from "react";
import ostukorvFailist from "../data/ostukorv.json"; // ../ või ./ võtab meie kaustadest
import { ToastContainer, toast } from 'react-toastify'; // lihtsalt nimega alustades võtab node_modules kaustast
import tootedFailist from "../data/tooted.json";
import { Link } from "react-router-dom";

function Tooted() {
  const [tooted, uuendaTooted] = useState(tootedFailist.filter(toode => toode.aktiivne === true));

  const lisaOstukorvi = (klikitudToode) => {
    ostukorvFailist.push(klikitudToode);
    toast.success("Edukalt ostukorvi lisatud!");
  };

  const sorteeriAZ = () => {
    tooted.sort((a, b) => a.nimi.localeCompare(b.nimi, "et"));
    uuendaTooted(tooted.slice())}
  
  const sorteeriZA = () => {
    tooted.sort((a, b) => b.nimi.localeCompare(a.nimi, "et"));
    uuendaTooted(tooted.slice())}

  const sorteeriHindKasv = () => {
    tooted.sort((a, b) => a.hind - b.hind);
    uuendaTooted(tooted.slice())
  }

  const sorteeriHindKah = () => {
    tooted.sort((a, b) => b.hind - a.hind);
    uuendaTooted(tooted.slice())
  }

  const filtreeriKesAlgabTahegaA = () => {
    const vastus = tootedFailist.filter(toode => toode.nimi.startsWith("A"));
    uuendaTooted(vastus);
  }
  
  const filtreeriKesAlgabTahegaB = () => {
    const vastus = tootedFailist.filter(toode => toode.nimi.startsWith("B"));
    uuendaTooted(vastus);
  }

  const filtreeriKesAlgabTahegaN = () => {
    const vastus = tootedFailist.filter(toode => toode.nimi.startsWith("N"));
    uuendaTooted(vastus);
  }

  const filtreeriKesAlgabTahegaT = () => {
    const vastus = tootedFailist.filter(toode => toode.nimi.startsWith("T"));
    uuendaTooted(vastus);
  }

  return (
    <div>
      <button onClick={() => sorteeriAZ()}>Sorteeri AZ</button>
      <button onClick={() => sorteeriZA()}>Sorteeri ZA</button>
      <button onClick={() => sorteeriHindKasv()}>Sorteeri hind kasvavalt</button>
      <button onClick={() => sorteeriHindKah()}>Sorteeri hind kahanevalt</button>
      <br /><br />
      <button onClick={filtreeriKesAlgabTahegaA}>A</button>
      <button onClick={filtreeriKesAlgabTahegaB}>B</button>
      <button onClick={filtreeriKesAlgabTahegaN}>N</button>
      <button onClick={filtreeriKesAlgabTahegaT}>T</button>
      {tooted.map((toode) => (
        <div key={toode.nimi}>
          <img className="pilt" src={toode.pilt} alt="" />
          <div>{toode.nimi}</div>
          <div>{toode.hind} €</div>
          <div>{toode.aktiivne}</div>
          <button onClick={() => lisaOstukorvi(toode)}>Lisa ostukorvi</button>
          <Link to={"/toode/" + toode.nimi}>
            <button>Vaata detailsemalt</button>
          </Link>
        </div>
      ))}
      <ToastContainer
          position="bottom-right"
          autoClose={3000}
          theme="dark"
      />
    </div>
  );
}

export default Tooted;
