import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Card, CardContent, Typography,
List, ListItem, ListItemIcon, ListItemText
} from '@material-ui/core';
import "fontsource-roboto"; // Defaults to weight 400 with all styles included.
import fondo from "../../imagenes/descargar.jpeg";
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

const useStyles = makeStyles((theme) => ({
    root: {
      backgroundImage: "url("+fondo+")",
      backgroundSize: "auto",
      
    },
    card: {
        margin: theme.spacing(4),
    },
    video: {
        marginRight: "auto",
        marginLeft: "auto",
        width: 700,
    },
    titulo: {
        paddingTop: theme.spacing(2),
        fontFamily: "Roboto",
        fontWeight: 700,
    }
}));

const Descarga = () => {
    const classes = useStyles();
    return ( 
        <div className={classes.root}>
            <Typography variant="h3" align="center" className={classes.titulo}>
                DESCARGAR APP
            </Typography>
            <Grid container justify="center" alignItems="center">
                <Grid item xs={6}>
                <Card className={classes.card}>
                        <CardContent>
                            <Typography>
                                <strong>
                                Recordá que la App es Gratuita y para Ingresar deberás tener un Correo Electrónico (Email) para crear tu cuenta.<br></br><br></br>
                                Pasos para la descarga
                                </strong>
                            </Typography>
                            <List>
                                <ListItem>
                                    <ListItemIcon>
                                        <FiberManualRecordIcon />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary="Primer Paso"
                                    />
                                </ListItem>
                            </List>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={6}>
                    <div className={classes.card}>
                    <Typography variant="h4" align="center">
                        Video de Instalación:
                    </Typography>
                    <div className={classes.video}>
                    <iframe width="700" height="400" 
                    src="https://www.youtube.com/embed/668nUCeBHyY" frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowfullscreen></iframe>
                    </div>
                    </div>
                </Grid>
            </Grid>
        </div> 
    );
}
 
export default Descarga;