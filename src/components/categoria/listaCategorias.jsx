import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux"; //metodo que sirva para usar los reducers
import { cambiarVistaConDatos } from "../navbar/menuSlice"; //reducer para cambiar el estado

const ListaCategorias = () => {
  const dispatch = useDispatch();
  const [state, setState] = useState({
    categorias: [
      {
        id: "1",
        categoria: "producto alimenticio",
      },
      {
        id: "2",
        categoria: "producto de higiene personal",
      },
      {
        id: "3",
        categoria: "producto de limpieza",
      },
    ],
  });

  const buscarCategoria = (nombreCategoria) => {
    let categoriaProd = {
      id: "1",
      categoria: "producto alimenticio",
    };
    dispatch(cambiarVistaConDatos(9, categoriaProd));
  };

  return (
    <div>
      <table className="table table-hover">
        <thead className="thead-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nombre categoria</th>
            <th scope="col">Accion</th>
          </tr>
        </thead>
        <tbody>
          {state.categorias.map((categ) => (
            <tr key={categ.id}>
              <th>{categ.id}</th>
              <td>{categ.categoria}</td>
              <td>
                <button
                  className="btn btn-success"
                  onClick={() => buscarCategoria(categ.categoria)}
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

export default ListaCategorias;
