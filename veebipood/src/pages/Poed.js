import React, { useRef, useState } from 'react'
import poedFailist from "../data/poed.json";

function Poed() {              
  const [poed, uuendaPoed] = useState(poedFailist);
  const poodViide = useRef(); // useRef-st ka import       priceRef       nameRef     descriptionRef
  const aegViide = useRef();
  const telViide = useRef();

  const reset = () => {
    uuendaPoed(poedFailist);
  }

  const sorteeriAZ = () => {
    // poed.sort();
    poed.sort((a,b) => a.nimi.localeCompare(b.nimi, "et"));
    uuendaPoed(poed.slice());
  }

  const sorteeriZA = () => {
    poed.sort((a,b) => b.nimi.localeCompare(a.nimi, "et"));
    uuendaPoed(poed.slice());
  }

  const sorteeriTahtedeArvKasv = () => {
    poed.sort((a,b) => a.nimi.length - b.nimi.length);
    uuendaPoed(poed.slice());
  }

  const sorteeriTahtedeArvKah = () => {
    poed.sort((a,b) => b.nimi.length - a.nimi.length);
    uuendaPoed(poed.slice());
  }

  const sorteeriKolmasTahtAZ = () => {            // 01234567    012345678
    poed.sort((a,b) => a.nimi[2].localeCompare(b.nimi[2])); // Ülemiste    Kristiine
    //poed.sort((a,b) => a.charAt(2).localeCompare(b.charAt(2)));
    uuendaPoed(poed.slice());
  }

  const filtreeriEgaLoppevad = () => {
    const vastus = poed.filter(yksPood => yksPood.nimi.endsWith("e"));
    uuendaPoed(vastus);
  }

  const filtreeri9Tahelised = () => {
    const vastus = poed.filter(yksPood => yksPood.nimi.length === 9);
    uuendaPoed(vastus);
  }

  const filtreeriVahemalt7Tahelised = () => {
    const vastus = poed.filter(yksPood => yksPood.nimi.length >= 7);
    uuendaPoed(vastus);
  }

  const filtreeriKesSisaldabIsLyhendit = () => {
    const vastus = poed.filter(yksPood => yksPood.nimi.includes("is"));
    uuendaPoed(vastus);
  }

  const filtreeriKellelKolmasTahtI = () => {
    const vastus = poed.filter(yksPood => yksPood.nimi[2] === "i");
    //const vastus = poed.filter(yksPood => yksPood.charAt(2) === "i");
    uuendaPoed(vastus);
  }

  // KOKKUARVUTUS - liidame kõik poodide tähed kokku
  const arvutaKokku = () => {
    let summa = 0;
    poed.forEach(yksPood => summa = summa + yksPood.nimi.length);
    return summa;
  }

  const lisa = () => {
    poed.push({"nimi": poodViide.current.value, "aeg": aegViide.current.value, "tel": telViide.current.value});
    uuendaPoed(poed.slice());
  }

  const kustuta = (index) => {
    poedFailist.splice(index,1);
    uuendaPoed(poedFailist.slice());
  }

  return (
    <div>
      <button onClick={reset}>Reset</button>
      <div>Poode: {poed.length} tk</div>
      <div>Tähemärke: {arvutaKokku()}</div>
      <br />
      <label>Poe nimi</label> <br />
      <input ref={poodViide} type="text" /> <br />
      <label>Poe lahtiolekuaeg</label> <br />
      <input ref={aegViide} type="text" /> <br />
      <label>Poe telefoninumber</label> <br />
      <input ref={telViide} type="text" /> <br />
      <button onClick={lisa}>Lisa</button> <br />
      <br />
      <button onClick={sorteeriAZ}>Sorteeri A-Z</button>
      <button onClick={sorteeriZA}>Sorteeri Z-A</button>
      <button onClick={sorteeriTahtedeArvKasv}>
        Sorteeri tähtede arv kasvavalt
      </button>
      <button onClick={sorteeriTahtedeArvKah}>
        Sorteeri tähtede arv kahanevalt
      </button>
      <button onClick={sorteeriKolmasTahtAZ}>Sorteeri kolmas täht A-Z</button>
      <br />
      <br />
      <button onClick={filtreeriEgaLoppevad}>Jäta alles e'ga lõppevad</button>
      <button onClick={filtreeri9Tahelised}>Jäta alles 9 tähelised</button>
      <button onClick={filtreeriVahemalt7Tahelised}>
        Jäta alles vähemalt 7 tähelised
      </button>
      <button onClick={filtreeriKesSisaldabIsLyhendit}>
        Jäta alles 'is' lühendiga
      </button>
      <button onClick={filtreeriKellelKolmasTahtI}>
        Jäta alles kellel kolmas täht 'i'
      </button>
      {poed.map((yksPood, index) => (
        <div>
          {yksPood.nimi}{" "}
          <button onClick={() => kustuta(index)}>x</button>
          {/* ÜHE POE VAATAMINE */}
        </div>
      ))}
      {/* <div>Ülemiste</div>
      <div>Viimsi</div>
      <div>Rocca al Mare</div>
      <div>Magistrali</div>
      <div>Vesse</div>
      <div>Kristiine</div>
      <div>Järveotsa</div> */}
    </div>
  );
}

export default Poed