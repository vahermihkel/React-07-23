import React, { useRef, useState, useEffect } from 'react'
import config from '../../data/config.json'
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTranslation } from "react-i18next";
 
 
function MaintainShops() {
  const { t } = useTranslation();
  const [shops, setShops] = useState([]);
  const nameRef = useRef();
  const openTimeRef = useRef();
  const latitudeRef = useRef();
  const longitudeRef = useRef();
  const addressRef = useRef();
  const urlRef = useRef();
 
  useEffect(() => {
    fetch(config.shops)
    .then(res => res.json())
    .then(json => setShops(json || []))
  }, []);
 
  const addShop = () => {
    shops.push({
      "name": nameRef.current.value,
      "open": (openTimeRef.current.value),
      "lat": Number(latitudeRef.current.value),
      "lng": Number(longitudeRef.current.value),
      "address": addressRef.current.value,
      "url": urlRef.current.value,
    })
      setShops(shops.slice());
      fetch(config.shops, {
        method: "PUT",
        body: JSON.stringify(shops)
      })
    }
 
  const deleteShop = (index) => {
    shops.splice(index, 1);
    setShops(shops.slice());
    fetch(config.shops, {
      method: "PUT",
      body: JSON.stringify(shops)
    })
  }
 
 
  return (
    <div>
      <label>nimi</label> <br/>
      <input ref={nameRef} type="text" /> <br/>
      <label>avatud</label> <br/>
      <input ref={openTimeRef} type="text" /> <br/>
      <label>latitude</label> <br/>
      <input ref={latitudeRef} type="number" /> <br/>
      <label>longitude</label> <br/>
      <input ref={longitudeRef} type="number" /> <br/>
      <label>address</label> <br/>
      <input ref={addressRef} type="text" /> <br/>
      <label>URL</label> <br/>
      <input ref={urlRef} type="text" /> <br/>
      <button onClick={addShop}>Sisesta</button>
      {shops.map((shop, index) =>
      <div key={shop.name}>
        {shop.name}
        <button onClick={() => deleteShop(index)}>X</button>
        <Button as={Link} to={"/admin/edit-shops/" + shop.name} >
        {t("edit")}
        </Button>
      </div>
      )}
    </div>
  )
}
 
export default MaintainShops