import React from "react";
import FormProducto from "../producto/formProductoFormik";
import { makeStyles } from "@material-ui/core/styles";
import { Switch, Route } from "react-router-dom";
import ListaProductos from "../producto/listaProductos";
import ListaMarcas from "../marca/listaMarcas";
import ListaCategorias from "../categoria/listaCategorias";
import Categoria from "../categoria/categoria";
import Marca from "../marca/marca";
import Rubro from "../rubro/rubro";
import ListaRubros from "../rubro/listaRubros";
import TipoEmprendimiento from "../tipoEmprendimiento/tipoEmprendimiento";
import ListaTipoEmprendimientos from "../tipoEmprendimiento/listaTipoEmprendimientos";
import ListaSolicitudes from "../solicitud/listaSolicitudes";
import ListaAceptados from "../solicitud/listaAceptados";
import VistaTurnos from "../solicitud/vistaTurnos";

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
        <Route path="/marcas/nuevo">
          <Marca />
        </Route>
        <Route path="/marcas/:id">
          <Marca variante="modificar" />
        </Route>
        <Route path="/marcas">
          <ListaMarcas />
        </Route>
        <Route path="/categorias/nuevo">
          <Categoria />
        </Route>
        <Route path="/categorias/:id">
          <Categoria variante="modificar" />
        </Route>
        <Route path="/categorias">
          <ListaCategorias />
        </Route>

        <Route path="/rubros/nuevo">
          <Rubro />
        </Route>
        <Route path="/rubros/:id">
          <Rubro variante="modificar" />
        </Route>
        <Route path="/rubros">
          <ListaRubros />
        </Route>

        <Route path="/tipoEmprendimientos/nuevo">
          <TipoEmprendimiento />
        </Route>
        <Route path="/tipoEmprendimientos/:id">
          <TipoEmprendimiento variante="modificar" />
        </Route>
        <Route path="/tipoEmprendimientos">
          <ListaTipoEmprendimientos />
        </Route>

        <Route path="/turnos">
          <VistaTurnos />
        </Route>
      </Switch>
    </main>
  );
};

export default Contenido;
