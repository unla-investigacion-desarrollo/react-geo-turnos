import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import {
  Button,
  Divider,
  Typography,
  Slider,
  FormControlLabel,
  Checkbox,
  Dialog,
  DialogTitle,
  DialogActions,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import { useDispatch, useSelector } from "react-redux";
import ItemDiaTurno from "../registro/emprendimiento/itemDiaTurno";
import {
  cargarSetDeDatosTurnos,
  selectDatosTurnos,
  selectDatosEmprendimiento,
} from "../registro/registroSlice";
import { apiCalls } from "../../api/apiCalls";
import {selectSesion} from "../../datosSesion/sesionSlice";
import { Redirect } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    botonEspacio: {
      margin: theme.spacing(1),
    },
    espacios: {
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
    textDisabled: {
      color: "#bdbdbd",
    },
    botonRegistro: {
      marginRight: theme.spacing(2),
      marginLeft: theme.spacing(2),
      backgroundColor: "#40E81F",
      "&:hover":{
        backgroundColor:"#35C11A",
      },
    },
  }));

  const validar = (values) => {
    const errors = {};
    return errors;
  };


  const marks = [
    {
      value: 5,
      label: '5 mins',
    },
    {
      value: 30,
      label: '30 mins',
    },
    {
      value: 60,
      label: '60 mins',
    },
  ];

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


