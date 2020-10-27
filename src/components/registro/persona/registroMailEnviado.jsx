import React from 'react';
import {
    Typography,
    Grid,
    Button
} from "@material-ui/core";
import logo from "../../../imagenes/logo2.jpeg";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import {
  selectDatosPersonales,
} from "../registroSlice";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
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

const RegistroMailEnviado = () => {
    const classes = useStyles();
    const datosPersonales = useSelector(selectDatosPersonales);
    return (<> 
        
        <Typography variant="h5" color="initial">
            <img src={logo} alt="" className={classes.logo} />Registro - Datos Personales
        </Typography> 
        
        <Typography variant="h6" color="initial" align="center" className={classes.texto}>
            Un mail ha sido enviado a <strong>{datosPersonales.email}</strong> con las instrucciones para activar su cuenta y poder iniciar sesión.<br/><br/>
            Por favor, siga las intrucciones antes de iniciar sesion.
        </Typography> 
        <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
        >
            <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/login"
            >
            Ir a Iniciar Sesión
            </Button>
        </Grid>
    </>);
}
 
export default RegistroMailEnviado;