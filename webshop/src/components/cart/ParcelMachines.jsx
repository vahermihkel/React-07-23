import React, { useEffect, useState } from "react";

function ParcelMachines() {
    // API päringutes peab alati olema useState
  // ja useState algväärtus sulgude sees peab olema seda tüüpi tühi
  // API päring võtab aega ---> näiteks 0.5sekundit
  // senikaua on koodis useState algväärtus
  const [parcelMachines, setParcelMachines] = useState([]);
  // const addItems = (choosenItem) => {
  //   cart.push(choosenItem);
  //   updateCart(cart.slice());
  // }

  // Vanem React: componentDidMount   componentWillMount
  useEffect(() => {
    fetch("https://www.omniva.ee/locations.json")
      .then(res => res.json()) // koos metadata'ga tagastus
      .then(json => setParcelMachines(json)) // reaalselt mis seal API päringus tagastatakse
  }, []);

  if (parcelMachines.length === 0) {
    return <div>Loading...</div>
  }

  return (
    <select>{parcelMachines.filter(pm => pm.A0_NAME === "EE").map(pm => <option key={pm.NAME}>{pm.NAME}</option> )}</select>  
  )
}

export default ParcelMachines