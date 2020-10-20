import React from "react";
import Grid from "@material-ui/core/Grid";
import ListaSolicitudes from "./listaSolicitudes";
import ListaAceptados from "./listaAceptados";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cargarTurnos, selectTurnosRechazados } from "./turnoSlice";
import { apiCalls } from "../../api/apiCalls";
import {Button} from "@material-ui/core";

const VistaTurnos = () => {
  const dispatch = useDispatch();
  const turnosRechazados = useSelector(selectTurnosRechazados);
  useEffect(() => {
    apiCalls.getTurno().then((response) => {
      dispatch(cargarTurnos(response.data));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} >
          <Button variant="contained" color="secondary">
            Calendario
          </Button>
      </Grid>
      <Grid item xs={6}>
        <ListaSolicitudes />
      </Grid>
      <Grid item xs={6}>
        <ListaAceptados />
      </Grid>
      {JSON.stringify(turnosRechazados)}
    </Grid>
  );
};

export default VistaTurnos;
