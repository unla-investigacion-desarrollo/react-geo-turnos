import React from "react";
import "./App.css";
import Navbar from "./components/navbar/navbar";
import { useSelector } from "react-redux";
import { selectMenuValor } from "./components/navbar/menuSlice";
import MenuDrawer from "./components/navbar/menuDrawer";
import FormProducto from "./components/producto/formProductoFormik";
import { makeStyles } from "@material-ui/core/styles";

const MenuSwitch = (menuOption) => {
  switch (menuOption) {
    default:
      return <FormProducto />;
  }
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
}));

function App() {
  const menuOption = useSelector(selectMenuValor);
  const classes = useStyles();
  console.log(menuOption);
  return (
    <div className={classes.root}>
      <Navbar />
      <MenuDrawer />
      <main className={classes.content}>
        <div className={classes.toolbar}></div>
        {MenuSwitch(menuOption)}
      </main>
    </div>
  );
}

export default App;
