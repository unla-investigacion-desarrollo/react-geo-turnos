import React, { Component } from "react";
import { Formik } from "formik";
import { useState } from "react";
import { selectMenuSetDeDatos } from "./menuSlice";
import { useSelector } from "react-redux";

const FormCategoriaModificar = () => {
  const categ = useSelector(selectMenuSetDeDatos);
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
      <h1>Modificar categoria</h1>
      <Formik
        initialValues={{
          categoria: categ.categoria,
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

export default FormCategoriaModificar;
