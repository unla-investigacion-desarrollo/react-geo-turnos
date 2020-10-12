import React from "react";
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
                      onClick={() => dispatch(deshacerAceptado(turno.idTurno))}
                    >
                      <ArrowBack />
                    </IconButton>
                    <Button
                      size="small"
                      color="primary"
                      variant="contained"
                      endIcon={<Input />}
                    >
                      Atender
                    </Button>
                  </ListItemSecondaryAction>
                </ListItem>
                <Divider />
              </React.Fragment>
            );
          })}
        </List>
      </Card>
    </>
  );
};

export default ListaAceptados;
