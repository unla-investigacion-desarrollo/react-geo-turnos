import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import ListaMenu from "./listaMenu";
import { Typography, Divider } from "@material-ui/core";
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

const MenuDrawer = () => {
  const classes = useStyles();
  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
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

export default MenuDrawer;
