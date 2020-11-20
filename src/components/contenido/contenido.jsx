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
import Error403 from "../error/error403";
import Permiso from "../redireccionPermiso/permiso";


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
          <Permiso idPerfil={[1]}/>
          <FormProducto />
        </Route>
        <Route path={`${path}productos/:id`}>
          <Permiso idPerfil={[1]}/>
          <FormProducto variante="modificar" />
        </Route>
        <Route path={`${path}productos`}>
          <Permiso idPerfil={[1]}/>
          <ListaProductos />
        </Route>
        <Route path={`${path}marcas/nuevo`}>
          <Permiso idPerfil={[1]}/>
          <Marca />
        </Route>
        <Route path={`${path}marcas/:id`}>
          <Permiso idPerfil={[1]}/>
          <Marca variante="modificar" />
        </Route>
        <Route path={`${path}marcas`}>
          <Permiso idPerfil={[1]}/>
          <ListaMarcas />
        </Route>
        <Route path={`${path}categorias/nuevo`}>
          <Permiso idPerfil={[1]}/>
          <Categoria />
        </Route>
        <Route path={`${path}categorias/:id`}>
          <Permiso idPerfil={[1]}/>
          <Categoria variante="modificar" />
        </Route>
        <Route path={`${path}categorias`}>
          <Permiso idPerfil={[1]}/>
          <ListaCategorias />
        </Route>
        <Route path={`${path}rubros/nuevo`}>
          <Permiso idPerfil={[1]}/>
          <Rubro />
        </Route>
        <Route path={`${path}rubros/:id`}>
          <Permiso idPerfil={[1]}/>
          <Rubro variante="modificar" />
        </Route>
        <Route path={`${path}rubros`}>
          <Permiso idPerfil={[1]}/>
          <ListaRubros />
        </Route>
        <Route path={`${path}tipoEmprendimientos/nuevo`}>
          <Permiso idPerfil={[1]}/>
          <TipoEmprendimiento />
        </Route>
        <Route path={`${path}tipoEmprendimientos/:id`}>
          <Permiso idPerfil={[1]}/>
          <TipoEmprendimiento variante="modificar" />
        </Route>
        <Route path={`${path}tipoEmprendimientos`}>
          <Permiso idPerfil={[1]}/>
          <ListaTipoEmprendimientos />
        </Route>
        <Route path={`${path}turnos`}>
        <Permiso idPerfil={[1,3]}/>
          <VistaTurnos />
        </Route>
        <Route path={`${path}perfiles/nuevo`}>
          <Permiso idPerfil={[1]}/>
          <Perfil />
        </Route>
        <Route path={`${path}perfiles/:id`}>
          <Permiso idPerfil={[1]}/>
          <Perfil variante="modificar" />
        </Route>
        <Route path={`${path}perfiles`}>
          <Permiso idPerfil={[1]}/>
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
        <Route  path={`${path}403`}>
          <Error403/>
        </Route>
      </Switch>
    </main>
  );
};

export default Contenido;
