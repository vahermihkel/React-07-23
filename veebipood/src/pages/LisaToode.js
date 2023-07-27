import React, { useRef, useState } from 'react'

function LisaToode() {
  const [sonum, uuendaSonum] = useState("Lisa toode!");
  const inputiLuger = useRef();

  //function lisa() {} // ES5

  // ES6
  const lisa = () => {
    if (inputiLuger.current.value === "") {
      uuendaSonum("Tühja nimetusega toodet ei saa lisada!");
    } else if (inputiLuger.current.value.includes("!")) { // return oleks siin juba ilusam
      uuendaSonum("Hüüumärgiga toodet ei saa lisada!");
    } else {
      uuendaSonum("Toode edukalt lisatud: " + inputiLuger.current.value);
    }
  }

  return (
    <div>
      <div>{sonum}</div>
      <label>Toote nimi</label> <br />
      <input ref={inputiLuger} type="text" /> <br />
      <button onClick={lisa}>Lisa</button> <br />
    </div>
  )
}

export default LisaToode