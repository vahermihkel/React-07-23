import React, { useRef, useState } from 'react'
import tootedFailist from "../data/tooted.json";
import { ToastContainer, toast } from 'react-toastify'; 

// Kahe faili omavaheline suhtlus
// 1. Failist -> + lihtne    - refreshiga kaob
// 2. Brauser -> + lihtsam kui andmebaas    - tooteid ei panda päriselt brauserisse
// 3. Andmebaas -> + nii on õige    - raske
// 4. Context (globaalne muutuja) -> + nii on õige   - raske   - refreshiga kaob

function LisaToode() {
  const [sonum, uuendaSonum] = useState("Lisa toode!");
  const inputiLuger = useRef();

  //function lisa() {} // ES5

  // ES6
  const lisa = () => {
    if (inputiLuger.current.value === "") {
      uuendaSonum("Tühja nimetusega toodet ei saa lisada!");
      toast.error("Tühja nimetusega toodet ei saa lisada!");
    } else if (inputiLuger.current.value.includes("!")) { // return oleks siin juba ilusam
      uuendaSonum("Hüüumärgiga toodet ei saa lisada!");
      toast.error("Hüüumärgiga toodet ei saa lisada!");
    } else {
      uuendaSonum("Toode edukalt lisatud: " + inputiLuger.current.value);
      toast.success("Toode edukalt lisatud: " + inputiLuger.current.value);
      tootedFailist.push(inputiLuger.current.value);
    }
  }

  return (
    <div>
      <div>{sonum}</div>
      <label>Toote nimi</label> <br />
      <input ref={inputiLuger} type="text" /> <br />
      <button onClick={lisa}>Lisa</button> <br />
      <ToastContainer
          position="bottom-right"
          autoClose={3000}
          theme="dark"
      />
    </div>
  )
}

export default LisaToode