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
import { Link, useParams } from "react-router-dom";
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

const enviar = (values, { setSubmitting }) => {
  const dataRubro = { idRubro: values.idRubro, nombre: values.rubro };
  apiCalls.putRubro(dataRubro).then((response) => console.log(response.data));
};

const validar = (values) => {
  const errors = {};
  if (!values.rubro) {
    errors.rubro = "Requirido";
  }
  return errors;
};

const Rubro = (props) => {
  const formik = useFormik({
    initialValues: { rubro: "" },
    onSubmit: enviar,
    validate: validar,
    initialErrors: { rubro: "error" },
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
    titulo = "Modificar Rubro:";
    claseBotonCrear = classes.botonOculto;
    claseBotonModificar = classes.botonForm;
  } else {
    titulo = "Nuevo Rubro:";
    claseBotonCrear = classes.botonForm;
    claseBotonModificar = classes.botonOculto;
  }

  const [stateOpenDialogCrear, setStateOpenDialogCrear] = useState(false);
  const [stateOpenDialogMod, setStateOpenDialogMod] = useState(false);

  const openDialogCrear = () => {
    setStateOpenDialogCrear(true);
  };

  const closeDialogCrear = () => {
    setStateOpenDialogCrear(false);
  };

  useEffect(() => {
    console.log("useeffect");
    if (props.variante === "modificar") {
      apiCalls.getRubroId(id).then((reponse) => {
        const dataRubro = reponse.data;
        console.log(dataRubro);
        setValues({ idRubro: dataRubro.idRubro, rubro: dataRubro.nombre });
      });
    }
  }, []);

  return (
    <div>
      <Typography variant="h4" color="initial">
        {titulo}
      </Typography>

      <form onSubmit={handleSubmit} className={classes.root}>
        <div>
          <TextField
            error={errors.rubro && touched.rubro ? true : false}
            id="rubro"
            label="Rubro"
            name="rubro"
            onBlur={handleBlur}
            value={values.rubro}
            onChange={handleChange}
            helperText={errors.rubro && touched.rubro && errors.rubro}
          />
        </div>

        <div>
          <Button
            className={classes.botonForm}
            variant="contained"
            color="primary"
            component={Link}
            to="/rubros"
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
              {"Estas seguro de agregar el nuevo rubro?"}
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
              {"Estas seguro de modificar el rubro?"}
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

export default Rubro;
