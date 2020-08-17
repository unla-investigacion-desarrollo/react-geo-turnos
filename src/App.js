import React from "react";
import "./App.css";
import Navbar from "./components/navbar/navbar";
import MenuDrawer from "./components/navbar/menuDrawer";
import { makeStyles } from "@material-ui/core/styles";
import Contenido from "./components/contenido/contenido";
import Hidden from "@material-ui/core/Hidden";
import { BrowserRouter as Router } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
}));

function App() {
  const classes = useStyles();
  return (
    <Router>
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
    </Router>
  );
}

export default App;
