import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import InboxIcon from "@material-ui/icons/Inbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  lista: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
}));

const ListaMenu = () => {
  const classes = useStyles();
  return (
    <div className={classes.lista}>
      <List component="nav">
        <ListItem
          button
          onClick={() => {
            window.location.assign("/listaProducto");
          }}
        >
          <ListItemIcon>
            <AddCircleIcon />
          </ListItemIcon>
          <ListItemText primary="Productos" />
        </ListItem>
        <ListItem
          button
          onClick={() => {
            window.location.assign("/listaMarca");
          }}
        >
          <ListItemIcon>
            <AddCircleIcon />
          </ListItemIcon>
          <ListItemText primary="Marcas" />
        </ListItem>
      </List>
      <Divider />
      <List component="nav">
        <ListItem button>
          <ListItemText primary="Trash" />
        </ListItem>
      </List>
    </div>
  );
};

export default ListaMenu;
