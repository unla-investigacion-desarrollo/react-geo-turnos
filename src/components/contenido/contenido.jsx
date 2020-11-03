import React from "react";
import FormProducto from "../producto/formProductoFormik";
import { makeStyles } from "@material-ui/core/styles";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import ListaProductos from "../producto/listaProductos";
import ListaMarcas from "../marca/listaMarcas";
import ListaCategorias from "../categoria/listaCategorias";
import Categoria from "../categoria/categoria";
import Marca from "../marca/marca";
import Rubro from "../rubro/rubro";
import ListaRubros from "../rubro/listaRubros";
import ListaPerfiles from "../perfil/listaPerfiles";
import TipoEmprendimiento from "../tipoEmprendimiento/tipoEmprendimiento";
import ListaTipoEmprendimientos from "../tipoEmprendimiento/listaTipoEmprendimientos";
import VistaTurnos from "../solicitud/vistaTurnos";
import Perfil from "../perfil/perfil";
import ModificarDatosPersonales from "../registro/modificarRegistroDatosPersonales";
import CambiarPassword from "../cambiarDatos/cambiarPassword";
import ModificarDatosEmprendimiento from "../cambiarDatos/modificarDatosEmprendimiento";
import ModificarDatosTurno from "../cambiarDatos/modificarDatosTurno";


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
  let { path } = useRouteMatch();
  return (
    <main className={classes.content}>
      <div className={classes.toolbar}></div>
      <Switch>
        <Route path={path} exact>
          Raiz
        </Route>
        <Route path={`${path}productos/nuevo`}>
          <FormProducto />
        </Route>
        <Route path={`${path}productos/:id`}>
          <FormProducto variante="modificar" />
        </Route>
        <Route path={`${path}productos`}>
          <ListaProductos />
        </Route>
        <Route path={`${path}marcas/nuevo`}>
          <Marca />
        </Route>
        <Route path={`${path}marcas/:id`}>
          <Marca variante="modificar" />
        </Route>
        <Route path={`${path}marcas`}>
          <ListaMarcas />
        </Route>
        <Route path={`${path}categorias/nuevo`}>
          <Categoria />
        </Route>
        <Route path={`${path}categorias/:id`}>
          <Categoria variante="modificar" />
        </Route>
        <Route path={`${path}categorias`}>
          <ListaCategorias />
        </Route>
        <Route path={`${path}rubros/nuevo`}>
          <Rubro />
        </Route>
        <Route path={`${path}rubros/:id`}>
          <Rubro variante="modificar" />
        </Route>
        <Route path={`${path}rubros`}>
          <ListaRubros />
        </Route>
        <Route path={`${path}tipoEmprendimientos/nuevo`}>
          <TipoEmprendimiento />
        </Route>
        <Route path={`${path}tipoEmprendimientos/:id`}>
          <TipoEmprendimiento variante="modificar" />
        </Route>
        <Route path={`${path}tipoEmprendimientos`}>
          <ListaTipoEmprendimientos />
        </Route>
        <Route path={`${path}turnos`}>
          <VistaTurnos />
        </Route>
        <Route path={`${path}perfiles/nuevo`}>
          <Perfil />
        </Route>
        <Route path={`${path}perfiles/:id`}>
          <Perfil variante="modificar" />
        </Route>
        <Route path={`${path}perfiles`}>
          <ListaPerfiles />
        </Route>
        <Route  path={`${path}modificarRegistroDatosPersonales`}>
          <ModificarDatosPersonales/>
        </Route> 
        <Route  path={`${path}cambiarPassword`}>
          <CambiarPassword/>
        </Route> 
        <Route  path={`${path}modificarRegistroEmprendimiento`}>
          <ModificarDatosEmprendimiento/>
        </Route>
        <Route  path={`${path}modificarTurnoEmprendimiento`}>
          <ModificarDatosTurno/>
        </Route>
      </Switch>
    </main>
  );
};

export default Contenido;
