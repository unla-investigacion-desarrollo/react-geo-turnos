import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import ViewList from "@material-ui/icons/ViewList";
import {  useSelector } from "react-redux";
import { selectSesion } from "../../datosSesion/sesionSlice";

import { NavLink, useLocation } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  lista: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  itemNoVisible:{
    display: "none",
  }
}));

const ListaMenu = () => {
  const classes = useStyles();
  const location = useLocation();
  const datosDeSesion = useSelector(selectSesion);

  const Item = (props) => {
    return (
      <ListItem
        button
        selected={location.pathname.includes(props.to)}
        component={NavLink}
        to={props.to}
      >
        <ListItemIcon>{props.icon}</ListItemIcon>
        <ListItemText primary={props.text} />
      </ListItem>
    );
  };

  return (
    <div className={classes.lista}>
      <List className={datosDeSesion.tipoUsuario!=="administrador"?classes.itemNoVisible:null} component="nav">
        <Item  to="/perfiles" icon={<ViewList />} text="Perfiles" />
        <Item to="/productos" icon={<ViewList />} text="Articulos" />
        <Item to="/marcas" icon={<ViewList />} text="Marcas" />
        <Item to="/categorias" icon={<ViewList />} text="Categorias" />
        <Item to="/rubros" icon={<ViewList />} text="Rubros" />
        <Item
          to="/tipoEmprendimientos"
          icon={<ViewList />}
          text="TipoEmprendimientos"
        />
        <Item to="/turnos" icon={<ViewList />} text="Turnos" />
      </List>
      <List className={datosDeSesion.tipoUsuario!=="emprendedor"?classes.itemNoVisible:null} component="nav">
        <Item to="/turnos" icon={<ViewList />} text="Turnos" />
      </List>
      <Divider />
    </div>
  );
};

export default ListaMenu;
