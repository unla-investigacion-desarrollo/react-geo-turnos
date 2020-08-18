import React from "react";
import FormProducto from "../producto/formProductoFormik";
import { makeStyles } from "@material-ui/core/styles";
import { Switch, Route } from "react-router-dom";
import ListaProductos from "../producto/listaProductos";
import ListaMarcas from "../marca/listaMarcas";
import FormProductoModificar from "../producto/formProductoModificar";
import ListaCategorias from "../categoria/listaCategorias";

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
  return (
    <main className={classes.content}>
      <div className={classes.toolbar}></div>
      <Switch>
        <Route path="/" exact>
          Raiz
        </Route>
        <Route path="/productos/nuevo">
          <FormProducto />
        </Route>
        <Route path="/productos/:id">
          <FormProducto variante="modificar" />
        </Route>
        <Route path="/productos">
          <ListaProductos />
        </Route>
        <Route path="/marcas">
          <ListaMarcas />
        </Route>
        <Route path="/categorias">
          <ListaCategorias />
        </Route>
      </Switch>
    </main>
  );
};

export default Contenido;
