import React  from 'react';
import TextField from "@material-ui/core/TextField";
import { useFormik } from "formik";
import { useState, useEffect } from "react";
import {
    Button,
    Typography,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    FormHelperText,
    Dialog,
    DialogTitle,
    DialogActions,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link as LinkRouter, Redirect } from "react-router-dom";
import { apiCalls } from "../../api/apiCalls";
import { useSelector } from "react-redux";
import {selectSesion} from "../../datosSesion/sesionSlice";
import Grid from "@material-ui/core/Grid";
import Mapa from "../mapa/mapa";
import { searchPosition } from "../mapa/buscarPosicion";


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
    if(!values.capacidad){
      errors.capacidad="Requerido";
    }
    if(!values.telefono){
      errors.telefono="Requerido";
    }
    return errors;
  };

const ModificarDatosEmprendimiento = () => {
    const classes = useStyles();
    const [stateFormExito, setStateFormExito] = useState(false);
    const [stateRubro, setStateRubro] = useState([]); //rubros
    const [stateTipoEmp, setStateTipoEmp] = useState([]); //tipo emprendimientos
    const [stateProv, setStateProv] = useState([]); //provincias
    const [stateLoc, setStateLoc] = useState([]); //localidades
    const [primeraRenderizacion,setStatePrimRen] = useState(true);
    const [stateOpenDialogMod, setStateOpenDialogMod] = useState(false);

    const idEmprendimiento = useSelector(selectSesion).idEmprendimiento;
    const idPersona = useSelector(selectSesion).idPersona;

    const valoresIniciales = () => {
        return {
          nombre: "",
          cuit: "",
          rubro: "-1",
          tipoEmp: "-1",
          calle: "",
          telefono:"",
          capacidad:"",
          departamento: "",
          provincia: "-1",
          localidad: "-1",
          numero: "",
          piso: "",
          mapaUbic: "",
          lat: "",
          lng: "",
        };
    };

    const formatDatosEmprendimiento = (idEmprendimiento,datosEmp, turnos, idPersona) => {
      return {
        aceptaFoto: true,
        capacidad: datosEmp.capacidad,
        configuracionLocales: turnos,
        cuit: datosEmp.cuit,
        idPersona: idPersona,
        idRubro: datosEmp.rubro,
        idTipoEmprendimiento: datosEmp.tipoEmp,
        nombre: datosEmp.nombre,
        telefono: datosEmp.telefono,
        idEmprendimiento: idEmprendimiento,
        idEstadoEmprendimiento: datosEmp.idEstadoEmprendimiento,
        ubicacionVo: {
          calle: datosEmp.calle,
          departamento: datosEmp.departamento,
          idLocalidad: datosEmp.localidad,
          idProvincia: datosEmp.provincia,
          latitud: datosEmp.lat,
          longitud: datosEmp.lng,
          numero: datosEmp.numero,
          piso: datosEmp.piso,
          usuarioModi: "web"
        },
        usuarioModi: "web",  
      };
    }

    const enviar = (values, { setSubmitting }) => {
      apiCalls.putEmprendimiento(formatDatosEmprendimiento(idEmprendimiento,values,values.configLocal,idPersona)).
      then(response =>{
         console.log(response.data);
         setStateFormExito(true);
      });

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
        setFieldValue,
        isSubmitting,
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
        if (values.provincia !== "-1") {
          apiCalls
            .getLocalidades(values.provincia)
            .then((datos) => setStateLoc(datos.data));
        }
        setStatePrimRen(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [values.provincia]); //Ejecutar segun el cambio de provincia
      

      useEffect(() => {
        apiCalls.getEmprendimientoId(idEmprendimiento !=="" ? idEmprendimiento : null).then((response) => {
          const dataEmprendimiento = response.data;
          console.log(dataEmprendimiento);
          setValues({ 
              idEmprendimiento: dataEmprendimiento.idEmprendimiento,
              nombre: dataEmprendimiento.nombre,
              cuit: dataEmprendimiento.cuit,
              rubro: dataEmprendimiento.rubro.idRubro,
              capacidad: dataEmprendimiento.capacidad,
              lat: dataEmprendimiento.ubicacion.latitud,
              lng: dataEmprendimiento.ubicacion.longitud,
              telefono: dataEmprendimiento.telefono,
              cuil: dataEmprendimiento.cuil,
              tipoEmp: dataEmprendimiento.tipoEmprendimiento.idTipoEmprendimiento,
              provincia: dataEmprendimiento.ubicacion.localidad.provincia.idProvincia,
              localidad: dataEmprendimiento.ubicacion.localidad.idLocalidad,
              calle: dataEmprendimiento.ubicacion.calle,
              numero: dataEmprendimiento.ubicacion.numero,
              piso: dataEmprendimiento.ubicacion.piso,
              departamento: dataEmprendimiento.ubicacion.departamento,
              configLocal: dataEmprendimiento.configuracionesLocal,
              idEstadoEmprendimiento: dataEmprendimiento.estadoEmprendimiento.idEstadoEmprendimiento,
          });
        });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [idEmprendimiento]);

    return ( <div className={classes.root}>
                {
                    stateFormExito ? (
                     <Redirect to="/turnos" />
                        ) : null /* Redireccionar si se agrega con exito */
                 }
        <Grid container>
        <Typography variant="h5" color="initial">
            Modificar Datos Emprendimiento
        </Typography>

        <form onSubmit={handleSubmit} className={classes.espacios}>

        <Grid container>
        <Grid item xs={8}>
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
                  disabled
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
              <div>
             <TextField
               error={errors.telefono && touched.telefono ? true : false}
               id="telefono"
               label="Telefono"
               name="telefono"
               onBlur={handleBlur}
               value={values.telefono}
               onChange={handleChange}
               helperText={errors.telefono && touched.telefono && errors.telefono}
             />
              <TextField
               error={
                 errors.capacidad && touched.capacidad ? true : false
               }
               id="capacidad"
               label="Capacidad del local"
               name="capacidad"
               onBlur={handleBlur}
               value={values.capacidad}
               onChange={handleChange}
               helperText={
                 errors.capacidad &&
                 touched.capacidad &&
                 errors.capacidad
               }
             />
           </div>
          </Grid>

          <Grid item xs={4} className={classes.mapa}>
              <TextField
                error={errors.mapaUbic && touched.mapaUbic? true : false}
                id="mapaUbic"
                label="Seleccione ubicacion:"
                name="mapaUbic"
                disabled
                helperText={errors.mapaUbic && touched.mapaUbic && errors.mapaUbic}
              />
              <Button
                variant="contained"
                color="primary"
                disabled={values.localidad !== "-1" && values.calle !== "" && values.numero !== ""? false : true}
                className={classes.botonEnviar}
                onClick={() => {
                  let loc = stateLoc.find(loc => loc.idLocalidad === values.localidad);
                  searchPosition(values.calle + " " + values.numero + " " + loc.nombre)
                  .then(response=>{
                    console.log(response.latitude);
                    setFieldValue("lat", response.latitude);
                    setFieldValue("lng", response.longitude);
                  });
                }}
              >Confirmar Ubicacion</Button>
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
              <Button  onClick={()=> setStateOpenDialogMod(true)} variant="contained" color="primary" className={classes.botonEspacio}>
                Modificar
              </Button>
              <Button  component={LinkRouter} variant="contained" color="secondary" to="/turnos">Volver 
              </Button>
              


              <Dialog
            open={stateOpenDialogMod}
            onClose={() => setStateOpenDialogMod(false)}
            aria-labelledby="alert-dialog-title-mod"
            aria-describedby="alert-dialog-description-mod"
          >
            <DialogTitle id="alert-dialog-title-mod">
              {"¿Estas seguro de modificar los datos emprendimiento?"}
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
    </div> 
     );
}
 
export default ModificarDatosEmprendimiento;