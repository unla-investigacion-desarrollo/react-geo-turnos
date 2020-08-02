import React, { useState } from "react";

const FormProducto = () => {
  const [state, setState] = useState({
    nombre: { value: "", error: "" },
    descripcion: { value: "", error: "" },
  });

  const handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    const updatedValue = { [name]: { value: value } };
    setState((state) => {
      return { ...state, ...updatedValue };
    });
    console.log(state.descripcion.value + state.nombre.value);
  };

  const handleSubmit = (event) => {
    validate();
  };

  const validate = () => {
    const errVacio = "Dato Requerido!";
    let updatedValue = {};
    if (state.nombre.value === "") {
      updatedValue = { nombre: { error: errVacio } };
    }
    if (state.descripcion.value === "") {
      updatedValue = { descripcion: { error: errVacio } };
    }
    setState((state) => {
      return { ...state, ...updatedValue };
    });
  };

  return (
    <div>
      <label htmlFor="nombre">Nombre</label>
      <input
        onChange={handleInputChange}
        id="nombre"
        name="nombre"
        type="text"
        value={state.nombre.value}
      />
      {state.nombre.error !== "" ? <label>todo mal</label> : ""}
      <label htmlFor="descripcion">Descripcion</label>
      <input
        onChange={handleInputChange}
        id="descripcion"
        name="descripcion"
        type="text"
        value={state.descripcion.value}
      />
      <button onClick={handleSubmit}>Crear</button>
    </div>
  );
};

export default FormProducto;
