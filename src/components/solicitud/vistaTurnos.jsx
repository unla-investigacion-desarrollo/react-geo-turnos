import React, {useState} from "react";
import Grid from "@material-ui/core/Grid";
import ListaSolicitudes from "./listaSolicitudes";
import ListaAceptados from "./listaAceptados";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cargarTurnos, selectTurnosRechazados } from "./turnoSlice";
import { apiCalls } from "../../api/apiCalls";
import {Button, TextField} from "@material-ui/core";
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
  curr.setDate(curr.getDate());
  var date = curr.toISOString().substr(0,10);
  const [fechaTurnos, setFechaTurnos] = useState(date);

  //const turnosRechazados = useSelector(selectTurnosRechazados);
  useEffect(() => {
    if(idEmprendimiento!==""){
      let listaTurnos = [];
      apiCalls.getTurno(idEmprendimiento, 1).then((response) => {
        response.data.forEach(turno => listaTurnos.push(turno));
        
        apiCalls.getTurno(idEmprendimiento, 2).then((response) =>{
          response.data.forEach(turno => listaTurnos.push(turno));
          dispatch(cargarTurnos(listaTurnos));
        });
        
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idEmprendimiento]);

  const handleChangeFecha = (event) => {
    setFechaTurnos(event.target.value);
  }

  return (
    
    <Grid container spacing={3}>
      <Grid item xs={12} >
          <Button variant="contained" color="secondary" className={classes.botonEspacio}>
            Rechazados
          </Button>
                  
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
      {fechaTurnos===date?(
        <>
          <Grid item xs={6}>
            <ListaSolicitudes />
          </Grid>
          <Grid item xs={6}>
            <ListaAceptados />
          </Grid>
        </>
      ):(<Grid item xs={12}>
        <ListaHistorial fecha={fechaTurnos}/>
        </Grid>)
      }
      
    </Grid>
  );
};

export default VistaTurnos;
