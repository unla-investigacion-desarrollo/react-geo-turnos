import React from 'react';
import {CardMedia, Card, Grid} from "@material-ui/core";
import img403 from "../../imagenes/403.png";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    card: {
      width: 400,
    },
    media: {
      height: 240,
    },
  }));

const Error403 = () => {
    const classes = useStyles();
    return (
        <Grid container direction="row" justify="center" alignItems="center"> 
            <Card className={classes.card}>
                <CardMedia
                className={classes.media}
                title="Algun titulo"
                image={img403}
                />
            </Card>
        </Grid>
    );
}
 
export default Error403;