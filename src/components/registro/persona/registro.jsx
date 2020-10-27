import React, { useState } from "react";
import RegistroDatosPersonales from "./registroDatosPersonales";
import { Grid, Card, CardContent } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import RegistroMailEnviado from "./registroMailEnviado";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    height: "100vh",
    background: "linear-gradient(top,white  , #0BA3C8 )",
  },
  card: { width: 650 },
  card2: { width: 650 },
  card3: { width: 1075 },
  botonForm: {
    marginRight: theme.spacing(3),
  },
  botonOculto: {
    display: "none",
  },
}));

const Registro = () => {
  const [verForm, setVerForm] = useState(1);
  const classes = useStyles();
  const verFormDatosEmp = () => {
    setVerForm(2);
  };
  const verFormDatosPersonales = () => {
    setVerForm(1);
  };
  const verFormDatosTurnos = () => {
    setVerForm(3);
  }
  return (
    <div className={classes.root}>
      <Grid container justify="center" alignItems="center">
        <div>
          <Card>
            <CardContent
              className={verForm === 1 ? classes.card2 : verForm===2? classes.card: classes.card3}
            >
              {verForm === 1 ? (
                <RegistroDatosPersonales propClickSiguiente={verFormDatosEmp} />
              ) : (
                <RegistroMailEnviado />
              )}
            </CardContent>
          </Card>
        </div>
      </Grid>
    </div>
  );
};

export default Registro;
