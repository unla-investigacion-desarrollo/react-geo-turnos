import React from "react";
import Grid from "@material-ui/core/Grid";
import ListaSolicitudes from "./listaSolicitudes";
import ListaAceptados from "./listaAceptados";
import { makeStyles } from "@material-ui/core/styles";

const VistaTurnos = () => {
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
