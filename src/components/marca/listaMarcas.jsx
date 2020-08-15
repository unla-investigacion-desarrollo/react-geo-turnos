import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux"; //metodo que sirva para usar los reducers
import { cambiarVistaConDatos } from "./menuSlice"; //reducer para cambiar el estado

const ListaMarcas = () => {
  const dispatch = useDispatch();
  const [state, setState] = useState({
    marcas: [
      {
        id: "1",
        marca: "johnson & johnson",
      },
      {
        id: "2",
        marca: "higeniol",
      },
      {
        id: "3",
        marca: "ayudin",
      },
    ],
  });

  const buscarMarca = (nombreMarca) => {
    let categoriaMarca = {
      id: "1",
      marca: "johnson & johnson",
    };
    dispatch(cambiarVistaConDatos(11, categoriaMarca));
  };

  return (
    <div>
      <table className="table table-hover">
        <thead className="thead-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nombre Marca</th>
            <th scope="col">Accion</th>
          </tr>
        </thead>
        <tbody>
          {state.marcas.map((mar) => (
            <tr key={mar.id}>
              <th>{mar.id}</th>
              <td>{mar.marca}</td>
              <td>
                <button
                  className="btn btn-success"
                  onClick={() => buscarMarca(mar.marca)}
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

export default ListaMarcas;
