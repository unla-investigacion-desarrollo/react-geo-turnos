import React  from "react";
import GoogleMap from "google-map-react";
import Marcador from "./marcador";

const Mapa = (props) => {
  let defaultProps = {
    center: {
      lat: props.latitud!==""? props.latitud: -34.60365609973083,
      lng: props.longitud!==""? props.longitud: -58.38162703347801,
    },
    zoom: props.latitud!==""? 14:11,
  };


  //_onClick = ({ x, y, lat, lng, event }) => console.log(x, y, lat, lng, event);
  // ES5 users
  function _onClick(obj) {
    props.seleccionaPosicion(obj.lat, obj.lng);
  }

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <GoogleMap
        onClick={_onClick}
        //AIzaSyC5HxR2IAiiLhXIuCQxctsKq7AVp1CaGmI
        bootstrapURLKeys={{ key: "AIzaSyC5HxR2IAiiLhXIuCQxctsKq7AVp1CaGmI" }}
        center={defaultProps.center}
        zoom={defaultProps.zoom}
        resetBoundsOnResize={true}
        options={{ fullscreenControl: false }}
      >
        {props.latitud !== "" ? (
          <Marcador lat={props.latitud} lng={props.longitud} text="My Marker" />
        ) : null}
      </GoogleMap>
    </div>
  );
};

export default Mapa;
