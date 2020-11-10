import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Person from "@material-ui/icons/Person";
import { Typography, Divider } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import { useSelector, useDispatch } from "react-redux";
import {
  selectTurnosPendientes,
} from "./turnoSlice";
import { apiCalls } from "../../api/apiCalls";


const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    overflow: "auto",
    backgroundColor: theme.palette.background.paper,
    position: "relative",
    height: window.screen.availHeight - 300,
  },
}));

const ListaHistorial = (props) => {
  const classes = useStyles();
  const turnosPendientes = useSelector(selectTurnosPendientes);
  const [stateDisponible, setStateDisponible] = useState(true);
  useEffect(() => {
    if (new Date(props.fecha)>new Date()){
        setStateDisponible(false);
    }
    else {
        setStateDisponible(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.fecha]);

  if(stateDisponible){
    return (
        <>
          <Typography variant="h5" color="initial">
            {props.fecha} - Historial
          </Typography>
          <Card>
            <List className={classes.root}>
              {turnosPendientes.map((turno) => {
                const labelId = `checkbox-list-label-${turno}`;
    
                return (
                  <React.Fragment key={turno.idTurno}>
                    <ListItem key={turno.idTurno} role={undefined} dense button>
                      <ListItemIcon>
                        <Person />
                      </ListItemIcon>
                      <ListItemText
                        id={labelId}
                        primary={
                          turno.fechaHora +
                          " - " +
                          turno.persona.nombre +
                          " " +
                          turno.persona.apellido +
                          " - " +
                          turno.observaciones
                        }
                      />
                    </ListItem>
                    <Divider />
                  </React.Fragment>
                );
              })}
            </List>
          </Card>
        </>
    );
  } else {
      return(
        <Typography variant="h5" color="initial">
            {props.fecha} - Historial - NO DISPONIBLE
          </Typography>
      );
  }
  
};

export default ListaHistorial;