import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux"; //metodo que sirva para usar los reducers
import { cambiarVistaConDatos } from "../navbar/menuSlice"; //reducer para cambiar el estado
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  Divider,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const ListaTipoEmprendimientos = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [state, setState] = useState({
    tipoEmprendimientos: [
      {
        id: "1",
        tipoEmprendimiento: "anual",
      },
      {
        id: "2",
        tipoEmprendimiento: "mensual",
      },
      {
        id: "3",
        tipoEmprendimiento: "semestral",
      },
    ],
  });

  const buscarTipoEmprendimiento = (nombreTipoEmprendimiento) => {
    let categoriaTipoEmprendimiento = {
      id: "1",
      tipoEmprendimiento: "anual",
    };
    dispatch(cambiarVistaConDatos(11, categoriaTipoEmprendimiento));
  };

  return (
    <>
      <Typography variant="h3" color="initial">
        Lista Tipo de emprendimientos:
      </Typography>
      <Button
        color="primary"
        variant="contained"
        component={Link}
        to="/tipoEmprendimientos/nuevo"
      >
        Agregar Emprendimiento
      </Button>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Nombre Tipo de Emprendimiento</TableCell>
              <TableCell>Accion</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {state.tipoEmprendimientos.map((tipoEmp) => (
              <TableRow key={tipoEmp.id}>
                <TableCell>{tipoEmp.id}</TableCell>
                <TableCell>{tipoEmp.tipoEmprendimiento}</TableCell>
                <TableCell>
                  <Button
                    color="primary"
                    variant="contained"
                    onClick={() =>
                      buscarTipoEmprendimiento(tipoEmp.tipoEmprendimiento)
                    }
                    component={Link}
                    to={"/tipoEmprendimientos/" + tipoEmp.id}
                  >
                    Ver
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default ListaTipoEmprendimientos;
