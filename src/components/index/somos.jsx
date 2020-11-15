import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Card, CardContent, Typography,
List, ListItem, ListItemIcon, ListItemText
} from '@material-ui/core';

import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

const useStyles = makeStyles((theme) => ({
    root: {
      backgroundImage: "url('https://i.pinimg.com/originals/8d/05/c7/8d05c77aa6281b4af5fb0d1ebfaf66ac.jpg')",
      backgroundSize: "cover",
    },
    card: {
        margin: theme.spacing(4),
    },
    titulo: {
        color: "white",
        paddingTop: theme.spacing(2),
    }
}));

const Somos = () => {
    const classes = useStyles();
    return ( 
        <div className={classes.root}>
            <Typography variant="h4" align="center" className={classes.titulo}>
                QUIENES SOMOS:
            </Typography>
            <Grid container>
                <Grid item xs={6}>
                    <Card className={classes.card}>
                        <CardContent>
                            <Typography variant="h4" gutterBottom>
                                Algo de quienes somos:
                            </Typography>
                            <List>
                                <ListItem>
                                    <ListItemIcon>
                                        <FiberManualRecordIcon />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary="Somos esto"
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemIcon>
                                        <FiberManualRecordIcon />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary="Somos aquello"
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemIcon>
                                        <FiberManualRecordIcon />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary="Esto no somos"
                                    />
                                </ListItem>
                            </List>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={6}>
                    <Card className={classes.card}>
                        <CardContent>
                            <Typography variant="h4" gutterBottom>
                                Mas datos de quienes somos:
                            </Typography>
                            <List>
                                <ListItem>
                                    <ListItemIcon>
                                        <FiberManualRecordIcon />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary="Somos esto tambien"
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemIcon>
                                        <FiberManualRecordIcon />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary="Nos dicen asi"
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemIcon>
                                        <FiberManualRecordIcon />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary="Estudiamos en tal lugar"
                                    />
                                </ListItem>
                            </List>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </div> 
    );
}
 
export default Somos;