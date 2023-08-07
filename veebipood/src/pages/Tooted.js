import React, { useState } from "react";
import ostukorvFailist from "../data/ostukorv.json"; // ../ või ./ võtab meie kaustadest
import { ToastContainer, toast } from 'react-toastify'; // lihtsalt nimega alustades võtab node_modules kaustast
import tootedFailist from "../data/tooted.json";

function Tooted() {
  const [tooted, uuendaTooted] = useState(tootedFailist);

  const lisaOstukorvi = (klikitudToode) => {
    ostukorvFailist.push(klikitudToode);
    toast.success("Edukalt ostukorvi lisatud!");
  };

  return (
    <div>
      {tooted.map((toode) => (
        <div>
          {toode}{" "}
          <button onClick={() => lisaOstukorvi(toode)}>Lisa ostukorvi</button>
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
