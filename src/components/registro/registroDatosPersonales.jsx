import React from "react";
import { Formik } from "formik";
import TextField from "@material-ui/core/TextField";
import { Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import {
  cargarSetDeDatosPersonales,
  selectDatosPersonales,
} from "./registroSlice";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";

const useStyles = makeStyles((theme) => ({
  botonEspacio: {
    margin: theme.spacing(1),
  },
  espacios: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      minWidth: 300,
    },
  },
  root: {
    display: "flex",
    height: "100vh",
    backgroundColor: "teal",
  },
  card: {
    width: 700,
  },
  media: {
    height: 140,
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

const validar = (values) => {
  const errors = {};
  if (!values.nombre) {
    errors.nombre = "Requirido";
  }
  if (!values.apellido) {
    errors.apellido = "Requirido";
  }
  if (!values.cuil) {
    errors.cuil = "Requirido";
  }
  if (!values.celular) {
    errors.celular = "Requirido";
  }
  if (!values.email) {
    errors.email = "Requirido";
  }
  if (!values.direccion) {
    errors.direccion = "Requerido";
  }
  if (!values.password) {
    errors.password = "Requirido";
  }
  if (!values.repetirPassword) {
    errors.repetirPassword = "Requirido";
  }
  if (values.password !== values.repetirPassword) {
    errors.repetirPassword = "Contraseña no coincide";
  }
  return errors;
};

const RegistroDatosPersonales = (props) => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const datosPersonales = useSelector(selectDatosPersonales);

  const valoresIniciales = () => {
    console.log(datosPersonales);
    if (Object.keys(datosPersonales).length === 0) {
      //me fijo la cant de campos
      return {
        nombre: "",
        apellido: "",
        cuil: "",
        celular: "",
        email: "",
        direccion: "",
        password: "",
        repetirPassword: "",
      };
    } else {
      // si esta lleno retorno el set de datos
      return datosPersonales;
    }
  };

  const enviar = (values, { setSubmitting }) => {
    dispatch(cargarSetDeDatosPersonales(values));
    props.propClickSiguiente();
  };

  return (
    <Formik
      initialValues={valoresIniciales()}
      validate={validar}
      onSubmit={enviar}
      initialErrors={{ usuario: "error" }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        validateForm,
        isValidating,
        setTouched,
        isValid,
      }) => (
        <>
          <Typography variant="h5" color="initial">
            Registro - Datos Personales
          </Typography>
          <form onSubmit={handleSubmit} className={classes.espacios}>
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

              <TextField
                error={errors.apellido && touched.apellido ? true : false}
                id="apellido"
                label="Apellido"
                name="apellido"
                onBlur={handleBlur}
                value={values.apellido}
                onChange={handleChange}
                helperText={
                  errors.apellido && touched.apellido && errors.apellido
                }
              />
            </div>

            <div>
              <TextField
                error={errors.cuil && touched.cuil ? true : false}
                id="cuil"
                label="Cuil"
                name="cuil"
                onBlur={handleBlur}
                value={values.cuil}
                onChange={handleChange}
                helperText={errors.cuil && touched.cuil && errors.cuil}
              />

              <TextField
                error={errors.celular && touched.celular ? true : false}
                id="celular"
                label="Celular"
                name="celular"
                onBlur={handleBlur}
                value={values.celular}
                onChange={handleChange}
                helperText={errors.celular && touched.celular && errors.celular}
              />
            </div>

            <div>
              <TextField
                error={errors.email && touched.email ? true : false}
                id="email"
                label="Email"
                name="email"
                type="email"
                onBlur={handleBlur}
                value={values.email}
                onChange={handleChange}
                helperText={errors.email && touched.email && errors.email}
              />

              <TextField
                error={errors.direccion && touched.direccion ? true : false}
                id="direccion"
                label="Direccion"
                name="direccion"
                onBlur={handleBlur}
                value={values.direccion}
                onChange={handleChange}
                helperText={
                  errors.direccion && touched.direccion && errors.direccion
                }
              />
            </div>

            <div>
              <TextField
                error={errors.password && touched.password ? true : false}
                id="password"
                label="Contraseña"
                name="password"
                type="password"
                onBlur={handleBlur}
                value={values.password}
                onChange={handleChange}
                helperText={
                  errors.password && touched.password && errors.password
                }
              />

              <TextField
                error={
                  errors.repetirPassword && touched.repetirPassword
                    ? true
                    : false
                }
                id="repetirPassword"
                label="Repetir Constraseña"
                name="repetirPassword"
                type="password"
                onBlur={handleBlur}
                value={values.repetirPassword}
                onChange={handleChange}
                helperText={
                  errors.repetirPassword &&
                  touched.repetirPassword &&
                  errors.repetirPassword
                }
              />
            </div>

            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
              className={classes.botonEspacio}
            >
              <Button variant="contained" color="primary" type="submit">
                Siguiente
              </Button>
            </Grid>
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
              className={classes.botonEspacio}
            >
              <Link href="/login">Cancelar</Link>
            </Grid>
            {JSON.stringify(values)}
            <br></br>
            {JSON.stringify(errors)}
          </form>
        </>
      )}
    </Formik>
  );
};

export default RegistroDatosPersonales;
