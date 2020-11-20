import React from 'react';
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectSesion} from "../../datosSesion/sesionSlice";

const Permiso = (props) => {
    const sesion = useSelector(selectSesion);
    return ( <>
        {props.idPerfil.includes(sesion.idPerfil)? null: sesion.iniciado?(<Redirect to="/403"/>):null}
    </> );
}
 
export default Permiso;