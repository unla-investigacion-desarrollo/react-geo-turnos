import React from "react";
import "./App.css";
import FormProducto from "./components/formProductoFormik";
import Categoria from "./components/categoria";
import Marca from "./components/marca";
import Rubro from "./components/rubro";
import TipoEmprendimiento from "./components/tipoEmprendimiento";
import Navbar from "./components/navbar";
import { useSelector } from "react-redux";
import { selectMenuValor } from "./components/menuSlice";
//<FormProducto />
//<Categoria />
//<Marca />
// <Rubro />

const MenuSwitch = (valor) => {
  switch (valor) {
    case 1:
      return <TipoEmprendimiento />;
    case 2:
      return <FormProducto />;
    case 3:
      return <Categoria />;
    case 4:
      return <Rubro />;
    case 5:
      return <Marca />;
    default:
      return <FormProducto />;
  }
};

function App() {
  const menuOption = useSelector(selectMenuValor);
  return (
    <div>
      <Navbar />
      {MenuSwitch(menuOption)}
    </div>
  );
}

export default App;
