import React from "react";
import Grid from "@material-ui/core/Grid";
import ListaSolicitudes from "./listaSolicitudes";
import ListaAceptados from "./listaAceptados";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { cargarTurnos, traerListaAceptados } from "./turnoSlice";
import { apiCalls } from "../../api/apiCalls";

const VistaTurnos = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    apiCalls.getTurno().then((response) => {
      dispatch(cargarTurnos(response.data));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Grid container spacing={3}>
      <Grid item xs={6}>
        <ListaSolicitudes />
      </Grid>
      <Grid item xs={6}>
        <ListaAceptados />
      </Grid>
    </Grid>
  );
};

export default VistaTurnos;
