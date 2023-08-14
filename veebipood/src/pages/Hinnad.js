import React, { useState } from 'react'

// {{{{{{{{{{{{{{{{{{{{{{{{{{}}}}}}}}}}}}}}}}}}}}}}}}}}

function Hinnad() {
  const [hinnad, uuendaHinnad] = useState([42,12,55,7,412,1234,101,19,9,82]);

  const sorteeri = () => { // <---
    hinnad.sort((a, b) => a - b); // This method mutates the array and returns a reference to the same array.
                                // sort muteerib massiivi ja tagastab selle samasse mälukohta 
    uuendaHinnad(hinnad.slice());
    //uuendaHinnad([...hinnad]); // chatGPT annab sellist kuju mälukoha kaotamiseks
  } // <---

  const filtreeri = () => { // <---
    const vastus = hinnad.filter(hind => hind > 100); // returnib uude muutujasse ehk mul on juba kohe uus mälukoht
    uuendaHinnad(vastus);
  } // <---

  const arvutaKokku = () => {
    let summa = 0;
    // summa = summa + 42;
    // summa = summa + 12; // summa += 12
    // summa += 55;
    //              42  =>  42   =   0   +  42
    //              12  =>  54   =  42   +  12
    //              55  =>  109  =  54   +  55
    hinnad.forEach(hind => summa = summa + hind);
    return summa;
  }

  return (
    <div>
      <button onClick={sorteeri}>Sorteeri</button>
      <button onClick={filtreeri}>Filtreeri</button>
      {hinnad.map(hind => <div key={hind}>Maksumus: {hind} €</div> )}
      <div>Kokku: {arvutaKokku()} €</div>
    </div>
  )
}

export default Hinnad