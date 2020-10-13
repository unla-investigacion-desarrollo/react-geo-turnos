import React, { useState } from "react";
import RegistroDatosPersonales from "./registroDatosPersonales";
import { Grid, Card, CardContent } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import RegistroDatosEmprendimiento from "./registroDatosEmprendimiento";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    height: "100vh",
    background: "linear-gradient(top,white  , #0BA3C8 )",
  },
  card: { width: 1300 },
  card2: { width: 650 },
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
  return (
    <div className={classes.root}>
      <Grid container justify="center" alignItems="center">
        <div>
          <Card>
            <CardContent
              className={verForm === 1 ? classes.card2 : classes.card}
            >
              {verForm === 1 ? (
                <RegistroDatosPersonales propClickSiguiente={verFormDatosEmp} />
              ) : (
                <RegistroDatosEmprendimiento
                  propClickAtras={verFormDatosPersonales}
                />
              )}
            </CardContent>
          </Card>
        </div>
      </Grid>
    </div>
  );
};

export default Registro;
