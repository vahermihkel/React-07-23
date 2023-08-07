import React, { useRef, useState } from 'react'
import poedFailist from "../data/poed.json";

function Poed() {              
  const [poed, uuendaPoed] = useState(poedFailist);
  const poodViide = useRef(); // useRef-st ka import       priceRef       nameRef     descriptionRef

  const reset = () => {
    uuendaPoed(poedFailist);
  }

  const sorteeriAZ = () => {
    // poed.sort();
    poed.sort((a,b) => a.localeCompare(b, "et"));
    uuendaPoed(poed.slice());
  }

  const sorteeriZA = () => {
    poed.sort((a,b) => b.localeCompare(a, "et"));
    uuendaPoed(poed.slice());
  }

  const sorteeriTahtedeArvKasv = () => {
    poed.sort((a,b) => a.length - b.length);
    uuendaPoed(poed.slice());
  }

  const sorteeriTahtedeArvKah = () => {
    poed.sort((a,b) => b.length - a.length);
    uuendaPoed(poed.slice());
  }

  const sorteeriKolmasTahtAZ = () => {            // 01234567    012345678
    poed.sort((a,b) => a[2].localeCompare(b[2])); // Ülemiste    Kristiine
    //poed.sort((a,b) => a.charAt(2).localeCompare(b.charAt(2)));
    uuendaPoed(poed.slice());
  }

  const filtreeriEgaLoppevad = () => {
    const vastus = poed.filter(yksPood => yksPood.endsWith("e"));
    uuendaPoed(vastus);
  }

  const filtreeri9Tahelised = () => {
    const vastus = poed.filter(yksPood => yksPood.length === 9);
    uuendaPoed(vastus);
  }

  const filtreeriVahemalt7Tahelised = () => {
    const vastus = poed.filter(yksPood => yksPood.length >= 7);
    uuendaPoed(vastus);
  }

  const filtreeriKesSisaldabIsLyhendit = () => {
    const vastus = poed.filter(yksPood => yksPood.includes("is"));
    uuendaPoed(vastus);
  }

  const filtreeriKellelKolmasTahtI = () => {
    const vastus = poed.filter(yksPood => yksPood[2] === "i");
    //const vastus = poed.filter(yksPood => yksPood.charAt(2) === "i");
    uuendaPoed(vastus);
  }

  // KOKKUARVUTUS - liidame kõik poodide tähed kokku
  const arvutaKokku = () => {
    let summa = 0;
    poed.forEach(yksPood => summa = summa + yksPood.length);
    return summa;
  }

  const lisa = () => {
    poed.push(poodViide.current.value);
    uuendaPoed(poed.slice());
  }

  return (
    <div>
      <button onClick={reset}>Reset</button>
      <div>Poode: {poed.length} tk</div>
      <div>Tähemärke: {arvutaKokku()}</div>

      <br />
      <label>Poe nimi</label> <br />
      <input ref={poodViide} type="text" /> <br />
      <button onClick={lisa}>Lisa</button> <br /><br />

      <button onClick={sorteeriAZ}>Sorteeri A-Z</button>
      <button onClick={sorteeriZA}>Sorteeri Z-A</button>
      <button onClick={sorteeriTahtedeArvKasv}>Sorteeri tähtede arv kasvavalt</button>
      <button onClick={sorteeriTahtedeArvKah}>Sorteeri tähtede arv kahanevalt</button>
      <button onClick={sorteeriKolmasTahtAZ}>Sorteeri kolmas täht A-Z</button>
      <br /><br />
      <button onClick={filtreeriEgaLoppevad}>Jäta alles e'ga lõppevad</button>
      <button onClick={filtreeri9Tahelised}>Jäta alles 9 tähelised</button>
      <button onClick={filtreeriVahemalt7Tahelised}>Jäta alles vähemalt 7 tähelised</button>
      <button onClick={filtreeriKesSisaldabIsLyhendit}>Jäta alles 'is' lühendiga</button>
      <button onClick={filtreeriKellelKolmasTahtI}>Jäta alles kellel kolmas täht 'i'</button>
      {poed.map(yksPood => <div>{yksPood}</div> )}
      {/* <div>Ülemiste</div>
      <div>Viimsi</div>
      <div>Rocca al Mare</div>
      <div>Magistrali</div>
      <div>Vesse</div>
      <div>Kristiine</div>
      <div>Järveotsa</div> */}
    </div>
  )
}

export default Poed