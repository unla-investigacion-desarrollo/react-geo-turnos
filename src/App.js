import React from "react";
import "./App.css";
import Navbar from "./components/navbar/navbar";
import MenuDrawer from "./components/navbar/menuDrawer";
import { makeStyles } from "@material-ui/core/styles";
import Contenido from "./components/contenido/contenido";
import Hidden from "@material-ui/core/Hidden";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LogIn from "./components/login/login";
import Registro from "./components/registro/registro";
import RestablecerPass from "./components/login/restablecerPassword";



const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
}));
function App() {
  const classes = useStyles();
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
