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
import VistaFunciones from "./vistaFunciones";
import { useSelector } from "react-redux";
import { selectFuncionOtorgados } from "./funcionSlice";

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
  funciones: {
    marginBottom: theme.spacing(2),
  },
}));

const validar = (values) => {
  const errors = {};
  if (!values.perfil) {
    errors.perfil = "Requirido";
  }
  return errors;
};

const Perfil = (props) => {
  const [stateOpenDialogCrear, setStateOpenDialogCrear] = useState(false);
  const [stateOpenDialogMod, setStateOpenDialogMod] = useState(false);
  const [stateFormExito, setStateFormExito] = useState(false);
  const funcionesOtorgadas = useSelector(selectFuncionOtorgados);
  const [stateIdPerfil, setStateIdPerfil] = useState(null);

  const enviar = (values, { setSubmitting }) => {
    const dataPerfil = { idPerfil: values.idPerfil, nombre: values.perfil };

    if (props.variante === "modificar") {
      apiCalls.putPerfil(dataPerfil).then((datos) => {
        setSubmitting(false);
        setStateOpenDialogMod(false);
      });
    } else {
      apiCalls.postPerfil(dataPerfil).then((datos) => {
        funcionesOtorgadas.map((funcion) => {
          apiCalls.postFuncionPerfil({
            edicion: true,
            idFuncion: funcion.idFuncion,
            idPerfil: datos.data.idPerfil,
          });
          return null;
        });
        setStateFormExito(true);
        setSubmitting(false);
        setStateOpenDialogCrear(false);
      });
    }
  };

  const formik = useFormik({
    initialValues: {idPerfil: null, perfil: "" },
    onSubmit: enviar,
    validate: validar,
    initialErrors: { perfil: "error" },
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
    titulo = "Modificar Perfil:";
    claseBotonCrear = classes.botonOculto;
    claseBotonModificar = classes.botonForm;
  } else {
    titulo = "Nuevo Perfil:";
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
      apiCalls.getPerfilId(id).then((reponse) => {
        const dataPerfil = reponse.data;
        setValues({ idPerfil: dataPerfil.idPerfil, perfil: dataPerfil.nombre });
        setStateIdPerfil(dataPerfil.idPerfil);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {
        stateFormExito ? (
          <Redirect to="/perfiles" />
        ) : null /* Redireccionar si se agrega con exito */
      }
      <Typography variant="h4" color="initial">
        {titulo}
      </Typography>

      <form onSubmit={handleSubmit} className={classes.root}>
        <div>
          <TextField
            error={errors.perfil && touched.perfil ? true : false}
            id="perfil"
            label="Nombre Perfil"
            name="perfil"
            onBlur={handleBlur}
            value={values.perfil}
            onChange={handleChange}
            helperText={errors.perfil && touched.perfil && errors.perfil}
          />
        </div>
        <div className={classes.funciones}>
          <VistaFunciones idPerfil={stateIdPerfil}/>
        </div>
        <div>
          <Button
            className={classes.botonForm}
            variant="contained"
            color="primary"
            component={Link}
            to="/perfiles"
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
              {"Estas seguro de agregar el nuevo perfil?"}
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
              {"Estas seguro de modificar el perfil?"}
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
    </div>
  );
};

export default Perfil;
