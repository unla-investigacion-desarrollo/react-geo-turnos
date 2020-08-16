import React from "react";
import { useSelector } from "react-redux";
import FormProducto from "../producto/formProductoFormik";
import { selectMenuValor } from "../navbar/menuSlice";
import { makeStyles } from "@material-ui/core/styles";

const MenuSwitch = (menuOption) => {
  switch (menuOption) {
    default:
      return <FormProducto />;
  }
};

const useStyles = makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
}));

const Contenido = () => {
  const classes = useStyles();
  const menuOption = useSelector(selectMenuValor);
  return (
    <main className={classes.content}>
      <div className={classes.toolbar}></div>
      {MenuSwitch(menuOption)}
    </main>
  );
};

export default Contenido;
