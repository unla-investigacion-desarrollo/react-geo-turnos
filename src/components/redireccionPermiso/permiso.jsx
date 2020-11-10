import React from 'react';
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectSesion} from "../../datosSesion/sesionSlice";

const Permiso = (props) => {
    const sesion = useSelector(selectSesion);
    return ( <>
        {sesion.idPerfil===props.idPerfil? null: (<Redirect to="/403"/>)}
    </> );
}
 
export default Permiso;