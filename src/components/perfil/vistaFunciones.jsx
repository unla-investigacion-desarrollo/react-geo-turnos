import React from "react";
import Grid from "@material-ui/core/Grid";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { apiCalls } from "../../api/apiCalls";
import ListaFuncionesDisp from "./listaFuncionesDisp";
import { cargarFuncionesDisp } from "./funcionSlice";
import ListaFuncionesOtorgadas from "./listaFuncionesOtorgadas";

const VistaFunciones = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    apiCalls.getFuncion().then((response) => {
      dispatch(cargarFuncionesDisp(response.data));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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
