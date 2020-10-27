import React, { useState } from "react";
import { Grid, Card, CardContent } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import RegistroDatosEmprendimiento from "./registroDatosEmprendimiento";
import RegistroDatosTurnos from "./registroDatosTurnos";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    height: "100vh",
    background: "linear-gradient(top,white  , #0BA3C8 )",
  },
  card: { width: 1075 },
  card2: { width: 1300 },
  botonForm: {
    marginRight: theme.spacing(3),
  },
  botonOculto: {
    display: "none",
  },
}));

const RegistroEmp = () => {
  const [verForm, setVerForm] = useState(1);
  const classes = useStyles();
  const verFormDatosEmp = () => {
    setVerForm(1);
  };
  const verFormDatosTurnos = () => {
    setVerForm(2);
  }
  return (
    <div className={classes.root}>
      <Grid container justify="center" alignItems="center">
        <div>
          <Card>
            <CardContent
              className={verForm === 1 ? classes.card2 :  classes.card}
            >
              {verForm === 1 ? (
                <RegistroDatosEmprendimiento propClickSiguiente={verFormDatosTurnos} />
              ) : (
                <RegistroDatosTurnos propClickAtras={verFormDatosEmp}/>
              )}
            </CardContent>
          </Card>
        </div>
      </Grid>
    </div>
  );
};

export default RegistroEmp;
