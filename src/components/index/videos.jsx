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
    cont:{
        maxHeight: "400px",
        overflow: "hidden",
    },
    video: {
        marginRight: "auto",
        marginLeft: "auto",
        position: "relative",
        paddingBottom: "56.25%",
        maxWidth: "700px",
        height: 0,
        overflow: "hidden",
    },
    iframe: {
        position: "absolute",
        top:0,
        left: 0,
        width: "100%",
        height: "100%",
        maxWidth: "700px",
        maxHeight: "400px",
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
                <Grid item xs={12} sm={12} md={6}>
                    <div className={classes.card}>
                    <div className={classes.cont}>
                    <div className={classes.video}>
                        <iframe  width="700" height="400" className={classes.iframe}
                        src="https://www.youtube.com/embed/668nUCeBHyY" frameborder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowfullscreen></iframe>
                    </div>
                    </div>
                    <Typography variant="h4" align="center">
                        Ingreso a la plataforma
                    </Typography>
                    </div>
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                    <div className={classes.card}>
                    <div className={classes.cont}>
                    <div className={classes.video}>
                        <iframe  width="700" height="400" className={classes.iframe}
                        src="https://www.youtube.com/embed/668nUCeBHyY" frameborder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowfullscreen></iframe>
                    </div>
                    </div>
                    <Typography variant="h4" align="center">
                        Cargar mi emprendimiento
                    </Typography>
                    </div>
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                    <div className={classes.card}>
                    <div className={classes.cont}>
                    <div className={classes.video}>
                        <iframe  width="700" height="400" className={classes.iframe}
                        src="https://www.youtube.com/embed/668nUCeBHyY" frameborder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowfullscreen></iframe>
                    </div>
                    </div>
                    <Typography variant="h4" align="center">
                        Buscar negocios cercanos
                    </Typography>
                    </div>
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                    <div className={classes.card}>
                    <div className={classes.cont}>
                    <div className={classes.video}>
                        <iframe  width="700" height="400" className={classes.iframe}
                        src="https://www.youtube.com/embed/668nUCeBHyY" frameborder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowfullscreen></iframe>
                    </div>
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