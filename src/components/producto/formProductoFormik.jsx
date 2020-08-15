import React from "react";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import { Formik } from "formik";
import { useState } from "react";
import {
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Button,
} from "@material-ui/core";

const FormProducto = () => {
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
    if (values.categoria === "-1") {
      errors.categoria = "Requerido";
    }
    if (values.marca === "-1") {
      errors.marca = "Requerido";
    }
    if (values.unidadMedida === "-1") {
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

  return (
    <div>
      <h1>Productos</h1>
      <Formik
        initialValues={{
          nombre: "",
          descripcion: "",
          codBarra: "",
          precioReferencia: "",
          peso: "",
          categoria: "-1",
          marca: "-1",
          unidadMedida: "-1",
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
              <TextField
                error={errors.nombre && touched.nombre ? true : false}
                id="nombre"
                label="Nombre"
                name="nombre"
                onBlur={handleBlur}
                value={values.nombre}
                onChange={handleChange}
                helperText={errors.nombre && touched.nombre && errors.nombre}
              />
            </div>
            <div>
              <TextField
                error={errors.descripcion && touched.descripcion ? true : false}
                id="descripcion"
                label="Descripcion"
                name="descripcion"
                onBlur={handleBlur}
                value={values.descripcion}
                onChange={handleChange}
                helperText={
                  errors.descripcion &&
                  touched.descripcion &&
                  errors.descripcion
                }
              />
            </div>
            <div>
              <TextField
                error={errors.codBarra && touched.codBarra ? true : false}
                id="codBarra"
                label="Codigo de Barra"
                name="codBarra"
                onBlur={handleBlur}
                value={values.codBarra}
                onChange={handleChange}
                helperText={
                  errors.codBarra && touched.codBarra && errors.codBarra
                }
              />
            </div>
            <div>
              <TextField
                error={
                  errors.precioReferencia && touched.precioReferencia
                    ? true
                    : false
                }
                id="precioReferencia"
                label="Precio de Referencia"
                type="number"
                name="precioReferencia"
                onBlur={handleBlur}
                value={values.precioReferencia}
                onChange={handleChange}
                helperText={
                  errors.precioReferencia &&
                  touched.precioReferencia &&
                  errors.precioReferencia
                }
              />
            </div>
            <div>
              <TextField
                error={errors.peso && touched.peso ? true : false}
                id="peso"
                label="Peso"
                name="peso"
                type="number"
                onBlur={handleBlur}
                value={values.peso}
                onChange={handleChange}
                helperText={errors.peso && touched.peso && errors.peso}
              />
            </div>
            <div>
              <FormControl
                error={errors.categoria && touched.categoria ? true : false}
              >
                <InputLabel id="labelCategoria">Categoria:</InputLabel>
                <Select
                  id="categoria"
                  name="categoria"
                  labelId="labelCategoria"
                  value={values.categoria}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  <MenuItem value="-1" disabled>
                    <em>Elija una categoria</em>
                  </MenuItem>
                  {state.categorias.map((categoria) => {
                    return (
                      <MenuItem value={categoria.id} key={categoria.id}>
                        {categoria.nombre}
                      </MenuItem>
                    );
                  })}
                </Select>
                <FormHelperText>
                  {errors.categoria && touched.categoria && errors.categoria}
                </FormHelperText>
              </FormControl>
            </div>
            <div>
              <FormControl error={errors.marca && touched.marca ? true : false}>
                <InputLabel id="labelMarca">Marca:</InputLabel>
                <Select
                  id="marca"
                  name="marca"
                  labelId="labelMarca"
                  value={values.marca}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  <MenuItem value="-1" disabled>
                    <em>Elija una marca</em>
                  </MenuItem>
                  {state.marcas.map((marca) => {
                    return (
                      <MenuItem value={marca.id} key={marca.id}>
                        {marca.nombre}
                      </MenuItem>
                    );
                  })}
                </Select>
                <FormHelperText>
                  {errors.marca && touched.marca && errors.marca}
                </FormHelperText>
              </FormControl>
            </div>
            <div>
              <FormControl
                error={
                  errors.unidadMedida && touched.unidadMedida ? true : false
                }
              >
                <InputLabel id="labelUnidadMedida">
                  Unidad de Medida:
                </InputLabel>
                <Select
                  id="unidadMedida"
                  name="unidadMedida"
                  labelId="labelUnidadMedida"
                  value={values.unidadMedida}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  <MenuItem value="-1" disabled>
                    <em>Elija una unidad de medida</em>
                  </MenuItem>
                  {state.unidadesMedida.map((unidadMedida) => {
                    return (
                      <MenuItem value={unidadMedida.id} key={unidadMedida.id}>
                        {unidadMedida.nombre}
                      </MenuItem>
                    );
                  })}
                </Select>
                <FormHelperText>
                  {errors.unidadMedida &&
                    touched.unidadMedida &&
                    errors.unidadMedida}
                </FormHelperText>
              </FormControl>
            </div>
            <div>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={isSubmitting}
              >
                Submit
              </Button>
            </div>
            {JSON.stringify(values)}
          </form>
        )}
      </Formik>
    </div>
  );
};

export default FormProducto;
