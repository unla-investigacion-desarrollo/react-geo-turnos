import React, {useState} from "react";
import Grid from "@material-ui/core/Grid";
import ListaSolicitudes from "./listaSolicitudes";
import ListaAceptados from "./listaAceptados";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cargarTurnos, selectTurnosRechazados } from "./turnoSlice";
import { apiCalls } from "../../api/apiCalls";
import {Button, TextField, Typography} from "@material-ui/core";
import {selectSesion} from "../../datosSesion/sesionSlice";
import { makeStyles } from "@material-ui/core/styles";
import ListaHistorial from "./listaHistorial";

const useStyles = makeStyles((theme) => ({
  botonEspacio: {
    margin: theme.spacing(1),
  },
}));

const VistaTurnos = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const idEmprendimiento = useSelector(selectSesion).idEmprendimiento;
  

  var curr = new Date();
  var date = curr.getFullYear()+"-"+ (curr.getMonth() > 8 ? (curr.getMonth()+1) : "0"+ (curr.getMonth()+1) ) + "-" + (curr.getDate() > 9 ?  +curr.getDate() : "0"+curr.getDate());
  const [fechaTurnos, setFechaTurnos] = useState(date);
  const [fechaBien, setFechaBien] = useState( (curr.getDate() > 9 ?  +curr.getDate() : "0"+curr.getDate()) +
   "/" + ( curr.getMonth() + 1 ) + "/" + curr.getFullYear() );

  //const turnosRechazados = useSelector(selectTurnosRechazados);
  useEffect(() => {
    if(idEmprendimiento!==""){
      let listaTurnos = [];
      console.log(fechaBien);
      apiCalls.getTurnosEmprendimiento(idEmprendimiento, fechaBien).then((response)=>{
        response.data.forEach(turno => {
          let fechaSplit = turno.fechaHora.split("T");
          turno.fechaHora= fechaSplit[0] + " " + fechaSplit[1].substring(0,5) + " hs";
          listaTurnos.push(turno);
        });
        dispatch(cargarTurnos(listaTurnos));
        console.log("turnos por fecha:");
        console.log(listaTurnos);
      });

      // apiCalls.getTurno(idEmprendimiento, 1).then((response) => {
      //   response.data.forEach(turno => listaTurnos.push(turno));
        
      //   apiCalls.getTurno(idEmprendimiento, 2).then((response) =>{
      //     response.data.forEach(turno => listaTurnos.push(turno));
      //     dispatch(cargarTurnos(listaTurnos));
      //   });
        
      // });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idEmprendimiento, fechaBien]);

  const handleChangeFecha = (event) => {
    setFechaTurnos(event.target.value);
    const splitInput= event.target.value.split("-");
    let fecha = new Date(splitInput[0],splitInput[1] - 1,splitInput[2]);
    setFechaBien( (fecha.getDate() > 9 ?  +fecha.getDate() : "0"+fecha.getDate()) + "/" +
    ( fecha.getMonth() + 1 ) + "/" + fecha.getFullYear() );
  }

  return (
    
    <Grid container spacing={3}>
      <Grid item xs={12} >
        <Grid container spacing={3}>
          <Grid item>
            <Typography>
              <strong>Seleccione Fecha:</strong>
            </Typography>
          </Grid>
          <Grid item>  
            <TextField
              id="date"
              label="Fecha"
              type="date"
              defaultValue={date}
              value={fechaTurnos}
              onChange={handleChangeFecha}
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          </Grid>
      </Grid>
      
        <>
          <Grid item xs={6}>
            <ListaSolicitudes />
          </Grid>
          <Grid item xs={6}>
            <ListaAceptados />
          </Grid>
        </>
      
      
    </Grid>
  );
};

export default VistaTurnos;
