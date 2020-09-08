import React, { useState, useEffect } from "react";
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
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { apiCalls } from "../../api/apiCalls";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const ListaMarcas = () => {
  const classes = useStyles();
  const [state] = useState({
    marcas: [],
  });

  useEffect(() => {
    apiCalls.getMarca().then((response) => {
      setState({ marcas: response.data });
    });
  }, []);

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
