import { useEffect, useState } from 'react';
import Map from '../../components/Map';
import config from "../../data/config.json";
 
function Shops() {
  const [shops, setShops] = useState([]);
 
  useEffect(() => {
    fetch(config.shops)
      .then(response => response.json())
      .then(json => setShops(json || []))
  }, []);
 
  const [coordinaates, setCoordinates] = useState({lngLat: [59.4378, 24.7574], zoom: 11});
 
  return (<div>
    <button onClick={() => setCoordinates({lngLat: [58.7978, 25.3437], zoom: 7})}>Kõik poed</button>
    <button onClick={() => setCoordinates({lngLat: [59.4378, 24.7574], zoom: 11})}>Kõik Tallinna poed</button>
 
    {shops.map (shop => <button onClick={() => setCoordinates({lngLat: [shop.lat, shop.lng], zoom: 13})} key={shop.name}>{shop.name}</button>)}
    <Map mapCoordinaates={coordinaates}  />
  </div>)
}
 
export default Shops;