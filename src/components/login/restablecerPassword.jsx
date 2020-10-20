import React from "react";
import { useState } from "react";
import { Grid, Card, CardContent } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useFormik } from "formik";
import { apiCalls } from "../../api/apiCalls";
import logo from "../../imagenes/logo.jpeg";
import {
  Button,
  TextField,
  Typography,
  Dialog,
  DialogTitle,
  DialogActions,
  CardMedia,
} from "@material-ui/core";
import { Link, Redirect } from "react-router-dom";


const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
      height: "100vh",
      background: "linear-gradient(top,white  , #0BA3C8 )",
      "& .MuiTextField-root": {
        margin: theme.spacing(1),
        minWidth: 300,
      },
    },
    media: {
      height: 140,
    },
    card: { width: 360 },
    botonForm: {
      marginRight: theme.spacing(3),
    },
    botonOculto: {
      display: "none",
    },
    botonEspacio: {
      margin: theme.spacing(1),
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
    if (!values.email) {
      errors.email = "Requirido";
    }
    return errors;
  };


 


const RestablecerPass = () => {
    const classes = useStyles();
    const [stateFormExito, setStateFormExito] = useState(false);
    const [stateOpenDialogRecEmail,setStateOpenDialogRecEmail] = useState(false);
    const [stateOpenDialogErrorEmail, setStateOpenDialogErrorEmail] = useState(false);


    const enviar = (values, { setSubmitting }) => {
      let email= values.email;
      apiCalls.postRestablecerPassword(email).then((response) =>  
      {
        setSubmitting(false);
        setStateOpenDialogRecEmail(true);
        setStateFormExito(true);
      }).catch((error) => {
        console.log(error);
        setStateOpenDialogErrorEmail(true);
        setSubmitting(false);
      });
    };
  
    const formik = useFormik({
        initialValues: { email :""},
        onSubmit: enviar,
        validate: validar,
        initialErrors: { email: "error" },
      });
    
      const {
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
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
                <CardMedia
                  className={classes.media}
                  image={logo}
                />
                  <CardContent>
                  <Typography variant="h5" color="initial">
                      Restablecer contraseña
                  </Typography>
                    <form onSubmit={handleSubmit} className={classes.espacios}>
                      <div>
                        <TextField
                          error={errors.email && touched.email ? true : false}
                          id="email"
                          label="Ingrese su email"
                          name="email"
                          onBlur={handleBlur}
                          value={values.email}
                          onChange={handleChange}
                          helperText={
                            errors.email && touched.email && errors.email
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
                        
                          type="submit"
                        >
                          Enviar
                        </Button>
                      </Grid>
                      <Grid
                        container
                        direction="row"
                        justify="center"
                        alignItems="center"
                        className={classes.botonEspacio}
                      >
                        <Link to="/login">Cancelar</Link>
                      </Grid>



          
          <Dialog
            open={stateOpenDialogRecEmail}
            onClose={() =>setStateOpenDialogRecEmail(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Si los datos son correctos verifique su email"}
            </DialogTitle>
            <DialogActions>
              <Button onClick={() => setStateOpenDialogRecEmail(false)} color="primary">
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
            open={stateOpenDialogErrorEmail}
            onClose={() => setStateOpenDialogErrorEmail(false)}
            aria-labelledby="alert-dialog-title-error-email"
            aria-describedby="alert-dialog-description-error-email"
          >
            <DialogTitle id="alert-dialog-title-error-email">
              {
                "Error, hubo un problema con sus datos"
              }
            </DialogTitle>
            <DialogActions>
              <Button onClick={() => setStateFormExito(true)} color="primary">
                Aceptar
              </Button>
            </DialogActions>
          </Dialog>


                    </form>
                  </CardContent>
                </Card>
            </Grid>
        </div>
        
    )}
 
export default RestablecerPass;