import React, { Component } from "react";
import { Formik } from "formik";

const Categoria = () => {
  const validar = (values) => {
    const errors = {};
    if (!values.categoria) {
      errors.categoria = "Requirido";
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
      <h1>Categoria</h1>
      <Formik
        initialValues={{
          categoria: "",
        }}
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
              <label htmlFor="categoria">Ingrese nueva categoria:</label>
              <input
                id="categoria"
                className={
                  "form-control " +
                  (errors.categoria && touched.categoria ? "is-invalid" : "")
                }
                type="text"
                name="categoria"
                placeholder="Ingrese categoria"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.categoria}
              />
              <div className="invalid-feedback">
                {errors.categoria && touched.categoria && errors.categoria}
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

export default Categoria;
