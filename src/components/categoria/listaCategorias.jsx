import React, { useState } from "react";
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
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const ListaCategorias = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [state] = useState({
    categorias: [
      {
        id: "1",
        categoria: "producto alimenticio",
      },
      {
        id: "2",
        categoria: "producto de higiene personal",
      },
      {
        id: "3",
        categoria: "producto de limpieza",
      },
    ],
  });

  const buscarCategoria = (nombreCategoria) => {
    let categoriaProd = {
      id: "1",
      categoria: "producto alimenticio",
    };
    dispatch(cambiarVistaConDatos(9, categoriaProd));
  };

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
                    onClick={() => buscarCategoria(categ.categoria)}
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
