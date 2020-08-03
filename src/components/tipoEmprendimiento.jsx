import React, { Component } from "react";
import { Formik } from "formik";

const TipoEmprendimiento = () => {
  const validar = (values) => {
    const errors = {};
    if (!values.tipoEmprendimiento) {
      errors.tipoEmprendimiento = "Requirido";
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
      <h1>Tipo de emprendimiento</h1>
      <Formik
        initialValues={{
          tipoEmprendimiento: "",
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
              <label htmlFor="tipoEmprendimiento">
                Ingrese nuevo tipo de Emprendimiento:
              </label>
              <input
                id="tipoEmprendimiento"
                className={
                  "form-control " +
                  (errors.tipoEmprendimiento && touched.tipoEmprendimiento
                    ? "is-invalid"
                    : "")
                }
                type="text"
                name="tipoEmprendimiento"
                placeholder="tipo de Emprendimiento"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.tipoEmprendimiento}
              />
              <div className="invalid-feedback">
                {errors.tipoEmprendimiento &&
                  touched.tipoEmprendimiento &&
                  errors.tipoEmprendimiento}
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

export default TipoEmprendimiento;
