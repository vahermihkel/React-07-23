import { useEffect, useState } from 'react';
import Map from '../../components/Map';
import config from "../../data/config.json";
import { Button } from '@mui/material';
 
function Shops() {
  const [shops, setShops] = useState([]);
 
  useEffect(() => {
    fetch(config.shops)
      .then(response => response.json())
      .then(json => setShops(json || []))
  }, []);
 
  const [coordinaates, setCoordinates] = useState({lngLat: [59.4378, 24.7574], zoom: 11});
 
  return (<div>
    <Button onClick={() => setCoordinates({lngLat: [58.7978, 25.3437], zoom: 7})}>Kõik poed</Button>
    <Button onClick={() => setCoordinates({lngLat: [59.4378, 24.7574], zoom: 11})}>Kõik Tallinna poed</Button>
 
    {shops.map (shop => <Button onClick={() => setCoordinates({lngLat: [shop.lat, shop.lng], zoom: 13})} key={shop.name}>{shop.name}</Button>)}
    <Map mapCoordinaates={coordinaates}  />
  </div>)
}
 
export default Shops;