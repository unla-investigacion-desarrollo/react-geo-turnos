import React from "react";
import { Formik } from "formik";
import { useState } from "react";
import { selectMenuSetDeDatos } from "./menuSlice";
import { useSelector } from "react-redux";

const FormProductoModificar = () => {
  const prod = useSelector(selectMenuSetDeDatos);
  const [state, setState] = useState({
    categorias: [
      { id: 1, nombre: "comida" },
      { id: 2, nombre: "bebida" },
      { id: 3, nombre: "postre" },
    ],
    marcas: [
      { id: 1, nombre: "arcor" },
      { id: 2, nombre: "molto" },
      { id: 3, nombre: "laserenisiima" },
    ],
    unidadesMedida: [
      { id: 1, nombre: "kilos" },
      { id: 2, nombre: "gramos" },
      { id: 3, nombre: "tonelada" },
    ],
  });

  const validar = (values) => {
    const errors = {};
    if (!values.nombre) {
      errors.nombre = "Required";
    }
    if (!values.descripcion) {
      errors.descripcion = "Requerido";
    }
    if (!values.codBarra) {
      errors.codBarra = "Requerido";
    }
    if (!values.precioReferencia) {
      errors.precioReferencia = "Requerido";
    }
    if (!values.peso) {
      errors.peso = "Requerido";
    }
    if (!values.categoria) {
      errors.categoria = "Requerido";
    }
    if (!values.marca) {
      errors.marca = "Requerido";
    }
    if (!values.unidadMedida) {
      errors.unidadMedida = "Requerido";
    }
    return errors;
  };

  const enviar = (values, { setSubmitting }) => {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
    }, 400);
  };

  let valoresIniciales = {
    nombre: prod.nombre,
    descripcion: "",
    codBarra: prod.codigo,
    precioReferencia: prod.precio,
    peso: "",
    categoria: "",
    marca: "",
    unidadMedida: "",
  };

  return (
    <div>
      <h1>Modificar Producto</h1>
      <Formik
        initialValues={valoresIniciales}
        validate={validar}
        onSubmit={enviar}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="nombre">Nombre:</label>
              <input
                id="nombre"
                className={
                  "form-control " +
                  (errors.nombre && touched.nombre ? "is-invalid" : "")
                }
                type="text"
                name="nombre"
                placeholder="Ingrese nombre"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.nombre}
              />
              <div className="invalid-feedback">
                {errors.nombre && touched.nombre && errors.nombre}
              </div>
            </div>
            <div>
              <label htmlFor="descripcion">Descripcion:</label>
              <input
                id="descripcion"
                className={
                  "form-control " +
                  (errors.descripcion && touched.descripcion
                    ? "is-invalid"
                    : "")
                }
                type="text"
                name="descripcion"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.descripcion}
              />
              <div className="invalid-feedback">
                {errors.descripcion &&
                  touched.descripcion &&
                  errors.descripcion}
              </div>
            </div>
            <div>
              <label htmlFor="codBarra">Código de barra:</label>
              <input
                id="codBarra"
                className={
                  "form-control " +
                  (errors.codBarra && touched.codBarra ? "is-invalid" : "")
                }
                type="number"
                name="codBarra"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.codBarra}
              />
              <div className="invalid-feedback">
                {errors.codBarra && touched.codBarra && errors.codBarra}
              </div>
            </div>
            <div>
              <label htmlFor="precioReferencia">Precio de referencia:</label>
              <input
                id="precioReferencia"
                className={
                  "form-control " +
                  (errors.precioReferencia && touched.precioReferencia
                    ? "is-invalid"
                    : "")
                }
                type="number"
                name="precioReferencia"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.precioReferencia}
              />
              <div className="invalid-feedback">
                {errors.precioReferencia &&
                  touched.precioReferencia &&
                  errors.precioReferencia}
              </div>
            </div>
            <div>
              <label htmlFor="peso">Peso:</label>
              <input
                id="peso"
                className={
                  "form-control " +
                  (errors.peso && touched.peso ? "is-invalid" : "")
                }
                type="text"
                name="peso"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.peso}
              />
              <div className="invalid-feedback">
                {errors.peso && touched.peso && errors.peso}
              </div>
            </div>

            <div>
              <label htmlFor="categoria">Categoria:</label>
              <select
                className={
                  "form-control " +
                  (errors.categoria && touched.categoria ? "is-invalid" : "")
                }
                id="categoria"
                name="categoria"
                value={values.categoria}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <option value="" defaultValue disabled>
                  Elija una categoria
                </option>
                {state.categorias.map((categoria) => {
                  return (
                    <option value={categoria.id} key={categoria.id}>
                      {categoria.nombre}
                    </option>
                  );
                })}
              </select>
              <div className="invalid-feedback">
                {errors.categoria && touched.categoria && errors.categoria}
              </div>
            </div>
            <div>
              <label htmlFor="marca">Marca:</label>
              <select
                className={
                  "form-control " +
                  (errors.marca && touched.marca ? "is-invalid" : "")
                }
                id="marca"
                name="marca"
                value={values.marca}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                {state.marcas.map((marca) => {
                  return (
                    <option value={marca.id} key={marca.id}>
                      {marca.nombre}
                    </option>
                  );
                })}
              </select>
              <div className="invalid-feedback">
                {errors.marca && touched.marca && errors.marca}
              </div>
            </div>
            <div>
              <label htmlFor="unidadMedida">Unidad de Medida:</label>
              <select
                className={
                  "form-control " +
                  (errors.unidadMedida && touched.unidadMedida
                    ? "is-invalid"
                    : "")
                }
                id="unidadMedida"
                name="unidadMedida"
                value={values.unidadMedida}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                {state.unidadesMedida.map((unidadMedida) => {
                  return (
                    <option value={unidadMedida.id} key={unidadMedida.id}>
                      {unidadMedida.nombre}
                    </option>
                  );
                })}
              </select>
              <div className="invalid-feedback">
                {errors.unidadMedida &&
                  touched.unidadMedida &&
                  errors.unidadMedida}
              </div>
            </div>
            <div>
              <button
                className="btn btn-primary m-2"
                type="submit"
                disabled={isSubmitting}
              >
                Submit
              </button>
            </div>
            {JSON.stringify(values)}
          </form>
        )}
      </Formik>
    </div>
  );
};

export default FormProductoModificar;
