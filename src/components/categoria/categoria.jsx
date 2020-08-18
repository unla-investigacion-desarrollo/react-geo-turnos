import React from "react";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import { Formik, Field } from "formik";
import { useState } from "react";
import {
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

const traerCategoria = (id) => {
  //traer de la base de datos los datos
  return {
    idCategoria: id,
    categoria: "",
  };
};

const Categoria = (props) => {
  const classes = useStyles();
  const { id } = useParams();

  let titulo = "";
  let valoresIniciales = {};
  let claseBotonCrear;
  let claseBotonModificar;

  if (props.variante === "modificar") {
    titulo = "Modificar Categoria:";
    valoresIniciales = traerCategoria(id);
    claseBotonCrear = classes.botonOculto;
    claseBotonModificar = classes.botonForm;
  } else {
    titulo = "Nueva Categoria:";
    claseBotonCrear = classes.botonForm;
    claseBotonModificar = classes.botonOculto;
    valoresIniciales = {
      categoria: "",
    };
  }

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
      <Typography variant="h4" color="initial">
        {titulo}
      </Typography>
      <Formik
        initialValues={valoresIniciales}
        validate={validar}
        onSubmit={enviar}
        initialErrors={{ categoria: "error" }}
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
          <form onSubmit={handleSubmit} className={classes.root}>
            <div>
              <TextField
                error={errors.categoria && touched.categoria ? true : false}
                id="categoria"
                label="Categoria"
                name="categoria"
                onBlur={handleBlur}
                value={values.categoria}
                onChange={handleChange}
                helperText={
                  errors.categoria && touched.categoria && errors.categoria
                }
              />
            </div>

            <div>
              <Button
                className={classes.botonForm}
                variant="contained"
                color="primary"
                component={Link}
                to="/categorias"
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
                  {"Estas seguro de agregar la nueva categoria?"}
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
                  {"Estas seguro de modificar la categoria?"}
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

export default Categoria;
