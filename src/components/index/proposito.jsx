import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Card, CardContent, Typography,
List, ListItem, ListItemIcon, ListItemText
} from '@material-ui/core';

import FolderIcon from '@material-ui/icons/Folder';

const useStyles = makeStyles((theme) => ({
    root: {
      backgroundImage: "url('https://i.pinimg.com/originals/8d/05/c7/8d05c77aa6281b4af5fb0d1ebfaf66ac.jpg')",
      backgroundSize: "cover",
    },
    card: {
        margin: theme.spacing(4),
    },
}));

const Proposito = () => {
    const classes = useStyles();
    return ( 
        <div className={classes.root}>
            <Grid container>
                <Grid item xs={6}>
                    
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
                                        <FolderIcon />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary="Primer Proposito"
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemIcon>
                                        <FolderIcon />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary="Primer Proposito"
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemIcon>
                                        <FolderIcon />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary="Primer Proposito"
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