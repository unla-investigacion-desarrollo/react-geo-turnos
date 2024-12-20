import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { Typography, Menu, MenuItem } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import {
  Menu as MenuIcon,
  AccountCircle,
  ArrowDropDown,
} from "@material-ui/icons";
import Hidden from "@material-ui/core/Hidden";
import { switchMostrarMenu } from "../navbar/menuSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectSesion, borrarDatosSesion } from "../../datosSesion/sesionSlice";
import { Redirect,Link } from "react-router-dom";
import logo from "../../imagenes/logo3.png";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.up("sm")]: {
      //calculo para tamaño y posicion de content
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
    backgroundColor: "#0BA3C8",
    height: 60,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    // [theme.breakpoints.up("sm")]: {
    //   display: "none",
    // },
  },
  title: {
    flexGrow: 1,
  },
  logo: {
    position: "relative",
    height: 50,
    marginRight: theme.spacing(1),
  }
}));

const NavBar = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const datosDeSesion = useSelector(selectSesion);
  const [cerrarSesion, setCerrarSesion] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const funcionCerrarSesion = () => {
    //se haria un api call para cerrar sesion
    dispatch(borrarDatosSesion());
    setAnchorEl(null);
  };


  return (
    <AppBar position="fixed" className={classes.root}>
      <Toolbar>
        <Hidden smUp>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={() => dispatch(switchMostrarMenu())}
          >
            <MenuIcon />
          </IconButton>
        </Hidden>
        <img src={logo} alt="" className={classes.logo} />
        <Typography variant="h6" className={classes.title}>
           - {datosDeSesion.nombreEmprendimiento}
        </Typography>
        <AccountCircle />
        <Button
          color="inherit"
          endIcon={<ArrowDropDown />}
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          {datosDeSesion.nombre + " " + datosDeSesion.apellido}
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem 
          onClick={handleClose}
          component={Link}
          to="/modificarRegistroDatosPersonales"
          >Datos Personales</MenuItem>
          <MenuItem 
          onClick={handleClose}
          component={Link}
          to="/modificarRegistroEmprendimiento"
          >Datos Emprendimiento</MenuItem>
          <MenuItem 
          onClick={handleClose}
          component={Link}
          to="/modificarTurnoEmprendimiento"
          >Datos Turno</MenuItem>
          <MenuItem onClick={funcionCerrarSesion}>Cerrar Sesion</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
