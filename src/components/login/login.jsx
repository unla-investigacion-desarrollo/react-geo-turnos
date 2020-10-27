import React,{useState} from "react";
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
import { useDispatch } from "react-redux";
import {cargarDatosSesion as reducerCargarDatos} from "../../datosSesion/sesionSlice";


const useStyles = makeStyles((theme) => ({

  botonEspacio: {
    margin: theme.spacing(1),
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
  password: "admin",
};

const LogIn = (props) => {
  const [stateIrTurnos, setStateIrTurnos] = useState(false);
  const [stateIrAdmin, setStateIrAdmin] = useState(false);
  const [stateIrRegEmp, setStateIrRegEmp] = useState(false);
  const classes = useStyles();
  let claseBotonEnviar;
  const dispatch = useDispatch();

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
      if(response.data.idPerfil === 1){
        setStateIrAdmin(true);
      }else if(response.data.idPerfil === 3 && response.data.idEmprendimiento !==0){
        setStateIrTurnos(true);
      }else{
        setStateIrRegEmp(true);
      }
    }).catch((error)=>{
      if(error.response.data.code === "error.reactivar.incorrect.user_password"){
        setFieldError("password", "Usuario o contraseña invalido");
      }
    });;
  };

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
                />
                <CardContent>
                  <Typography variant="h5" color="initial">
                    Iniciar Sesion
                  </Typography>
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
