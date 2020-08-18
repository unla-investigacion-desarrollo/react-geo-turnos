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

const ListaMarcas = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [state, setState] = useState({
    marcas: [
      {
        id: "1",
        marca: "johnson & johnson",
      },
      {
        id: "2",
        marca: "higeniol",
      },
      {
        id: "3",
        marca: "ayudin",
      },
    ],
  });

  const buscarMarca = (nombreMarca) => {
    let categoriaMarca = {
      id: "1",
      marca: "johnson & johnson",
    };
    dispatch(cambiarVistaConDatos(11, categoriaMarca));
  };

  return (
    <>
      <Typography variant="h3" color="initial">
        Lista Marcas:
      </Typography>
      <Button
        color="primary"
        variant="contained"
        component={Link}
        to="/marcas/nuevo"
      >
        Agregar Marca
      </Button>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Nombre Marca</TableCell>
              <TableCell>Accion</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {state.marcas.map((marc) => (
              <TableRow key={marc.id}>
                <TableCell>{marc.id}</TableCell>
                <TableCell>{marc.marca}</TableCell>
                <TableCell>
                  <Button
                    color="primary"
                    variant="contained"
                    onClick={() => buscarMarca(marc.marca)}
                    component={Link}
                    to={"/marcas/" + marc.id}
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

export default ListaMarcas;
