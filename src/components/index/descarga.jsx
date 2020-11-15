import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Card, CardContent, Typography,
List, ListItem, ListItemIcon, ListItemText
} from '@material-ui/core';

import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

const useStyles = makeStyles((theme) => ({
    root: {
      backgroundImage: "url('https://pixnio.com/free-images/2018/12/05/2018-12-05-12-24-50.jpg')",
      backgroundSize: "cover",
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
    }
}));

const Descarga = () => {
    const classes = useStyles();
    return ( 
        <div className={classes.root}>
            <Typography variant="h4" align="center" className={classes.titulo}>
                DESCARGAR APP:
            </Typography>
            <Grid container justify="center" alignItems="center">
                <Grid item xs={6}>
                <Card className={classes.card}>
                        <CardContent>
                            <Typography variant="h4" gutterBottom>
                                Pasos de Instalación:
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
                                <ListItem>
                                    <ListItemIcon>
                                        <FiberManualRecordIcon />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary="Segundo Paso"
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemIcon>
                                        <FiberManualRecordIcon />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary="Tercer Paso"
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