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
import {Grid,Card,CardContent} from "@material-ui/core";
import { apiCalls } from "../../api/apiCalls";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        height: "100vh",
        background: "linear-gradient(top,white  , #0BA3C8 )",
        "& .MuiTextField-root": {
          margin: theme.spacing(1),
          minWidth: 400,
        },
      },
      card: { width: 450,height:380 },
      botonForm: {
        marginRight: theme.spacing(3),
      },
      botonEspacio: {
        margin: theme.spacing(1),
      },
  }));

  const valoresIniciales = () => {
    return {
      repetirPassword: "",
      nuevaPassword: "",
      repetirNuevaPassword:""
    };
  };

  const validar = (values) => {
    const errors = {};
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


const RestablecerPasswordPaso2 = () => {
    const classes = useStyles();
    const [stateFormExito, setStateFormExito] = useState(false);

    const enviar = (values, { setSubmitting, setFieldError}) => {
    setStateFormExito(true);
       
  };

    const formik = useFormik({
        initialValues: valoresIniciales(),
        onSubmit: enviar,
        validate: validar,
        initialErrors: { nuevaPassword: "error" },
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
        
    <div className={classes.root}>
             {
                stateFormExito ? (
                    <Redirect to="/login" />
                ) : null /* Redireccionar si se agrega con exito */
            }
        <Grid container direction="row" justify="center" alignItems="center">
            <Card className={classes.card}>

                    <Grid
                        container
                        direction="row"
                        justify="center"
                        alignItems="center"
                      >
                       <Typography  variant="h4" color="initial">
                         Cambiar Contraseña
                        </Typography>
                    </Grid>
                
             <CardContent>
        <form onSubmit={handleSubmit} className={classes.espacios}>
      

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
        <br></br>
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

                <br></br>
                <br></br>
                    <Grid
                        container
                        direction="row"
                        justify="center"
                        alignItems="center"
                        className={classes.botonEspacio}
                      >
                       <Button
                            variant="contained"
                            color="secondary"
                            onClick={handleSubmit}
                        >
                        Enviar
                        </Button>
                    </Grid>
              
            

            </form>
        </CardContent>

        </Card>
     </Grid>
    </div>
        

      );
}
 
export default RestablecerPasswordPaso2;