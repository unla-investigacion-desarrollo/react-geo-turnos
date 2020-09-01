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
  Typography,
  Dialog,
  DialogTitle,
  DialogContentText,
  DialogContent,
  DialogActions,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link, useParams } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      minWidth: 300,
    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 300,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  botonForm: {
    marginRight: theme.spacing(3),
  },
  botonOculto: {
    display: "none",
  },
}));

const traerProducto = (id) => {
  //traer de la base de datos los datos
  return {
    idProducto: id,
    nombre: "",
    descripcion: "",
    codBarra: "",
    precioReferencia: "",
    peso: "",
    categoria: "-1",
    marca: "-1",
    unidadMedida: "-1",
  };
};

const FormProducto = (props) => {
  const classes = useStyles();
  const { id } = useParams();

  let titulo = "";
  let valoresIniciales = {};
  let claseBotonCrear;
  let claseBotonModificar;

  if (props.variante === "modificar") {
    titulo = "Modificar Producto:";
    valoresIniciales = traerProducto(id);
    claseBotonCrear = classes.botonOculto;
    claseBotonModificar = classes.botonForm;
  } else {
    titulo = "Nuevo Producto:";
    claseBotonCrear = classes.botonForm;
    claseBotonModificar = classes.botonOculto;
    valoresIniciales = {
      nombre: "",
      descripcion: "",
      codBarra: "",
      precioReferencia: "",
      peso: "",
      categoria: "-1",
      marca: "-1",
      unidadMedida: "-1",
    };
  }

  const [state] = useState({
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
  const [stateOpenDialogCrear, setStateOpenDialogCrear] = useState(false);
  const [stateOpenDialogMod, setStateOpenDialogMod] = useState(false);

  const openDialogCrear = () => {
    setStateOpenDialogCrear(true);
  };

  const closeDialogCrear = () => {
    setStateOpenDialogCrear(false);
  };

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
      <Typography variant="h4" color="initial">
        {titulo}
      </Typography>
      <Formik
        initialValues={valoresIniciales}
        validate={validar}
        onSubmit={enviar}
        initialErrors={{ nombre: "error" }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          setErrors,
          isSubmitting,
          validateForm,
          isValidating,
          setTouched,
          isValid,
        }) => (
          <form onSubmit={handleSubmit} className={classes.root}>
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
                className={classes.formControl}
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
              <FormControl
                error={errors.marca && touched.marca ? true : false}
                className={classes.formControl}
              >
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
                className={classes.formControl}
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
                className={classes.botonForm}
                variant="contained"
                color="primary"
                component={Link}
                to="/productos"
              >
                Atras
              </Button>
              <Button
                variant="contained"
                color="primary"
                className={claseBotonCrear}
                onClick={() => {
                  validateForm();
                  let nuevoTouched = {};
                  Object.entries(values).map((value) => {
                    nuevoTouched[value[0]] = true;
                    return null;
                  });
                  setTouched(nuevoTouched, false);
                  if (isValid) openDialogCrear();
                }}
              >
                Crear
              </Button>
              <Button
                variant="contained"
                color="primary"
                className={claseBotonModificar}
                onClick={() => {
                  validateForm();
                  let nuevoTouched = {};
                  Object.entries(values).map((value) => {
                    nuevoTouched[value[0]] = true;
                    return null;
                  });
                  setTouched(nuevoTouched, false);
                  if (isValid) setStateOpenDialogMod(true);
                }}
              >
                Modificar
              </Button>

              <Dialog
                open={stateOpenDialogCrear}
                onClose={closeDialogCrear}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">
                  {"Estas seguro de agregar el nuevo producto?"}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    texto de ayuda
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={closeDialogCrear} color="primary">
                    Cancelar
                  </Button>
                  <Button
                    color="primary"
                    autoFocus
                    variant="contained"
                    disabled={isSubmitting}
                    onClick={handleSubmit}
                  >
                    Aceptar
                  </Button>
                </DialogActions>
              </Dialog>
              <Dialog
                open={stateOpenDialogMod}
                onClose={() => setStateOpenDialogMod(false)}
                aria-labelledby="alert-dialog-title-mod"
                aria-describedby="alert-dialog-description-mod"
              >
                <DialogTitle id="alert-dialog-title-mod">
                  {"Estas seguro de modificar el producto?"}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description-mod">
                    texto de ayuda al modificar
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button
                    onClick={() => setStateOpenDialogMod(false)}
                    color="primary"
                  >
                    Cancelar
                  </Button>
                  <Button
                    color="primary"
                    autoFocus
                    variant="contained"
                    disabled={isSubmitting}
                    onClick={handleSubmit}
                  >
                    Aceptar
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
            {JSON.stringify(values)}
            <br></br>
            {JSON.stringify(errors)}
          </form>
        )}
      </Formik>
    </div>
  );
};

export default FormProducto;
