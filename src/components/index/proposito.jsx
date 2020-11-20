import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Card, CardContent, Typography,
List, ListItem, ListItemIcon, ListItemText
} from '@material-ui/core';
import app from "../../imagenes/celular.png";
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import fondo from "../../imagenes/propositos.jpeg";

const useStyles = makeStyles((theme) => ({
    root: {
      backgroundImage: "url("+fondo+")",
      backgroundSize: "repeat",
    },
    card: {
        margin: theme.spacing(4),
    },
    logo: {
        marginTop:20,
        marginRight:"auto",
        marginLeft: "auto",
        height: 600,
        width: 300,
    },
}));

const Proposito = () => {
    const classes = useStyles();
    return ( 
        <div className={classes.root}>
            <Grid container>
                <Grid item xs={12} sm={12} md={6}>
                    <div className={classes.logo}>
                        <img src={app} alt=""  className={classes.logo} />  
                    </div>
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                    <Card className={classes.card}>
                        <CardContent>
                            <Typography>
                            <strong>¡Encontrá tus negocios de cercanía , infórmate sobre sus horarios de atención y solicita turnos evitando largas filas!</strong>
                            </Typography>
                            <br></br><br></br>
                            <Typography align="center">
                            <strong>Todos los comercios de tu Barrio en una sola App!</strong>
                            </Typography>
                            <br></br><br></br>
                            <Typography align="right">
                            <strong>
                                ¿Tenes un Emprendimiento?<br></br>
                                Podes agregarlo a nuestro mapa interactivo y 
                                comenzar a gestionar tu negocio desde la plataforma
                            </strong>
                            </Typography>
                            <br></br><br></br>
                            <Typography>
                            <strong>ReactivAR</strong> apunta a beneficiar a la comunidad en el contexto actual de DISPO debido a la pandemia de COVID-19 acercándole soluciones. Se nutre básicamente de los Emprendimientos creados por los usuarios que quieran ingresar su negocio en la plataforma, darles <strong>visibilidad</strong> mediante la aplicación para llegar a más personas y así <strong>reactivar la producción y economía.</strong>                            
                            </Typography>
                            <br></br><br></br>
                            <Typography align="center">
                            <strong>Descarga Gratuita ✓</strong><br></br>
                            <strong>Gestión de tu Emprendimiento Sin costo ✓</strong><br></br>
                            <strong>Facilidad de uso ✓</strong>
                            </Typography>
                            <br></br><br></br>
                            <Typography>
                            <strong>
                            Además, puedes saber cuantas personas hay en un Emprendimiento en tiempo real!
Esto es posible gracias a la lectura de cód. QR que se encuentra en el ingreso de los comercios adheridos a ReactivAR.
                            </strong>
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </div> 
    );
}
 
export default Proposito;