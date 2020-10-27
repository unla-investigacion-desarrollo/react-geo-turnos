import React, {useEffect} from "react";
import "./App.css";
import Navbar from "./components/navbar/navbar";
import MenuDrawer from "./components/navbar/menuDrawer";
import { makeStyles } from "@material-ui/core/styles";
import Contenido from "./components/contenido/contenido";
import Hidden from "@material-ui/core/Hidden";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LogIn from "./components/login/login";
import Registro from "./components/registro/persona/registro";
import RegistroEmp from "./components/registro/emprendimiento/registroEmp";
import RestablecerPass from "./components/login/restablecerPassword";
import { useDispatch } from "react-redux";
import {cargarDatosSesion} from "./datosSesion/sesionSlice";



const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
}));
function App() {
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    const datosSesion = localStorage.getItem("stateSesion");
    console.log(datosSesion);
    if(datosSesion){
      dispatch(cargarDatosSesion(JSON.parse(datosSesion)));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Router>
      <Switch>
        <Route exact path="/login">
          <LogIn />
        </Route>
        <Route exact path="/registro">
          <Registro />
        </Route>
        <Route exact path="/restablecerPassword">
          <RestablecerPass/>
        </Route>
        <Route exact path="/registroEmprendimiento">
          <RegistroEmp/>
        </Route> 

        <Route path="/">
          <div className={classes.root}>
            <Navbar />
            <Hidden xsDown>
              {/* Para PC */}
              <MenuDrawer variante="permanent" />
            </Hidden>
            <Hidden smUp>
              {/* Para mobile */}
              <MenuDrawer variante="temporary" />
            </Hidden>
            <Contenido />
          </div>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
