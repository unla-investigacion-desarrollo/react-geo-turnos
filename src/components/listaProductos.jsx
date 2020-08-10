import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux"; //metodo que sirva para usar los reducers
import { cambiarVistaConDatos } from "./menuSlice"; //reducer para cambiar el estado

const ListaProductos = () => {
  const dispatch = useDispatch();
  const [state, setState] = useState({
    productos: [
      {
        id: "1",
        nombre: "producto1",
        codigo: "codigoprod1",
        precio: "precio del 1",
      },
      {
        id: "2",
        nombre: "producto2",
        codigo: "codigoprod2",
        precio: "precio del 2",
      },
      {
        id: "3",
        nombre: "producto3",
        codigo: "codigoprod3",
        precio: "precio del 3",
      },
    ],
  });

  //   useEffect(() => {
  //     fetch("url")
  //       .then((response) => response.json())
  //       .then((json) => setState({json: json }));
  //   }, []);

  const buscarProducto = (id) => {
    //busco el producto por ahi
    let producto = {
      id: "1",
      nombre: "producto1",
      codigo: 351513,
      precio: 136263,
    };
    dispatch(cambiarVistaConDatos(7, producto));
  };

  return (
    <div>
      <table className="table table-hover">
        <thead className="thead-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nombre</th>
            <th scope="col">Codigo</th>
            <th scope="col">Precio</th>
            <th scope="col">Accion</th>
          </tr>
        </thead>
        <tbody>
          {state.productos.map((prod) => (
            <tr key={prod.id}>
              <th>{prod.id}</th>
              <td>{prod.nombre}</td>
              <td>{prod.codigo}</td>
              <td>{prod.precio}</td>
              <td>
                <button
                  className="btn btn-success"
                  onClick={() => buscarProducto(prod.id)}
                >
                  Ver
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListaProductos;
