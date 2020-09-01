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

const ListaProductos = () => {
  const classes = useStyles();
  const [stateProd, setStateProd] = useState([]);

  useEffect(() => {
    apiCalls.getArticuloReferencia().then((datos) => setStateProd(datos.data));
  }, []);

  const buscarProducto = (id) => {
    //busco el producto por ahi
    // let producto = {
    //   id: "1",
    //   nombre: "producto1",
    //   codigo: 351513,
    //   precio: 136263,
    // };
  };

  return (
    <>
      <Typography variant="h3" color="initial">
        Lista Productos:
      </Typography>
      <Button
        color="primary"
        variant="contained"
        component={Link}
        to="/productos/nuevo"
      >
        Agregar Producto
      </Button>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Codigo</TableCell>
              <TableCell>Precio</TableCell>
              <TableCell>Accion</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {stateProd.map((prod) => (
              <TableRow key={prod.idArticuloReferencia}>
                <TableCell>{prod.idArticuloReferencia}</TableCell>
                <TableCell>{prod.nombre}</TableCell>
                <TableCell>{prod.codBarra}</TableCell>
                <TableCell>{prod.precioRefencia}</TableCell>
                <TableCell>
                  <Button
                    color="primary"
                    variant="contained"
                    onClick={() => buscarProducto(prod.id)}
                    component={Link}
                    to={"/productos/" + prod.idArticuloReferencia}
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

export default ListaProductos;
