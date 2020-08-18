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

const ListaRubros = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [state, setState] = useState({
    rubros: [
      {
        id: "1",
        rubro: "textil",
      },
      {
        id: "2",
        rubro: "agricola",
      },
      {
        id: "3",
        rubro: "ganadero",
      },
    ],
  });

  const buscarRubro = (nombreRubro) => {
    let categoriaRubro = {
      id: "1",
      rubro: "textil",
    };
    dispatch(cambiarVistaConDatos(11, categoriaRubro));
  };

  return (
    <>
      <Typography variant="h3" color="initial">
        Lista Rubros:
      </Typography>
      <Button
        color="primary"
        variant="contained"
        component={Link}
        to="/rubros/nuevo"
      >
        Agregar Rubro
      </Button>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Nombre Rubro</TableCell>
              <TableCell>Accion</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {state.rubros.map((rub) => (
              <TableRow key={rub.id}>
                <TableCell>{rub.id}</TableCell>
                <TableCell>{rub.rubro}</TableCell>
                <TableCell>
                  <Button
                    color="primary"
                    variant="contained"
                    onClick={() => buscarRubro(rub.rubro)}
                    component={Link}
                    to={"/rubros/" + rub.id}
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

export default ListaRubros;