const ModificarDatosTurno = (props) => {
  const classes = useStyles();
  const datosTurnos = useSelector(selectDatosTurnos);
  const datosEmp = useSelector(selectDatosEmprendimiento);
  const datosSesion = useSelector(selectSesion);
  const dispatch = useDispatch();
  const [stateIrTurnos, setStateIrTurnos] = useState(false);

  const [stateOpenDialogMod, setStateOpenDialogMod] = useState(false);
  const idEmprendimiento = useSelector(selectSesion).idEmprendimiento;
  const idPersona = useSelector(selectSesion).idPersona;

  const formatItemTurno = (dia, intervalo, usaTurnos, turnos, tiempoAt)=>{
    return {
      diaSemana: dia,
      intervaloTurnos: usaTurnos?intervalo:5,
      tiempoAtencion: tiempoAt,
      turno1Desde: turnos.turno1Desde,
      turno1Hasta: turnos.turno1Hasta,
      turno2Desde: turnos.turno2Desde,
      turno2Hasta: turnos.turno2Hasta,
      usuarioModi: "web",
    };
  };

  const enviar = (values, { setSubmitting }) => {
    const listaTurnos = [];
    if(values.lunes){
      listaTurnos.push(formatItemTurno("lunes",values.intervalo, values.usaTurnos,values.lunesH, values.tiempoAtencion));
    }
    if(values.martes){
      listaTurnos.push(formatItemTurno("martes",values.intervalo, values.usaTurnos,values.martesH, values.tiempoAtencion));
    }
    if(values.miercoles){
      listaTurnos.push(formatItemTurno("miercoles",values.intervalo, values.usaTurnos,values.miercolesH, values.tiempoAtencion));
    }
    if(values.jueves){
      listaTurnos.push(formatItemTurno("jueves",values.intervalo, values.usaTurnos,values.juevesH, values.tiempoAtencion));
    }
    if(values.viernes){
      listaTurnos.push(formatItemTurno("viernes",values.intervalo, values.usaTurnos,values.viernesH, values.tiempoAtencion));
    }
    if(values.sabado){
      listaTurnos.push(formatItemTurno("sabado",values.intervalo, values.usaTurnos,values.sabadoH, values.tiempoAtencion));
    }
    if(values.domingo){
      listaTurnos.push(formatItemTurno("domingo",values.intervalo, values.usaTurnos,values.domingoH, values.tiempoAtencion));
    }
    apiCalls.putEmprendimiento(formatDatosEmprendimiento(idEmprendimiento,values.dataEmprendimiento, listaTurnos,idPersona)).then((response)=>{
      console.log(response.data);
      setStateIrTurnos(true);
    }).catch(error=> console.log(error.response.data));
  
  };


  const valoresIniciales = () => {
    if (Object.keys(datosTurnos).length === 0) {
      return {
        lunes:false,
        lunesH: {turno1Desde: -1,turno1Hasta: -1, turno2Desde: -1, turno2Hasta: -1},
        martes:false,
        martesH: {turno1Desde: -1,turno1Hasta: -1, turno2Desde: -1, turno2Hasta: -1},
        miercoles:false,
        miercolesH: {turno1Desde: -1,turno1Hasta: -1, turno2Desde: -1, turno2Hasta: -1},
        jueves:false,
        juevesH: {turno1Desde: -1,turno1Hasta: -1, turno2Desde: -1, turno2Hasta: -1},
        viernes:false,
        viernesH: {turno1Desde: -1,turno1Hasta: -1, turno2Desde: -1, turno2Hasta: -1},
        sabado:false,
        sabadoH: {turno1Desde: -1,turno1Hasta: -1, turno2Desde: -1, turno2Hasta: -1},
        domingo:false,
        domingoH: {turno1Desde: -1,turno1Hasta: -1, turno2Desde: -1, turno2Hasta: -1},
        usaTurnos: false,
        intervalo: 10,
        tiempoAtencion: 10,
      };
    } else return datosTurnos;
  };

  const formik = useFormik({
    initialValues: valoresIniciales(),
    onSubmit: enviar,
    validate: validar,
    initialErrors: { nombre: "error" },
  });

  const {
    values,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    isSubmitting,
  } = formik; //destructurar formik

  useEffect(() => {
    apiCalls.getEmprendimientoId(idEmprendimiento !=="" ? idEmprendimiento : null).then((response) => {
      const dataEmprendimiento = response.data;

      setFieldValue("dataEmprendimiento",{
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
        idEstadoEmprendimiento: dataEmprendimiento.estadoEmprendimiento.idEstadoEmprendimiento,
    });

      dataEmprendimiento.configuracionesLocal.forEach(config => {
        if(config.diaSemana==="lunes" || config.diaSemana==="Lunes"){
          setFieldValue("lunes",true);
          setFieldValue("lunesH",{turno1Desde: config.turno1Desde,turno1Hasta: config.turno1Hasta, turno2Desde: config.turno2Desde, turno2Hasta: config.turno2Hasta});
          setFieldValue("intervalo",config.intervaloTurnos);
          setFieldValue("tiempoAtencion",config.tiempoAtencion);
        }
        if(config.diaSemana==="martes" || config.diaSemana==="Martes"){
          setFieldValue("martes",true);
          setFieldValue("martesH",{turno1Desde: config.turno1Desde,turno1Hasta: config.turno1Hasta, turno2Desde: config.turno2Desde, turno2Hasta: config.turno2Hasta});
          setFieldValue("intervalo",config.intervaloTurnos);
          setFieldValue("tiempoAtencion",config.tiempoAtencion);
        }
        if(config.diaSemana==="miercoles" || config.diaSemana==="Miercoles"){
          setFieldValue("miercoles",true);
          setFieldValue("miercolesH",{turno1Desde: config.turno1Desde,turno1Hasta: config.turno1Hasta, turno2Desde: config.turno2Desde, turno2Hasta: config.turno2Hasta});
          setFieldValue("intervalo",config.intervaloTurnos);
          setFieldValue("tiempoAtencion",config.tiempoAtencion);
        }
        if(config.diaSemana==="jueves" || config.diaSemana==="Jueves"){
          setFieldValue("jueves",true);
          setFieldValue("juevesH",{turno1Desde: config.turno1Desde,turno1Hasta: config.turno1Hasta, turno2Desde: config.turno2Desde, turno2Hasta: config.turno2Hasta});
          setFieldValue("intervalo",config.intervaloTurnos);
          setFieldValue("tiempoAtencion",config.tiempoAtencion);
        }
        if(config.diaSemana==="viernes" || config.diaSemana==="Viernes"){
          setFieldValue("viernes",true);
          setFieldValue("viernesH",{turno1Desde: config.turno1Desde,turno1Hasta: config.turno1Hasta, turno2Desde: config.turno2Desde, turno2Hasta: config.turno2Hasta});   
          setFieldValue("intervalo",config.intervaloTurnos);
          setFieldValue("tiempoAtencion",config.tiempoAtencion);
        }
        if(config.diaSemana==="sabado" || config.diaSemana==="Sabado"){
          setFieldValue("sabado",true);
          setFieldValue("sabadoH",{turno1Desde: config.turno1Desde,turno1Hasta: config.turno1Hasta, turno2Desde: config.turno2Desde, turno2Hasta: config.turno2Hasta}); 
          setFieldValue("intervalo",config.intervaloTurnos);
          setFieldValue("tiempoAtencion",config.tiempoAtencion);
        }
        if(config.diaSemana==="domingo" || config.diaSemana==="Domingo"){
          setFieldValue("domingo",true);
          setFieldValue("domingoH",{turno1Desde: config.turno1Desde,turno1Hasta: config.turno1Hasta, turno2Desde: config.turno2Desde, turno2Hasta: config.turno2Hasta});    
          setFieldValue("intervalo",config.intervaloTurnos);
          setFieldValue("tiempoAtencion",config.tiempoAtencion);
        }
       },
      );
      setFieldValue("usaTurnos",true);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [idEmprendimiento]);



    return (
    <div className={classes.root}>
        {stateIrTurnos ? (<Redirect to="/turnos" />) : null}
        <Grid container>
            <Grid item xs={12}>
                <Typography variant="h5" color="initial">
                Modificar Turno del emprendimiento
                </Typography>
             </Grid>
        <form onSubmit={handleSubmit} className={classes.espacios}>
          <Grid item xs={12}>

          <Divider/>
            <ItemDiaTurno dia={values.lunes} handleChange={handleChange} handleBlur={handleBlur}
                name="lunes" label="Lunes" desdeMañanaDia={values.lunesH.turno1Desde} hastaMañanaDia={values.lunesH.turno1Hasta}
                desdeTardeDia={values.lunesH.turno2Desde} hastaTardeDia={values.lunesH.turno2Hasta}/>
            <Divider/>

            <ItemDiaTurno dia={values.martes} handleChange={handleChange} handleBlur={handleBlur}
                name="martes" label="Martes" desdeMañanaDia={values.martesH.turno1Desde} hastaMañanaDia={values.martesH.turno1Hasta}
                desdeTardeDia={values.martesH.turno2Desde} hastaTardeDia={values.martesH.turno2Hasta}/>
            <Divider/>

            <ItemDiaTurno dia={values.miercoles} handleChange={handleChange} handleBlur={handleBlur}
                name="miercoles" label="Miercoles" desdeMañanaDia={values.miercolesH.turno1Desde} hastaMañanaDia={values.miercolesH.turno1Hasta}
                desdeTardeDia={values.miercolesH.turno2Desde} hastaTardeDia={values.miercolesH.turno2Hasta}/>
           <Divider/>

            <ItemDiaTurno dia={values.jueves} handleChange={handleChange} handleBlur={handleBlur}
                name="jueves" label="Jueves" desdeMañanaDia={values.juevesH.turno1Desde} hastaMañanaDia={values.juevesH.turno1Hasta}
                desdeTardeDia={values.juevesH.turno2Desde} hastaTardeDia={values.juevesH.turno2Hasta}/>
           <Divider/>

            <ItemDiaTurno dia={values.viernes} handleChange={handleChange} handleBlur={handleBlur}
                name="viernes" label="Viernes" desdeMañanaDia={values.viernesH.turno1Desde} hastaMañanaDia={values.viernesH.turno1Hasta}
                desdeTardeDia={values.viernesH.turno2Desde} hastaTardeDia={values.viernesH.turno2Hasta}/>
            <Divider/>

            <ItemDiaTurno dia={values.sabado} handleChange={handleChange} handleBlur={handleBlur}
                name="sabado" label="Sabado" desdeMañanaDia={values.sabadoH.turno1Desde} hastaMañanaDia={values.sabadoH.turno1Hasta}
                desdeTardeDia={values.sabadoH.turno2Desde} hastaTardeDia={values.sabadoH.turno2Hasta}/>
            <Divider/>

            <ItemDiaTurno dia={values.domingo} handleChange={handleChange} handleBlur={handleBlur}
                name="domingo" label="Domingo" desdeMañanaDia={values.domingoH.turno1Desde} hastaMañanaDia={values.domingoH.turno1Hasta}
                desdeTardeDia={values.domingoH.turno2Desde} hastaTardeDia={values.domingoH.turno2Hasta}/>
            <Divider/>

          </Grid>
        <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            className={classes.botonEspacio}
          >
            <Grid item xs={4}>
              <FormControlLabel  control={<Checkbox checked={values.usaTurnos} onChange={handleChange}
                name="usaTurnos" color="primary" /> } label="Admite Turno"  />
            </Grid>
            <Grid item xs={3}>
              <Typography className={!values.usaTurnos?classes.textDisabled:null} id="discrete-slider-custom" variant="h6" gutterBottom>
                  Intervalo entre turnos:
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Slider
                name="intervalo"
                value={values.intervalo}
                onChange={(event, newValue)=>{setFieldValue("intervalo", newValue);}}
                disabled={!values.usaTurnos}
                aria-labelledby="discrete-slider"
                valueLabelDisplay="auto"
                marks={marks}
                min={5}
                max={60}

              />
            </Grid>
            <Grid item xs={5}>
              <Typography variant="h6" gutterBottom>
                  Tiempo promedio de atencion al publico:
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Slider
                name="tiempoAtencion"
                value={values.tiempoAtencion}
                onChange={(event, newValue)=>{setFieldValue("tiempoAtencion", newValue);}}
                aria-labelledby="discrete-slider"
                valueLabelDisplay="auto"
                marks={marks}
                min={5}
                max={60}

              />
            </Grid>
            
          </Grid>
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
              className={classes.botonEnviar}
              onClick={() => {
                dispatch(cargarSetDeDatosTurnos(values));
                props.propClickAtras();
              }}
            >
              Atras
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={()=> setStateOpenDialogMod(true)}
              className={classes.botonRegistro}
            >
              Modificar
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
 
export default ModificarDatosTurno;