import axios from "axios";
export const searchPosition = async (direccion) => {
  //Funcion que va a consultar al endpoint de google maps para obtener la informacion de la direccion que se introdujo

  if (direccion !== "") {
    const url = "https://maps.googleapis.com/maps/api/geocode/json?address="; //Url del endpoint
    const key = "AIzaSyC5HxR2IAiiLhXIuCQxctsKq7AVp1CaGmI"; //Apikey que necesita google maps, CAMBIAR PARA PASAR A PRODUCCION

    let address = direccion.replace(/\s/g, "+"); //Reemplazo los espacios por +
    address = address + "+argentina"; //Concateno argentina a la busqueda

    let key_url = "&key=" + key; //concateno la key para armar la url

    // console.log(url + address + key_url); //armo la url completa para hacer el fetch

    const responseJson = await axios.get(url + address + key_url);

    const data = responseJson.data;
    let localizacionNegocio = {
      longitude: 0,
      latitude: 0,
    };

    if (data.results.length > 0) {
      localizacionNegocio = {
        longitude: data.results[0].geometry.location.lng,
        latitude: data.results[0].geometry.location.lat,
      };
    }

    return localizacionNegocio;
  }
};

