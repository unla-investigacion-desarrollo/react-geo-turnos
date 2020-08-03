import React from "react";
import logo from "./logo.svg";
import "./App.css";
import FormProducto from "./components/formProductoFormik";
import Categoria from "./components/categoria";
import Marca from "./components/marca";
import Rubro from "./components/rubro";
import TipoEmprendimiento from "./components/tipoEmprendimiento";
//<FormProducto />
//<Categoria />
//<Marca />
// <Rubro />

function App() {
  return (
    <div>
      <TipoEmprendimiento />
    </div>
  );
}

export default App;
