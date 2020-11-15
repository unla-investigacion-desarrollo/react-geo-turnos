import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Card, CardContent, Typography,
List, ListItem, ListItemIcon, ListItemText
} from '@material-ui/core';
import logo from "../../imagenes/fondoT1.png";
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

const useStyles = makeStyles((theme) => ({
    root: {
      backgroundImage: "url('https://i.pinimg.com/originals/8d/05/c7/8d05c77aa6281b4af5fb0d1ebfaf66ac.jpg')",
      backgroundSize: "cover",
    },
    card: {
        margin: theme.spacing(4),
    },
    logo: {
        marginRight:"auto",
        marginLeft: "auto",
        height: 250,
        width: 500,
    },
}));

const Proposito = () => {
    const classes = useStyles();
    return ( 
        <div className={classes.root}>
            <Grid container>
                <Grid item xs={6}>
                    <div className={classes.logo}>
                        <img src={logo} alt=""  className={classes.logo} />  
                    </div>
                </Grid>
                <Grid item xs={6}>
                    <Card className={classes.card}>
                        <CardContent>
                            <Typography variant="h4" gutterBottom>
                                Propósitos:
                            </Typography>
                            <List>
                                <ListItem>
                                    <ListItemIcon>
                                        <FiberManualRecordIcon />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary="Primer Proposito"
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemIcon>
                                        <FiberManualRecordIcon />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary="Segundo Proposito"
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemIcon>
                                        <FiberManualRecordIcon />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary="Tercer Proposito"
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
 
export default Proposito;