import React from "react";
import { Formik } from "formik";
import { Button, Typography } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
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
  },
  root: {
    display: "flex",
    height: 500,
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

const enviar = (values, { setSubmitting }) => {
  let datos = { email: values.usuario, clave: values.password };
  apiCalls.postLogin(datos).then((response) => {
    console.log(response);
    localStorage.setItem("token", response.data.token);
    window.location.assign("/");
  });
};

let valoresIniciales = {};

valoresIniciales = {
  usuario: "admin@unla",
  password: "admin",
};

const LogIn = (props) => {
  const classes = useStyles();

  let claseBotonEnviar;
  return (
    <div className={classes.root}>
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
            }) => (
              <Card className={classes.card}>
                <CardMedia
                  className={classes.media}
                  image="https://www.lampadia.com/assets/uploads_images/images/a1-web%28166%29.jpg"
                  title="Reactivar Logo pendiente"
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
                        Enviar
                      </Button>
                    </Grid>
                    {JSON.stringify(values)}
                    <br></br>
                    {JSON.stringify(errors)}
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
