import React, {useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Person from "@material-ui/icons/Person";
import Input from "@material-ui/icons/Input";
import { Typography, Button, Divider, IconButton } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import { selectTurnosAceptados, deshacerAceptado } from "./turnoSlice";
import { useSelector, useDispatch } from "react-redux";
import { ArrowBack } from "@material-ui/icons";
import Comments from "@material-ui/icons/Comment";
import { apiCalls } from "../../api/apiCalls";
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



const ListaAceptados = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const turnosAceptados = useSelector(selectTurnosAceptados);
  const [stateTurnoParaDialog,setStateTurnoParaDialog] = useState(null);
  const [stateOpenDialogObservacion, setStateOpenDialogObservacion] = useState(false);

  const chequearDeshacerTurno = (idTurno) => {
    apiCalls
      .patchTurno(idTurno,3)
      .then((response) => {
        dispatch(deshacerAceptado(idTurno));
      })
      .catch((error) => console.log("ocurrio un error"));
  };

  const mostrarDialogObservacion = (turno) => {
    setStateOpenDialogObservacion(true);
    setStateTurnoParaDialog(turno);
  }

  return (
    <>
      <Typography variant="h5" color="initial">
        Aceptados
      </Typography>
      <Card>
        <List className={classes.root}>
          {turnosAceptados.map((turno) => {
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
                      onClick={() => chequearDeshacerTurno(turno.idTurno)}
                      title="Cancelar Aceptacion"
                    >
                      <ArrowBack />
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
        <DialogObservacion turno={stateTurnoParaDialog} cambiarVisible={setStateOpenDialogObservacion} 
          esVisible={stateOpenDialogObservacion}/>
      </Card>
    </>
  );
};

export default ListaAceptados;
