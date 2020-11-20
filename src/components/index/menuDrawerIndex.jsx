import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import ListaMenu from "../navbar/listaMenu";
import { Typography, Divider, ListItem, List, ListItemIcon, ListItemText } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { mostrarMenu, switchMostrarMenu } from "../navbar/menuSlice";
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

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

const handleClick = (event) => {
  const anchor = (event.target.ownerDocument || document).querySelector(event.currentTarget.getAttribute('seccion'));

  if (anchor) {
    anchor.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

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
      <List component="nav">
        <ListItem button onClick={handleClick} seccion="#seccion1" >
          <ListItemIcon><FiberManualRecordIcon/></ListItemIcon>
          <ListItemText primary={"PROPOSITOS"} />
        </ListItem>
        <ListItem button onClick={handleClick} seccion="#seccion2" >
          <ListItemIcon><FiberManualRecordIcon/></ListItemIcon>
          <ListItemText primary={"DESCARGAR APP"} />
        </ListItem>
        <ListItem button onClick={handleClick} seccion="#seccion3" >
          <ListItemIcon><FiberManualRecordIcon/></ListItemIcon>
          <ListItemText primary={"VIDEOS TUTORIALES"} />
        </ListItem>
        <ListItem button onClick={handleClick} seccion="#seccion4" >
          <ListItemIcon><FiberManualRecordIcon/></ListItemIcon>
          <ListItemText primary={"QUIENES SOMOS"} />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default MenuDrawerIndex;
