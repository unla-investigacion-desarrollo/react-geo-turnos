import React from "react";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import { useFormik } from "formik";
import { useState, useEffect } from "react";
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
  if (values.precioReferencia < 0) {
    errors.precioReferencia = "Error precio referencia invalido";
  }
  if (!values.peso) {
    errors.peso = "Requerido";
  }
  if (values.peso < 0) {
    errors.peso = "Error peso invalido";
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

const FormProducto = (props) => {
  const classes = useStyles();
  const { id } = useParams();

  const enviar = (values, { setSubmitting }) => {
    const articulo = {
      idArticuloReferencia: values.idArticuloReferencia,
      codBarra: values.codBarra,
      descripcion: values.descripcion,
      foto: "foto pendiente",
      idCategoria: values.categoria,
      idMarca: values.marca,
      idUnidadMedida: values.unidadMedida,
      nombre: values.nombre,
      peso: values.peso,
      precioRefencia: values.precioReferencia,
      usuarioModi: "usuario pendiente",
    };
    console.log(articulo.precioRefencia);
    if (props.variante === "modificar") {
      apiCalls.putArticuloReferencia(articulo).then((datos) => {
        setSubmitting(false);
        setStateOpenDialogMod(false);
        setStateFormExito(true);
      });
    } else {
      apiCalls.postArticuloReferencia(articulo).then((datos) => {
        setSubmitting(false);
        setStateOpenDialogCrear(false);
        setStateFormExito(true);
      });
    }
  };

  const formik = useFormik({
    initialValues: {
      idArticuloReferencia: 0,
      nombre: "",
      descripcion: "",
      codBarra: "",
      precioReferencia: "",
      peso: "",
      categoria: "-1",
      marca: "-1",
      unidadMedida: "-1",
    },
    onSubmit: enviar,
    validate: validar,
    initialErrors: { nombre: "error" },
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

  let titulo = "";
  let claseBotonCrear;
  let claseBotonModificar;

  if (props.variante === "modificar") {
    titulo = "Modificar Articulos:";
    claseBotonCrear = classes.botonOculto;
    claseBotonModificar = classes.botonForm;
  } else {
    titulo = "Nuevo Articulo:";
    claseBotonCrear = classes.botonForm;
    claseBotonModificar = classes.botonOculto;
  }

  const [stateCat, setStateCat] = useState([]); //categorias
  const [stateMar, setStateMar] = useState([]); //marcas
  const [stateMed, setStateMed] = useState([]); //medidas
  const [stateFormExito, setStateFormExito] = useState(false);

  const [stateOpenDialogCrear, setStateOpenDialogCrear] = useState(false);
  const [stateOpenDialogMod, setStateOpenDialogMod] = useState(false);

  const openDialogCrear = () => {
    setStateOpenDialogCrear(true);
  };

  const closeDialogCrear = () => {
    setStateOpenDialogCrear(false);
  };

  useEffect(() => {
    apiCalls
      .getUnidadMedida()
      .then((datos) => setStateMed(datos.data))
      .then(apiCalls.getCategoria().then((datos) => setStateCat(datos.data)))
      .then(apiCalls.getMarca().then((datos) => setStateMar(datos.data)))
      .then(() => {
        if (props.variante === "modificar") {
          apiCalls.getArticuloReferenciaId(id).then((reponse) => {
            const art = reponse.data;
            setValues({
              idArticuloReferencia: art.idArticuloReferencia,
              nombre: art.nombre,
              descripcion: art.descripcion,
              codBarra: art.codBarra,
              precioReferencia: art.precioRefencia,
              peso: art.peso,
              categoria: art.categoria.idCategoria,
              marca: art.marca.idMarca,
              unidadMedida: art.unidadMedida.idUnidadMedida,
            });
          });
        }
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      {
        stateFormExito ? (
          <Redirect to="/productos" />
        ) : null /* Redireccionar si se agrega con exito */
      }
      <Typography variant="h4" color="initial">
        {titulo}
      </Typography>

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

          <TextField
            error={errors.descripcion && touched.descripcion ? true : false}
            id="descripcion"
            label="Descripcion"
            name="descripcion"
            onBlur={handleBlur}
            value={values.descripcion}
            onChange={handleChange}
            helperText={
              errors.descripcion && touched.descripcion && errors.descripcion
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
            helperText={errors.codBarra && touched.codBarra && errors.codBarra}
          />

          <TextField
            error={
              errors.precioReferencia && touched.precioReferencia ? true : false
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
              {stateCat.map((categoria) => {
                return (
                  <MenuItem
                    value={categoria.idCategoria}
                    key={categoria.idCategoria}
                  >
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
              {stateMar.map((marca) => {
                return (
                  <MenuItem value={marca.idMarca} key={marca.idMarca}>
                    {marca.nombre}
                  </MenuItem>
                );
              })}
            </Select>
            <FormHelperText>
              {errors.marca && touched.marca && errors.marca}
            </FormHelperText>
          </FormControl>

          <FormControl
            error={errors.unidadMedida && touched.unidadMedida ? true : false}
            className={classes.formControl}
          >
            <InputLabel id="labelUnidadMedida">Unidad de Medida:</InputLabel>
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
              {stateMed.map((unidadMedida) => {
                return (
                  <MenuItem
                    value={unidadMedida.idUnidadMedida}
                    key={unidadMedida.idUnidadMedida}
                  >
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
              {"Estas seguro de agregar el nuevo articulo?"}
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
              {"Estas seguro de modificar el articulo?"}
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

export default FormProducto;
