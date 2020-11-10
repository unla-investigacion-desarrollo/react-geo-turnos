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

  const formatearTurno = (idTurno, idEstado) => {
    let turno = turnosPendientes.find((turno) => turno.idTurno === idTurno);
    return {
      idTurno: turno.idTurno,
      idEmprendimiento: turno.emprendimiento.idEmprendimiento,
      idEstadoTurno: idEstado,
      idPersona: turno.persona.idPersona,
      observaciones: turno.observaciones,
      usuarioModi: turno.usuarioModi,
      fechaHora: turno.fechaHora,
    };
  };

  const chequearTurnoAceptar = (idTurno) => {
    let turnoFormateado = formatearTurno(idTurno, 1);
    apiCalls
      .putTurno(turnoFormateado)
      .then((response) => {
        dispatch(aceptarTurno(idTurno));
      })
      .catch((error) => dispatch(aceptarTurno(idTurno)));
  };

  const chequearTurnoRechazar = (idTurno) => {
    let turnoFormateado = formatearTurno(idTurno, 3);
    apiCalls
      .putTurno(turnoFormateado)
      .then((response) => {
        dispatch(rechazarTurno(idTurno));
      })
      .catch((error) => dispatch(rechazarTurno(idTurno)));
  };

  
  const mostrarDialog = (turno) => {
    setStateOpenDialogRechazar(true);
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
                      turno.persona.nombre +
                      " " +
                      turno.persona.apellido
                    }
                  />
                  <ListItemSecondaryAction>
                    <IconButton
                      size="small"
                      color="secondary"
                      variant="contained"
                      onClick={() => mostrarDialog(turno)}
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
      </Card>
    </>
  );
};

export default ListaSolicitudes;
