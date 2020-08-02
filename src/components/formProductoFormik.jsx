import React from "react";
import { Formik } from "formik";

const formProducto = () => {
  const validar = (values) => {
    const errors = {};
    if (!values.nombre) {
      errors.nombre = "Required";
    }
    if (!values.descripcion) {
      errors.descripcion = "Requerido";
    }
    return errors;
  };

  const enviar = (values, { setSubmitting }) => {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
    }, 400);
  };

  return (
    <div>
      <h1>Productos</h1>
      <Formik
        initialValues={{ nombre: "", descripcion: "" }}
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
            <label htmlFor="nombre">Nombre:</label>
            <input
              id="nombre"
              className="form-control"
              type="text"
              name="nombre"
              placeholder="Ingrese nombre"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.nombre}
            />
            {errors.nombre && touched.nombre && errors.nombre}
            <label htmlFor="descripcion">Descripcion:</label>
            <input
              id="descripcion"
              className="form-control"
              type="text"
              name="descripcion"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.descripcion}
            />
            {errors.descripcion && touched.descripcion && errors.descripcion}
            <button
              className="btn btn-primary m-2"
              type="submit"
              disabled={isSubmitting}
            >
              Submit
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default formProducto;
