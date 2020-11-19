import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import ListaMenu from "../navbar/listaMenu";
import { Typography, Divider } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { mostrarMenu, switchMostrarMenu } from "../navbar/menuSlice";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  toolbar: theme.mixins.toolbar,
  toolbarText: {
    marginTop: 20,
  },
}));

const MenuDrawerIndex = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  let mostrarMenuSelector = useSelector(mostrarMenu);
  return (
    <Drawer
      className={classes.drawer}
      variant={props.variante}
      classes={{
        paper: classes.drawerPaper,
      }}
      open={mostrarMenuSelector}
      onClose={() => dispatch(switchMostrarMenu())}
      anchor="left"
    >
      <div className={classes.toolbar}>
        <Typography
          className={classes.toolbarText}
          variant="h5"
          color="initial"
          align="center"
        >
          Menu
        </Typography>
      </div>
      <Divider />
      <ListaMenu />
    </Drawer>
  );
};

export default MenuDrawerIndex;
