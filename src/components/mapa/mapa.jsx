import React, { useState } from "react";
import GoogleMap from "google-map-react";
import Marcador from "./marcador";

const Mapa = (props) => {
  let defaultProps = {
    center: {
      lat: -34.60365609973083,
      lng: -58.38162703347801,
    },
    zoom: 11,
  };

  const [marker, setMarker] = useState({
    lat: 59.955413,
    lng: 30.337844,
  });

  //_onClick = ({ x, y, lat, lng, event }) => console.log(x, y, lat, lng, event);
  // ES5 users
  function _onClick(obj) {
    //console.log(obj.x, obj.y, obj.lat, obj.lng, obj.event);
    setMarker({ lat: obj.lat, lng: obj.lng });
    props.seleccionaPosicion(obj.lat, obj.lng);
  }

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: "100%", width: "100%" }}>
      <GoogleMap
        onClick={_onClick}
        bootstrapURLKeys={{ key: "AIzaSyC5HxR2IAiiLhXIuCQxctsKq7AVp1CaGmI" }}
        center={defaultProps.center}
        zoom={defaultProps.zoom}
        resetBoundsOnResize={true}
        options={{ fullscreenControl: false }}
      >
        <Marcador lat={marker.lat} lng={marker.lng} text="My Marker" />
      </GoogleMap>
    </div>
  );
};

export default Mapa;