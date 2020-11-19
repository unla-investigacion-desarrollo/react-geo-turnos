import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Card, CardContent, Typography,
List, ListItem, ListItemIcon, ListItemText
} from '@material-ui/core';
import fondo from "../../imagenes/videostuto.jpeg";
import FolderIcon from '@material-ui/icons/Folder';

const useStyles = makeStyles((theme) => ({
    root: {
      backgroundImage: "url("+fondo+")",
      backgroundSize: "100% 100%",
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
        color: "white",
        paddingTop: theme.spacing(2),
        fontFamily: "Roboto",
        fontWeight: 700,
    }
}));

const Videos = () => {
    const classes = useStyles();
    return ( 
        <div className={classes.root}>
            <Typography variant="h3" align="center" className={classes.titulo}>
                VIDEOS TUTORIALES
            </Typography>
            <Typography align="center">
            Aquí podrás consultar nuestros  videotutoriales en caso de que tengas alguna duda. La duración de cada video es menor a dos minutos. 
            </Typography>
            <Grid container justify="center" alignItems="center">
                <Grid item xs={6}>
                    <div className={classes.card}>
                    <div className={classes.video}>
                        <iframe  width="700" height="400" 
                        src="https://www.youtube.com/embed/668nUCeBHyY" frameborder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowfullscreen></iframe>
                    </div>
                    <Typography variant="h4" align="center">
                        Ingreso a la plataforma
                    </Typography>
                    </div>
                </Grid>
                <Grid item xs={6}>
                    <div className={classes.card}>
                    <div className={classes.video}>
                        <iframe  width="700" height="400" 
                        src="https://www.youtube.com/embed/668nUCeBHyY" frameborder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowfullscreen></iframe>
                    </div>
                    <Typography variant="h4" align="center">
                        Cargar mi emprendimiento
                    </Typography>
                    </div>
                </Grid>
                <Grid item xs={6}>
                    <div className={classes.card}>
                    <div className={classes.video}>
                        <iframe  width="700" height="400" 
                        src="https://www.youtube.com/embed/668nUCeBHyY" frameborder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowfullscreen></iframe>
                    </div>
                    <Typography variant="h4" align="center">
                        Buscar negocios cercanos
                    </Typography>
                    </div>
                </Grid>
                <Grid item xs={6}>
                    <div className={classes.card}>
                    <div className={classes.video}>
                        <iframe  width="700" height="400" 
                        src="https://www.youtube.com/embed/668nUCeBHyY" frameborder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowfullscreen></iframe>
                    </div>
                    <Typography variant="h4" align="center">
                        Solicitar turno
                    </Typography>
                    </div>
                </Grid>
            </Grid>
            <Typography align="center">
            Sí aún te encuentras con alguna duda o problema puede escribir a nuestro email de contacto : reactivar@unla.com
            </Typography>
        </div> 
    );
}
 
export default Videos;