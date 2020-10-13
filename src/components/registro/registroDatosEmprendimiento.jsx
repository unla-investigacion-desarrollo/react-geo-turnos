import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import TextField from "@material-ui/core/TextField";
import {
  Button,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { apiCalls } from "../../api/apiCalls";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import Mapa from "../mapa/mapa";
import {
  cargarSetDeDatosEmprendimiento,
  selectDatosEmprendimiento,
} from "./registroSlice";
import { useDispatch, useSelector } from "react-redux";
import logo from "../../imagenes/logo2.jpeg";
//import Autocomplete from "@material-ui/lab/Autocomplete";

const useStyles = makeStyles((theme) => ({
  botonEspacio: {
    margin: theme.spacing(1),
  },
  espacios: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      minWidth: 300,
    },
    "& .MuiFormControl-root": {
      margin: theme.spacing(1),
      minWidth: 300,
    },
    width: "100%",
  },
  root: {
    flexGrow: 1,
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
  botonEnviar: {
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(2),
  },
  mapa: {
    height: 300,
  },
  logo: {
    position: "relative",
    width: 50,
    top: 10,
    marginRight: theme.spacing(2),
  },
}));

const validar = (values) => {
  const errors = {};
  if (!values.nombre) {
    errors.nombre = "Requirido";
  }
  if (!values.cuit) {
    errors.cuit = "Requirido";
  }
  if (values.rubro === "-1") {
    errors.rubro = "Requirido";
  }
  if (values.tipoEmp === "-1") {
    errors.tipoEmp = "Requirido";
  }
  if (!values.calle) {
    errors.calle = "Requirido";
  }
  if (values.provincia === "-1") {
    errors.provincia = "Requirido";
  }
  if (values.localidad === "-1") {
    errors.localidad = "Requirido";
  }
  if (!values.numero) {
    errors.numero = "Requerido";
  }
  if (!values.lat && !values.lng) {
    errors.mapaUbic = "Ubicacion coordenadas mapa Requerido";
  }
  return errors;
};

