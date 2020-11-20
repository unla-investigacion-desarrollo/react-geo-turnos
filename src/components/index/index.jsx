import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Button, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Fab from '@material-ui/core/Fab';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Zoom from '@material-ui/core/Zoom';
import logo from "../../imagenes/1.png";
import Proposito from './proposito';
import Descarga from './descarga';
import Videos from './videos';
import Somos from './somos';
import { Link } from "react-router-dom";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import { useDispatch, useSelector } from "react-redux";
import { switchMostrarMenu } from "../navbar/menuSlice";
import {
  Menu as MenuIcon,
} from "@material-ui/icons";

const altoSeccion = 600;

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  appbar:{
    backgroundColor: "#0BA3C8",
  },
    seccion2: {
    height: altoSeccion,
    backgroundColor: "red",
    },
    seccion3: {
        height: altoSeccion,
        backgroundColor: "green",
    },
    seccion4: {
        height: altoSeccion,
        backgroundColor: "orange",
    },
    buttonAppBar: {
        color: "white",
        fontSize: 19,
        marginRight: "auto",
        marginLeft: "auto",
    },
    buttonAppBarUltimo: {
        color: "white",
        fontSize: 24,
    },
    logo: {
        position: "relative",
        height: 50,
        marginRight: theme.spacing(1),
    },
    gridLogo:{
        background: "linear-gradient(left,white  , #0BA3C8 )",
        height: 63,
        paddingLeft: theme.spacing(1),
    },
    toolbar:{
        padding: 0,
    },
    login: {
        display: "inline",
        marginRight: "auto",
        marginLeft: "auto",
        width: 400,
    },
    botonIngresar: {
      backgroundColor: "#30DA35",
      "&:hover":{
        backgroundColor:"#33B237",
      },
      color: "white",
    },
    menuButton:{
      marginLeft: theme.spacing(0.4),
    }
}));

const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(event.currentTarget.getAttribute('seccion'));

    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

function ScrollTop(props) {
  const { children, window } = props;
  const classes = useStyles();
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  

  return (
    <Zoom in={trigger}>
      <div onClick={handleClick} seccion="#back-to-top-anchor" role="presentation" className={classes.root}>
        {children}
      </div>
    </Zoom>
  );
}

ScrollTop.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

const Index = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar className={classes.appbar} position="fixed">
        <Toolbar className={classes.toolbar}>
        <Hidden mdUp>
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
            <Grid container justify="center" alignItems="center">
                <Grid item xs={2} md={2} className={classes.gridLogo}>
                    <img src={logo} alt="" className={classes.logo} />
                </Grid>
                <Grid item xs={7} md={9}>
                  <Grid
                    container
                    direction="row"
                    justify="space-around"
                    alignItems="center"
                  >
                  <Hidden smDown>
                    <Grid item>
                      <Button className={classes.buttonAppBar} onClick={handleClick} seccion="#seccion1">
                          Propositos
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button className={classes.buttonAppBar} onClick={handleClick} seccion="#seccion2">
                          Descargar App
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button className={classes.buttonAppBar} onClick={handleClick} seccion="#seccion3">
                          Videos Tutoriales
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button className={classes.buttonAppBar} onClick={handleClick} seccion="#seccion4">
                          Quiénes Somos
                      </Button>
                    </Grid>
                    </Hidden>
                  </Grid>
                </Grid>
                <Grid item xs={3} md={1}>
                    <Button
                        className={classes.botonIngresar}
                        variant="contained"
                        color="primary"
                        component={Link}
                        to="/login"
                    >
                        Ingresar
                    </Button>
                </Grid>
                
            </Grid>
        </Toolbar>
      </AppBar>
      <Toolbar id="back-to-top-anchor" />
      <div id="seccion1"><Proposito/></div>
      <div id="seccion2"><Descarga/></div>
      <div id="seccion3"><Videos/></div>
      <div id="seccion4"><Somos/></div>
      <ScrollTop {...props}>
        <Fab color="secondary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </React.Fragment>
  );
}

export default Index;
