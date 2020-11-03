import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import TextField from "@material-ui/core/TextField";
import {
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogActions,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import Grid from "@material-ui/core/Grid";
import { apiCalls } from "../../api/apiCalls";
import { Link as LinkRouter, Redirect } from "react-router-dom";
import {selectSesion} from "../../datosSesion/sesionSlice";


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
      "& .MuiTextField-root": {
        margin: theme.spacing(1),
        minWidth: 300,
      },
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
    botonPass: {
      marginTop:  theme.spacing(3),
    },
    botonEnviar: {
      marginRight: theme.spacing(2),
      marginLeft: theme.spacing(2),
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
    return errors;
    
  };


  const ModificarDatosPersonales = (props) => {
    const idPersona = useSelector(selectSesion).idPersona;

    const classes = useStyles();
  
    const [stateFormExito, setStateFormExito] = useState(false);
    const [stateOpenDialogMod, setStateOpenDialogMod] = useState(false);
    const valoresIniciales = () => {
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
        sexo:"",
        cuil: "",
        celular: "",
        email: "",
        usuarioModi: "string",
        direccion: "",
        password: "",
        departamento:"",
        fillerPassword:""
      };
    };
  
    
    const enviar = (values, { setSubmitting }) => {
        const dataPersona = { 
        idPersona: values.idPersona, 
        celular: values.celular, 
        mail:values.email,
        password: values.password,
        sexo: values.sexo,
      }
      apiCalls.putPersonaFisica(dataPersona).then((datos) => {
        setSubmitting(false);
        setStateOpenDialogMod(false);
        setStateFormExito(true);
      })
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
      setValues,
      isSubmitting,
    } = formik; //destructurar formik
  
 
    useEffect(() => {
          apiCalls.getPersonaFisica(idPersona !=="" ? idPersona : null).then((response) => {
            const dataPersona = response.data;
            console.log(dataPersona);
            setValues({ 
                idPersona: dataPersona.idPersona,
                nombre: dataPersona.nombre,
                apellido: dataPersona.apellido,
                dni: dataPersona.dni,
                cuil: dataPersona.cuil,
                nroTramite: dataPersona.numeroTramite,
                password: dataPersona.password,
                sexo: dataPersona.sexo,
                email: dataPersona.login.email,
                celular: dataPersona.celular,
                provincia: dataPersona.ubicacion.localidad.provincia.nombre,
                localidad: dataPersona.ubicacion.localidad.nombre,
                calle: dataPersona.ubicacion.calle,
                numero: dataPersona.ubicacion.numero,
                piso: dataPersona.ubicacion.piso,
                departamento: dataPersona.ubicacion.departamento,
                fillerPassword: "contraseñaDeRelleno"
                
            });
          });
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [idPersona]);
  
  
  
    return (
        <div className={classes.root}>
            {
                stateFormExito ? (
                    <Redirect to="/turnos" />
                ) : null /* Redireccionar si se agrega con exito */
            }
        <Grid container direction="row" justify="center" alignItems="center">
        
                <form onSubmit={handleSubmit} className={classes.espacios}>
            <div>
            <Typography variant="h5" color="initial">
                      Modificar Datos Personales
                  </Typography>
            
              <TextField
                error={errors.nombre && touched.nombre ? true : false}
                id="nombre"
                label="Nombre"
                name="nombre"
                onBlur={handleBlur}
                value={values.nombre}
                onChange={handleChange}
                helperText={errors.nombre && touched.nombre && errors.nombre}
                disabled
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
                disabled
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
                disabled
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
                disabled
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
                disabled
              />

            <TextField
                error={errors.sexo && touched.sexo ? true : false}
                id="sexo"
                label="Sexo"
                name="sexo"
                onBlur={handleBlur}
                value={values.sexo}
                onChange={handleChange}
                helperText={errors.sexo && touched.sexo && errors.sexo}
                disabled
              />
    

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
            <TextField
                error={errors.provincia && touched.provincia ? true : false}
                id="provincia"
                label="Provincia"
                name="provincia"
                onBlur={handleBlur}
                value={values.provincia}
                onChange={handleChange}
                helperText={errors.provincia && touched.provincia && errors.provincia}
                disabled
              />

            <TextField
                error={errors.localidad && touched.localidad ? true : false}
                id="localidad"
                label="Localidad"
                name="localidad"
                onBlur={handleBlur}
                value={values.localidad}
                onChange={handleChange}
                helperText={errors.localidad && touched.localidad && errors.localidad}
                disabled
              />
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
                disabled
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
                disabled
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
                disabled
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
                disabled
              />

            </div>

            <div>
            <TextField
                error={
                  errors.fillerPassword && touched.fillerPassword ? true : false
                }
                id="fillerPassword"
                label="Contraseña"
                name="fillerPassword"
                type="password"
                onBlur={handleBlur}
                value={values.fillerPassword}
                onChange={handleChange}
                helperText={
                  errors.fillerPassword &&
                  touched.fillerPassword &&
                  errors.fillerPassword
                }
                disabled
              />
              <Button 
                component={LinkRouter} 
                className={classes.botonPass} 
                variant="text" 
                color="primary" 
                to="/cambiarPassword" >
                Cambiar Contraseña
              </Button>
        
                    
           

            </div>
           

            <Grid
              container
              direction="row"
              justify="left"
              alignItems="center"
              className={classes.botonEspacio}
            >
              <Button onClick={()=> setStateOpenDialogMod(true)} variant="contained" color="primary" className={classes.botonEspacio}>
                Modificar 
              </Button>
              <Button  component={LinkRouter} variant="contained" color="secondary" to="/turnos">Volver 
              </Button>
            </Grid>

            <Dialog
            open={stateOpenDialogMod}
            onClose={() => setStateOpenDialogMod(false)}
            aria-labelledby="alert-dialog-title-mod"
            aria-describedby="alert-dialog-description-mod"
          >
            <DialogTitle id="alert-dialog-title-mod">
              {"¿Estas seguro de modificar los datos personales?"}
            </DialogTitle>
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



          </form>
           
        </Grid>
        {JSON.stringify(values)}
        <br></br>
        {JSON.stringify(errors)}
        </div>
    );
  };
  
  export default ModificarDatosPersonales;
  