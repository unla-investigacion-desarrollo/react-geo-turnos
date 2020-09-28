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

let valoresIniciales = {
  nombre: "",
  cuit: "",
  rubro: "-1",
  tipoEmp: "-1",
  calle: "",
  departamento: "",
  provincia: "-1",
  localidad: "-1",
  numero: "",
};

const RegistroDatosEmprendimiento = (props) => {
  const classes = useStyles();
  let claseBotonEnviar;
  const [stateRubro, setStateRubro] = useState([]); //rubros
  const [stateTipoEmp, setStateTipoEmp] = useState([]); //tipo emprendimientos
  const [stateProv, setStateProv] = useState([]); //provinciaas
  const [stateLoc, setStateLoc] = useState([]); //localidades

  const enviar = (values, { setSubmitting }) => {
    props.propClickSiguiente();
    const registro = {
      nombre: values.nombre,
      apellido: values.apellido,
      cuil: values.cuil,
      celular: values.celular,
      idPerfil: 2, //hardcodeado 1 admin 2 usuario
      loginVo: {
        clave: values.password,
        email: values.email,
      },
      //direccion: values.direccion,
      // repetirPassword: values.repetirPassword,
      ubicacionVo: {
        //hardcodeado
        calle: "string3",
        departamento: "string4",
        idLocalidad: 1,
        idProvincia: 1,
        latitud: "2",
        longitud: "string2",
        numero: 0,
        piso: 0,
        usuarioModi: "string",
      },
      usuarioModi: "string",
    };
    apiCalls.postRegistro(registro).then((response) => {
      setSubmitting(false);
      console.log(registro);
    });
  };

  const formik = useFormik({
    initialValues: valoresIniciales,
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
    apiCalls.getRubro().then((datos) => setStateRubro(datos.data));
    apiCalls
      .getTipoEmprendimiento()
      .then((datos) => setStateTipoEmp(datos.data));
    apiCalls.getProvincia().then((datos) => setStateProv(datos.data));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    values.localidad = "-1";
    if (values.provincia !== "-1") {
      apiCalls
        .getLocalidades(values.provincia)
        .then((datos) => setStateLoc(datos.data));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.provincia]); //Ejecutar segun el cambio de provincia

  return (
    <>
      <Typography variant="h5" color="initial">
        Registro - Datos Emprendimiento
      </Typography>
      <form onSubmit={handleSubmit} className={classes.espacios}>
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
                <em>Elija una rubro</em>
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
            <InputLabel id="labelTipoEmp">Tipo Emprendimiento:</InputLabel>
            <Select
              id="tipoEmp"
              name="tipoEmp"
              labelId="labelTipoEmp"
              value={values.tipoEmp}
              onChange={handleChange}
              onBlur={handleBlur}
            >
              <MenuItem value="-1" disabled>
                <em>Elija una tipoEmp</em>
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
            error={errors.departamento && touched.departamento ? true : false}
            id="departamento"
            label="Departamento"
            name="departamento"
            onBlur={handleBlur}
            value={values.departamento}
            onChange={handleChange}
            helperText={
              errors.departamento && touched.departamento && errors.departamento
            }
          />
        </div>
        <div>
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
          <TextField
            error={errors.piso && touched.piso ? true : false}
            id="piso"
            label="Numero"
            name="piso"
            onBlur={handleBlur}
            value={values.piso}
            onChange={handleChange}
            helperText={errors.piso && touched.piso && errors.piso}
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
            className={claseBotonEnviar}
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
        {JSON.stringify(values)}
        <br></br>
        {JSON.stringify(errors)}
      </form>
    </>
  );
};

export default RegistroDatosEmprendimiento;