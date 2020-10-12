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
import { useDispatch, useSelector } from "react-redux";
import {
  cargarSetDeDatosPersonales,
  selectDatosPersonales,
} from "./registroSlice";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import { apiCalls } from "../../api/apiCalls";

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
  if (!values.sexo) {
    errors.sexo = "Requerido";
  }
  if (!values.calle) {
    errors.calle = "Requerido";
  }
  if (!values.dni) {
    errors.dni = "Requerido";
  }
  if(!values.nroTramite){
    errors.nroTramite="Requerido";
  }
  if (values.provincia==="-1") {
    errors.provincia = "Requerido";
  }
  if (values.localidad === "-1") {
    errors.localidad = "Requirido";
  }
  if (values.sexo === "-1") {
    errors.sexo = "Requirido";
  }
  if (!values.numero) {
    errors.numero = "Requerido";
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

  const [stateProv, setStateProv] = useState([]); //provinciaas
  const [stateLoc, setStateLoc] = useState([]); //localidades
  const [primeraRenderizacion, setStatePrimRen] = useState(true);

  const valoresIniciales = () => {
    console.log(datosPersonales);
    if (Object.keys(datosPersonales).length === 0) {
      //me fijo la cant de campos
      return {
        nombre: "",
        apellido: "",
        dni:"",
        calle: "",
        piso:"",
        nroTramite:"",
        numero:"",
        provincia: "-1",
        localidad: "-1",
        sexo:"-1",
        cuil: "",
        celular: "",
        email: "",
        usuarioModi: "string",
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
  } = formik; //destructurar formik


  useEffect(() => {
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
                error={errors.dni && touched.dni ? true : false}
                id="dni"
                label="Dni"
                name="dni"
                onBlur={handleBlur}
                value={values.dni}
                onChange={handleChange}
                helperText={errors.dni && touched.dni && errors.dni}
              />

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

              
            </div>

            <div>

            <TextField
                error={errors.nroTramite && touched.nroTramite ? true : false}
                id="nroTramite"
                label="Numero de tramite"
                name="nroTramite"
                onBlur={handleBlur}
                value={values.nroTramite}
                onChange={handleChange}
                helperText={errors.nroTramite && touched.nroTramite && errors.nroTramite}
              />


<FormControl  error={errors.sexo && touched.sexo ? true : false}
                className={classes.formControl}>
        <InputLabel id="labelSexo">Sexo</InputLabel>
        <Select
                  id="sexo"
                  name="sexo"
                  labelId="labelSexo"
                  value={values.sexo}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
          <MenuItem value="-1" disabled>
            <em>Seleccione una opcion</em>
          </MenuItem>
          <MenuItem value={1}>Femenino</MenuItem>
          <MenuItem value={2}>Masculino</MenuItem>
          <MenuItem value={3}>No Contestar</MenuItem>
        </Select>
      </FormControl>

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
                type="text"
                onBlur={handleBlur}
                value={values.numero}
                onChange={handleChange}
                helperText={errors.numero && touched.numero && errors.numero}
              />

            </div>


            <div>
              <TextField
                error={
                  errors.piso && touched.piso ? true : false
                }
                id="piso"
                label="Piso (Opcional)"
                name="piso"
                onBlur={handleBlur}
                value={values.piso}
                onChange={handleChange}
                helperText={
                  errors.piso &&
                  touched.piso &&
                  errors.piso
                }
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
  );
};

export default RegistroDatosPersonales;
