import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import ChangeView from "./ChangeView";
import config from "../data/config.json"
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [2, -40],
});
L.Marker.prototype.options.icon = DefaultIcon;

function Map(props) {
  const [shops, uShops] = useState([]);

  useEffect(() => {
    fetch(config.shops)
      .then(res => res.json())
      .then(json => uShops(json || []))
  }, []);

  return (
    <div>
      <MapContainer
        className="map"
        center={props.mapCoordinaates.lngLat}
        zoom={props.mapCoordinaates.zoom}
        scrollWheelZoom={false}
      >
        <ChangeView
          center={props.mapCoordinaates.lngLat}
          zoom={props.mapCoordinaates.zoom}
        />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* <Marker position={[59.4219, 24.7938]}>
          <Popup>
            Ülemiste keskus. <br /> Avatud 9-20
          </Popup>
        </Marker> */}
        {/* <Marker position={[59.4272, 24.723]}>
          <Popup>
            Kristiine keskus. <br /> Avatud 10-21
          </Popup>
        </Marker> */}
        {/* 58.3780, 26.7306 */}
        {/* <Marker position={[58.378, 26.7306]}>
          <Popup>
            Tasku keskus. <br /> Avatud 10-21
            <a
              target="_blank"
              rel="noreferrer"
              href="https://www.google.ee/maps/place/Tasku+Centre/@58.3779548,26.7273866,1168m/data=!3m1!1e3!4m6!3m5!1s0x46eb36de8f30aa61:0xac1894becb0a4ccc!8m2!3d58.3778901!4d26.7308525!16s%2Fg%2F125_j5pv_?entry=ttu"
            >
              Turu 2, Tartu
            </a>
          </Popup>
        </Marker> */}
        {shops.map(shop => 
          <Marker position={[shop.lat, shop.lng]}>
            <Popup>
              {shop.name} <br /> 
              {"Avatud: "}{shop.open} <br />
              {/* <Link>{shop.url}</Link> <br /> */}
              <Link target="_blank" to={shop.url} rel="noreferrer">Juhised</Link>
              <br />
              <a href={shop.url} target="_blank" rel="noreferrer">
                {shop.address}
              </a>
          </Popup>
          </Marker>
          
        )}
      </MapContainer>
    </div>
  );
}

export default Map;