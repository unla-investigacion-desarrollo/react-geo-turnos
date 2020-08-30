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

const ListaProductos = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [state, setState] = useState({
    productos: [
      {
        id: "1",
        nombre: "producto1",
        codigo: "codigoprod1",
        precio: "precio del 1",
      },
      {
        id: "2",
        nombre: "producto2",
        codigo: "codigoprod2",
        precio: "precio del 2",
      },
      {
        id: "3",
        nombre: "producto3",
        codigo: "codigoprod3",
        precio: "precio del 3",
      },
    ],
  });

  useEffect(() => {
    console.log("useeffcet funcionando en prrd");
  }, []);

  const buscarProducto = (id) => {
    //busco el producto por ahi
    let producto = {
      id: "1",
      nombre: "producto1",
      codigo: 351513,
      precio: 136263,
    };
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
            {state.productos.map((prod) => (
              <TableRow key={prod.id}>
                <TableCell>{prod.id}</TableCell>
                <TableCell>{prod.nombre}</TableCell>
                <TableCell>{prod.codigo}</TableCell>
                <TableCell>{prod.precio}</TableCell>
                <TableCell>
                  <Button
                    color="primary"
                    variant="contained"
                    onClick={() => buscarProducto(prod.id)}
                    component={Link}
                    to={"/productos/" + prod.id}
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
