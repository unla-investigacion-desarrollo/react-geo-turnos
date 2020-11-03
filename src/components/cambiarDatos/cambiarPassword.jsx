import React  from 'react';
import TextField from "@material-ui/core/TextField";
import { useFormik } from "formik";
import { useState } from "react";
import {
  Button,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {  Redirect } from "react-router-dom";
import { apiCalls } from "../../api/apiCalls";

const useStyles = makeStyles((theme) => ({
    root: {
      "& .MuiTextField-root": {
        margin: theme.spacing(1),
        minWidth: 350,
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

  const valoresIniciales = () => {
    return {
      password: "",
      repetirPassword: "",
      nuevaPassword: "",
      repetirNuevaPassword:""
    };
  };

  const validar = (values) => {
    const errors = {};
    if (!values.password) {
        errors.password = "Requirido";
      }
      if(!values.nuevaPassword){
        errors.nuevaPassword= "Requirido";
      }
      if (!values.repetirNuevaPassword) {
        errors.repetirNuevaPassword = "Requirido";
      }
      if (values.nuevaPassword !== values.repetirNuevaPassword) {
        errors.repetirNuevaPassword = "Contraseña no coincide";
      }
      return errors;
  };


const CambiarPassword = () => {
    const classes = useStyles();
    const [stateFormExito, setStateFormExito] = useState(false);

    const enviar = (values, { setSubmitting, setFieldError}) => {
        apiCalls.getPassword(localStorage.getItem("token")).then(response => {
              apiCalls.savePassword(values.nuevaPassword);
              setStateFormExito(true);
        })
        .catch((error) => {
          console.log(error.response);
          setSubmitting(false);
          if (
           error.response.data.code ===
           "error.reactivar.invalid.token.pwd.mail"
          )
            setFieldError("password", "La contraseña no coincide con la de la bdd");
        });
  };

    const formik = useFormik({
        initialValues: valoresIniciales(),
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
      } = formik; //destructurar formik

    

    return ( 
        
            <>
             {
                stateFormExito ? (
                    <Redirect to="/turnos" />
                ) : null /* Redireccionar si se agrega con exito */
            }
            <Typography variant="h5" color="initial">
                    Cambiar Contraseña
                </Typography>
            <form onSubmit={handleSubmit} className={classes.root}>
        <div>
             <TextField
                error={errors.password && touched.password ? true : false}
                id="password"
                label="Escriba la contraseña antigua"
                name="password"
                onBlur={handleBlur}
                type="password"
                value={values.password}
                onChange={handleChange}
                helperText={errors.password && touched.password && errors.password}
              />
        </div>

        <div>
              <TextField
                error={errors.nuevaPassword && touched.nuevaPassword ? true : false}
                id="nuevaPassword"
                label="Nueva contraseña"
                name="nuevaPassword"
                type="password"
                onBlur={handleBlur}
                value={values.nuevaPassword}
                onChange={handleChange}
                helperText={
                  errors.nuevaPassword && touched.nuevaPassword && errors.nuevaPassword
                }
              />
        </div>
        <div>
              <TextField
                error={errors.repetirNuevaPassword && touched.repetirNuevaPassword ? true : false}
                id="repetirNuevaPassword"
                label="Repetir nueva contraseña"
                name="repetirNuevaPassword"
                type="password"
                onBlur={handleBlur}
                value={values.repetirNuevaPassword}
                onChange={handleChange}
                helperText={
                  errors.repetirNuevaPassword && touched.repetirNuevaPassword && errors.repetirNuevaPassword
                }
              />
        </div>
              <Button
                 variant="contained"
                color="secondary"
                onClick={handleSubmit}
                >
                Enviar
            </Button>

            </form>
        </>
        

      );
}
 
export default CambiarPassword;