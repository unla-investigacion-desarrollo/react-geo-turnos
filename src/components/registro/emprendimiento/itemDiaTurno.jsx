import React from 'react';
import {
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    FormControlLabel,
    Checkbox,
    FormGroup
  } from "@material-ui/core";
  import { makeStyles } from "@material-ui/core/styles";

import {horarios} from "./listaHorarios";

const useStyles = makeStyles((theme) => ({
    root:{
      marginBottom: theme.spacing(1),
      marginTop: theme.spacing(1),
    },
    horario: {
      minWidth: 200,
      marginLeft: theme.spacing(2),
    },
    horarioEspacioExtra: {
      minWidth: 200,
      marginLeft: theme.spacing(7),
    },
    dia: {
      minWidth: 150,
    }
  }));

const ItemDiaTurno = (props) => {
    const classes = useStyles();
    return ( <FormGroup row className={classes.root}>
        <FormControlLabel className={classes.dia} control={<Checkbox checked={props.dia} onChange={props.handleChange}
                name={props.name} color="primary" /> } label={props.label}  /><br/>
        <FormControl className={classes.horario} disabled={!props.dia}>
            <InputLabel id={"labeldesdeMañana"+props.label}>Desde</InputLabel>
            <Select
                    id={props.name+"H.turno1Desde"}
                    name={props.name+"H.turno1Desde"}
                    labelId={"labeldesdeMañana"+props.label}
                    value={props.desdeMañanaDia}
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    >
            <MenuItem value="-1" disabled>
                <em>Seleccione una opcion</em>
            </MenuItem>
                {horarios.map((hora) => {
                    return (
                      <MenuItem
                        value={hora}
                        key={hora}
                      >
                        {hora}
                      </MenuItem>
                    );
                  })}
            </Select>
        </FormControl>

        <FormControl className={classes.horario} disabled={!props.dia}>
            <InputLabel id={"labelhastaMañana"+props.label}>Hasta</InputLabel>
            <Select
                    id={props.name+"H.turno1Hasta"}
                    name={props.name+"H.turno1Hasta"}
                    labelId={"labelhastaMañana"+props.label}
                    value={props.hastaMañanaDia}
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    >
            <MenuItem value="-1" disabled>
                <em>Seleccione una opcion</em>
            </MenuItem>
                {horarios.map((hora) => {
                    return (
                      <MenuItem
                        value={hora}
                        key={hora}
                      >
                        {hora}
                      </MenuItem>
                    );
                  })}
            </Select>
        </FormControl>

        <FormControl className={classes.horarioEspacioExtra} disabled={!props.dia}>
            <InputLabel id={"labeldesdeTarde"+props.label}>Desde</InputLabel>
            <Select
                    id={props.name+"H.turno2Desde"}
                    name={props.name+"H.turno2Desde"}
                    labelId={"labeldesdeTarde"+props.label}
                    value={props.desdeTardeDia}
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    >
            <MenuItem value="-1" disabled>
                <em>Seleccione una opcion</em>
            </MenuItem>
                {horarios.map((hora) => {
                    return (
                      <MenuItem
                        value={hora}
                        key={hora}
                      >
                        {hora}
                      </MenuItem>
                    );
                  })}
            </Select>
        </FormControl>

        <FormControl className={classes.horario} disabled={!props.dia}>
            <InputLabel id={"labelhastaTarde"+props.label}>Hasta</InputLabel>
            <Select
                    id={props.name+"H.turno2Hasta"}
                    name={props.name+"H.turno2Hasta"}
                    labelId={"labelhastaTarde"+props.label}
                    value={props.hastaTardeDia}
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    >
            <MenuItem value="-1" disabled>
                <em>Seleccione una opcion</em>
            </MenuItem>
                {horarios.map((hora) => {
                    return (
                      <MenuItem
                        value={hora}
                        key={hora}
                      >
                        {hora}
                      </MenuItem>
                    );
                  })}
            </Select>
        </FormControl>
        
    </FormGroup> );
}


export default ItemDiaTurno;