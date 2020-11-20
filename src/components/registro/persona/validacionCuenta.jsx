import React, { useState, useEffect } from "react";
import { Grid, Card, CardContent, Typography, Button, } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import RegistroMailEnviado from "./registroMailEnviado";
import logo from "../../../imagenes/logo2.jpeg";
import { Link, useParams } from "react-router-dom";
import { apiCalls } from "../../../api/apiCalls";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    height: "100vh",
    background: "linear-gradient(top,white  , #0BA3C8 )",
  },
  card2: { width: 650 },
  botonForm: {
    marginRight: theme.spacing(3),
  },
  botonOculto: {
    display: "none",
  },
  logo: {
    position: "relative",
    width: 50,
    top: 10,
    marginRight: theme.spacing(2),
  },
  texto: {
      marginTop: theme.spacing(4),
      marginBottom: theme.spacing(4),
  },
}));

const ValidacionCuenta = () => {
  const classes = useStyles();
  const [mensaje, setMensaje]=useState("");
  const [error, setError]=useState(true);
  const { token } = useParams();

  useEffect(() => {
    apiCalls.getValidarMail(token).then((response)=>{
        setMensaje("Su cuenta ha sido activada, ya puede iniciar sesión");
        setError(false);
    }).catch((error)=>{
        setMensaje("Ha ocurrido un error");
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={classes.root}>
      <Grid container justify="center" alignItems="center">
        <div>
          <Card>
            <CardContent
              className={classes.card2}
            >
                <Typography variant="h5" color="initial">
                    <img src={logo} alt="" className={classes.logo} />Registro - Validación Cuenta
                </Typography> 
                
                <Typography variant="h6" color="initial" align="center" className={classes.texto}>
                    {mensaje}
                </Typography> 
                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                >
                    <Button
                    variant="contained"
                    disabled={error}
                    color="primary"
                    component={Link}
                    to="/login"
                    >
                    Ir a Iniciar Sesión
                    </Button>
                </Grid>
            </CardContent>
          </Card>
        </div>
      </Grid>
    </div>
  );
};

export default ValidacionCuenta;
