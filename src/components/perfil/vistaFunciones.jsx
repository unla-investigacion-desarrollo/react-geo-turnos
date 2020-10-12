import React from "react";
import Grid from "@material-ui/core/Grid";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { apiCalls } from "../../api/apiCalls";
import ListaFuncionesDisp from "./listaFuncionesDisp";
import { cargarFuncionesDisp, cargarFuncionesOtorgadas } from "./funcionSlice";
import ListaFuncionesOtorgadas from "./listaFuncionesOtorgadas";

const VistaFunciones = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    if(props.idPerfil){
      apiCalls.getFuncion().then((response) => {
        dispatch(cargarFuncionesDisp(response.data));
      }).then(()=>{
        apiCalls.getFuncionesPerfil(props.idPerfil).then((response)=>dispatch(cargarFuncionesOtorgadas(response.data)));
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.idPerfil]);
  return (
    <Grid container spacing={3}>
      <Grid item xs={6}>
        <ListaFuncionesOtorgadas />
      </Grid>
      <Grid item xs={6}>
        <ListaFuncionesDisp />
      </Grid>
    </Grid>
  );
};

export default VistaFunciones;
