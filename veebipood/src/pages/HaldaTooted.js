import React, { useState } from "react";
import tootedFailist from "../data/tooted.json";

function HaldaTooted() {
  const [tooted, uuendaTooted] = useState(tootedFailist);

  const kustuta = (jrknr) => {
    tootedFailist.splice(jrknr, 1);
    uuendaTooted(tootedFailist.slice());
  };

  return (
    <div>
      {tooted.map((toode, jrknr) => (
        <div>
          {jrknr} {toode}{" "}
          <button onClick={() => kustuta(jrknr)}>Kustuta</button>
        </div>
      ))}
    </div>
  );
}

export default HaldaTooted;
