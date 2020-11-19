import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Card, CardContent, Typography,
List, ListItem, ListItemIcon, ListItemText
} from '@material-ui/core';
import fondo from "../../imagenes/quienessomos.jpeg";
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

const useStyles = makeStyles((theme) => ({
    root: {
      backgroundImage: "url("+fondo+")",
      backgroundSize: "100% 100%",
    },
    card: {
        marginBottom: theme.spacing(4),
    },
    titulo: {
        paddingTop: theme.spacing(4),
        fontFamily: "Roboto",
        fontWeight: 700,
    }
}));

const Somos = () => {
    const classes = useStyles();
    return ( 
        <div className={classes.root}>
            <Typography variant="h3" align="center" className={classes.titulo}>
                QUIENES SOMOS
            </Typography>
            <Grid container direction="row"
                    justify="space-around"
                    alignItems="center">
                <Grid item xs={6}>
                    <Card className={classes.card}>
                        <CardContent>
                            <Typography>
                            Somos un equipo conformado por estudiantes de  la Licenciatura en Sistemas, docentes (la mayoría de ellos graduados de la misma carrera) y la Directora de la carrera mencionada , María Alejandra Vranic, de la Universidad Nacional de Lanús. 

Surgió a pedido de la dirección del Departamento Productivo y Tecnológico a cargo de Pablo Narvaja para dar soluciones reales a la comunidad. 

                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </div> 
    );
}
 
export default Somos;