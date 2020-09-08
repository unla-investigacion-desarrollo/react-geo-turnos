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

const ListaCategorias = () => {
  const classes = useStyles();
  const [state] = useState({
    categorias: [],
  });

  useEffect(() => {
    apiCalls.getCategoria().then((response) => {
      setState({ categorias: response.data });
    });
  }, []);

  return (
    <>
      <Typography variant="h3" color="initial">
        Lista Categorias:
      </Typography>
      <Button
        color="primary"
        variant="contained"
        component={Link}
        to="/categorias/nuevo"
      >
        Agregar Categoria
      </Button>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Nombre Categoria</TableCell>
              <TableCell>Accion</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {state.categorias.map((categ) => (
              <TableRow key={categ.id}>
                <TableCell>{categ.id}</TableCell>
                <TableCell>{categ.categoria}</TableCell>
                <TableCell>
                  <Button
                    color="primary"
                    variant="contained"
                    component={Link}
                    to={"/categorias/" + categ.id}
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

export default ListaCategorias;
