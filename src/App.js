import React, {useEffect, useState} from "react";
import "./App.css";
import Navbar from "./components/navbar/navbar";
import MenuDrawer from "./components/navbar/menuDrawer";
import MenuDrawerIndex from "./components/index/menuDrawerIndex";
import { makeStyles } from "@material-ui/core/styles";
import Contenido from "./components/contenido/contenido";
import Hidden from "@material-ui/core/Hidden";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import LogIn from "./components/login/login";
import Registro from "./components/registro/persona/registro";
import RegistroEmp from "./components/registro/emprendimiento/registroEmp";
import RestablecerPass from "./components/login/restablecerPassword";
import { useDispatch, useSelector } from "react-redux";
import {cargarDatosSesion, selectSesion, setIniciado} from "./datosSesion/sesionSlice";
import Index from "./components/index/index";
import RestablecerPasswordPaso2 from "./components/login/restablecerPasswordPaso2";
import ValidacionCuenta from "./components/registro/persona/validacionCuenta";
import Permiso from "./components/redireccionPermiso/permiso";



const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
}));
function App() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const sesion = useSelector(selectSesion);
  const [firstRender, setFirstRender] = useState(true);
  

  useEffect(() => {
    const datosSesion = localStorage.getItem("stateSesion");
    if(datosSesion){
      console.log("se ejecuta en appjs");
      dispatch(cargarDatosSesion(JSON.parse(datosSesion)));
    } else {dispatch(setIniciado(false));}
    console.log(datosSesion);
    setFirstRender(false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sesion.idPersona]);

  return (
    <Router>
      <Switch>
        <Route exact path="/index">
          <Index />
          <Hidden mdUp>
              {/* Para mobile */}
              <MenuDrawerIndex variante="temporary" />
          </Hidden>
        </Route>
        <Route exact path="/login">
          <LogIn />
        </Route>
        <Route exact path="/registro">
          <Registro />
        </Route>
        <Route exact path="/restablecerPassword">
          <RestablecerPass/>
        </Route>
        <Route exact path="/restablecerPasswordPaso2/:token">
          <RestablecerPasswordPaso2/>
        </Route>
        <Route exact path="/registroEmprendimiento">
          <RegistroEmp/>
        </Route>
        <Route exact path="/validacionCuenta/:token">
          <ValidacionCuenta/>
        </Route> 

        <Route path="/">
          {sesion.iniciado===null? null :(
          sesion.iniciado===true? null:
          <Redirect to="/login"/>
          )}
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
