import React, { Component } from "react";
import { Formik } from "formik";

const Marca = () => {
  const validar = (values) => {
    const errors = {};
    if (!values.marca) {
      errors.marca = "Requirido";
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
      <h1>Marca</h1>
      <Formik
        initialValues={{
          marca: "",
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
              <label htmlFor="marca">Ingrese nueva marca:</label>
              <input
                id="marca"
                className={
                  "form-control " +
                  (errors.marca && touched.marca ? "is-invalid" : "")
                }
                type="text"
                name="marca"
                placeholder="Ingrese marca"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.marca}
              />
              <div className="invalid-feedback">
                {errors.marca && touched.marca && errors.marca}
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

export default Marca;
