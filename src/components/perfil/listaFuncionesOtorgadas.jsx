import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import { RemoveCircle, Settings } from "@material-ui/icons";
import { Typography, Button, Divider } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import { useSelector, useDispatch } from "react-redux";
import { selectFuncionOtorgados, removerFuncion } from "./funcionSlice";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    overflow: "auto",
    backgroundColor: theme.palette.background.paper,
    position: "relative",
    height: window.screen.availHeight - 600,
  },
}));

const ListaFuncionesOtorgadas = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const funcionesOtorgadas = useSelector(selectFuncionOtorgados);
  return (
    <>
      <Typography variant="h5" color="initial">
        Otorgadas:
      </Typography>
      <Card>
        <List className={classes.root}>
          {funcionesOtorgadas.map((funcion) => {
            const labelId = `checkbox-list-label-${funcion}`;

            return (
              <React.Fragment key={funcion.idFuncion}>
                <ListItem key={funcion.idFuncion} role={undefined} dense button>
                  <ListItemIcon>
                    <Settings />
                  </ListItemIcon>
                  <ListItemText id={labelId} primary={funcion.descripcion} />
                  <ListItemSecondaryAction>
                    <Button
                      size="small"
                      color="primary"
                      variant="contained"
                      endIcon={<RemoveCircle />}
                      onClick={() =>
                        dispatch(removerFuncion(funcion.idFuncion))
                      }
                    >
                      Remover
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

export default ListaFuncionesOtorgadas;
