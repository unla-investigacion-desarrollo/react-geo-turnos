import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { NavLink } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  lista: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
}));

const ListaMenu = () => {
  const classes = useStyles();
  const [activeItem, setActiveItem] = useState("");

  const Item = (props) => {
    return (
      <ListItem
        button
        selected={activeItem === props.text}
        component={NavLink}
        to={props.to}
        isActive={(match) => {
          if (!match) {
            return false;
          }
          setActiveItem(props.text);
        }}
      >
        <ListItemIcon>{props.icon}</ListItemIcon>
        <ListItemText primary={props.text} />
      </ListItem>
    );
  };

  return (
    <div className={classes.lista}>
      <List component="nav">
        <Item to="/productos" icon={<AddCircleIcon />} text="Productos" />
        <Item to="/marcas" icon={<AddCircleIcon />} text="Marcas" />
        <Item to="/categorias" icon={<AddCircleIcon />} text="Categorias" />
        <Item to="/rubros" icon={<AddCircleIcon />} text="Rubros" />
        <Item
          to="/tipoEmprendimientos"
          icon={<AddCircleIcon />}
          text="TipoEmprendimientos"
        />
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
