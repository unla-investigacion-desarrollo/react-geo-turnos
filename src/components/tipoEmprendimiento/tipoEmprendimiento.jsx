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
  if (!values.tipoEmprendimiento) {
    errors.tipoEmprendimiento = "Requirido";
  }
  return errors;
};

const TipoEmprendimiento = (props) => {
  const [stateOpenDialogCrear, setStateOpenDialogCrear] = useState(false);
  const [stateOpenDialogMod, setStateOpenDialogMod] = useState(false);
  const [stateFormExito, setStateFormExito] = useState(false);
  const [stateOpenDialogBorrar, setStateOpenDialogBorrar] = useState(false);

  const enviar = (values, { setSubmitting, setFieldError }) => {
    const datosTipoEmp = {
      idTipoEmprendimiento: values.idTipoEmprendimiento,
      tipoEmprendimiento: values.tipoEmprendimiento,
    };

    if (props.variante === "modificar") {
      apiCalls.putTipoEmprendimiento(datosTipoEmp).then((response) => {
        setSubmitting(false);
        setStateOpenDialogMod(false);
      });
    } else {
      apiCalls
        .postTipoEmprendimiento(datosTipoEmp)
        .then((response) => {
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
            setFieldError(
              "tipoEmprendimiento",
              "El tipo de emprendimiento ya existe"
            );
        });
    }
  };

  const eliminar = (values) => {
    apiCalls
      .deleteTipoEmprendimiento(values.idTipoEmprendimiento)
      .then((datos) => {
        setStateOpenDialogBorrar(false);
        setStateFormExito(true);
      });
  };

  const formik = useFormik({
    initialValues: { tipoEmprendimiento: "" },
    onSubmit: enviar,
    validate: validar,
    initialErrors: { tipoEmprendimiento: "error" },
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
    titulo = "Modificar Tipo de Emprendimiento:";
    claseBotonCrear = classes.botonOculto;
    claseBotonModificar = classes.botonForm;
  } else {
    titulo = "Nuevo Tipo de Emprendimiento:";
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
      apiCalls.getTipoEmprendimientoId(id).then((response) => {
        const datosTipoEmp = response.data;
        setValues({
          idTipoEmprendimiento: datosTipoEmp.idTipoEmprendimiento,
          tipoEmprendimiento: datosTipoEmp.nombre,
        });
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {
        stateFormExito ? (
          <Redirect to="/tipoEmprendimientos" />
        ) : null /* Redireccionar si se agrega con exito */
      }
      <Typography variant="h4" color="initial">
        {titulo}
      </Typography>

      <form onSubmit={handleSubmit} className={classes.root}>
        <div>
          <TextField
            error={
              errors.tipoEmprendimiento && touched.tipoEmprendimiento
                ? true
                : false
            }
            id="tipoEmprendimiento"
            label="Tipo de Emprendimiento"
            name="tipoEmprendimiento"
            onBlur={handleBlur}
            value={values.tipoEmprendimiento}
            onChange={handleChange}
            helperText={
              errors.tipoEmprendimiento &&
              touched.tipoEmprendimiento &&
              errors.tipoEmprendimiento
            }
          />
        </div>

        <div>
          <Button
            className={classes.botonForm}
            variant="contained"
            color="primary"
            component={Link}
            to="/tipoEmprendimientos"
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
              {"Estas seguro de agregar el nuevo tipo de emprendimiento?"}
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
              {"Estas seguro de modificar el tipo de emprendimiento?"}
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
              {"Estas seguro de eliminar el Tipo de Emprendimiento?"}
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
        </div>
      </form>
    </div>
  );
};

export default TipoEmprendimiento;
