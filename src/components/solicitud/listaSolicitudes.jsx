import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Person from "@material-ui/icons/Person";
import Check from "@material-ui/icons/Check";
import Close from "@material-ui/icons/Close";
import Comments from "@material-ui/icons/Comment";
import { Typography, Divider, IconButton } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import { useSelector, useDispatch } from "react-redux";
import {
  selectTurnosPendientes,
  aceptarTurno,
  rechazarTurno,
} from "./turnoSlice";
import { apiCalls } from "../../api/apiCalls";
import DialogRechazar from "./dialogRechazar";
import DialogObservacion from "./dialogObservacion";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    overflow: "auto",
    backgroundColor: theme.palette.background.paper,
    position: "relative",
    height: window.screen.availHeight - 300,
  },
}));

const ListaSolicitudes = () => {
  const classes = useStyles();
  const turnosPendientes = useSelector(selectTurnosPendientes);
  const dispatch = useDispatch();
  const [stateOpenDialogRechazar, setStateOpenDialogRechazar] = useState(false);
  const [stateTurnoParaDialog,setStateTurnoParaDialog] = useState(null);
  const [stateOpenDialogObservacion, setStateOpenDialogObservacion] = useState(false);



  const chequearTurnoAceptar = (idTurno) => {
    apiCalls
      .patchTurno(idTurno,2)
      .then((response) => {
        dispatch(aceptarTurno(idTurno));
      })
      .catch((error) => console.log("ocurrio un error"));
  };

  const chequearTurnoRechazar = (idTurno) => {
    apiCalls
      .patchTurno(idTurno,1)
      .then((response) => {
        dispatch(rechazarTurno(idTurno));
      })
      .catch((error) => console.log("ocurrio un error"));
  };

  
  const mostrarDialogRechazar = (turno) => {
    setStateOpenDialogRechazar(true);
    setStateTurnoParaDialog(turno);
  }

  const mostrarDialogObservacion = (turno) => {
    setStateOpenDialogObservacion(true);
    setStateTurnoParaDialog(turno);
  }

  return (
    <>
      <Typography variant="h5" color="initial">
        Solicitudes
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
                      turno.nombrePersona
                    }
                  />
                  <ListItemSecondaryAction>
                    <IconButton
                      size="small"
                      color="secondary"
                      variant="contained"
                      onClick={() => mostrarDialogRechazar(turno)}
                      title="Rechazar Turno"
                    >
                      <Close />
                    </IconButton>
                    <IconButton
                      size="small"
                      color="primary"
                      variant="contained"
                      onClick={() => chequearTurnoAceptar(turno.idTurno)}
                      title="Aceptar Turno"
                    >
                      <Check />
                    </IconButton>
                    <IconButton
                      size="small"
                      color="primary"
                      variant="contained"
                      onClick={() =>mostrarDialogObservacion(turno)}
                      title="Observaciones"
                    >
                      <Comments />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>

                <Divider />
              </React.Fragment>
            );
          })}
        </List>
        <DialogRechazar turno={stateTurnoParaDialog} cambiarVisible={setStateOpenDialogRechazar} 
          esVisible={stateOpenDialogRechazar} rechazar= {chequearTurnoRechazar}/>
        <DialogObservacion turno={stateTurnoParaDialog} cambiarVisible={setStateOpenDialogObservacion} 
          esVisible={stateOpenDialogObservacion}/>
      </Card>
    </>
  );
};

export default ListaSolicitudes;
