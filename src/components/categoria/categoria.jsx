import React from "react";
import TextField from "@material-ui/core/TextField";
import { useFormik } from "formik";
import { useState, useEffect } from "react";
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
import { Link, useParams, Redirect } from "react-router-dom";
import { apiCalls } from "../../api/apiCalls";

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

const validar = (values) => {
  const errors = {};
  if (!values.categoria) {
    errors.categoria = "Requirido";
  }
  return errors;
};

const Categoria = (props) => {
  const [stateOpenDialogCrear, setStateOpenDialogCrear] = useState(false);
  const [stateOpenDialogMod, setStateOpenDialogMod] = useState(false);
  const [stateFormExito, setStateFormExito] = useState(false);
  const [stateOpenDialogBorrar, setStateOpenDialogBorrar] = useState(false);
  const [
    stateOpenDialogErrorNoBorrar,
    setStateOpenDialogErrorNoBorrar,
  ] = useState(false);

  const enviar = (values, { setSubmitting, setFieldError }) => {
    const datosCategoria = {
      idCategoria: values.idCategoria,
      nombre: values.categoria,
    };

    if (props.variante === "modificar") {
      apiCalls.putCategoria(datosCategoria).then((response) => {
        setSubmitting(false);
        setStateOpenDialogMod(false);
      });
    } else {
      apiCalls
        .postCategoria(datosCategoria)
        .then((datos) => {
          setSubmitting(false);
          setStateOpenDialogCrear(false);
          setStateFormExito(true);
        })
        .catch((error) => {
          console.log(error);
          setSubmitting(false);
          setStateOpenDialogCrear(false);
          if (
            error.response.data.code ===
            "error.reactivar.db.registro_ya_existente"
          )
            setFieldError("categoria", "Esa categoria ya existe");
        });
    }
  };

  const eliminar = (values) => {
    apiCalls
      .deleteCategoria(values.idCategoria)
      .then((datos) => {
        setStateOpenDialogBorrar(false);
        setStateFormExito(true);
      })
      .catch((error) => {
        console.log(error);
        console.log(error.response.data);
        if (error.response.data.error === "Internal Server Error") {
          setStateOpenDialogErrorNoBorrar(true);
        }
      });
  };

  const formik = useFormik({
    initialValues: { categoria: "" },
    onSubmit: enviar,
    validate: validar,
    initialErrors: { categoria: "error" },
  });

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
    validateForm,
    setTouched,
    isValid,
    setValues,
  } = formik; //destructurar formik

  const classes = useStyles();
  const { id } = useParams();

  let titulo = "";
  let claseBotonCrear;
  let claseBotonModificar;

  if (props.variante === "modificar") {
    titulo = "Modificar la categoria:";
    claseBotonCrear = classes.botonOculto;
    claseBotonModificar = classes.botonForm;
  } else {
    titulo = "Nueva categoria:";
    claseBotonCrear = classes.botonForm;
    claseBotonModificar = classes.botonOculto;
  }

  const openDialogCrear = () => {
    setStateOpenDialogCrear(true);
  };

  const closeDialogCrear = () => {
    setStateOpenDialogCrear(false);
  };

  useEffect(() => {
    if (props.variante === "modificar") {
      apiCalls.getCategoriaId(id).then((response) => {
        const datosCategoria = response.data;
        setValues({
          idCategoria: datosCategoria.idCategoria,
          categoria: datosCategoria.nombre,
        });
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {
        stateFormExito ? (
          <Redirect to="/categorias" />
        ) : null /* Redireccionar si se agrega con exito */
      }
      <Typography variant="h4" color="initial">
        {titulo}
      </Typography>

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

          <Button
            variant="contained"
            color="secondary"
            className={claseBotonModificar}
            onClick={() => setStateOpenDialogBorrar(true)}
          >
            Eliminar
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
          <Dialog
            open={stateOpenDialogBorrar}
            onClose={() => setStateOpenDialogBorrar(false)}
            aria-labelledby="alert-dialog-title-borrar"
            aria-describedby="alert-dialog-description-borrar"
          >
            <DialogTitle id="alert-dialog-title-borrar">
              {"Estas seguro de eliminar la Categoria?"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description-borrar">
                texto de ayuda al eliminar
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => setStateOpenDialogBorrar(false)}
                color="primary"
              >
                Cancelar
              </Button>
              <Button
                color="secondary"
                autoFocus
                variant="contained"
                disabled={isSubmitting}
                onClick={() => eliminar(values)}
              >
                Eliminar
              </Button>
            </DialogActions>
          </Dialog>

          <Dialog
            open={stateOpenDialogErrorNoBorrar}
            onClose={() => setStateOpenDialogErrorNoBorrar(false)}
            aria-labelledby="alert-dialog-title-error-borrar"
            aria-describedby="alert-dialog-description-error-borrar"
          >
            <DialogTitle id="alert-dialog-title-error-borrar">
              {
                "Error, esa Categoria existe en un Articulo de referencia, borre primero el/los articulos"
              }
            </DialogTitle>
            <DialogActions>
              <Button onClick={() => setStateFormExito(true)} color="primary">
                Aceptar
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </form>
    </div>
  );
};

export default Categoria;
