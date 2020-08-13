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
import ListaProductos from "./components/listaProductos";
import ListaCategorias from "./components/listaCategorias";
import FormProductoModificar from "./components/formProductoModificar";
import FormCategoriaModificar from "./components/formCategoriaModificar";
import ListaMarcas from "./components/listaMarcas";
import FormMarcaModificar from "./components/formMarcaModificar";
import ProductoMaterial from "./components/formProductoMaterial";
//<FormProducto />
//<Categoria />
//<Marca />
// <Rubro />

const MenuSwitch = (menuOption) => {
  switch (menuOption) {
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
    case 6:
      return <ListaProductos />;
    case 7:
      return <FormProductoModificar />;
    case 8:
      return <ListaCategorias />;
    case 9:
      return <FormCategoriaModificar />;
    case 10:
      return <ListaMarcas />;
    case 11:
      return <FormMarcaModificar />;

    default:
      return <ProductoMaterial />;
  }
};

function App() {
  const menuOption = useSelector(selectMenuValor);
  console.log(menuOption);
  return (
    <div>
      <Navbar />
      {MenuSwitch(menuOption)}
    </div>
  );
}

export default App;
