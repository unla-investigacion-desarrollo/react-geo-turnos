import React,{useState, useEffect} from "react";
import { Formik } from "formik";
import { Button, Divider, Typography } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { apiCalls } from "../../api/apiCalls";
import logo from "../../imagenes/logo.jpeg";
import { Link as LinkRouter, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {cargarDatosSesion as reducerCargarDatos, selectSesion} from "../../datosSesion/sesionSlice";
import {Android} from '@material-ui/icons';


const useStyles = makeStyles((theme) => ({

  botonEspacio: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
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
    background: "linear-gradient(top,white  , #0BA3C8 )",
  },
  card: {
    width: 345,
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
  botonAndroid: {
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(2),
    marginTop: theme.spacing(3),
    backgroundColor: "#30DA35",
    "&:hover":{
      backgroundColor:"#33B237",
    },
    color: "white",
  },
}));

const validar = (values) => {
  const errors = {};
  if (!values.usuario) {
    errors.usuario = "Requirido";
  }
  if (!values.password) {
    errors.password = "Requirido";
  }
  return errors;
};



let valoresIniciales = {};

valoresIniciales = {
  usuario: "enzord07@gmail.com",
  password: "123",
};

const LogIn = (props) => {
  const [stateIrTurnos, setStateIrTurnos] = useState(false);
  const [stateIrAdmin, setStateIrAdmin] = useState(false);
  const [stateIrRegEmp, setStateIrRegEmp] = useState(false);
  const classes = useStyles();
  let claseBotonEnviar;
  const dispatch = useDispatch();
  const sesion = useSelector(selectSesion);

  const cargarDatosSesion = (datos) => {
    let emprendimiento;
    let persona;
    let perfil;
    apiCalls.getPersona(datos.data.idPersona).then(response => {
        persona = response.data;
        apiCalls.getPerfilId(datos.data.idPerfil).then(response =>{
            perfil = response.data;
            if(datos.data.idEmprendimiento===0){
              dispatch(reducerCargarDatos({
                  idPersona: persona.idPersona,
                  idEmprendimiento: 0,
                  nombre: persona.nombre,
                  apellido: persona.apellido,
                  nombreEmprendimiento: "Sin Emprendimiento",
                  tipoUsuario: perfil.nombre,
                  idPerfil: perfil.idPerfil
              }));
            } else {
              apiCalls.getEmprendimientoId(datos.data.idEmprendimiento).then(response=>{
                emprendimiento = response.data;
                dispatch(reducerCargarDatos({
                  idPersona: persona.idPersona,
                  idEmprendimiento: emprendimiento.idEmprendimiento,
                  nombre: persona.nombre,
                  apellido: persona.apellido,
                  nombreEmprendimiento: emprendimiento.nombre,
                  tipoUsuario: perfil.nombre,
                  idPerfil: perfil.idPerfil
                }));
              });
            }
        });
    });
}

  const enviar = (values, { setSubmitting,setFieldError }) => {
    let datos = { email: values.usuario, clave: values.password };
    apiCalls.postLogin(datos).then((response) => {
      localStorage.setItem("token", response.data.token);
      cargarDatosSesion(response);
    }).catch((error)=>{
      if(error.response.data.code === "error.reactivar.incorrect.user_password"){
        setFieldError("password", "Usuario o contraseña invalido");
      }
    });;
  };

  useEffect(() => {
    if(sesion.idPerfil === 1){
      setStateIrAdmin(true);
    }else if(sesion.idPerfil === 3 && sesion.idEmprendimiento !==0){
      setStateIrTurnos(true);
    }else if(sesion.idEmprendimiento===0 && sesion.idPerfil === 3){
      setStateIrRegEmp(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sesion.idPersona]);

  return (
    <div className={classes.root}>
      { 
        stateIrTurnos ? (<Redirect to="/turnos" />) : stateIrAdmin? (<Redirect to="/rubros" />): stateIrRegEmp? (<Redirect to="/RegistroEmprendimiento" />):null
      }
      <Grid container direction="row" justify="center" alignItems="center">
        <div>
          <Formik
            initialValues={valoresIniciales}
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
              setFieldError,
            }) => (
              <Card className={classes.card}>
                <CardMedia
                  className={classes.media}
                  image={logo}
                  title="Pantalla de Inicio"
                  component={LinkRouter}
                  to="/index"
                />
                <CardContent>
                  <form onSubmit={handleSubmit} className={classes.espacios}>
                    <div>
                      <TextField
                        error={errors.usuario && touched.usuario ? true : false}
                        id="usuario"
                        label="Usuario"
                        name="usuario"
                        onBlur={handleBlur}
                        value={values.usuario}
                        onChange={handleChange}
                        helperText={
                          errors.usuario && touched.usuario && errors.usuario
                        }
                      />
                    </div>

                    <div>
                      <TextField
                        error={
                          errors.password && touched.password ? true : false
                        }
                        id="password"
                        label="Constraseña"
                        name="password"
                        type="password"
                        onBlur={handleBlur}
                        value={values.password}
                        onChange={handleChange}
                        helperText={
                          errors.password && touched.password && errors.password
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
                      <Button
                        variant="contained"
                        color="primary"
                        className={claseBotonEnviar}
                        type="submit"
                      >
                        Iniciar Sesión
                      </Button>
                    </Grid>
                    <Divider />
                    <LinkRouter to="/registro">
                      ¿No tiene usuario? Cree una cuenta nueva
                    </LinkRouter>
                    <Divider />
                    <Divider />
                    <LinkRouter to="/restablecerPassword">
                      ¿Olvido su contraseña? Restablecer
                    </LinkRouter>
                    <Divider />
                    <Grid
                      container
                      direction="row"
                      justify="center"
                      alignItems="center"
                    >
                      <Button
                        variant="contained"
                        className={classes.botonAndroid}
                        startIcon={<Android />}
                      >
                        Descarga la App
                      </Button>
                    </Grid>
                  </form>
                </CardContent>
              </Card>
            )}
          </Formik>
        </div>
      </Grid>
    </div>
  );
};

export default LogIn;
