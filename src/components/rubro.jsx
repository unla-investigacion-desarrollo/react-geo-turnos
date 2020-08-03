import React, { Component } from "react";
import { Formik } from "formik";

const Rubro = () => {
  const validar = (values) => {
    const errors = {};
    if (!values.rubro) {
      errors.rubro = "Requirido";
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
      <h1>Rubro</h1>
      <Formik
        initialValues={{
          rubro: "",
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
              <label htmlFor="rubro">Ingrese nueva rubro:</label>
              <input
                id="rubro"
                className={
                  "form-control " +
                  (errors.rubro && touched.rubro ? "is-invalid" : "")
                }
                type="text"
                name="rubro"
                placeholder="Ingrese rubro"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.rubro}
              />
              <div className="invalid-feedback">
                {errors.rubro && touched.rubro && errors.rubro}
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

export default Rubro;
