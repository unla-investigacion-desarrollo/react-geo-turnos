import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import Person from "@material-ui/icons/Person";
import Check from "@material-ui/icons/Check";
import Input from "@material-ui/icons/Input";
import { Typography, Button, Divider } from "@material-ui/core";
import Card from "@material-ui/core/Card";

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

  return (
    <>
      <Typography variant="h5" color="initial">
        Aceptados
      </Typography>
      <Card>
        <List className={classes.root}>
          {[0, 1, 2, 3].map((value) => {
            const labelId = `checkbox-list-label-${value}`;

            return (
              <>
                <ListItem key={value} role={undefined} dense button>
                  <ListItemIcon>
                    <Person />
                  </ListItemIcon>
                  <ListItemText
                    id={labelId}
                    primary={`Nombre y apellido persona ${value + 1}`}
                  />
                  <ListItemSecondaryAction>
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
              </>
            );
          })}
        </List>
      </Card>
    </>
  );
};

export default ListaAceptados;