const RegistroDatosEmprendimiento = (props) => {
  const classes = useStyles();
  const [stateRubro, setStateRubro] = useState([]); //rubros
  const [stateTipoEmp, setStateTipoEmp] = useState([]); //tipo emprendimientos
  const [stateProv, setStateProv] = useState([]); //provincias
  const [stateLoc, setStateLoc] = useState([]); //localidades
  const [primeraRenderizacion, setStatePrimRen] = useState(true);

  const dispatch = useDispatch();
  const datosEmprendimiento = useSelector(selectDatosEmprendimiento);

  const enviar = (values, { setSubmitting }) => {
    props.propClickSiguiente();
  };

  const valoresIniciales = () => {
    if (Object.keys(datosEmprendimiento).length === 0) {
      return {
        nombre: "",
        cuit: "",
        rubro: "-1",
        tipoEmp: "-1",
        calle: "",
        departamento: "",
        provincia: "-1",
        localidad: "-1",
        numero: "",
        piso: "",
        mapaUbic: "",
        lat: "",
        lng: "",
      };
    } else return datosEmprendimiento;
  };

  const formik = useFormik({
    initialValues: valoresIniciales(),
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
    setFieldValue,
  } = formik; //destructurar formik

  useEffect(() => {
    apiCalls.getRubro().then((datos) => setStateRubro(datos.data));
    apiCalls
      .getTipoEmprendimiento()
      .then((datos) => setStateTipoEmp(datos.data));
    apiCalls.getProvincia().then((datos) => setStateProv(datos.data));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!primeraRenderizacion) {
      values.localidad = "-1";
    }
    if (values.provincia !== "-1") {
      apiCalls
        .getLocalidades(values.provincia)
        .then((datos) => setStateLoc(datos.data));
    }
    setStatePrimRen(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.provincia]); //Ejecutar segun el cambio de provincia

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h5" color="initial">
          <img src={logo} alt="" className={classes.logo} />Registro - Datos Emprendimiento
          </Typography>
        </Grid>
        <form onSubmit={handleSubmit} className={classes.espacios}>
          <Grid container>
            <Grid item xs={6}>
              <div>
                <TextField
                  error={errors.nombre && touched.nombre ? true : false}
                  id="nombre"
                  label="Nombre Emprendimiento"
                  name="nombre"
                  onBlur={handleBlur}
                  value={values.nombre}
                  onChange={handleChange}
                  helperText={errors.nombre && touched.nombre && errors.nombre}
                />

                <TextField
                  error={errors.cuit && touched.cuit ? true : false}
                  id="cuit"
                  label="CUIT"
                  name="cuit"
                  onBlur={handleBlur}
                  value={values.cuit}
                  onChange={handleChange}
                  helperText={errors.cuit && touched.cuit && errors.cuit}
                />
              </div>

              <div>
                <FormControl
                  error={errors.rubro && touched.rubro ? true : false}
                  className={classes.formControl}
                >
                  <InputLabel id="labelRubro">Rubro:</InputLabel>
                  <Select
                    id="rubro"
                    name="rubro"
                    labelId="labelRubro"
                    value={values.rubro}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    <MenuItem value="-1" disabled>
                      <em>Elija un rubro</em>
                    </MenuItem>
                    {stateRubro.map((rubro) => {
                      return (
                        <MenuItem value={rubro.idRubro} key={rubro.idRubro}>
                          {rubro.nombre}
                        </MenuItem>
                      );
                    })}
                  </Select>
                  <FormHelperText>
                    {errors.rubro && touched.rubro && errors.rubro}
                  </FormHelperText>
                </FormControl>

                <FormControl
                  error={errors.tipoEmp && touched.tipoEmp ? true : false}
                  className={classes.formControl}
                >
                  <InputLabel id="labelTipoEmp">
                    Tipo Emprendimiento:
                  </InputLabel>
                  <Select
                    id="tipoEmp"
                    name="tipoEmp"
                    labelId="labelTipoEmp"
                    value={values.tipoEmp}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    <MenuItem value="-1" disabled>
                      <em>Elija un tipo emprendimiento</em>
                    </MenuItem>
                    {stateTipoEmp.map((tipoEmp) => {
                      return (
                        <MenuItem
                          value={tipoEmp.idTipoEmprendimiento}
                          key={tipoEmp.idTipoEmprendimiento}
                        >
                          {tipoEmp.nombre}
                        </MenuItem>
                      );
                    })}
                  </Select>
                  <FormHelperText>
                    {errors.tipoEmp && touched.tipoEmp && errors.tipoEmp}
                  </FormHelperText>
                </FormControl>
              </div>
              <div>
                <FormControl
                  error={errors.provincia && touched.provincia ? true : false}
                  className={classes.formControl}
                >
                  <InputLabel id="labelProvincia">Provincia:</InputLabel>
                  <Select
                    id="provincia"
                    name="provincia"
                    labelId="labelProvincia"
                    value={values.provincia}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    <MenuItem value="-1" disabled>
                      <em>Elija una provincia</em>
                    </MenuItem>
                    {stateProv.map((provincia) => {
                      return (
                        <MenuItem
                          value={provincia.idProvincia}
                          key={provincia.idProvincia}
                        >
                          {provincia.nombre}
                        </MenuItem>
                      );
                    })}
                  </Select>
                  <FormHelperText>
                    {errors.provincia && touched.provincia && errors.provincia}
                  </FormHelperText>
                </FormControl>

                <FormControl
                  error={errors.localidad && touched.localidad ? true : false}
                  className={classes.formControl}
                >
                  <InputLabel id="labelLocalidad">Localidad:</InputLabel>
                  <Select
                    id="localidad"
                    name="localidad"
                    labelId="labelLocalidad"
                    value={values.localidad}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    <MenuItem value="-1" disabled>
                      <em>Elija una localidad</em>
                    </MenuItem>
                    {stateLoc.map((localidad) => {
                      return (
                        <MenuItem
                          value={localidad.idLocalidad}
                          key={localidad.idLocalidad}
                        >
                          {localidad.nombre}
                        </MenuItem>
                      );
                    })}
                  </Select>
                  <FormHelperText>
                    {errors.localidad && touched.localidad && errors.localidad}
                  </FormHelperText>
                </FormControl>
              </div>
              <div>
                <TextField
                  error={errors.calle && touched.calle ? true : false}
                  id="calle"
                  label="Calle"
                  name="calle"
                  type="text"
                  onBlur={handleBlur}
                  value={values.calle}
                  onChange={handleChange}
                  helperText={errors.calle && touched.calle && errors.calle}
                />
                <TextField
                  error={errors.numero && touched.numero ? true : false}
                  id="numero"
                  label="Numero"
                  name="numero"
                  onBlur={handleBlur}
                  value={values.numero}
                  onChange={handleChange}
                  helperText={errors.numero && touched.numero && errors.numero}
                />
                
              </div>
              <div>
             
                
                <TextField
                  error={errors.piso && touched.piso ? true : false}
                  id="piso"
                  label="Piso (Opcional)"
                  name="piso"
                  onBlur={handleBlur}
                  value={values.piso}
                  onChange={handleChange}
                  helperText={errors.piso && touched.piso && errors.piso}
                />
                 <TextField
                  error={
                    errors.departamento && touched.departamento ? true : false
                  }
                  id="departamento"
                  label="Departamento (Opcional)"
                  name="departamento"
                  onBlur={handleBlur}
                  value={values.departamento}
                  onChange={handleChange}
                  helperText={
                    errors.departamento &&
                    touched.departamento &&
                    errors.departamento
                  }
                />
              </div>
              
              <br></br>
              <br></br>
              {/* <Autocomplete
                id="provincia"
                options={stateProv}
                name="provincia"
                value={values.provincia}
                onChange={(event, newValue) => {
                  setFieldValue("provincia", newValue);
                }}
                getOptionLabel={(option) => option.nombre}
                style={{ width: 300 }}
                renderInput={(params) => (
                  <TextField {...params} label="Provincia" />
                )}
              /> 
              Ejemplo de provincia autocomplete
              */}
            </Grid>

            <Grid item xs={6} className={classes.mapa}>
              <TextField
                error={errors.mapaUbic && touched.mapaUbic? true : false}
                id="mapaUbic"
                label="Seleccione ubicacion:"
                name="mapaUbic"
                disabled
                helperText={errors.mapaUbic && touched.mapaUbic && errors.mapaUbic}
              />
              <Mapa
                seleccionaPosicion={(lat, lng) => {
                  console.log("funciona", lat);
                  setFieldValue("lat", lat);
                  setFieldValue("lng", lng);
                }}
                latitud={values.lat}
                longitud={values.lng}
              />
            </Grid>
          </Grid>

          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            className={classes.botonEspacio}
          >
            <Button
              variant="contained"
              color="primary"
              className={classes.botonEnviar}
              onClick={() => {
                dispatch(cargarSetDeDatosEmprendimiento(values));
                props.propClickAtras();
              }}
            >
              Atras
            </Button>
            <Button
              variant="contained"
              color="primary"
              className={classes.botonEnviar}
              type="submit"
            >
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
        </form>
      </Grid>
    </div>
  );
};

export default RegistroDatosEmprendimiento;
